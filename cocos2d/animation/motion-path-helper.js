var DynamicAnimCurve = require('./animation-curves').DynamicAnimCurve;
var computeRatioByType = require('./animation-curves').computeRatioByType;

var bezier = require('./bezier').bezier;
var bezierByTime = require('./bezier').bezierByTime;

var binarySearch = require('./binary-search');

var v2 = cc.v2;

function Curve (points) {
    this.points = points || [];
    this.beziers = [];
    this.ratios = [];
    this.progresses = [];

    this.length = 0;

    this.computeBeziers();
}
Curve.prototype.computeBeziers = function () {
    this.beziers.length = 0;
    this.ratios.length = 0;
    this.progresses.length = 0;
    this.length = 0;

    for (var i = 1; i < this.points.length; i++) {
        var startPoint = this.points[i - 1];
        var endPoint = this.points[i];
        var bezier = new Bezier();
        bezier.start = startPoint.pos;
        bezier.startCtrlPoint = startPoint.out;
        bezier.end = endPoint.pos;
        bezier.endCtrlPoint = endPoint.in;
        this.beziers.push(bezier);

        this.length += bezier.getLength();
    }

    var current = 0;
    for (var i = 0; i < this.beziers.length; i++) {
        var bezier = this.beziers[i];
        this.ratios[i] = bezier.getLength() / this.length;
        this.progresses[i] = current = current + this.ratios[i];
    }

    return this.beziers;
};

function Bezier () {
    this.start = v2();
    this.end = v2();
    this.startCtrlPoint = v2(); // cp0, cp1
    this.endCtrlPoint = v2();   // cp2, cp3
}

// Get point at relative position in curve according to arc length
// - u [0 .. 1]
Bezier.prototype.getPointAt = function ( u ) {
    var t = this.getUtoTmapping( u );
    return this.getPoint( t );
};


// Get point at time t
//  - t [0 .. 1]
Bezier.prototype.getPoint = function ( t ) {
    var x = bezier(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t);
    var y = bezier(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);

    return new v2(x, y);
};

// Get total curve arc length
Bezier.prototype.getLength = function () {

    var lengths = this.getLengths();
    return lengths[ lengths.length - 1 ];

};

// Get list of cumulative segment lengths
Bezier.prototype.getLengths = function ( divisions ) {

    if ( ! divisions ) divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions): 200;

    if ( this.cacheArcLengths
        && ( this.cacheArcLengths.length === divisions + 1 )) {

        //console.log( "cached", this.cacheArcLengths );
        return this.cacheArcLengths;

    }

    var cache = [];
    var current, last = this.getPoint( 0 );
    var p, sum = 0;

    cache.push( 0 );

    for ( p = 1; p <= divisions; p ++ ) {

        current = this.getPoint ( p / divisions );
        sum += cc.pDistance(current, last);
        cache.push( sum );
        last = current;

    }

    this.cacheArcLengths = cache;

    return cache; // { sums: cache, sum:sum }; Sum is in the last element.
};

Bezier.prototype.getUtoTmapping = function ( u, distance ) {

    var arcLengths = this.getLengths();

    var i = 0, il = arcLengths.length;

    var targetArcLength; // The targeted u distance value to get

    if ( distance ) {
        targetArcLength = distance;
    } else {
        targetArcLength = u * arcLengths[ il - 1 ];
    }

    //var time = Date.now();

    // binary search for the index with largest value smaller than target u distance

    var low = 0, high = il - 1, comparison;

    while ( low <= high ) {

        i = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

        comparison = arcLengths[ i ] - targetArcLength;

        if ( comparison < 0 ) {

            low = i + 1;
            continue;

        } else if ( comparison > 0 ) {

            high = i - 1;
            continue;

        } else {

            high = i;
            break;

            // DONE

        }

    }

    i = high;

    //console.log('b' , i, low, high, Date.now()- time);

    if ( arcLengths[ i ] == targetArcLength ) {

        var t = i / ( il - 1 );
        return t;

    }

    // we could get finer grain at lengths, or use simple interpolatation between two points

    var lengthBefore = arcLengths[ i ];
    var lengthAfter = arcLengths[ i + 1 ];

    var segmentLength = lengthAfter - lengthBefore;

    // determine where we are between the 'before' and 'after' points

    var segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;

    // add that fractional amount to t

    var t = ( i + segmentFraction ) / ( il -1 );

    return t;
};


function sampleMotionPaths (motionPaths, data, duration, fps) {

    function createControlPoints(array) {
        if (array instanceof cc.Vec2) {
            return {
                in: array,
                pos: array,
                out: array
            };
        }
        else if (Array.isArray(array) && array.length === 6) {
            return {
                in: v2(array[2], array[3]),
                pos: v2(array[0], array[1]),
                out: v2(array[4], array[5])
            };
        }

        return {
            in: cc.Vec2.ZERO,
            pos: cc.Vec2.ZERO,
            out: cc.Vec2.ZERO
        };
    }

    var values = data.values;

    values = values.map(function (value) {
        return v2(value[0], value[1]);
    });

    var types = data.types;
    var ratios = data.ratios;

    var newValues = data.values = [];
    var newTypes = data.types = [];
    var newRatios = data.ratios = [];

    function addNewDatas (value, type, ratio) {
        newValues.push(value);
        newTypes.push(type);
        newRatios.push(ratio);
    }

    // ensure every ratio section's length is the same
    var startRatioOffset = 0;

    // from es6 Number.EPSILON
    var EPSILON = 2.220446049250313e-16;

    // do not need to compute last path
    for (var i = 0, l = motionPaths.length; i < l-1; i++) {
        var motionPath = motionPaths[i];

        var ratio = ratios[i];
        var nextRatio = ratios[i + 1];
        var betweenRatio = nextRatio - ratio;

        var value = values[i];
        var nextValue = values[i + 1];

        var type = types[i];

        var results = [];
        var progress = startRatioOffset / betweenRatio;
        var speed = 1 / (betweenRatio * duration * fps);

        if (motionPath) {
            var points = [];
            points.push(createControlPoints(value));

            for (var j = 0, l2 = motionPath.length; j < l2; j++) {
                var controlPoints = createControlPoints(motionPath[j]);
                points.push(controlPoints);
            }

            points.push(createControlPoints(nextValue));

            // create Curve to compute beziers
            var curve = new Curve(points);
            curve.computeBeziers();

            // sample beziers
            var progresses = curve.progresses;

            while ( 1 - progress > EPSILON) {
                var finalProgress = progress;

                finalProgress = computeRatioByType(finalProgress, type);

                var bezierIndex = binarySearch(progresses, finalProgress);
                if (bezierIndex < 0) bezierIndex = ~bezierIndex;

                finalProgress -= bezierIndex > 0 ? progresses[bezierIndex - 1] : 0;
                finalProgress = finalProgress / curve.ratios[bezierIndex];

                var pos = curve.beziers[bezierIndex].getPointAt(finalProgress);
                results.push(pos);

                progress += speed;
            }

        }
        else {
            while ( 1 - progress > EPSILON) {
                var finalProgress = progress;

                finalProgress = computeRatioByType(finalProgress, type);

                results.push(value.lerp(nextValue, finalProgress));

                progress += speed;
            }
        }

        for (var j = 0, l2 = results.length; j < l2; j++) {
            var newRatio = ratio + startRatioOffset + speed * j * betweenRatio;
            addNewDatas(results[j], DynamicAnimCurve.Linear, newRatio);
        }

        if (Math.abs(progress - 1) > EPSILON) // progress > 1
            startRatioOffset = (progress - 1) * betweenRatio;
        else
            startRatioOffset = 0;
    }

    addNewDatas(values[values.length - 1], DynamicAnimCurve.Linear, ratios[ratios.length - 1]);
}

if (CC_TEST) {
    cc._Test.sampleMotionPaths = sampleMotionPaths;
}

module.exports = {
    sampleMotionPaths: sampleMotionPaths
};