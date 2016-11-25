(function (cc, ccui, ccs, cp) {

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Chukong Aipu reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc._tmp.PrototypeCCNode = function () {

    var _p = _ccsg.Node.prototype;

    cc.defineGetterSetter(_p, "x", _p.getPositionX, _p.setPositionX);
    cc.defineGetterSetter(_p, "y", _p.getPositionY, _p.setPositionY);
    cc.defineGetterSetter(_p, "width", _p._getWidth, _p._setWidth);
    cc.defineGetterSetter(_p, "height", _p._getHeight, _p._setHeight);
    cc.defineGetterSetter(_p, "anchorX", _p._getAnchorX, _p._setAnchorX);
    cc.defineGetterSetter(_p, "anchorY", _p._getAnchorY, _p._setAnchorY);
    cc.defineGetterSetter(_p, "skewX", _p.getSkewX, _p.setSkewX);
    cc.defineGetterSetter(_p, "skewY", _p.getSkewY, _p.setSkewY);
    cc.defineGetterSetter(_p, "zIndex", _p.getLocalZOrder, _p.setLocalZOrder);
    cc.defineGetterSetter(_p, "vertexZ", _p.getVertexZ, _p.setVertexZ);
    cc.defineGetterSetter(_p, "rotation", _p.getRotation, _p.setRotation);
    cc.defineGetterSetter(_p, "rotationX", _p.getRotationX, _p.setRotationX);
    cc.defineGetterSetter(_p, "rotationY", _p.getRotationY, _p.setRotationY);
    cc.defineGetterSetter(_p, "scale", _p.getScale, _p.setScale);
    cc.defineGetterSetter(_p, "scaleX", _p.getScaleX, _p.setScaleX);
    cc.defineGetterSetter(_p, "scaleY", _p.getScaleY, _p.setScaleY);
    cc.defineGetterSetter(_p, "children", _p.getChildren);
    cc.defineGetterSetter(_p, "childrenCount", _p.getChildrenCount);
    cc.defineGetterSetter(_p, "parent", _p.getParent, _p.setParent);
    cc.defineGetterSetter(_p, "visible", _p.isVisible, _p.setVisible);
    cc.defineGetterSetter(_p, "running", _p.isRunning);
    cc.defineGetterSetter(_p, "ignoreAnchor", _p.isIgnoreAnchorPointForPosition, _p.setIgnoreAnchorPointForPosition);
    cc.defineGetterSetter(_p, "actionManager", _p.getActionManager, _p.setActionManager);
    cc.defineGetterSetter(_p, "scheduler", _p.getScheduler, _p.setScheduler);
    //cc.defineGetterSetter(_p, "boundingBox", _p.getBoundingBox);
    cc.defineGetterSetter(_p, "shaderProgram", _p.getShaderProgram, _p.setShaderProgram);
    cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
    cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB);
    cc.defineGetterSetter(_p, "cascadeOpacity", _p.isCascadeOpacityEnabled, _p.setCascadeOpacityEnabled);
    cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);
    cc.defineGetterSetter(_p, "cascadeColor", _p.isCascadeColorEnabled, _p.setCascadeColorEnabled);
};
/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/*
 * XXX: Yes, nodes might have a sort problem once every 15 days if the game runs at 60 FPS and each frame sprites are reordered.
 */
cc.s_globalOrderOfArrival = 1;

/**
 * <p>ccsg.Node is the root class of all node. Anything that gets drawn or contains things that get drawn is a ccsg.Node.<br/>
 * The most popular ccsg.Nodes are: ccsg.Scene, cc.Layer, _ccsg.Sprite, cc.Menu.</p>
 *
 * <p>The main features of a ccsg.Node are: <br/>
 * - They can contain other ccsg.Node nodes (addChild, getChildByTag, removeChild, etc) <br/>
 * - They can schedule periodic callback (schedule, unschedule, etc) <br/>
 * - They can execute actions (runAction, stopAction, etc) <br/></p>
 *
 * <p>Some ccsg.Node nodes provide extra functionality for them or their children.</p>
 *
 * <p>Subclassing a ccsg.Node usually means (one/all) of: <br/>
 * - overriding constructor function "ctor" to initialize resources and schedule callbacks<br/>
 * - create callbacks to handle the advancement of time<br/></p>
 *
 * <p>Features of ccsg.Node: <br/>
 * - position  <br/>
 * - scale (x, y) <br/>
 * - rotation (in degrees, clockwise)<br/>
 * - anchor point<br/>
 * - size <br/>
 * - color <br/>
 * - opacity <br/>
 * - visible<br/>
 * - z-order<br/>
 * - WebGL z position<br/></P>
 *
 * <p> Default values: <br/>
 * - rotation: 0 <br/>
 * - position: (x=0,y=0) <br/>
 * - scale: (x=1,y=1) <br/>
 * - contentSize: (x=0,y=0)<br/>
 * - anchorPoint: (x=0,y=0)<br/>
 * - color: (r=255,g=255,b=255)<br/>
 * - opacity: 255</p>
 *
 * <p> Limitations:<br/>
 * - A ccsg.Node is a "void" object. It doesn't have a texture <br/></P>
 *
 * <p>Order in transformations with grid disabled <br/>
 * -# The node will be translated (position)  <br/>
 * -# The node will be rotated (rotation)<br/>
 * -# The node will be scaled (scale)  <br/>
 *
 * <p>Order in transformations with grid enabled<br/>
 * -# The node will be translated (position)<br/>
 * -# The node will be rotated (rotation) <br/>
 * -# The node will be scaled (scale) <br/>
 * -# The grid will capture the screen <br/>
 * -# The node will be moved according to the camera values (camera) <br/>
 * -# The grid will render the captured screen <br/></P>
 *
 * @class _ccsg.Node
 * @extends cc._Class
 *
 * @property {Number}               x                   - x axis position of node
 * @property {Number}               y                   - y axis position of node
 * @property {Number}               width               - Width of node
 * @property {Number}               height              - Height of node
 * @property {Number}               anchorX             - Anchor point's position on x axis
 * @property {Number}               anchorY             - Anchor point's position on y axis
 * @property {Boolean}              ignoreAnchor        - Indicate whether ignore the anchor point property for positioning
 * @property {Number}               skewX               - Skew x
 * @property {Number}               skewY               - Skew y
 * @property {Number}               zIndex              - Z order in depth which stands for the drawing order
 * @property {Number}               vertexZ             - WebGL Z vertex of this node, z order works OK if all the nodes uses the same openGL Z vertex
 * @property {Number}               rotation            - Rotation of node
 * @property {Number}               rotationX           - Rotation on x axis
 * @property {Number}               rotationY           - Rotation on y axis
 * @property {Number}               scale               - Scale of node
 * @property {Number}               scaleX              - Scale on x axis
 * @property {Number}               scaleY              - Scale on y axis
 * @property {Boolean}              visible             - Indicate whether node is visible or not
 * @property {cc.Color}             color               - Color of node, default value is white: (255, 255, 255)
 * @property {Boolean}              cascadeColor        - Indicate whether node's color value affect its child nodes, default value is false
 * @property {Number}               opacity             - Opacity of node, default value is 255
 * @property {Boolean}              opacityModifyRGB    - Indicate whether opacity affect the color value, default value is false
 * @property {Boolean}              cascadeOpacity      - Indicate whether node's opacity value affect its child nodes, default value is false
 * @property {Array}                children            - <@readonly> All children nodes
 * @property {Number}               childrenCount       - <@readonly> Number of children
 * @property {_ccsg.Node}           parent              - Parent node
 * @property {Boolean}              running             - <@readonly> Indicate whether node is running or not
 * @property {Number}               tag                 - Tag of node
 * @property {Number}               arrivalOrder        - The arrival order, indicates which children is added previously
 * @property {cc.ActionManager}     actionManager       - The CCActionManager object that is used by all actions.
 * @property {cc.GLProgram}         shaderProgram       - The shader program currently used for this node
 * @property {Number}               glServerState       - The state of OpenGL server side
 * @property {cc.Scheduler}         scheduler           - cc.Scheduler used to schedule all "updates" and timers
 */
_ccsg.Node = cc.Class({
    name: 'ccsg.Node',

    properties: {
        _localZOrder: 0,    ///< Local order (relative to its siblings) used to sort the node
        _globalZOrder: 0,   ///< Global order used to sort the node
        _vertexZ: 0.0,

        _rotationX: 0,
        _rotationY: 0.0,
        _scaleX: 1.0,
        _scaleY: 1.0,
        _position: cc.p(0, 0),

        _skewX: 0.0,
        _skewY: 0.0,
        _children: [],
        _visible: true,
        _anchorPoint: cc.p(0, 0),
        _contentSize: cc.size(0, 0),
        _parent: null,

        // "whole screen" objects. like Scenes and Layers, should set _ignoreAnchorPointForPosition to true
        _ignoreAnchorPointForPosition: false,
        tag: cc.macro.NODE_TAG_INVALID,

        _showNode: false,
        _name: '',                     ///<a string label, an user defined string to identify this node

        _realOpacity: 255,
        _realColor: cc.Color.WHITE,
        _cascadeColorEnabled: false,
        _cascadeOpacityEnabled: false
    },

    ctor: function() {
        var name = arguments[0];

        this.__instanceId = cc.ClassManager.getNewInstanceId();

        this._running = false;
        this._reorderChildDirty = false;
        this._shaderProgram = null;
        this._arrivalOrder = 0;

        this._additionalTransformDirty = false;
        this._isTransitionFinished = false;

        var director = cc.director;
        this._actionManager = director.getActionManager();
        this._scheduler = director.getScheduler();
        this._additionalTransform = cc.affineTransformMakeIdentity();

        this._initRendererCmd();
    },

    /**
     * Initializes the instance of ccsg.Node
     * @function
     * @returns {boolean} Whether the initialization was successful.
     */
    init: function () {
        //this._initNode();   //this has been called in ctor.
        return true;
    },

    _arrayMakeObjectsPerformSelector: function (array, callbackType) {
        if (!array || array.length === 0)
            return;

        var i, len = array.length, node;
        var nodeCallbackType = _ccsg.Node._stateCallbackType;
        switch (callbackType) {
            case nodeCallbackType.onEnter:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)
                        node.onEnter();
                }
                break;
            case nodeCallbackType.onExit:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)
                        node.onExit();
                }
                break;
            case nodeCallbackType.onEnterTransitionDidFinish:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)
                        node.onEnterTransitionDidFinish();
                }
                break;
            case nodeCallbackType.cleanup:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)
                        node.cleanup();
                }
                break;
            case nodeCallbackType.updateTransform:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)
                        node.updateTransform();
                }
                break;
            case nodeCallbackType.onExitTransitionDidStart:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)
                        node.onExitTransitionDidStart();
                }
                break;
            case nodeCallbackType.sortAllChildren:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)
                        node.sortAllChildren();
                }
                break;
            default :
                cc.assert(0, cc._LogInfos.Node._arrayMakeObjectsPerformSelector);
                break;
        }
    },

    /**
     * <p>Properties configuration function </br>
     * All properties in attrs will be set to the node, </br>
     * when the setter of the node is available, </br>
     * the property will be set via setter function.</br>
     * </p>
     * @function
     * @param {Object} attrs Properties to be set to node
     */
    attr: function (attrs) {
        for (var key in attrs) {
            this[key] = attrs[key];
        }
    },

    /**
     * <p>Returns the skew degrees in X </br>
     * The X skew angle of the node in degrees.  <br/>
     * This angle describes the shear distortion in the X direction.<br/>
     * Thus, it is the angle between the Y axis and the left edge of the shape </br>
     * The default skewX angle is 0. Positive values distort the node in a CW direction.</br>
     * </p>
     * @function
     * @return {Number} The X skew angle of the node in degrees.
     */
    getSkewX: function () {
        return this._skewX;
    },

    /**
     * <p>
     * Changes the X skew angle of the node in degrees.                                                    <br/>
     * <br/>
     * This angle describes the shear distortion in the X direction.                                       <br/>
     * Thus, it is the angle between the Y axis and the left edge of the shape                             <br/>
     * The default skewX angle is 0. Positive values distort the node in a CW direction.
     * </p>
     * @function
     * @param {Number} newSkewX The X skew angle of the node in degrees.
     */
    setSkewX: function (newSkewX) {
        this._skewX = newSkewX;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p>Returns the skew degrees in Y               <br/>
     * The Y skew angle of the node in degrees.                            <br/>
     * This angle describes the shear distortion in the Y direction.       <br/>
     * Thus, it is the angle between the X axis and the bottom edge of the shape       <br/>
     * The default skewY angle is 0. Positive values distort the node in a CCW direction.    <br/>
     * </p>
     * @function
     * @return {Number} The Y skew angle of the node in degrees.
     */
    getSkewY: function () {
        return this._skewY;
    },

    /**
     * <p>
     * Changes the Y skew angle of the node in degrees.                                                        <br/>
     *                                                                                                         <br/>
     * This angle describes the shear distortion in the Y direction.                                           <br/>
     * Thus, it is the angle between the X axis and the bottom edge of the shape                               <br/>
     * The default skewY angle is 0. Positive values distort the node in a CCW direction.                      <br/>
     * </p>
     * @function
     * @param {Number} newSkewY  The Y skew angle of the node in degrees.
     */
    setSkewY: function (newSkewY) {
        this._skewY = newSkewY;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p> LocalZOrder is the 'key' used to sort the node relative to its siblings.                                    <br/>
     *                                                                                                                 <br/>
     * The Node's parent will sort all its children based ont the LocalZOrder value.                                   <br/>
     * If two nodes have the same LocalZOrder, then the node that was added first to the children's array              <br/>
     * will be in front of the other node in the array.                                                                <br/>
     * <br/>
     * Also, the Scene Graph is traversed using the "In-Order" tree traversal algorithm ( http://en.wikipedia.org/wiki/Tree_traversal#In-order )
     * <br/>
     * And Nodes that have LocalZOder values smaller than 0 are the "left" subtree                                                 <br/>
     * While Nodes with LocalZOder greater than 0 are the "right" subtree.    </p>
     * @function
     * @param {Number} localZOrder
     */
    setLocalZOrder: function (localZOrder) {
        this._localZOrder = localZOrder;
        if (this._parent)
            this._parent.reorderChild(this, localZOrder);
        cc.eventManager._setDirtyForNode(this);
    },

    //Helper function used by `setLocalZOrder`. Don't use it unless you know what you are doing.
    _setLocalZOrder: function (localZOrder) {
        this._localZOrder = localZOrder;
    },

    /**
     * Returns the local Z order of this node.
     * @function
     * @returns {Number} The local (relative to its siblings) Z order.
     */
    getLocalZOrder: function () {
        return this._localZOrder;
    },

    /**
     * Returns z order of this node
     * @function
     * @return {Number}
     * @deprecated since 3.0, please use getLocalZOrder instead
     */
    getZOrder: function () {
        cc.log(cc._LogInfos.Node.getZOrder);
        return this.getLocalZOrder();
    },

    /**
     * <p>
     *     Sets the Z order which stands for the drawing order, and reorder this node in its parent's children array.     <br/>
     *                                                                                                                    <br/>
     *      The Z order of node is relative to its "brothers": children of the same parent.                               <br/>
     *      It's nothing to do with OpenGL's z vertex. This one only affects the draw order of nodes in cocos2d.          <br/>
     *      The larger number it is, the later this node will be drawn in each message loop.                              <br/>
     *      Please refer to setVertexZ(float) for the difference.
     * </p>
     * @function
     * @param {Number} z Z order of this node.
     * @deprecated since 3.0, please use setLocalZOrder instead
     */
    setZOrder: function (z) {
        cc.log(cc._LogInfos.Node.setZOrder);
        this.setLocalZOrder(z);
    },

    /**
     * <p>Defines the oder in which the nodes are renderer.                                                                               <br/>
     * Nodes that have a Global Z Order lower, are renderer first.                                                                        <br/>
     *                                                                                                                                    <br/>
     * In case two or more nodes have the same Global Z Order, the oder is not guaranteed.                                                <br/>
     * The only exception if the Nodes have a Global Z Order == 0. In that case, the Scene Graph order is used.                           <br/>
     *                                                                                                                                    <br/>
     * By default, all nodes have a Global Z Order = 0. That means that by default, the Scene Graph order is used to render the nodes.    <br/>
     *                                                                                                                                    <br/>
     * Global Z Order is useful when you need to render nodes in an order different than the Scene Graph order.                           <br/>
     *                                                                                                                                    <br/>
     * Limitations: Global Z Order can't be used used by Nodes that have SpriteBatchNode as one of their ancestors.                       <br/>
     * And if ClippingNode is one of the ancestors, then "global Z order" will be relative to the ClippingNode.   </p>
     * @function
     * @param {Number} globalZOrder
     */
    setGlobalZOrder: function (globalZOrder) {
        if (this._globalZOrder !== globalZOrder) {
            this._globalZOrder = globalZOrder;
            cc.eventManager._setDirtyForNode(this);
        }
    },

    /**
     * Return the Node's Global Z Order.
     * @function
     * @returns {number} The node's global Z order
     */
    getGlobalZOrder: function () {
        return this._globalZOrder;
    },

    /**
     * Returns WebGL Z vertex of this node.
     * @function
     * @return {Number} WebGL Z vertex of this node
     */
    getVertexZ: function () {
        return this._vertexZ;
    },

    /**
     * <p>
     *     Sets the real WebGL Z vertex.                                                                          <br/>
     *                                                                                                            <br/>
     *      Differences between openGL Z vertex and cocos2d Z order:                                              <br/>
     *      - WebGL Z modifies the Z vertex, and not the Z order in the relation between parent-children         <br/>
     *      - WebGL Z might require to set 2D projection                                                         <br/>
     *      - cocos2d Z order works OK if all the nodes uses the same WebGL Z vertex. eg: vertexZ = 0            <br/>
     *                                                                                                            <br/>
     *      @warning Use it at your own risk since it might break the cocos2d parent-children z order
     * </p>
     * @function
     * @param {Number} Var
     */
    setVertexZ: function (Var) {
        this._vertexZ = Var;
    },

    /**
     * Returns the rotation (angle) of the node in degrees. 0 is the default rotation angle. Positive values rotate node clockwise.
     * @function
     * @return {Number} The rotation of the node in degrees.
     */
    getRotation: function () {
        if (this._rotationX !== this._rotationY)
            cc.log(cc._LogInfos.Node.getRotation);
        return this._rotationX;
    },

    /**
     * <p>
     *     Sets the rotation (angle) of the node in degrees.                                             <br/>
     *                                                                                                   <br/>
     *      0 is the default rotation angle.                                                             <br/>
     *      Positive values rotate node clockwise, and negative values for anti-clockwise.
     * </p>
     * @function
     * @param {Number} newRotation The rotation of the node in degrees.
     */
    setRotation: function (newRotation) {
        this._rotationX = this._rotationY = newRotation;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the X axis rotation (angle) which represent a horizontal rotational skew of the node in degrees. <br/>
     * 0 is the default rotation angle. Positive values rotate node clockwise<br/>
     * (support only in WebGL rendering mode)
     * @function
     * @return {Number} The X rotation in degrees.
     */
    getRotationX: function () {
        return this._rotationX;
    },

    /**
     * <p>
     *     Sets the X rotation (angle) of the node in degrees which performs a horizontal rotational skew.        <br/>
     *     (support only in WebGL rendering mode)                                                                 <br/>
     *     0 is the default rotation angle.                                                                       <br/>
     *     Positive values rotate node clockwise, and negative values for anti-clockwise.
     * </p>
     * @param {Number} rotationX The X rotation in degrees which performs a horizontal rotational skew.
     */
    setRotationX: function (rotationX) {
        this._rotationX = rotationX;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the Y axis rotation (angle) which represent a vertical rotational skew of the node in degrees. <br/>
     * 0 is the default rotation angle. Positive values rotate node clockwise<br/>
     * (support only in WebGL rendering mode)
     * @function
     * @return {Number} The Y rotation in degrees.
     */
    getRotationY: function () {
        return this._rotationY;
    },

    /**
     * <p>
     *    Sets the Y rotation (angle) of the node in degrees which performs a vertical rotational skew.         <br/>
     *    (support only in WebGL rendering mode)                                                                <br/>
     *    0 is the default rotation angle.                                                                      <br/>
     *    Positive values rotate node clockwise, and negative values for anti-clockwise.
     * </p>
     * @param rotationY The Y rotation in degrees.
     */
    setRotationY: function (rotationY) {
        this._rotationY = rotationY;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the scale factor of the node.
     * @warning: Assertion will fail when _scaleX != _scaleY.
     * @function
     * @return {Number} The scale factor
     */
    getScale: function () {
        if (this._scaleX !== this._scaleY)
            cc.log(cc._LogInfos.Node.getScale);
        return this._scaleX;
    },

    /**
     * Sets the scale factor of the node. 1.0 is the default scale factor. This function can modify the X and Y scale at the same time.
     * @function
     * @param {Number} scale or scaleX value
     * @param {Number} [scaleY=]
     */
    setScale: function (scale, scaleY) {
        this._scaleX = scale;
        this._scaleY = (scaleY || scaleY === 0) ? scaleY : scale;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the scale factor on X axis of this node
     * @function
     * @return {Number} The scale factor on X axis.
     */
    getScaleX: function () {
        return this._scaleX;
    },

    /**
     * <p>
     *     Changes the scale factor on X axis of this node                                   <br/>
     *     The default value is 1.0 if you haven't changed it before
     * </p>
     * @function
     * @param {Number} newScaleX The scale factor on X axis.
     */
    setScaleX: function (newScaleX) {
        this._scaleX = newScaleX;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the scale factor on Y axis of this node
     * @function
     * @return {Number} The scale factor on Y axis.
     */
    getScaleY: function () {
        return this._scaleY;
    },

    /**
     * <p>
     *     Changes the scale factor on Y axis of this node                                            <br/>
     *     The Default value is 1.0 if you haven't changed it before.
     * </p>
     * @function
     * @param {Number} newScaleY The scale factor on Y axis.
     */
    setScaleY: function (newScaleY) {
        this._scaleY = newScaleY;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p>
     *     Changes the position (x,y) of the node in cocos2d coordinates.<br/>
     *     The original point (0,0) is at the left-bottom corner of screen.<br/>
     *     Usually we use cc.p(x,y) to compose CCPoint object.<br/>
     *     and Passing two numbers (x,y) is more efficient than passing CCPoint object.
     * </p>
     * @function
     * @param {cc.Vec2|Number} newPosOrxValue The position (x,y) of the node in coordinates or the X coordinate for position
     * @param {Number} [yValue] Y coordinate for position
     * @example
     *    var size = cc.winSize;
     *    node.setPosition(size.width/2, size.height/2);
     */
    setPosition: function (newPosOrxValue, yValue) {
        var locPosition = this._position;
        if (yValue === undefined) {
            if(locPosition.x === newPosOrxValue.x && locPosition.y === newPosOrxValue.y)
                return;
            locPosition.x = newPosOrxValue.x;
            locPosition.y = newPosOrxValue.y;
        } else {
            if(locPosition.x === newPosOrxValue && locPosition.y === yValue)
                return;
            locPosition.x = newPosOrxValue;
            locPosition.y = yValue;
        }
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p>Returns a copy of the position (x,y) of the node in cocos2d coordinates. (0,0) is the left-bottom corner.</p>
     * @function
     * @return {cc.Vec2} The position (x,y) of the node in OpenGL coordinates
     */
    getPosition: function () {
        return cc.p(this._position);
    },

    /**
     * <p>Returns the x axis position of the node in cocos2d coordinates.</p>
     * @function
     * @return {Number}
     */
    getPositionX: function () {
        return this._position.x;
    },

    /**
     * <p>Sets the x axis position of the node in cocos2d coordinates.</p>
     * @function
     * @param {Number} x The new position in x axis
     */
    setPositionX: function (x) {
        this._position.x = x;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p>Returns the y axis position of the node in cocos2d coordinates.</p>
     * @function
     * @return {Number}
     */
    getPositionY: function () {
        return  this._position.y;
    },

    /**
     * <p>Sets the y axis position of the node in cocos2d coordinates.</p>
     * @function
     * @param {Number} y The new position in y axis
     */
    setPositionY: function (y) {
        this._position.y = y;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the amount of children.
     * @function
     * @return {Number} The amount of children.
     */
    getChildrenCount: function () {
        return this._children.length;
    },

    /**
     * Returns an array of all children  <br/>
     * Composing a "tree" structure is a very important feature of CCNode
     * @function
     * @return {Array} An array of children
     * @example
     *  //This sample code traverses all children nodes, and set their position to (0,0)
     *  var allChildren = parent.getChildren();
     *  for(var i = 0; i< allChildren.length; i++) {
     *      allChildren[i].setPosition(0,0);
     *  }
     */
    getChildren: function () {
        return this._children;
    },

    /**
     * Returns if the node is visible
     * @function
     * @see _ccsg.Node#setVisible
     * @return {Boolean} true if the node is visible, false if the node is hidden.
     */
    isVisible: function () {
        return this._visible;
    },

    /**
     * Sets whether the node is visible <br/>
     * The default value is true
     * @function
     * @param {Boolean} visible Pass true to make the node visible, false to hide the node.
     */
    setVisible: function (visible) {
        if(this._visible !== visible){
            this._visible = visible;
            //if(visible)
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
            cc.renderer.childrenOrderDirty = true;
        }
    },

    /**
     *  <p>Returns a copy of the anchor point.<br/>
     *  Anchor point is the point around which all transformations and positioning manipulations take place.<br/>
     *  It's like a pin in the node where it is "attached" to its parent. <br/>
     *  The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner. <br/>
     *  But you can use values higher than (1,1) and lower than (0,0) too.  <br/>
     *  The default anchor point is (0.5,0.5), so it starts at the center of the node. <br/></p>
     * @function
     * @return {cc.Vec2}  The anchor point of node.
     */
    getAnchorPoint: function () {
        return cc.p(this._anchorPoint);
    },

    /**
     * <p>
     *     Sets the anchor point in percent.                                                                                              <br/>
     *                                                                                                                                    <br/>
     *     anchor point is the point around which all transformations and positioning manipulations take place.                            <br/>
     *     It's like a pin in the node where it is "attached" to its parent.                                                              <br/>
     *     The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.     <br/>
     *     But you can use values higher than (1,1) and lower than (0,0) too.                                                             <br/>
     *     The default anchor point is (0.5,0.5), so it starts at the center of the node.
     * </p>
     * @function
     * @param {cc.Vec2|Number} point The anchor point of node or The x axis anchor of node.
     * @param {Number} [y] The y axis anchor of node.
     */
    setAnchorPoint: function (point, y) {
        var locAnchorPoint = this._anchorPoint;
        if (y === undefined) {
            if ((point.x === locAnchorPoint.x) && (point.y === locAnchorPoint.y))
                return;
            locAnchorPoint.x = point.x;
            locAnchorPoint.y = point.y;
        } else {
            if ((point === locAnchorPoint.x) && (y === locAnchorPoint.y))
                return;
            locAnchorPoint.x = point;
            locAnchorPoint.y = y;
        }
        this._renderCmd._updateAnchorPointInPoint();
    },

    _getAnchorX: function () {
        return this._anchorPoint.x;
    },
    _setAnchorX: function (x) {
        if (this._anchorPoint.x === x) return;
        this._anchorPoint.x = x;
        this._renderCmd._updateAnchorPointInPoint();
    },
    _getAnchorY: function () {
        return this._anchorPoint.y;
    },
    _setAnchorY: function (y) {
        if (this._anchorPoint.y === y) return;
        this._anchorPoint.y = y;
        this._renderCmd._updateAnchorPointInPoint();
    },

    /**
     * Returns a copy of the anchor point in absolute pixels.  <br/>
     * you can only read it. If you wish to modify it, use setAnchorPoint
     * @see _ccsg.Node#getAnchorPoint
     * @function
     * @return {cc.Vec2} The anchor point in absolute pixels.
     */
    getAnchorPointInPoints: function () {
        return this._renderCmd.getAnchorPointInPoints();
    },

    _getWidth: function () {
        return this._contentSize.width;
    },
    _setWidth: function (width) {
        this._contentSize.width = width;
        this._renderCmd._updateAnchorPointInPoint();
    },
    _getHeight: function () {
        return this._contentSize.height;
    },
    _setHeight: function (height) {
        this._contentSize.height = height;
        this._renderCmd._updateAnchorPointInPoint();
    },

    /**
     * <p>Returns a copy the untransformed size of the node. <br/>
     * The contentSize remains the same no matter the node is scaled or rotated.<br/>
     * All nodes has a size. Layer and Scene has the same size of the screen by default. <br/></p>
     * @function
     * @return {Size} The untransformed size of the node.
     */
    getContentSize: function () {
        return cc.size(this._contentSize);
    },

    /**
     * <p>
     *     Sets the untransformed size of the node.                                             <br/>
     *                                                                                          <br/>
     *     The contentSize remains the same no matter the node is scaled or rotated.            <br/>
     *     All nodes has a size. Layer and Scene has the same size of the screen.
     * </p>
     * @function
     * @param {cc.Size|Number} size The untransformed size of the node or The untransformed size's width of the node.
     * @param {Number} [height] The untransformed size's height of the node.
     */
    setContentSize: function (size, height) {
        var locContentSize = this._contentSize;
        if (height === undefined) {
            if ((size.width === locContentSize.width) && (size.height === locContentSize.height))
                return;
            locContentSize.width = size.width;
            locContentSize.height = size.height;
        } else {
            if ((size === locContentSize.width) && (height === locContentSize.height))
                return;
            locContentSize.width = size;
            locContentSize.height = height;
        }
        this._renderCmd._updateAnchorPointInPoint();
    },

    /**
     * <p>
     *     Returns whether or not the node accepts event callbacks.                                     <br/>
     *     Running means the node accept event callbacks like onEnter(), onExit(), update()
     * </p>
     * @function
     * @return {Boolean} Whether or not the node is running.
     */
    isRunning: function () {
        return this._running;
    },

    /**
     * Returns a reference to the parent node
     * @function
     * @return {_ccsg.Node} A reference to the parent node
     */
    getParent: function () {
        return this._parent;
    },

    /**
     * Sets the parent node
     * @param {_ccsg.Node} parent A reference to the parent node
     */
    setParent: function (parent) {
        this._parent = parent;
        var dirtyFlags = _ccsg.Node._dirtyFlags;
        this._renderCmd.setDirtyFlag(dirtyFlags.transformDirty | dirtyFlags.opacityDirty);
    },

    /**
     * Returns whether the anchor point will be ignored when you position this node.<br/>
     * When anchor point ignored, position will be calculated based on the origin point (0, 0) in parent's coordinates.
     * @function
     * @see _ccsg.Node#ignoreAnchorPointForPosition
     * @return {Boolean} true if the anchor point will be ignored when you position this node.
     */
    isIgnoreAnchorPointForPosition: function () {
        return this._ignoreAnchorPointForPosition;
    },

    /**
     * <p>
     *     Sets whether the anchor point will be ignored when you position this node.                              <br/>
     *     When anchor point ignored, position will be calculated based on the origin point (0, 0) in parent's coordinates.  <br/>
     *     This is an internal method, only used by CCLayer and CCScene. Don't call it outside framework.        <br/>
     *     The default value is false, while in CCLayer and CCScene are true
     * </p>
     * @function
     * @param {Boolean} newValue true if anchor point will be ignored when you position this node
     */
    setIgnoreAnchorPointForPosition: function (newValue) {
        if (newValue !== this._ignoreAnchorPointForPosition) {
            this._ignoreAnchorPointForPosition = newValue;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        }
    },

    /**
     * Returns a tag that is used to identify the node easily.
     * @function
     * @return {Number} An integer that identifies the node.
     * @example
     *  //You can set tags to node then identify them easily.
     * // set tags
     * node1.setTag(TAG_PLAYER);
     * node2.setTag(TAG_MONSTER);
     * node3.setTag(TAG_BOSS);
     * parent.addChild(node1);
     * parent.addChild(node2);
     * parent.addChild(node3);
     * // identify by tags
     * var allChildren = parent.getChildren();
     * for(var i = 0; i < allChildren.length; i++){
     *     switch(node.getTag()) {
     *         case TAG_PLAYER:
     *             break;
     *         case TAG_MONSTER:
     *             break;
     *         case TAG_BOSS:
     *             break;
     *     }
     * }
     */
    getTag: function () {
        return this.tag;
    },

    /**
     * Changes the tag that is used to identify the node easily. <br/>
     * Please refer to getTag for the sample code.
     * @function
     * @see _ccsg.Node#getTag
     * @param {Number} tag A integer that identifies the node.
     */
    setTag: function (tag) {
        this.tag = tag;
    },

    /**
     * Changes the name that is used to identify the node easily.
     * @function
     * @param {String} name
     */
    setName: function(name){
         this._name = name;
    },

    /**
     * Returns a string that is used to identify the node.
     * @function
     * @returns {string} A string that identifies the node.
     */
    getName: function(){
        return this._name;
    },

    /**
     * <p>
     *     Update the arrival order.                             <br/>
     *                                                                                                              <br/>
     *     A node which called addChild subsequently will take a larger arrival order,                              <br/>
     *     If two children have the same Z order, the child with larger arrival order will be drawn later.
     * </p>
     * @function
     * @warning This method is used internally for zOrder sorting, don't call this method manually
     */
    updateOrderOfArrival: function () {
        this._arrivalOrder = ++cc.s_globalOrderOfArrival;
    },

    /**
     * <p>Returns the CCActionManager object that is used by all actions.<br/>
     * (IMPORTANT: If you set a new cc.ActionManager, then previously created actions are going to be removed.)</p>
     * @function
     * @see _ccsg.Node#setActionManager
     * @return {cc.ActionManager} A CCActionManager object.
     */
    getActionManager: function () {
        if (!this._actionManager)
            this._actionManager = cc.director.getActionManager();
        return this._actionManager;
    },

    /**
     * <p>Sets the cc.ActionManager object that is used by all actions. </p>
     * @function
     * @warning If you set a new CCActionManager, then previously created actions will be removed.
     * @param {cc.ActionManager} actionManager A CCActionManager object that is used by all actions.
     */
    setActionManager: function (actionManager) {
        if (this._actionManager !== actionManager) {
            this.stopAllActions();
            this._actionManager = actionManager;
        }
    },

    /**
     * <p>
     *   Returns the cc.Scheduler object used to schedule all "updates" and timers.
     * </p>
     * @function
     * @return {cc.Scheduler} A CCScheduler object.
     */
    getScheduler: function () {
        if (!this._scheduler)
            this._scheduler = cc.director.getScheduler();
        return this._scheduler;
    },

    /**
     * <p>
     *   Sets a CCScheduler object that is used to schedule all "updates" and timers.           <br/>
     *   IMPORTANT: If you set a new cc.Scheduler, then previously created timers/update are going to be removed.
     * </p>
     * @function
     * @warning If you set a new CCScheduler, then previously created timers/update are going to be removed.
     * @param scheduler A cc.Scheduler object that is used to schedule all "update" and timers.
     */
    setScheduler: function (scheduler) {
        if (this._scheduler !== scheduler) {
            this.unscheduleAllCallbacks();
            this._scheduler = scheduler;
        }
    },

    /**
     * Returns a "local" axis aligned bounding box of the node. <br/>
     * @deprecated since v3.0, please use getBoundingBox instead
     * @return {Rect}
     */
    boundingBox: function(){
        cc.log(cc._LogInfos.Node.boundingBox);
        return this.getBoundingBox();
    },

    /**
     * Returns a "local" axis aligned bounding box of the node. <br/>
     * The returned box is relative only to its parent.
     * @function
     * @return {Rect} The calculated bounding box of the node
     */
    getBoundingBox: function () {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        return cc._rectApplyAffineTransformIn(rect, this.getNodeToParentTransform());
    },

    /**
     * Stops all running actions and schedulers
     * @function
     */
    cleanup: function () {
        // actions
        this.stopAllActions();
        this.unscheduleAllCallbacks();

        // event
        cc.eventManager.removeListeners(this);

        // timers
        this._arrayMakeObjectsPerformSelector(this._children, _ccsg.Node._stateCallbackType.cleanup);
    },

    // composition: GET
    /**
     * Returns a child from the container given its tag
     * @function
     * @param {Number} aTag An identifier to find the child node.
     * @return {_ccsg.Node} a CCNode object whose tag equals to the input parameter
     */
    getChildByTag: function (aTag) {
        var __children = this._children;
        if (__children !== null) {
            for (var i = 0; i < __children.length; i++) {
                var node = __children[i];
                if (node && node.tag === aTag)
                    return node;
            }
        }
        return null;
    },

    /**
     * Returns a child from the container given its name
     * @function
     * @param {String} name A name to find the child node.
     * @return {_ccsg.Node} a CCNode object whose name equals to the input parameter
     */
    getChildByName: function(name){
        if(!name){
            cc.log("Invalid name");
            return null;
        }

        var locChildren = this._children;
        for(var i = 0, len = locChildren.length; i < len; i++){
           if(locChildren[i]._name === name)
            return locChildren[i];
        }
        return null;
    },

    // composition: ADD

    /** <p>"add" logic MUST only be in this method <br/> </p>
     *
     * <p>If the child is added to a 'running' node, then 'onEnter' and 'onEnterTransitionDidFinish' will be called immediately.</p>
     * @function
     * @param {_ccsg.Node} child  A child node
     * @param {Number} [localZOrder=]  Z order for drawing priority. Please refer to setZOrder(int)
     * @param {Number|String} [tag=]  An integer or a name to identify the node easily. Please refer to setTag(int) and setName(string)
     */
    addChild: function (child, localZOrder, tag) {
        localZOrder = localZOrder === undefined ? child._localZOrder : localZOrder;
        var name, setTag = false;
        if(typeof tag === 'undefined'){
            tag = undefined;
            name = child._name;
        } else if(cc.js.isString(tag)){
            name = tag;
            tag = undefined;
        } else if(cc.js.isNumber(tag)){
            setTag = true;
            name = "";
        }

        cc.assert(child, cc._LogInfos.Node.addChild_3);
        cc.assert(child._parent === null, "child already added. It can't be added again");

        this._addChildHelper(child, localZOrder, tag, name, setTag);
    },

    _addChildHelper: function(child, localZOrder, tag, name, setTag){
        if(!this._children)
            this._children = [];

        this._insertChild(child, localZOrder);
        if(setTag)
            child.setTag(tag);
        else
            child.setName(name);

        child.setParent(this);
        child.updateOrderOfArrival();

        if( this._running ){
            child.onEnter();
            // prevent onEnterTransitionDidFinish to be called twice when a node is added in onEnter
            if (this._isTransitionFinished)
                child.onEnterTransitionDidFinish();
        }
        child._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        if (this._cascadeColorEnabled)
            child._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty);
        if (this._cascadeOpacityEnabled)
            child._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.opacityDirty);
    },

    // composition: REMOVE
    /**
     * Remove itself from its parent node. If cleanup is true, then also remove all actions and callbacks. <br/>
     * If the cleanup parameter is not passed, it will force a cleanup. <br/>
     * If the node orphan, then nothing happens.
     * @function
     * @param {Boolean} [cleanup=true] true if all actions and callbacks on this node should be removed, false otherwise.
     * @see _ccsg.Node#removeFromParentAndCleanup
     */
    removeFromParent: function (cleanup) {
        if (this._parent) {
            if (cleanup === undefined)
                cleanup = true;
            this._parent.removeChild(this, cleanup);
        }
    },

    /**
     * Removes this node itself from its parent node.  <br/>
     * If the node orphan, then nothing happens.
     * @deprecated since v3.0, please use removeFromParent() instead
     * @param {Boolean} [cleanup=true] true if all actions and callbacks on this node should be removed, false otherwise.
     */
    removeFromParentAndCleanup: function (cleanup) {
        cc.log(cc._LogInfos.Node.removeFromParentAndCleanup);
        this.removeFromParent(cleanup);
    },

    /** <p>Removes a child from the container. It will also cleanup all running actions depending on the cleanup parameter. </p>
     * If the cleanup parameter is not passed, it will force a cleanup. <br/>
     * <p> "remove" logic MUST only be on this method  <br/>
     * If a class wants to extend the 'removeChild' behavior it only needs <br/>
     * to override this method </p>
     * @function
     * @param {_ccsg.Node} child  The child node which will be removed.
     * @param {Boolean} [cleanup=true]  true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     */
    removeChild: function (child, cleanup) {
        // explicit nil handling
        if (this._children.length === 0)
            return;

        if (cleanup === undefined)
            cleanup = true;
        if (this._children.indexOf(child) > -1)
            this._detachChild(child, cleanup);

        //this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.visibleDirty);
        cc.renderer.childrenOrderDirty = true;
    },

    /**
     * Removes a child from the container by tag value. It will also cleanup all running actions depending on the cleanup parameter.
     * If the cleanup parameter is not passed, it will force a cleanup. <br/>
     * @function
     * @param {Number} tag An integer number that identifies a child node
     * @param {Boolean} [cleanup=true] true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     * @see _ccsg.Node#removeChildByTag
     */
    removeChildByTag: function (tag, cleanup) {
        if (tag === cc.macro.NODE_TAG_INVALID)
            cc.log(cc._LogInfos.Node.removeChildByTag);

        var child = this.getChildByTag(tag);
        if (!child)
            cc.log(cc._LogInfos.Node.removeChildByTag_2, tag);
        else
            this.removeChild(child, cleanup);
    },

    /**
     * Removes all children from the container and do a cleanup all running actions depending on the cleanup parameter.
     * @param {Boolean} [cleanup=true]
     */
    removeAllChildrenWithCleanup: function (cleanup) {
        this.removeAllChildren(cleanup);
    },

    /**
     * Removes all children from the container and do a cleanup all running actions depending on the cleanup parameter. <br/>
     * If the cleanup parameter is not passed, it will force a cleanup. <br/>
     * @function
     * @param {Boolean} [cleanup=true] true if all running actions on all children nodes should be cleanup, false otherwise.
     */
    removeAllChildren: function (cleanup) {
        // not using detachChild improves speed here
        var __children = this._children;
        if (__children !== null) {
            if (cleanup === undefined)
                cleanup = true;
            for (var i = 0; i < __children.length; i++) {
                var node = __children[i];
                if (node) {
                    if (this._running) {
                        node.onExitTransitionDidStart();
                        node.onExit();
                    }

                    // If you don't do cleanup, the node's actions will not get removed and the
                    if (cleanup)
                        node.cleanup();

                    // set parent nil at the end
                    node.parent = null;
                    node._renderCmd.detachFromParent();
                }
            }
            this._children.length = 0;
            cc.renderer.childrenOrderDirty = true;
        }
    },

    _detachChild: function (child, doCleanup) {
        // IMPORTANT:
        //  -1st do onExit
        //  -2nd cleanup
        if (this._running) {
            child.onExitTransitionDidStart();
            child.onExit();
        }

        // If you don't do cleanup, the child's actions will not get removed and the
        if (doCleanup)
            child.cleanup();

        // set parent nil at the end
        child.parent = null;
        child._renderCmd.detachFromParent();
        cc.js.array.remove(this._children, child);
    },

    _insertChild: function (child, z) {
        cc.renderer.childrenOrderDirty = this._reorderChildDirty = true;
        this._children.push(child);
        child._setLocalZOrder(z);
    },

    setNodeDirty: function(){
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /** Reorders a child according to a new z value. <br/>
     * The child MUST be already added.
     * @function
     * @param {_ccsg.Node} child An already added child node. It MUST be already added.
     * @param {Number} zOrder Z order for drawing priority. Please refer to setZOrder(int)
     */
    reorderChild: function (child, zOrder) {
        cc.assert(child, cc._LogInfos.Node.reorderChild);
        cc.renderer.childrenOrderDirty = this._reorderChildDirty = true;
        child.updateOrderOfArrival();
        child._setLocalZOrder(zOrder);
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.orderDirty);
    },

    /**
     * <p>
     *     Sorts the children array once before drawing, instead of every time when a child is added or reordered.    <br/>
     *     This approach can improves the performance massively.
     * </p>
     * @function
     * @note Don't call this manually unless a child added needs to be removed in the same frame
     */
    sortAllChildren: function () {
        if (this._reorderChildDirty) {
            var _children = this._children;

            // insertion sort
            var len = _children.length, i, j, tmp;
            for(i=1; i<len; i++){
                tmp = _children[i];
                j = i - 1;

                //continue moving element downwards while zOrder is smaller or when zOrder is the same but mutatedIndex is smaller
                while(j >= 0){
                    if(tmp._localZOrder < _children[j]._localZOrder){
                        _children[j+1] = _children[j];
                    }else if(tmp._localZOrder === _children[j]._localZOrder && tmp._arrivalOrder < _children[j]._arrivalOrder){
                        _children[j+1] = _children[j];
                    }else{
                        break;
                    }
                    j--;
                }
                _children[j+1] = tmp;
            }

            //don't need to check children recursively, that's done in visit of each child
            this._reorderChildDirty = false;
        }
    },

    /**
     * Render function using the canvas 2d context or WebGL context, internal usage only, please do not call this function
     * @function
     * @param {CanvasRenderingContext2D | WebGLRenderingContext} ctx The render context
     */
    draw: function (ctx) {
        // override me
        // Only use- this function to draw your staff.
        // DON'T draw your stuff outside this method
    },

    // Internal use only, do not call it by yourself,
    transformAncestors: function () {
        if (this._parent !== null) {
            this._parent.transformAncestors();
            this._parent.transform();
        }
    },

    //scene managment
    /**
     * <p>
     *     Event callback that is invoked every time when CCNode enters the 'stage'.                                   <br/>
     *     If the CCNode enters the 'stage' with a transition, this event is called when the transition starts.        <br/>
     *     During onEnter you can't access a "sister/brother" node.                                                    <br/>
     *     If you override onEnter, you must call its parent's onEnter function with this._super().
     * </p>
     * @function
     */
    onEnter: function () {
        this._isTransitionFinished = false;
        this._running = true;//should be running before resumeSchedule
        this._arrayMakeObjectsPerformSelector(this._children, _ccsg.Node._stateCallbackType.onEnter);
        this.resume();
    },

    /**
     * <p>
     *     Event callback that is invoked when the CCNode enters in the 'stage'.                                                        <br/>
     *     If the CCNode enters the 'stage' with a transition, this event is called when the transition finishes.                       <br/>
     *     If you override onEnterTransitionDidFinish, you shall call its parent's onEnterTransitionDidFinish with this._super()
     * </p>
     * @function
     */
    onEnterTransitionDidFinish: function () {
        this._isTransitionFinished = true;
        this._arrayMakeObjectsPerformSelector(this._children, _ccsg.Node._stateCallbackType.onEnterTransitionDidFinish);
    },

    /**
     * <p>callback that is called every time the ccsg.Node leaves the 'stage'.  <br/>
     * If the ccsg.Node leaves the 'stage' with a transition, this callback is called when the transition starts. <br/>
     * If you override onExitTransitionDidStart, you shall call its parent's onExitTransitionDidStart with this._super()</p>
     * @function
     */
    onExitTransitionDidStart: function () {
        this._arrayMakeObjectsPerformSelector(this._children, _ccsg.Node._stateCallbackType.onExitTransitionDidStart);
    },

    /**
     * <p>
     * callback that is called every time the ccsg.Node leaves the 'stage'.                                         <br/>
     * If the ccsg.Node leaves the 'stage' with a transition, this callback is called when the transition finishes. <br/>
     * During onExit you can't access a sibling node.                                                             <br/>
     * If you override onExit, you shall call its parent's onExit with this._super().
     * </p>
     * @function
     */
    onExit: function () {
        this._running = false;
        this.pause();
        this._arrayMakeObjectsPerformSelector(this._children, _ccsg.Node._stateCallbackType.onExit);
    },

    // actions
    /**
     * Executes an action, and returns the action that is executed.<br/>
     * The node becomes the action's target. Refer to cc.Action's getTarget()
     * @function
     * @warning Starting from v0.8 actions don't retain their target anymore.
     * @param {cc.Action} action
     * @return {cc.Action} An Action pointer
     */
    runAction: function (action) {
        cc.assert(action, cc._LogInfos.Node.runAction);

        this.actionManager.addAction(action, this, !this._running);
        return action;
    },

    /**
     * Stops and removes all actions from the running action list .
     * @function
     */
    stopAllActions: function () {
        this.actionManager && this.actionManager.removeAllActionsFromTarget(this);
    },

    /**
     * Stops and removes an action from the running action list.
     * @function
     * @param {cc.Action} action An action object to be removed.
     */
    stopAction: function (action) {
        this.actionManager.removeAction(action);
    },

    /**
     * Removes an action from the running action list by its tag.
     * @function
     * @param {Number} tag A tag that indicates the action to be removed.
     */
    stopActionByTag: function (tag) {
        if (tag === cc.Action.TAG_INVALID) {
            cc.log(cc._LogInfos.Node.stopActionByTag);
            return;
        }
        this.actionManager.removeActionByTag(tag, this);
    },

    /**
     * Returns an action from the running action list by its tag.
     * @function
     * @see _ccsg.Node#getTag and _ccsg.Node#setTag
     * @param {Number} tag
     * @return {cc.Action} The action object with the given tag.
     */
    getActionByTag: function (tag) {
        if (tag === cc.Action.TAG_INVALID) {
            cc.log(cc._LogInfos.Node.getActionByTag);
            return null;
        }
        return this.actionManager.getActionByTag(tag, this);
    },

    /** <p>Returns the numbers of actions that are running plus the ones that are schedule to run (actions in actionsToAdd and actions arrays).<br/>
     *    Composable actions are counted as 1 action. Example:<br/>
     *    If you are running 1 Sequence of 7 actions, it will return 1. <br/>
     *    If you are running 7 Sequences of 2 actions, it will return 7.</p>
     * @function
     * @return {Number} The number of actions that are running plus the ones that are schedule to run
     */
    getNumberOfRunningActions: function () {
        return this.actionManager.numberOfRunningActionsInTarget(this);
    },

    // _ccsg.Node - Callbacks
    // timers
    /**
     * <p>schedules the "update" method.                                                                           <br/>
     * It will use the order number 0. This method will be called every frame.                                  <br/>
     * Scheduled methods with a lower order value will be called before the ones that have a higher order value.<br/>
     * Only one "update" method could be scheduled per node.</p>
     * @function
     */
    scheduleUpdate: function () {
        this.scheduleUpdateWithPriority(0);
    },

    /**
     * <p>
     * schedules the "update" callback function with a custom priority.
     * This callback function will be called every frame.<br/>
     * Scheduled callback functions with a lower priority will be called before the ones that have a higher value.<br/>
     * Only one "update" callback function could be scheduled per node (You can't have 2 'update' callback functions).<br/>
     * </p>
     * @function
     * @param {Number} priority
     */
    scheduleUpdateWithPriority: function (priority) {
        this.scheduler.scheduleUpdate(this, priority, !this._running);
    },

    /**
     * Unschedules the "update" method.
     * @function
     * @see _ccsg.Node#scheduleUpdate
     */
    unscheduleUpdate: function () {
        this.scheduler.unscheduleUpdate(this);
    },

    /**
     * <p>Schedules a custom selector.         <br/>
     * If the selector is already scheduled, then the interval parameter will be updated without scheduling it again.</p>
     * @function
     * @param {function} callback A function wrapped as a selector
     * @param {Number} interval  Tick interval in seconds. 0 means tick every frame. If interval = 0, it's recommended to use scheduleUpdate() instead.
     * @param {Number} repeat    The selector will be executed (repeat + 1) times, you can use kCCRepeatForever for tick infinitely.
     * @param {Number} delay     The amount of time that the first tick will wait before execution.
     * @param {String} key The only string identifying the callback
     */
    schedule: function (callback, interval, repeat, delay, key) {
        var len = arguments.length;
        if(typeof callback === "function"){
            //callback, interval, repeat, delay, key
            if(len === 1){
                //callback
                interval = 0;
                repeat = cc.macro.REPEAT_FOREVER;
                delay = 0;
                key = this.__instanceId;
            }else if(len === 2){
                if(typeof interval === "number"){
                    //callback, interval
                    repeat = cc.macro.REPEAT_FOREVER;
                    delay = 0;
                    key = this.__instanceId;
                }else{
                    //callback, key
                    key = interval;
                    interval = 0;
                    repeat = cc.macro.REPEAT_FOREVER;
                    delay = 0;
                }
            }else if(len === 3){
                if(typeof repeat === "string"){
                    //callback, interval, key
                    key = repeat;
                    repeat = cc.macro.REPEAT_FOREVER;
                }else{
                    //callback, interval, repeat
                    key = this.__instanceId;
                }
                delay = 0;
            }else if(len === 4){
                key = this.__instanceId;
            }
        }else{
            //selector
            //selector, interval
            //selector, interval, repeat, delay
            if(len === 1){
                interval = 0;
                repeat = cc.macro.REPEAT_FOREVER;
                delay = 0;
            }else if(len === 2){
                repeat = cc.macro.REPEAT_FOREVER;
                delay = 0;
            }
        }

        cc.assert(callback, cc._LogInfos.Node.schedule);
        cc.assert(interval >= 0, cc._LogInfos.Node.schedule_2);

        interval = interval || 0;
        repeat = (repeat == null) ? cc.macro.REPEAT_FOREVER : repeat;
        delay = delay || 0;

        this.scheduler.schedule(callback, this, interval, repeat, delay, !this._running, key);
    },

    /**
     * Schedules a callback function that runs only once, with a delay of 0 or larger
     * @function
     * @see _ccsg.Node#schedule
     * @param {function} callback  A function wrapped as a selector
     * @param {Number} delay  The amount of time that the first tick will wait before execution.
     * @param {String} key The only string identifying the callback
     */
    scheduleOnce: function (callback, delay, key) {
        //selector, delay
        //callback, delay, key
        if(key === undefined)
            key = this.__instanceId;
        this.schedule(callback, 0, 0, delay, key);
    },

    /**
     * unschedules a custom callback function.
     * @function
     * @see _ccsg.Node#schedule
     * @param {function} callback_fn  A function wrapped as a selector
     */
    unschedule: function (callback_fn) {
        //key
        //selector
        if (!callback_fn)
            return;

        this.scheduler.unschedule(callback_fn, this);
    },

    /**
     * <p>unschedule all scheduled callback functions: custom callback functions, and the 'update' callback function.<br/>
     * Actions are not affected by this method.</p>
     * @function
     */
    unscheduleAllCallbacks: function () {
        this.scheduler.unscheduleAllForTarget(this);
    },

    /**
     * Resumes all scheduled selectors and actions.<br/>
     * This method is called internally by onEnter
     * @function
     * @deprecated since v3.0, please use resume() instead
     */
    resumeSchedulerAndActions: function () {
        cc.log(cc._LogInfos.Node.resumeSchedulerAndActions);
        this.resume();
    },

    /**
     * <p>Resumes all scheduled selectors and actions.<br/>
     * This method is called internally by onEnter</p>
     */
    resume: function () {
        this.scheduler.resumeTarget(this);
        this.actionManager && this.actionManager.resumeTarget(this);
        cc.eventManager.resumeTarget(this);
    },

    /**
     * <p>Pauses all scheduled selectors and actions.<br/>
     * This method is called internally by onExit</p>
     * @deprecated since v3.0, please use pause instead
     * @function
     */
    pauseSchedulerAndActions: function () {
        cc.log(cc._LogInfos.Node.pauseSchedulerAndActions);
        this.pause();
    },

    /**
     * <p>Pauses all scheduled selectors and actions.<br/>
     * This method is called internally by onExit</p>
     * @function
     */
    pause: function () {
        this.scheduler.pauseTarget(this);
        this.actionManager && this.actionManager.pauseTarget(this);
        cc.eventManager.pauseTarget(this);
    },

    /**
     *<p>Sets the additional transform.<br/>
     *  The additional transform will be concatenated at the end of getNodeToParentTransform.<br/>
     *  It could be used to simulate `parent-child` relationship between two nodes (e.g. one is in BatchNode, another isn't).<br/>
     *  </p>
     *  @function
     *  @param {cc.AffineTransform} additionalTransform  The additional transform
     *  @example
     * // create a batchNode
     * var batch = new cc.SpriteBatchNode("Icon-114.png");
     * this.addChild(batch);
     *
     * // create two sprites, spriteA will be added to batchNode, they are using different textures.
     * var spriteA = new _ccsg.Sprite(batch->getTexture());
     * var spriteB = new _ccsg.Sprite("Icon-72.png");
     *
     * batch.addChild(spriteA);
     *
     * // We can't make spriteB as spriteA's child since they use different textures. So just add it to layer.
     * // But we want to simulate `parent-child` relationship for these two node.
     * this.addChild(spriteB);
     *
     * //position
     * spriteA.setPosition(ccp(200, 200));
     *
     * // Gets the spriteA's transform.
     * var t = spriteA.getNodeToParentTransform();
     *
     * // Sets the additional transform to spriteB, spriteB's position will based on its pseudo parent i.e. spriteA.
     * spriteB.setAdditionalTransform(t);
     *
     * //scale
     * spriteA.setScale(2);
     *
     * // Gets the spriteA's transform.
     * t = spriteA.getNodeToParentTransform();
     *
     * // Sets the additional transform to spriteB, spriteB's scale will based on its pseudo parent i.e. spriteA.
     * spriteB.setAdditionalTransform(t);
     *
     * //rotation
     * spriteA.setRotation(20);
     *
     * // Gets the spriteA's transform.
     * t = spriteA.getNodeToParentTransform();
     *
     * // Sets the additional transform to spriteB, spriteB's rotation will based on its pseudo parent i.e. spriteA.
     * spriteB.setAdditionalTransform(t);
     */
    setAdditionalTransform: function (additionalTransform) {
        if(additionalTransform === undefined)
            return this._additionalTransformDirty = false;
        this._additionalTransform = additionalTransform;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        this._additionalTransformDirty = true;
    },

    /**
     * Returns the matrix that transform parent's space coordinates to the node's (local) space coordinates.<br/>
     * The matrix is in Pixels.
     * @function
     * @return {cc.AffineTransform}
     */
    getParentToNodeTransform: function () {
       return this._renderCmd.getParentToNodeTransform();
    },

    /**
     * @function
     * @deprecated since v3.0, please use getParentToNodeTransform instead
     */
    parentToNodeTransform: function () {
        return this.getParentToNodeTransform();
    },

    /**
     * Returns the world affine transform matrix. The matrix is in Pixels.
     * @function
     * @return {cc.AffineTransform}
     */
    getNodeToWorldTransform: function () {
        var t = this.getNodeToParentTransform();
        for (var p = this._parent; p !== null; p = p.parent)
            t = cc.affineTransformConcat(t, p.getNodeToParentTransform());
        return t;
    },

    /**
     * @function
     * @deprecated since v3.0, please use getNodeToWorldTransform instead
     */
    nodeToWorldTransform: function(){
        return this.getNodeToWorldTransform();
    },

    /**
     * Returns the inverse world affine transform matrix. The matrix is in Pixels.
     * @function
     * @return {cc.AffineTransform}
     */
    getWorldToNodeTransform: function () {
        return cc.affineTransformInvert(this.getNodeToWorldTransform());
    },

    /**
     * @function
     * @deprecated since v3.0, please use getWorldToNodeTransform instead
     */
    worldToNodeTransform: function () {
        return this.getWorldToNodeTransform();
    },

    /**
     * Converts a Point to node (local) space coordinates. The result is in Points.
     * @function
     * @param {cc.Vec2} worldPoint
     * @return {cc.Vec2}
     */
    convertToNodeSpace: function (worldPoint) {
        return cc.pointApplyAffineTransform(worldPoint, this.getWorldToNodeTransform());
    },

    /**
     * Converts a Point to world space coordinates. The result is in Points.
     * @function
     * @param {cc.Vec2} nodePoint
     * @return {cc.Vec2}
     */
    convertToWorldSpace: function (nodePoint) {
        nodePoint = nodePoint || cc.v2(0, 0);
        return cc.pointApplyAffineTransform(nodePoint, this.getNodeToWorldTransform());
    },

    /**
     * Converts a Point to node (local) space coordinates. The result is in Points.<br/>
     * treating the returned/received node point as anchor relative.
     * @function
     * @param {cc.Vec2} worldPoint
     * @return {cc.Vec2}
     */
    convertToNodeSpaceAR: function (worldPoint) {
        return cc.pSub(this.convertToNodeSpace(worldPoint), this._renderCmd.getAnchorPointInPoints());
    },

    /**
     * Converts a local Point to world space coordinates.The result is in Points.<br/>
     * treating the returned/received node point as anchor relative.
     * @function
     * @param {cc.Vec2} nodePoint
     * @return {cc.Vec2}
     */
    convertToWorldSpaceAR: function (nodePoint) {
        nodePoint = nodePoint || cc.v2(0, 0);
        var pt = cc.pAdd(nodePoint, this._renderCmd.getAnchorPointInPoints());
        return this.convertToWorldSpace(pt);
    },

    _convertToWindowSpace: function (nodePoint) {
        var worldPoint = this.convertToWorldSpace(nodePoint);
        return cc.director.convertToUI(worldPoint);
    },

    /** convenience methods which take a cc.Touch instead of cc.Vec2
     * @function
     * @param {cc.Touch} touch The touch object
     * @return {cc.Vec2}
     */
    convertTouchToNodeSpace: function (touch) {
        var point = touch.getLocation();
        return this.convertToNodeSpace(point);
    },

    /**
     * converts a cc.Touch (world coordinates) into a local coordinate. This method is AR (Anchor Relative).
     * @function
     * @param {cc.Touch} touch The touch object
     * @return {cc.Vec2}
     */
    convertTouchToNodeSpaceAR: function (touch) {
        var point = cc.director.convertToGL(touch.getLocation());
        return this.convertToNodeSpaceAR(point);
    },

    /**
     * <p>
     * Calls children's updateTransform() method recursively.                                        <br/>
     *                                                                                               <br/>
     * This method is moved from CCSprite, so it's no longer specific to CCSprite.                   <br/>
     * As the result, you apply CCSpriteBatchNode's optimization on your customed CCNode.            <br/>
     * e.g., batchNode->addChild(myCustomNode), while you can only addChild(sprite) before.
     * </p>
     * @function
     */
    updateTransform: function () {
        // Recursively iterate over children
        this._arrayMakeObjectsPerformSelector(this._children, _ccsg.Node._stateCallbackType.updateTransform);
    },

    /**
     * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
     * You will need to retain an object if you created an engine object and haven't added it into the scene graph during the same frame.<br/>
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
     * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
     * The retain function can increase a reference count for the native object to avoid it being released,<br/>
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
     * retain and release function call should be paired in developer's game code.</p>
     * @function
     * @see _ccsg.Node#release
     */
    retain: function () {
    },
    /**
     * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
     * You will need to retain an object if you created an engine object and haven't added it into the scene graph during the same frame.<br/>
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
     * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
     * The retain function can increase a reference count for the native object to avoid it being released,<br/>
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
     * retain and release function call should be paired in developer's game code.</p>
     * @function
     * @see _ccsg.Node#retain
     */
    release: function () {
    },

    /**
     * Recursive method that visit its children and draw them
     * @function
     * @param {_ccsg.Node.RenderCmd} parentCmd
     */
    visit: function(parentCmd){
        this._renderCmd.visit(parentCmd);
    },

    /**
     * Performs view-matrix transformation based on position, scale, rotation and other attributes.
     * @function
     * @param {_ccsg.Node.RenderCmd} parentCmd parent's render command
     * @param {boolean} recursive whether call its children's transform
     */
    transform: function(parentCmd, recursive){
        this._renderCmd.transform(parentCmd, recursive);
    },

    /**
     * <p>Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
     * The matrix is in Pixels.</p>
     * @function
     * @return {cc.AffineTransform}
     * @deprecated since v3.0, please use getNodeToParentTransform instead
     */
    nodeToParentTransform: function(){
        return this.getNodeToParentTransform();
    },

    /**
     * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
     * The matrix is in Pixels.
     * @function
     * @return {cc.AffineTransform} The affine transform object
     */
    getNodeToParentTransform: function(ancestor){
        var t = this._renderCmd.getNodeToParentTransform();
        if(ancestor){
            var T = {a: t.a, b: t.b, c: t.c, d: t.d, tx: t.tx, ty: t.ty};
            for(var p = this._parent;  p != null && p != ancestor ; p = p.getParent()){
                cc.affineTransformConcatIn(T, p.getNodeToParentTransform());
            }
            return T;
        }else{
            return t;
        }
    },

    getNodeToParentAffineTransform: function(ancestor){
        return this.getNodeToParentTransform(ancestor);
    },

    /**
     * Return the shader program currently used for this node
     * @function
     * @return {cc.GLProgram} The shader program currently used for this node
     */
    getShaderProgram: function () {
        return this._renderCmd.getShaderProgram();
    },

    /**
     * <p>
     *     Sets the shader program for this node
     *
     *     Since v2.0, each rendering node must set its shader program.
     *     It should be set in initialize phase.
     * </p>
     * @function
     * @param {cc.GLProgram} newShaderProgram The shader program which fetches from CCShaderCache.
     * @example
     * node.setGLProgram(cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_TEXTURECOLOR));
     */
    setShaderProgram: function (newShaderProgram) {
        this._renderCmd.setShaderProgram(newShaderProgram);
    },

    /**
     * Returns the state of OpenGL server side.
     * @function
     * @return {Number} The state of OpenGL server side.
     * @deprecated since v3.0, no need anymore
     */
    getGLServerState: function () {
        return 0;
    },

    /**
     * Sets the state of OpenGL server side.
     * @function
     * @param {Number} state The state of OpenGL server side.
     * @deprecated since v3.0, no need anymore
     */
    setGLServerState: function (state) {
    },

    /**
     * Returns a "world" axis aligned bounding box of the node.
     * @function
     * @return {Rect}
     */
    getBoundingBoxToWorld: function () {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        var trans = this.getNodeToWorldTransform();
        cc._rectApplyAffineTransformIn(rect, trans);

        //query child's BoundingBox
        if (!this._children)
            return rect;

        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child = locChildren[i];
            if (child && child._visible) {
                var childRect = child._getBoundingBoxToCurrentNode(trans);
                if (childRect)
                    rect = cc.rectUnion(rect, childRect);
            }
        }
        return rect;
    },

    _getBoundingBoxToCurrentNode: function (parentTransform) {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        var trans = (parentTransform === undefined) ? this.getNodeToParentTransform() : cc.affineTransformConcat(this.getNodeToParentTransform(), parentTransform);
        cc._rectApplyAffineTransformIn(rect, trans);

        //query child's BoundingBox
        if (!this._children)
            return rect;

        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child = locChildren[i];
            if (child && child._visible) {
                var childRect = child._getBoundingBoxToCurrentNode(trans);
                if (childRect)
                    rect = cc.rectUnion(rect, childRect);
            }
        }
        return rect;
    },

    /**
     * Returns the opacity of Node
     * @function
     * @returns {number} opacity
     */
    getOpacity: function () {
        return this._realOpacity;
    },

    /**
     * Returns the displayed opacity of Node,
     * the difference between displayed opacity and opacity is that displayed opacity is calculated based on opacity and parent node's opacity when cascade opacity enabled.
     * @function
     * @returns {number} displayed opacity
     */
    getDisplayedOpacity: function () {
        return this._renderCmd.getDisplayedOpacity();
    },

    /**
     * Sets the opacity of Node
     * @function
     * @param {Number} opacity
     */
    setOpacity: function (opacity) {
        this._realOpacity = opacity;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.opacityDirty);
    },

    /**
     * Update displayed opacity
     * @function
     * @param {Number} parentOpacity
     */
    updateDisplayedOpacity: function (parentOpacity) {
        //TODO  this API shouldn't be public.
        this._renderCmd._updateDisplayOpacity(parentOpacity);
    },

    /**
     * Returns whether node's opacity value affect its child nodes.
     * @function
     * @returns {boolean}
     */
    isCascadeOpacityEnabled: function () {
        return this._cascadeOpacityEnabled;
    },

    /**
     * Enable or disable cascade opacity, if cascade enabled, child nodes' opacity will be the multiplication of parent opacity and its own opacity.
     * @function
     * @param {boolean} cascadeOpacityEnabled
     */
    setCascadeOpacityEnabled: function (cascadeOpacityEnabled) {
        if (this._cascadeOpacityEnabled === cascadeOpacityEnabled)
            return;
        this._cascadeOpacityEnabled = cascadeOpacityEnabled;
        this._renderCmd.setCascadeOpacityEnabledDirty();
    },

    /**
     * Returns the color of Node
     * @function
     * @returns {cc.Color}
     */
    getColor: function () {
        var locRealColor = this._realColor;
        return cc.color(locRealColor.r, locRealColor.g, locRealColor.b, locRealColor.a);
    },

    /**
     * Returns the displayed color of Node,
     * the difference between displayed color and color is that displayed color is calculated based on color and parent node's color when cascade color enabled.
     * @function
     * @returns {cc.Color}
     */
    getDisplayedColor: function () {
        return this._renderCmd.getDisplayedColor();
    },

    /**
     * <p>Sets the color of Node.<br/>
     * When color doesn't include opacity value like cc.color(128,128,128), this function only change the color. <br/>
     * When color include opacity like cc.color(128,128,128,100), then this function will change the color and the opacity.</p>
     * @function
     * @param {cc.Color} color The new color given
     */
    setColor: function (color) {
        var locRealColor = this._realColor;
        locRealColor.r = color.r;
        locRealColor.g = color.g;
        locRealColor.b = color.b;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty);
    },

    /**
     * Update the displayed color of Node
     * @function
     * @param {cc.Color} parentColor
     */
    updateDisplayedColor: function (parentColor) {
        //TODO  this API shouldn't be public.
        this._renderCmd._updateDisplayColor(parentColor);
    },

    /**
     * Returns whether node's color value affect its child nodes.
     * @function
     * @returns {boolean}
     */
    isCascadeColorEnabled: function () {
        return this._cascadeColorEnabled;
    },

    /**
     * Enable or disable cascade color, if cascade enabled, child nodes' opacity will be the cascade value of parent color and its own color.
     * @param {boolean} cascadeColorEnabled
     */
    setCascadeColorEnabled: function (cascadeColorEnabled) {
        if (this._cascadeColorEnabled === cascadeColorEnabled)
            return;
        this._cascadeColorEnabled = cascadeColorEnabled;
        this._renderCmd.setCascadeColorEnabledDirty();
    },

    /**
     * Set whether color should be changed with the opacity value,
     * useless in ccsg.Node, but this function is override in some class to have such behavior.
     * @function
     * @param {Boolean} opacityValue
     */
    setOpacityModifyRGB: function (opacityValue) {
    },

    /**
     * Get whether color should be changed with the opacity value
     * @function
     * @return {Boolean}
     */
    isOpacityModifyRGB: function () {
        return false;
    },

    _initRendererCmd: function(){
        this._renderCmd = cc.renderer.getRenderCmd(this);
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new _ccsg.Node.CanvasRenderCmd(this);
        else
            return new _ccsg.Node.WebGLRenderCmd(this);
    }
});

_ccsg.Node.extend = function (options) {
    return cc._Class.extend.call(_ccsg.Node, options);
};

// to support calling this._super in sub class
_ccsg.Node.prototype.ctor = _ccsg.Node;

_ccsg.Node._stateCallbackType = {onEnter: 1, onExit: 2, cleanup: 3, onEnterTransitionDidFinish: 4, updateTransform: 5, onExitTransitionDidStart: 6, sortAllChildren: 7};

cc.assert(typeof cc._tmp.PrototypeCCNode === 'function', cc._LogInfos.MissingFile, "BaseNodesPropertyDefine.js");
cc._tmp.PrototypeCCNode();
delete cc._tmp.PrototypeCCNode;

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

//---------------------- Customer render cmd --------------------
cc.CustomRenderCmd = function (target, func) {
    this._needDraw = true;
    this._target = target;
    this._callback = func;

    this.rendering = function (ctx, scaleX, scaleY) {
        if (!this._callback)
            return;
        this._callback.call(this._target, ctx, scaleX, scaleY);
    };
};

var dirtyFlags = _ccsg.Node._dirtyFlags = {
    transformDirty: 1 << 0,
    visibleDirty:   1 << 1,
    colorDirty:     1 << 2,
    opacityDirty:   1 << 3,
    cacheDirty:     1 << 4,
    orderDirty:     1 << 5,
    textDirty:      1 << 6,
    gradientDirty:  1 << 7,
    textureDirty:   1 << 8,
    contentDirty:   1 << 9,
    COUNT: 9
};
cc.js.get(dirtyFlags, 'all', function () {
    var count = dirtyFlags.COUNT;
    return (1 << count) - 1;
}, false);
_ccsg.Node._requestDirtyFlag = function (key) {
    cc.assert(!dirtyFlags[key], cc._LogInfos.Node._requestDirtyFlag, key);

    var count = dirtyFlags.COUNT;
    var value = 1 << count;
    dirtyFlags[key] = value;
    dirtyFlags.COUNT++;
    return value;
};

var ONE_DEGREE = Math.PI / 180;
var stack = new Array(50);

function transformChildTree (root) {
    var index = 1;
    var children, child, curr, parentCmd, i, len;
    stack[0] = root;
    while (index) {
        index--;
        curr = stack[index];
        // Avoid memory leak
        stack[index] = null;
        if (!curr) continue;
        children = curr._children;
        if (children && children.length > 0) {
            parentCmd = curr._renderCmd;
            for (i = 0, len = children.length; i < len; ++i) {
                child = children[i];
                stack[index] = child;
                index++;
                child._renderCmd.transform(parentCmd);
            }
        }
    }
}

//-------------------------Base -------------------------
_ccsg.Node.RenderCmd = function(renderable){
    this._dirtyFlag = 1;                           //need update the transform at first.
    cc.renderer.pushDirtyNode(this);

    this._node = renderable;
    this._needDraw = false;
    this._anchorPointInPoints = new cc.Vec2(0,0);

    this._transform = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
    this._worldTransform = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
    this._inverse = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};

    this._displayedOpacity = 255;
    this._displayedColor = cc.color(255, 255, 255, 255);
    this._cascadeColorEnabledDirty = false;
    this._cascadeOpacityEnabledDirty = false;
    this._curLevel = -1;

};

_ccsg.Node.RenderCmd.prototype = {
    constructor: _ccsg.Node.RenderCmd,

    getAnchorPointInPoints: function(){
        return cc.p(this._anchorPointInPoints);
    },

    getDisplayedColor: function(){
        var tmpColor = this._displayedColor;
        return cc.color(tmpColor.r, tmpColor.g, tmpColor.b, tmpColor.a);
    },

    getDisplayedOpacity: function(){
        return this._displayedOpacity;
    },

    setCascadeColorEnabledDirty: function(){
        this._cascadeColorEnabledDirty = true;
        this.setDirtyFlag(dirtyFlags.colorDirty);
    },

    setCascadeOpacityEnabledDirty:function(){
        this._cascadeOpacityEnabledDirty = true;
        this.setDirtyFlag(dirtyFlags.opacityDirty);
    },

    getParentToNodeTransform: function(){
        if(this._dirtyFlag & dirtyFlags.transformDirty)
            this._inverse = cc.affineTransformInvert(this.getNodeToParentTransform());
        return this._inverse;
    },

    detachFromParent: function(){},

    _updateAnchorPointInPoint: function() {
        var locAPP = this._anchorPointInPoints, locSize = this._node._contentSize, locAnchorPoint = this._node._anchorPoint;
        locAPP.x = locSize.width * locAnchorPoint.x;
        locAPP.y = locSize.height * locAnchorPoint.y;
        this.setDirtyFlag(dirtyFlags.transformDirty);
    },

    setDirtyFlag: function(dirtyFlag){
        if (this._dirtyFlag === 0 && dirtyFlag !== 0)
            cc.renderer.pushDirtyNode(this);
        this._dirtyFlag |= dirtyFlag;
    },

    getParentRenderCmd: function(){
        if(this._node && this._node._parent && this._node._parent._renderCmd)
            return this._node._parent._renderCmd;
        return null;
    },

    transform: function (parentCmd, recursive) {
        var node = this._node,
            pt = parentCmd ? parentCmd._worldTransform : null,
            t = this._transform,
            wt = this._worldTransform;         //get the world transform

        var hasRotation = node._rotationX || node._rotationY;
        var hasSkew = node._skewX || node._skewY;
        var sx = node._scaleX, sy = node._scaleY;
        var appX = this._anchorPointInPoints.x, appY = this._anchorPointInPoints.y;
        var a = 1, b = 0, c = 0, d = 1;
        if (hasRotation || hasSkew) {
            // position 
            t.tx = node._position.x;
            t.ty = node._position.y;

            // rotation
            if (hasRotation) {
                var rotationRadiansX = node._rotationX * ONE_DEGREE;
                c = Math.sin(rotationRadiansX);
                d = Math.cos(rotationRadiansX);
                if (node._rotationY === node._rotationX) {
                    a = d;
                    b = -c;
                }
                else {
                    var rotationRadiansY = node._rotationY * ONE_DEGREE;
                    a = Math.cos(rotationRadiansY);
                    b = -Math.sin(rotationRadiansY);
                }
            }

            // scale
            t.a = a *= sx;
            t.b = b *= sx;
            t.c = c *= sy;
            t.d = d *= sy;

            // skew
            if (hasSkew) {
                var skx = Math.tan(node._skewX * ONE_DEGREE);
                var sky = Math.tan(node._skewY * ONE_DEGREE);
                if (skx === Infinity)
                    skx = 99999999;
                if (sky === Infinity)
                    sky = 99999999;
                t.a = a + c * sky;
                t.b = b + d * sky;
                t.c = c + a * skx;
                t.d = d + b * skx;
            }

            if (appX || appY) {
                t.tx -= t.a * appX + t.c * appY;
                t.ty -= t.b * appX + t.d * appY;
                // adjust anchorPoint
                if (node._ignoreAnchorPointForPosition) {
                    t.tx += appX;
                    t.ty += appY;
                }
            }

            if (pt) {
                // cc.AffineTransformConcat is incorrect at get world transform
                wt.a = t.a * pt.a + t.b * pt.c;                               //a
                wt.b = t.a * pt.b + t.b * pt.d;                               //b
                wt.c = t.c * pt.a + t.d * pt.c;                               //c
                wt.d = t.c * pt.b + t.d * pt.d;                               //d
                wt.tx = pt.a * t.tx + pt.c * t.ty + pt.tx;
                wt.ty = pt.d * t.ty + pt.ty + pt.b * t.tx;
            } else {
                wt.a = t.a;
                wt.b = t.b;
                wt.c = t.c;
                wt.d = t.d;
                wt.tx = t.tx;
                wt.ty = t.ty;
            }
        }
        else {
            t.a = sx;
            t.b = 0;
            t.c = 0;
            t.d = sy;
            t.tx = node._position.x;
            t.ty = node._position.y;

            if (appX || appY) {
                t.tx -= t.a * appX;
                t.ty -= t.d * appY;
                // adjust anchorPoint
                if (node._ignoreAnchorPointForPosition) {
                    t.tx += appX;
                    t.ty += appY;
                }
            }

            if (pt) {
                wt.a  = t.a  * pt.a + t.b  * pt.c;
                wt.b  = t.a  * pt.b + t.b  * pt.d;
                wt.c  = t.c  * pt.a + t.d  * pt.c;
                wt.d  = t.c  * pt.b + t.d  * pt.d;
                wt.tx = t.tx * pt.a + t.ty * pt.c + pt.tx;
                wt.ty = t.tx * pt.b + t.ty * pt.d + pt.ty;
            } else {
                wt.a = t.a;
                wt.b = t.b;
                wt.c = t.c;
                wt.d = t.d;
                wt.tx = t.tx;
                wt.ty = t.ty;
            }
        }

        if (this._currentRegion) {
            this._updateCurrentRegions();
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.DirtyDouble);
        }

        if (recursive) {
            transformChildTree(node);
        }

        this._cacheDirty = true;
    },

    getNodeToParentTransform: function () {
        if (this._dirtyFlag & dirtyFlags.transformDirty) {
            this.transform();
        }
        return this._transform;
    },

    _propagateFlagsDown: function(parentCmd) {
        //return;
        var locFlag = this._dirtyFlag;
        var parentNode = parentCmd ? parentCmd._node : null;

        //  There is a possibility:
        //    The parent element changed color, child element not change
        //    This will cause the parent element changed color
        //    But while the child element does not enter the circulation
        //    Here will be reset state in last
        //    In order the child elements get the parent state
        if(parentNode && parentNode._cascadeColorEnabled && (parentCmd._dirtyFlag & dirtyFlags.colorDirty))
            locFlag |= dirtyFlags.colorDirty;

        if(parentNode && parentNode._cascadeOpacityEnabled && (parentCmd._dirtyFlag & dirtyFlags.opacityDirty))
            locFlag |= dirtyFlags.opacityDirty;

        if(parentCmd && (parentCmd._dirtyFlag & dirtyFlags.transformDirty))
            locFlag |= dirtyFlags.transformDirty;

        this._dirtyFlag = locFlag;
    },

    visit: function (parentCmd) {
        var node = this._node, renderer = cc.renderer;

        parentCmd = parentCmd || this.getParentRenderCmd();
        if (parentCmd) {
            this._curLevel = parentCmd._curLevel + 1;
        }
        this._propagateFlagsDown(parentCmd);

        // quick return if not visible
        if (!node._visible)
            return;

        if (isNaN(node._customZ)) {
            node._vertexZ = renderer.assignedZ;
            renderer.assignedZ += renderer.assignedZStep;
        }

        this._syncStatus(parentCmd);
        this.visitChildren();
    },

    _updateDisplayColor: function (parentColor) {
       var node = this._node;
       var locDispColor = this._displayedColor, locRealColor = node._realColor;
       var i, len, selChildren, item;
        this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
       if (this._cascadeColorEnabledDirty && !node._cascadeColorEnabled) {
           locDispColor.r = locRealColor.r;
           locDispColor.g = locRealColor.g;
           locDispColor.b = locRealColor.b;
           var whiteColor = new cc.Color(255, 255, 255, 255);
           selChildren = node._children;
           for (i = 0, len = selChildren.length; i < len; i++) {
               item = selChildren[i];
               if (item && item._renderCmd)
                   item._renderCmd._updateDisplayColor(whiteColor);
           }
           this._cascadeColorEnabledDirty = false;
       } else {
           if (parentColor === undefined) {
               var locParent = node._parent;
               if (locParent && locParent._cascadeColorEnabled)
                   parentColor = locParent.getDisplayedColor();
               else
                   parentColor = cc.Color.WHITE;
           }
           locDispColor.r = 0 | (locRealColor.r * parentColor.r / 255.0);
           locDispColor.g = 0 | (locRealColor.g * parentColor.g / 255.0);
           locDispColor.b = 0 | (locRealColor.b * parentColor.b / 255.0);
           if (node._cascadeColorEnabled) {
               selChildren = node._children;
               for (i = 0, len = selChildren.length; i < len; i++) {
                   item = selChildren[i];
                   if (item && item._renderCmd){
                       item._renderCmd._updateDisplayColor(locDispColor);
                       item._renderCmd._updateColor();
                   }
               }
           }
       }
       this._dirtyFlag &= ~dirtyFlags.colorDirty;
   },

    _updateDisplayOpacity: function (parentOpacity) {
        var node = this._node;
        var i, len, selChildren, item;
        this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
        if (this._cascadeOpacityEnabledDirty && !node._cascadeOpacityEnabled) {
            this._displayedOpacity = node._realOpacity;
            selChildren = node._children;
            for (i = 0, len = selChildren.length; i < len; i++) {
                item = selChildren[i];
                if (item && item._renderCmd)
                    item._renderCmd._updateDisplayOpacity(255);
            }
            this._cascadeOpacityEnabledDirty = false;
        } else {
            if (parentOpacity === undefined) {
                var locParent = node._parent;
                parentOpacity = 255;
                if (locParent && locParent._cascadeOpacityEnabled)
                    parentOpacity = locParent.getDisplayedOpacity();
            }
            this._displayedOpacity = node._realOpacity * parentOpacity / 255.0;
            if (node._cascadeOpacityEnabled) {
                selChildren = node._children;
                for (i = 0, len = selChildren.length; i < len; i++) {
                    item = selChildren[i];
                    if (item && item._renderCmd){
                        item._renderCmd._updateDisplayOpacity(this._displayedOpacity);
                        item._renderCmd._updateColor();
                    }
                }
            }
        }
        this._dirtyFlag &= ~dirtyFlags.opacityDirty;
    },

    _syncDisplayColor : function (parentColor) {
        var node = this._node, locDispColor = this._displayedColor, locRealColor = node._realColor;
        if (parentColor === undefined) {
            var locParent = node._parent;
            if (locParent && locParent._cascadeColorEnabled)
                parentColor = locParent.getDisplayedColor();
            else
                parentColor = cc.Color.WHITE;
        }
        locDispColor.r = 0 | (locRealColor.r * parentColor.r / 255.0);
        locDispColor.g = 0 | (locRealColor.g * parentColor.g / 255.0);
        locDispColor.b = 0 | (locRealColor.b * parentColor.b / 255.0);
    },

    _syncDisplayOpacity : function (parentOpacity) {
        var node = this._node;
        if (parentOpacity === undefined) {
            var locParent = node._parent;
            parentOpacity = 255;
            if (locParent && locParent._cascadeOpacityEnabled)
                parentOpacity = locParent.getDisplayedOpacity();
        }
        this._displayedOpacity = node._realOpacity * parentOpacity / 255.0;
    },

    _updateColor: function(){},

    updateStatus: function () {
        var locFlag = this._dirtyFlag;
        var colorDirty = locFlag & dirtyFlags.colorDirty,
            opacityDirty = locFlag & dirtyFlags.opacityDirty;

        if (locFlag & dirtyFlags.contentDirty) {
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
            this._dirtyFlag &= ~dirtyFlags.contentDirty;
        }

        if (colorDirty)
            this._updateDisplayColor();

        if (opacityDirty)
            this._updateDisplayOpacity();

        if (colorDirty || opacityDirty)
            this._updateColor();

        if (locFlag & dirtyFlags.transformDirty) {
            //update the transform
            this.transform(this.getParentRenderCmd(), true);
            this._dirtyFlag &= ~dirtyFlags.transformDirty;
        }
    },

    _syncStatus: function (parentCmd) {
        //  In the visit logic does not restore the _dirtyFlag
        //  Because child elements need parent's _dirtyFlag to change himself
        var locFlag = this._dirtyFlag;

        var colorDirty = locFlag & dirtyFlags.colorDirty,
            opacityDirty = locFlag & dirtyFlags.opacityDirty;

        if (colorDirty)
            //update the color
            this._syncDisplayColor();

        if (opacityDirty)
            //update the opacity
            this._syncDisplayOpacity();

        if (colorDirty || opacityDirty)
            this._updateColor();

        if (locFlag & dirtyFlags.transformDirty)
            //update the transform
            this.transform(parentCmd);
    },

    visitChildren: function(){
        var renderer = cc.renderer;
        var node = this._node;
        var i, children = node._children, child;
        var len = children.length;
        if (len > 0) {
            node.sortAllChildren();
            // draw children zOrder < 0
            for (i = 0; i < len; i++) {
                child = children[i];
                if (child._localZOrder < 0) {
                    child._renderCmd.visit(this);
                }
                else {
                    break;
                }
            }

            renderer.pushRenderCommand(this);
            for (; i < len; i++) {
                children[i]._renderCmd.visit(this);
            }
        } else {
            renderer.pushRenderCommand(this);
        }
        this._dirtyFlag = 0;
    }
};

_ccsg.Node.RenderCmd.prototype.originVisit = _ccsg.Node.RenderCmd.prototype.visit;
_ccsg.Node.RenderCmd.prototype.originTransform = _ccsg.Node.RenderCmd.prototype.transform;

//-----------------------Canvas ---------------------------

//The _ccsg.Node's render command for Canvas
_ccsg.Node.CanvasRenderCmd = function (renderable) {
    _ccsg.Node.RenderCmd.call(this, renderable);
    this._cachedParent = null;
    this._cacheDirty = false;
    this._currentRegion = new cc.Region();
    this._oldRegion = new cc.Region();
    this._regionFlag = 0;
};

_ccsg.Node.CanvasRenderCmd.RegionStatus = {
    NotDirty: 0,    //the region is not dirty
    Dirty: 1,       //the region is dirty, because of color, opacity or context
    DirtyDouble: 2  //the region is moved, the old and the new one need considered when rendering
};

var proto = _ccsg.Node.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.RenderCmd.prototype);
proto.constructor = _ccsg.Node.CanvasRenderCmd;
proto._notifyRegionStatus = function(status) {
    if (this._needDraw && this._regionFlag < status) {
        this._regionFlag = status;
    }
};

var localBB = new cc.Rect();
proto.getLocalBB = function() {
    var node = this._node;
    localBB.x = localBB.y = 0;
    localBB.width = node._getWidth();
    localBB.height = node._getHeight();
    return localBB;
};

proto._updateCurrentRegions = function() {
    var temp = this._currentRegion;
    this._currentRegion = this._oldRegion;
    this._oldRegion = temp;
    //hittest will call the transform, and set region flag to DirtyDouble, and the changes need to be considered for rendering
    if(_ccsg.Node.CanvasRenderCmd.RegionStatus.DirtyDouble === this._regionFlag && (!this._currentRegion.isEmpty())) {
        this._oldRegion.union(this._currentRegion);
    }
    this._currentRegion.updateRegion(this.getLocalBB(), this._worldTransform);
};

proto.setDirtyFlag = function (dirtyFlag, child) {
    _ccsg.Node.RenderCmd.prototype.setDirtyFlag.call(this, dirtyFlag, child);
    this._setCacheDirty(child);                  //TODO it should remove from here.
    if(this._cachedParent)
        this._cachedParent.setDirtyFlag(dirtyFlag, true);
};

proto._setCacheDirty = function () {
    if (this._cacheDirty === false) {
        this._cacheDirty = true;
        var cachedP = this._cachedParent;
        cachedP && cachedP !== this && cachedP._setNodeDirtyForCache && cachedP._setNodeDirtyForCache();
    }
};

proto._setCachedParent = function (cachedParent) {
    if (this._cachedParent === cachedParent)
        return;

    this._cachedParent = cachedParent;
    var children = this._node._children;
    for (var i = 0, len = children.length; i < len; i++)
        children[i]._renderCmd._setCachedParent(cachedParent);
};

proto.detachFromParent = function () {
    this._cachedParent = null;
    var selChildren = this._node._children, item;
    for (var i = 0, len = selChildren.length; i < len; i++) {
        item = selChildren[i];
        if (item && item._renderCmd)
            item._renderCmd.detachFromParent();
    }
};

proto.setShaderProgram = function (shaderProgram) {
    //do nothing.
};

proto.getShaderProgram = function () {
    return null;
};

//util functions
_ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc = function (blendFunc) {
    if (!blendFunc)
        return "source-over";
    else {
        if (( blendFunc.src === cc.macro.SRC_ALPHA && blendFunc.dst === cc.macro.ONE) || (blendFunc.src === cc.macro.ONE && blendFunc.dst === cc.macro.ONE))
            return "lighter";
        else if (blendFunc.src === cc.macro.ZERO && blendFunc.dst === cc.macro.SRC_ALPHA)
            return "destination-in";
        else if (blendFunc.src === cc.macro.ZERO && blendFunc.dst === cc.macro.ONE_MINUS_SRC_ALPHA)
            return "destination-out";
        else
            return "source-over";
    }
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
// ------------------------------ The ccsg.Node's render command for WebGL ----------------------------------

_ccsg.Node.WebGLRenderCmd = function (renderable) {
    _ccsg.Node.RenderCmd.call(this, renderable);
    this._shaderProgram = null;
};

var proto = _ccsg.Node.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.RenderCmd.prototype);
proto.constructor = _ccsg.Node.WebGLRenderCmd;

proto._updateColor = function(){};

proto.setShaderProgram = function (shaderProgram) {
    this._shaderProgram = shaderProgram;
};

proto.getShaderProgram = function () {
    return this._shaderProgram;
};

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Chukong Aipu reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * <p>ccsg.Scene is a subclass of ccsg.Node that is used only as an abstract concept.</p>
 *  <p>ccsg.Scene and ccsg.Node are almost identical with the difference that ccsg.Scene has it's
 * anchor point (by default) at the center of the screen.</p>
 *
 * <p>For the moment ccsg.Scene has no other logic than that, but in future releases it might have
 * additional logic.</p>
 *
 * <p>It is a good practice to use and ccsg.Scene as the parent of all your nodes.</p>
 * @class
 * @extends _ccsg.Node
 * @example
 * var scene = new _ccsg.Scene();
 */
_ccsg.Scene = _ccsg.Node.extend(/** @lends _ccsg.Scene# */{
    /**
     * Constructor of _ccsg.Scene
     */
    _className:"Scene",
    ctor:function () {
        _ccsg.Node.prototype.ctor.call(this);
        this._ignoreAnchorPointForPosition = true;
        this.setAnchorPoint(0.5, 0.5);
        this.setContentSize(cc.director.getWinSize());
    }
});

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Chukong Aipu reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * <p>cc.LoaderScene is a scene that you can load it when you loading files</p>
 * <p>cc.LoaderScene can present thedownload progress </p>
 * @class
 * @extends _ccsg.Scene
 * @example
 * var lc = new cc.LoaderScene();
 */
cc.LoaderScene = _ccsg.Scene.extend({
    _interval : null,
    _label : null,
    _className:"LoaderScene",
    _onProjectionChange: null,
    cb: null,
    target: null,
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;

        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        var fontSize = 24, lblHeight =  -logoHeight / 2 + 100;
        if(cc._loaderImage){
            //loading logo
            var img = new Image();
            img.src = cc._loaderImage;
            logoWidth = img.width;
            logoHeight = img.height;
            self._initStage(img, cc.visibleRect.center);

            fontSize = 14;
            lblHeight = -logoHeight / 2 - 10;
        }
        //loading percent
        var label = self._label = new cc.LabelTTF("Loading... 0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color(180, 180, 180));
        bgLayer.addChild(this._label, 10);
        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new _ccsg.Sprite(texture2d);
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        _ccsg.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
        this._onProjectionChange = function(){
            self._updateTransform();
        };
        cc.director.on(cc.Director.EVENT_PROJECTION_CHANGED, this._onProjectionChange);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.director.off(cc.Director.EVENT_PROJECTION_CHANGED, this._onProjectionChange);
        _ccsg.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     * @param {Object} target
     */
    initWithResources: function (resources, cb, target) {
        if(cc.js.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (loadedCount, count) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString("Loading... " + percent + "%");
            }, function (error, items) {
                if (self.cb)
                    self.cb.call(self.target, error, items);
            });
    },

    _updateTransform: function(){
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        this._bgLayer._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        this._label._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        this._logo._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @param target
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
cc.LoaderScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};
/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/** cc.Layer is a subclass of ccsg.Node that implements the TouchEventsDelegate protocol.<br/>
 * All features from ccsg.Node are valid, plus the bake feature: Baked layer can cache a static layer to improve performance
 * @class
 * @extends _ccsg.Node
 */
cc.Layer = _ccsg.Node.extend(/** @lends cc.Layer# */{
    _className: "Layer",

    /**
     * <p>Constructor of cc.Layer, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     */
    ctor: function () {
        _ccsg.Node.prototype.ctor.call(this);
        this._ignoreAnchorPointForPosition = true;
        this.setAnchorPoint(0.5, 0.5);
        this.setContentSize(cc.winSize);
    },

    /**
     * Initialization of the layer, please do not call this function by yourself, you should pass the parameters to constructor to initialize a layer
     */
    init: function(){
        var _t = this;
        _t._ignoreAnchorPointForPosition = true;
        _t.setAnchorPoint(0.5, 0.5);
        _t.setContentSize(cc.winSize);
        _t._cascadeColorEnabled = false;
        _t._cascadeOpacityEnabled = false;
        return true;
    },

    /**
     * Sets the layer to cache all of children to a bake sprite, and draw itself by bake sprite. recommend using it in UI.<br/>
     * This is useful only in html5 engine
     * @function
     * @see cc.Layer#unbake
     */
    bake: function(){
        this._renderCmd.bake();
    },

    /**
     * Cancel the layer to cache all of children to a bake sprite.<br/>
     * This is useful only in html5 engine
     * @function
     * @see cc.Layer#bake
     */
    unbake: function(){
        this._renderCmd.unbake();
    },

    /**
     * Determines if the layer is baked.
     * @function
     * @returns {boolean}
     * @see cc.Layer#bake and cc.Layer#unbake
     */
    isBaked: function(){
        return this._renderCmd._isBaked;
    },

    addChild: function(child, localZOrder, tag){
        _ccsg.Node.prototype.addChild.call(this, child, localZOrder, tag);
        this._renderCmd._bakeForAddChild(child);
    },

    _createRenderCmd: function(){
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.Layer.CanvasRenderCmd(this);
        else
            return new cc.Layer.WebGLRenderCmd(this);
    }
});

/**
 * <p>
 * CCLayerColor is a subclass of CCLayer that implements the CCRGBAProtocol protocol.       <br/>
 *  All features from CCLayer are valid, plus the following new features:                   <br/>
 * - opacity                                                                     <br/>
 * - RGB colors                                                                  </p>
 * @class
 * @extends cc.Layer
 *
 * @param {cc.Color} [color=] The color of the layer
 * @param {Number} [width=] The width of the layer
 * @param {Number} [height=] The height of the layer
 *
 * @example
 * // Example
 * //Create a yellow color layer as background
 * var yellowBackground = new cc.LayerColor(cc.color(255,255,0,255));
 * //If you didn't pass in width and height, it defaults to the same size as the canvas
 *
 * //create a yellow box, 200 by 200 in size
 * var yellowBox = new cc.LayerColor(cc.color(255,255,0,255), 200, 200);
 */
cc.LayerColor = cc.Layer.extend(/** @lends cc.LayerColor# */{
    _blendFunc: null,
    _className: "LayerColor",

    /**
     * Returns the blend function
     * @return {cc.BlendFunc}
     */
    getBlendFunc: function () {
        return this._blendFunc;
    },

    /**
     * Changes width and height
     * @deprecated since v3.0 please use setContentSize instead
     * @see _ccsg.Node#setContentSize
     * @param {Number} w width
     * @param {Number} h height
     */
    changeWidthAndHeight: function (w, h) {
        this.width = w;
        this.height = h;
    },

    /**
     * Changes width in Points
     * @deprecated since v3.0 please use setContentSize instead
     * @see _ccsg.Node#setContentSize
     * @param {Number} w width
     */
    changeWidth: function (w) {
        this.width = w;
    },

    /**
     * change height in Points
     * @deprecated since v3.0 please use setContentSize instead
     * @see _ccsg.Node#setContentSize
     * @param {Number} h height
     */
    changeHeight: function (h) {
        this.height = h;
    },

    setOpacityModifyRGB: function (value) {
    },

    isOpacityModifyRGB: function () {
        return false;
    },

    /**
     * Constructor of cc.LayerColor
     * @function
     * @param {cc.Color} [color=]
     * @param {Number} [width=]
     * @param {Number} [height=]
     */
    ctor: function(color, width, height){
        cc.Layer.prototype.ctor.call(this);
        this._blendFunc = new cc.BlendFunc(cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA);
        cc.LayerColor.prototype.init.call(this, color, width, height);
    },

    /**
     * Initialization of the layer, please do not call this function by yourself, you should pass the parameters to constructor to initialize a layer
     * @param {cc.Color} [color=]
     * @param {Number} [width=]
     * @param {Number} [height=]
     * @return {Boolean}
     */
    init: function (color, width, height) {
        if (cc._renderType !== cc.game.RENDER_TYPE_CANVAS)
            this.shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_COLOR);

        var winSize = cc.director.getWinSize();
        color = color || cc.color(0, 0, 0, 255);
        width = width === undefined ? winSize.width : width;
        height = height === undefined ? winSize.height : height;

        var locRealColor = this._realColor;
        locRealColor.r = color.r;
        locRealColor.g = color.g;
        locRealColor.b = color.b;
        this._realOpacity = color.a;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty|_ccsg.Node._dirtyFlags.opacityDirty);

        cc.LayerColor.prototype.setContentSize.call(this, width, height);
        return true;
    },

    /**
     * Sets the blend func, you can pass either a cc.BlendFunc object or source and destination value separately
     * @param {Number|cc.BlendFunc} src
     * @param {Number} [dst]
     */
    setBlendFunc: function (src, dst) {
        var locBlendFunc = this._blendFunc;
        if (dst === undefined) {
            locBlendFunc.src = src.src;
            locBlendFunc.dst = src.dst;
        } else {
            locBlendFunc.src = src;
            locBlendFunc.dst = dst;
        }
        this._renderCmd.updateBlendFunc(locBlendFunc);
    },

    _createRenderCmd: function(){
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.LayerColor.CanvasRenderCmd(this);
        else
            return new cc.LayerColor.WebGLRenderCmd(this);
    }
});

//LayerColor - Getter Setter
(function(){
    var proto = cc.LayerColor.prototype;
    cc.defineGetterSetter(proto, "width", proto._getWidth, proto._setWidth);
    cc.defineGetterSetter(proto, "height", proto._getHeight, proto._setHeight);
})();

/**
 * <p>
 * CCLayerGradient is a subclass of cc.LayerColor that draws gradients across the background.<br/>
 *<br/>
 * All features from cc.LayerColor are valid, plus the following new features:<br/>
 * <ul><li>direction</li>
 * <li>final color</li>
 * <li>interpolation mode</li></ul>
 * <br/>
 * Color is interpolated between the startColor and endColor along the given<br/>
 * vector (starting at the origin, ending at the terminus).  If no vector is<br/>
 * supplied, it defaults to (0, -1) -- a fade from top to bottom.<br/>
 * <br/>
 * If 'compressedInterpolation' is disabled, you will not see either the start or end color for<br/>
 * non-cardinal vectors; a smooth gradient implying both end points will be still<br/>
 * be drawn, however.<br/>
 *<br/>
 * If 'compressedInterpolation' is enabled (default mode) you will see both the start and end colors of the gradient.
 * </p>
 * @class
 * @extends cc.LayerColor
 *
 * @param {cc.Color} start Starting color
 * @param {cc.Color} end Ending color
 * @param {cc.Vec2} [v=cc.p(0, -1)] A vector defines the gradient direction, default direction is from top to bottom
 *
 * @property {cc.Color} startColor              - Start color of the color gradient
 * @property {cc.Color} endColor                - End color of the color gradient
 * @property {Number}   startOpacity            - Start opacity of the color gradient
 * @property {Number}   endOpacity              - End opacity of the color gradient
 * @property {Number}   vector                  - Direction vector of the color gradient
 * @property {Number}   compressedInterpolation  - Indicate whether or not the interpolation will be compressed
 */
cc.LayerGradient = cc.LayerColor.extend(/** @lends cc.LayerGradient# */{
    _endColor: null,
    _startOpacity: 255,
    _endOpacity: 255,
    _alongVector: null,
    _compressedInterpolation: false,
    _className: "LayerGradient",
    _colorStops: [],

    /**
     * Constructor of cc.LayerGradient
     * @param {cc.Color} start
     * @param {cc.Color} end
     * @param {cc.Vec2} [v=cc.p(0, -1)]
     * @param {Array|Null} stops
     *
     * @example Using ColorStops argument:
     * //startColor & endColor are for default and backward compatibility
     * var layerGradient = new cc.LayerGradient(cc.Color.RED, new cc.Color(255,0,0,0), cc.p(0, -1),
     *                                          [{p:0, color: cc.Color.RED},
     *                                           {p:.5, color: new cc.Color(0,0,0,0)},
     *                                           {p:1, color: cc.Color.RED}]);
     * //where p = A value between 0.0 and 1.0 that represents the position between start and end in a gradient
     *
     */
    ctor: function (start, end, v, stops) {
        cc.LayerColor.prototype.ctor.call(this);
        this._endColor = cc.color(0, 0, 0, 255);
        this._alongVector = cc.p(0, -1);
        this._startOpacity = 255;
        this._endOpacity = 255;

        if(stops && stops instanceof Array){
            this._colorStops = stops;
            stops.splice(0, 0, {p:0, color: start || cc.Color.BLACK});
            stops.push({p:1, color: end || cc.Color.BLACK});
        } else
            this._colorStops = [{p:0, color: start || cc.Color.BLACK}, {p:1, color: end || cc.Color.BLACK}];

        cc.LayerGradient.prototype.init.call(this, start, end, v, stops);
    },

    /**
     * Initialization of the layer, please do not call this function by yourself, you should pass the parameters to constructor to initialize a layer
     * @param {cc.Color} start starting color
     * @param {cc.Color} end
     * @param {cc.Vec2|Null} v
     * @param {Array|Null} stops
     * @return {Boolean}
     */
    init: function (start, end, v, stops) {
        start = start || cc.color(0, 0, 0, 255);
        end = end || cc.color(0, 0, 0, 255);
        v = v || cc.p(0, -1);
        var _t = this;

        // Initializes the CCLayer with a gradient between start and end in the direction of v.
        var locEndColor = _t._endColor;
        _t._startOpacity = start.a;

        locEndColor.r = end.r;
        locEndColor.g = end.g;
        locEndColor.b = end.b;
        _t._endOpacity = end.a;

        _t._alongVector = v;
        _t._compressedInterpolation = true;

        cc.LayerColor.prototype.init.call(_t, cc.color(start.r, start.g, start.b, 255));
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty|_ccsg.Node._dirtyFlags.opacityDirty|_ccsg.Node._dirtyFlags.gradientDirty);
        return true;
    },

    /**
     * Sets the untransformed size of the LayerGradient.
     * @param {cc.Size|Number} size The untransformed size of the LayerGradient or The untransformed size's width of the LayerGradient.
     * @param {Number} [height] The untransformed size's height of the LayerGradient.
     */
    setContentSize: function (size, height) {
        cc.LayerColor.prototype.setContentSize.call(this, size, height);
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.gradientDirty);
    },

    _setWidth: function (width) {
        cc.LayerColor.prototype._setWidth.call(this, width);
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.gradientDirty);
    },
    _setHeight: function (height) {
        cc.LayerColor.prototype._setHeight.call(this, height);
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.gradientDirty);
    },

    /**
     * Returns the starting color
     * @return {cc.Color}
     */
    getStartColor: function () {
        return cc.color(this._realColor);
    },

    /**
     * Sets the starting color
     * @param {cc.Color} color
     * @example
     * // Example
     * myGradientLayer.setStartColor(cc.color(255,0,0));
     * //set the starting gradient to red
     */
    setStartColor: function (color) {
        this.color = color;
        //update the color stops
        var stops = this._colorStops;
        if(stops && stops.length > 0){
            var selColor = stops[0].color;
            selColor.r = color.r;
            selColor.g = color.g;
            selColor.b = color.b;
        }
    },

    /**
     * Sets the end gradient color
     * @param {cc.Color} color
     * @example
     * // Example
     * myGradientLayer.setEndColor(cc.color(255,0,0));
     * //set the ending gradient to red
     */
    setEndColor: function (color) {
        var locColor = this._endColor;
        locColor.r = color.r;
        locColor.g = color.g;
        locColor.b = color.b;
        //update the color stops
        var stops = this._colorStops;
        if(stops && stops.length > 0){
            var selColor = stops[stops.length -1].color;
            selColor.r = color.r;
            selColor.g = color.g;
            selColor.b = color.b;
        }
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty);
    },

    /**
     * Returns the end color
     * @return {cc.Color}
     */
    getEndColor: function () {
        return cc.color(this._endColor);
    },

    /**
     * Sets starting gradient opacity
     * @param {Number} o from 0 to 255, 0 is transparent
     */
    setStartOpacity: function (o) {
        this._startOpacity = o;
        //update the color stops
        var stops = this._colorStops;
        if(stops && stops.length > 0)
            stops[0].color.a = o;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.opacityDirty);
    },

    /**
     * Returns the starting gradient opacity
     * @return {Number}
     */
    getStartOpacity: function () {
        return this._startOpacity;
    },

    /**
     * Sets the end gradient opacity
     * @param {Number} o
     */
    setEndOpacity: function (o) {
        this._endOpacity = o;
        var stops = this._colorStops;
        if(stops && stops.length > 0)
            stops[stops.length -1].color.a = o;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.opacityDirty);
    },

    /**
     * Returns the end gradient opacity
     * @return {Number}
     */
    getEndOpacity: function () {
        return this._endOpacity;
    },

    /**
     * Sets the direction vector of the gradient
     * @param {cc.Vec2} Var
     */
    setVector: function (Var) {
        this._alongVector.x = Var.x;
        this._alongVector.y = Var.y;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.gradientDirty);
    },

    /**
     * Returns the direction vector of the gradient
     * @return {cc.Vec2}
     */
    getVector: function () {
        return cc.p(this._alongVector.x, this._alongVector.y);
    },

    /**
     * Returns whether compressed interpolation is enabled
     * @return {Boolean}
     */
    isCompressedInterpolation: function () {
        return this._compressedInterpolation;
    },

    /**
     * Sets whether compressed interpolation is enabled
     * @param {Boolean} compress
     */
    setCompressedInterpolation: function (compress) {
        this._compressedInterpolation = compress;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.gradientDirty);
    },

    /**
     * Return an array of Object representing a colorStop for the gradient, if no stops was specified
     * start & endColor will be provided as default values
     * @example
     * [{p: 0, color: cc.Color.RED},{p: 1, color: cc.Color.RED},...]
     * @returns {Array}
     */
    getColorStops: function(){
        return this._colorStops;
    },
    /**
     * Set the colorStops to create the gradient using multiple point & color
     *
     * @param colorStops
     *
     * @example
     * //startColor & endColor are for default and backward compatibility
     * var layerGradient = new cc.LayerGradient(cc.Color.RED, new cc.Color(255,0,0,0), cc.p(0, -1));
     * layerGradient.setColorStops([{p:0, color: cc.Color.RED},
     *                              {p:.5, color: new cc.Color(0,0,0,0)},
     *                              {p:1, color: cc.Color.RED}]);
     * //where p = A value between 0.0 and 1.0 that represents the position between start and end in a gradient
     *
     */
    setColorStops: function(colorStops){
        this._colorStops = colorStops;
        //todo need update  the start color and end color
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty|_ccsg.Node._dirtyFlags.opacityDirty|_ccsg.Node._dirtyFlags.gradientDirty);
    },

    _createRenderCmd: function(){
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.LayerGradient.CanvasRenderCmd(this);
        else
            return new cc.LayerGradient.WebGLRenderCmd(this);
    }
});

//LayerGradient - Getter Setter
(function(){
    var proto = cc.LayerGradient.prototype;
    // Extended properties
    /** @expose */
    proto.startColor;
    cc.defineGetterSetter(proto, "startColor", proto.getStartColor, proto.setStartColor);
    /** @expose */
    proto.endColor;
    cc.defineGetterSetter(proto, "endColor", proto.getEndColor, proto.setEndColor);
    /** @expose */
    proto.startOpacity;
    cc.defineGetterSetter(proto, "startOpacity", proto.getStartOpacity, proto.setStartOpacity);
    /** @expose */
    proto.endOpacity;
    cc.defineGetterSetter(proto, "endOpacity", proto.getEndOpacity, proto.setEndOpacity);
    /** @expose */
    proto.vector;
    cc.defineGetterSetter(proto, "vector", proto.getVector, proto.setVector);
    /** @expose */
    proto.colorStops;
    cc.defineGetterSetter(proto, "colorStops", proto.getColorStops, proto.setColorStops);
})();

/**
 * CCMultipleLayer is a CCLayer with the ability to multiplex it's children.<br/>
 * Features:<br/>
 *  <ul><li>- It supports one or more children</li>
 *  <li>- Only one children will be active a time</li></ul>
 * @class
 * @extends cc.Layer
 * @param {Array} layers an array of cc.Layer
 * @example
 * // Example
 * var multiLayer = new cc.LayerMultiple(layer1, layer2, layer3);//any number of layers
 */
cc.LayerMultiplex = cc.Layer.extend(/** @lends cc.LayerMultiplex# */{
    _enabledLayer: 0,
    _layers: null,
    _className: "LayerMultiplex",

    /**
     * Constructor of cc.LayerMultiplex
     * @param {Array} layers an array of cc.Layer
     */
    ctor: function (layers) {
        cc.Layer.prototype.ctor.call(this);
        if (layers instanceof Array)
            cc.LayerMultiplex.prototype.initWithLayers.call(this, layers);
        else
            cc.LayerMultiplex.prototype.initWithLayers.call(this, Array.prototype.slice.call(arguments));
    },

    /**
     * Initialization of the layer multiplex, please do not call this function by yourself, you should pass the parameters to constructor to initialize a layer multiplex
     * @param {Array} layers an array of cc.Layer
     * @return {Boolean}
     */
    initWithLayers: function (layers) {
        if ((layers.length > 0) && (layers[layers.length - 1] == null))
            cc.log(cc._LogInfos.LayerMultiplex.initWithLayers);

        this._layers = layers;
        this._enabledLayer = 0;
        this.addChild(this._layers[this._enabledLayer]);
        return true;
    },

    /**
     * Switches to a certain layer indexed by n.<br/>
     * The current (old) layer will be removed from it's parent with 'cleanup:YES'.
     * @param {Number} n the layer index to switch to
     */
    switchTo: function (n) {
        if (n >= this._layers.length) {
            cc.log(cc._LogInfos.LayerMultiplex.switchTo);
            return;
        }

        this.removeChild(this._layers[this._enabledLayer], true);
        this._enabledLayer = n;
        this.addChild(this._layers[n]);
    },

    /**
     * Release the current layer and switches to another layer indexed by n.<br/>
     * The current (old) layer will be removed from it's parent with 'cleanup:YES'.
     * @param {Number} n the layer index to switch to
     */
    switchToAndReleaseMe: function (n) {
        if (n >= this._layers.length) {
            cc.log(cc._LogInfos.LayerMultiplex.switchToAndReleaseMe);
            return;
        }

        this.removeChild(this._layers[this._enabledLayer], true);

        //[layers replaceObjectAtIndex:_enabledLayer withObject:[NSNull null]];
        this._layers[this._enabledLayer] = null;
        this._enabledLayer = n;
        this.addChild(this._layers[n]);
    },

    /**
     * Add a layer to the multiplex layers list
     * @param {cc.Layer} layer
     */
    addLayer: function (layer) {
        if (!layer) {
            cc.log(cc._LogInfos.LayerMultiplex.addLayer);
            return;
        }
        this._layers.push(layer);
    }
});

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

//-----------------------//
//  1. cc.Layer          //
//  2. cc.LayerColor     //
//  3. cc.LayerGradient  //
//-----------------------//

/**
 * cc.Layer's rendering objects of Canvas
 */
(function(){
    //Layer's canvas render command
    cc.Layer.CanvasRenderCmd = function(renderable){
        _ccsg.Node.CanvasRenderCmd.call(this, renderable);
        this._isBaked = false;
        this._bakeSprite = null;
        this._updateCache = 2; // 2: Updated child visit 1: Rendering 0: Nothing to do
    };

    var proto = cc.Layer.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
    proto.constructor = cc.Layer.CanvasRenderCmd;

    proto._setCacheDirty = function(child){
        if(child && this._updateCache === 0)
            this._updateCache = 2;
        if (this._cacheDirty === false) {
            this._cacheDirty = true;
            var cachedP = this._cachedParent;
            cachedP && cachedP !== this && cachedP._setNodeDirtyForCache && cachedP._setNodeDirtyForCache();
        }
    };

    proto.updateStatus = function () {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        if (locFlag & flags.orderDirty) {
            this._cacheDirty = true;
            if(this._updateCache === 0)
                this._updateCache = 2;
            this._dirtyFlag &= ~flags.orderDirty;
        }

        _ccsg.Node.RenderCmd.prototype.updateStatus.call(this);
    };

    proto._syncStatus = function (parentCmd) {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        if (locFlag & flags.orderDirty) {
            this._cacheDirty = true;
            if(this._updateCache === 0)
                this._updateCache = 2;
            this._dirtyFlag &= ~flags.orderDirty;
        }
        _ccsg.Node.RenderCmd.prototype._syncStatus.call(this, parentCmd);
    };

    proto.transform = function (parentCmd, recursive) {
        var wt = this._worldTransform;
        var a = wt.a, b = wt.b, c = wt.c, d = wt.d;
        _ccsg.Node.CanvasRenderCmd.prototype.transform.call(this, parentCmd, recursive);
        if(( wt.a !== a || wt.b !== b || wt.c !== c || wt.d !== d ) && this._updateCache === 0)
            this._updateCache = 2;
    };

    proto.bake = function(){
        if (!this._isBaked) {
            this._needDraw = true;
            //limit: 1. its children's blendfunc are invalid.
            this._isBaked = this._cacheDirty = true;
            if(this._updateCache === 0)
                this._updateCache = 2;

            var children = this._node._children;
            for(var i = 0, len = children.length; i < len; i++)
                children[i]._renderCmd._setCachedParent(this);

            if (!this._bakeSprite){
                this._bakeSprite = new cc.BakeSprite();
                this._bakeSprite.setAnchorPoint(0,0);
            }
        }
    };

    proto.unbake = function(){
        if (this._isBaked) {
            this._needDraw = false;
            this._isBaked = false;
            this._cacheDirty = true;
            if(this._updateCache === 0)
                this._updateCache = 2;

            var children = this._node._children;
            for(var i = 0, len = children.length; i < len; i++)
                children[i]._renderCmd._setCachedParent(null);
        }
    };

    proto.isBaked = function(){
        return this._isBaked;
    };

    proto.rendering = function(){
        if(this._cacheDirty){
            var node = this._node;
            var children = node._children, locBakeSprite = this._bakeSprite;

            //compute the bounding box of the bake layer.
            this.transform(this.getParentRenderCmd(), true);

            var boundingBox = this._getBoundingBoxForBake();
            boundingBox.width = 0|(boundingBox.width+0.5);
            boundingBox.height = 0|(boundingBox.height+0.5);

            var bakeContext = locBakeSprite.getCacheContext();
            var ctx = bakeContext.getContext();

            locBakeSprite.setPosition(boundingBox.x, boundingBox.y);

            if(this._updateCache > 0){
                locBakeSprite.resetCanvasSize(boundingBox.width, boundingBox.height);
                bakeContext.setOffset(0 - boundingBox.x, ctx.canvas.height - boundingBox.height + boundingBox.y );
                //visit for canvas
                node.sortAllChildren();
                cc.renderer._turnToCacheMode(this.__instanceId);
                for (var i = 0, len = children.length; i < len; i++) {
                    children[i].visit(this);
                }
                cc.renderer._renderingToCacheCanvas(bakeContext, this.__instanceId);
                locBakeSprite.transform();                   //because bake sprite's position was changed at rendering.
                this._updateCache--;
            }

            this._cacheDirty = false;
        }
    };

    proto.visit = function(parentCmd){
        if(!this._isBaked){
            this.originVisit(parentCmd);
            return;
        }

        var node = this._node, children = node._children;
        var len = children.length;
        this._propagateFlagsDown(parentCmd);
        // quick return if not visible
        if (!node._visible || len === 0)
            return;

        this._syncStatus(parentCmd);
        cc.renderer.pushRenderCommand(this);

        //the bakeSprite is drawing
        this._bakeSprite.visit(this);
        this._dirtyFlag = 0;
    };

    proto._bakeForAddChild = function(child){
        if(child._parent === this._node && this._isBaked)
            child._renderCmd._setCachedParent(this);
    };

    proto._getBoundingBoxForBake = function(){
        var rect = null, node = this._node;

        //query child's BoundingBox
        if (!node._children || node._children.length === 0)
            return cc.rect(0, 0, 10, 10);
        var trans = node.getNodeToWorldTransform();

        var locChildren = node._children;
        for (var i = 0, len = locChildren.length; i < len; i++) {
            var child = locChildren[i];
            if (child && child._visible) {
                if(rect){
                    var childRect = child._getBoundingBoxToCurrentNode(trans);
                    if (childRect)
                        rect = cc.rectUnion(rect, childRect);
                }else{
                    rect = child._getBoundingBoxToCurrentNode(trans);
                }
            }
        }
        return rect;
    };
})();

/**
 * cc.LayerColor's rendering objects of Canvas
 */
(function(){
    //LayerColor's canvas render command
    cc.LayerColor.CanvasRenderCmd = function(renderable){
        cc.Layer.CanvasRenderCmd.call(this, renderable);
        this._needDraw = true;
        this._blendFuncStr = "source-over";
        this._bakeRenderCmd = new cc.CustomRenderCmd(this, this._bakeRendering);
    };
    var proto = cc.LayerColor.CanvasRenderCmd.prototype = Object.create(cc.Layer.CanvasRenderCmd.prototype);
    proto.constructor = cc.LayerColor.CanvasRenderCmd;

    proto.unbake = function(){
        cc.Layer.CanvasRenderCmd.prototype.unbake.call(this);
        this._needDraw = true;
    };

    proto.rendering = function (ctx, scaleX, scaleY) {
        var wrapper = ctx || cc._renderContext, context = wrapper.getContext(),
            node = this._node,
            curColor = this._displayedColor,
            opacity = this._displayedOpacity / 255,
            locWidth = node._contentSize.width,
            locHeight = node._contentSize.height;

        if (opacity === 0)
            return;

        wrapper.setCompositeOperation(this._blendFuncStr);
        wrapper.setGlobalAlpha(opacity);
        wrapper.setFillStyle("rgba(" + (0 | curColor.r) + "," + (0 | curColor.g) + ","
            + (0 | curColor.b) + ", 1)");  //TODO: need cache the color string

        wrapper.setTransform(this._worldTransform, scaleX, scaleY);
        context.fillRect(0, 0, locWidth, -locHeight);

        cc.g_NumberOfDraws++;
    };

    proto.updateBlendFunc = function(blendFunc){
        this._blendFuncStr = _ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(blendFunc);
    };

    proto._updateSquareVertices =
    proto._updateSquareVerticesWidth =
    proto._updateSquareVerticesHeight = function(){};

    proto._bakeRendering = function(){
        if(this._cacheDirty){
            var node = this._node;
            var locBakeSprite = this._bakeSprite, children = node._children;
            var len = children.length, i;

            //compute the bounding box of the bake layer.
            this.transform(this.getParentRenderCmd(), true);
            //compute the bounding box of the bake layer.
            var boundingBox = this._getBoundingBoxForBake();
            boundingBox.width = 0|(boundingBox.width+0.5);
            boundingBox.height = 0|(boundingBox.height+0.5);

            var bakeContext = locBakeSprite.getCacheContext();
            var ctx = bakeContext.getContext();

            locBakeSprite.setPosition(boundingBox.x, boundingBox.y);

            if(this._updateCache > 0) {
                ctx.fillStyle = bakeContext._currentFillStyle;
                locBakeSprite.resetCanvasSize(boundingBox.width, boundingBox.height);
                bakeContext.setOffset(0 - boundingBox.x, ctx.canvas.height - boundingBox.height + boundingBox.y );

                var child;
                cc.renderer._turnToCacheMode(this.__instanceId);
                //visit for canvas
                if (len > 0) {
                    node.sortAllChildren();
                    // draw children zOrder < 0
                    for (i = 0; i < len; i++) {
                        child = children[i];
                        if (child._localZOrder < 0)
                            child._renderCmd.visit(this);
                        else
                            break;
                    }
                    cc.renderer.pushRenderCommand(this);
                    for (; i < len; i++) {
                        children[i]._renderCmd.visit(this);
                    }
                } else
                    cc.renderer.pushRenderCommand(this);
                cc.renderer._renderingToCacheCanvas(bakeContext, this.__instanceId);
                locBakeSprite.transform();
                this._updateCache--;
            }
            this._cacheDirty = false;
        }
    };

    proto.visit = function(parentCmd){
        if(!this._isBaked){
            this.originVisit();
            return;
        }

        var node = this._node;
        this._propagateFlagsDown(parentCmd);
        // quick return if not visible
        if (!node._visible)
            return;

        this._syncStatus(parentCmd);

        cc.renderer.pushRenderCommand(this._bakeRenderCmd);

        //the bakeSprite is drawing
        this._bakeSprite._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        this._bakeSprite.visit(this);
        this._dirtyFlag = 0;
    };

    proto._getBoundingBoxForBake = function(){
        var node = this._node;
        //default size
        var rect = cc.rect(0, 0, node._contentSize.width, node._contentSize.height);
        var trans = node.getNodeToWorldTransform();
        rect = cc.rectApplyAffineTransform(rect, node.getNodeToWorldTransform());

        //query child's BoundingBox
        if (!node._children || node._children.length === 0)
            return rect;

        var locChildren = node._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child = locChildren[i];
            if (child && child._visible) {
                var childRect = child._getBoundingBoxToCurrentNode(trans);
                rect = cc.rectUnion(rect, childRect);
            }
        }
        return rect;
    };
})();

/**
 * cc.LayerGradient's rendering objects of Canvas
 */
(function(){
    cc.LayerGradient.CanvasRenderCmd = function(renderable){
        cc.LayerColor.CanvasRenderCmd.call(this, renderable);
        this._needDraw = true;
        this._startPoint = cc.p(0, 0);
        this._endPoint = cc.p(0, 0);
        this._startStopStr = null;
        this._endStopStr = null;
    };
    var proto = cc.LayerGradient.CanvasRenderCmd.prototype = Object.create(cc.LayerColor.CanvasRenderCmd.prototype);
    proto.constructor = cc.LayerGradient.CanvasRenderCmd;

    proto.rendering = function (ctx, scaleX, scaleY) {
        var wrapper = ctx || cc._renderContext, context = wrapper.getContext(),
            node = this._node,
            opacity = this._displayedOpacity / 255;

        if (opacity === 0)
            return;

        var locWidth = node._contentSize.width, locHeight = node._contentSize.height;
        wrapper.setCompositeOperation(this._blendFuncStr);
        wrapper.setGlobalAlpha(opacity);
        var gradient = context.createLinearGradient(this._startPoint.x, this._startPoint.y, this._endPoint.x, this._endPoint.y);

        if(node._colorStops){  //Should always fall here now
             for(var i=0; i < node._colorStops.length; i++) {
                 var stop = node._colorStops[i];
                 gradient.addColorStop(stop.p, this._colorStopsStr[i]);
             }
        }else{
            gradient.addColorStop(0, this._startStopStr);
            gradient.addColorStop(1, this._endStopStr);
        }

        wrapper.setFillStyle(gradient);

        wrapper.setTransform(this._worldTransform, scaleX, scaleY);
        context.fillRect(0, 0, locWidth, -locHeight);
        cc.g_NumberOfDraws++;
    };

    proto.updateStatus = function () {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        if (locFlag & flags.gradientDirty) {
            this._dirtyFlag |= flags.colorDirty;
            this._dirtyFlag &= ~flags.gradientDirty;
        }

        _ccsg.Node.RenderCmd.prototype.updateStatus.call(this);
    };

    proto._syncStatus = function (parentCmd) {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        if (locFlag & flags.gradientDirty) {
            this._dirtyFlag |= flags.colorDirty;
            this._dirtyFlag &= ~flags.gradientDirty;
        }

        _ccsg.Node.RenderCmd.prototype._syncStatus.call(this, parentCmd);
    };

    proto._updateColor = function() {
        var node = this._node;
        var contentSize = node._contentSize;
        var tWidth = contentSize.width * 0.5, tHeight = contentSize.height * 0.5;

        //fix the bug of gradient layer
        var angle = cc.pAngleSigned(cc.p(0, -1), node._alongVector);
        var p1 = cc.pRotateByAngle(cc.p(0, -1), cc.p(0,0), angle);
        var factor = Math.min(Math.abs(1 / p1.x), Math.abs(1/ p1.y));

        this._startPoint.x = tWidth * (-p1.x * factor) + tWidth;
        this._startPoint.y = tHeight * (p1.y * factor) - tHeight;
        this._endPoint.x = tWidth * (p1.x * factor) + tWidth;
        this._endPoint.y = tHeight * (-p1.y * factor) - tHeight;

        var locStartColor = this._displayedColor, locEndColor = node._endColor;
        var startOpacity = node._startOpacity/255, endOpacity = node._endOpacity/255;
        this._startStopStr = "rgba(" + Math.round(locStartColor.r) + "," + Math.round(locStartColor.g) + ","
            + Math.round(locStartColor.b) + "," + startOpacity.toFixed(4) + ")";
        this._endStopStr = "rgba(" + Math.round(locEndColor.r) + "," + Math.round(locEndColor.g) + ","
            + Math.round(locEndColor.b) + "," + endOpacity.toFixed(4) + ")";

        if( node._colorStops){
            this._startOpacity = 0;
            this._endOpacity = 0;

            this._colorStopsStr = [];
            for(var i =0; i < node._colorStops.length; i++){
                var stopColor = node._colorStops[i].color;
                var stopOpacity = stopColor.a == null ? 1 : stopColor.a / 255;
                this._colorStopsStr.push("rgba(" + Math.round(stopColor.r) + "," + Math.round(stopColor.g) + ","
                    + Math.round(stopColor.b) + "," + stopOpacity.toFixed(4) + ")");
            }
        }
    };
})();

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

//-----------------------//
//  1. cc.Layer          //
//  2. cc.LayerColor     //
//  3. cc.LayerGradient  //
//-----------------------//

/**
 * cc.Layer's rendering objects of WebGL
 */
(function(){
    cc.Layer.WebGLRenderCmd = function(renderable){
        _ccsg.Node.WebGLRenderCmd.call(this, renderable);
    };

    var proto = cc.Layer.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
    proto.constructor = cc.Layer.WebGLRenderCmd;

    proto.bake = function(){};

    proto.unbake = function(){};

    proto._bakeForAddChild = function(){};
})();

/**
 * cc.LayerColor's rendering objects of WebGL
 */
(function(){
    cc.LayerColor.WebGLRenderCmd = function(renderable){
        cc.Layer.WebGLRenderCmd.call(this, renderable);
        this._needDraw = true;

        this._matrix = new cc.math.Matrix4();
        this._matrix.identity();

        //
        var _t = this;
        _t._squareVerticesAB = new ArrayBuffer(48);
        _t._squareColorsAB = new ArrayBuffer(16);

        var locSquareVerticesAB = _t._squareVerticesAB, locSquareColorsAB = _t._squareColorsAB;
        var locVertex3FLen = cc.Vertex3F.BYTES_PER_ELEMENT, locColorLen = cc.Color.BYTES_PER_ELEMENT;
        _t._squareVertices = [new cc.Vertex3F(0, 0, 0, locSquareVerticesAB, 0),
            new cc.Vertex3F(0, 0, 0, locSquareVerticesAB, locVertex3FLen),
            new cc.Vertex3F(0, 0, 0, locSquareVerticesAB, locVertex3FLen * 2),
            new cc.Vertex3F(0, 0, 0, locSquareVerticesAB, locVertex3FLen * 3)];
        _t._squareColors = [cc.color(0, 0, 0, 255, locSquareColorsAB, 0),
            cc.color(0, 0, 0, 255, locSquareColorsAB, locColorLen),
            cc.color(0, 0, 0, 255, locSquareColorsAB, locColorLen * 2),
            cc.color(0, 0, 0, 255, locSquareColorsAB, locColorLen * 3)];
        _t._verticesFloat32Buffer = cc._renderContext.createBuffer();
        _t._colorsUint8Buffer = cc._renderContext.createBuffer();

        this._shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_COLOR);
    };
    var proto = cc.LayerColor.WebGLRenderCmd.prototype = Object.create(cc.Layer.WebGLRenderCmd.prototype);
    proto.constructor = cc.LayerColor.WebGLRenderCmd;

    proto.rendering = function (ctx) {
        var context = ctx || cc._renderContext;
        var node = this._node;

        var wt = this._worldTransform, mat = this._matrix.mat;
        mat[0] = wt.a;
        mat[4] = wt.c;
        mat[12] = wt.tx;
        mat[1] = wt.b;
        mat[5] = wt.d;
        mat[13] = wt.ty;

        this._shaderProgram.use();
        this._shaderProgram._setUniformForMVPMatrixWithMat4(this._matrix);
        context.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_POSITION);
        context.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_COLOR);
        cc.gl.blendFunc(node._blendFunc.src, node._blendFunc.dst);

        //
        // Attributes
        //
        context.bindBuffer(context.ARRAY_BUFFER, this._verticesFloat32Buffer);
        context.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_POSITION, 3, context.FLOAT, false, 0, 0);

        context.bindBuffer(context.ARRAY_BUFFER, this._colorsUint8Buffer);
        context.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_COLOR, 4, context.UNSIGNED_BYTE, true, 0, 0);

        context.drawArrays(context.TRIANGLE_STRIP, 0, this._squareVertices.length);
    };

    proto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);

        var node = this._node,
            width = node._contentSize.width,
            height = node._contentSize.height;

        var locSquareVertices = this._squareVertices;
        locSquareVertices[1].x = width;
        locSquareVertices[2].y = height;
        locSquareVertices[3].x = width;
        locSquareVertices[3].y = height;
        locSquareVertices[0].z = 
        locSquareVertices[1].z = 
        locSquareVertices[2].z = 
        locSquareVertices[3].z = node._vertexZ;

        this._bindLayerVerticesBufferData();
    };

    proto._updateColor = function(){
        var locDisplayedColor = this._displayedColor, locDisplayedOpacity = this._displayedOpacity,
            locSquareColors = this._squareColors;
        for (var i = 0; i < 4; i++) {
            locSquareColors[i].r = locDisplayedColor.r;
            locSquareColors[i].g = locDisplayedColor.g;
            locSquareColors[i].b = locDisplayedColor.b;
            locSquareColors[i].a = locDisplayedOpacity;
        }
        this._bindLayerColorsBufferData();
    };

    proto._bindLayerVerticesBufferData = function(){
        var glContext = cc._renderContext;
        glContext.bindBuffer(glContext.ARRAY_BUFFER, this._verticesFloat32Buffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._squareVerticesAB, glContext.DYNAMIC_DRAW);
    };

    proto._bindLayerColorsBufferData = function(){
        var glContext = cc._renderContext;
        glContext.bindBuffer(glContext.ARRAY_BUFFER, this._colorsUint8Buffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._squareColorsAB, glContext.STATIC_DRAW);
    };

    proto.updateBlendFunc = function(blendFunc){};
})();

/**
 * cc.LayerGradient's rendering objects of WebGL
 */
(function(){
    cc.LayerGradient.WebGLRenderCmd = function(renderable){
        cc.LayerColor.WebGLRenderCmd.call(this, renderable);
        this._needDraw = true;
        this._clipRect = new cc.Rect();
        this._clippingRectDirty = false;
    };
    var proto = cc.LayerGradient.WebGLRenderCmd.prototype = Object.create(cc.LayerColor.WebGLRenderCmd.prototype);
    proto.constructor = cc.LayerGradient.WebGLRenderCmd;

    proto.updateStatus = function () {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        if (locFlag & flags.gradientDirty) {
            this._dirtyFlag |= flags.colorDirty;
            this._updateVertex();
            this._dirtyFlag &= ~flags.gradientDirty;
        }

        _ccsg.Node.RenderCmd.prototype.updateStatus.call(this);
    };

    proto._syncStatus = function (parentCmd) {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        if (locFlag & flags.gradientDirty) {
            this._dirtyFlag |= flags.colorDirty;
            this._updateVertex();
            this._dirtyFlag &= ~flags.gradientDirty;
        }

        _ccsg.Node.RenderCmd.prototype._syncStatus.call(this, parentCmd);
    };

    proto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);
        this._updateVertex();
    };

    proto._updateVertex = function () {
        var node = this._node, stops = node._colorStops;
        if(!stops || stops.length < 2)
            return;

        this._clippingRectDirty = true;
        var stopsLen = stops.length, verticesLen = stopsLen * 2, i, contentSize = node._contentSize;
        var locVertices = this._squareVertices;
        if (locVertices.length < verticesLen) {
            this._squareVerticesAB = new ArrayBuffer(verticesLen * 12);
            locVertices.length = 0;
            var locSquareVerticesAB = this._squareVerticesAB;
            var locVertex3FLen = cc.Vertex3F.BYTES_PER_ELEMENT;
            for(i = 0; i < verticesLen; i++){
                locVertices.push(new cc.Vertex3F(0, 0, 0, locSquareVerticesAB, locVertex3FLen * i));
            }
        }

        //init vertex
        var angle = Math.PI + cc.pAngleSigned(cc.p(0, -1), node._alongVector), locAnchor = cc.p(contentSize.width/2, contentSize.height /2);
        var degrees = Math.round(cc.radiansToDegrees(angle));
        var transMat = cc.affineTransformMake(1, 0, 0, 1, locAnchor.x, locAnchor.y);
        transMat = cc.affineTransformRotate(transMat, angle);
        var a, b;
        if(degrees < 90) {
            a = cc.p(-locAnchor.x, locAnchor.y);
            b = cc.p(locAnchor.x, locAnchor.y);
        } else if(degrees < 180) {
            a = cc.p(locAnchor.x, locAnchor.y);
            b = cc.p(locAnchor.x, -locAnchor.y);
        } else if(degrees < 270) {
            a = cc.p(locAnchor.x, -locAnchor.y);
            b = cc.p(-locAnchor.x, -locAnchor.y);
        } else {
            a = cc.p(-locAnchor.x, -locAnchor.y);
            b = cc.p(-locAnchor.x, locAnchor.y);
        }

        var sin = Math.sin(angle), cos = Math.cos(angle);
        var tx = Math.abs((a.x * cos - a.y * sin)/locAnchor.x), ty = Math.abs((b.x * sin + b.y * cos)/locAnchor.y);
        transMat = cc.affineTransformScale(transMat, tx, ty);
        for (i = 0; i < stopsLen; i++) {
            var stop = stops[i], y = stop.p * contentSize.height ;
            var p0 = cc.pointApplyAffineTransform(- locAnchor.x , y - locAnchor.y, transMat);
            locVertices[i * 2].x = p0.x;
            locVertices[i * 2].y = p0.y;
            locVertices[i * 2].z = node._vertexZ;
            var p1 = cc.pointApplyAffineTransform(contentSize.width - locAnchor.x, y - locAnchor.y, transMat);
            locVertices[i * 2 + 1].x = p1.x;
            locVertices[i * 2 + 1].y = p1.y;
            locVertices[i * 2 + 1].z = node._vertexZ;
        }

        this._bindLayerVerticesBufferData();
    };

    proto._updateColor = function() {
        var node = this._node, stops = node._colorStops;
        if(!stops || stops.length < 2)
            return;

        //init color
        var stopsLen = stops.length;
        var locColors = this._squareColors, verticesLen = stopsLen * 2;
        if (locColors.length < verticesLen) {
            this._squareColorsAB = new ArrayBuffer(verticesLen * 4);
            locColors.length = 0;
            var locSquareColorsAB = this._squareColorsAB;
            var locColorLen = cc.Color.BYTES_PER_ELEMENT;
            for(i = 0; i < verticesLen; i++){
                locColors.push(cc.color(0, 0, 0, 255, locSquareColorsAB, locColorLen * i));
            }
        }

        var opacityf = this._displayedOpacity / 255.0; //, displayColor = this._displayedColor;
        for(i = 0; i < stopsLen; i++){
            var stopColor = stops[i].color, locSquareColor0 = locColors[i * 2], locSquareColor1 = locColors[i * 2 + 1];
            locSquareColor0.r = stopColor.r;
            locSquareColor0.g = stopColor.g;
            locSquareColor0.b = stopColor.b;
            locSquareColor0.a = stopColor.a * opacityf;

            locSquareColor1.r = stopColor.r;
            locSquareColor1.g = stopColor.g;
            locSquareColor1.b = stopColor.b;
            locSquareColor1.a = stopColor.a * opacityf;
        }
        this._bindLayerColorsBufferData();
    };

    proto.rendering = function (ctx) {
        var context = ctx || cc._renderContext, node = this._node;

        //it is too expensive to use stencil to clip, so it use Scissor,
        //but it has a bug when layer rotated and layer's content size less than canvas's size.
        var clippingRect = this._getClippingRect();
        context.enable(context.SCISSOR_TEST);
        cc.view.setScissorInPoints(clippingRect.x, clippingRect.y, clippingRect.width, clippingRect.height);

        var wt = this._worldTransform, mat = this._matrix.mat;
        mat[0] = wt.a;
        mat[4] = wt.c;
        mat[12] = wt.tx;
        mat[1] = wt.b;
        mat[5] = wt.d;
        mat[13] = wt.ty;

        //draw gradient layer
        this._shaderProgram.use();
        this._shaderProgram._setUniformForMVPMatrixWithMat4(this._matrix);
        context.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_POSITION);
        context.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_COLOR);
        cc.gl.blendFunc(node._blendFunc.src, node._blendFunc.dst);
        //
        // Attributes
        //
        context.bindBuffer(context.ARRAY_BUFFER, this._verticesFloat32Buffer);
        context.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_POSITION, 3, context.FLOAT, false, 0, 0);
        context.bindBuffer(context.ARRAY_BUFFER, this._colorsUint8Buffer);
        context.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_COLOR, 4, context.UNSIGNED_BYTE, true, 0, 0);
        context.drawArrays(context.TRIANGLE_STRIP, 0, this._squareVertices.length);

        context.disable(context.SCISSOR_TEST);
    };

    proto._getClippingRect = function(){
        if(this._clippingRectDirty){
            var node = this._node;
            var rect = cc.rect(0, 0, node._contentSize.width, node._contentSize.height);
            var trans = node.getNodeToWorldTransform();
            this._clipRect = cc._rectApplyAffineTransformIn(rect, trans);
        }
        return this._clipRect;
    };
})();

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * cc.configuration is a singleton object which contains some openGL variables
 * @class
 * @name cc.configuration
 * @example
 * var textureSize = cc.configuration.getMaxTextureSize();
 */
cc.configuration = /** @lends cc.configuration# */{
	// Type constants
	/*
	 * ERROR type
	 * @public
	 * @const
	 * @type {Number}
	 */
	ERROR:0,

	/*
	 * STRING type
	 * @public
	 * @const
	 * @type {Number}
	 */
	STRING:1,

	/*
	 * INT type
	 * @public
	 * @const
	 * @type {Number}
	 */
	INT:2,

	/*
	 * DOUBLE type
	 * @public
	 * @const
	 * @type {Number}
	 */
	DOUBLE:3,

	/*
	 * BOOLEAN type
	 * @public
	 * @const
	 * @type {Number}
	 */
	BOOLEAN:4,

    _maxTextureSize:0,
    _maxModelviewStackDepth:0,
    _supportsPVRTC:false,
    _supportsNPOT:false,
    _supportsBGRA8888:false,
    _supportsDiscardFramebuffer:false,
    _supportsShareableVAO:false,
    _maxSamplesAllowed:0,
    _maxTextureUnits:0,
    _GlExtensions:"",
    _valueDict:{},

	_inited: false,

	_init:function () {
		var locValueDict = this._valueDict;
		locValueDict["cocos2d.x.version"] = cc.ENGINE_VERSION;
		locValueDict["cocos2d.x.compiled_with_profiler"] = false;
		locValueDict["cocos2d.x.compiled_with_gl_state_cache"] = cc.macro.ENABLE_GL_STATE_CACHE;
		this._inited = true;
	},

    /**
     * OpenGL Max texture size.
     * @return {Number}
     */
    getMaxTextureSize:function () {
        return this._maxTextureSize;
    },

    /**
     * OpenGL Max Modelview Stack Depth.
     * @return {Number}
     */
    getMaxModelviewStackDepth:function () {
        return this._maxModelviewStackDepth;
    },

    /**
     * returns the maximum texture units
     * @return {Number}
     */
    getMaxTextureUnits:function () {
        return this._maxTextureUnits;
    },

    /**
     * Whether or not the GPU supports NPOT (Non Power Of Two) textures.
     * OpenGL ES 2.0 already supports NPOT (iOS).
     * @return {Boolean}
     */
    supportsNPOT:function () {
        return this._supportsNPOT;
    },

    /**
     * Whether or not PVR Texture Compressed is supported
     * @return {Boolean}
     */
    supportsPVRTC: function () {
        return this._supportsPVRTC;
    },

	/**
	 * Whether or not ETC Texture Compressed is supported
	 * @return {Boolean}
	 */
	supportsETC: function() {
		return false;
	},

	/**
	 * Whether or not S3TC Texture Compressed is supported
	 * @return {Boolean}
	 */
	supportsS3TC: function() {
		return false;
	},

	/**
	 * Whether or not ATITC Texture Compressed is supported
	 * @return {Boolean}
	 */
	supportsATITC: function() {
		return false;
	},

    /**
     * Whether or not BGRA8888 textures are supported.
     * @return {Boolean}
     */
    supportsBGRA8888:function () {
        return this._supportsBGRA8888;
    },

    /**
     * Whether or not glDiscardFramebufferEXT is supported
     * @return {Boolean}
     */
    supportsDiscardFramebuffer:function () {
        return this._supportsDiscardFramebuffer;
    },

    /**
     * Whether or not shareable VAOs are supported.
     * @return {Boolean}
     */
    supportsShareableVAO:function () {
        return this._supportsShareableVAO;
    },

    /**
     * returns whether or not an OpenGL is supported
     * @param {String} searchName
     */
    checkForGLExtension:function (searchName) {
        return this._GlExtensions.indexOf(searchName) > -1;
    },

    /**
     * Returns the value of a given key.  If the key is not found, it will return the default value
     * @param {String} key
     * @param {String|Bool|Number|Object} [default_value=null]
     * @returns {String|Bool|Number|Object}
     */
    getValue: function(key, default_value){
	    if(!this._inited)
		    this._init();
        var locValueDict = this._valueDict;
        if(locValueDict[key])
            return locValueDict[key];
        return default_value;
    },

    /**
     * Sets a new key/value pair  in the configuration dictionary
     * @param {string} key
     * @param {String|Bool|Number|Object} value
     */
    setValue: function(key, value){
        this._valueDict[key] = value;
    },

    /**
     * gathers OpenGL / GPU information
     */
    gatherGPUInfo: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return;

	    if(!this._inited)
		    this._init();
        var gl = cc._renderContext;
        var locValueDict = this._valueDict;
        locValueDict["gl.vendor"] = gl.getParameter(gl.VENDOR);
        locValueDict["gl.renderer"] = gl.getParameter(gl.RENDERER);
        locValueDict["gl.version"] = gl.getParameter(gl.VERSION);

        this._GlExtensions = "";
        var extArr = gl.getSupportedExtensions();
        for (var i = 0; i < extArr.length; i++)
            this._GlExtensions += extArr[i] + " ";

        this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        locValueDict["gl.max_texture_size"] = this._maxTextureSize;
        this._maxTextureUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        locValueDict["gl.max_texture_units"] = this._maxTextureUnits;

        this._supportsPVRTC = this.checkForGLExtension("GL_IMG_texture_compression_pvrtc");
        locValueDict["gl.supports_PVRTC"] = this._supportsPVRTC;

        this._supportsNPOT = false; //true;
        locValueDict["gl.supports_NPOT"] = this._supportsNPOT;

        this._supportsBGRA8888 = this.checkForGLExtension("GL_IMG_texture_format_BGRA888");
        locValueDict["gl.supports_BGRA8888"] = this._supportsBGRA8888;

        this._supportsDiscardFramebuffer = this.checkForGLExtension("GL_EXT_discard_framebuffer");
        locValueDict["gl.supports_discard_framebuffer"] = this._supportsDiscardFramebuffer;

        this._supportsShareableVAO = this.checkForGLExtension("vertex_array_object");
        locValueDict["gl.supports_vertex_array_object"] = this._supportsShareableVAO;

        cc.checkGLErrorDebug();
    },

    /**
     * Loads a config file. If the keys are already present, then they are going to be replaced. Otherwise the new keys are added.
     * @param {string} url
     */
    loadConfigFile: function( url){
	    if(!this._inited)
		    this._init();
        var dict = cc.loader.getRes(url);
        if(!dict) throw new Error("Please load the resource first : " + url);
        cc.assert(dict, cc._LogInfos.configuration.loadConfigFile_2, url);

        var getDatas = dict["data"];
        if(!getDatas){
            cc.log(cc._LogInfos.configuration.loadConfigFile, url);
            return;
        }

        // Add all keys in the existing dictionary
        for(var selKey in getDatas)
            this._valueDict[selKey] = getDatas[selKey];
    }
};
/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * Canvas of DrawingPrimitive implement version use for canvasMode
 * @class DrawingPrimitiveCanvas
 * @extends cc._Class
 * @param {CanvasRenderingContext2D} renderContext
 */
cc.DrawingPrimitiveCanvas = cc._Class.extend(/** @lends cc.DrawingPrimitiveCanvas# */{
    _cacheArray:[],
    _renderContext:null,
    /**
     * Constructor of cc.DrawingPrimitiveCanvas
     * @param {cc.CanvasContextWrapper} renderContext
     */
    ctor:function (renderContext) {
        this._renderContext = renderContext;
    },

    /**
     * draws a point given x and y coordinate measured in points
     * @override
     * @param {cc.Vec2} point
     * @param {Number} size
     */
    drawPoint:function (point, size) {
        if (!size) {
            size = 1;
        }
        var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
        var newPoint = cc.p(point.x  * locScaleX, point.y * locScaleY);
        var ctx = this._renderContext.getContext();
        ctx.beginPath();
        ctx.arc(newPoint.x, -newPoint.y, size * locScaleX, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    },

    /**
     * draws an array of points.
     * @override
     * @param {Array} points point of array
     * @param {Number} numberOfPoints
     * @param {Number} size
     */
    drawPoints:function (points, numberOfPoints, size) {
        if (points == null)
            return;

        if (!size) {
            size = 1;
        }
        var locContext = this._renderContext.getContext(),locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();

        locContext.beginPath();
        for (var i = 0, len = points.length; i < len; i++)
            locContext.arc(points[i].x * locScaleX, -points[i].y * locScaleY, size * locScaleX, 0, Math.PI * 2, false);
        locContext.closePath();
        locContext.fill();
    },

    /**
     * draws a line given the origin and destination point measured in points
     * @override
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     */
    drawLine:function (origin, destination) {
        var locContext = this._renderContext.getContext(), locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
        locContext.beginPath();
        locContext.moveTo(origin.x * locScaleX, -origin.y * locScaleY);
        locContext.lineTo(destination.x * locScaleX, -destination.y * locScaleY);
        locContext.closePath();
        locContext.stroke();
    },

    /**
     * draws a rectangle given the origin and destination point measured in points.
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     */
    drawRect:function (origin, destination) {
        //todo need optimize for performance
        this.drawLine(cc.p(origin.x, origin.y), cc.p(destination.x, origin.y));
        this.drawLine(cc.p(destination.x, origin.y), cc.p(destination.x, destination.y));
        this.drawLine(cc.p(destination.x, destination.y), cc.p(origin.x, destination.y));
        this.drawLine(cc.p(origin.x, destination.y), cc.p(origin.x, origin.y));
    },

    /**
     * draws a solid rectangle given the origin and destination point measured in points.
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     * @param {cc.Color} color
     */
    drawSolidRect:function (origin, destination, color) {
        var vertices = [
            origin,
            cc.p(destination.x, origin.y),
            destination,
            cc.p(origin.x, destination.y)
        ];

        this.drawSolidPoly(vertices, 4, color);
    },

    /**
     * draws a polygon given a pointer to cc.Vec2 coordinates and the number of vertices measured in points.
     * @override
     * @param {Array} vertices a pointer to cc.Vec2 coordinates
     * @param {Number} numOfVertices the number of vertices measured in points
     * @param {Boolean} closePolygon The polygon can be closed or open
     * @param {Boolean} [fill=] The polygon can be closed or open and optionally filled with current color
     */
    drawPoly:function (vertices, numOfVertices, closePolygon, fill) {
        fill = fill || false;

        if (vertices == null)
            return;

        if (vertices.length < 3)
            throw new Error("Polygon's point must greater than 2");

        var firstPoint = vertices[0], locContext = this._renderContext.getContext();
        var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
        locContext.beginPath();
        locContext.moveTo(firstPoint.x * locScaleX, -firstPoint.y * locScaleY);
        for (var i = 1, len = vertices.length; i < len; i++)
            locContext.lineTo(vertices[i].x * locScaleX, -vertices[i].y * locScaleY);

        if (closePolygon)
            locContext.closePath();

        if (fill)
            locContext.fill();
        else
            locContext.stroke();
    },

    /**
     * draws a solid polygon given a pointer to CGPoint coordinates, the number of vertices measured in points, and a color.
     * @param {Array} polygons
     * @param {Number} numberOfPoints
     * @param {cc.Color} color
     */
    drawSolidPoly:function (polygons, numberOfPoints, color) {
        this.setDrawColor(color.r, color.g, color.b, color.a);
        this.drawPoly(polygons, numberOfPoints, true, true);
    },

    /**
     * draws a circle given the center, radius and number of segments.
     * @override
     * @param {cc.Vec2} center center of circle
     * @param {Number} radius
     * @param {Number} angle angle in radians
     * @param {Number} segments
     * @param {Boolean} [drawLineToCenter=]
     */
    drawCircle: function (center, radius, angle, segments, drawLineToCenter) {
        drawLineToCenter = drawLineToCenter || false;
        var locContext = this._renderContext.getContext();
        var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
        locContext.beginPath();
        var endAngle = angle - Math.PI * 2;
        locContext.arc(0 | (center.x * locScaleX), 0 | -(center.y * locScaleY), radius * locScaleX, -angle, -endAngle, false);
        if (drawLineToCenter) {
            locContext.lineTo(0 | (center.x * locScaleX), 0 | -(center.y * locScaleY));
        }
        locContext.stroke();
    },

    /**
     * draws a quad bezier path
     * @override
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} control
     * @param {cc.Vec2} destination
     * @param {Number} segments
     */
    drawQuadBezier:function (origin, control, destination, segments) {
        //this is OpenGL Algorithm
        var vertices = this._cacheArray;
        vertices.length =0;

        var t = 0.0;
        for (var i = 0; i < segments; i++) {
            var x = Math.pow(1 - t, 2) * origin.x + 2.0 * (1 - t) * t * control.x + t * t * destination.x;
            var y = Math.pow(1 - t, 2) * origin.y + 2.0 * (1 - t) * t * control.y + t * t * destination.y;
            vertices.push(cc.p(x, y));
            t += 1.0 / segments;
        }
        vertices.push(cc.p(destination.x, destination.y));

        this.drawPoly(vertices, segments + 1, false, false);
    },

    /**
     * draws a cubic bezier path
     * @override
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} control1
     * @param {cc.Vec2} control2
     * @param {cc.Vec2} destination
     * @param {Number} segments
     */
    drawCubicBezier:function (origin, control1, control2, destination, segments) {
        //this is OpenGL Algorithm
        var vertices = this._cacheArray;
        vertices.length =0;

        var t = 0;
        for (var i = 0; i < segments; i++) {
            var x = Math.pow(1 - t, 3) * origin.x + 3.0 * Math.pow(1 - t, 2) * t * control1.x + 3.0 * (1 - t) * t * t * control2.x + t * t * t * destination.x;
            var y = Math.pow(1 - t, 3) * origin.y + 3.0 * Math.pow(1 - t, 2) * t * control1.y + 3.0 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
            vertices.push(cc.p(x , y ));
            t += 1.0 / segments;
        }
        vertices.push(cc.p(destination.x , destination.y));

        this.drawPoly(vertices, segments + 1, false, false);
    },

    /**
     * draw a CatmullRom curve
     * @override
     * @param {Array} points
     * @param {Number} segments
     */
    drawCatmullRom:function (points, segments) {
        this.drawCardinalSpline(points, 0.5, segments);
    },

    /**
     * draw a cardinal spline path
     * @override
     * @param {Array} config
     * @param {Number} tension
     * @param {Number} segments
     */
    drawCardinalSpline:function (config, tension, segments) {
        //lazy_init();
        cc._renderContext.setStrokeStyle("rgba(255,255,255,1)");
        var points = this._cacheArray;
        points.length = 0;
        var p, lt;
        var deltaT = 1.0 / config.length;

        for (var i = 0; i < segments + 1; i++) {
            var dt = i / segments;

            // border
            if (dt === 1) {
                p = config.length - 1;
                lt = 1;
            } else {
                p = 0 | (dt / deltaT);
                lt = (dt - deltaT * p) / deltaT;
            }

            // Interpolate
            var newPos = cc.cardinalSplineAt(
                cc.getControlPointAt(config, p - 1),
                cc.getControlPointAt(config, p - 0),
                cc.getControlPointAt(config, p + 1),
                cc.getControlPointAt(config, p + 2),
                tension, lt);
            points.push(newPos);
        }
        this.drawPoly(points, segments + 1, false, false);
    },

    /**
     * draw an image
     * @override
     * @param {HTMLImageElement|HTMLCanvasElement} image
     * @param {cc.Vec2} sourcePoint
     * @param {Size} sourceSize
     * @param {cc.Vec2} destPoint
     * @param {Size} destSize
     */
    drawImage:function (image, sourcePoint, sourceSize, destPoint, destSize) {
        var len = arguments.length;
        var ctx = this._renderContext.getContext();
        switch (len) {
            case 2:
                var height = image.height;
                ctx.drawImage(image, sourcePoint.x, -(sourcePoint.y + height));
                break;
            case 3:
                ctx.drawImage(image, sourcePoint.x, -(sourcePoint.y + sourceSize.height), sourceSize.width, sourceSize.height);
                break;
            case 5:
                ctx.drawImage(image, sourcePoint.x, sourcePoint.y, sourceSize.width, sourceSize.height, destPoint.x, -(destPoint.y + destSize.height),
                    destSize.width, destSize.height);
                break;
            default:
                throw new Error("Argument must be non-nil");
                break;
        }
    },

    /**
     * draw a star
     * @param {cc.CanvasContextWrapper} ctx canvas context
     * @param {Number} radius
     * @param {cc.Color} color
     */
    drawStar:function (ctx, radius, color) {
        var wrapper = ctx || this._renderContext;
        var context = wrapper.getContext();
        radius *= cc.view.getScaleX();
        var colorStr = "rgba(" + (0 | color.r) + "," + (0 | color.g) + "," + (0 | color.b);
        wrapper.setFillStyle(colorStr + ",1)");
        //context.fillStyle = colorStr + ",1)";
        var subRadius = radius / 10;

        context.beginPath();
        context.moveTo(-radius, radius);
        context.lineTo(0, subRadius);
        context.lineTo(radius, radius);
        context.lineTo(subRadius, 0);
        context.lineTo(radius, -radius);
        context.lineTo(0, -subRadius);
        context.lineTo(-radius, -radius);
        context.lineTo(-subRadius, 0);
        context.lineTo(-radius, radius);
        context.closePath();
        context.fill();

        var rg = context.createRadialGradient(0, 0, subRadius, 0, 0, radius);
        rg.addColorStop(0, colorStr + ", 1)");
        rg.addColorStop(0.3, colorStr + ", 0.8)");
        rg.addColorStop(1.0, colorStr + ", 0.0)");
        wrapper.setFillStyle(rg);
        //context.fillStyle = g1;
        context.beginPath();
        var startAngle_1 = 0;
        var endAngle_1 = cc.macro.PI2;
        context.arc(0, 0, radius - subRadius, startAngle_1, endAngle_1, false);
        context.closePath();
        context.fill();
    },

    /**
     * draw a color ball
     * @param {cc.CanvasContextWrapper} ctx canvas context
     * @param {Number} radius
     * @param {cc.Color} color
     */
    drawColorBall:function (ctx, radius, color) {
        var wrapper = ctx || this._renderContext;
        var context = wrapper.getContext();
        radius *= cc.view.getScaleX();
        var colorStr = "rgba(" +(0|color.r) + "," + (0|color.g) + "," + (0|color.b);
        var subRadius = radius / 10;

        var g1 = context.createRadialGradient(0, 0, subRadius, 0, 0, radius);
        g1.addColorStop(0, colorStr + ", 1)");
        g1.addColorStop(0.3, colorStr + ", 0.8)");
        g1.addColorStop(0.6, colorStr + ", 0.4)");
        g1.addColorStop(1.0, colorStr + ", 0.0)");
        wrapper.setFillStyle(g1);
        //context.fillStyle = g1;
        context.beginPath();
        var startAngle_1 = 0;
        var endAngle_1 = cc.macro.PI2;
        context.arc(0, 0, radius, startAngle_1, endAngle_1, false);
        context.closePath();
        context.fill();
    },

    /**
     * fill text
     * @param {String} strText
     * @param {Number} x
     * @param {Number} y
     */
    fillText:function (strText, x, y) {
        this._renderContext.getContext().fillText(strText, x, -y);
    },

    /**
     * set the drawing color with 4 unsigned bytes
     * @param {Number} r red value (0 to 255)
     * @param {Number} g green value (0 to 255)
     * @param {Number} b blue value (0 to 255)
     * @param {Number} a Alpha value (0 to 255)
     */
    setDrawColor:function (r, g, b, a) {
        this._renderContext.setFillStyle("rgba(" + r + "," + g + "," + b + "," + a / 255 + ")");
        this._renderContext.setStrokeStyle("rgba(" + r + "," + g + "," + b + "," + a / 255 + ")");
    },

    /**
     * set the point size in points. Default 1.
     * @param {Number} pointSize
     */
    setPointSize:function (pointSize) {
    },

    /**
     * set the line width. Default 1.
     * @param {Number} width
     */
    setLineWidth:function (width) {
        this._renderContext.getContext().lineWidth = width * cc.view.getScaleX();
    }
});

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var macro = cc.macro;

/**
 * Canvas of DrawingPrimitive implement version use for WebGlMode
 * @class
 * @extends cc._Class
 */
cc.DrawingPrimitiveWebGL = cc._Class.extend(/** @lends cc.DrawingPrimitiveWebGL# */{
    _renderContext:null,
    _initialized:false,
    _shader: null,
    _colorLocation: "u_color",
    _colorArray: null,
    _pointSizeLocation: "u_pointSize",
    _pointSize:-1,
    /**
     * contructor of cc.DrawingPrimitiveWebGL
     * @param ctx rendercontext
     */
    ctor:function (ctx) {
        if (ctx == null)
            ctx = cc._renderContext;

        if (!ctx instanceof  WebGLRenderingContext)
            throw new Error("Can't initialise DrawingPrimitiveWebGL. context need is WebGLRenderingContext");

        this._renderContext = ctx;
        this._colorArray = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    },

    lazy_init:function () {
        var _t = this;
        if (!_t._initialized) {
            //
            // Position and 1 color passed as a uniform (to similate glColor4ub )
            //
            _t._shader = cc.shaderCache.programForKey(macro.SHADER_POSITION_UCOLOR);
            _t._shader._addUniformLocation(_t._colorLocation);
            _t._shader._addUniformLocation(_t._pointSizeLocation);

            _t._initialized = true;
        }
    },

    /**
     * initlialize context
     */
    drawInit:function () {
        this._initialized = false;
    },

    /**
     * draws a point given x and y coordinate measured in points
     * @param {cc.Vec2} point
     */
    drawPoint:function (point) {
        this.lazy_init();

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
        this._shader.setUniformLocationWith1f(this._pointSizeLocation, this._pointSize);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([point.x, point.y]), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.POINTS, 0, 1);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws an array of points.
     * @param {Array} points point of array
     * @param {Number} numberOfPoints
     */
    drawPoints:function (points, numberOfPoints) {
        if (!points || points.length === 0)
            return;

        this.lazy_init();

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
        this._shader.setUniformLocationWith1f(this._pointSizeLocation, this._pointSize);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray(points), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.POINTS, 0, points.length);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    _pointsToTypeArray:function (points) {
        var typeArr = new Float32Array(points.length * 2);
        for (var i = 0; i < points.length; i++) {
            typeArr[i * 2] = points[i].x;
            typeArr[i * 2 + 1] = points[i].y;
        }
        return typeArr;
    },

    /**
     * draws a line given the origin and destination point measured in points
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     */
    drawLine:function (origin, destination) {
        this.lazy_init();

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray([origin, destination]), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.LINES, 0, 2);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a rectangle given the origin and destination point measured in points.
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     */
    drawRect:function (origin, destination) {
        this.drawLine(cc.p(origin.x, origin.y), cc.p(destination.x, origin.y));
        this.drawLine(cc.p(destination.x, origin.y), cc.p(destination.x, destination.y));
        this.drawLine(cc.p(destination.x, destination.y), cc.p(origin.x, destination.y));
        this.drawLine(cc.p(origin.x, destination.y), cc.p(origin.x, origin.y));
    },

    /**
     * draws a solid rectangle given the origin and destination point measured in points.
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     * @param {cc.Color} color
     */
    drawSolidRect:function (origin, destination, color) {
        var vertices = [
            origin,
            cc.p(destination.x, origin.y),
            destination,
            cc.p(origin.x, destination.y)
        ];

        this.drawSolidPoly(vertices, 4, color);
    },

    /**
     * draws a polygon given a pointer to cc.Vec2 coordiantes and the number of vertices measured in points.
     * @param {Array} vertices a pointer to cc.Vec2 coordiantes
     * @param {Number} numOfVertices the number of vertices measured in points
     * @param {Boolean} closePolygon The polygon can be closed or open
     */
    drawPoly:function (vertices, numOfVertices, closePolygon) {
        this.lazy_init();

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray(vertices), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        if (closePolygon)
            glContext.drawArrays(glContext.LINE_LOOP, 0, vertices.length);
        else
            glContext.drawArrays(glContext.LINE_STRIP, 0, vertices.length);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a solid polygon given a pointer to CGPoint coordiantes, the number of vertices measured in points, and a color.
     * @param {Array} poli
     * @param {Number} numberOfPoints
     * @param {cc.Color} color
     */
    drawSolidPoly:function (poli, numberOfPoints, color) {
        this.lazy_init();
        if (color)
            this.setDrawColor(color.r, color.g, color.b, color.a);

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray(poli), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
        glContext.drawArrays(glContext.TRIANGLE_FAN, 0, poli.length);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a circle given the center, radius and number of segments.
     * @param {cc.Vec2} center center of circle
     * @param {Number} radius
     * @param {Number} angle angle in radians
     * @param {Number} segments
     * @param {Boolean} drawLineToCenter
     */
    drawCircle:function (center, radius, angle, segments, drawLineToCenter) {
        this.lazy_init();

        var additionalSegment = 1;
        if (drawLineToCenter)
            additionalSegment++;

        var coef = 2.0 * Math.PI / segments;

        var vertices = new Float32Array((segments + 2) * 2);
        if (!vertices)
            return;

        for (var i = 0; i <= segments; i++) {
            var rads = i * coef;
            var j = radius * Math.cos(rads + angle) + center.x;
            var k = radius * Math.sin(rads + angle) + center.y;

            vertices[i * 2] = j;
            vertices[i * 2 + 1] = k;
        }
        vertices[(segments + 1) * 2] = center.x;
        vertices[(segments + 1) * 2 + 1] = center.y;

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.LINE_STRIP, 0, segments + additionalSegment);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a quad bezier path
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} control
     * @param {cc.Vec2} destination
     * @param {Number} segments
     */
    drawQuadBezier:function (origin, control, destination, segments) {
        this.lazy_init();

        var vertices = new Float32Array((segments + 1) * 2);

        var t = 0.0;
        for (var i = 0; i < segments; i++) {
            vertices[i * 2] = Math.pow(1 - t, 2) * origin.x + 2.0 * (1 - t) * t * control.x + t * t * destination.x;
            vertices[i * 2 + 1] = Math.pow(1 - t, 2) * origin.y + 2.0 * (1 - t) * t * control.y + t * t * destination.y;
            t += 1.0 / segments;
        }
        vertices[segments * 2] = destination.x;
        vertices[segments * 2 + 1] = destination.y;

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a cubic bezier path
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} control1
     * @param {cc.Vec2} control2
     * @param {cc.Vec2} destination
     * @param {Number} segments
     */
    drawCubicBezier:function (origin, control1, control2, destination, segments) {
        this.lazy_init();

        var vertices = new Float32Array((segments + 1) * 2);

        var t = 0;
        for (var i = 0; i < segments; i++) {
            vertices[i * 2] = Math.pow(1 - t, 3) * origin.x + 3.0 * Math.pow(1 - t, 2) * t * control1.x + 3.0 * (1 - t) * t * t * control2.x + t * t * t * destination.x;
            vertices[i * 2 + 1] = Math.pow(1 - t, 3) * origin.y + 3.0 * Math.pow(1 - t, 2) * t * control1.y + 3.0 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
            t += 1.0 / segments;
        }
        vertices[segments * 2] = destination.x;
        vertices[segments * 2 + 1] = destination.y;

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
        glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draw a catmull rom line
     * @param {Array} points
     * @param {Number} segments
     */
    drawCatmullRom:function (points, segments) {
        this.drawCardinalSpline(points, 0.5, segments);
    },

    /**
     * draw a cardinal spline path
     * @param {Array} config
     * @param {Number} tension
     * @param {Number} segments
     */
    drawCardinalSpline:function (config, tension, segments) {
        this.lazy_init();

        var vertices = new Float32Array((segments + 1) * 2);
        var p, lt, deltaT = 1.0 / config.length;
        for (var i = 0; i < segments + 1; i++) {
            var dt = i / segments;

            // border
            if (dt === 1) {
                p = config.length - 1;
                lt = 1;
            } else {
                p = 0 | (dt / deltaT);
                lt = (dt - deltaT * p) / deltaT;
            }

            var newPos = cc.cardinalSplineAt(
                cc.getControlPointAt(config, p - 1),
                cc.getControlPointAt(config, p),
                cc.getControlPointAt(config, p + 1),
                cc.getControlPointAt(config, p + 2),
                tension, lt);
            // Interpolate

            vertices[i * 2] = newPos.x;
            vertices[i * 2 + 1] = newPos.y;
        }

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_FLAG_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
        glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * set the drawing color with 4 unsigned bytes
     * @param {Number} r red value (0 to 255)
     * @param {Number} g green value (0 to 255)
     * @param {Number} b blue value (0 to 255)
     * @param {Number} a Alpha value (0 to 255)
     */
    setDrawColor:function (r, g, b, a) {
        this._colorArray[0] = r / 255.0;
        this._colorArray[1] = g / 255.0;
        this._colorArray[2] = b / 255.0;
        this._colorArray[3] = a / 255.0;
    },

    /**
     * set the point size in points. Default 1.
     * @param {Number} pointSize
     */
    setPointSize:function (pointSize) {
        this._pointSize = pointSize;
    },

    /**
     * set the line width. Default 1.
     * @param {Number} width
     */
    setLineWidth:function (width) {
        if(this._renderContext.lineWidth)
            this._renderContext.lineWidth(width);
    }
});

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc._tmp.PrototypeSprite = function () {
    var _p = _ccsg.Sprite.prototype;

    // Override properties
    cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
    cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
    cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);

    // Extended properties
    /** @expose */
    _p.dirty;
    /** @expose */
    _p.flippedX;
    cc.defineGetterSetter(_p, "flippedX", _p.isFlippedX, _p.setFlippedX);
    /** @expose */
    _p.flippedY;
    cc.defineGetterSetter(_p, "flippedY", _p.isFlippedY, _p.setFlippedY);
    /** @expose */
    _p.offsetX;
    cc.defineGetterSetter(_p, "offsetX", _p._getOffsetX);
    /** @expose */
    _p.offsetY;
    cc.defineGetterSetter(_p, "offsetY", _p._getOffsetY);
    /** @expose */
    _p.atlasIndex;
    /** @expose */
    _p.texture;
    cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
    /** @expose */
    _p.textureRectRotated;
    cc.defineGetterSetter(_p, "textureRectRotated", _p.isTextureRectRotated);
    /** @expose */
    _p.textureAtlas;
    /** @expose */
    _p.batchNode;
    cc.defineGetterSetter(_p, "batchNode", _p.getBatchNode, _p.setBatchNode);
    /** @expose */
    _p.quad;
    cc.defineGetterSetter(_p, "quad", _p.getQuad);

};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var EventTarget = require("../cocos2d/core/event/event-target");

/**
 * <p>_ccsg.Sprite is a 2d image ( http://en.wikipedia.org/wiki/Sprite_(computer_graphics) )  <br/>
 *
 * _ccsg.Sprite can be created with an image, or with a sub-rectangle of an image.  <br/>
 *
 * If the parent or any of its ancestors is a cc.SpriteBatchNode then the following features/limitations are valid   <br/>
 *    - Features when the parent is a cc.BatchNode: <br/>
 *        - MUCH faster rendering, specially if the cc.SpriteBatchNode has many children. All the children will be drawn in a single batch.  <br/>
 *
 *    - Limitations   <br/>
 *        - Camera is not supported yet (eg: CCOrbitCamera action doesn't work)  <br/>
 *        - GridBase actions are not supported (eg: CCLens, CCRipple, CCTwirl) <br/>
 *        - The Alias/Antialias property belongs to CCSpriteBatchNode, so you can't individually set the aliased property.  <br/>
 *        - The Blending function property belongs to CCSpriteBatchNode, so you can't individually set the blending function property. <br/>
 *        - Parallax scroller is not supported, but can be simulated with a "proxy" sprite.        <br/>
 *
 *  If the parent is an standard ccsg.Node, then _ccsg.Sprite behaves like any other ccsg.Node:      <br/>
 *    - It supports blending functions    <br/>
 *    - It supports aliasing / antialiasing    <br/>
 *    - But the rendering will be slower: 1 draw per children.   <br/>
 *
 * The default anchorPoint in _ccsg.Sprite is (0.5, 0.5). </p>
 * @class
 * @extends _ccsg.Node
 *
 * @param {String|cc.SpriteFrame|HTMLImageElement|cc.Texture2D} fileName  The string which indicates a path to image file, e.g., "scene1/monster.png".
 * @param {Rect} rect  Only the contents inside rect of pszFileName's texture will be applied for this sprite.
 * @param {Boolean} [rotated] Whether or not the texture rectangle is rotated.
 * @example
 *
 * 1.Create a sprite with image path and rect
 * var sprite1 = new _ccsg.Sprite("res/HelloHTML5World.png");
 * var sprite2 = new _ccsg.Sprite("res/HelloHTML5World.png",cc.rect(0,0,480,320));
 *
 * 2.Create a sprite with a sprite frame name. Must add "#" before frame name.
 * var sprite = new _ccsg.Sprite('#grossini_dance_01.png');
 *
 * 3.Create a sprite with a sprite frame
 * var spriteFrame = cc.spriteFrameCache.getSpriteFrame("grossini_dance_01.png");
 * var sprite = new _ccsg.Sprite(spriteFrame);
 *
 * 4.Create a sprite with an existing texture contained in a CCTexture2D object
 *      After creation, the rect will be the size of the texture, and the offset will be (0,0).
 * var texture = cc.textureCache.addImage("HelloHTML5World.png");
 * var sprite1 = new _ccsg.Sprite(texture);
 * var sprite2 = new _ccsg.Sprite(texture, cc.rect(0,0,480,320));
 *
 * @property {Boolean}              dirty               - Indicates whether the sprite needs to be updated.
 * @property {Boolean}              flippedX            - Indicates whether or not the sprite is flipped on x axis.
 * @property {Boolean}              flippedY            - Indicates whether or not the sprite is flipped on y axis.
 * @property {Number}               offsetX             - <@readonly> The offset position on x axis of the sprite in texture. Calculated automatically by editors like Zwoptex.
 * @property {Number}               offsetY             - <@readonly> The offset position on x axis of the sprite in texture. Calculated automatically by editors like Zwoptex.
 * @property {Number}               atlasIndex          - The index used on the TextureAtlas.
 * @property {Texture2D}         texture             - Texture used to render the sprite.
 * @property {Boolean}              textureRectRotated  - <@readonly> Indicate whether the texture rectangle is rotated.
 * @property {cc.TextureAtlas}      textureAtlas        - The weak reference of the cc.TextureAtlas when the sprite is rendered using via cc.SpriteBatchNode.
 * @property {cc.SpriteBatchNode}   batchNode           - The batch node object if this sprite is rendered by cc.SpriteBatchNode.
 * @property {cc.V3F_C4B_T2F_Quad}  quad                - <@readonly> The quad (tex coords, vertex coords and color) information.
 */
_ccsg.Sprite = _ccsg.Node.extend({
        dirty:false,
        atlasIndex:0,
    textureAtlas:null,

    _batchNode:null,
    _recursiveDirty:null, //Whether all of the sprite's children needs to be updated
    _hasChildren:null, //Whether the sprite contains children
    _shouldBeHidden:false, //should not be drawn because one of the ancestors is not visible
    _transformToBatch:null,

    //
    // Data used when the sprite is self-rendered
    //
    _blendFunc:null, //It's required for CCTextureProtocol inheritance
    _texture:null, //cc.Texture2D object that is used to render the sprite

    //
    // Shared data
    //
    // texture
    _rect:null, //Rectangle of cc.Texture2D
    _rectRotated:false, //Whether the texture is rotated

    // Offset Position (used by Zwoptex)
    _offsetPosition:null, // absolute
    _unflippedOffsetPositionFromCenter:null,

    _opacityModifyRGB:false,

    // image is flipped
    _flippedX:false, //Whether the sprite is flipped horizontally or not.
    _flippedY:false, //Whether the sprite is flipped vertically or not.

    _textureLoaded:false,
    _className:"Sprite",

    ctor: function (fileName, rect, rotated) {
        var self = this;
        _ccsg.Node.prototype.ctor.call(self);
        EventTarget.call(self);

        self._shouldBeHidden = false;
        self._offsetPosition = cc.p(0, 0);
        self._unflippedOffsetPositionFromCenter = cc.p(0, 0);
        self._blendFunc = {src: cc.macro.BLEND_SRC, dst: cc.macro.BLEND_DST};
        self._rect = cc.rect(0, 0, 0, 0);

        self._softInit(fileName, rect, rotated);
    },

    /**
     * Returns whether the texture have been loaded
     * @returns {boolean}
     */
    textureLoaded:function(){
        return this._textureLoaded;
    },

    /**
     * Add a event listener for texture loaded event.
     * @param {Function} callback
     * @param {Object} target
     * @deprecated since 3.1, please use EventTarget instead
     */
    addLoadedEventListener:function(callback, target){
        this.once("load", callback, target);
    },

    /**
     * Returns whether or not the Sprite needs to be updated in the Atlas
     * @return {Boolean} True if the sprite needs to be updated in the Atlas, false otherwise.
     */
    isDirty:function () {
        return this.dirty;
    },

    /**
     * Makes the sprite to be updated in the Atlas.
     * @param {Boolean} bDirty
     */
    setDirty:function (bDirty) {
        this.dirty = bDirty;
    },

    /**
     * Returns whether or not the texture rectangle is rotated.
     * @return {Boolean}
     */
    isTextureRectRotated:function () {
        return this._rectRotated;
    },

    /**
     * Returns the index used on the TextureAtlas.
     * @return {Number}
     */
    getAtlasIndex:function () {
        return this.atlasIndex;
    },

    /**
     * Sets the index used on the TextureAtlas.
     * @warning Don't modify this value unless you know what you are doing
     * @param {Number} atlasIndex
     */
    setAtlasIndex:function (atlasIndex) {
        this.atlasIndex = atlasIndex;
    },

    /**
     * Returns the rect of the _ccsg.Sprite in points
     * @return {Rect}
     */
    getTextureRect:function () {
        return cc.rect(this._rect);
    },

    /**
     * Returns the weak reference of the cc.TextureAtlas when the sprite is rendered using via cc.SpriteBatchNode
     * @return {cc.TextureAtlas}
     */
    getTextureAtlas:function () {
        return this.textureAtlas;
    },

    /**
     * Sets the weak reference of the cc.TextureAtlas when the sprite is rendered using via cc.SpriteBatchNode
     * @param {cc.TextureAtlas} textureAtlas
     */
    setTextureAtlas:function (textureAtlas) {
        this.textureAtlas = textureAtlas;
    },

    /**
     * Returns the offset position of the sprite. Calculated automatically by editors like Zwoptex.
     * @return {cc.Vec2}
     */
    getOffsetPosition:function () {
        return cc.p(this._offsetPosition);
    },

    _getOffsetX: function () {
        return this._offsetPosition.x;
    },
    _getOffsetY: function () {
        return this._offsetPosition.y;
    },

    /**
     * Returns the blend function
     * @return {cc.BlendFunc}
     */
    getBlendFunc:function () {
        return this._blendFunc;
    },

    /**
     * Initializes a sprite with a SpriteFrame. The texture and rect in SpriteFrame will be applied on this sprite.<br/>
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself,
     * @param {cc.SpriteFrame} spriteFrame A CCSpriteFrame object. It should includes a valid texture and a rect
     * @return {Boolean}  true if the sprite is initialized properly, false otherwise.
     */
    initWithSpriteFrame:function (spriteFrame) {
        cc.assert(spriteFrame, cc._LogInfos.Sprite.initWithSpriteFrame);

        if(!spriteFrame.textureLoaded()){
            //add event listener
            this._textureLoaded = false;
            spriteFrame.once("load", this._renderCmd._spriteFrameLoadedCallback, this._renderCmd);
        }

        //TODO
        var rotated = cc._renderType === cc.game.RENDER_TYPE_CANVAS ? false : spriteFrame._rotated;
        var ret = this.initWithTexture(spriteFrame.getTexture(), spriteFrame.getRect(), rotated);
        this.setSpriteFrame(spriteFrame);

        return ret;
    },

    /**
     * Initializes a sprite with a sprite frame name. <br/>
     * A cc.SpriteFrame will be fetched from the cc.SpriteFrameCache by name.  <br/>
     * If the cc.SpriteFrame doesn't exist it will raise an exception. <br/>
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @param {String} spriteFrameName A key string that can fected a valid cc.SpriteFrame from cc.SpriteFrameCache
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     * @example
     * var sprite = new _ccsg.Sprite();
     * sprite.initWithSpriteFrameName("grossini_dance_01.png");
     */
    initWithSpriteFrameName:function (spriteFrameName) {
        cc.assert(spriteFrameName, cc._LogInfos.Sprite.initWithSpriteFrameName);
        var frame = cc.spriteFrameCache.getSpriteFrame(spriteFrameName);
        cc.assert(frame, spriteFrameName + cc._LogInfos.Sprite.initWithSpriteFrameName1);
        return this.initWithSpriteFrame(frame);
    },

    /**
     * Tell the sprite to use batch node render.
     * @param {cc.SpriteBatchNode} batchNode
     */
    useBatchNode:function (batchNode) {
        this.textureAtlas = batchNode.getTextureAtlas(); // weak ref
        this._batchNode = batchNode;
    },

    /**
     * <p>
     *    set the vertex rect.<br/>
     *    It will be called internally by setTextureRect.                           <br/>
     *    Useful if you want to create 2x images from SD images in Retina Display.  <br/>
     *    Do not call it manually. Use setTextureRect instead.  <br/>
     *    (override this method to generate "double scale" sprites)
     * </p>
     * @param {Rect} rect
     */
    setVertexRect:function (rect) {
        var locRect = this._rect;
        locRect.x = rect.x;
        locRect.y = rect.y;
        locRect.width = rect.width;
        locRect.height = rect.height;
    },

    /**
     * Sort all children of this sprite node.
     * @override
     */
    sortAllChildren:function () {
        if (this._reorderChildDirty) {
            var _children = this._children;

            _ccsg.Node.prototype.sortAllChildren.call(this);

            if (this._batchNode) {
                this._arrayMakeObjectsPerformSelector(_children, _ccsg.Node._stateCallbackType.sortAllChildren);
            }

            //don't need to check children recursively, that's done in visit of each child
            this._reorderChildDirty = false;
        }

    },

    /**
     * Reorders a child according to a new z value.  (override ccsg.Node )
     * @param {_ccsg.Node} child
     * @param {Number} zOrder
     * @override
     */
    reorderChild:function (child, zOrder) {
        cc.assert(child, cc._LogInfos.Sprite.reorderChild_2);
        if(this._children.indexOf(child) === -1){
            cc.log(cc._LogInfos.Sprite.reorderChild);
            return;
        }

        if (zOrder === child.zIndex)
            return;

        if (this._batchNode && !this._reorderChildDirty) {
            this._setReorderChildDirtyRecursively();
            this._batchNode.reorderBatch(true);
        }
        _ccsg.Node.prototype.reorderChild.call(this, child, zOrder);
    },

    /**
     * Removes a child from the sprite.
     * @param child
     * @param cleanup  whether or not cleanup all running actions
     * @override
     */
    removeChild:function (child, cleanup) {
        if (this._batchNode)
            this._batchNode.removeSpriteFromAtlas(child);
        _ccsg.Node.prototype.removeChild.call(this, child, cleanup);
    },

    /**
     * Sets whether the sprite is visible or not.
     * @param {Boolean} visible
     * @override
     */
    setVisible:function (visible) {
        _ccsg.Node.prototype.setVisible.call(this, visible);
        this._renderCmd.setDirtyRecursively(true);
    },

    /**
     * Removes all children from the container.
     * @param cleanup whether or not cleanup all running actions
     * @override
     */
    removeAllChildren:function (cleanup) {
        var locChildren = this._children, locBatchNode = this._batchNode;
        if (locBatchNode && locChildren != null) {
            for (var i = 0, len = locChildren.length; i < len; i++)
                locBatchNode.removeSpriteFromAtlas(locChildren[i]);
        }

        _ccsg.Node.prototype.removeAllChildren.call(this, cleanup);
        this._hasChildren = false;
    },

    //
    // _ccsg.Node property overloads
    //

    /**
     * Sets whether ignore anchor point for positioning
     * @param {Boolean} relative
     * @override
     */
    setIgnoreAnchorPointForPosition:function (relative) {
        if(this._batchNode){
            cc.log(cc._LogInfos.Sprite.setIgnoreAnchorPointForPosition);
            return;
        }
        _ccsg.Node.prototype.setIgnoreAnchorPointForPosition.call(this, relative);
    },

    /**
     * Sets whether the sprite should be flipped horizontally or not.
     * @param {Boolean} flippedX true if the sprite should be flipped horizontally, false otherwise.
     */
    setFlippedX:function (flippedX) {
        if (this._flippedX !== flippedX) {
            this._flippedX = flippedX;
            this.setTextureRect(this._rect, this._rectRotated, this._contentSize);
            this.setNodeDirty(true);
        }
    },

    /**
     * Sets whether the sprite should be flipped vertically or not.
     * @param {Boolean} flippedY true if the sprite should be flipped vertically, false otherwise.
     */
    setFlippedY:function (flippedY) {
        if (this._flippedY !== flippedY) {
            this._flippedY = flippedY;
            this.setTextureRect(this._rect, this._rectRotated, this._contentSize);
            this.setNodeDirty(true);
        }
    },

    /**
     * <p>
     * Returns the flag which indicates whether the sprite is flipped horizontally or not.                      <br/>
     *                                                                                                              <br/>
     * It only flips the texture of the sprite, and not the texture of the sprite's children.                       <br/>
     * Also, flipping the texture doesn't alter the anchorPoint.                                                    <br/>
     * If you want to flip the anchorPoint too, and/or to flip the children too use:                                <br/>
     *      sprite.setScaleX(sprite.getScaleX() * -1);  <p/>
     * @return {Boolean} true if the sprite is flipped horizontally, false otherwise.
     */
    isFlippedX:function () {
        return this._flippedX;
    },

    /**
     * <p>
     *     Return the flag which indicates whether the sprite is flipped vertically or not.                         <br/>
     *                                                                                                              <br/>
     *      It only flips the texture of the sprite, and not the texture of the sprite's children.                  <br/>
     *      Also, flipping the texture doesn't alter the anchorPoint.                                               <br/>
     *      If you want to flip the anchorPoint too, and/or to flip the children too use:                           <br/>
     *         sprite.setScaleY(sprite.getScaleY() * -1); <p/>
     * @return {Boolean} true if the sprite is flipped vertically, false otherwise.
     */
    isFlippedY:function () {
        return this._flippedY;
    },

    //
    // RGBA protocol
    //
    /**
     * Sets whether opacity modify color or not.
     * @function
     * @param {Boolean} modify
     */
    setOpacityModifyRGB: function (modify) {
        if (this._opacityModifyRGB !== modify) {
            this._opacityModifyRGB = modify;
            this._renderCmd._setColorDirty();
        }
    },

    /**
     * Returns whether opacity modify color or not.
     * @return {Boolean}
     */
    isOpacityModifyRGB:function () {
        return this._opacityModifyRGB;
    },

    // Animation

    /**
     * Changes the display frame with animation name and index.<br/>
     * The animation name will be get from the CCAnimationCache
     * @param {String} animationName
     * @param {Number} frameIndex
     */
    setDisplayFrameWithAnimationName:function (animationName, frameIndex) {
        cc.assert(animationName, cc._LogInfos.Sprite.setDisplayFrameWithAnimationName_3);

        var cache = cc.spriteFrameAnimationCache.getAnimation(animationName);
        if(!cache){
            cc.log(cc._LogInfos.Sprite.setDisplayFrameWithAnimationName);
            return;
        }
        var animFrame = cache.getFrames()[frameIndex];
        if(!animFrame){
            cc.log(cc._LogInfos.Sprite.setDisplayFrameWithAnimationName_2);
            return;
        }
        this.setSpriteFrame(animFrame.getSpriteFrame());
    },

    /**
     * Returns the batch node object if this sprite is rendered by cc.SpriteBatchNode
     * @returns {cc.SpriteBatchNode|null} The cc.SpriteBatchNode object if this sprite is rendered by cc.SpriteBatchNode, null if the sprite isn't used batch node.
     */
    getBatchNode:function () {
        return this._batchNode;
    },

    _setReorderChildDirtyRecursively:function () {
        //only set parents flag the first time
        if (!this._reorderChildDirty) {
            this._reorderChildDirty = true;
            var pNode = this._parent;
            while (pNode && pNode !== this._batchNode) {
                pNode._setReorderChildDirtyRecursively();
                pNode = pNode.parent;
            }
        }
    },

    // CCTextureProtocol
    /**
     * Returns the texture of the sprite node
     * @returns {Texture2D}
     */
    getTexture:function () {
        return this._texture;
    },

    _softInit: function (fileName, rect, rotated) {
        if (fileName === undefined)
            _ccsg.Sprite.prototype.init.call(this);
        else if (cc.js.isString(fileName)) {
            if (fileName[0] === "#") {
                // Init with a sprite frame name
                var frameName = fileName.substr(1, fileName.length - 1);
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                if (spriteFrame)
                    this.initWithSpriteFrame(spriteFrame);
                else
                    cc.log("%s does not exist", fileName);
            } else {
                // Init  with filename and rect
                _ccsg.Sprite.prototype.init.call(this, fileName, rect);
            }
        } else if (typeof fileName === "object") {
            if (fileName instanceof cc.Texture2D) {
                // Init  with texture and rect
                this.initWithTexture(fileName, rect, rotated);
            } else if (fileName instanceof cc.SpriteFrame) {
                // Init with a sprite frame
                this.initWithSpriteFrame(fileName);
            } else if ((fileName instanceof HTMLImageElement) || (fileName instanceof HTMLCanvasElement)) {
                // Init with a canvas or image element
                var texture2d = new cc.Texture2D();
                texture2d.initWithElement(fileName);
                texture2d.handleLoadedTexture();
                this.initWithTexture(texture2d);
            }
        }
    },

    /**
     * Returns the quad (tex coords, vertex coords and color) information.
     * @return {cc.V3F_C4B_T2F_Quad|null} Returns a cc.V3F_C4B_T2F_Quad object when render mode is WebGL, returns null when render mode is Canvas.
     */
    getQuad:function () {
        return null;
    },

    /**
     * conforms to cc.TextureProtocol protocol
     * @function
     * @param {Number|cc.BlendFunc} src
     * @param {Number} dst
     */
    setBlendFunc: function (src, dst) {
        var locBlendFunc = this._blendFunc;
        if (dst === undefined) {
            locBlendFunc.src = src.src;
            locBlendFunc.dst = src.dst;
        } else {
            locBlendFunc.src = src;
            locBlendFunc.dst = dst;
        }
        this._renderCmd.updateBlendFunc(locBlendFunc);
    },

    /**
     * Initializes an empty sprite with nothing init.<br/>
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @function
     * @return {Boolean}
     */
    init: function () {
        var _t = this;
        if (arguments.length > 0)
            return _t.initWithFile(arguments[0], arguments[1]);

        _ccsg.Node.prototype.init.call(_t);
        _t.dirty = _t._recursiveDirty = false;

        _t._blendFunc.src = cc.macro.BLEND_SRC;
        _t._blendFunc.dst = cc.macro.BLEND_DST;

        _t.texture = null;
        _t._flippedX = _t._flippedY = false;

        // default transform anchor: center
        _t.anchorX = 0.5;
        _t.anchorY = 0.5;

        // zwoptex default values
        _t._offsetPosition.x = 0;
        _t._offsetPosition.y = 0;
        _t._hasChildren = false;

        // updated in "useSelfRender"
        // Atlas: TexCoords
        _t.setTextureRect(cc.rect(0, 0, 0, 0), false, cc.size(0, 0));
        return true;
    },

    /**
     * <p>
     *     Initializes a sprite with an image filename.<br/>
     *
     *     This method will find pszFilename from local file system, load its content to CCTexture2D,<br/>
     *     then use CCTexture2D to create a sprite.<br/>
     *     After initialization, the rect used will be the size of the image. The offset will be (0,0).<br/>
     *     Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * </p>
     * @param {String} filename The path to an image file in local file system
     * @param {Rect} rect The rectangle assigned the content area from texture.
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     */
    initWithFile:function (filename, rect) {
        cc.assert(filename, cc._LogInfos.Sprite.initWithFile);

        var tex = cc.textureCache.getTextureForKey(filename);
        if (!tex) {
            tex = cc.textureCache.addImage(filename);
            return this.initWithTexture(tex, rect || cc.rect(0, 0, tex._contentSize.width, tex._contentSize.height));
        } else {
            if (!rect) {
                var size = tex.getContentSize();
                rect = cc.rect(0, 0, size.width, size.height);
            }
            return this.initWithTexture(tex, rect);
        }
    },

    /**
     * Initializes a sprite with a texture and a rect in points, optionally rotated.  <br/>
     * After initialization, the rect used will be the size of the texture, and the offset will be (0,0).<br/>
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @function
     * @param {cc.Texture2D|HTMLImageElement|HTMLCanvasElement} texture A pointer to an existing CCTexture2D object. You can use a CCTexture2D object for many sprites.
     * @param {Rect} [rect] Only the contents inside rect of this texture will be applied for this sprite.
     * @param {Boolean} [rotated] Whether or not the texture rectangle is rotated.
     * @param {Boolean} [counterclockwise=true] Whether or not the texture rectangle rotation is counterclockwise (texture package is counterclockwise, spine is clockwise).
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     */
    initWithTexture: function (texture, rect, rotated, counterclockwise) {
        var _t = this;
        cc.assert(arguments.length !== 0, cc._LogInfos.SpriteBatchNode.initWithTexture);

        rotated = rotated || false;
        texture = this._renderCmd._handleTextureForRotatedTexture(texture, rect, rotated, counterclockwise);

        if (!_ccsg.Node.prototype.init.call(_t))
            return false;

        _t._batchNode = null;
        _t._recursiveDirty = false;
        _t.dirty = false;
        _t._opacityModifyRGB = true;

        _t._blendFunc.src = cc.macro.BLEND_SRC;
        _t._blendFunc.dst = cc.macro.BLEND_DST;

        _t._flippedX = _t._flippedY = false;

        // default transform anchor: center
        _t.setAnchorPoint(0.5, 0.5);

        // zwoptex default values
        _t._offsetPosition.x = 0;
        _t._offsetPosition.y = 0;
        _t._hasChildren = false;

        var locTextureLoaded = texture.isLoaded();
        _t._textureLoaded = locTextureLoaded;

        if (!locTextureLoaded) {
            _t._rectRotated = rotated;
            if (rect) {
                _t._rect.x = rect.x;
                _t._rect.y = rect.y;
                _t._rect.width = rect.width;
                _t._rect.height = rect.height;
            }
            if(_t.texture)
                _t.texture.off("load", _t._renderCmd._textureLoadedCallback, _t._renderCmd);
            texture.once("load", _t._renderCmd._textureLoadedCallback, _t._renderCmd);
            _t.setTexture(texture);
            return true;
        }

        if (!rect)
            rect = cc.rect(0, 0, texture.width, texture.height);

        this._renderCmd._checkTextureBoundary(texture, rect, rotated);

        _t.setTexture(texture);
        _t.setTextureRect(rect, rotated);

        // by default use "Self Render".
        // if the sprite is added to a batchnode, then it will automatically switch to "batchnode Render"
        _t.setBatchNode(null);
        this.emit("load");
        return true;
    },

    /**
     * Updates the texture rect of the CCSprite in points.
     * @function
     * @param {Rect} rect a rect of texture
     * @param {Boolean} [rotated] Whether or not the texture is rotated
     * @param {Size} [untrimmedSize] The original pixels size of the texture
     * @param {Boolean} [needConvert] contentScaleFactor switch
     */
    setTextureRect: function (rect, rotated, untrimmedSize, needConvert) {
        var _t = this;
        _t._rectRotated = rotated || false;
        _t.setContentSize(untrimmedSize || rect);

        _t.setVertexRect(rect);
        _t._renderCmd._setTextureCoords(rect, needConvert);

        var relativeOffsetX = _t._unflippedOffsetPositionFromCenter.x, relativeOffsetY = _t._unflippedOffsetPositionFromCenter.y;
        if (_t._flippedX)
            relativeOffsetX = -relativeOffsetX;
        if (_t._flippedY)
            relativeOffsetY = -relativeOffsetY;
        var locRect = _t._rect;
        _t._offsetPosition.x = relativeOffsetX + (_t._contentSize.width - locRect.width) / 2;
        _t._offsetPosition.y = relativeOffsetY + (_t._contentSize.height - locRect.height) / 2;
    },

    // BatchNode methods

    /**
     * Add child to sprite (override ccsg.Node)
     * @function
     * @param {_ccsg.Sprite} child
     * @param {Number} localZOrder  child's zOrder
     * @param {String} [tag] child's tag
     * @override
     */
    addChild: function (child, localZOrder, tag) {
        cc.assert(child, cc._LogInfos.SpriteBatchNode.addChild_2);

        if (localZOrder == null)
            localZOrder = child._localZOrder;
        if (tag == null)
            tag = child.tag;

        if(this._renderCmd._setBatchNodeForAddChild(child)){
            //_ccsg.Node already sets isReorderChildDirty_ so this needs to be after batchNode check
            _ccsg.Node.prototype.addChild.call(this, child, localZOrder, tag);
            this._hasChildren = true;
        }
    },

    // Frames
    /**
     * Sets a new sprite frame to the sprite.
     * @function
     * @param {cc.SpriteFrame|String} newFrame
     */
    setSpriteFrame: function (newFrame) {
        var _t = this;
        if(cc.js.isString(newFrame)){
            newFrame = cc.spriteFrameCache.getSpriteFrame(newFrame);
            cc.assert(newFrame, cc._LogInfos.Sprite.setSpriteFrame)
        }

        this.setNodeDirty(true);

        var frameOffset = newFrame.getOffset();
        _t._unflippedOffsetPositionFromCenter.x = frameOffset.x;
        _t._unflippedOffsetPositionFromCenter.y = frameOffset.y;

        // update rect
        var pNewTexture = newFrame.getTexture();
        var locTextureLoaded = newFrame.textureLoaded();
        if (!locTextureLoaded) {
            _t._textureLoaded = false;
            newFrame.once("load", function (event) {
                var sender = event.currentTarget;
                _t._textureLoaded = true;
                var locNewTexture = sender.getTexture();
                if (locNewTexture !== _t._texture)
                    _t._setTexture(locNewTexture);
                _t.setTextureRect(sender.getRect(), sender.isRotated(), sender.getOriginalSize());
                _t.emit("load");
                _t.setColor(_t._realColor);
            }, _t);
        } else {
            _t._textureLoaded = true;
            // update texture before updating texture rect
            if (pNewTexture !== _t._texture) {
                _t._setTexture(pNewTexture);
                _t.setColor(_t._realColor);
            }
            _t.setTextureRect(newFrame.getRect(), newFrame.isRotated(), newFrame.getOriginalSize());
        }
        this._renderCmd._updateForSetSpriteFrame(pNewTexture);
    },

    /**
     * Sets a new display frame to the sprite.
     * @param {cc.SpriteFrame|String} newFrame
     * @deprecated
     */
    setDisplayFrame: function(newFrame){
        cc.log(cc._LogInfos.Sprite.setDisplayFrame);
        this.setSpriteFrame(newFrame);
    },

    /**
     * Returns whether or not a cc.SpriteFrame is being displayed
     * @function
     * @param {cc.SpriteFrame} frame
     * @return {Boolean}
     */
    isFrameDisplayed: function(frame){
        return this._renderCmd.isFrameDisplayed(frame);
    },

    /**
     * Returns the current displayed frame.
     * @deprecated since 3.4, please use getSpriteFrame instead
     * @return {cc.SpriteFrame}
     */
    displayFrame: function () {
        return this.getSpriteFrame();
    },

    /**
     * Returns the current displayed frame.
     * @return {cc.SpriteFrame}
     */
    getSpriteFrame: function () {
        return new cc.SpriteFrame(this._texture,
            this._rect,
            this._rectRotated,
            this._unflippedOffsetPositionFromCenter,
            this._contentSize);
    },

    /**
     * Sets the batch node to sprite
     * @function
     * @param {cc.SpriteBatchNode|null} spriteBatchNode
     * @example
     *  var batch = new cc.SpriteBatchNode("Images/grossini_dance_atlas.png", 15);
     *  var sprite = new _ccsg.Sprite(batch.texture, cc.rect(0, 0, 57, 57));
     *  batch.addChild(sprite);
     *  layer.addChild(batch);
     */
    setBatchNode:function (spriteBatchNode) {
        var _t = this;
        _t._batchNode = spriteBatchNode; // weak reference

        // self render
        if (!_t._batchNode) {
            _t.atlasIndex = _ccsg.Sprite.INDEX_NOT_INITIALIZED;
            _t.textureAtlas = null;
            _t._recursiveDirty = false;
            _t.dirty = false;
        } else {
            // using batch
            _t._transformToBatch = cc.affineTransformIdentity();
            _t.textureAtlas = _t._batchNode.getTextureAtlas(); // weak ref
        }
    },

    // CCTextureProtocol
    /**
     * Sets the texture of sprite
     * @function
     * @param {cc.Texture2D|String} texture
     */
    setTexture: function (texture) {
        if(!texture)
            return this._renderCmd._setTexture(null);

        //CCSprite.cpp 327 and 338
        var isFileName = cc.js.isString(texture);

        if(isFileName)
            texture = cc.textureCache.addImage(texture);

        if(texture._textureLoaded){
            this._setTexture(texture, isFileName);
            this.setColor(this._realColor);
            this._textureLoaded = true;
            this.emit("load");
        }else{
            this._renderCmd._setTexture(texture);
            texture.once("load", function (event) {
                this._setTexture(texture, isFileName);
                this.setColor(this._realColor);
                this._textureLoaded = true;
                this.emit("load");
            }, this);
        }
    },

    _setTexture: function(texture, change){
        this._renderCmd._setTexture(texture);
        if(change)
            this._changeRectWithTexture(texture);
    },

    _changeRectWithTexture: function(texture){
        var contentSize = texture._contentSize;
        var rect = cc.rect(
                0, 0,
                contentSize.width, contentSize.height
            );
        this.setTextureRect(rect);
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new _ccsg.Sprite.CanvasRenderCmd(this);
        else
            return new _ccsg.Sprite.WebGLRenderCmd(this);
    }
});

/**
 * _ccsg.Sprite invalid index on the cc.SpriteBatchNode
 * @constant
 * @type {Number}
 */
_ccsg.Sprite.INDEX_NOT_INITIALIZED = -1;

cc.js.addon(_ccsg.Sprite.prototype, EventTarget.prototype);


cc.assert(typeof cc._tmp.PrototypeSprite === 'function', cc._LogInfos.MissingFile, "SpritesPropertyDefine.js");
cc._tmp.PrototypeSprite();
delete cc._tmp.PrototypeSprite;

// fireball#2856

var spritePro = _ccsg.Sprite.prototype;
Object.defineProperty(spritePro, 'visible', {
    get: _ccsg.Node.prototype.isVisible,
    set: spritePro.setVisible
});

Object.defineProperty(spritePro, 'ignoreAnchor', {
    get: _ccsg.Node.prototype.isIgnoreAnchorPointForPosition,
    set: spritePro.setIgnoreAnchorPointForPosition
});

Object.defineProperty(spritePro, 'opacityModifyRGB', {
    get: spritePro.isOpacityModifyRGB
});

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

_ccsg.Sprite.CanvasRenderCmd = function (renderable) {
    _ccsg.Node.CanvasRenderCmd.call(this, renderable);
    this._needDraw = true;
    this._textureCoord = {
        renderX: 0,                             //the x of texture coordinate for render, when texture tinted, its value doesn't equal x.
        renderY: 0,                             //the y of texture coordinate for render, when texture tinted, its value doesn't equal y.
        x: 0,                                   //the x of texture coordinate for node.
        y: 0,                                   //the y of texture coordinate for node.
        width: 0,
        height: 0,
        validRect: false
    };
    this._blendFuncStr = "source-over";
    this._colorized = false;

    this._textureToRender = null;
};

var proto = _ccsg.Sprite.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = _ccsg.Sprite.CanvasRenderCmd;

proto.setDirtyRecursively = function (value) {};

proto._setTexture = function (texture) {
    var node = this._node;
    if (node._texture !== texture) {
        if (texture) {
            node._textureLoaded = texture._textureLoaded;
        }else{
            node._textureLoaded = false;
        }
        node._texture = texture;
        this._updateColor();
    }
};

proto._setColorDirty = function () {
    this.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty | _ccsg.Node._dirtyFlags.opacityDirty);
};

proto.isFrameDisplayed = function (frame) {      //TODO there maybe has a bug
    var node = this._node;
    if (frame.getTexture() !== node._texture)
        return false;
    return cc.rectEqualToRect(frame.getRect(), node._rect);
};

proto.updateBlendFunc = function (blendFunc) {
    this._blendFuncStr = _ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(blendFunc);
};

proto._setBatchNodeForAddChild = function (child) {
    return true;
};

proto._handleTextureForRotatedTexture = function (texture, rect, rotated, counterclockwise) {
    if (rotated && texture.isLoaded()) {
        var tempElement = texture.getHtmlElementObj();
        tempElement = _ccsg.Sprite.CanvasRenderCmd._cutRotateImageToCanvas(tempElement, rect, counterclockwise);
        var tempTexture = new cc.Texture2D();
        tempTexture.initWithElement(tempElement);
        tempTexture.handleLoadedTexture();
        texture = tempTexture;
        rect.x = rect.y = 0;
        this._node._rect = cc.rect(0, 0, rect.width, rect.height);
    }
    return texture;
};

proto._checkTextureBoundary = function (texture, rect, rotated) {
    if (texture && texture.url) {
        var _x = rect.x + rect.width, _y = rect.y + rect.height;
        if (_x > texture.width)
            cc.error(cc._LogInfos.RectWidth, texture.url);
        if (_y > texture.height)
            cc.error(cc._LogInfos.RectHeight, texture.url);
    }
};

proto.rendering = function (ctx, scaleX, scaleY) {
    var node = this._node;
    var locTextureCoord = this._textureCoord, alpha = (this._displayedOpacity / 255);

    var texture = this._textureToRender || node._texture;

    if ((texture && (locTextureCoord.width === 0 || locTextureCoord.height === 0|| !texture._textureLoaded)) || alpha === 0)
        return;

    var wrapper = ctx || cc._renderContext, context = wrapper.getContext();
    var locX = node._offsetPosition.x, locHeight = node._rect.height, locWidth = node._rect.width,
        locY = -node._offsetPosition.y - locHeight, image;

    wrapper.setTransform(this._worldTransform, scaleX, scaleY);
    wrapper.setCompositeOperation(this._blendFuncStr);
    wrapper.setGlobalAlpha(alpha);

    if(node._flippedX || node._flippedY)
        wrapper.save();
    if (node._flippedX) {
        locX = -locX - locWidth;
        context.scale(-1, 1);
    }
    if (node._flippedY) {
        locY = node._offsetPosition.y;
        context.scale(1, -1);
    }

    var sx, sy, sw, sh, x, y, w, h;
    if (this._colorized) {
        sx = 0;
        sy = 0;
    }else{
        sx = locTextureCoord.renderX;
        sy = locTextureCoord.renderY;
    }
    sw = locTextureCoord.width;
    sh = locTextureCoord.height;

    x = locX;
    y = locY;
    w = locWidth;
    h = locHeight;

    if (texture&& texture._htmlElementObj) {
        image = texture._htmlElementObj;
        if (texture._pattern !== "") {
            wrapper.setFillStyle(context.createPattern(image, texture._pattern));
            context.fillRect(x, y, w, h);
        } else {
            context.drawImage(image,
                sx, sy, sw, sh,
                x, y, w, h);
        }
    } else {
        var contentSize = node._contentSize;
        if (locTextureCoord.validRect) {
            var curColor = this._displayedColor;
            wrapper.setFillStyle("rgba(" + curColor.r + "," + curColor.g + "," + curColor.b + ",1)");
            context.fillRect(x, y, contentSize.width, contentSize.height);
        }
    }
    if(node._flippedX || node._flippedY)
        wrapper.restore();
    cc.g_NumberOfDraws++;
};

proto._updateColor = function(){
    var node = this._node;

    var texture = node._texture, rect = this._textureCoord;
    var dColor = this._displayedColor;

    if(texture){
        if(dColor.r !== 255 || dColor.g !== 255 || dColor.b !== 255){
            this._textureToRender = texture._generateColorTexture(dColor.r, dColor.g, dColor.b, rect);
            this._colorized = true;
        }else if(texture){
            this._textureToRender = texture;
            this._colorized = false;
        }
    }
};

proto._updateForSetSpriteFrame = function (pNewTexture, textureLoaded){
    this._colorized = false;
    this._textureCoord.renderX = this._textureCoord.x;
    this._textureCoord.renderY = this._textureCoord.y;
    textureLoaded = textureLoaded || pNewTexture._textureLoaded;
    if (textureLoaded) {
        var curColor = this._node.getColor();
        if (curColor.r !== 255 || curColor.g !== 255 || curColor.b !== 255)
            this._updateColor();
    }
};

proto._spriteFrameLoadedCallback = function (event) {
    var node = this._node, spriteFrame = event.currentTarget;
    node.setTextureRect(spriteFrame.getRect(), spriteFrame.isRotated(), spriteFrame.getOriginalSize());

    this._updateColor();
    node.emit("load");
};

proto._textureLoadedCallback = function (event) {
    var node = this._node, sender = event.currentTarget;
    if (node._textureLoaded)
        return;

    node._textureLoaded = true;
    var texture = node._texture,
        locRect = node._rect;
    if (!locRect) {
        locRect = cc.rect(0, 0, sender.width, sender.height);
    } else if (cc._rectEqualToZero(locRect)) {
        locRect.width = sender.width;
        locRect.height = sender.height;
    }

    node.texture = sender;
    node.setTextureRect(locRect, node._rectRotated);

    //set the texture's color after the it loaded
    var locColor = this._displayedColor;
    if (locColor.r !== 255 || locColor.g !== 255 || locColor.b !== 255)
        this._updateColor();

    // by default use "Self Render".
    // if the sprite is added to a batchnode, then it will automatically switch to "batchnode Render"
    node.setBatchNode(node._batchNode);
    node.emit("load");
};

proto._setTextureCoords = function (rect) {
    var locTextureRect = this._textureCoord;
    locTextureRect.renderX = locTextureRect.x = 0 | rect.x;
    locTextureRect.renderY = locTextureRect.y = 0 | rect.y;
    locTextureRect.width = 0 | rect.width;
    locTextureRect.height = 0 | rect.height;
    locTextureRect.validRect = !(locTextureRect.width === 0 || locTextureRect.height === 0 || locTextureRect.x < 0 || locTextureRect.y < 0);
};

_ccsg.Sprite.CanvasRenderCmd._cutRotateImageToCanvas = function (texture, rect, counterclockwise) {
    if (!texture)
        return null;

    if (!rect)
        return texture;

    counterclockwise = counterclockwise == null? true: counterclockwise;   // texture package is counterclockwise, spine is clockwise

    var nCanvas = document.createElement("canvas");
    nCanvas.width = rect.width;
    nCanvas.height = rect.height;
    var ctx = nCanvas.getContext("2d");
    ctx.translate(nCanvas.width / 2, nCanvas.height / 2);
    if(counterclockwise)
        ctx.rotate(-1.5707963267948966);
    else
        ctx.rotate(1.5707963267948966);
    ctx.drawImage(texture, rect.x, rect.y, rect.height, rect.width, -rect.height / 2, -rect.width / 2, rect.height, rect.width);
    return nCanvas;
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var macro = cc.macro;

//Sprite's WebGL render command
_ccsg.Sprite.WebGLRenderCmd = function (renderable) {
    _ccsg.Node.WebGLRenderCmd.call(this, renderable);
    this._needDraw = true;

    this._vertices = [
        {x: 0, y: 0, u: 0, v: 0}, // tl
        {x: 0, y: 0, u: 0, v: 0}, // bl
        {x: 0, y: 0, u: 0, v: 0}, // tr
        {x: 0, y: 0, u: 0, v: 0}  // br
    ];
    this._color = new Uint32Array(1);
    this._dirty = false;
    this._recursiveDirty = false;

    this._shaderProgram = cc.shaderCache.programForKey(macro.SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST);
};

var proto = _ccsg.Sprite.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = _ccsg.Sprite.WebGLRenderCmd;

proto.updateBlendFunc = function (blendFunc) {};

proto.setDirtyFlag = function(dirtyFlag){
    _ccsg.Node.WebGLRenderCmd.prototype.setDirtyFlag.call(this, dirtyFlag);
    this._dirty = true;
};

proto.setDirtyRecursively = function (value) {
    this._recursiveDirty = value;
    this._dirty = value;
    // recursively set dirty
    var locChildren = this._node._children, child, l = locChildren ? locChildren.length : 0;
    for (var i = 0; i < l; i++) {
        child = locChildren[i];
        (child instanceof _ccsg.Sprite) && child._renderCmd.setDirtyRecursively(value);
    }
};

proto._setBatchNodeForAddChild = function (child) {
    var node = this._node;
    if (node._batchNode) {
        if (!(child instanceof _ccsg.Sprite)) {
            cc.log(cc._LogInfos.Sprite.addChild);
            return false;
        }
        if (child.texture._webTextureObj !== node.textureAtlas.texture._webTextureObj)
            cc.log(cc._LogInfos.Sprite_addChild_2);

        //put it in descendants array of batch node
        node._batchNode.appendChild(child);
        if (!node._reorderChildDirty)
            node._setReorderChildDirtyRecursively();
    }
    return true;
};

proto._handleTextureForRotatedTexture = function (texture) {
    return texture;
};

proto.isFrameDisplayed = function (frame) {
    var node = this._node;
    return (cc.rectEqualToRect(frame.getRect(), node._rect) && frame.getTexture().getName() === node._texture.getName()
        && cc.pointEqualToPoint(frame.getOffset(), node._unflippedOffsetPositionFromCenter));
};

proto._updateForSetSpriteFrame = function () {};

proto._spriteFrameLoadedCallback = function (event) {
    var spriteFrame = event.currentTarget;
    this._node.setTextureRect(spriteFrame.getRect(), spriteFrame.isRotated(), spriteFrame.getOriginalSize());
    this._node.emit("load");
};

proto._textureLoadedCallback = function (event) {
    var node = this._node, sender = event.currentTarget;
    if (node._textureLoaded)
        return;

    node._textureLoaded = true;
    var locRect = node._rect;
    if (!locRect) {
        locRect = cc.rect(0, 0, sender.width, sender.height);
    } else if (cc._rectEqualToZero(locRect)) {
        locRect.width = sender.width;
        locRect.height = sender.height;
    }

    node.texture = sender;
    node.setTextureRect(locRect, node._rectRotated);

    // by default use "Self Render".
    // if the sprite is added to a batchnode, then it will automatically switch to "batchnode Render"
    node.setBatchNode(node._batchNode);
    node.emit("load");

    // Force refresh the render command list
    cc.renderer.childrenOrderDirty = true;
};

proto._setTextureCoords = function (rect) {
    var node = this._node;

    var tex = node._batchNode ? node.textureAtlas.texture : node._texture;
    var uvs = this._vertices;
    if (!tex)
        return;

    var atlasWidth = tex.pixelWidth;
    var atlasHeight = tex.pixelHeight;

    var left, right, top, bottom, tempSwap;
    if (node._rectRotated) {
        if (macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
            left = (2 * rect.x + 1) / (2 * atlasWidth);
            right = left + (rect.height * 2 - 2) / (2 * atlasWidth);
            top = (2 * rect.y + 1) / (2 * atlasHeight);
            bottom = top + (rect.width * 2 - 2) / (2 * atlasHeight);
        } else {
            left = rect.x / atlasWidth;
            right = (rect.x + rect.height) / atlasWidth;
            top = rect.y / atlasHeight;
            bottom = (rect.y + rect.width) / atlasHeight;
        }

        if (node._flippedX) {
            tempSwap = top;
            top = bottom;
            bottom = tempSwap;
        }

        if (node._flippedY) {
            tempSwap = left;
            left = right;
            right = tempSwap;
        }

        uvs[0].u = right;  // tl
        uvs[0].v = top;    // tl
        uvs[1].u = left;   // bl
        uvs[1].v = top;    // bl
        uvs[2].u = right;  // tr
        uvs[2].v = bottom; // tr
        uvs[3].u = left;   // br
        uvs[3].v = bottom; // br
    } else {
        if (macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
            left = (2 * rect.x + 1) / (2 * atlasWidth);
            right = left + (rect.width * 2 - 2) / (2 * atlasWidth);
            top = (2 * rect.y + 1) / (2 * atlasHeight);
            bottom = top + (rect.height * 2 - 2) / (2 * atlasHeight);
        } else {
            left = rect.x / atlasWidth;
            right = (rect.x + rect.width) / atlasWidth;
            top = rect.y / atlasHeight;
            bottom = (rect.y + rect.height) / atlasHeight;
        }

        if (node._flippedX) {
            tempSwap = left;
            left = right;
            right = tempSwap;
        }

        if (node._flippedY) {
            tempSwap = top;
            top = bottom;
            bottom = tempSwap;
        }

        uvs[0].u = left;   // tl
        uvs[0].v = top;    // tl
        uvs[1].u = left;   // bl
        uvs[1].v = bottom; // bl
        uvs[2].u = right;  // tr
        uvs[2].v = top;    // tr
        uvs[3].u = right;  // br
        uvs[3].v = bottom; // br
    }
};

proto._setColorDirty = function () {};

proto._updateBlendFunc = function () {
    if (this._batchNode) {
        cc.log(cc._LogInfos.Sprite__updateBlendFunc);
        return;
    }

    // it's possible to have an untextured sprite
    var node = this._node;
    if (!node._texture || !node._texture.hasPremultipliedAlpha()) {
        node._blendFunc.src = macro.SRC_ALPHA;
        node._blendFunc.dst = macro.ONE_MINUS_SRC_ALPHA;
        node.opacityModifyRGB = false;
    } else {
        node._blendFunc.src = macro.BLEND_SRC;
        node._blendFunc.dst = macro.BLEND_DST;
        node.opacityModifyRGB = true;
    }
};

proto._setTexture = function (texture) {
    var node = this._node;
    // If batchnode, then texture id should be the same
    if (node._batchNode) {
        if(node._batchNode.texture !== texture){
            cc.log(cc._LogInfos.Sprite_setTexture);
            return;
        }
    }else{
        if(node._texture !== texture){
            node._textureLoaded = texture ? texture._textureLoaded : false;
            node._texture = texture;
            this._updateBlendFunc();

            if (node._textureLoaded) {
                // Force refresh the render command list
                cc.renderer.childrenOrderDirty = true;
            }
        }
    }

};

proto._checkTextureBoundary = function (texture, rect, rotated) {
    if (texture && texture.url) {
        var _x, _y;
        if (rotated) {
            _x = rect.x + rect.height;
            _y = rect.y + rect.width;
        } else {
            _x = rect.x + rect.width;
            _y = rect.y + rect.height;
        }
        if (_x > texture.width) {
            cc.error(cc._LogInfos.RectWidth, texture.url);
        }
        if (_y > texture.height) {
            cc.error(cc._LogInfos.RectHeight, texture.url);
        }
    }
};

proto.transform = function (parentCmd, recursive) {
    this.originTransform(parentCmd, recursive);

    var node = this._node,
        lx = node._offsetPosition.x, rx = lx + node._rect.width,
        by = node._offsetPosition.y, ty = by + node._rect.height,
        wt = this._worldTransform;

    var vertices = this._vertices;
    vertices[0].x = lx * wt.a + ty * wt.c + wt.tx; // tl
    vertices[0].y = lx * wt.b + ty * wt.d + wt.ty;
    vertices[1].x = lx * wt.a + by * wt.c + wt.tx; // bl
    vertices[1].y = lx * wt.b + by * wt.d + wt.ty;
    vertices[2].x = rx * wt.a + ty * wt.c + wt.tx; // tr
    vertices[2].y = rx * wt.b + ty * wt.d + wt.ty;
    vertices[3].x = rx * wt.a + by * wt.c + wt.tx; // br
    vertices[3].y = rx * wt.b + by * wt.d + wt.ty;
};

proto.needDraw = function () {
    var node = this._node, locTexture = node._texture;
    return (this._needDraw && locTexture);
};

proto.uploadData = function (f32buffer, ui32buffer, vertexDataOffset) {
    var node = this._node, locTexture = node._texture;
    if (!(locTexture && locTexture._textureLoaded && node._rect.width && node._rect.height) || !this._displayedOpacity)
        return 0;

    // Fill in vertex data with quad information (4 vertices for sprite)
    var opacity = this._displayedOpacity;
    var r = this._displayedColor.r,
        g = this._displayedColor.g,
        b = this._displayedColor.b;
    if (node._opacityModifyRGB) {
        var a = opacity / 255;
        r *= a;
        g *= a;
        b *= a;
    }
    this._color[0] = ((opacity<<24) | (b<<16) | (g<<8) | r);
    var z = node._vertexZ;

    var vertices = this._vertices;
    var i, len = vertices.length, vertex, offset = vertexDataOffset;
    for (i = 0; i < len; ++i) {
        vertex = vertices[i];
        f32buffer[offset] = vertex.x;
        f32buffer[offset + 1] = vertex.y;
        f32buffer[offset + 2] = z;
        ui32buffer[offset + 3] = this._color[0];
        f32buffer[offset + 4] = vertex.u;
        f32buffer[offset + 5] = vertex.v;
        offset += 6;
    }

    return len;
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of _t software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * cc.BakeSprite is a type of sprite that will be cached.
 * @class
 * @extends _ccsg.Sprite
 */
cc.BakeSprite = _ccsg.Sprite.extend(/** @lends cc.BakeSprite# */{
    _cacheCanvas: null,
    _cacheContext: null,

    ctor: function(){
        _ccsg.Sprite.prototype.ctor.call(this);
        var canvasElement = document.createElement("canvas");
        canvasElement.width = canvasElement.height = 10;
        this._cacheCanvas = canvasElement;
        this._cacheContext = new cc.CanvasContextWrapper(canvasElement.getContext("2d"));

        var texture = new cc.Texture2D();
        texture.initWithElement(canvasElement);
        texture.handleLoadedTexture();
        this.setTexture(texture);
    },

    getCacheContext: function(){
        return this._cacheContext;
    },

    getCacheCanvas: function(){
        return this._cacheCanvas;
    },

    /**
     * reset the cache canvas size
     * @param {cc.Size|Number} sizeOrWidth  size or width
     * @param {Number} [height]
     */
    resetCanvasSize: function(sizeOrWidth, height){
        var locCanvas = this._cacheCanvas,
            locContext = this._cacheContext,
            strokeStyle = locContext._context.strokeStyle,
            fillStyle = locContext._context.fillStyle;
        if(height === undefined){
            height = sizeOrWidth.height;
            sizeOrWidth = sizeOrWidth.width;
        }
        locCanvas.width = sizeOrWidth;
        locCanvas.height = height;   //TODO note baidu browser      reset the context after set width or height
        if(strokeStyle !== locContext._context.strokeStyle)
            locContext._context.strokeStyle = strokeStyle;
        if(fillStyle !== locContext._context.fillStyle)
            locContext._context.fillStyle = fillStyle;
        this.getTexture().handleLoadedTexture();
        this.setTextureRect(cc.rect(0,0, sizeOrWidth, height), false, null, false);
    }
});


/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


/**
 * <p>
 *     A cc.SpriteBatchNode can reference one and only one texture (one image file, one texture atlas).<br/>
 *     Only the cc.Sprites that are contained in that texture can be added to the cc.SpriteBatchNode.<br/>
 *     All cc.Sprites added to a cc.SpriteBatchNode are drawn in one WebGL draw call. <br/>
 *     If the cc.Sprites are not added to a cc.SpriteBatchNode then an WebGL draw call will be needed for each one, which is less efficient. <br/>
 *     <br/>
 *     Limitations:<br/>
 *       - The only object that is accepted as child (or grandchild, grand-grandchild, etc...) is _ccsg.Sprite or any subclass of _ccsg.Sprite. <br/>
 *          eg: particles, labels and layer can't be added to a cc.SpriteBatchNode. <br/>
 *       - Either all its children are Aliased or Antialiased. It can't be a mix. <br/>
 *          This is because "alias" is a property of the texture, and all the sprites share the same texture. </br>
 * </p>
 * @class
 * @extends _ccsg.Node
 *
 * @param {String|cc.Texture2D} fileImage
 * @param {Number} capacity
 * @example
 *
 * // 1. create a SpriteBatchNode with image path
 * var spriteBatchNode = new cc.SpriteBatchNode("res/animations/grossini.png", 50);
 *
 * // 2. create a SpriteBatchNode with texture
 * var texture = cc.textureCache.addImage("res/animations/grossini.png");
 * var spriteBatchNode = new cc.SpriteBatchNode(texture,50);
 *
 * @property {cc.TextureAtlas}  textureAtlas    - The texture atlas
 * @property {Array}            descendants     - <@readonly> Descendants of sprite batch node
 */
cc.SpriteBatchNode = _ccsg.Node.extend(/** @lends cc.SpriteBatchNode# */{
    _blendFunc: null,
    // all descendants: chlidren, gran children, etc...
    _texture: null,
    _className: "SpriteBatchNode",

    ctor: function (fileImage) {
        _ccsg.Node.prototype.ctor.call(this);
        this._blendFunc = new cc.BlendFunc(cc.macro.BLEND_SRC, cc.macro.BLEND_DST);

        var texture2D;
        if (cc.js.isString(fileImage)) {
            texture2D = cc.textureCache.getTextureForKey(fileImage);
            if (!texture2D)
                texture2D = cc.textureCache.addImage(fileImage);
        }else if (fileImage instanceof cc.Texture2D)
            texture2D = fileImage;

        texture2D && this.initWithTexture(texture2D);
    },

    /**
     * <p>
     *    Same as addChild
     * </p>
     * @param {_ccsg.Sprite} child
     * @param {Number} z zOrder
     * @param {Number} aTag
     * @return {cc.SpriteBatchNode}
     * @deprecated since v1.2
     */
    addSpriteWithoutQuad: function (child, z, aTag) {
        this.addChild(child, z, aTag);
        return this;
    },

    // property
    /**
     * Return null, no texture atlas is used any more
     * @return {cc.TextureAtlas}
     * @deprecated since v1.2
     */
    getTextureAtlas: function () {
        return null;
    },

    /**
     * TextureAtlas of cc.SpriteBatchNode setter
     * @param {cc.TextureAtlas} textureAtlas
     * @deprecated since v1.2
     */
    setTextureAtlas: function (textureAtlas) {},

    /**
     * Return Descendants of cc.SpriteBatchNode
     * @return {Array}
     * @deprecated since v1.2
     */
    getDescendants: function () {
        return this._children;
    },

    /**
     * <p>
     *    Initializes a cc.SpriteBatchNode with a file image (.png, .jpeg, .pvr, etc) and a capacity of children.<br/>
     *    The capacity will be increased in 33% in runtime if it run out of space.<br/>
     *    The file will be loaded using the TextureMgr.<br/>
     *    Please pass parameters to constructor to initialize the sprite batch node, do not call this function yourself.
     * </p>
     * @param {String} fileImage
     * @param {Number} capacity
     * @return {Boolean}
     */
    initWithFile: function (fileImage, capacity) {
        var texture2D = cc.textureCache.getTextureForKey(fileImage);
        if (!texture2D)
            texture2D = cc.textureCache.addImage(fileImage);
        return this.initWithTexture(texture2D, capacity);
    },

    /**
     * <p>
     *    initializes a cc.SpriteBatchNode with a file image (.png, .jpeg, .pvr, etc) and a capacity of children.<br/>
     *    The capacity will be increased in 33% in runtime if it run out of space.<br/>
     *    The file will be loaded using the TextureMgr.<br/>
     *    Please pass parameters to constructor to initialize the sprite batch node, do not call this function yourself.
     * </p>
     * @param {String} fileImage
     * @param {Number} capacity
     * @return {Boolean}
     */
    init: function (fileImage, capacity) {
        var texture2D = cc.textureCache.getTextureForKey(fileImage);
        if (!texture2D)
            texture2D = cc.textureCache.addImage(fileImage);
        return this.initWithTexture(texture2D, capacity);
    },

    /**
     * Do nothing
     * @deprecated since v1.2
     */
    increaseAtlasCapacity: function () {},

    /**
     * Removes a child given a certain index. It will also cleanup the running actions depending on the cleanup parameter.
     * @warning Removing a child from a cc.SpriteBatchNode is very slow
     * @param {Number} index
     * @param {Boolean} doCleanup
     */
    removeChildAtIndex: function (index, doCleanup) {
        this.removeChild(this._children[index], doCleanup);
    },

    /**
     * Do nothing
     * @param {_ccsg.Sprite} pobParent
     * @param {Number} index
     * @return {Number}
     * @deprecated since v1.2
     */
    rebuildIndexInOrder: function (pobParent, index) {
        return index;
    },

    /**
     * Returns highest atlas index in child
     * @param {_ccsg.Sprite} sprite
     * @return {Number}
     * @deprecated since v1.2
     */
    highestAtlasIndexInChild: function (sprite) {
        var children = sprite.children;
        if (!children || children.length === 0)
            return sprite.zIndex;
        else
            return this.highestAtlasIndexInChild(children[children.length - 1]);
    },

    /**
     * Returns lowest atlas index in child
     * @param {_ccsg.Sprite} sprite
     * @return {Number}
     * @deprecated since v1.2
     */
    lowestAtlasIndexInChild: function (sprite) {
        var children = sprite.children;
        if (!children || children.length === 0)
            return sprite.zIndex;
        else
            return this.lowestAtlasIndexInChild(children[children.length - 1]);
    },

    /**
     * Returns index for child
     * @param {_ccsg.Sprite} sprite
     * @return {Number}
     * @deprecated since v1.2
     */
    atlasIndexForChild: function (sprite) {
        return sprite.zIndex;
    },

    /**
     * Sprites use this to start sortChildren, don't call this manually
     * @param {Boolean} reorder
     * @deprecated since v1.2
     */
    reorderBatch: function (reorder) {
        this._reorderChildDirty = reorder;
    },

    /**
     * Sets the source and destination blending function for the texture
     * @param {Number | cc.BlendFunc} src
     * @param {Number} dst
     */
    setBlendFunc: function (src, dst) {
        if (dst === undefined)
            this._blendFunc = src;
        else
            this._blendFunc = {src: src, dst: dst};
    },

    /**
     * Returns the blending function used for the texture
     * @return {cc.BlendFunc}
     */
    getBlendFunc: function () {
        return new cc.BlendFunc(this._blendFunc.src,this._blendFunc.dst);
    },

    /**
     * <p>
     *   Updates a quad at a certain index into the texture atlas. The CCSprite won't be added into the children array.                 <br/>
     *   This method should be called only when you are dealing with very big AtlasSrite and when most of the _ccsg.Sprite won't be updated.<br/>
     *   For example: a tile map (cc.TMXMap) or a label with lots of characters (BitmapFontAtlas)<br/>
     * </p>
     * @function
     * @param {_ccsg.Sprite} sprite
     * @param {Number} index
     */
    updateQuadFromSprite: function (sprite, index) {
        cc.assert(sprite, cc._LogInfos.SpriteBatchNode.updateQuadFromSprite_2);
        if (!(sprite instanceof _ccsg.Sprite)) {
            cc.log(cc._LogInfos.SpriteBatchNode.updateQuadFromSprite);
            return;
        }

        //
        // update the quad directly. Don't add the sprite to the scene graph
        //
        sprite.dirty = true;
        // UpdateTransform updates the textureAtlas quad
        sprite._renderCmd.transform(this._renderCmd, true);
    },

    /**
     * <p>
     *    Same as addChild(sprite, index)
     * </p>
     * @function
     * @param {_ccsg.Sprite} sprite
     * @param {Number} index
     * @deprecated since v1.2
     */
    insertQuadFromSprite: function (sprite, index) {
        this.addChild(sprite, index);
    },

    /**
     * Same as addChild(sprite, index)
     * @param {_ccsg.Sprite} sprite The child sprite
     * @param {Number} index The insert index
     * @deprecated since v1.2
     */
    insertChild: function (sprite, index) {
        this.addChild(sprite, index);
    },

    /**
     * Add child at the end
     * @function
     * @param {_ccsg.Sprite} sprite
     */
    appendChild: function (sprite) {
        this.sortAllChildren();
        var lastLocalZOrder = this._children[this._children.length-1]._localZOrder;
        this.addChild(sprite. lastLocalZOrder + 1);
    },

    /**
     * Same as removeChild
     * @function
     * @param {_ccsg.Sprite} sprite
     * @param {Boolean} [cleanup=true]  true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     * @deprecated since v1.2
     */
    removeSpriteFromAtlas: function (sprite, cleanup) {
        this.removeChild(sprite, cleanup);
    },

    /**
     * Set the texture property
     * @function
     * @param {Texture2D} tex
     * @return {Boolean}
     */
    initWithTexture: function (tex) {
        this.setTexture(tex);
        return true;
    },

    // CCTextureProtocol
    /**
     * Returns texture of the sprite batch node
     * @function
     * @return {Texture2D}
     */
    getTexture: function () {
        return this._texture;
    },

    /**
     * Sets the texture of the sprite batch node.
     * @function
     * @param {Texture2D} texture
     */
    setTexture: function(texture){
        this._texture = texture;

        if (texture._textureLoaded) {
            var children = this._children, i, len = children.length;
            for (i = 0; i < len; ++i) {
                children[i].setTexture(texture);
            }
        }
        else {
            texture.addEventListener("load", function(){
                var children = this._children, i, len = children.length;
                for (i = 0; i < len; ++i) {
                    children[i].setTexture(texture);
                }
            }, this);
        }
    },

    setShaderProgram: function (newShaderProgram) {
        this._renderCmd.setShaderProgram(newShaderProgram);
        var children = this._children, i, len = children.length;
        for (i = 0; i < len; ++i) {
            children[i].setShaderProgram(newShaderProgram);
        }
    },

    /**
     * Add child to the sprite batch node (override addChild of ccsg.Node)
     * @function
     * @override
     * @param {_ccsg.Sprite} child
     * @param {Number} [zOrder]
     * @param {Number} [tag]
     */
    addChild: function (child, zOrder, tag) {
        cc.assert(child !== undefined, cc._LogInfos.SpriteBatchNode.addChild_3);

        if(!this._isValidChild(child))
            return;

        zOrder = (zOrder === undefined) ? child.zIndex : zOrder;
        tag = (tag === undefined) ? child.tag : tag;
        _ccsg.Node.prototype.addChild.call(this, child, zOrder, tag);

        // Apply shader
        if (this._renderCmd._shaderProgram) {
            child.shaderProgram = this._renderCmd._shaderProgram;
        }
    },

    _isValidChild: function (child) {
        if (!(child instanceof _ccsg.Sprite)) {
            cc.log(cc._LogInfos.Sprite.addChild_4);
            return false;
        }
        if (child.texture !== this._texture) {
            cc.log(cc._LogInfos.Sprite.addChild_5);
            return false;
        }
        return true;
    }
});

var _p = cc.SpriteBatchNode.prototype;

// Override properties
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
cc.defineGetterSetter(_p, "shaderProgram", _p.getShaderProgram, _p.setShaderProgram);

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var EventTarget = require("../cocos2d/core/event/event-target");

var dataPool = {
    _pool: {},
    _lengths: [],
    put: function (data) {
        var length = data.length;
        if (!this._pool[length]) {
            this._pool[length] = [data];
            this._lengths.push(length);
            this._lengths.sort();
        }
        else {
            this._pool[length].push(data);
        }
    },
    get: function (length) {
        var id;
        for (var i = 0; i < this._lengths.length; i++) {
            if (this._lengths[i] >= length) {
                id = this._lengths[i];
                break;
            }
        }
        if (id) {
            return this._pool[id].pop();
        }
        else {
            return undefined;
        }
    }
};

var FIX_ARTIFACTS_BY_STRECHING_TEXEL = cc.macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL,
    webgl,
    vl, vb, vt, vr,
    cornerId = [];

/*
 * <p>
 * A 9-slice sprite for cocos2d UI.                                                                    <br/>
 *                                                                                                     <br/>
 * 9-slice scaling allows you to specify how scaling is applied                                        <br/>
 * to specific areas of a sprite. With 9-slice scaling (3x3 grid),                                     <br/>
 * you can ensure that the sprite does not become distorted when                                       <br/>
 * scaled.                                                                                             <br/>
 * @note: it will refactor in v3.1                                                                    <br/>
 * @see http://yannickloriot.com/library/ios/cccontrolextension/Classes/CCScale9Sprite.html            <br/>
 * </p>
 * @class
 * @extends _ccsg.Node
 *
 * @property {Size}  preferredSize   - The preferred size of the 9-slice sprite
 * @property {Rect}  capInsets       - The cap insets of the 9-slice sprite
 * @property {Number}   insetLeft       - The left inset of the 9-slice sprite
 * @property {Number}   insetTop        - The top inset of the 9-slice sprite
 * @property {Number}   insetRight      - The right inset of the 9-slice sprite
 * @property {Number}   insetBottom     - The bottom inset of the 9-slice sprite
 */
var simpleQuadGenerator = {
    _rebuildQuads_base: function (sprite, spriteFrame, contentSize, isTrimmedContentSize) {
        //build vertices
        var vertices = sprite._vertices,
            wt = sprite._renderCmd._worldTransform,
            l, b, r, t;
        if (isTrimmedContentSize) {
            l = 0;
            b = 0;
            r = contentSize.width;
            t = contentSize.height;
        } else {
            var originalSize = spriteFrame._originalSize;
            var rect = spriteFrame._rect;
            var offset = spriteFrame._offset;
            var scaleX = contentSize.width / originalSize.width;
            var scaleY = contentSize.height / originalSize.height;
            var trimmLeft = offset.x + (originalSize.width - rect.width) / 2;
            var trimmRight = offset.x - (originalSize.width - rect.width) / 2;
            var trimmedBottom = offset.y + (originalSize.height - rect.height) / 2;
            var trimmedTop = offset.y - (originalSize.height - rect.height) / 2;

            l = trimmLeft * scaleX;
            b = trimmedBottom * scaleY;
            r = contentSize.width + trimmRight * scaleX;
            t = contentSize.height + trimmedTop * scaleY;
        }

        if (vertices.length < 8) {
            dataPool.put(vertices);
            vertices = dataPool.get(8) || new Float32Array(8);
            sprite._vertices = vertices;
        }
        // bl, br, tl, tr
        if (webgl) {
            vertices[0] = l * wt.a + b * wt.c + wt.tx;
            vertices[1] = l * wt.b + b * wt.d + wt.ty;
            vertices[2] = r * wt.a + b * wt.c + wt.tx;
            vertices[3] = r * wt.b + b * wt.d + wt.ty;
            vertices[4] = l * wt.a + t * wt.c + wt.tx;
            vertices[5] = l * wt.b + t * wt.d + wt.ty;
            vertices[6] = r * wt.a + t * wt.c + wt.tx;
            vertices[7] = r * wt.b + t * wt.d + wt.ty;
        }
        else {
            vertices[0] = l;
            vertices[1] = b;
            vertices[2] = r;
            vertices[3] = b;
            vertices[4] = l;
            vertices[5] = t;
            vertices[6] = r;
            vertices[7] = t;
        }

        cornerId[0] = 0;
        cornerId[1] = 2;
        cornerId[2] = 4;
        cornerId[3] = 6;

        //build uvs
        if (sprite._uvsDirty) {
            this._calculateUVs(sprite, spriteFrame);
        }

        sprite._vertCount = 4;
    },

    _calculateUVs: function (sprite, spriteFrame) {
        var uvs = sprite._uvs;
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;
        var textureRect = spriteFrame._rect;

        if (uvs.length < 8) {
            dataPool.put(uvs);
            uvs = dataPool.get(8) || new Float32Array(8);
            sprite._uvs = uvs;
        }

        //uv computation should take spritesheet into account.
        var l, b, r, t;
        var texelCorrect = FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;

        if (spriteFrame._rotated) {
            l = (textureRect.x + texelCorrect) / atlasWidth;
            b = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;
            r = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;
            t = (textureRect.y + texelCorrect) / atlasHeight;
            uvs[0] = l; uvs[1] = t;
            uvs[2] = l; uvs[3] = b;
            uvs[4] = r; uvs[5] = t;
            uvs[6] = r; uvs[7] = b;
        }
        else {
            l = (textureRect.x + texelCorrect) / atlasWidth;
            b = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;
            r = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;
            t = (textureRect.y + texelCorrect) / atlasHeight;
            uvs[0] = l; uvs[1] = b;
            uvs[2] = r; uvs[3] = b;
            uvs[4] = l; uvs[5] = t;
            uvs[6] = r; uvs[7] = t;
        }
    }
};

var scale9QuadGenerator = {
    x: new Array(4),
    y: new Array(4),
    _rebuildQuads_base: function (sprite, spriteFrame, contentSize, insetLeft, insetRight, insetTop, insetBottom) {
        //build vertices
        var vertices = sprite._vertices;
        var wt = sprite._renderCmd._worldTransform;
        var leftWidth, centerWidth, rightWidth;
        var topHeight, centerHeight, bottomHeight;
        var rect = spriteFrame._rect;

        leftWidth = insetLeft;
        rightWidth = insetRight;
        centerWidth = rect.width - leftWidth - rightWidth;
        topHeight = insetTop;
        bottomHeight = insetBottom;
        centerHeight = rect.height - topHeight - bottomHeight;

        var preferSize = contentSize;
        var sizableWidth = preferSize.width - leftWidth - rightWidth;
        var sizableHeight = preferSize.height - topHeight - bottomHeight;
        var xScale = preferSize.width / (leftWidth + rightWidth);
        var yScale = preferSize.height / (topHeight + bottomHeight);
        xScale = xScale > 1 ? 1 : xScale;
        yScale = yScale > 1 ? 1 : yScale;
        sizableWidth = sizableWidth < 0 ? 0 : sizableWidth;
        sizableHeight = sizableHeight < 0 ? 0 : sizableHeight;
        var x = this.x;
        var y = this.y;
        x[0] = 0;
        x[1] = leftWidth * xScale;
        x[2] = x[1] + sizableWidth;
        x[3] = preferSize.width;
        y[0] = 0;
        y[1] = bottomHeight * yScale;
        y[2] = y[1] + sizableHeight;
        y[3] = preferSize.height;

        if (vertices.length < 32) {
            dataPool.put(vertices);
            vertices = dataPool.get(32) || new Float32Array(32);
            sprite._vertices = vertices;
        }
        var offset = 0, row, col;
        if (webgl) {
            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    vertices[offset] = x[col] * wt.a + y[row] * wt.c + wt.tx;
                    vertices[offset+1] = x[col] * wt.b + y[row] * wt.d + wt.ty;
                    offset += 2;
                }
            }
        }
        else {
            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    vertices[offset] = x[col];
                    vertices[offset+1] = y[row];
                    offset += 2;
                }
            }
        }

        cornerId[0] = 0;
        cornerId[1] = 6;
        cornerId[2] = 24;
        cornerId[3] = 30;

        //build uvs
        if (sprite._uvsDirty) {
            this._calculateUVs(sprite, spriteFrame, insetLeft, insetRight, insetTop, insetBottom);
        }
    },

    _calculateUVs: function (sprite, spriteFrame, insetLeft, insetRight, insetTop, insetBottom) {
        var uvs = sprite._uvs;
        var rect = spriteFrame._rect;
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;

        //caculate texture coordinate
        var leftWidth, centerWidth, rightWidth;
        var topHeight, centerHeight, bottomHeight;
        var textureRect = spriteFrame._rect;

        leftWidth = insetLeft;
        rightWidth = insetRight;
        centerWidth = rect.width - leftWidth - rightWidth;
        topHeight = insetTop;
        bottomHeight = insetBottom;
        centerHeight = rect.height - topHeight - bottomHeight;

        if (uvs.length < 32) {
            dataPool.put(uvs);
            uvs = dataPool.get(32) || new Float32Array(32);
            sprite._uvs = uvs;
        }

        //uv computation should take spritesheet into account.
        var u = this.x;
        var v = this.y;
        var texelCorrect = FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;
        var offset = 0, row, col;

        if (spriteFrame._rotated) {
            u[0] = (textureRect.x + texelCorrect) / atlasWidth;
            u[1] = (bottomHeight + textureRect.x) / atlasWidth;
            u[2] = (bottomHeight + centerHeight + textureRect.x) / atlasWidth;
            u[3] = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;

            v[3] = (textureRect.y + texelCorrect) / atlasHeight;
            v[2] = (leftWidth + textureRect.y) / atlasHeight;
            v[1] = (leftWidth + centerWidth + textureRect.y) / atlasHeight;
            v[0] = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;

            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    uvs[offset] = u[row];
                    uvs[offset+1] = v[3-col];
                    offset += 2;
                }
            }
        }
        else {
            u[0] = (textureRect.x + texelCorrect) / atlasWidth;
            u[1] = (leftWidth + textureRect.x) / atlasWidth;
            u[2] = (leftWidth + centerWidth + textureRect.x) / atlasWidth;
            u[3] = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;

            v[3] = (textureRect.y + texelCorrect) / atlasHeight;
            v[2] = (topHeight + textureRect.y) / atlasHeight;
            v[1] = (topHeight + centerHeight + textureRect.y) / atlasHeight;
            v[0] = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;

            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    uvs[offset] = u[col];
                    uvs[offset+1] = v[row];
                    offset += 2;
                }
            }
        }
    }
};

var tiledQuadGenerator = {
    _rebuildQuads_base: function (sprite, spriteFrame, contentSize) {
        var vertices = sprite._vertices,
            wt = sprite._renderCmd._worldTransform,
            uvs = sprite._uvs;
        //build uvs
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;
        var textureRect = spriteFrame._rect;

        //uv computation should take spritesheet into account.
        var u0, v0, u1, v1;
        var texelCorrect = FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;
        if (spriteFrame._rotated) {
            u0 = (textureRect.x + texelCorrect) / atlasWidth;
            u1 = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;
            v0 = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;
            v1 = (textureRect.y + texelCorrect) / atlasHeight;
        }
        else {
            u0 = (textureRect.x + texelCorrect) / atlasWidth;
            u1 = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;
            v0 = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;
            v1 = (textureRect.y + texelCorrect) / atlasHeight;
        }

        //build quads
        var rectWidth = textureRect.width;
        var rectHeight = textureRect.height;
        var hRepeat = contentSize.width / rectWidth;
        var vRepeat = contentSize.height / rectHeight;
        var row = Math.ceil(vRepeat), col = Math.ceil(hRepeat);

        if (row * col > (65536 / 4)) {
            cc.error('too many tiles, only 16384 tiles will be show');
        }
        var dataLength = row * col * 4 * 2;
        if (vertices.length < dataLength) {
            dataPool.put(vertices);
            vertices = dataPool.get(dataLength) || new Float32Array(dataLength);
            sprite._vertices = vertices;
        }
        if (uvs.length < dataLength) {
            dataPool.put(uvs);
            uvs = dataPool.get(dataLength) || new Float32Array(dataLength);
            sprite._uvs = uvs;
        }

        var offset = 0, l, b, r, t;
        sprite._vertCount = 0;
        for (var vindex = 0; vindex < row; ++vindex) {
            for (var hindex = 0; hindex < col; ++hindex) {
                l = rectWidth * hindex;
                b = rectHeight * vindex;
                r = rectWidth * Math.min(hindex + 1, hRepeat);
                t = rectHeight * Math.min(vindex + 1, vRepeat);
                // bl.x, bl.y, br.x, br.y, tl.x, tl.y, tr.x, tr.y
                if (webgl) {
                    vertices[offset] = l * wt.a + b * wt.c + wt.tx;
                    vertices[offset + 1] = l * wt.b + b * wt.d + wt.ty;
                    vertices[offset + 2] = r * wt.a + b * wt.c + wt.tx;
                    vertices[offset + 3] = r * wt.b + b * wt.d + wt.ty;
                    vertices[offset + 4] = l * wt.a + t * wt.c + wt.tx;
                    vertices[offset + 5] = l * wt.b + t * wt.d + wt.ty;
                    vertices[offset + 6] = r * wt.a + t * wt.c + wt.tx;
                    vertices[offset + 7] = r * wt.b + t * wt.d + wt.ty;
                }
                else {
                    vertices[offset] = l;
                    vertices[offset + 1] = b;
                    vertices[offset + 2] = r;
                    vertices[offset + 3] = b;
                    vertices[offset + 4] = l;
                    vertices[offset + 5] = t;
                    vertices[offset + 6] = r;
                    vertices[offset + 7] = t;
                }

                if (!spriteFrame._rotated) {
                    uvs[offset] = u0;
                    uvs[offset + 1] = v0;
                    uvs[offset + 2] = r = u0 + (u1 - u0) * Math.min(1, hRepeat - hindex);
                    uvs[offset + 3] = v0;
                    uvs[offset + 4] = u0;
                    uvs[offset + 5] = t = v0 + (v1 - v0) * Math.min(1, vRepeat - vindex);
                    uvs[offset + 6] = r;
                    uvs[offset + 7] = t;
                } else {
                    uvs[offset] = u0;
                    uvs[offset + 1] = v1;
                    uvs[offset + 2] = u0;
                    uvs[offset + 3] = t = v1 + (v0 - v1) * Math.min(1, hRepeat - hindex);
                    uvs[offset + 4] = r = u0 + (u1 - u0) * Math.min(1, vRepeat - vindex);
                    uvs[offset + 5] = v1;
                    uvs[offset + 6] = r;
                    uvs[offset + 7] = t;
                }
                offset += 8;
                sprite._vertCount += 4;
                if (offset > dataLength) return;
            }
        }

        cornerId[0] = 0;
        cornerId[1] = col * 8 + 2;
        cornerId[2] = dataLength - col * 8 + 4;
        cornerId[3] = dataLength - 2;
    }
};

var fillQuadGeneratorBar = {
    //percentage from 0 to 1;
    _rebuildQuads_base : function (sprite, spriteFrame, contentSize, fillType, fillStart, fillRange) {
        var vertices = sprite._vertices,
            wt = sprite._renderCmd._worldTransform,
            uvs = sprite._uvs;
        var fillEnd;
        //build vertices
        var l = 0, b = 0,
            r = contentSize.width, t = contentSize.height;
        //build uvs
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;
        var textureRect = spriteFrame._rect;
        //uv computation should take spritesheet into account.
        var ul, vb, ur, vt;
        var texelCorrect = FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;
        if (spriteFrame._rotated) {
            ul = (textureRect.x + texelCorrect) / atlasWidth;
            vb = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;
            ur = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;
            vt = (textureRect.y + texelCorrect) / atlasHeight;
        }
        else {
            ul = (textureRect.x + texelCorrect) / atlasWidth;
            vb = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;
            ur = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;
            vt = (textureRect.y + texelCorrect) / atlasHeight;
        }

        if (vertices.length < 8) {
            dataPool.put(vertices);
            vertices = dataPool.get(8) || new Float32Array(8);
            sprite._vertices = vertices;
        }
        if (uvs.length < 8) {
            dataPool.put(uvs);
            uvs = dataPool.get(8) || new Float32Array(8);
            sprite._uvs = uvs;
        }

        var quadUV = new Array(8);
        if (!spriteFrame._rotated) {
            quadUV[0] = quadUV[4] = ul;
            quadUV[2] = quadUV[6] = ur;
            quadUV[1] = quadUV[3] = vb;
            quadUV[5] = quadUV[7] = vt;
        } else {
            quadUV[0] = quadUV[2] = ul;
            quadUV[4] = quadUV[6] = ur;
            quadUV[3] = quadUV[7] = vb;
            quadUV[1] = quadUV[5] = vt;
        }

        //do clamp
        fillStart = fillStart > 1 ? 1 : fillStart;
        fillStart = fillStart < 0 ? 0 : fillStart;
        fillRange = fillRange < 0 ? 0 : fillRange;
        fillEnd = fillStart + fillRange;
        fillEnd = fillEnd > 1 ? 1 : fillEnd;

        // bl : 0, 1
        // br : 2, 3
        // tl : 4, 5
        // tr : 6, 7
        var progressStart, progressEnd;
        switch (fillType) {
            case FillType.HORIZONTAL:
                progressStart = l + (r - l) * fillStart;
                progressEnd = l + (r - l) * fillEnd;

                l = progressStart;
                r = progressEnd;

                uvs[0] = quadUV[0] + (quadUV[2] - quadUV[0]) * fillStart;
                uvs[1] = quadUV[1];
                uvs[2] = quadUV[0] + (quadUV[2] - quadUV[0]) * fillEnd;
                uvs[3] = quadUV[3];
                uvs[4] = quadUV[4] + (quadUV[6] - quadUV[4]) * fillStart;
                uvs[5] = quadUV[5];
                uvs[6] = quadUV[4] + (quadUV[6] - quadUV[4]) * fillEnd;
                uvs[7] = quadUV[7];
                break;
            case FillType.VERTICAL:
                progressStart = b + (t - b) * fillStart;
                progressEnd = b + (t - b) * fillEnd;

                b = progressStart;
                t = progressEnd;

                uvs[0] = quadUV[0];
                uvs[1] = quadUV[1] + (quadUV[5] - quadUV[1]) * fillStart;
                uvs[2] = quadUV[2];
                uvs[3] = quadUV[3] + (quadUV[7] - quadUV[3]) * fillStart;
                uvs[4] = quadUV[4];
                uvs[5] = quadUV[1] + (quadUV[5] - quadUV[1]) * fillEnd;
                uvs[6] = quadUV[6];
                uvs[7] = quadUV[3] + (quadUV[7] - quadUV[3]) * fillEnd;
                break;
            default:
                cc.error('Unrecognized fill type in bar fill');
                break;
        }

        //build vertices
        if (webgl) {
            vertices[0] = l * wt.a + b * wt.c + wt.tx;
            vertices[1] = l * wt.b + b * wt.d + wt.ty;
            vertices[2] = r * wt.a + b * wt.c + wt.tx;
            vertices[3] = r * wt.b + b * wt.d + wt.ty;
            vertices[4] = l * wt.a + t * wt.c + wt.tx;
            vertices[5] = l * wt.b + t * wt.d + wt.ty;
            vertices[6] = r * wt.a + t * wt.c + wt.tx;
            vertices[7] = r * wt.b + t * wt.d + wt.ty;
        } else{
            vertices[0] = l;
            vertices[1] = b;
            vertices[2] = r;
            vertices[3] = b;
            vertices[4] = l;
            vertices[5] = t;
            vertices[6] = r;
            vertices[7] = t;
        }

        sprite._vertCount = 4;

        cornerId[0] = 0;
        cornerId[1] = 2;
        cornerId[2] = 4;
        cornerId[3] = 6;
    }
};

var fillQuadGeneratorRadial = {
    _vertPos: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
    _vertices: [cc.v2(0,0),cc.v2(0,0)],
    _uvs: [cc.v2(0,0),cc.v2(0,0)],
    _intersectPoint_1: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
    _intersectPoint_2: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
    outVerts: null,
    outUvs: null,
    rawVerts: null,
    rawUvs: null,

    _rebuildQuads_base : function (sprite, spriteFrame, contentSize, fillCenter, fillStart, fillRange) {
        var vertices = sprite._vertices,
            uvs = sprite._uvs,
            rawVerts = sprite._rawVerts,
            rawUvs = sprite._rawUvs,
            wt = sprite._renderCmd._worldTransform;
        //do round fill start [0,1), include 0, exclude 1
        while (fillStart >= 1.0) fillStart -= 1.0;
        while (fillStart < 0.0) fillStart += 1.0;
        var cx = fillCenter.x * contentSize.width,
            cy = fillCenter.y * contentSize.height;
        var center = cc.v2( cx, cy);

        fillStart *= Math.PI * 2;
        fillRange *= Math.PI * 2;
        var fillEnd = fillStart + fillRange;

        this.outVerts = vertices;
        this.outUvs = uvs;
        this.rawVerts = rawVerts;
        this.rawUvs = rawUvs;

        //build vertices
        this._calculateVertices(wt, spriteFrame, contentSize);
        //build uvs
        this._calculateUVs(spriteFrame);

        var _vertPos = this._vertPos,
            _vertices = this._vertices;

        _vertPos[0].x = _vertPos[3].x = _vertices[0].x;
        _vertPos[1].x = _vertPos[2].x = _vertices[1].x;
        _vertPos[0].y = _vertPos[1].y = _vertices[0].y;
        _vertPos[2].y = _vertPos[3].y = _vertices[1].y;

        //fallback
        //todo remove it if outside is implemented
        if(center.x > _vertices[1].x) {
            center.x = _vertices[1].x;
        }
        if(center.x < _vertices[0].x) {
            center.x = _vertices[0].x;
        }
        if(center.y < _vertices[0].y) {
            center.y = _vertices[0].y;
        }
        if(center.y > _vertices[1].y) {
            center.y = _vertices[1].y;
        }

        rawVerts[0] = rawVerts[4] = this._vertices[0].x;
        rawVerts[2] = rawVerts[6] = this._vertices[1].x;
        rawVerts[1] = rawVerts[3] = this._vertices[0].y;
        rawVerts[5] = rawVerts[7] = this._vertices[1].y;

        if (!spriteFrame._rotated) {
            rawUvs[0] = rawUvs[4] = this._uvs[0].x;
            rawUvs[2] = rawUvs[6] = this._uvs[1].x;
            rawUvs[1] = rawUvs[3] = this._uvs[0].y;
            rawUvs[5] = rawUvs[7] = this._uvs[1].y;
        } else {
            rawUvs[0] = rawUvs[2] = this._uvs[0].x;
            rawUvs[4] = rawUvs[6] = this._uvs[1].x;
            rawUvs[3] = rawUvs[7] = this._uvs[0].y;
            rawUvs[1] = rawUvs[5] = this._uvs[1].y;
        }

        var triangles = [null, null, null, null];
        if(center.x !== this._vertices[0].x) {
            triangles[0] = [3, 0];
        }
        if(center.x !== this._vertices[1].x) {
            triangles[2] = [1, 2];
        }
        if(center.y !== this._vertices[0].y) {
            triangles[1] = [0, 1];
        }
        if(center.y !== this._vertices[1].y) {
            triangles[3] = [2, 3];
        }

        this._getInsectedPoints(this._vertices[0].x, this._vertices[1].x, this._vertices[0].y, this._vertices[1].y, center, fillStart, this._intersectPoint_1);
        this._getInsectedPoints(this._vertices[0].x, this._vertices[1].x, this._vertices[0].y, this._vertices[1].y, center, fillStart + fillRange, this._intersectPoint_2);

        var dataLength = 3 * 5 * 2;
        if (vertices.length < dataLength) {
            dataPool.put(vertices);
            vertices = dataPool.get(dataLength) || new Float32Array(dataLength);
            this.outVerts = sprite._vertices = vertices;
        }
        if (uvs.length < dataLength) {
            dataPool.put(uvs);
            uvs = dataPool.get(dataLength) || new Float32Array(dataLength);
            this.outUvs = sprite._uvs = uvs;
        }

        var offset = 0, count = 0;
        for(var triangleIndex = 0; triangleIndex < 4; ++triangleIndex) {
            var triangle = triangles[triangleIndex];
            if(triangle === null) {
                continue;
            }
            //all in
            if(fillRange >= Math.PI * 2) {
                this._generateTriangle(wt, offset, center, this._vertPos[triangle[0]], this._vertPos[triangle[1]]);
                offset += 6;
                count += 3;
                continue;
            }
            //test against
            var startAngle = this._getVertAngle(center, this._vertPos[triangle[0]]);
            var endAngle = this._getVertAngle(center, this._vertPos[triangle[1]]);
            if(endAngle < startAngle) endAngle += Math.PI * 2;
            startAngle -= Math.PI * 2;
            endAngle -= Math.PI * 2;
            //testing
            for(var testIndex = 0; testIndex < 3; ++testIndex) {
                if(startAngle >= fillEnd) {
                    //all out
                } else if (startAngle >= fillStart) {
                    if(endAngle >= fillEnd) {
                        //startAngle to fillEnd
                        this._generateTriangle(wt, offset, center, this._vertPos[triangle[0]], this._intersectPoint_2[triangleIndex]);
                    } else {
                        //startAngle to endAngle
                        this._generateTriangle(wt, offset, center, this._vertPos[triangle[0]], this._vertPos[triangle[1]]);
                    }
                    offset += 6;
                    count += 3;
                } else {
                    //startAngle < fillStart
                    if(endAngle <= fillStart) {
                        //all out
                    } else if(endAngle <= fillEnd) {
                        //fillStart to endAngle
                        this._generateTriangle(wt, offset, center, this._intersectPoint_1[triangleIndex], this._vertPos[triangle[1]]);
                        offset += 6;
                        count += 3;
                    } else {
                        //fillStart to fillEnd
                        this._generateTriangle(wt, offset, center, this._intersectPoint_1[triangleIndex], this._intersectPoint_2[triangleIndex]);
                        offset += 6;
                        count += 3;
                    }
                }
                //add 2 * PI
                startAngle += Math.PI * 2;
                endAngle += Math.PI * 2;
            }
        }
        sprite._vertCount = count;

        cornerId[0] = 0;
        cornerId[1] = 2;
        cornerId[2] = 4;
        cornerId[3] = 6;
    },

    _generateTriangle: function(wt, offset, vert0, vert1, vert2) {
        var rawVerts = this.rawVerts;
        var rawUvs = this.rawUvs;
        var vertices = this.outVerts;
        var v0x = rawVerts[0];
        var v0y = rawVerts[1];
        var v1x = rawVerts[6];
        var v1y = rawVerts[7];
        var progressX, progressY;
        // tl: 0, 1
        // bl: 2, 3
        // tr: 4, 5
        if(webgl) {
            vertices[offset]  = vert0.x * wt.a + vert0.y * wt.c + wt.tx;
            vertices[offset+1]  = vert0.x * wt.b + vert0.y * wt.d + wt.ty;
            vertices[offset+2]  = vert1.x * wt.a + vert1.y * wt.c + wt.tx;
            vertices[offset+3]  = vert1.x * wt.b + vert1.y * wt.d + wt.ty;
            vertices[offset+4]  = vert2.x * wt.a + vert2.y * wt.c + wt.tx;
            vertices[offset+5]  = vert2.x * wt.b + vert2.y * wt.d + wt.ty;

        } else {
            vertices[offset]  = vert0.x;
            vertices[offset+1]  = vert0.y;
            vertices[offset+2]  = vert1.x;
            vertices[offset+3]  = vert1.y;
            vertices[offset+4]  = vert2.x;
            vertices[offset+5]  = vert2.y;
        }

        progressX = (vert0.x - v0x) / (v1x - v0x);
        progressY = (vert0.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, rawUvs, offset);

        progressX = (vert1.x - v0x) / (v1x - v0x);
        progressY = (vert1.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, rawUvs, offset + 2);

        progressX = (vert2.x - v0x) / (v1x - v0x);
        progressY = (vert2.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, rawUvs, offset + 4);
    },

    _generateUV : function(progressX, progressY, uvs, offset) {
        var out = this.outUvs;
        var px1 = uvs[0] + (uvs[2] - uvs[0]) * progressX;
        var px2 = uvs[4] + (uvs[6] - uvs[4]) * progressX;
        var py1 = uvs[1] + (uvs[3] - uvs[1]) * progressX;
        var py2 = uvs[5] + (uvs[7] - uvs[5]) * progressX;
        out[offset] = px1 + (px2 - px1) * progressY;
        out[offset+1] = py1 + (py2 - py1) * progressY;
    },

    _isAngleIn : function(angle, start, rangeAngle) {
        var pi_2 = Math.PI * 2;
        while(angle < start || angle >= start + pi_2) {
            if(angle < start) {
                angle += pi_2;
            }
            if(angle >= start + pi_2) {
                angle -= pi_2;
            }
        }

        return angle <= start + rangeAngle;
    },

    //[0,PI * 2)
    _getVertAngle: function(start, end) {
        var placementX, placementY;
        placementX = end.x - start.x;
        placementY = end.y - start.y;

        if(placementX === 0 && placementY === 0) {
            return undefined;
        } else if(placementX === 0) {
            if(placementY > 0) {
                return Math.PI * 0.5;
            } else {
                return Math.PI * 1.5;
            }
        } else {
            var angle = Math.atan(placementY / placementX);
            if(placementX < 0) {
                angle += Math.PI;
            }

            return angle;
        }
    },

    _getInsectedPoints: function(left, right, bottom, top, center, angle, intersectPoints) {
        //left bottom, right, top
        var result = [null, null, null, null];
        var sinAngle = Math.sin(angle);
        var cosAngle = Math.cos(angle);
        var tanAngle,cotAngle;
        if(Math.cos(angle) !== 0) {
            tanAngle = sinAngle / cosAngle;
            //calculate right and left
            if((left - center.x) * cosAngle > 0) {
                var yleft = center.y + tanAngle * (left - center.x);
                intersectPoints[0].x = left;
                intersectPoints[0].y = yleft;
            }
            if((right - center.x) * cosAngle > 0) {
                var yright = center.y + tanAngle * (right - center.x);

                intersectPoints[2].x = right;
                intersectPoints[2].y = yright;
            }

        }

        if(Math.sin(angle) !== 0) {
            cotAngle = cosAngle / sinAngle;
            //calculate  top and bottom
            if((top - center.y) * sinAngle > 0) {
                var xtop = center.x  + cotAngle * (top-center.y);
                intersectPoints[3].x = xtop;
                intersectPoints[3].y = top;
            }
            if((bottom - center.y) * sinAngle > 0) {
                var xbottom = center.x  + cotAngle * (bottom-center.y);
                intersectPoints[1].x = xbottom;
                intersectPoints[1].y = bottom;
            }

        }
        return result;
    },

    _calculateVertices : function (wt, spriteFrame, contentSize) {
        var x0, x3, y0, y3;
        x0 = 0;
        y0 = 0;
        x3 = contentSize.width;
        y3 = contentSize.height;

        this._vertices[0].x = x0;
        this._vertices[0].y = y0;
        this._vertices[1].x = x3;
        this._vertices[1].y = y3;
    },

    _calculateUVs : function (spriteFrame) {
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;
        var textureRect = spriteFrame._rect;

        //uv computation should take spritesheet into account.
        var u0, u3, v0, v3;
        var texelCorrect = FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;

        if (spriteFrame._rotated) {
            u0 = (textureRect.x + texelCorrect) / atlasWidth;
            u3 = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;

            v0 = (textureRect.y + texelCorrect) / atlasHeight;
            v3 = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;
        }
        else {
            u0 = (textureRect.x + texelCorrect) / atlasWidth;
            u3 = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;

            v0 = (textureRect.y + texelCorrect) / atlasHeight;
            v3 = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;
        }

        this._uvs[0].x = u0;
        this._uvs[0].y = v3;
        this._uvs[1].x = u3;
        this._uvs[1].y = v0;
    }
};

cc.Scale9Sprite = _ccsg.Node.extend({
    //resource data, could be async loaded.
    _spriteFrame: null,

    //scale 9 data
    _insetLeft: 0,
    _insetRight: 0,
    _insetTop: 0,
    _insetBottom: 0,
    //blend function
    _blendFunc: null,
    //sliced or simple
    _renderingType: 1,
    //bright or not
    _brightState: 0,
    //rendering quads shared by canvas and webgl
    _rawVerts: null,
    _rawUvs: null,
    _vertices: null,
    _uvs: null,
    _vertCount: 0,
    _quadsDirty: true,
    _uvsDirty: true,
    _isTriangle: false,
    _isTrimmedContentSize: true,
    //fill type
    _fillType: 0,
    //for fill radial
    _fillCenter: null,
    //normalized filled start and range
    _fillStart: 0,
    _fillRange: Math.PI * 2,
    _distortionOffset: null,
    _distortionTiling: null,

    ctor: function (textureOrSpriteFrame) {
        _ccsg.Node.prototype.ctor.call(this);
        this._renderCmd.setState(this._brightState);
        this._blendFunc = cc.BlendFunc._alphaNonPremultiplied();
        this._fillCenter = cc.v2(0,0);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        // Init vertex data for simple
        this._rawVerts = null;
        this._rawUvs = null;
        this._vertices = dataPool.get(8) || new Float32Array(8);
        this._uvs = dataPool.get(8) || new Float32Array(8);
        // Init sprite frame
        if (typeof textureOrSpriteFrame === 'string') {
            var frame = cc.spriteFrameCache.getSpriteFrame(textureOrSpriteFrame);
            if (frame) {
                this.initWithSpriteFrame(frame);
            } else {
                this.initWithTexture(textureOrSpriteFrame);
            }
        } else if (textureOrSpriteFrame instanceof cc.SpriteFrame) {
            this.initWithSpriteFrame(textureOrSpriteFrame);
        }
        else if (textureOrSpriteFrame instanceof cc.Texture2D) {
            this.initWithTexture(textureOrSpriteFrame);
        }

        if (webgl === undefined) {
            webgl = cc._renderType === cc.game.RENDER_TYPE_WEBGL;
            vl = cc.visibleRect.left;
            vr = cc.visibleRect.right;
            vt = cc.visibleRect.top;
            vb = cc.visibleRect.bottom;
        }
    },

    loaded: function () {
        if (this._spriteFrame === null) {
            return false;
        } else {
            return this._spriteFrame.textureLoaded();
        }
    },

    /**
     * Initializes a 9-slice sprite with a texture file
     *
     * @param textureOrTextureFile The name of the texture file.
     */
    initWithTexture: function (textureOrTextureFile) {
        this.setTexture(textureOrTextureFile);
    },

    /**
     * Initializes a 9-slice sprite with an sprite frame
     * @param spriteFrameOrSFName The sprite frame object.
     */
    initWithSpriteFrame: function (spriteFrameOrSFName) {
        this.setSpriteFrame(spriteFrameOrSFName);
    },

    /**
     * Change the texture file of 9 slice sprite
     *
     * @param textureOrTextureFile The name of the texture file.
     */
    setTexture: function (textureOrTextureFile) {
        var spriteFrame = new cc.SpriteFrame(textureOrTextureFile);
        this.setSpriteFrame(spriteFrame);
    },

    /**
     * Change the sprite frame of 9 slice sprite
     *
     * @param spriteFrameOrSFFileName The name of the texture file.
     */
    setSpriteFrame: function (spriteFrameOrSFName) {
        var spriteFrame;
        if (spriteFrameOrSFName instanceof cc.SpriteFrame) {
            spriteFrame = spriteFrameOrSFName;
        }
        else {
            spriteFrame = cc.spriteFrameCache.getSpriteFrame(spriteFrameOrSFName);
        }

        if (spriteFrame) {
            this._spriteFrame = spriteFrame;
            this._quadsDirty = true;
            this._uvsDirty = true;
            this._renderCmd._needDraw = false;
            var self = this;
            var onResourceDataLoaded = function () {
                if (cc.sizeEqualToSize(self._contentSize, cc.size(0, 0))) {
                    self.setContentSize(self._spriteFrame._rect);
                }
                self._renderCmd._needDraw = true;
                self._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
            };
            if (spriteFrame.textureLoaded()) {
                onResourceDataLoaded();
            } else {
                spriteFrame.once('load', onResourceDataLoaded, this);
            }
        }
    },

    /**
     * Sets the source blending function.
     *
     * @param blendFunc A structure with source and destination factor to specify pixel arithmetic. e.g. {GL_ONE, GL_ONE}, {GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA}.
     */
    setBlendFunc: function (blendFunc, dst) {
        if (dst === undefined) {
            this._blendFunc.src = blendFunc.src || cc.macro.BLEND_SRC;
            this._blendFunc.dst = blendFunc.dst || cc.macro.BLEND_DST;
        }
        else {
            this._blendFunc.src = blendFunc || cc.macro.BLEND_SRC;
            this._blendFunc.dst = dst || cc.macro.BLEND_DST;
        }
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },

    /**
     * Returns the blending function that is currently being used.
     *
     * @return A BlendFunc structure with source and destination factor which specified pixel arithmetic.
     */
    getBlendFunc: function () {
        return new cc.BlendFunc(this._blendFunc.src, this._blendFunc.dst);
    },

    // overrides
    setContentSize: function (width, height) {
        if (height === undefined) {
            height = width.height;
            width = width.width;
        }
        if (width === this._contentSize.width && height === this._contentSize.height) {
            return;
        }

        _ccsg.Node.prototype.setContentSize.call(this, width, height);
        this._quadsDirty = true;
    },

    //
    enableTrimmedContentSize: function (isTrimmed) {
        if (this._isTrimmedContentSize !== isTrimmed) {
            this._isTrimmedContentSize = isTrimmed;
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    isTrimmedContentSizeEnabled: function () {
        return this._isTrimmedContentSize;
    },
    /**
     * Change the state of 9-slice sprite.
     * @see `State`
     * @param state A enum value in State.
     */
    setState: function (state) {
        this._brightState = state;
        this._renderCmd.setState(state);
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },

    /**
     * Query the current bright state.
     * @return @see `State`
     */
    getState: function () {
        return this._brightState;
    },

    /**
     * change the rendering type, could be simple or slice
     * @return @see `RenderingType`
     */
    setRenderingType: function (type) {
        if (this._renderingType === type) return;
        this._renderingType = type;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the rendering type, could be simple or slice
     * @return @see `RenderingType`
     */
    getRenderingType: function () {
        return this._renderingType;
    },
    /**
     * change the left border of 9 slice sprite, it should be specified before trimmed.
     * @param insetLeft left border.
     */
    setInsetLeft: function (insetLeft) {
        this._insetLeft = insetLeft;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the left border of 9 slice sprite, the result is specified before trimmed.
     * @return left border.
     */
    getInsetLeft: function () {
        return this._insetLeft;
    },
    /**
     * change the top border of 9 slice sprite, it should be specified before trimmed.
     * @param insetTop top border.
     */
    setInsetTop: function (insetTop) {
        this._insetTop = insetTop;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },

    /**
     * get the top border of 9 slice sprite, the result is specified before trimmed.
     * @return top border.
     */
    getInsetTop: function () {
        return this._insetTop;
    },

    /**
     * change the right border of 9 slice sprite, it should be specified before trimmed.
     * @param insetRight right border.
     */
    setInsetRight: function (insetRight) {
        this._insetRight = insetRight;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },

    /**
     * get the right border of 9 slice sprite, the result is specified before trimmed.
     * @return right border.
     */
    getInsetRight: function () {
        return this._insetRight;
    },

    /**
     * change the bottom border of 9 slice sprite, it should be specified before trimmed.
     * @param insetBottom bottom border.
     */
    setInsetBottom: function (insetBottom) {
        this._insetBottom = insetBottom;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the bottom border of 9 slice sprite, the result is specified before trimmed.
     * @return bottom border.
     */
    getInsetBottom: function () {
        return this._insetBottom;
    },

    setFillType: function(value) {
        if(this._fillType === value)
            return;
        this._fillType = value;
        if(this._renderingType === RenderingType.FILLED) {
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    getFillType: function() {
        return this._fillType;
    },

    setFillCenter: function(value, y) {
        this._fillCenter = cc.v2(value,y);
        if(this._renderingType === RenderingType.FILLED && this._fillType === FillType.RADIAL) {
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    setDistortionTiling: function(valueOrX, y) {
        if(y === undefined) {
            y = valueOrX.y;
            valueOrX = valueOrX.x;
        }
        this._distortionTiling = this._distortionTiling || cc.v2(0,0);
        this._distortionTiling.x = valueOrX;
        this._distortionTiling.y = y;
    },

    setDistortionOffset: function(valueOrX, y) {
        if(y === undefined) {
            y = valueOrX.y;
            valueOrX = valueOrX.x;
        }
        this._distortionOffset = this._distortionOffset || cc.v2(0,0);
        this._distortionOffset.x = valueOrX;
        this._distortionOffset.y = y;
    },

    getFillCenter: function() {
        return cc.v2(this._fillCenter);
    },

    setFillStart: function(value) {
        if(this._fillStart === value)
            return;
        this._fillStart = value;
        if(this._renderingType === RenderingType.FILLED) {
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    getFillStart: function() {
        return this._fillStart;
    },

    setFillRange: function(value) {
        if(this._fillRange === value)
            return;
        this._fillRange = value;
        if(this._renderingType === RenderingType.FILLED ) {
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    getFillRange: function() {
        return this._fillRange;
    },

    _rebuildQuads: function () {
        if (!this._spriteFrame || !this._spriteFrame._textureLoaded) {
            this._renderCmd._needDraw = false;
            return;
        }
        this._isTriangle = false;
        switch (this._renderingType) {
        case RenderingType.SIMPLE:
            simpleQuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._isTrimmedContentSize);
            break;
        case RenderingType.SLICED:
            scale9QuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._insetLeft, this._insetRight, this._insetTop, this._insetBottom);
            break;
        case RenderingType.TILED:
            tiledQuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._contentSize);
            break;
        case RenderingType.FILLED:
            var fillstart = this._fillStart;
            var fillRange = this._fillRange;
            if(fillRange < 0) {
                fillstart += fillRange;
                fillRange = -fillRange;
            }
            if (this._fillType !== FillType.RADIAL) {
                fillRange = fillstart + fillRange;
                fillstart = fillstart > 1.0 ? 1.0 : fillstart;
                fillstart = fillstart < 0.0 ? 0.0 : fillstart;

                fillRange = fillRange > 1.0 ? 1.0 : fillRange;
                fillRange = fillRange < 0.0 ? 0.0 : fillRange;
                fillRange = fillRange - fillstart;
                fillQuadGeneratorBar._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._fillType, fillstart, fillRange);
            } else {
                this._isTriangle = true;
                if (!this._rawVerts) {
                    this._rawVerts = dataPool.get(8) || new Float32Array(8);
                    this._rawUvs = dataPool.get(8) || new Float32Array(8);
                }
                fillQuadGeneratorRadial._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._fillCenter,fillstart, fillRange);
            }
            break;
        default:
            this._quadsDirty = false;
            this._uvsDirty = false;
            this._renderCmd._needDraw = false;
            cc.error('Can not generate quad');
            return;
        }

        // Culling
        if (webgl) {
            var vert = this._isTriangle ? this._rawVerts : this._vertices,
                x0 = vert[cornerId[0]], x1 = vert[cornerId[1]], x2 = vert[cornerId[2]], x3 = vert[cornerId[3]],
                y0 = vert[cornerId[0]+1], y1 = vert[cornerId[1]+1], y2 = vert[cornerId[2]+1], y3 = vert[cornerId[3]+1];
            if (((x0-vl.x) & (x1-vl.x) & (x2-vl.x) & (x3-vl.x)) >> 31 || // All outside left
                ((vr.x-x0) & (vr.x-x1) & (vr.x-x2) & (vr.x-x3)) >> 31 || // All outside right
                ((y0-vb.y) & (y1-vb.y) & (y2-vb.y) & (y3-vb.y)) >> 31 || // All outside bottom
                ((vt.y-y0) & (vt.y-y1) & (vt.y-y2) & (vt.y-y3)) >> 31)   // All outside top
            {
                this._renderCmd._needDraw = false;
            }
            else {
                this._renderCmd._needDraw = true;
            }
        }
        else {
            var bb = this._renderCmd._currentRegion,
                l = bb._minX, r = bb._maxX, b = bb._minY, t = bb._maxY;
            if (r < vl.x || l > vr.x || t < vb.y || b > vt.y) {
                this._renderCmd._needDraw = false;
            }
            else {
                this._renderCmd._needDraw = true;
            }
        }

        this._quadsDirty = false;
        this._uvsDirty = false;
    },
    _createRenderCmd: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.Scale9Sprite.CanvasRenderCmd(this);
        else
            return new cc.Scale9Sprite.WebGLRenderCmd(this);
    }

});

var _p = cc.Scale9Sprite.prototype;
cc.js.addon(_p, EventTarget.prototype);
// Extended properties
cc.defineGetterSetter(_p, 'insetLeft', _p.getInsetLeft, _p.setInsetLeft);
cc.defineGetterSetter(_p, 'insetTop', _p.getInsetTop, _p.setInsetTop);
cc.defineGetterSetter(_p, 'insetRight', _p.getInsetRight, _p.setInsetRight);
cc.defineGetterSetter(_p, 'insetBottom', _p.getInsetBottom, _p.setInsetBottom);

cc.Scale9Sprite.state = {NORMAL: 0, GRAY: 1, DISTORTION: 2};

/**
 * Enum for sprite type
 * @enum SpriteType
 */
var RenderingType = cc.Scale9Sprite.RenderingType = cc.Enum({
    /**
     * @property {Number} SIMPLE
     */
    SIMPLE: 0,
    /**
     * @property {Number} SLICED
     */
    SLICED: 1,
    /*
     * @property {Number} TILED
     */
    TILED: 2,
    /*
     * @property {Number} FILLED
     */
    FILLED: 3
});

var FillType = cc.Scale9Sprite.FillType = cc.Enum({
    HORIZONTAL: 0,
    VERTICAL: 1,
    RADIAL:2,
});

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc.Scale9Sprite.CanvasRenderCmd = function (renderable) {
    _ccsg.Node.CanvasRenderCmd.call(this, renderable);
    if (this._node.loaded()) {
        this._needDraw = true;
    }
    else {
        this._needDraw = false;
    }
    this._state = cc.Scale9Sprite.state.NORMAL;
    this._originalTexture = this._textureToRender = null;
};

var proto = cc.Scale9Sprite.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = cc.Scale9Sprite.CanvasRenderCmd;

proto.transform = function (parentCmd, recursive) {
    this.originTransform(parentCmd, recursive);
    this._node._rebuildQuads();
};

proto._updateDisplayColor = function(parentColor){
    _ccsg.Node.WebGLRenderCmd.prototype._updateDisplayColor.call(this, parentColor);
    this._originalTexture = this._textureToRender = null;
};

proto.setState = function(state){
    if(this._state === state) return;

    this._state = state;
    this._originalTexture = this._textureToRender = null;
};

proto.rendering = function (ctx, scaleX, scaleY) {
    var node = this._node;
    var locDisplayOpacity = this._displayedOpacity;
    var alpha =  locDisplayOpacity/ 255;
    var locTexture = null;
    if (node._spriteFrame) locTexture = node._spriteFrame._texture;
    if (!node.loaded() || locDisplayOpacity === 0)
        return;
    if (this._textureToRender === null || this._originalTexture !== locTexture) {
        this._textureToRender = this._originalTexture = locTexture;
        if (cc.Scale9Sprite.state.GRAY === this._state) {
            this._textureToRender = this._textureToRender._generateGrayTexture();
        }
        var color = node.getDisplayedColor();
        if (locTexture && (color.r !== 255 || color.g !==255 || color.b !== 255))
            this._textureToRender = this._textureToRender._generateColorTexture(color.r,color.g,color.b);
    }

    var wrapper = ctx || cc._renderContext, context = wrapper.getContext();
    wrapper.setTransform(this._worldTransform, scaleX, scaleY);
    wrapper.setCompositeOperation(_ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(node._blendFunc));
    wrapper.setGlobalAlpha(alpha);

    if (this._textureToRender) {
        if (node._quadsDirty) {
            node._rebuildQuads();
        }
        var sx,sy,sw,sh;
        var x, y, w,h;
        var textureWidth = this._textureToRender._pixelWidth;
        var textureHeight = this._textureToRender._pixelHeight;
        var image = this._textureToRender._htmlElementObj;
        var vertices = node._vertices;
        var uvs = node._uvs;
        var i = 0, off = 0;

        if (node._isTriangle) {
            var rawVerts = node._rawVerts, rawUvs = node._rawUvs;
            x = rawVerts[0];
            y = rawVerts[1];
            w = rawVerts[6] - x;
            h = rawVerts[7] - y;
            y = - y - h;

            sx = rawUvs[4] * textureWidth;
            sy = rawUvs[5] * textureHeight;
            sw = (rawUvs[6] - rawUvs[0]) * textureWidth;
            sh = (rawUvs[1] - rawUvs[7]) * textureHeight;


            wrapper.save();
            context.beginPath();
            var triangleCount = Math.floor(node._vertCount / 3);

            for (i = 0, off = 0; i < triangleCount; i++) {
                context.moveTo(vertices[off++], -vertices[off++]);
                context.lineTo(vertices[off++], -vertices[off++]);
                context.lineTo(vertices[off++], -vertices[off++]);
            }

            context.clip();
            if (this._textureToRender._pattern !== '') {
                wrapper.setFillStyle(context.createPattern(image, this._textureToRender._pattern));
                context.fillRect(x, y, w, h);
            } 
            else {
                if (sw > 0 && sh > 0 && w > 0 && h > 0) {
                    context.drawImage(image,
                        sx, sy, sw, sh,
                        x, y, w, h);
                }
            }

            wrapper.restore();
            cc.g_NumberOfDraws += triangleCount;
        } 
        else if (node._renderingType === cc.Scale9Sprite.RenderingType.SLICED) {
            // Sliced use a special vertices layout 16 vertices for 9 quads
            for (var r = 0; r < 3; ++r) {
                for (var c = 0; c < 3; ++c) {
                    off = r*8 + c*2;
                    x = vertices[off];
                    y = vertices[off+1];
                    w = vertices[off+10] - x;
                    h = vertices[off+11] - y;
                    y = - y - h;

                    sx = uvs[off] * textureWidth;
                    sy = uvs[off+11] * textureHeight;
                    sw = (uvs[off+10] - uvs[off]) * textureWidth;
                    sh = (uvs[off+1] - uvs[off+11]) * textureHeight;

                    if (sw > 0 && sh > 0 && w > 0 && h > 0) {
                        context.drawImage(image,
                            sx, sy, sw, sh,
                            x, y, w, h);
                    }
                }
            }
            cc.g_NumberOfDraws += 9;
        }
        else {
            var quadCount = Math.floor(node._vertCount / 4);
            for (i = 0, off = 0; i < quadCount; i++) {
                x = vertices[off];
                y = vertices[off+1];
                w = vertices[off+6] - x;
                h = vertices[off+7] - y;
                y = - y - h;

                sx = uvs[off] * textureWidth;
                sy = uvs[off+7] * textureHeight;
                sw = (uvs[off+6] - uvs[off]) * textureWidth;
                sh = (uvs[off+1] - uvs[off+7]) * textureHeight;
                

                if (this._textureToRender._pattern !== '') {
                    wrapper.setFillStyle(context.createPattern(image, this._textureToRender._pattern));
                    context.fillRect(x, y, w, h);
                } else {
                    if (sw > 0 && sh > 0 && w > 0 && h > 0) {
                        context.drawImage(image,
                            sx, sy, sw, sh,
                            x, y, w, h);
                    }
                }
                off += 8;
            }
            cc.g_NumberOfDraws += quadCount;
        }
    }
};

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var ccgl = cc.gl;

cc.Scale9Sprite.WebGLRenderCmd = function (renderable) {
    _ccsg.Node.WebGLRenderCmd.call(this, renderable);
    if (this._node.loaded()) {
        this._needDraw = true;
    }
    else {
        this._needDraw = false;
    }

    this.vertexType = cc.renderer.VertexType.QUAD;
    this._color = new Uint32Array(1);
    this._dirty = false;
    this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLOR);
};

var Scale9Sprite = cc.Scale9Sprite;
var proto = Scale9Sprite.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = Scale9Sprite.WebGLRenderCmd;

proto._uploadSliced = function (vertices, uvs, color, z, f32buffer, ui32buffer, offset) {
    var off;
    for (var r = 0; r < 3; ++r) {
        for (var c = 0; c < 3; ++c) {
            off = r*8 + c*2;
            // lb
            f32buffer[offset] = vertices[off];
            f32buffer[offset+1] = vertices[off+1];
            f32buffer[offset+2] = z;
            ui32buffer[offset+3] = color[0];
            f32buffer[offset+4] = uvs[off];
            f32buffer[offset+5] = uvs[off+1];
            offset += 6;
            // rb
            f32buffer[offset] = vertices[off+2];
            f32buffer[offset + 1] = vertices[off+3];
            f32buffer[offset + 2] = z;
            ui32buffer[offset + 3] = color[0];
            f32buffer[offset + 4] = uvs[off+2];
            f32buffer[offset + 5] = uvs[off+3];
            offset += 6;
            // lt
            f32buffer[offset] = vertices[off+8];
            f32buffer[offset + 1] = vertices[off+9];
            f32buffer[offset + 2] = z;
            ui32buffer[offset + 3] = color[0];
            f32buffer[offset + 4] = uvs[off+8];
            f32buffer[offset + 5] = uvs[off+9];
            offset += 6;
            // rt
            f32buffer[offset] = vertices[off+10];
            f32buffer[offset + 1] = vertices[off+11];
            f32buffer[offset + 2] = z;
            ui32buffer[offset + 3] = color[0];
            f32buffer[offset + 4] = uvs[off+10];
            f32buffer[offset + 5] = uvs[off+11];
            offset += 6;
        }
    }
    return 36;
};

proto.transform = function (parentCmd, recursive) {
    this.originTransform(parentCmd, recursive);
    this._node._rebuildQuads();
};

proto.uploadData = function (f32buffer, ui32buffer, vertexDataOffset){
    var node = this._node;
    if (this._displayedOpacity === 0) {
        return 0;
    }

    // Rebuild vertex data
    if (node._quadsDirty) {
        node._rebuildQuads();
    }

    if (node._distortionOffset && this._shaderProgram === Scale9Sprite.WebGLRenderCmd._distortionProgram) {
        this._shaderProgram.setUniformLocationWith2f(
            Scale9Sprite.WebGLRenderCmd._distortionOffset,
            node._distortionOffset.x, node._distortionOffset.y
        );
        this._shaderProgram.setUniformLocationWith2f(
            Scale9Sprite.WebGLRenderCmd._distortionTiling,
            node._distortionTiling.x, node._distortionTiling.y
        );
        cc.renderer._breakBatch();
    }

    // Color & z
    var opacity = this._displayedOpacity;
    var r = this._displayedColor.r,
        g = this._displayedColor.g,
        b = this._displayedColor.b;
    if (node._opacityModifyRGB) {
        var a = opacity / 255;
        r *= a;
        g *= a;
        b *= a;
    }
    this._color[0] = ((opacity<<24) | (b<<16) | (g<<8) | r);
    var z = node._vertexZ;

    // Upload data
    var vertices = node._vertices;
    var uvs = node._uvs;
    var types = Scale9Sprite.RenderingType;
    var offset = vertexDataOffset;
    var len = 0;
    switch (node._renderingType) {
    case types.SIMPLE:
    case types.TILED:
    case types.FILLED:
        // Inline for performance
        len = this._node._vertCount;
        for (var i = 0, srcOff = 0; i < len; i++, srcOff += 2) {
            f32buffer[offset] = vertices[srcOff];
            f32buffer[offset + 1] = vertices[srcOff+1];
            f32buffer[offset + 2] = z;
            ui32buffer[offset + 3] = this._color[0];
            f32buffer[offset + 4] = uvs[srcOff];
            f32buffer[offset + 5] = uvs[srcOff+1];
            offset += 6;
        }
        break;
    case types.SLICED:
        len = this._uploadSliced(vertices, uvs, this._color, z, f32buffer, ui32buffer, offset);
        break;
    }
    if (node._renderingType === types.FILLED && node._fillType === Scale9Sprite.FillType.RADIAL) {
        this.vertexType = cc.renderer.VertexType.TRIANGLE;
    }
    else {
        this.vertexType = cc.renderer.VertexType.QUAD;
    }
    return len;
};

proto.setState = function (state) {
    if (state === Scale9Sprite.state.NORMAL) {
        this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLOR);
    } else if (state === Scale9Sprite.state.GRAY) {
        this._shaderProgram = cc.Scale9Sprite.WebGLRenderCmd._getGrayShaderProgram();
    } else if (state === Scale9Sprite.state.DISTORTION) {
        this._shaderProgram = cc.Scale9Sprite.WebGLRenderCmd._getDistortionProgram();
    }
};

Scale9Sprite.WebGLRenderCmd._grayShaderProgram = null;
Scale9Sprite.WebGLRenderCmd._getGrayShaderProgram = function(){
    var grayShader = Scale9Sprite.WebGLRenderCmd._grayShaderProgram;
    if (grayShader)
        return grayShader;

    grayShader = new cc.GLProgram();
    grayShader.initWithVertexShaderByteArray(cc.PresetShaders.SPRITE_POSITION_TEXTURE_COLOR_VERT, cc.Scale9Sprite.WebGLRenderCmd._grayShaderFragment);
    grayShader.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
    grayShader.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
    grayShader.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
    grayShader.link();
    grayShader.updateUniforms();

    Scale9Sprite.WebGLRenderCmd._grayShaderProgram = grayShader;
    return grayShader;
};

Scale9Sprite.WebGLRenderCmd._grayShaderFragment =
    "precision lowp float;\n"
    + "varying vec4 v_fragmentColor; \n"
    + "varying vec2 v_texCoord; \n"
    + "void main() \n"
    + "{ \n"
    + "    vec4 c = texture2D(CC_Texture0, v_texCoord); \n"
    + "    gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b); \n"
    +"     gl_FragColor.w = c.w ; \n"
    + "}";

Scale9Sprite.WebGLRenderCmd._distortionProgram = null;
Scale9Sprite.WebGLRenderCmd._getDistortionProgram = function(){
    var shader = Scale9Sprite.WebGLRenderCmd._distortionProgram;
    if(shader)
        return shader;

    shader = new cc.GLProgram();
    shader.initWithVertexShaderByteArray(cc.PresetShaders.SPRITE_POSITION_TEXTURE_COLOR_VERT, distortionSpriteShader.fShader);
    shader.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
    shader.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
    shader.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
    shader.link();
    shader.updateUniforms();

    Scale9Sprite.WebGLRenderCmd._distortionProgram = shader;
    Scale9Sprite.WebGLRenderCmd._distortionOffset = shader.getUniformLocationForName('u_offset');
    Scale9Sprite.WebGLRenderCmd._distortionTiling = shader.getUniformLocationForName('u_offset_tiling');
    return shader;
};

var distortionSpriteShader = {
    shaderKey: 'cc.Sprite.Shader.Distortion',
    fShader:  "precision lowp float;\n"
        + "varying vec4 v_fragmentColor; \n"
        + "varying vec2 v_texCoord; \n"
        + "uniform vec2 u_offset; \n"
        + "uniform vec2 u_offset_tiling; \n"
        + "const float PI = 3.14159265359;\n"
        + "void main() \n"
        + "{ \n"
        + "float halfPI = 0.5 * PI;\n"
        + "float maxFactor = sin(halfPI);\n"
        + "vec2 uv = v_texCoord;\n"
        + "vec2 xy = 2.0 * uv.xy - 1.0;\n"
        + "float d = length(xy);\n"
        + "if (d < (2.0-maxFactor)) {\n"
        + "d = length(xy * maxFactor);\n"
        + "float z = sqrt(1.0 - d * d);\n"
        + " float r = atan(d, z) / PI;\n"
        + "float phi = atan(xy.y, xy.x);\n"
        + "uv.x = r * cos(phi) + 0.5;\n"
        + "uv.y = r * sin(phi) + 0.5;\n"
        + "} else {\n"
        + "discard;\n"
        + "}\n"
        + "uv = uv * u_offset_tiling + u_offset;\n"
        + "uv = fract(uv); \n"
        + "gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, uv);\n"
        + "}"
};

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Chukong Aipu reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var TextUtils = {
    label_wordRex : /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/,
    label_symbolRex : /^[!,.:;}\]%\?>、‘“》？。，！]/,
    label_lastWordRex : /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)$/,
    label_lastEnglish : /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+$/,
    label_firsrEnglish : /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]/,
    label_wrapinspection : true,

    isUnicodeCJK: function(ch) {
        var __CHINESE_REG = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
        var __JAPANESE_REG = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
        var __KOREAN_REG = /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/;
        return __CHINESE_REG.test(ch) || __JAPANESE_REG.test(ch) || __KOREAN_REG.test(ch);
    },

    //Checking whether the character is a whitespace
    isUnicodeSpace: function(ch) {
        ch = ch.charCodeAt(0);
        return ((ch >= 9 && ch <= 13) || ch === 32 || ch === 133 || ch === 160 || ch === 5760 || (ch >= 8192 && ch <= 8202) || ch === 8232 || ch === 8233 || ch === 8239 || ch === 8287 || ch === 12288);
    },

    fragmentText: function (stringToken, allWidth, maxWidth, measureText) {
        //check the first character
        var wrappedWords = [];
        //fast return if strArr is empty
        if(stringToken.length === 0 || maxWidth < 0) {
            wrappedWords.push('');
            return wrappedWords;
        }

        var text = stringToken;
        while (allWidth > maxWidth && text.length > 1) {

            var fuzzyLen = text.length * ( maxWidth / allWidth ) | 0;
            var tmpText = text.substr(fuzzyLen);
            var width = allWidth - measureText(tmpText);
            var sLine = tmpText;
            var pushNum = 0;

            var checkWhile = 0;
            var checkCount = 10;

            //Exceeded the size
            while (width > maxWidth && checkWhile++ < checkCount) {
                fuzzyLen *= maxWidth / width;
                fuzzyLen = fuzzyLen | 0;
                tmpText = text.substr(fuzzyLen);
                width = allWidth - measureText(tmpText);
            }

            checkWhile = 0;

            //Find the truncation point
            while (width < maxWidth && checkWhile++ < checkCount) {
                if (tmpText) {
                    var exec = this.label_wordRex.exec(tmpText);
                    pushNum = exec ? exec[0].length : 1;
                    sLine = tmpText;
                }

                fuzzyLen = fuzzyLen + pushNum;
                tmpText = text.substr(fuzzyLen);
                width = allWidth - measureText(tmpText);
            }

            fuzzyLen -= pushNum;
            if (fuzzyLen === 0) {
                fuzzyLen = 1;
                sLine = sLine.substr(1);
            }

            var sText = text.substr(0, fuzzyLen), result;

            //symbol in the first
            if (this.label_wrapinspection) {
                if (this.label_symbolRex.test(sLine || tmpText)) {
                    result = this.label_lastWordRex.exec(sText);
                    fuzzyLen -= result ? result[0].length : 0;
                    if (fuzzyLen === 0) fuzzyLen = 1;

                    sLine = text.substr(fuzzyLen);
                    sText = text.substr(0, fuzzyLen);
                }
            }

            //To judge whether a English words are truncated
            if (this.label_firsrEnglish.test(sLine)) {
                result = this.label_lastEnglish.exec(sText);
                if (result && sText !== result[0]) {
                    fuzzyLen -= result[0].length;
                    sLine = text.substr(fuzzyLen);
                    sText = text.substr(0, fuzzyLen);
                }
            }
            if (sText.trim().length > 0) {
                wrappedWords.push(sText);
            }
            text = sLine || tmpText;
            allWidth = measureText(text);
        }
        if (text.length > 0) {
            wrappedWords.push(text);
        }

        return wrappedWords;
    },

};

cc.TextUtils = module.exports = TextUtils;

/*global cc */

/****************************************************************************
 Copyright (c) 2015 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var EventTarget = require("../cocos2d/core/event/event-target");

var FontLetterDefinition = function() {
    this._u = 0;
    this._v = 0;
    this._width = 0;
    this._height = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._textureID = 0;
    this._validDefinition = false;
    this._xAdvance = 0;
};

cc.FontAtlas = function(fntConfig) {
    this._lineHeight = fntConfig.commonHeight;
    this._fontSize = fntConfig.fontSize;
    this._letterDefinitions = {};
    this._fntConfig = fntConfig;
};

cc.FontAtlas.prototype = {
    constructor: cc.FontAtlas,
    setFontSize: function(fontSize) {
        this._fontSize = fontSize;
    },
    getOriginalFontSize: function() {
        return this._fntConfig.fontSize;
    },
    addLetterDefinitions: function(letter, letterDefinition) {
        this._letterDefinitions[letter] = letterDefinition;
    },
    cloneLetterDefinition: function() {
        var copyLetterDefinitions = {};
        for (var key in this._letterDefinitions) {
            var value = new FontLetterDefinition();
            cc.js.mixin(value, this._letterDefinitions[key]);
            copyLetterDefinitions[key] = value;
        }
        return copyLetterDefinitions;
    },
    assignLetterDefinitions: function(letterDefinition) {
        for (var key in this._letterDefinitions) {
            var newValue = letterDefinition[key];
            var oldValue = this._letterDefinitions[key];
            cc.js.mixin(oldValue, newValue);
        }
    },
    scaleFontLetterDefinition: function(scaleFactor) {
        for (var fontDefinition in this._letterDefinitions) {
            var letterDefinitions = this._letterDefinitions[fontDefinition];
            letterDefinitions._width *= scaleFactor;
            letterDefinitions._height *= scaleFactor;
            letterDefinitions._offsetX *= scaleFactor;
            letterDefinitions._offsetY *= scaleFactor;
            letterDefinitions._xAdvance *= scaleFactor;
        }
    },

    getLetterDefinitionForChar: function(char) {
        var hasKey = this._letterDefinitions.hasOwnProperty(char.charCodeAt(0));
        var letterDefinition;
        if (hasKey) {
            letterDefinition = this._letterDefinitions[char.charCodeAt(0)];
        } else {
            letterDefinition = null;
        }
        return letterDefinition;
    }
};

var LetterInfo = function() {
    this._char = '';
    this._valid = true;
    this._positionX = 0;
    this._positionY = 0;
    this._atlasIndex = 0;
    this._lineIndex = 0;
};

_ccsg.Label = _ccsg.Node.extend({
    _hAlign: cc.TextAlignment.LEFT, //0 left, 1 center, 2 right
    _vAlign: cc.VerticalTextAlignment.TOP, //0 bottom,1 center, 2 top
    _string: "",
    _fontSize: 40,
    _drawFontsize: 40,
    _overFlow: 0, //see _ccsg.Label.Overflow
    _isWrapText: true,
    _spacingX: 0,

    _blendFunc: null,
    _labelType: 0, //0 is ttf, 1 is bmfont.
    _fontHandle: "", //a ttf font name or a bmfont file path.
    _lineSpacing: 0,

    _maxLineWidth:  0,
    _labelDimensions:  cc.size(0, 0),
    _labelWidth:  0,
    _labelHeight:  0,

    _lineHeight: 40,
    _outlined: false,
    _outlineColor: null,
    _outlineWidth: 1,
    _className: "Label",
    //used for left and right margin
    _margin : 0,
    //bold,italic, underline
    _isBold: false,
    _isItalic: false,
    _isUnderline: false,

    //fontHandle it is a system font name, ttf file path or bmfont file path.
    ctor: function(string, fontHandle, textureUrl) {
        EventTarget.call(this);

        fontHandle = fontHandle || "";
        this._fontHandle = fontHandle;
        if (typeof string !== 'string') {
            string = '' + string;
        }

        this._string = string;

        _ccsg.Node.prototype.ctor.call(this);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        _ccsg.Node.prototype.setContentSize.call(this, cc.size(128, 128));
        this._blendFunc = cc.BlendFunc._alphaNonPremultiplied();

        this.setFontFileOrFamily(fontHandle, textureUrl);
        this.setString(this._string);
    },

    _resetBMFont: function() {
        this._imageOffset = cc.p(0, 0);
        this._cascadeColorEnabled = true;
        this._cascadeOpacityEnabled = true;
        this._fontAtlas = null;
        this._config = null;
        this._numberOfLines =  0;
        this._lettersInfo =  [];
        this._linesWidth =  [];
        this._linesOffsetX =  [];
        this._textDesiredHeight =  0;
        this._letterOffsetY =  0;
        this._tailoredTopY =  0;
        this._tailoredBottomY =  0;
        this._bmfontScale =  1.0;
        this._additionalKerning =  0;
        this._horizontalKernings =  [];
        this._lineBreakWithoutSpaces =  false;

        this._reusedRect =  cc.rect(0, 0, 0, 0);
        this._textureLoaded = false;

        if (this._spriteBatchNode) {
            this.removeChild(this._spriteBatchNode);
            this._spriteBatchNode = null;
        }
    },

    setHorizontalAlign: function(align) {
        if (this._hAlign === align) return;

        this._hAlign = align;
        this._notifyLabelSkinDirty();
    },

    getHorizontalAlign: function() {
        return this._hAlign;
    },

    setVerticalAlign: function(align) {
        if (this._vAlign === align) return;

        this._vAlign = align;
        this._notifyLabelSkinDirty();
    },

    getVerticalAlign: function() {
        return this._vAlign;
    },

    setString: function(string) {
        //convert param to string
        if (typeof string !== 'string') {
            string = '' + string;
        }

        if (this._string === string) return;

        this._string = string;
        this._notifyLabelSkinDirty();
    },

    setMargin: function(value) {
        if(this._margin === value) return;

        this._margin = value;
        this._notifyLabelSkinDirty();
    },

    getString: function() {
        return this._string;
    },
    getStringLength: function() {
        return this._string.length;
    },

    enableWrapText: function(enabled) {
        if (this._isWrapText === enabled) return;

        //when label is in resize mode, wrap is disabled.
        if (this._overFlow === _ccsg.Label.Overflow.RESIZE_HEIGHT ||
           this._overFlow === _ccsg.Label.Overflow.NONE) {
            return;
        }
        this._isWrapText = enabled;
        this._rescaleWithOriginalFontSize();

        this._notifyLabelSkinDirty();
    },

    enableItalics: function (enabled) {
        this._isItalic = enabled;
        if(enabled) {
            this.setSkewX(12);
        } else {
            this.setSkewX(0);
        }
    },

    enableBold: function (enabled) {
        if(this._isBold === enabled) return;

        this._isBold = enabled;
        this._notifyLabelSkinDirty();
    },

    enableUnderline: function (enabled) {
        if(this._isUnderline === enabled) return;

        this._isUnderline = enabled;
        this._notifyLabelSkinDirty();
    },

    isWrapTextEnabled: function() {
        return this._isWrapText;
    },
    getFontName: function() {
        return this._fontHandle;
    },
    setFontSize: function(fntSize) {
        if(this._fontSize === fntSize) return;

        this._fontSize = fntSize;
        this._drawFontsize = fntSize;
        this._notifyLabelSkinDirty();
    },

    getFontSize: function() {
        return this._fontSize;
    },

    isOutlined: function() {
        return this._outlined;
    },

    setOutlined: function(value) {
        if(this._outlined === value) return;

        this._outlined = !!value;
        this._notifyLabelSkinDirty();
    },

    getOutlineColor: function() {
        return this._outlineColor;
    },

    setOutlineColor: function(value) {
        if(this._outlineColor === value) return;

        this._outlineColor = cc.color(value);
        this._notifyLabelSkinDirty();
    },

    setOutlineWidth: function(value) {
        if(this._outlineWidth === value) return;

        this._outlineWidth = value;
        this._notifyLabelSkinDirty();
    },

    getOutlineWidth: function() {
        return this._outlineWidth;
    },

    _updateWrapText: function(overflow){
        if ( overflow === _ccsg.Label.Overflow.RESIZE_HEIGHT) {
            this._isWrapText = true;
        }

        if (overflow === _ccsg.Label.Overflow.NONE) {
            this._isWrapText = false;
        }
    },


    _setOverflowBMFont: function () {
        if (this._labelType === _ccsg.Label.Type.BMFont) {

            if ( this._overFlow === _ccsg.Label.Overflow.RESIZE_HEIGHT) {
                this._setDimensions(this._labelDimensions.width, 0);
            }

            if (this._overFlow === _ccsg.Label.Overflow.NONE) {
                this._setDimensions(0, 0);
            }

            this._rescaleWithOriginalFontSize();
        }
    },

    setOverflow: function(overflow) {
        if (this._overFlow === overflow) return;

        this._overFlow = overflow;

        this._updateWrapText(this._overFlow);

        this._setOverflowBMFont();

        this._notifyLabelSkinDirty();
    },

    getOverflow: function() {
        return this._overFlow;
    },

    setSpacingX: function(spacing) {
        if (this._spacingX === spacing) return;
        this._spacingX = spacing;
    },

    setLineHeight: function(lineHeight) {
        if (this._lineHeight === lineHeight) return;

        this._lineHeight = lineHeight;
        this._notifyLabelSkinDirty();
    },
    setLineBreakWithoutSpace: function(lineBreakFlag) {
        if (this._lineBreakWithoutSpaces === lineBreakFlag) return;

        this._lineBreakWithoutSpaces = lineBreakFlag;
        this._notifyLabelSkinDirty();
    },
    getSpacingX: function() {
        return this._spacingX;
    },

    getLineHeight: function() {
        return this._lineHeight;
    },

    getBMFontLineHeight : function() {
        if(this._fontAtlas) {
            return this._fontAtlas._lineHeight;
        }
    },

    setFontFileOrFamily: function(fontHandle, textureUrl) {
        fontHandle = fontHandle || "Arial";
        var extName = cc.path.extname(fontHandle);

        this._resetBMFont();
        //specify font family name directly
        if (!extName) {
            this._fontHandle = fontHandle;
            this._labelType = _ccsg.Label.Type.SystemFont;
            this._blendFunc = cc.BlendFunc._alphaPremultiplied();
            this._renderCmd._needDraw = true;
            this._notifyLabelSkinDirty();
            this.emit('load');
            return;
        }

        if (extName === ".ttf") {
            this._labelType = _ccsg.Label.Type.TTF;
            this._blendFunc = cc.BlendFunc._alphaPremultiplied();
            this._renderCmd._needDraw = true;
            this._fontHandle = this._loadTTFFont(fontHandle);
        } else if (extName === ".fnt") {
            //todo add bmfont here
            this._labelType = _ccsg.Label.Type.BMFont;
            this._blendFunc = cc.BlendFunc._alphaNonPremultiplied();
            this._renderCmd._needDraw = false;
            this._initBMFontWithString(this._string, fontHandle, textureUrl);
        }
        this._notifyLabelSkinDirty();
    },

    cleanup: function () {
        this._super();

        //remove the created DIV and style due to loading @font-face
        if(this._fontFaceStyle) {
            if(document.body.contains(this._fontFaceStyle)) {
                document.body.removeChild(this._fontFaceStyle);
            }
        }

        if(this._preloadDiv) {
            if(document.body.contains(this._preloadDiv)) {
                document.body.removeChild(this._preloadDiv);
            }
        }
    },

    _loadTTFFont: function(fontHandle) {
        var ttfIndex = fontHandle.lastIndexOf(".ttf");
        if (ttfIndex === -1) return fontHandle;
        var slashPos = fontHandle.lastIndexOf("/");
        var fontFamilyName;
        if (slashPos === -1) fontFamilyName = fontHandle.substring(0, ttfIndex) + "_LABEL";
        else fontFamilyName = fontHandle.substring(slashPos + 1, ttfIndex) + "_LABEL";
        var self = this;
        if (window.FontFace) {
            var fontFace = new FontFace(fontFamilyName, "url('" + fontHandle + "')");
            fontFace.load().then(function(loadedFace) {
                document.fonts.add(loadedFace);
                self._notifyLabelSkinDirty();
                self.emit('load');
            });
        } else {
            //fall back implementations
            var doc = document,
                fontStyle = document.createElement("style");
            fontStyle.type = "text/css";
            doc.body.appendChild(fontStyle);
            this._fontFaceStyle = fontStyle;

            var fontStr = "";
            if (isNaN(fontFamilyName - 0))
                fontStr += "@font-face { font-family:" + fontFamilyName + "; src:";
            else
                fontStr += "@font-face { font-family:'" + fontFamilyName + "'; src:";

            fontStr += "url('" + fontHandle + "');";

            fontStyle.textContent = fontStr + "}";

            //<div style="font-family: PressStart;">.</div>
            var preloadDiv = document.createElement("div");
            var _divStyle = preloadDiv.style;
            _divStyle.fontFamily = fontFamilyName;
            preloadDiv.innerHTML = ".";
            _divStyle.position = "absolute";
            _divStyle.left = "-100px";
            _divStyle.top = "-100px";
            doc.body.appendChild(preloadDiv);
            this._preloadDiv = preloadDiv;
            fontStyle.onload = function() {
                fontStyle.onload = null;
                self.scheduleOnce(function() {
                    self._notifyLabelSkinDirty();
                    self.emit("load");
                },0.1);
            };

        }

        return fontFamilyName;
    },

    setContentSize: function(size, height) {
        if (this._overFlow === _ccsg.Label.Overflow.NONE) {
            return;
        }

        this._setDimensions(size, height);
    },

    setBlendFunc: function(src, dst) {
        var locBlendFunc = this._blendFunc;
        if (dst === undefined) {
            locBlendFunc.src = src.src;
            locBlendFunc.dst = src.dst;
        } else {
            locBlendFunc.src = src;
            locBlendFunc.dst = dst;
        }
    },


    getBlendFunc: function() {
        return new cc.BlendFunc(this._blendFunc.src, this._blendFunc.dst);
    },

    _setupBMFontOverflowMetrics: function(newWidth, newHeight) {
        if (this._overFlow === _ccsg.Label.Overflow.RESIZE_HEIGHT) {
            newHeight = 0;
        }

        if (this._overFlow === _ccsg.Label.Overflow.NONE) {
            newWidth = 0;
            newHeight = 0;
        }

        this._labelWidth = newWidth;
        this._labelHeight = newHeight;
        this._labelDimensions.width = newWidth;
        this._labelDimensions.height = newHeight;
        this._maxLineWidth = newWidth;
    },

    _updateLabel: function () {
        if (this._labelType === _ccsg.Label.Type.BMFont) {
            var contentSize = this._contentSize;
            var newWidth = contentSize.width;
            var newHeight = contentSize.height;
            this._setupBMFontOverflowMetrics(newWidth, newHeight);

            this._updateContent();
            this.setColor(this.color);
        } else if (this._labelType === _ccsg.Label.Type.TTF
                   || this._labelType === _ccsg.Label.Type.SystemFont) {
            this._renderCmd._bakeLabel();
        }
    },

    _notifyLabelSkinDirty: function() {
        if (CC_EDITOR) {
            this._updateLabel();
        } else {
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.textDirty
                                         |_ccsg.Node._dirtyFlags.contentDirty);
        }
    },
    _createRenderCmd: function() {
        if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            return new _ccsg.Label.WebGLRenderCmd(this);
        } else {
            return new _ccsg.Label.CanvasRenderCmd(this);
        }
    },

    getContentSize: function() {
        var locFlag = this._renderCmd._dirtyFlag;
        if (locFlag & _ccsg.Node._dirtyFlags.textDirty) {
            this._updateLabel();
            this._renderCmd._dirtyFlag &= ~_ccsg.Node._dirtyFlags.textDirty;
        }
        return _ccsg.Node.prototype.getContentSize.call(this);
    },
    _getWidth: function () {
        var locFlag = this._renderCmd._dirtyFlag;
        if (locFlag & _ccsg.Node._dirtyFlags.textDirty) {
            this._updateLabel();
            this._renderCmd._dirtyFlag &= ~_ccsg.Node._dirtyFlags.textDirty;
        }
        return _ccsg.Node.prototype._getWidth.call(this);
    },
    _getHeight: function () {
        var locFlag = this._renderCmd._dirtyFlag;
        if (locFlag & _ccsg.Node._dirtyFlags.textDirty) {
            this._updateLabel();
            this._renderCmd._dirtyFlag &= ~_ccsg.Node._dirtyFlags.textDirty;
        }
        return _ccsg.Node.prototype._getHeight.call(this);
    },
});

cc.BMFontHelper = {
    _alignText: function() {
        var ret = true;

        do {
            if (!this._spriteBatchNode) return true;


            this._textDesiredHeight = 0;
            this._linesWidth = [];
            if (!this._lineBreakWithoutSpaces) {
                this._multilineTextWrapByWord();
            } else {
                this._multilineTextWrapByChar();
            }

            this._computeAlignmentOffset();

            //shrink
            if (this._overFlow === _ccsg.Label.Overflow.SHRINK) {
                var fontSize = this.getFontSize();

                if (fontSize > 0 && this._isVerticalClamp()) {
                    this._shrinkLabelToContentSize(this._isVerticalClamp.bind(this));
                }
            }

            if (!this._updateQuads()) {
                ret = false;
                if (this._overFlow === _ccsg.Label.Overflow.SHRINK) {
                    this._shrinkLabelToContentSize(this._isHorizontalClamp.bind(this));
                }
                break;
            }
        } while (0);

        return ret;
    },

    _isHorizontalClamped : function(px, lineIndex){
        var wordWidth = this._linesWidth[lineIndex];
        var letterOverClamp = (px > this._contentSize.width || px < 0);

        if(!this._isWrapText){
            return letterOverClamp;
        }else{
            return (wordWidth > this._contentSize.width && letterOverClamp);
        }
    },

    _updateQuads: function() {
        var ret = true;

        this._spriteBatchNode.removeAllChildren();
        for (var ctr = 0; ctr < this._string.length; ++ctr) {
            if (this._lettersInfo[ctr]._valid) {
                var letterDef = this._fontAtlas._letterDefinitions[this._lettersInfo[ctr]._char];

                this._reusedRect.height = letterDef._height;
                this._reusedRect.width = letterDef._width;
                this._reusedRect.x = letterDef._u;
                this._reusedRect.y = letterDef._v;

                var py = this._lettersInfo[ctr]._positionY + this._letterOffsetY;

                if (this._labelHeight > 0) {
                    if (py > this._tailoredTopY) {
                        var clipTop = py - this._tailoredTopY;
                        this._reusedRect.y += clipTop;
                        this._reusedRect.height -= clipTop;
                        py = py - clipTop;
                    }

                    if (py - letterDef._height * this._bmfontScale < this._tailoredBottomY) {
                        this._reusedRect.height = (py < this._tailoredBottomY) ? 0 : (py - this._tailoredBottomY);
                    }
                }

                var lineIndex = this._lettersInfo[ctr]._lineIndex;
                var px = this._lettersInfo[ctr]._positionX + letterDef._width / 2 * this._bmfontScale + this._linesOffsetX[lineIndex];


                if (this._labelWidth > 0) {
                    if (this._isHorizontalClamped(px, lineIndex)) {
                        if (this._overFlow === _ccsg.Label.Overflow.CLAMP) {
                            this._reusedRect.width = 0;
                        } else if (this._overFlow === _ccsg.Label.Overflow.SHRINK) {
                            if (this._contentSize.width > letterDef._width) {
                                ret = false;
                                break;
                            } else {
                                this._reusedRect.width = 0;
                            }
                        }
                    }
                }


                if (this._reusedRect.height > 0 && this._reusedRect.width > 0) {
                    var fontChar = this.getChildByTag(ctr);
                    var locTexture = this._spriteBatchNode._texture;

                    if (!fontChar) {
                        fontChar = new _ccsg.Sprite();
                        fontChar.initWithTexture(locTexture);
                        fontChar.setAnchorPoint(cc.p(0, 1));
                    }

                    fontChar.setTextureRect(this._reusedRect, false, this._reusedRect.size);

                    var letterPositionX = this._lettersInfo[ctr]._positionX + this._linesOffsetX[this._lettersInfo[ctr]._lineIndex];
                    fontChar.setPosition(letterPositionX, py);

                    var index = this._spriteBatchNode.getChildrenCount();

                    this._lettersInfo[ctr]._atlasIndex = index;

                    this._updateLetterSpriteScale(fontChar);

                    this._spriteBatchNode.addChild(fontChar);

                }
            }
        }

        return ret;
    },

    _updateLetterSpriteScale: function(sprite) {
        if (this._labelType === _ccsg.Label.Type.BMFont && this._fontSize > 0) {
            sprite.setScale(this._bmfontScale);
        }
    },

    _recordPlaceholderInfo: function(letterIndex, char) {
        if (letterIndex >= this._lettersInfo.length) {
            var tmpInfo = new LetterInfo();
            this._lettersInfo.push(tmpInfo);
        }

        this._lettersInfo[letterIndex]._char = char;
        this._lettersInfo[letterIndex]._valid = false;
    },

    _recordLetterInfo: function(letterPosition, character, letterIndex, lineIndex) {
        if (letterIndex >= this._lettersInfo.length) {
            var tmpInfo = new LetterInfo();
            this._lettersInfo.push(tmpInfo);
        }
        character = character.charCodeAt(0);

        this._lettersInfo[letterIndex]._lineIndex = lineIndex;
        this._lettersInfo[letterIndex]._char = character;
        this._lettersInfo[letterIndex]._valid = this._fontAtlas._letterDefinitions[character]._validDefinition;
        this._lettersInfo[letterIndex]._positionX = letterPosition.x;
        this._lettersInfo[letterIndex]._positionY = letterPosition.y;
    },

    _setDimensions: function(size, height) {
        var newWidth = (typeof size.width === 'number') ? size.width : size;
        var newHeight = (typeof size.height === 'number') ? size.height : height;

        var oldSize = this.getContentSize();
        _ccsg.Node.prototype.setContentSize.call(this, size, height);

        if (newHeight !== oldSize.height || newWidth !== oldSize.width) {

            this._setupBMFontOverflowMetrics(newWidth, newHeight);

            if (this._drawFontsize > 0) {
                this._restoreFontSize();
            }

            this._notifyLabelSkinDirty();
        }
    },

    _restoreFontSize: function() {
        this._fontSize = this._drawFontsize;
    },

    _multilineTextWrap: function(nextTokenFunc) {
        var textLen = this.getStringLength();
        var lineIndex = 0;
        var nextTokenX = 0;
        var nextTokenY = 0;
        var longestLine = 0;
        var letterRight = 0;

        var lineSpacing = this._lineSpacing;
        var highestY = 0;
        var lowestY = 0;
        var letterDef = null;
        var letterPosition = cc.p(0, 0);

        this._updateBMFontScale();

        for (var index = 0; index < textLen;) {
            var character = this._string.charAt(index);
            if (character === "\n") {
                this._linesWidth.push(letterRight);
                letterRight = 0;
                lineIndex++;
                nextTokenX = 0;
                nextTokenY -= this._lineHeight * this._bmfontScale + lineSpacing;
                this._recordPlaceholderInfo(index, character);
                index++;
                continue;
            }

            var tokenLen = nextTokenFunc(this._string, index, textLen);
            var tokenHighestY = highestY;
            var tokenLowestY = lowestY;
            var tokenRight = letterRight;
            var nextLetterX = nextTokenX;
            var newLine = false;

            for (var tmp = 0; tmp < tokenLen; ++tmp) {
                var letterIndex = index + tmp;
                character = this._string.charAt(letterIndex);
                if (character === "\r") {
                    this._recordPlaceholderInfo(letterIndex, character);
                    continue;
                }
                letterDef = this._fontAtlas.getLetterDefinitionForChar(character);
                if (!letterDef) {
                    this._recordPlaceholderInfo(letterIndex, character);
                    console.log("Can't find letter definition in font file for letter:" + character);
                    continue;
                }

                var letterX = nextLetterX + letterDef._offsetX * this._bmfontScale;

                if (this._isWrapText
                    && this._maxLineWidth > 0
                    && nextTokenX > 0
                    && letterX + letterDef._width * this._bmfontScale > this._maxLineWidth
                    && !cc.TextUtils.isUnicodeSpace(character)) {
                    this._linesWidth.push(letterRight);
                    letterRight = 0;
                    lineIndex++;
                    nextTokenX = 0;
                    nextTokenY -= (this._lineHeight * this._bmfontScale + lineSpacing);
                    newLine = true;
                    break;
                } else {
                    letterPosition.x = letterX;
                }

                letterPosition.y = nextTokenY - letterDef._offsetY * this._bmfontScale;
                this._recordLetterInfo(letterPosition, character, letterIndex, lineIndex);

                if (letterIndex + 1 < this._horizontalKernings.length && letterIndex < textLen - 1) {
                    nextLetterX += this._horizontalKernings[letterIndex + 1];
                }

                nextLetterX += letterDef._xAdvance * this._bmfontScale + this._additionalKerning;

                tokenRight = letterPosition.x + letterDef._width * this._bmfontScale;

                if (tokenHighestY < letterPosition.y) {
                    tokenHighestY = letterPosition.y;
                }

                if (tokenLowestY > letterPosition.y - letterDef._height * this._bmfontScale) {
                    tokenLowestY = letterPosition.y - letterDef._height * this._bmfontScale;
                }

            } //end of for loop

            if (newLine) continue;

            nextTokenX = nextLetterX;
            letterRight = tokenRight;

            if (highestY < tokenHighestY) {
                highestY = tokenHighestY;
            }
            if (lowestY > tokenLowestY) {
                lowestY = tokenLowestY;
            }
            if (longestLine < letterRight) {
                longestLine = letterRight;
            }

            index += tokenLen;
        } //end of for loop

        this._linesWidth.push(letterRight);

        this._numberOfLines = lineIndex + 1;
        this._textDesiredHeight = this._numberOfLines * this._lineHeight * this._bmfontScale;
        if (this._numberOfLines > 1) {
            this._textDesiredHeight += (this._numberOfLines - 1) * this._lineSpacing;
        }

        var contentSize = cc.size(this._labelWidth, this._labelHeight);
        if (this._labelWidth <= 0) {
            contentSize.width = parseFloat(longestLine.toFixed(2));
        }
        if (this._labelHeight <= 0) {
            contentSize.height = parseFloat(this._textDesiredHeight.toFixed(2));
        }

        _ccsg.Node.prototype.setContentSize.call(this, contentSize);

        this._tailoredTopY = contentSize.height;
        this._tailoredBottomY = 0;
        if (highestY > 0) {
            this._tailoredTopY = contentSize.height + highestY;
        }
        if (lowestY < -this._textDesiredHeight) {
            this._tailoredBottomY = this._textDesiredHeight + lowestY;
        }

        return true;
    },

    _multilineTextWrapByWord: function() {
        return this._multilineTextWrap(this._getFirstWordLen.bind(this));
    },

    _multilineTextWrapByChar: function() {
        return this._multilineTextWrap(this._getFirstCharLen.bind(this));
    },

    _isVerticalClamp: function() {
        if (this._textDesiredHeight > this._contentSize.height) {
            return true;
        } else {
            return false;
        }
    },

    _isHorizontalClamp: function() {
        var letterClamp = false;

        for (var ctr = 0; ctr < this.getStringLength(); ++ctr) {
            if (this._lettersInfo[ctr]._valid) {
                var letterDef = this._fontAtlas._letterDefinitions[this._lettersInfo[ctr]._char];

                var px = this._lettersInfo[ctr]._positionX + letterDef._width / 2 * this._bmfontScale;
                var lineIndex = this._lettersInfo[ctr]._lineIndex;
                if (this._labelWidth > 0) {
                    if (!this._isWrapText) {
                        if(px > this._contentSize.width){
                            letterClamp = true;
                            break;
                        }
                    }else{
                        var wordWidth = this._linesWidth[lineIndex];
                        if(wordWidth > this._contentSize.width && (px > this._contentSize.width || px < 0)){
                            letterClamp = true;
                            break;
                        }
                    }
                }
            }
        }

        return letterClamp;
    },

    _shrinkLabelToContentSize: function(lambda) {
        var fontSize = this.getFontSize();

        var i = 0;
        var tempLetterDefinition = this._fontAtlas.cloneLetterDefinition();
        var originalLineHeight = this._lineHeight;
        var flag = true;

        while (lambda()) {
            ++i;

            var newFontSize = fontSize - i;
            flag = false;
            if (newFontSize <= 0) {
                break;
            }

            var scale = newFontSize / fontSize;
            this._fontAtlas.assignLetterDefinitions(tempLetterDefinition);
            this._fontAtlas.scaleFontLetterDefinition(scale);
            this._lineHeight = originalLineHeight * scale;
            if (!this._lineBreakWithoutSpaces) {
                this._multilineTextWrapByWord();
            } else {
                this._multilineTextWrapByChar();
            }
            this._computeAlignmentOffset();
        }

        this._lineHeight = originalLineHeight;
        this._fontAtlas.assignLetterDefinitions(tempLetterDefinition);

        if (!flag) {
            if (fontSize - i >= 0) {
                this._scaleFontSizeDown(fontSize - i);
            }
        }
    },

    _scaleFontSizeDown: function(fontSize) {
        var shouldUpdateContent = true;
        if (this._labelType === _ccsg.Label.Type.BMFont) {
            if (!fontSize) {
                fontSize = 0.1;
                shouldUpdateContent = false;
            }
            this._fontSize = fontSize;

            if (shouldUpdateContent) {
                this._updateContent();
            }
        }
    },

    _updateContent: function() {
        if (this._fontAtlas) {
            this._computeHorizontalKerningForText(this._string);
            this._alignText();
        }
    },


    _computeAlignmentOffset: function() {
        this._linesOffsetX = [];
        switch (this._hAlign) {
            case cc.TextAlignment.LEFT:
                for (var i = 0; i < this._numberOfLines; ++i) {
                    this._linesOffsetX.push(0);
                }
                break;
            case cc.TextAlignment.CENTER:
                this._linesWidth.forEach(function(lineWidth) {
                    this._linesOffsetX.push((this._contentSize.width - lineWidth) / 2);
                }.bind(this));
                break;
            case cc.TextAlignment.RIGHT:
                this._linesWidth.forEach(function(lineWidth) {
                    this._linesOffsetX.push(this._contentSize.width - lineWidth);
                }.bind(this));
                break;
            default:
                break;
        }

        switch (this._vAlign) {
            case cc.VerticalTextAlignment.TOP:
                this._letterOffsetY = this._contentSize.height;
                break;
            case cc.VerticalTextAlignment.CENTER:
                this._letterOffsetY = (this._contentSize.height + this._textDesiredHeight) / 2;
                break;
            case cc.VerticalTextAlignment.BOTTOM:
                this._letterOffsetY = this._textDesiredHeight;
                break;
            default:
                break;
        }
    },

    _getFirstCharLen: function() {
        return 1;
    },

    _getFirstWordLen: function(text, startIndex, textLen) {
        var character = text.charAt(startIndex);
        if (cc.TextUtils.isUnicodeCJK(character)
            || character === "\n"
            || cc.TextUtils.isUnicodeSpace(character)) {
            return 1;
        }

        var len = 1;
        var nextLetterX = 0;
        var letterDef;
        var letterX;
        for (var index = startIndex + 1; index < textLen; ++index) {
            character = text.charAt(index);
            //calculate the word boundary

            letterDef = this._fontAtlas.getLetterDefinitionForChar(character);
            if (!letterDef) {
                break;
            }
            letterX = nextLetterX + letterDef._offsetX * this._bmfontScale;

            if(letterX + letterDef._width * this._bmfontScale > this._maxLineWidth
               && !cc.TextUtils.isUnicodeSpace(character)
               && this._maxLineWidth > 0) {
                if(len >= 2) {
                    return len - 1;
                }
            }
            nextLetterX += letterDef._xAdvance * this._bmfontScale + this._additionalKerning;
            if (character === "\n"
                || cc.TextUtils.isUnicodeSpace(character)
                || cc.TextUtils.isUnicodeCJK(character)) {
                break;
            }
            len++;
        }

        return len;
    },

    _updateBMFontScale: function() {
        if (this._labelType === _ccsg.Label.Type.BMFont) {
            var originalFontSize = this._fontAtlas._fontSize;
            this._bmfontScale = this._fontSize / originalFontSize;
        } else {
            this._bmfontScale = 1;
        }

    },

    _initBMFontWithString: function(str, fntFile, textureUrl) {
        var self = this;
        if (self._config) {
            cc.log("_ccsg.Label._initBMFontWithString(): re-init is no longer supported");
            return false;
        }
        this._string = str;
        this._setBMFontFile(fntFile, textureUrl);
    },

    _createSpriteBatchNode: function(texture) {

        this._spriteBatchNode = new cc.SpriteBatchNode(texture, this._string.length);
        this._spriteBatchNode.setCascadeColorEnabled(true);
        this._spriteBatchNode.setCascadeOpacityEnabled(true);
        this.addChild(this._spriteBatchNode);

        this._updateContent();
        this.setColor(this.color);
    },
    //this method is used as createFontAtlas
    _createFontChars: function() {
        if (!this._config) {
            return;
        }

        this._fontAtlas = new cc.FontAtlas(this._config);

        if(!this._lineHeight){
            this._lineHeight = this._fontAtlas._lineHeight;
        }

        var locCfg = this._config;
        var locFontDict = locCfg.fontDefDictionary;

        for (var fontDef in locFontDict) {
            var letterDefinition = new FontLetterDefinition();

            var tempRect = locFontDict[fontDef].rect;

            letterDefinition._offsetX = locFontDict[fontDef].xOffset;
            letterDefinition._offsetY = locFontDict[fontDef].yOffset;
            letterDefinition._width = tempRect.width;
            letterDefinition._height = tempRect.height;
            letterDefinition._u = tempRect.x + this._imageOffset.x;
            letterDefinition._v = tempRect.y + this._imageOffset.y;
            //FIXME: only one texture supported for now
            letterDefinition._textureID = 0;
            letterDefinition._validDefinition = true;
            letterDefinition._xAdvance = locFontDict[fontDef].xAdvance;

            this._fontAtlas.addLetterDefinitions(fontDef, letterDefinition);
        }
    },

    _rescaleWithOriginalFontSize: function() {
        var renderingFontSize = this.getFontSize();
        if (this._drawFontsize - renderingFontSize >= 1 && this._overFlow === _ccsg.Label.Overflow.SHRINK) {
            if(this._labelType === _ccsg.Label.Type.BMFont) {
                this._scaleFontSizeDown(this._drawFontsize);
            } else {
                this._fontSize = this._drawFontsize;
            }
        }
    },

    _computeHorizontalKerningForText: function() {
        var stringLen = this.getStringLength();
        var locKerningDict = this._config.kerningDict;

        var prev = -1;
        for (var i = 0; i < stringLen; ++i) {
            var key = this._string.charCodeAt(i);
            var kerningAmount = locKerningDict[(prev << 16) | (key & 0xffff)] || 0;
            if (i < stringLen - 1) {
                this._horizontalKernings[i] = kerningAmount;
            } else {
                this._horizontalKernings[i] = 0;
            }
            prev = key;
        }
    },

    _setBMFontFile: function(filename, textureUrl) {
        if (filename) {
            this._fontHandle = filename;
            var self = this;
            if (this._labelType === _ccsg.Label.Type.BMFont) {
                this._resetBMFont();

                cc.loader.load(this._fontHandle, function(err, config) {
                    if (err) {
                        cc.log("_ccsg.Label._initBMFontWithString(): Impossible to create font. Please check file");
                    }

                    self._config = config;
                    self._createFontChars();
                    var texture = cc.textureCache.addImage(textureUrl || self._config.atlasName);
                    var locIsLoaded = texture.isLoaded();
                    self._textureLoaded = locIsLoaded;
                    if (!locIsLoaded) {
                        texture.once("load", function() {
                            var self = this;

                            if (!self._spriteBatchNode) {
                                self._createSpriteBatchNode(texture);
                            }
                            self._textureLoaded = true;
                            self.emit("load");
                        }, self);
                    } else {
                        if (!self._spriteBatchNode) {
                            self._createSpriteBatchNode(texture);
                            self.emit("load");
                        }
                    }
                });
            }
        }
    }
};


var _p = _ccsg.Label.prototype;
cc.js.addon(_p, EventTarget.prototype);
cc.js.mixin(_p, cc.BMFontHelper);

_ccsg.Label.Type = cc.Enum({
    TTF: 0,
    BMFont: 1,
    SystemFont: 2
});
_ccsg.Label.Overflow = cc.Enum({
    NONE: 0,
    CLAMP: 1,
    SHRINK: 2,
    RESIZE_HEIGHT: 3
});


// fireball#2856

var labelPro = _ccsg.Label.prototype;
Object.defineProperty(labelPro, 'width', {
    get: labelPro._getWidth,
    set: _ccsg.Node.prototype._setWidth
});

Object.defineProperty(labelPro, 'height', {
    get: labelPro._getHeight,
    set: _ccsg.Node.prototype._setHeight
});

/*global dirtyFlags */

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 ****************************************************************************/
(function () {
    _ccsg.Label.TTFLabelBaker = function () {};

    var proto = _ccsg.Label.TTFLabelBaker.prototype = Object.create(Object.prototype);

    proto.updateStatus = function () {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        var colorDirty = locFlag & flags.colorDirty,
            opacityDirty = locFlag & flags.opacityDirty;

        if (colorDirty) 
            this._updateDisplayColor();
        if (opacityDirty)
            this._updateDisplayOpacity();

        if(locFlag & dirtyFlags.contentDirty) {
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
            this._dirtyFlag &= ~dirtyFlags.contentDirty;
        }

        if (colorDirty || opacityDirty || (locFlag & flags.textDirty)) {
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
            this._rebuildLabelSkin();
        }

        if (this._dirtyFlag & flags.transformDirty) {
            this.transform(this.getParentRenderCmd(), true);
            this._dirtyFlag &= ~flags.transformDirty;
        }
    };


    proto._syncStatus = function (parentCmd) {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        var parentNode = parentCmd ? parentCmd._node : null;

        if (parentNode && parentNode._cascadeColorEnabled && (parentCmd._dirtyFlag & flags.colorDirty))
            locFlag |= flags.colorDirty;

        if (parentNode && parentNode._cascadeOpacityEnabled && (parentCmd._dirtyFlag & flags.opacityDirty))
            locFlag |= flags.opacityDirty;

        if (parentCmd && (parentCmd._dirtyFlag & flags.transformDirty))
            locFlag |= flags.transformDirty;

        var colorDirty = locFlag & flags.colorDirty,
            opacityDirty = locFlag & flags.opacityDirty;

        this._dirtyFlag = locFlag;

        if (colorDirty)
            this._syncDisplayColor();
        if (opacityDirty)
            this._syncDisplayOpacity();

        if (colorDirty || opacityDirty || (this._dirtyFlag & flags.textDirty)) {
            this._rebuildLabelSkin();
        }

        if (this._dirtyFlag & flags.transformDirty) {
            this.transform(parentCmd);
        }
    };

    proto._getLineHeight = function () {
        var nodeSpacingY = this._node.getLineHeight();
        var node = this._node;
        if (nodeSpacingY === 0) {
            nodeSpacingY = node._fontSize;
        } else {
            nodeSpacingY = nodeSpacingY * node._fontSize / this._drawFontsize;
        }

        var lineHeight = nodeSpacingY | 0;
        return lineHeight;
    };

    proto._constructFontDesc = function () {
        var node = this._node;
        var fontDesc = node._fontSize.toString() + 'px ';
        var fontFamily = node._fontHandle.length === 0 ? 'serif' : node._fontHandle;
        fontDesc = fontDesc + fontFamily;
        if(node._isBold) {
            fontDesc = "bold " + fontDesc;
        }

        return fontDesc;
    };

    proto._measureText = function (ctx) {
        return function(string) {
            return ctx.measureText(string).width;
        };
    };


    proto._calculateLabelFont = function() {
        var node = this._node;
        var paragraphedStrings = node._string.split('\n');

        node._fontSize = node._drawFontsize;
        var fontDesc = this._constructFontDesc();
        this._labelContext.font = fontDesc;

        var paragraphLength = this._calculateParagraphLength(paragraphedStrings, this._labelContext);

        if (_ccsg.Label.Overflow.SHRINK === node._overFlow) {
            this._splitedStrings = paragraphedStrings;
            var i = 0;
            var totalHeight = 0;
            var maxLength = 0;

            if (node._isWrapText) {

                var canvasWidthNoMargin = this._canvasSize.width - 2 * this._getMargin();
                var canvasHeightNoMargin = this._canvasSize.height - 2 * this._getMargin();
                if(canvasWidthNoMargin < 0 || canvasHeightNoMargin < 0) {
                    fontDesc = this._constructFontDesc();
                    this._labelContext.font = fontDesc;
                    return fontDesc;
                }
                totalHeight = canvasHeightNoMargin + 1;
                maxLength = canvasWidthNoMargin + 1;
                var actualFontSize = this._drawFontsize + 1;
                var textFragment = "";
                var tryDivideByTwo = true;
                var startShrinkFontSize = actualFontSize | 0;

                while (totalHeight > canvasHeightNoMargin || maxLength > canvasWidthNoMargin) {
                    if (tryDivideByTwo) {
                        actualFontSize = (startShrinkFontSize / 2) | 0;
                    } else {
                        actualFontSize = startShrinkFontSize - 1;
                        startShrinkFontSize = actualFontSize;
                    }
                    if(actualFontSize <= 0) {
                        cc.log("Label font size can't be shirnked less than 0!");
                        break;
                    }
                    node._fontSize = actualFontSize;
                    fontDesc = this._constructFontDesc();
                    this._labelContext.font = fontDesc;

                    this._splitedStrings = [];
                    totalHeight = 0;
                    for (i = 0; i < paragraphedStrings.length; ++i) {
                        var j = 0;
                        var allWidth = this._labelContext.measureText(paragraphedStrings[i]).width;
                        textFragment = cc.TextUtils.fragmentText(paragraphedStrings[i],
                                                                 allWidth,
                                                                 canvasWidthNoMargin,
                                                                 this._measureText(this._labelContext));
                        while(j < textFragment.length) {
                            var measureWidth = this._labelContext.measureText(textFragment[j]).width;
                            maxLength = measureWidth;
                            totalHeight += this._getLineHeight();
                            ++j;
                        }
                        this._splitedStrings = this._splitedStrings.concat(textFragment);
                    }

                    if(tryDivideByTwo) {
                        if (totalHeight > canvasHeightNoMargin) {
                            startShrinkFontSize = actualFontSize | 0;
                        } else {
                            tryDivideByTwo = false;
                            totalHeight = canvasHeightNoMargin + 1;
                        }
                    }
                }
            }
            else {
                totalHeight = paragraphedStrings.length * this._getLineHeight();

                for (i = 0; i < paragraphedStrings.length; ++i) {
                    if (maxLength < paragraphLength[i]) {
                        maxLength = paragraphLength[i];
                    }
                }
                var scaleX = (this._canvasSize.width - 2 * this._getMargin()) / maxLength;
                var scaleY = this._canvasSize.height / totalHeight;

                node._fontSize = (this._drawFontsize * Math.min(1, scaleX, scaleY)) | 0;
                fontDesc = this._constructFontDesc();
                this._labelContext.font = fontDesc;
            }
        }

        return fontDesc;
    };

    proto._getMargin = function() {
        return (this._node && this._node._margin) || 0;
    };

    proto._calculateParagraphLength = function(paragraphedStrings, ctx) {
        var paragraphLength = [];

        for (var i = 0; i < paragraphedStrings.length; ++i) {
            var textMetric = ctx.measureText(paragraphedStrings[i]);
            paragraphLength.push(textMetric.width);
        }

        return paragraphLength;
    };

    proto._calculateCanvasSize = function() {
        var node = this._node;
        var canvasWidth = node._contentSize.width;
        var canvasHeight = node._contentSize.height;
        if (canvasWidth <= 0) canvasWidth = 1;
        if (canvasHeight <= 0) canvasHeight = 1;

        return cc.size(canvasWidth, canvasHeight);
    };

    proto._calculateSplitedStrings = function() {
        var node = this._node;

        var paragraphedStrings = node._string.split('\n');

        var i;
        if (node._isWrapText) {
            this._splitedStrings = [];
            var canvasWidthNoMargin = this._canvasSize.width - 2 * this._getMargin();
            for (i = 0; i < paragraphedStrings.length; ++i) {
                var allWidth = this._labelContext.measureText(paragraphedStrings[i]).width;
                var textFragment = cc.TextUtils.fragmentText(paragraphedStrings[i],
                                                             allWidth,
                                                             canvasWidthNoMargin,
                                                             this._measureText(this._labelContext));
                this._splitedStrings = this._splitedStrings.concat(textFragment);
            }
        }
        else {
            this._splitedStrings = paragraphedStrings;
        }

    };

    proto._updateLabelDimensions = function() {
        var node = this._node;
        var paragraphedStrings = node._string.split('\n');
        var i;
        var ctx = this._labelContext;

        if (_ccsg.Label.Overflow.RESIZE_HEIGHT === node._overFlow) {
            this._canvasSize.height = this._splitedStrings.length * this._getLineHeight();
            _ccsg.Node.prototype.setContentSize.call(node, this._canvasSize);
        }
        else if(_ccsg.Label.Overflow.NONE === node._overFlow) {
            this._splitedStrings = paragraphedStrings;
            var canvasSizeX = 0;
            var canvasSizeY = 0;
            for (i = 0; i < paragraphedStrings.length; ++i) {
                var paraLength = ctx.measureText(paragraphedStrings[i]).width;
                canvasSizeX = canvasSizeX > paraLength ? canvasSizeX : paraLength;
            }
            canvasSizeY = this._splitedStrings.length * this._getLineHeight();

            this._canvasSize.width = parseFloat(canvasSizeX.toFixed(2)) + 2 * this._getMargin();
            this._canvasSize.height = parseFloat(canvasSizeY.toFixed(2));
            if(node._isItalic) {
                //0.0174532925 = 3.141592653 / 180
                this._canvasSize.width += node._drawFontsize * Math.tan(12 * 0.0174532925);
            }
            _ccsg.Node.prototype.setContentSize.call(node, this._canvasSize);
        }

        this._labelCanvas.width = this._canvasSize.width;
        this._labelCanvas.height = this._canvasSize.height;

    };

    proto._calculateFillTextStartPosition = function() {
        var node = this._node;
        var lineHeight = this._getLineHeight();
        var lineCount = this._splitedStrings.length;
        var labelX;
        var firstLinelabelY;

        if (cc.TextAlignment.RIGHT === node._hAlign) {
            labelX = this._canvasSize.width - this._getMargin();
        }
        else if (cc.TextAlignment.CENTER === node._hAlign) {
            labelX = this._canvasSize.width / 2;
        }
        else {
            labelX = 0 + this._getMargin();
        }

        if (cc.VerticalTextAlignment.TOP === node._vAlign) {
            firstLinelabelY = 0;
        }
        else if (cc.VerticalTextAlignment.CENTER === node._vAlign) {
            firstLinelabelY = this._canvasSize.height / 2 - lineHeight * (lineCount - 1) / 2;
        }
        else {
            firstLinelabelY = this._canvasSize.height - lineHeight * (lineCount - 1);
        }

        return cc.p(labelX, firstLinelabelY);
    };

    proto._calculateTextBaseline = function() {
        var node = this._node;
        var hAlign;
        var vAlign;

        if (cc.TextAlignment.RIGHT === node._hAlign) {
            hAlign = 'right';
        }
        else if (cc.TextAlignment.CENTER === node._hAlign) {
            hAlign = 'center';
        }
        else {
            hAlign = 'left';
        }

        this._labelContext.textAlign = hAlign;
        if (cc.VerticalTextAlignment.TOP === node._vAlign) {
            vAlign = 'top';
        }
        else if (cc.VerticalTextAlignment.CENTER === node._vAlign) {
            vAlign = 'middle';
        }
        else {
            vAlign = 'bottom';
        }
        this._labelContext.textBaseline = vAlign;
    };

    proto._bakeLabel = function () {
        var node = this._node;
        this._drawFontsize = node._drawFontsize;
        this._canvasSize = this._calculateCanvasSize();

        //Note: don't change the calling order of the following 3 statements
        this._fontDesc = this._calculateLabelFont();
        this._calculateSplitedStrings();
        this._updateLabelDimensions();

        this._calculateTextBaseline();

        this._updateTexture();

    };


    proto._calculateUnderlineStartPosition = function () {
        var node = this._node;
        var lineHeight = this._getLineHeight();
        var lineCount = this._splitedStrings.length;
        var labelX;
        var firstLinelabelY;

        labelX = 0 + this._getMargin();

        if (cc.VerticalTextAlignment.TOP === node._vAlign) {
            firstLinelabelY = node._fontSize;
        }
        else if (cc.VerticalTextAlignment.CENTER === node._vAlign) {
            firstLinelabelY = this._canvasSize.height / 2 - lineHeight * (lineCount - 1) / 2 + node._fontSize / 2;
        }
        else {
            firstLinelabelY = this._canvasSize.height - lineHeight * (lineCount - 1);
        }

        return cc.p(labelX, firstLinelabelY);
    };

    proto._updateTexture = function() {
        this._labelContext.clearRect(0, 0, this._labelCanvas.width, this._labelCanvas.height);

        this._labelContext.font = this._fontDesc;

        var startPosition = this._calculateFillTextStartPosition();
        var lineHeight = this._getLineHeight();
        //use round for line join to avoid sharp intersect point
        this._labelContext.lineJoin = 'round';
        var color = this._displayedColor;
        this._labelContext.fillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
        var underlineStartPosition;

        //do real rendering
        for (var i = 0; i < this._splitedStrings.length; ++i) {
            if(this._node.isOutlined())
            {
                var strokeColor = this._node.getOutlineColor() || cc.color(255,255,255,255);
                this._labelContext.globalCompositeOperation = 'source-over';
                this._labelContext.strokeStyle = 'rgb(' + strokeColor.r + ',' + strokeColor.g + ',' + strokeColor.b + ')';
                this._labelContext.lineWidth = this._node.getOutlineWidth() * 2;
                this._labelContext.strokeText(this._splitedStrings[i],
                                              startPosition.x, startPosition.y + i * lineHeight);
            }
            this._labelContext.fillText(this._splitedStrings[i], startPosition.x, startPosition.y + i * lineHeight);
            if(this._node._isUnderline) {
                underlineStartPosition = this._calculateUnderlineStartPosition();
                this._labelContext.save();
                this._labelContext.beginPath();
                this._labelContext.lineWidth = this._node._fontSize / 8;
                this._labelContext.strokeStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
                this._labelContext.moveTo(underlineStartPosition.x, underlineStartPosition.y + i * lineHeight - 1);
                this._labelContext.lineTo(underlineStartPosition.x + this._labelCanvas.width, underlineStartPosition.y + i * lineHeight - 1);
                this._labelContext.stroke();
                this._labelContext.restore();
            }
        }

        this._texture._textureLoaded = false;
        this._texture.handleLoadedTexture(true);
    };

    proto._rebuildLabelSkin = function () {
        this._dirtyFlag &= ~_ccsg.Node._dirtyFlags.textDirty;
        var node = this._node;
        node._updateLabel();
    };
})();

(function () {
    _ccsg.Label.CanvasRenderCmd = function (renderableObject) {
        _ccsg.Node.CanvasRenderCmd.call(this, renderableObject);
        this._needDraw = true;
        this._texture = new cc.Texture2D();
        this._labelCanvas = document.createElement('canvas');
        this._labelCanvas.width = 1;
        this._labelCanvas.height = 1;
        this._labelContext = this._labelCanvas.getContext('2d');
        this._texture.initWithElement(this._labelCanvas);
        this._splitedStrings = null;
    };

    var proto = _ccsg.Label.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
    cc.js.mixin(proto, _ccsg.Label.TTFLabelBaker.prototype);

    proto.constructor = _ccsg.Label.CanvasRenderCmd;

    proto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);

        var bb = this._currentRegion,
            l = bb._minX, r = bb._maxX, b = bb._minY, t = bb._maxY,
            rect = cc.visibleRect,
            vl = rect.left.x, vr = rect.right.x, vt = rect.top.y, vb = rect.bottom.y;
        if (r < vl || l > vr || t < vb || b > vt) {
            this._needDraw = false;
        }
        else {
            this._needDraw = true;
        }
    };

    proto.rendering = function (ctx, scaleX, scaleY) {
        var node = this._node;

        if (node._labelType === _ccsg.Label.Type.TTF ||
            node._labelType === _ccsg.Label.Type.SystemFont) {
            var locDisplayOpacity = this._displayedOpacity;
            var alpha = locDisplayOpacity / 255;

            if (locDisplayOpacity === 0)
                return;

            var wrapper = ctx || cc._renderContext,
                context = wrapper.getContext();
            wrapper.setTransform(this._worldTransform, scaleX, scaleY);
            wrapper.setCompositeOperation(_ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(node._blendFunc));
            wrapper.setGlobalAlpha(alpha);

            if (this._texture) {
                var sx, sy, sw, sh;
                var x, y, w, h;

                x = 0;
                y = -this._node._contentSize.height;
                w = this._node._contentSize.width;
                h = this._node._contentSize.height;


                var textureWidth = this._texture.getPixelWidth();
                var textureHeight = this._texture.getPixelHeight();

                sx = 0;
                sy = 0;
                sw = textureWidth;
                sh = textureHeight;

                var image = this._texture._htmlElementObj;
                if (this._texture._pattern !== '') {
                    wrapper.setFillStyle(context.createPattern(image, this._texture._pattern));
                    context.fillRect(x, y, w, h);
                }
                else {
                    if(sw !== 0 && sh !== 0 && w !== 0 && h !== 0) {
                        context.drawImage(image,
                            sx, sy, sw, sh,
                            x, y, w, h);
                    }
                }
            }
            cc.g_NumberOfDraws = cc.g_NumberOfDraws + 1;
        }

    };

})();

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 Use any of these editors to generate BMFonts:
 http://glyphdesigner.71squared.com/ (Commercial, Mac OS X)
 http://www.n4te.com/hiero/hiero.jnlp (Free, Java)
 http://slick.cokeandcode.com/demos/hiero.jnlp (Free, Java)
 http://www.angelcode.com/products/bmfont/ (Free, Windows only)
 ****************************************************************************/

_ccsg.Label.WebGLRenderCmd = function(renderableObject){
    _ccsg.Node.WebGLRenderCmd.call(this, renderableObject);
    this._needDraw = true;

    this._texture = new cc.Texture2D();
    this._labelCanvas = document.createElement("canvas");
    this._texture.initWithElement(this._labelCanvas);
    this._labelContext = this._labelCanvas.getContext("2d");

    this._labelCanvas.width = 1;
    this._labelCanvas.height = 1;
    this._splitedStrings = null;
    this._drawFontsize = 0;

    this._vertices = [
        {x: 0, y: 0, u: 0, v: 0}, // tl
        {x: 0, y: 0, u: 0, v: 1}, // bl
        {x: 0, y: 0, u: 1, v: 0}, // tr
        {x: 0, y: 0, u: 1, v: 1}  // br
    ];
    this._color = new Uint32Array(1);
    this._dirty = false;

    this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST);
};

var proto = _ccsg.Label.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
cc.js.mixin(proto, _ccsg.Label.TTFLabelBaker.prototype);

proto.constructor = _ccsg.Label.WebGLRenderCmd;

proto._updateDisplayOpacity = function (parentOpacity) {
    _ccsg.Node.WebGLRenderCmd.prototype._updateDisplayOpacity.call(this, parentOpacity);
    this._rebuildLabelSkin();
};

proto.transform = function (parentCmd, recursive) {
    this.originTransform(parentCmd, recursive);

    var node = this._node,
        lx = 0, rx = this._labelCanvas.width,
        by = 0, ty = this._labelCanvas.height,
        wt = this._worldTransform;

    var vert = this._vertices;
    vert[0].x = lx * wt.a + ty * wt.c + wt.tx; // tl
    vert[0].y = lx * wt.b + ty * wt.d + wt.ty;
    vert[1].x = lx * wt.a + by * wt.c + wt.tx; // bl
    vert[1].y = lx * wt.b + by * wt.d + wt.ty;
    vert[2].x = rx * wt.a + ty * wt.c + wt.tx; // tr
    vert[2].y = rx * wt.b + ty * wt.d + wt.ty;
    vert[3].x = rx * wt.a + by * wt.c + wt.tx; // br
    vert[3].y = rx * wt.b + by * wt.d + wt.ty;

    if (!node._string || (node._labelType !== _ccsg.Label.Type.TTF &&
       node._labelType !== _ccsg.Label.Type.SystemFont)) {
        // No culling for bmfont
        return;
    }

    var rect = cc.visibleRect,
        vl = rect.left.x, vr = rect.right.x, vt = rect.top.y, vb = rect.bottom.y;
    if (((vert[0].x-vl) & (vert[1].x-vl) & (vert[2].x-vl) & (vert[3].x-vl)) >> 31 || // All outside left
        ((vr-vert[0].x) & (vr-vert[1].x) & (vr-vert[2].x) & (vr-vert[3].x)) >> 31 || // All outside right
        ((vert[0].y-vb) & (vert[1].y-vb) & (vert[2].y-vb) & (vert[3].y-vb)) >> 31 || // All outside bottom
        ((vt-vert[0].y) & (vt-vert[1].y) & (vt-vert[2].y) & (vt-vert[3].y)) >> 31)   // All outside top
    {
        this._needDraw = false;
    }
    else {
        this._needDraw = true;
    }
};

proto.uploadData = function (f32buffer, ui32buffer, vertexDataOffset) {
    var node = this._node;
    if (!node._string || (node._labelType !== _ccsg.Label.Type.TTF &&
       node._labelType !== _ccsg.Label.Type.SystemFont))
        return 0;

    // Fill in vertex data with quad information (4 vertices for sprite)
    // Use 255 because color has been set when baking label
    // premultiplied alpha is used for labelTTF and system font
    var opacity = this._displayedOpacity;
    this._color[0] = ((opacity<<24) | (opacity<<16) | (opacity<<8) | opacity);

    var z = node._vertexZ;

    var vertices = this._vertices;
    var i, len = vertices.length, vertex, offset = vertexDataOffset;
    for (i = 0; i < len; ++i) {
        vertex = vertices[i];
        f32buffer[offset] = vertex.x;
        f32buffer[offset + 1] = vertex.y;
        f32buffer[offset + 2] = z;
        ui32buffer[offset + 3] = this._color[0];
        f32buffer[offset + 4] = vertex.u;
        f32buffer[offset + 5] = vertex.v;
        offset += 6;
    }

    return len;
};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (c) 2012 Scott Lembcke and Howling Moon Software

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var __t = function (v) {
    return {u: v.x, v: v.y};
};

/**
 * <p>CCDrawNode                                                <br/>
 * Node that draws dots, segments and polygons.                        <br/>
 * Faster than the "drawing primitives" since they it draws everything in one single batch.</p>
 * @class
 * @name cc.DrawNode
 * @extends _ccsg.Node
 */
cc.DrawNode = _ccsg.Node.extend(/** @lends cc.DrawNode# */{
//TODO need refactor

    _buffer:null,
    _blendFunc:null,
    _lineWidth: 1,
    _drawColor: null,

    /**
     * Gets the blend func
     * @returns {Object}
     */
    getBlendFunc: function () {
        return this._blendFunc;
    },

    /**
     * Set the blend func
     * @param blendFunc
     * @param dst
     */
    setBlendFunc: function (blendFunc, dst) {
        if (dst === undefined) {
            this._blendFunc.src = blendFunc.src;
            this._blendFunc.dst = blendFunc.dst;
        } else {
            this._blendFunc.src = blendFunc;
            this._blendFunc.dst = dst;
        }
    },

    /**
     * line width setter
     * @param {Number} width
     */
    setLineWidth: function (width) {
        this._lineWidth = width;
    },

    /**
     * line width getter
     * @returns {Number}
     */
    getLineWidth: function () {
        return this._lineWidth;
    },

    /**
     * draw color setter
     * @param {cc.Color} color
     */
    setDrawColor: function (color) {
        var locDrawColor = this._drawColor;
        locDrawColor.r = color.r;
        locDrawColor.g = color.g;
        locDrawColor.b = color.b;
        locDrawColor.a = (color.a == null) ? 255 : color.a;
    },

    /**
     * draw color getter
     * @returns {cc.Color}
     */
    getDrawColor: function () {
        return  cc.color(this._drawColor.r, this._drawColor.g, this._drawColor.b, this._drawColor.a);
    }
});

cc.DrawNode.TYPE_DOT = 0;
cc.DrawNode.TYPE_SEGMENT = 1;
cc.DrawNode.TYPE_POLY = 2;

cc.game.once(cc.game.EVENT_RENDERER_INITED, function () {
    if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {

        cc._DrawNodeElement = function (type, verts, fillColor, lineWidth, lineColor, lineCap, isClosePolygon, isFill, isStroke) {
            var _t = this;
            _t.type = type;
            _t.verts = verts || null;
            _t.fillColor = fillColor || null;
            _t.lineWidth = lineWidth || 0;
            _t.lineColor = lineColor || null;
            _t.lineCap = lineCap || "butt";
            _t.isClosePolygon = isClosePolygon || false;
            _t.isFill = isFill || false;
            _t.isStroke = isStroke || false;
        };

        cc.js.mixin(cc.DrawNode.prototype, /** @lends cc.DrawNode# */{
            _className:"DrawNodeCanvas",

            /**
             * <p>The cc.DrawNodeCanvas's constructor. <br/>
             * This function will automatically be invoked when you create a node using new construction: "var node = new cc.DrawNodeCanvas()".<br/>
             * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
             */
            ctor: function () {
                _ccsg.Node.prototype.ctor.call(this);
                var locCmd = this._renderCmd;
                locCmd._buffer = this._buffer = [];
                locCmd._drawColor = this._drawColor = cc.color(255, 255, 255, 255);
                locCmd._blendFunc = this._blendFunc = new cc.BlendFunc(cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA);

                this.init();
            },

            /**
             * draws a rectangle given the origin and destination point measured in points.
             * @param {cc.Vec2} origin
             * @param {cc.Vec2} destination
             * @param {cc.Color} fillColor
             * @param {Number} lineWidth
             * @param {cc.Color} lineColor
             */
            drawRect: function (origin, destination, fillColor, lineWidth, lineColor) {
                lineWidth = (lineWidth == null) ? this._lineWidth : lineWidth;
                lineColor = lineColor || this.getDrawColor();
                if(lineColor.a == null)
                    lineColor.a = 255;

                var vertices = [
                    origin,
                    cc.p(destination.x, origin.y),
                    destination,
                    cc.p(origin.x, destination.y)
                ];
                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = lineColor;
                element.isClosePolygon = true;
                element.isStroke = true;
                element.lineCap = "butt";
                element.fillColor = fillColor;
                if (fillColor) {
                    if(fillColor.a == null)
                        fillColor.a = 255;
                    element.isFill = true;
                }
                this._buffer.push(element);
            },

            /**
             * draws a circle given the center, radius and number of segments.
             * @override
             * @param {cc.Vec2} center center of circle
             * @param {Number} radius
             * @param {Number} angle angle in radians
             * @param {Number} segments
             * @param {Boolean} drawLineToCenter
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawCircle: function (center, radius, angle, segments, drawLineToCenter, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;

                var coef = 2.0 * Math.PI / segments;
                var vertices = [];
                for (var i = 0; i <= segments; i++) {
                    var rads = i * coef;
                    var j = radius * Math.cos(rads + angle) + center.x;
                    var k = radius * Math.sin(rads + angle) + center.y;
                    vertices.push(cc.p(j, k));
                }
                if (drawLineToCenter) {
                    vertices.push(cc.p(center.x, center.y));
                }

                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isClosePolygon = true;
                element.isStroke = true;
                this._buffer.push(element);
            },

            /**
             * draws a quad bezier path
             * @override
             * @param {cc.Vec2} origin
             * @param {cc.Vec2} control
             * @param {cc.Vec2} destination
             * @param {Number} segments
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawQuadBezier: function (origin, control, destination, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;

                var vertices = [], t = 0.0;
                for (var i = 0; i < segments; i++) {
                    var x = Math.pow(1 - t, 2) * origin.x + 2.0 * (1 - t) * t * control.x + t * t * destination.x;
                    var y = Math.pow(1 - t, 2) * origin.y + 2.0 * (1 - t) * t * control.y + t * t * destination.y;
                    vertices.push(cc.p(x, y));
                    t += 1.0 / segments;
                }
                vertices.push(cc.p(destination.x, destination.y));

                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isStroke = true;
                element.lineCap = "round";
                this._buffer.push(element);
            },

            /**
             * draws a cubic bezier path
             * @override
             * @param {cc.Vec2} origin
             * @param {cc.Vec2} control1
             * @param {cc.Vec2} control2
             * @param {cc.Vec2} destination
             * @param {Number} segments
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawCubicBezier: function (origin, control1, control2, destination, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;

                var vertices = [], t = 0;
                for (var i = 0; i < segments; i++) {
                    var x = Math.pow(1 - t, 3) * origin.x + 3.0 * Math.pow(1 - t, 2) * t * control1.x + 3.0 * (1 - t) * t * t * control2.x + t * t * t * destination.x;
                    var y = Math.pow(1 - t, 3) * origin.y + 3.0 * Math.pow(1 - t, 2) * t * control1.y + 3.0 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
                    vertices.push(cc.p(x, y));
                    t += 1.0 / segments;
                }
                vertices.push(cc.p(destination.x, destination.y));

                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isStroke = true;
                element.lineCap = "round";
                this._buffer.push(element);
            },

            /**
             * draw a CatmullRom curve
             * @override
             * @param {Array} points
             * @param {Number} segments
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawCatmullRom: function (points, segments, lineWidth, color) {
                this.drawCardinalSpline(points, 0.5, segments, lineWidth, color);
            },

            /**
             * draw a cardinal spline path
             * @override
             * @param {Array} config
             * @param {Number} tension
             * @param {Number} segments
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawCardinalSpline: function (config, tension, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if(color.a == null)
                    color.a = 255;

                var vertices = [], p, lt, deltaT = 1.0 / config.length;
                for (var i = 0; i < segments + 1; i++) {
                    var dt = i / segments;
                    // border
                    if (dt === 1) {
                        p = config.length - 1;
                        lt = 1;
                    } else {
                        p = 0 | (dt / deltaT);
                        lt = (dt - deltaT * p) / deltaT;
                    }

                    // Interpolate
                    var newPos = cc.cardinalSplineAt(
                        cc.getControlPointAt(config, p - 1),
                        cc.getControlPointAt(config, p - 0),
                        cc.getControlPointAt(config, p + 1),
                        cc.getControlPointAt(config, p + 2),
                        tension, lt);
                    vertices.push(newPos);
                }

                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isStroke = true;
                element.lineCap = "round";
                this._buffer.push(element);
            },

            /**
             * draw a dot at a position, with a given radius and color
             * @param {cc.Vec2} pos
             * @param {Number} radius
             * @param {cc.Color} color
             */
            drawDot: function (pos, radius, color) {
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_DOT);
                element.verts = [pos];
                element.lineWidth = radius;
                element.fillColor = color;
                this._buffer.push(element);
            },

            /**
             * draws an array of points.
             * @override
             * @param {Array} points point of array
             * @param {Number} radius
             * @param {cc.Color} color
             */
            drawDots: function(points, radius, color){
                if(!points || points.length == 0)
                    return;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                for(var i = 0, len = points.length; i < len; i++)
                   this.drawDot(points[i], radius, color);
            },

            /**
             * draw a segment with a radius and color
             * @param {cc.Vec2} from
             * @param {cc.Vec2} to
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawSegment: function (from, to, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = [from, to];
                element.lineWidth = lineWidth * 2;
                element.lineColor = color;
                element.isStroke = true;
                element.lineCap = "round";
                this._buffer.push(element);
            },

            /**
             * draw a polygon with a fill color and line color without copying the vertex list
             * @param {Array} verts
             * @param {cc.Color} fillColor
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawPoly_: function (verts, fillColor, lineWidth, color, notClosePoly) {
                lineWidth = (lineWidth == null ) ? this._lineWidth : lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                
                element.verts = verts;
                element.fillColor = fillColor;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isClosePolygon = !notClosePoly;
                element.isStroke = true;
                element.lineCap = "round";
                if (fillColor)
                    element.isFill = true;
                this._buffer.push(element);
            },
            
            /**
             * draw a polygon with a fill color and line color, copying the vertex list
             * @param {Array} verts
             * @param {cc.Color} fillColor
             * @param {Number} lineWidth
             * @param {cc.Color} color
             * @param {Boolean} notClosePoly
             */
            drawPoly: function (verts, fillColor, lineWidth, color, notClosePoly) {
                var vertsCopy = [];
                for (var i=0; i < verts.length; i++) {
                    vertsCopy.push(cc.p(verts[i].x, verts[i].y));
                }
                return this.drawPoly_(vertsCopy, fillColor, lineWidth, color, notClosePoly);
            },

            /**
             * Clear the geometry in the node's buffer.
             */
            clear: function () {
                this._buffer.length = 0;
            },

            _createRenderCmd: function(){
                return new cc.DrawNode.CanvasRenderCmd(this);
            }
        });
    }
    else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
        
        cc.js.mixin(cc.DrawNode.prototype, {
            _bufferCapacity:0,

            _trianglesArrayBuffer:null,
            _trianglesWebBuffer:null,
            _trianglesReader:null,

            _dirty:false,
            _className:"DrawNodeWebGL",

            ctor:function () {
                _ccsg.Node.prototype.ctor.call(this);
                this._buffer = [];
                this._blendFunc = new cc.BlendFunc(cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA);
                this._drawColor = cc.color(255,255,255,255);

                this.init();
            },

            init:function () {
                if (_ccsg.Node.prototype.init.call(this)) {
                    this.shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_LENGTHTEXTURECOLOR);
                    this._ensureCapacity(64);
                    this._trianglesWebBuffer = cc._renderContext.createBuffer();
                    this._dirty = true;
                    return true;
                }
                return false;
            },

            drawRect: function (origin, destination, fillColor, lineWidth, lineColor) {
                lineWidth = (lineWidth == null) ? this._lineWidth : lineWidth;
                lineColor = lineColor || this.getDrawColor();
                if (lineColor.a == null)
                    lineColor.a = 255;
                var vertices = [origin, cc.p(destination.x, origin.y), destination, cc.p(origin.x, destination.y)];
                if(fillColor == null)
                    this._drawSegments(vertices, lineWidth, lineColor, true);
                else
                    this.drawPoly(vertices, fillColor, lineWidth, lineColor);
            },

            drawCircle: function (center, radius, angle, segments, drawLineToCenter, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var coef = 2.0 * Math.PI / segments, vertices = [], i, len;
                for (i = 0; i <= segments; i++) {
                    var rads = i * coef;
                    var j = radius * Math.cos(rads + angle) + center.x;
                    var k = radius * Math.sin(rads + angle) + center.y;
                    vertices.push(cc.p(j, k));
                }
                if (drawLineToCenter)
                    vertices.push(cc.p(center.x, center.y));

                lineWidth *= 0.5;
                for (i = 0, len = vertices.length; i < len - 1; i++)
                    this.drawSegment(vertices[i], vertices[i + 1], lineWidth, color);
            },

            drawQuadBezier: function (origin, control, destination, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var vertices = [], t = 0.0;
                for (var i = 0; i < segments; i++) {
                    var x = Math.pow(1 - t, 2) * origin.x + 2.0 * (1 - t) * t * control.x + t * t * destination.x;
                    var y = Math.pow(1 - t, 2) * origin.y + 2.0 * (1 - t) * t * control.y + t * t * destination.y;
                    vertices.push(cc.p(x, y));
                    t += 1.0 / segments;
                }
                vertices.push(cc.p(destination.x, destination.y));
                this._drawSegments(vertices, lineWidth, color, false);
            },

            drawCubicBezier: function (origin, control1, control2, destination, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var vertices = [], t = 0;
                for (var i = 0; i < segments; i++) {
                    var x = Math.pow(1 - t, 3) * origin.x + 3.0 * Math.pow(1 - t, 2) * t * control1.x + 3.0 * (1 - t) * t * t * control2.x + t * t * t * destination.x;
                    var y = Math.pow(1 - t, 3) * origin.y + 3.0 * Math.pow(1 - t, 2) * t * control1.y + 3.0 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
                    vertices.push(cc.p(x, y));
                    t += 1.0 / segments;
                }
                vertices.push(cc.p(destination.x, destination.y));
                this._drawSegments(vertices, lineWidth, color, false);
            },

            drawCatmullRom: function (points, segments, lineWidth, color) {
                this.drawCardinalSpline(points, 0.5, segments, lineWidth, color);
            },

            drawCardinalSpline: function (config, tension, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var vertices = [], p, lt, deltaT = 1.0 / config.length;

                for (var i = 0; i < segments + 1; i++) {
                    var dt = i / segments;

                    // border
                    if (dt === 1) {
                        p = config.length - 1;
                        lt = 1;
                    } else {
                        p = 0 | (dt / deltaT);
                        lt = (dt - deltaT * p) / deltaT;
                    }

                    // Interpolate
                    var newPos = cc.cardinalSplineAt(
                        cc.getControlPointAt(config, p - 1),
                        cc.getControlPointAt(config, p - 0),
                        cc.getControlPointAt(config, p + 1),
                        cc.getControlPointAt(config, p + 2),
                        tension, lt);
                    vertices.push(newPos);
                }

                lineWidth *= 0.5;
                for (var j = 0, len = vertices.length; j < len - 1; j++)
                    this.drawSegment(vertices[j], vertices[j + 1], lineWidth, color);
            },

            _render:function () {
                var gl = cc._renderContext;

                gl.bindBuffer(gl.ARRAY_BUFFER, this._trianglesWebBuffer);
                if (this._dirty) {
                    gl.bufferData(gl.ARRAY_BUFFER, this._trianglesArrayBuffer, gl.STREAM_DRAW);
                    this._dirty = false;
                }
                var triangleSize = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;

                gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_POSITION);
                gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_COLOR);
                gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_TEX_COORDS);

                // vertex
                gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_POSITION, 2, gl.FLOAT, false, triangleSize, 0);
                // color
                gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_COLOR, 4, gl.UNSIGNED_BYTE, true, triangleSize, 8);
                // texcood
                gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_TEX_COORDS, 2, gl.FLOAT, false, triangleSize, 12);

                gl.drawArrays(gl.TRIANGLES, 0, this._buffer.length * 3);
                cc.incrementGLDraws(1);
                //cc.checkGLErrorDebug();
            },

            _ensureCapacity:function(count){
                var _t = this;
                var locBuffer = _t._buffer;
                if(locBuffer.length + count > _t._bufferCapacity){
                    var TriangleLength = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT;
                    _t._bufferCapacity += Math.max(_t._bufferCapacity, count);
                    //re alloc
                    if((locBuffer == null) || (locBuffer.length === 0)){
                        //init
                        _t._buffer = [];
                        _t._trianglesArrayBuffer = new ArrayBuffer(TriangleLength * _t._bufferCapacity);
                        _t._trianglesReader = new Uint8Array(_t._trianglesArrayBuffer);
                    } else {
                        var newTriangles = [];
                        var newArrayBuffer = new ArrayBuffer(TriangleLength * _t._bufferCapacity);
                        for(var i = 0; i < locBuffer.length;i++){
                            newTriangles[i] = new cc.V2F_C4B_T2F_Triangle(locBuffer[i].a,locBuffer[i].b,locBuffer[i].c,
                                newArrayBuffer, i * TriangleLength);
                        }
                        _t._trianglesReader = new Uint8Array(newArrayBuffer);
                        _t._trianglesArrayBuffer = newArrayBuffer;
                        _t._buffer = newTriangles;
                    }
                }
            },

            drawDot:function (pos, radius, color) {
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var c4bColor = {r: 0 | color.r, g: 0 | color.g, b: 0 | color.b, a: 0 | color.a};
                var a = {vertices: {x: pos.x - radius, y: pos.y - radius}, colors: c4bColor, texCoords: {u: -1.0, v: -1.0}};
                var b = {vertices: {x: pos.x - radius, y: pos.y + radius}, colors: c4bColor, texCoords: {u: -1.0, v: 1.0}};
                var c = {vertices: {x: pos.x + radius, y: pos.y + radius}, colors: c4bColor, texCoords: {u: 1.0, v: 1.0}};
                var d = {vertices: {x: pos.x + radius, y: pos.y - radius}, colors: c4bColor, texCoords: {u: 1.0, v: -1.0}};

                this._ensureCapacity(2*3);

                this._buffer.push(new cc.V2F_C4B_T2F_Triangle(a, b, c, this._trianglesArrayBuffer, this._buffer.length * cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT));
                this._buffer.push(new cc.V2F_C4B_T2F_Triangle(a, c, d, this._trianglesArrayBuffer, this._buffer.length * cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT));
                this._dirty = true;
            },

            drawDots: function(points, radius,color) {
                if(!points || points.length === 0)
                    return;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                for(var i = 0, len = points.length; i < len; i++)
                    this.drawDot(points[i], radius, color);
            },

            drawSegment:function (from, to, radius, color) {
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                radius = radius || (this._lineWidth * 0.5);
                var vertexCount = 6*3;
                this._ensureCapacity(vertexCount);

                var c4bColor = {r: 0 | color.r, g: 0 | color.g, b: 0 | color.b, a: 0 | color.a};
                var a = cc.v2(from), b = cc.v2(to);
                var n = cc.pNormalize(cc.pPerp(cc.pSub(b, a))), t = cc.pPerp(n);
                var nw = cc.pMult(n, radius), tw = cc.pMult(t, radius);

                var v0 = cc.pSub(b, cc.pAdd(nw, tw));
                var v1 = cc.pAdd(b, cc.pSub(nw, tw));
                var v2 = cc.pSub(b, nw);
                var v3 = cc.pAdd(b, nw);
                var v4 = cc.pSub(a, nw);
                var v5 = cc.pAdd(a, nw);
                var v6 = cc.pSub(a, cc.pSub(nw, tw));
                var v7 = cc.pAdd(a, cc.pAdd(nw, tw));

                var TriangleLength = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT, triangleBuffer = this._trianglesArrayBuffer, locBuffer = this._buffer;
                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v0, colors: c4bColor, texCoords: __t(cc.pNeg(cc.pAdd(n, t)))},
                    {vertices: v1, colors: c4bColor, texCoords: __t(cc.pSub(n, t))}, {vertices: v2, colors: c4bColor, texCoords: __t(cc.pNeg(n))},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v3, colors: c4bColor, texCoords: __t(n)},
                    {vertices: v1, colors: c4bColor, texCoords: __t(cc.pSub(n, t))}, {vertices: v2, colors: c4bColor, texCoords: __t(cc.pNeg(n))},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v3, colors: c4bColor, texCoords: __t(n)},
                    {vertices: v4, colors: c4bColor, texCoords: __t(cc.pNeg(n))}, {vertices: v2, colors: c4bColor, texCoords: __t(cc.pNeg(n))},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v3, colors: c4bColor, texCoords: __t(n)},
                    {vertices: v4, colors: c4bColor, texCoords: __t(cc.pNeg(n))}, {vertices: v5, colors: c4bColor, texCoords: __t(n)},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v6, colors: c4bColor, texCoords: __t(cc.pSub(t, n))},
                    {vertices: v4, colors: c4bColor, texCoords: __t(cc.pNeg(n))}, {vertices: v5, colors: c4bColor, texCoords: __t(n)},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v6, colors: c4bColor, texCoords: __t(cc.pSub(t, n))},
                    {vertices: v7, colors: c4bColor, texCoords: __t(cc.pAdd(n, t))}, {vertices: v5, colors: c4bColor, texCoords: __t(n)},
                    triangleBuffer, locBuffer.length * TriangleLength));
                this._dirty = true;
            },

            drawPoly:function (verts, fillColor, borderWidth, borderColor, notClosePoly) {
                if(fillColor == null){
                    this._drawSegments(verts, borderWidth, borderColor, !notClosePoly);
                    return;
                }
                if (fillColor.a == null)
                    fillColor.a = 255;
                if (borderColor.a == null)
                    borderColor.a = 255;
                borderWidth = (borderWidth == null)? this._lineWidth : borderWidth;
                borderWidth *= 0.5;
                var c4bFillColor = {r: 0 | fillColor.r, g: 0 | fillColor.g, b: 0 | fillColor.b, a: 0 | fillColor.a};
                var c4bBorderColor = {r: 0 | borderColor.r, g: 0 | borderColor.g, b: 0 | borderColor.b, a: 0 | borderColor.a};
                var extrude = [], i, v0, v1, v2, count = verts.length;
                for (i = 0; i < count; i++) {
                    v0 = cc.v2(verts[(i - 1 + count) % count]);
                    v1 = cc.v2(verts[i]);
                    v2 = cc.v2(verts[(i + 1) % count]);
                    var n1 = cc.pNormalize(cc.pPerp(cc.pSub(v1, v0)));
                    var n2 = cc.pNormalize(cc.pPerp(cc.pSub(v2, v1)));
                    var offset = cc.pMult(cc.pAdd(n1, n2), 1.0 / (cc.pDot(n1, n2) + 1.0));
                    extrude[i] = {offset: offset, n: n2};
                }
                var outline = (borderWidth > 0.0), triangleCount = 3 * count - 2, vertexCount = 3 * triangleCount;
                this._ensureCapacity(vertexCount);

                var triangleBytesLen = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT, trianglesBuffer = this._trianglesArrayBuffer;
                var locBuffer = this._buffer;
                var inset = (outline == false ? 0.5 : 0.0);
                for (i = 0; i < count - 2; i++) {
                    v0 = cc.pSub(cc.v2(verts[0]), cc.pMult(extrude[0].offset, inset));
                    v1 = cc.pSub(cc.v2(verts[i + 1]), cc.pMult(extrude[i + 1].offset, inset));
                    v2 = cc.pSub(cc.v2(verts[i + 2]), cc.pMult(extrude[i + 2].offset, inset));
                    locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v0, colors: c4bFillColor, texCoords: __t(cc.v2())},
                        {vertices: v1, colors: c4bFillColor, texCoords: __t(cc.v2())}, {vertices: v2, colors: c4bFillColor, texCoords: __t(cc.v2())},
                        trianglesBuffer, locBuffer.length * triangleBytesLen));
                }

                for (i = 0; i < count; i++) {
                    var j = (i + 1) % count;
                    v0 = cc.v2(verts[i]);
                    v1 = cc.v2(verts[j]);

                    var n0 = extrude[i].n;
                    var offset0 = extrude[i].offset;
                    var offset1 = extrude[j].offset;
                    var inner0 = outline ? cc.pSub(v0, cc.pMult(offset0, borderWidth)) : cc.pSub(v0, cc.pMult(offset0, 0.5));
                    var inner1 = outline ? cc.pSub(v1, cc.pMult(offset1, borderWidth)) : cc.pSub(v1, cc.pMult(offset1, 0.5));
                    var outer0 = outline ? cc.pAdd(v0, cc.pMult(offset0, borderWidth)) : cc.pAdd(v0, cc.pMult(offset0, 0.5));
                    var outer1 = outline ? cc.pAdd(v1, cc.pMult(offset1, borderWidth)) : cc.pAdd(v1, cc.pMult(offset1, 0.5));

                    if (outline) {
                        locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))},
                            {vertices: inner1, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))}, {vertices: outer1, colors: c4bBorderColor, texCoords: __t(n0)},
                            trianglesBuffer, locBuffer.length * triangleBytesLen));
                        locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))},
                            {vertices: outer0, colors: c4bBorderColor, texCoords: __t(n0)}, {vertices: outer1, colors: c4bBorderColor, texCoords: __t(n0)},
                            trianglesBuffer, locBuffer.length * triangleBytesLen));
                    } else {
                        locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bFillColor, texCoords: __t(cc.v2())},
                            {vertices: inner1, colors: c4bFillColor, texCoords: __t(cc.v2())}, {vertices: outer1, colors: c4bFillColor, texCoords: __t(n0)},
                            trianglesBuffer, locBuffer.length * triangleBytesLen));
                        locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bFillColor, texCoords: __t(cc.v2())},
                            {vertices: outer0, colors: c4bFillColor, texCoords: __t(n0)}, {vertices: outer1, colors: c4bFillColor, texCoords: __t(n0)},
                            trianglesBuffer, locBuffer.length * triangleBytesLen));
                    }
                }
                extrude = null;
                this._dirty = true;
            },

            _drawSegments: function(verts, borderWidth, borderColor, closePoly){
                borderWidth = (borderWidth == null) ? this._lineWidth : borderWidth;
                borderColor = borderColor || this._drawColor;
                if(borderColor.a == null)
                    borderColor.a = 255;
                borderWidth *= 0.5;
                if (borderWidth <= 0)
                    return;

                var c4bBorderColor = {r: 0 | borderColor.r, g: 0 | borderColor.g, b: 0 | borderColor.b, a: 0 | borderColor.a };
                var extrude = [], i, v0, v1, v2, count = verts.length;
                for (i = 0; i < count; i++) {
                    v0 = cc.v2(verts[(i - 1 + count) % count]);
                    v1 = cc.v2(verts[i]);
                    v2 = cc.v2(verts[(i + 1) % count]);
                    var n1 = cc.pNormalize(cc.pPerp(cc.pSub(v1, v0)));
                    var n2 = cc.pNormalize(cc.pPerp(cc.pSub(v2, v1)));
                    var offset = cc.pMult(cc.pAdd(n1, n2), 1.0 / (cc.pDot(n1, n2) + 1.0));
                    extrude[i] = {offset: offset, n: n2};
                }

                var triangleCount = 3 * count - 2, vertexCount = 3 * triangleCount;
                this._ensureCapacity(vertexCount);

                var triangleBytesLen = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT, trianglesBuffer = this._trianglesArrayBuffer;
                var locBuffer = this._buffer;
                var len = closePoly ? count : count - 1;
                for (i = 0; i < len; i++) {
                    var j = (i + 1) % count;
                    v0 = cc.v2(verts[i]);
                    v1 = cc.v2(verts[j]);

                    var n0 = extrude[i].n;
                    var offset0 = extrude[i].offset;
                    var offset1 = extrude[j].offset;
                    var inner0 = cc.pSub(v0, cc.pMult(offset0, borderWidth));
                    var inner1 = cc.pSub(v1, cc.pMult(offset1, borderWidth));
                    var outer0 = cc.pAdd(v0, cc.pMult(offset0, borderWidth));
                    var outer1 = cc.pAdd(v1, cc.pMult(offset1, borderWidth));
                    locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))},
                        {vertices: inner1, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))}, {vertices: outer1, colors: c4bBorderColor, texCoords: __t(n0)},
                        trianglesBuffer, locBuffer.length * triangleBytesLen));
                    locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))},
                        {vertices: outer0, colors: c4bBorderColor, texCoords: __t(n0)}, {vertices: outer1, colors: c4bBorderColor, texCoords: __t(n0)},
                        trianglesBuffer, locBuffer.length * triangleBytesLen));
                }
                extrude = null;
                this._dirty = true;
            },

            clear:function () {
                this._buffer.length = 0;
                this._dirty = true;
            },

            _createRenderCmd: function () {
                return new cc.DrawNode.WebGLRenderCmd(this);
            }
        });
    }
});

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc.DrawNode.CanvasRenderCmd = function(renderableObject){
    _ccsg.Node.CanvasRenderCmd.call(this, renderableObject);
    this._needDraw = true;
    this._buffer = null;
    this._drawColor = null;
    this._blendFunc = null;
};

cc.DrawNode.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
cc.DrawNode.CanvasRenderCmd.prototype.constructor = cc.DrawNode.CanvasRenderCmd;
cc.js.mixin( cc.DrawNode.CanvasRenderCmd.prototype, {
    rendering: function (ctx, scaleX, scaleY) {
        var wrapper = ctx || cc._renderContext, context = wrapper.getContext(), node = this._node;
        var alpha = node._displayedOpacity / 255;
        if (alpha === 0)
            return;

        wrapper.setTransform(this._worldTransform, scaleX, scaleY);

        //context.save();
        wrapper.setGlobalAlpha(alpha);
        if ((this._blendFunc && (this._blendFunc.src === cc.macro.SRC_ALPHA) && (this._blendFunc.dst === cc.macro.ONE)))
            wrapper.setCompositeOperation('lighter');               //todo: need refactor
        var locBuffer = this._buffer;
        for (var i = 0, len = locBuffer.length; i < len; i++) {
            var element = locBuffer[i];
            switch (element.type) {
                case cc.DrawNode.TYPE_DOT:
                    this._drawDot(wrapper, element, scaleX, scaleY);
                    break;
                case cc.DrawNode.TYPE_SEGMENT:
                    this._drawSegment(wrapper, element, scaleX, scaleY);
                    break;
                case cc.DrawNode.TYPE_POLY:
                    this._drawPoly(wrapper, element, scaleX, scaleY);
                    break;
            }
        }
        //context.restore();            //todo It can be reserve
    },

    _drawDot: function (wrapper, element, scaleX, scaleY) {
        var locColor = element.fillColor, locPos = element.verts[0], locRadius = element.lineWidth;

        var ctx = wrapper.getContext();
        wrapper.setFillStyle("rgba(" + (0 | locColor.r) + "," + (0 | locColor.g) + "," + (0 | locColor.b) + "," + locColor.a / 255 + ")");

        ctx.beginPath();
        ctx.arc(locPos.x, -locPos.y, locRadius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    },

    _drawSegment: function (wrapper, element, scaleX, scaleY) {
        var locColor = element.lineColor;
        var locFrom = element.verts[0], locTo = element.verts[1];
        var locLineWidth = element.lineWidth, locLineCap = element.lineCap;

        var ctx = wrapper.getContext();
        wrapper.setStrokeStyle("rgba(" + (0 | locColor.r) + "," + (0 | locColor.g) + "," + (0 | locColor.b) + "," + locColor.a / 255 + ")");

        ctx.lineWidth = locLineWidth * scaleX;
        ctx.beginPath();
        ctx.lineCap = locLineCap;
        ctx.moveTo(locFrom.x, -locFrom.y);
        ctx.lineTo(locTo.x, -locTo.y);
        ctx.stroke();
    },

    _drawPoly: function (wrapper, element, scaleX, scaleY) {
        var locVertices = element.verts, locLineCap = element.lineCap;
        if (locVertices == null)
            return;

        var locFillColor = element.fillColor, locLineWidth = element.lineWidth;
        var locLineColor = element.lineColor, locIsClosePolygon = element.isClosePolygon;
        var locIsFill = element.isFill, locIsStroke = element.isStroke;

        var ctx = wrapper.getContext();
        var firstPoint = locVertices[0];
        ctx.lineCap = locLineCap;
        if (locFillColor)
            wrapper.setFillStyle("rgba(" + (0 | locFillColor.r) + "," + (0 | locFillColor.g) + ","
                + (0 | locFillColor.b) + "," + locFillColor.a / 255 + ")");
        if (locLineWidth)
            ctx.lineWidth = locLineWidth * scaleX;
        if (locLineColor)
            wrapper.setStrokeStyle("rgba(" + (0 | locLineColor.r) + "," + (0 | locLineColor.g) + ","
                + (0 | locLineColor.b) + "," + locLineColor.a / 255 + ")");

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, -firstPoint.y);
        for (var i = 1, len = locVertices.length; i < len; i++)
            ctx.lineTo(locVertices[i].x, -locVertices[i].y);

        if (locIsClosePolygon)
            ctx.closePath();
        if (locIsFill)
            ctx.fill();
        if (locIsStroke)
            ctx.stroke();
    }
});
/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc.DrawNode.WebGLRenderCmd = function (renderableObject) {
    _ccsg.Node.WebGLRenderCmd.call(this, renderableObject);
    this._needDraw = true;
    this._matrix = new cc.math.Matrix4();
    this._matrix.identity();
};

cc.DrawNode.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
cc.DrawNode.WebGLRenderCmd.prototype.constructor = cc.DrawNode.WebGLRenderCmd;

cc.DrawNode.WebGLRenderCmd.prototype.rendering = function (ctx) {
    var node = this._node;
    if (node._buffer.length > 0) {
        var wt = this._worldTransform, mat = this._matrix.mat;
        mat[0] = wt.a;
        mat[4] = wt.c;
        mat[12] = wt.tx;
        mat[1] = wt.b;
        mat[5] = wt.d;
        mat[13] = wt.ty;

        cc.gl.blendFunc(node._blendFunc.src, node._blendFunc.dst);
        this._shaderProgram.use();
        this._shaderProgram._setUniformForMVPMatrixWithMat4(this._matrix);
        node._render();
    }
};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (c) 2012 Pierre-David Bélanger

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


/**
 * <p>
 *     cc.ClippingNode is a subclass of ccsg.Node.                                                            <br/>
 *     It draws its content (children) clipped using a stencil.                                               <br/>
 *     The stencil is an other ccsg.Node that will not be drawn.                                               <br/>
 *     The clipping is done using the alpha part of the stencil (adjusted with an alphaThreshold).
 * </p>
 * @class
 * @extends _ccsg.Node
 * @param {_ccsg.Node} [stencil=null]
 *
 * @property {Number}   alphaThreshold  - Threshold for alpha value.
 * @property {Boolean}  inverted        - Indicate whether in inverted mode.
 * @property {_ccsg.Node}  stencil         - he ccsg.Node to use as a stencil to do the clipping.
 */
cc.ClippingNode = _ccsg.Node.extend(/** @lends cc.ClippingNode# */{
    alphaThreshold: 0,
    inverted: false,

    _stencil: null,
    _className: "ClippingNode",

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {_ccsg.Node} [stencil=null]
     */
    ctor: function (stencil) {
        stencil = stencil || null;
        _ccsg.Node.prototype.ctor.call(this);
        this._stencil = stencil;
        this.alphaThreshold = 1;
        this.inverted = false;
        this._renderCmd.initStencilBits();
    },

    /**
     * Initialization of the node, please do not call this function by yourself, you should pass the parameters to constructor to initialize it.
     * @function
     * @param {_ccsg.Node} [stencil=null]
     */
    init: function (stencil) {
        this._stencil = stencil;
        this.alphaThreshold = 1;
        this.inverted = false;
        this._renderCmd.initStencilBits();
        return true;
    },

    /**
     * <p>
     *     Event callback that is invoked every time when node enters the 'stage'.                                   <br/>
     *     If the CCNode enters the 'stage' with a transition, this event is called when the transition starts.        <br/>
     *     During onEnter you can't access a "sister/brother" node.                                                    <br/>
     *     If you override onEnter, you must call its parent's onEnter function with this._super().
     * </p>
     * @function
     */
    onEnter: function () {
        _ccsg.Node.prototype.onEnter.call(this);
        this._stencil.onEnter();
    },

    /**
     * <p>
     *     Event callback that is invoked when the node enters in the 'stage'.                                                        <br/>
     *     If the node enters the 'stage' with a transition, this event is called when the transition finishes.                       <br/>
     *     If you override onEnterTransitionDidFinish, you shall call its parent's onEnterTransitionDidFinish with this._super()
     * </p>
     * @function
     */
    onEnterTransitionDidFinish: function () {
        _ccsg.Node.prototype.onEnterTransitionDidFinish.call(this);
        this._stencil.onEnterTransitionDidFinish();
    },

    /**
     * <p>
     *     callback that is called every time the node leaves the 'stage'.  <br/>
     *     If the node leaves the 'stage' with a transition, this callback is called when the transition starts. <br/>
     *     If you override onExitTransitionDidStart, you shall call its parent's onExitTransitionDidStart with this._super()
     * </p>
     * @function
     */
    onExitTransitionDidStart: function () {
        this._stencil.onExitTransitionDidStart();
        _ccsg.Node.prototype.onExitTransitionDidStart.call(this);
    },

    /**
     * <p>
     * callback that is called every time the node leaves the 'stage'. <br/>
     * If the node leaves the 'stage' with a transition, this callback is called when the transition finishes. <br/>
     * During onExit you can't access a sibling node.                                                             <br/>
     * If you override onExit, you shall call its parent's onExit with this._super().
     * </p>
     * @function
     */
    onExit: function () {
        this._stencil.onExit();
        _ccsg.Node.prototype.onExit.call(this);
    },

    /**
     * <p>
     * The alpha threshold.                                                                                   <br/>
     * The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold.     <br/>
     * Should be a float between 0 and 1.                                                                     <br/>
     * This default to 1 (so alpha test is disabled).
     * </P>
     * @return {Number}
     */
    getAlphaThreshold: function () {
        return this.alphaThreshold;
    },

    /**
     * set alpha threshold.
     * @param {Number} alphaThreshold
     */
    setAlphaThreshold: function (alphaThreshold) {
        this.alphaThreshold = alphaThreshold;
    },

    /**
     * <p>
     *     Inverted. If this is set to YES,                                                                 <br/>
     *     the stencil is inverted, so the content is drawn where the stencil is NOT drawn.                 <br/>
     *     This default to NO.
     * </p>
     * @return {Boolean}
     */
    isInverted: function () {
        return this.inverted;
    },

    /**
     * set whether or not invert of stencil
     * @param {Boolean} inverted
     */
    setInverted: function (inverted) {
        this.inverted = inverted;
    },

    /**
     * The ccsg.Node to use as a stencil to do the clipping.                                   <br/>
     * The stencil node will be retained. This default to nil.
     * @return {_ccsg.Node}
     */
    getStencil: function () {
        return this._stencil;
    },

    /**
     * Set stencil.
     * @function
     * @param {_ccsg.Node} stencil
     */
    setStencil: function (stencil) {
        if(this._stencil === stencil)
            return;
        this._renderCmd.setStencil(stencil);
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.ClippingNode.CanvasRenderCmd(this);
        else
            return new cc.ClippingNode.WebGLRenderCmd(this);
    }
});

cc.ClippingNode.stencilBits = -1;

var _p = cc.ClippingNode.prototype;

// Extended properties
cc.defineGetterSetter(_p, "stencil", _p.getStencil, _p.setStencil);
/** @expose */
_p.stencil;

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

//-------------------------- ClippingNode's canvas render cmd --------------------------------
cc.ClippingNode.CanvasRenderCmd = function(renderable){
    _ccsg.Node.CanvasRenderCmd.call(this, renderable);

    this._rendererClipCmd = new cc.CustomRenderCmd(this, this._drawStencilCommand);
    this._rendererRestoreCmd = new cc.CustomRenderCmd(this, this._restoreCmdCallback);
};
var proto = cc.ClippingNode.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = cc.ClippingNode.CanvasRenderCmd;

proto.initStencilBits = function(){};

proto.setStencil = function(stencil){
    if(stencil == null)
        return;

    this._node._stencil = stencil;

    if (stencil instanceof cc.DrawNode) {

    }else{
        cc.error('only cc.DrawNode is accepted as stencil');
    }
};

proto._restoreCmdCallback = function (ctx) {
    var wrapper = ctx || cc._renderContext;
    wrapper.restore();
};

proto._drawStencilCommand = function (ctx, scaleX, scaleY) {
    var wrapper = ctx || cc._renderContext, context = wrapper.getContext();
    wrapper.save();
    context.beginPath();                                                         //save for clip
    wrapper.setTransform(this._worldTransform, scaleX, scaleY);

    //draw elements
    var stencilBuffer = this._node._stencil._buffer;
    for(var index = 0; index < stencilBuffer.length; ++index) {
        var vertices = stencilBuffer[index].verts;
        if(vertices.length < 3) continue;
        context.moveTo(vertices[0].x, -vertices[0].y);
        for(var vIndex = 1; vIndex < vertices.length; ++vIndex) {
            context.lineTo(vertices[vIndex].x, -vertices[vIndex].y);
        }
    }
    //end draw elements
    context.clip();
};

proto.visit = function(parentCmd){
    var node = this._node;
    this._propagateFlagsDown(parentCmd);
    // quick return if not visible
    if (!node._visible)
        return;

    parentCmd = parentCmd || this.getParentRenderCmd();
    if( parentCmd)
        this._curLevel = parentCmd._curLevel + 1;

    this._syncStatus(parentCmd);
    if(this._node._stencil) {
        cc.renderer.pushRenderCommand(this._rendererClipCmd);
    }
        var i, children = node._children;

        var len = children.length;
        if (len > 0) {
            node.sortAllChildren();
            for (i = 0; i < len; i++)
                children[i]._renderCmd.visit(this);
        }

    if(this._node._stencil) {
        cc.renderer.pushRenderCommand(this._rendererRestoreCmd);
    }
    this._dirtyFlag = 0;
};
/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

// ------------------------------- ClippingNode's WebGL render cmd ------------------------------
function setProgram (node, program) {
    node.shaderProgram = program;

    var children = node.children;
    if (!children)
        return;

    for (var i = 0; i < children.length; i++)
        setProgram(children[i], program);
}

cc.ClippingNode.WebGLRenderCmd = function(renderable){
    _ccsg.Node.WebGLRenderCmd.call(this, renderable);

    this._beforeVisitCmd = new cc.CustomRenderCmd(this, this._onBeforeVisit);
    this._afterDrawStencilCmd = new cc.CustomRenderCmd(this, this._onAfterDrawStencil);
    this._afterVisitCmd = new cc.CustomRenderCmd(this, this._onAfterVisit);

    this._currentStencilEnabled = null;
    this._mask_layer_le = null;
};

var proto = cc.ClippingNode.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = cc.ClippingNode.WebGLRenderCmd;

cc.ClippingNode.WebGLRenderCmd._init_once = null;
cc.ClippingNode.WebGLRenderCmd._visit_once = null;
cc.ClippingNode.WebGLRenderCmd._layer = -1;

proto.initStencilBits = function(){
    // get (only once) the number of bits of the stencil buffer
    cc.ClippingNode.WebGLRenderCmd._init_once = true;
    if (cc.ClippingNode.WebGLRenderCmd._init_once) {
        cc.ClippingNode.stencilBits = cc._renderContext.getParameter(cc._renderContext.STENCIL_BITS);
        if (cc.ClippingNode.stencilBits <= 0)
            cc.log("Stencil buffer is not enabled.");
        cc.ClippingNode.WebGLRenderCmd._init_once = false;
    }
};

proto.transform = function(parentCmd, recursive){
    var node = this._node;
    this.originTransform(parentCmd, recursive);
    if(node._stencil) {
        node._stencil._renderCmd.transform(this, recursive);
    }
};

proto.visit = function(parentCmd){
    var node = this._node;
    this._propagateFlagsDown(parentCmd);
    // quick return if not visible
    if (!node._visible)
        return;

    if( node._parent && node._parent._renderCmd)
        this._curLevel = node._parent._renderCmd._curLevel + 1;

    // if stencil buffer disabled
    if (cc.ClippingNode.stencilBits < 1) {
        // draw everything, as if there where no stencil
        this.originVisit(parentCmd);
        return;
    }

    if (!node._stencil || !node._stencil.visible) {
        if (node.inverted)
            this.originVisit(parentCmd);   // draw everything
        return;
    }

    if (cc.ClippingNode.WebGLRenderCmd._layer + 1 === cc.ClippingNode.stencilBits) {
        cc.ClippingNode.WebGLRenderCmd._visit_once = true;
        if (cc.ClippingNode.WebGLRenderCmd._visit_once) {
            cc.log("Nesting more than " + cc.ClippingNode.stencilBits + "stencils is not supported. Everything will be drawn without stencil for this node and its children.");
            cc.ClippingNode.WebGLRenderCmd._visit_once = false;
        }
        // draw everything, as if there were no stencil
        this.originVisit(parentCmd);
        return;
    }

    cc.renderer.pushRenderCommand(this._beforeVisitCmd);

    //optimize performance for javascript
    var currentStack = cc.current_stack;
    currentStack.stack.push(currentStack.top);
    this._syncStatus(parentCmd);
    currentStack.top = this._stackMatrix;

    // node._stencil._stackMatrix = node._stackMatrix;
    node._stencil._renderCmd.visit(this);

    cc.renderer.pushRenderCommand(this._afterDrawStencilCmd);

    // draw (according to the stencil test func) this node and its children
    var locChildren = node._children;
    if (locChildren && locChildren.length > 0) {
        var childLen = locChildren.length;
        node.sortAllChildren();
        // draw children zOrder < 0
        for (var i = 0; i < childLen; i++) {
            locChildren[i]._renderCmd.visit(this);
        }
    }

    cc.renderer.pushRenderCommand(this._afterVisitCmd);

    this._dirtyFlag = 0;
    //optimize performance for javascript
    currentStack.top = currentStack.stack.pop();
};

proto.setStencil = function(stencil){
    var node = this._node;
    if(node._stencil)
        node._stencil._parent = null;
    node._stencil = stencil;
    if(node._stencil)
        node._stencil._parent = node;
};

proto._onBeforeVisit = function(ctx){
    var gl = ctx || cc._renderContext, node = this._node;
    cc.ClippingNode.WebGLRenderCmd._layer++;

    // mask of the current layer (ie: for layer 3: 00000100)
    var mask_layer = 0x1 << cc.ClippingNode.WebGLRenderCmd._layer;
    // mask of all layers less than the current (ie: for layer 3: 00000011)
    var mask_layer_l = mask_layer - 1;
    // mask of all layers less than or equal to the current (ie: for layer 3: 00000111)
    //var mask_layer_le = mask_layer | mask_layer_l;
    this._mask_layer_le = mask_layer | mask_layer_l;
    // manually save the stencil state
    this._currentStencilEnabled = gl.isEnabled(gl.STENCIL_TEST);

    gl.clear(gl.DEPTH_BUFFER_BIT);
    // enable stencil use
    gl.enable(gl.STENCIL_TEST);

    gl.depthMask(false);

    gl.stencilFunc(gl.NEVER, mask_layer, mask_layer);
    gl.stencilOp(gl.REPLACE, gl.KEEP, gl.KEEP);

    gl.stencilMask(mask_layer);
    gl.clear(gl.STENCIL_BUFFER_BIT);

    if (node.alphaThreshold < 1) {            //TODO desktop
        var program = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_TEXTURECOLORALPHATEST);
        // set our alphaThreshold
        cc.gl.useProgram(program.getProgram());
        program.setUniformLocationWith1f(cc.UNIFORM_ALPHA_TEST_VALUE_S, node.alphaThreshold);
        program.setUniformLocationWithMatrix4fv(cc.UNIFORM_MVMATRIX_S, cc.renderer.mat4Identity.mat);
        setProgram(node._stencil, program);
    }
};

proto._onAfterDrawStencil = function(ctx){
    var gl = ctx || cc._renderContext;
    gl.depthMask(true);

    gl.stencilFunc(!this._node.inverted ? gl.EQUAL : gl.NOTEQUAL, this._mask_layer_le, this._mask_layer_le);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
};

proto._onAfterVisit = function(ctx){
    var gl = ctx || cc._renderContext;

    cc.ClippingNode.WebGLRenderCmd._layer--;

    if (this._currentStencilEnabled) {
        var mask_layer = 0x1 << cc.ClippingNode.WebGLRenderCmd._layer;
        var mask_layer_l = mask_layer - 1;
        var mask_layer_le = mask_layer | mask_layer_l;

        gl.stencilMask(mask_layer);
        gl.stencilFunc(gl.EQUAL, mask_layer_le, mask_layer_le);
    }
    else {
        gl.disable(gl.STENCIL_TEST);
    }
};

/*global _ccsg */

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2012 James Chen
 Copyright (c) 2011-2012 cocos2d-x.org

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

// https://segmentfault.com/q/1010000002914610
var SCROLLY = 40;
var TIMER_NAME = 400;
var LEFT_PADDING = 2;

function scrollWindowUp(editBox) {
    if (cc.sys.os === cc.sys.OS_IOS && cc.sys.osMainVersion === 9) {
        var worldPos = editBox.convertToWorldSpace(cc.p(0,0));
        var windowHeight = cc.visibleRect.height;
        var windowWidth = cc.visibleRect.width;
        var factor = 0.5;
        if(windowWidth > windowHeight) {
            factor = 0.7;
        }
        setTimeout(function() {
            if(window.scrollY < SCROLLY && worldPos.y < windowHeight * factor) {
                var scrollOffset = windowHeight * factor - worldPos.y - window.scrollY;
                if (scrollOffset < 35) scrollOffset = 35;
                if (scrollOffset > 320) scrollOffset = 320;
                window.scrollTo(0, scrollOffset);
            }
        }, TIMER_NAME);
    }
}

var capitalize = function(string) {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Enum for keyboard return types
 * @readonly
 * @enum cc.EditBox.KeyboardReturnType
 */
var KeyboardReturnType = cc.Enum({
    /**
     * @property {Number} DEFAULT
     */
    DEFAULT: 0,
    /**
     * @property {Number} DONE
     */
    DONE: 1,
    /**
     * @property {Number} SEND
     */
    SEND: 2,
    /**
     * @property {Number} SEARCH
     */
    SEARCH: 3,
    /**
     * @property {Number} GO
     */
    GO: 4
});

/**
 * The EditBox's InputMode defines the type of text that the user is allowed to enter
 * @readonly
 * @enum {number}
 * @memberof cc.EditBox.InputMode
 */
var InputMode = cc.Enum({

    /**
     * @property {Number} ANY
     */
    ANY: 0,

    /**
     * The user is allowed to enter an e-mail address.
     * @property {Number} EMAIL_ADDR
     */
    EMAIL_ADDR: 1,

    /**
     * The user is allowed to enter an integer value.
     * @property {Number} NUMERIC
     */
    NUMERIC: 2,

    /**
     * The user is allowed to enter a phone number.
     * @property {Number} PHONE_NUMBER
     */
    PHONE_NUMBER: 3,

    /**
     * The user is allowed to enter a URL.
     * @property {Number} URL
     */
    URL: 4,

    /**
     * The user is allowed to enter a real number value.
     * This extends kEditBoxInputModeNumeric by allowing a decimal point.
     * @property {Number} DECIMAL
     */
    DECIMAL: 5,

    /**
     * The user is allowed to enter any text, except for line breaks.
     * @property {Number} SINGLE_LINE
     */
    SINGLE_LINE: 6
});

/**
 * Enum for the EditBox's input flags
 * @readonly
 * @enum cc.EditBox.InputFlag
 */
var InputFlag = cc.Enum({
    /**
     * Indicates that the text entered is confidential data that should be
     * obscured whenever possible. This implies EDIT_BOX_INPUT_FLAG_SENSITIVE.
     *
     * @property {Number} PASSWORD
     */
    PASSWORD: 0,

    /**
     * Indicates that the text entered is sensitive data that the
     * implementation must never store into a dictionary or table for use
     * in predictive, auto-completing, or other accelerated input schemes.
     * A credit card number is an example of sensitive data.
     *
     * @property {Number} SENSITIVE
     */
    SENSITIVE: 1,

    /**
     * This flag is a hint to the implementation that during text editing,
     * the initial letter of each word should be capitalized.
     *
     * @property {Number} INITIAL_CAPS_WORD
     */
    INITIAL_CAPS_WORD: 2,

    /**
     * This flag is a hint to the implementation that during text editing,
     * the initial letter of each sentence should be capitalized.
     *
     * @property {Number} INITIAL_CAPS_SENTENCE
     */
    INITIAL_CAPS_SENTENCE: 3,

    /**
     * Capitalize all characters automatically.
     *
     * @property {Number} INITIAL_CAPS_ALL_CHARACTERS
     */
    INITIAL_CAPS_ALL_CHARACTERS: 4,

    /**
     * Don't do anything with the input text.
     * @property {Number} DEFAULT
     */
    DEFAULT: 5
});

/**
 * @class
 * @extends cc._Class
 */
cc.EditBoxDelegate = cc._Class.extend({
    /**
     * This method is called when an edit box gains focus after keyboard is shown.
     * @param {cc.EditBox} sender
     */
    editBoxEditingDidBegan: function (sender) {
    },

    /**
     * This method is called when an edit box loses focus after keyboard is hidden.
     * @param {cc.EditBox} sender
     */
    editBoxEditingDidEnded: function (sender) {
    },

    /**
     * This method is called when the edit box text was changed.
     * @param {cc.EditBox} sender
     * @param {String} text
     */
    editBoxTextChanged: function (sender, text) {
    },

    /**
     * This method is called when the return button was pressed.
     * @param {cc.EditBox} sender
     */
    editBoxEditingReturn: function (sender) {
    }
});


/**
 * <p>cc.EditBox is a brief Class for edit box.<br/>
 * You can use this widget to gather small amounts of text from the user.</p>
 *
 */
_ccsg.EditBox = _ccsg.Node.extend({
    _backgroundSprite: null,
    _delegate: null,
    _editBoxInputMode: InputMode.ANY,
    _editBoxInputFlag: InputFlag.DEFAULT,
    _keyboardReturnType: KeyboardReturnType.DEFAULT,
    _maxLength: 50,
    _text: '',
    _textColor: null,
    _placeholderText: '',
    _alwaysOnTop: false,
    _placeholderFontName: '',
    _placeholderFontSize: 14,
    _placeholderColor: null,
    _className: 'EditBox',

    ctor: function (size, normal9SpriteBg) {
        _ccsg.Node.prototype.ctor.call(this);

        this._textColor = cc.Color.WHITE;
        this._placeholderColor = cc.Color.GRAY;

        this.initWithSizeAndBackgroundSprite(size, normal9SpriteBg);
        this._renderCmd._createLabels();
    },

    _createRenderCmd: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            return new _ccsg.EditBox.CanvasRenderCmd(this);
        } else {
            return new _ccsg.EditBox.WebGLRenderCmd(this);
        }
    },

    setContentSize: function (width, height) {
        if (width.width !== undefined && width.height !== undefined) {
            height = width.height;
            width = width.width;
        }
        _ccsg.Node.prototype.setContentSize.call(this, width, height);
        this._updateEditBoxSize(width, height);
    },

    setVisible: function ( visible ) {
        _ccsg.Node.prototype.setVisible.call(this, visible);
        this._renderCmd.updateVisibility();
    },

    createDomElementIfNeeded: function () {
        if(!this._renderCmd._edTxt) {
            this._renderCmd.createNativeControl();
        }
    },

    setTabIndex: function(index) {
        if(this._renderCmd._edTxt) {
            this._renderCmd._edTxt.tabIndex = index;
        }
    },

    getTabIndex: function() {
        if(this._renderCmd._edTxt) {
            return this._renderCmd._edTxt.tabIndex;
        }
        cc.warn('The dom control is not created!');
        return -1;
    },

    setFocus: function() {
        if(this._renderCmd._edTxt) {
            this._renderCmd._edTxt.focus();
        }
    },

    isFocused: function() {
        if(this._renderCmd._edTxt) {
            return document.activeElement === this._renderCmd._edTxt;
        }
        cc.warn('The dom control is not created!');
        return false;
    },

    stayOnTop: function (flag) {
        if(this._alwaysOnTop === flag) return;

        this._alwaysOnTop = flag;
        this._renderCmd.stayOnTop(this._alwaysOnTop);
    },

    cleanup: function () {
        this._super();

        this._renderCmd._removeDomInputControl();
    },

    _onTouchBegan: function (touch) {
        var touchPoint = touch.getLocation();
        var bb = cc.rect(0,0, this._contentSize.width, this._contentSize.height);
        var hitted = cc.rectContainsPoint(bb, this.convertToNodeSpace(touchPoint));
        if(hitted) {
            return true;
        }
        else {
            this._renderCmd.hidden();
            return false;
        }
    },

    _onTouchEnded: function () {
        this._renderCmd.show();
    },

    _updateBackgroundSpriteSize: function (width, height) {
        if(this._backgroundSprite) {
            this._backgroundSprite.setContentSize(width, height);
        }
    },

    _updateEditBoxSize: function(size, height) {
        var newWidth = (typeof size.width === 'number') ? size.width : size;
        var newHeight = (typeof size.height === 'number') ? size.height : height;

        this._updateBackgroundSpriteSize(newWidth, newHeight);
        this._renderCmd.updateSize(newWidth, newHeight);
    },

    setLineHeight: function (lineHeight) {
        this._renderCmd.setLineHeight(lineHeight);
    },

    setFont: function (fontName, fontSize) {
        this._renderCmd.setFont(fontName, fontSize);
    },

    _setFont: function (fontStyle) {
        this._renderCmd._setFont(fontStyle);
    },

    getBackgroundSprite: function() {
        return this._backgroundSprite;
    },

    setFontName: function (fontName) {
        this._renderCmd.setFontName(fontName);
    },

    setFontSize: function (fontSize) {
        this._renderCmd.setFontSize(fontSize);
    },

    setString: function (text) {
        if (text.length >= this._maxLength) {
            text = text.slice(0, this._maxLength);
        }
        this._text = text;
        this._renderCmd.setString(text);
    },

    setFontColor: function (color) {
        this._textColor = color;
        this._renderCmd.setFontColor(color);
    },

    setMaxLength: function (maxLength) {
        if (!isNaN(maxLength)) {
            if(maxLength < 0) {
                //we can't set Number.MAX_VALUE to input's maxLength property
                //so we use a magic number here, it should works at most use cases.
                maxLength = 65535;
            }
            this._maxLength = maxLength;
            this._renderCmd.setMaxLength(maxLength);
        }
    },

    getMaxLength: function () {
        return this._maxLength;
    },

    setPlaceHolder: function (text) {
        if (text !== null) {
            this._renderCmd.setPlaceHolder(text);
            this._placeholderText = text;
        }
    },

    setPlaceholderFont: function (fontName, fontSize) {
        this._placeholderFontName = fontName;
        this._placeholderFontSize = fontSize;
        this._renderCmd._updateDOMPlaceholderFontStyle();
    },

    _setPlaceholderFont: function (fontStyle) {
        var res = cc.LabelTTF._fontStyleRE.exec(fontStyle);
        if (res) {
            this._placeholderFontName = res[2];
            this._placeholderFontSize = parseInt(res[1]);
            this._renderCmd._updateDOMPlaceholderFontStyle();
        }
    },

    setPlaceholderFontName: function (fontName) {
        this._placeholderFontName = fontName;
        this._renderCmd._updateDOMPlaceholderFontStyle();
    },

    setPlaceholderFontSize: function (fontSize) {
        this._placeholderFontSize = fontSize;
        this._renderCmd._updateDOMPlaceholderFontStyle();
    },

    setPlaceholderFontColor: function (color) {
        this._placeholderColor = color;
        this._renderCmd.setPlaceholderFontColor(color);
    },

    setInputFlag: function (inputFlag) {
        this._editBoxInputFlag = inputFlag;
        this._renderCmd.setInputFlag(inputFlag);
    },

    getString: function () {
        return this._text;
    },

    initWithSizeAndBackgroundSprite: function (size, normal9SpriteBg) {
        if(this._backgroundSprite) {
            this._backgroundSprite.removeFromParent();
        }
        this._backgroundSprite = normal9SpriteBg;
        _ccsg.Node.prototype.setContentSize.call(this, size);

        if(this._backgroundSprite && !this._backgroundSprite.parent) {
            this._backgroundSprite.setAnchorPoint(cc.p(0, 0));
            this.addChild(this._backgroundSprite);

            this._updateBackgroundSpriteSize(size.width, size.height);
        }


        this.x = 0;
        this.y = 0;
        return true;
    },

    setDelegate: function (delegate) {
        this._delegate = delegate;
    },

    getPlaceHolder: function () {
        return this._placeholderText;
    },

    setInputMode: function (inputMode) {
        if (this._editBoxInputMode === inputMode) return;

        var oldText = this.getString();
        this._editBoxInputMode = inputMode;

        this._renderCmd.setInputMode(inputMode);
        this._renderCmd.transform();

        this.setString(oldText);
        this._renderCmd._updateLabelPosition(this.getContentSize());
    },

    setReturnType: function (returnType) {
        this._keyboardReturnType = returnType;
    },

    initWithBackgroundColor: function (size, bgColor) {
        this._edWidth = size.width;
        this.dom.style.width = this._edWidth.toString() + 'px';
        this._edHeight = size.height;
        this.dom.style.height = this._edHeight.toString() + 'px';
        this.dom.style.backgroundColor = cc.colorToHex(bgColor);
    }
});

var _p = _ccsg.EditBox.prototype;

// Extended properties
cc.defineGetterSetter(_p, 'font', null, _p._setFont);
cc.defineGetterSetter(_p, 'fontName', null, _p.setFontName);
cc.defineGetterSetter(_p, 'fontSize', null, _p.setFontSize);
cc.defineGetterSetter(_p, 'fontColor', null, _p.setFontColor);
cc.defineGetterSetter(_p, 'string', _p.getString, _p.setString);
cc.defineGetterSetter(_p, 'maxLength', _p.getMaxLength, _p.setMaxLength);
cc.defineGetterSetter(_p, 'placeholder', _p.getPlaceHolder, _p.setPlaceHolder);
cc.defineGetterSetter(_p, 'placeholderFont', null, _p._setPlaceholderFont);
cc.defineGetterSetter(_p, 'placeholderFontName', null, _p.setPlaceholderFontName);
cc.defineGetterSetter(_p, 'placeholderFontSize', null, _p.setPlaceholderFontSize);
cc.defineGetterSetter(_p, 'placeholderFontColor', null, _p.setPlaceholderFontColor);
cc.defineGetterSetter(_p, 'inputFlag', null, _p.setInputFlag);
cc.defineGetterSetter(_p, 'delegate', null, _p.setDelegate);
cc.defineGetterSetter(_p, 'inputMode', null, _p.setInputMode);
cc.defineGetterSetter(_p, 'returnType', null, _p.setReturnType);

_p = null;

_ccsg.EditBox.InputMode = InputMode;
_ccsg.EditBox.InputFlag = InputFlag;
_ccsg.EditBox.KeyboardReturnType = KeyboardReturnType;

(function (editbox) {
    editbox._polyfill = {
        zoomInvalid: false
    };

    if (cc.sys.OS_ANDROID === cc.sys.os
        && (cc.sys.browserType === cc.sys.BROWSER_TYPE_SOUGOU
            || cc.sys.browserType === cc.sys.BROWSER_TYPE_360)) {
        editbox._polyfill.zoomInvalid = true;
    }
})(_ccsg.EditBox);

(function (polyfill) {
    var EditBoxImpl = function () {
    };

    var proto = EditBoxImpl.prototype = Object.create(Object.prototype);

    proto.updateMatrix = function () {
        if (!this._edTxt) return;

        var node = this._node, scaleX = cc.view._scaleX, scaleY = cc.view._scaleY;
        var dpr = cc.view._devicePixelRatio;
        var t = this._worldTransform;

        scaleX /= dpr;
        scaleY /= dpr;

        var container = cc.game.container;
        var a = t.a * scaleX, b = t.b, c = t.c, d = t.d * scaleY;

        var offsetX = container && container.style.paddingLeft &&  parseInt(container.style.paddingLeft);
        var offsetY = container && container.style.paddingBottom && parseInt(container.style.paddingBottom);
        var tx = t.tx * scaleX + offsetX, ty = t.ty * scaleY + offsetY;

        if (polyfill.zoomInvalid) {
            this.updateSize(node._contentSize.width * a, node._contentSize.height * d);
            a = 1;
            d = 1;
        }

        var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
        this._edTxt.style['transform'] = matrix;
        this._edTxt.style['-webkit-transform'] = matrix;
        this._edTxt.style['transform-origin'] = '0px 100% 0px';
        this._edTxt.style['-webkit-transform-origin'] = '0px 100% 0px';
    };

    proto.updateVisibility = function () {
        if (!this._edTxt) return;

        var node = this._node;
        var editBox = this._edTxt;
        if (node.visible) {
            editBox.style.visibility = 'visible';
            cc.game.container.appendChild(editBox);
        } else {
            editBox.style.visibility = 'hidden';
            var hasChild = false;
            if('contains' in cc.game.container) {
                hasChild = cc.game.container.contains(editBox);
            }else {
                hasChild = cc.game.container.compareDocumentPosition(editBox) % 16;
            }
            if(hasChild)
                cc.game.container.removeChild(editBox);
        }
    };

    proto.stayOnTop = function (flag) {
        if(flag) {
            this._removeLabels();
            this._edTxt.style.display = '';
        } else {
            this._createLabels();
            this._edTxt.style.display = 'none';
            this._updateLabelString();
        }
    };



    proto._createDomInput = function () {
        this._removeDomInputControl();
        var thisPointer = this;
        var tmpEdTxt = this._edTxt = document.createElement('input');
        tmpEdTxt.type = 'text';
        tmpEdTxt.style.fontSize = this._edFontSize + 'px';
        tmpEdTxt.style.color = '#000000';
        tmpEdTxt.style.border = 0;
        tmpEdTxt.style.background = 'transparent';
        tmpEdTxt.style.width = '100%';
        tmpEdTxt.style.height = '100%';
        tmpEdTxt.style.active = 0;
        tmpEdTxt.style.outline = 'medium';
        tmpEdTxt.style.padding = '0';
        tmpEdTxt.style.textTransform = 'uppercase';
        tmpEdTxt.style.display = 'none';
        tmpEdTxt.style.position = "absolute";
        tmpEdTxt.style.bottom = "0px";
        tmpEdTxt.style.left = LEFT_PADDING + "px";
        tmpEdTxt.style.className = "cocosEditBox";

        tmpEdTxt.addEventListener('input', function () {
            var editBox = thisPointer._editBox;


            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, this.maxLength);
            }

            if (editBox._delegate && editBox._delegate.editBoxTextChanged) {
                if (editBox._text.toLowerCase() !== this.value.toLowerCase()) {
                    editBox._text = this.value;
                    thisPointer._updateEditBoxContentStyle();
                    editBox._delegate.editBoxTextChanged(editBox, editBox._text);
                }
            }
        });
        tmpEdTxt.addEventListener('keypress', function (e) {
            var editBox = thisPointer._editBox;

            if (e.keyCode === cc.KEY.enter) {
                e.stopPropagation();
                e.preventDefault();
                if(this.value === '') {
                    this.style.fontSize = editBox._placeholderFontSize + 'px';
                    this.style.color = cc.colorToHex(editBox._placeholderColor);
                }

                editBox._text = this.value;
                thisPointer._updateEditBoxContentStyle();
                thisPointer.hidden();
                if (editBox._delegate && editBox._delegate.editBoxEditingReturn) {
                    editBox._delegate.editBoxEditingReturn(editBox);
                }
                cc._canvas.focus();
            }
        });

        tmpEdTxt.addEventListener('focus', function () {
            var editBox = thisPointer._editBox;
            this.style.fontSize = thisPointer._edFontSize + 'px';
            this.style.color = cc.colorToHex(editBox._textColor);
            thisPointer._hiddenLabels();

            if(cc.view.isAutoFullScreenEnabled()) {
                thisPointer.__fullscreen = true;
                cc.view.enableAutoFullScreen(false);
                cc.screen.exitFullScreen();
            } else {
                thisPointer.__fullscreen = false;
            }
            this.__autoResize = cc.view.__resizeWithBrowserSize;
            cc.view.resizeWithBrowserSize(false);

            scrollWindowUp(editBox);

            if (editBox._delegate && editBox._delegate.editBoxEditingDidBegan) {
                editBox._delegate.editBoxEditingDidBegan(editBox);
            }
        });
        tmpEdTxt.addEventListener('blur', function () {
            var editBox = thisPointer._editBox;
            editBox._text = this.value;
            thisPointer._updateEditBoxContentStyle();
            if(thisPointer.__fullscreen) {
                cc.view.enableAutoFullScreen(true);
            }
            if (this.__autoResize) {
                cc.view.resizeWithBrowserSize(true);
            }
            window.scrollY = 0;
            if (editBox._delegate && editBox._delegate.editBoxEditingDidEnded) {
                editBox._delegate.editBoxEditingDidEnded(editBox);
            }

            if (this.value === '') {
                this.style.fontSize = editBox._placeholderFontSize + 'px';
                this.style.color = cc.colorToHex(editBox._placeholderColor);
            }
            thisPointer.hidden();
        });
        return tmpEdTxt;
    };

    proto._createDomTextArea = function () {
        this._removeDomInputControl();
        var thisPointer = this;
        var tmpEdTxt = this._edTxt = document.createElement('textarea');
        tmpEdTxt.type = 'text';
        tmpEdTxt.style.fontSize = this._edFontSize + 'px';
        tmpEdTxt.style.color = '#000000';
        tmpEdTxt.style.border = 0;
        tmpEdTxt.style.background = 'transparent';
        tmpEdTxt.style.width = '100%';
        tmpEdTxt.style.height = '100%';
        tmpEdTxt.style.active = 0;
        tmpEdTxt.style.outline = 'medium';
        tmpEdTxt.style.padding = '0';
        tmpEdTxt.style.resize = 'none';
        tmpEdTxt.style.textTransform = 'uppercase';
        tmpEdTxt.style.overflow_y = 'scroll';
        tmpEdTxt.style.display = 'none';
        tmpEdTxt.style.position = "absolute";
        tmpEdTxt.style.bottom = "0px";
        tmpEdTxt.style.left = LEFT_PADDING + "px";
        tmpEdTxt.style.className = "cocosEditBox";

        tmpEdTxt.addEventListener('input', function () {
            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, this.maxLength);
            }

            var editBox = thisPointer._editBox;
            if (editBox._delegate && editBox._delegate.editBoxTextChanged) {
                if(editBox._text.toLowerCase() !== this.value.toLowerCase()) {
                    editBox._text = this.value;
                    thisPointer._updateEditBoxContentStyle();
                    editBox._delegate.editBoxTextChanged(editBox, editBox._text);
                }
            }
        });

        tmpEdTxt.addEventListener('focus', function () {
            var editBox = thisPointer._editBox;
            thisPointer._hiddenLabels();

            this.style.fontSize = thisPointer._edFontSize + 'px';
            this.style.color = cc.colorToHex(editBox._textColor);
            if(cc.view.isAutoFullScreenEnabled()) {
                thisPointer.__fullscreen = true;
                cc.view.enableAutoFullScreen(false);
                cc.screen.exitFullScreen();
            } else {
                thisPointer.__fullscreen = false;
            }

            scrollWindowUp(editBox);

            if (editBox._delegate && editBox._delegate.editBoxEditingDidBegan) {
                editBox._delegate.editBoxEditingDidBegan(editBox);
            }

        });
        tmpEdTxt.addEventListener('keypress', function (e) {
            var editBox = thisPointer._editBox;

            if (e.keyCode === cc.KEY.enter) {
                e.stopPropagation();

                if (editBox._delegate && editBox._delegate.editBoxEditingReturn) {
                    editBox._delegate.editBoxEditingReturn(editBox);
                }
            }
        });
        tmpEdTxt.addEventListener('blur', function () {
            var editBox = thisPointer._editBox;
            editBox._text = this.value;
            thisPointer._updateEditBoxContentStyle();
            window.scrollY = 0;
            if(thisPointer.__fullscreen) {
                cc.view.enableAutoFullScreen(true);
            }

            if (editBox._delegate && editBox._delegate.editBoxEditingDidEnded) {
                editBox._delegate.editBoxEditingDidEnded(editBox);
            }

            if (this.value === '') {
                this.style.fontSize = editBox._placeholderFontSize + 'px';
                this.style.color = cc.colorToHex(editBox._placeholderColor);
            }

            thisPointer.hidden();
        });

        return tmpEdTxt;
    };

    proto._createLabels = function () {
        var editBoxSize = this._editBox.getContentSize();
        if(!this._textLabel) {
            this._textLabel = new _ccsg.Label();
            this._textLabel.setVisible(false);
            this._textLabel.setAnchorPoint(cc.p(0, 1));
            this._textLabel.setOverflow(_ccsg.Label.Overflow.CLAMP);
            this._editBox.addChild(this._textLabel, 100);
        }

        if(!this._placeholderLabel) {
            this._placeholderLabel = new _ccsg.Label();
            this._placeholderLabel.setAnchorPoint(cc.p(0, 1));
            this._placeholderLabel.setColor(cc.Color.GRAY);
            this._editBox.addChild(this._placeholderLabel, 100);
        }

        this._updateLabelPosition(editBoxSize);
    };

    proto._removeLabels = function () {
        if(!this._textLabel) return;

        this._editBox.removeChild(this._textLabel);
        this._textLabel = null;
    };

    proto._updateLabelPosition = function (editBoxSize) {
        if(!this._textLabel || !this._placeholderLabel) return;

        var labelContentSize = cc.size(editBoxSize.width - LEFT_PADDING, editBoxSize.height);
        this._textLabel.setContentSize(labelContentSize);
        this._placeholderLabel.setLineHeight(editBoxSize.height);
        var placeholderLabelSize = this._placeholderLabel.getContentSize();

        if (this._editBox._editBoxInputMode === InputMode.ANY){
            this._textLabel.setPosition(LEFT_PADDING, editBoxSize.height);
            this._placeholderLabel.setPosition(LEFT_PADDING, editBoxSize.height);
            this._placeholderLabel.setVerticalAlign(cc.VerticalTextAlignment.TOP);
            this._textLabel.setVerticalAlign(cc.VerticalTextAlignment.TOP);
            this._textLabel.enableWrapText(true);
        }
        else {
            this._textLabel.enableWrapText(false);
            this._textLabel.setPosition(LEFT_PADDING, editBoxSize.height);
            this._placeholderLabel.setPosition(LEFT_PADDING, (editBoxSize.height + placeholderLabelSize.height) / 2);
            this._placeholderLabel.setVerticalAlign(cc.VerticalTextAlignment.CENTER);
            this._textLabel.setVerticalAlign(cc.VerticalTextAlignment.CENTER);
        }

    };

    proto.setLineHeight = function (lineHeight) {
        if(this._textLabel) {
            this._textLabel.setLineHeight(lineHeight);
        }
    };

    proto._hiddenLabels = function () {
        if(this._textLabel) {
            this._textLabel.setVisible(false);
        }

        if(this._placeholderLabel) {
            this._placeholderLabel.setVisible(false);
        }
    };

    proto._updateEditBoxContentStyle = function() {
        var inputFlag = this._editBox._editBoxInputFlag;
        if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            this._editBox._text = this._editBox._text.toUpperCase();
        }
        else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
            this._editBox._text = capitalize(this._editBox._text);
        }
        else if (inputFlag === InputFlag.INITIAL_CAPS_SENTENCE) {
            this._editBox._text = capitalizeFirstLetter(this._editBox._text);
        }
    };

    proto._updateLabelString = function() {
        this._updateInputType();

        if(this._textLabel) {
            this._textLabel.setVisible(true);
            this._textLabel.setString(this._editBox._text);
        }

        if (this._edTxt.type === 'password') {
            var passwordString = '';
            var len = this._editBox._text.length;
            for (var i = 0; i < len; ++i) {
                passwordString += '\u25CF';
            }
            if(this._textLabel) {
                this._textLabel.setString(passwordString);
            }
        } else {
            this._updateEditBoxContentStyle();
            if(this._textLabel) {
                this._textLabel.setString(this._editBox._text);
            }
        }
    };

    proto._showLabels = function () {
        this._hiddenLabels();
        if (this._edTxt.value === '') {
            if(this._placeholderLabel) {
                this._placeholderLabel.setVisible(true);
                this._placeholderLabel.setString(this._editBox._placeholderText);
            }
        }
        else {
            this._updateLabelString();
        }
    };

    proto.show = function() {
        if(!this._editBox._alwaysOnTop) {
            if (this._edTxt.style.display === 'none') {
                this._edTxt.style.display = '';
                this._edTxt.focus();
            }
        }
        this._hiddenLabels();
    };

    proto.hidden = function() {
        if(!this._editBox._alwaysOnTop) {
            this._edTxt.style.display = 'none';
        }
        this._showLabels();
    };

    proto._setFont = function (fontStyle) {
        var res = cc.LabelTTF._fontStyleRE.exec(fontStyle);
        var textFontName = res[2];
        var textFontSize = parseInt(res[1]);
        if (res) {
            this.setFont(textFontName, textFontSize);
        }
    };

    proto.setFont = function (fontName, fontSize) {
        this._edFontName = fontName || this._edFontName;
        this._edFontSize = fontSize || this._edFontSize;
        this._updateDOMFontStyle();
    };

    proto.setFontName = function (fontName) {
        this._edFontName = fontName || this._edFontName;
        this._updateDOMFontStyle();
    };

    proto.setFontSize = function (fontSize) {
        this._edFontSize = fontSize || this._edFontSize;
        this._updateDOMFontStyle();
    };

    proto.setFontColor = function (color) {
        if(!this._edTxt) return;

        if (this._edTxt.value !== this._editBox._placeholderText) {
            this._edTxt.style.color = cc.colorToHex(color);
        }
        if(this._textLabel) {
            this._textLabel.setColor(color);
        }
    };

    proto.setPlaceHolder = function (text) {
        this._placeholderLabel.setString(text);
    };

    proto.setMaxLength = function (maxLength) {
        if(!this._edTxt) return;
        this._edTxt.maxLength = maxLength;
    };

    proto._updateDOMPlaceholderFontStyle = function () {
        this._placeholderLabel.setFontFileOrFamily(this._editBox._placeholderFontName);
        this._placeholderLabel.setFontSize(this._editBox._placeholderFontSize);
    };

    proto.setPlaceholderFontColor = function (color) {
        this._placeholderLabel.setColor(color);
    };

    proto._updateInputType = function () {
        if(this._editBox._keyboardReturnType === KeyboardReturnType.SEARCH) {
            this._edTxt.type = 'search';
        }

        var inputMode = this._editBox._editBoxInputMode;
        if(inputMode === InputMode.EMAIL_ADDR) {
            this._edTxt.type = 'email';
        } else if(inputMode === InputMode.NUMERIC ||
                 inputMode === InputMode.DECIMAL) {
            this._edTxt.type = 'number';
        } else if(inputMode === InputMode.PHONE_NUMBER) {
            this._edTxt.type = 'number';
            this._edTxt.pattern = '[0-9]*';
        } else if(inputMode === InputMode.URL) {
            this._edTxt.type = 'url';
        } else {
            this._edTxt.type = 'text';
        }


        if (this._editBox._editBoxInputFlag === InputFlag.PASSWORD) {
            this._edTxt.type = 'password';
        }
    };

    proto.setInputFlag = function (inputFlag) {
        if(!this._edTxt) return;

        this._updateInputType();

        this._edTxt.style.textTransform = 'none';

        if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            this._edTxt.style.textTransform = 'uppercase';
        }
        else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
            this._edTxt.style.textTransform = 'capitalize';
        }
        this._updateLabelString();
    };

    proto.setInputMode = function (inputMode) {
        this._removeDomInputControl();
        if (inputMode === InputMode.ANY) {
            this._createDomTextArea();
        }
        else {
            this._createDomInput();
        }
        this._addDomInputControl();

        this._updateInputType();
        var contentSize = this._node.getContentSize();
        this.updateSize(contentSize.width, contentSize.height);
    };

    proto.setString = function (text) {
        if(!this._edTxt) return;

        if (text !== null) {
            this._edTxt.value = text;

            if (text === '') {
                if(this._placeholderLabel) {
                    this._placeholderLabel.setString(this._editBox._placeholderText);
                    this._placeholderLabel.setColor(this._editBox._placeholderColor);
                    this._placeholderLabel.setVisible(true);
                }

                if(this._textLabel) {
                    this._textLabel.setVisible(false);
                }
            }
            else {
                this._edTxt.style.color = cc.colorToHex(this._editBox._textColor);
                if(this._textLabel) {
                    this._textLabel.setColor(this._editBox._textColor);
                }
                if(this._placeholderLabel) {
                    this._placeholderLabel.setVisible(false);
                }

                this._updateLabelString();
            }
        }
    };

    proto._updateDOMFontStyle = function() {
        if(!this._edTxt) return;

        if (this._edTxt.value !== '') {
            this._edTxt.style.fontFamily = this._edFontName;
            this._edTxt.style.fontSize = this._edFontSize + 'px';
        }
        if(this._textLabel) {
            this._textLabel.setFontSize(this._edFontSize);
            this._textLabel.setFontFileOrFamily(this._edFontName);
        }
    };


    proto.updateSize = function(newWidth, newHeight) {
        var editboxDomNode = this._edTxt;
        if (!editboxDomNode) return;

        editboxDomNode.style['width'] = newWidth + 'px';
        editboxDomNode.style['height'] = newHeight + 'px';

        this._updateLabelPosition(cc.size(newWidth, newHeight));
    };

    proto.createNativeControl = function() {
        this._createDomTextArea();
        this._addDomInputControl();
    };

    proto._addDomInputControl = function () {
        cc.game.container.appendChild(this._edTxt);
    };

    proto._removeDomInputControl = function () {
        var editBox = this._edTxt;
        if(editBox){
            var hasChild = false;
            if('contains' in cc.game.container) {
                hasChild = cc.game.container.contains(editBox);
            }else {
                hasChild = cc.game.container.compareDocumentPosition(editBox) % 16;
            }
            if(hasChild)
                cc.game.container.removeChild(editBox);
        }
        this._edTxt = null;
    };

    proto.initializeRenderCmd = function (node) {
        this._editBox = node;

        //it's a dom node, may be assigned with Input or TextArea.
        this._edFontSize = 14;
        this._edFontName = 'Arial';
        this._textLabel = null;
        this._placeholderLabel = null;
    };

    //define the canvas render command
    _ccsg.EditBox.CanvasRenderCmd = function (node) {
        _ccsg.Node.CanvasRenderCmd.call(this, node);
        this.initializeRenderCmd(node);
    };

    var canvasRenderCmdProto = _ccsg.EditBox.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
    cc.js.mixin(canvasRenderCmdProto, proto);
    canvasRenderCmdProto.constructor = _ccsg.EditBox.CanvasRenderCmd;

    canvasRenderCmdProto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);
        this.updateMatrix();
    };


    //define the webgl render command
    _ccsg.EditBox.WebGLRenderCmd = function (node) {
        _ccsg.Node.WebGLRenderCmd.call(this, node);
        this.initializeRenderCmd(node);
    };

    var webGLRenderCmdProto = _ccsg.EditBox.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
    cc.js.mixin(webGLRenderCmdProto, proto);
    webGLRenderCmdProto.constructor = _ccsg.EditBox.WebGLRenderCmd;

    webGLRenderCmdProto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);
        this.updateMatrix();
    };

}(_ccsg.EditBox._polyfill));

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 http://www.cocos.com
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.
 The software or tools in this License Agreement are licensed, not sold.
 Chukong Aipu reserves all rights not expressly granted to you.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

_ccsg.WebView = _ccsg.Node.extend(/** @lends _ccsg.WebView# */{

    ctor: function () {
        _ccsg.Node.prototype.ctor.call(this);
        this.setContentSize(cc.size(300, 200));
        this._EventList = {};
    },

    createDomElementIfNeeded: function () {
        if (!this._renderCmd._div) {
            this._renderCmd.createNativeControl();
        }
    },

    setJavascriptInterfaceScheme: function(scheme){},
    loadData: function(data, MIMEType, encoding, baseURL){},
    loadHTMLString: function(string, baseURL){},
    /**
     * Load an URL
     * @param {String} url
     */
    loadURL: function(url){
        this._renderCmd.updateURL(url);
        this._dispatchEvent(_ccsg.WebView.EventType.LOADING);
    },

    /**
     * Stop loading
     */
    stopLoading: function(){
        cc.log("Web does not support loading");
    },

    /**
     * Reload the WebView
     */
    reload: function(){
        var iframe = this._renderCmd._iframe;
        if(iframe){
            var win = iframe.contentWindow;
            if(win && win.location)
                win.location.reload();
        }
    },

    /**
     * Determine whether to go back
     */
    canGoBack: function(){
        cc.log("Web does not support query history");
        return true;
    },

    /**
     * Determine whether to go forward
     */
    canGoForward: function(){
        cc.log("Web does not support query history");
        return true;
    },

    /**
     * go back
     */
    goBack: function(){
        try{
            if(_ccsg.WebView._polyfill.closeHistory)
                return cc.log("The current browser does not support the GoBack");
            var iframe = this._renderCmd._iframe;
            if(iframe){
                var win = iframe.contentWindow;
                if(win && win.location)
                    win.history.back.call(win);
            }
        }catch(err){
            cc.log(err);
        }
    },

    /**
     * go forward
     */
    goForward: function(){
        try{
            if(_ccsg.WebView._polyfill.closeHistory)
                return cc.log("The current browser does not support the GoForward");
            var iframe = this._renderCmd._iframe;
            if(iframe){
                var win = iframe.contentWindow;
                if(win && win.location)
                    win.history.forward.call(win);
            }
        }catch(err){
            cc.log(err);
        }
    },

    /**
     * In the webview execution within a period of js string
     * @param {String} str
     */
    evaluateJS: function(str){
        var iframe = this._renderCmd._iframe;
        if(iframe){
            var win = iframe.contentWindow;
            try{
                win.eval(str);
                this._dispatchEvent(_ccsg.WebView.EventType.JS_EVALUATED);
            }catch(err){
                console.error(err);
            }
        }
    },

    /**
     * Limited scale
     */
    setScalesPageToFit: function(){
        cc.log("Web does not support zoom");
    },

    /**
     * The binding event
     * @param {_ccsg.WebView.EventType} event
     * @param {Function} callback
     */
    setEventListener: function(event, callback){
        this._EventList[event] = callback;
    },

    /**
     * Delete events
     * @param {_ccsg.WebView.EventType} event
     */
    removeEventListener: function(event){
        this._EventList[event] = null;
    },

    _dispatchEvent: function(event) {
        var callback = this._EventList[event];
        if (callback)
            callback.call(this, this, this._renderCmd._iframe.src);
    },

    _createRenderCmd: function(){
        return new _ccsg.WebView.RenderCmd(this);
    },

    /**
     * Set the contentSize
     * @param {Number} width
     * @param {Number} height
     */
    setContentSize: function(width, height){
        if (width.width !== undefined && width.height !== undefined) {
            height = width.height;
            width = width.width;
        }
        _ccsg.Node.prototype.setContentSize.call(this, width, height);
        this._renderCmd.updateSize(width, height);
    },

    /**
     * remove node
     */
    cleanup: function(){
        this._super();

        this._renderCmd.removeDom();
    },

    setVisible: function ( visible ) {
        _ccsg.Node.prototype.setVisible.call(this, visible);
        this._renderCmd.updateVisibility();
    }
});

_ccsg.WebView.EventType = {
    LOADING: 0,
    LOADED: 1,
    ERROR: 2,
    JS_EVALUATED: 3
};

(function(){

    var polyfill = _ccsg.WebView._polyfill = {
        devicePixelRatio: false,
        enableDiv: false
    };

    if(cc.sys.os === cc.sys.OS_IOS)
        polyfill.enableDiv = true;

    if(cc.sys.isMobile){
        if(cc.sys.browserType === cc.sys.BROWSER_TYPE_FIREFOX){
            polyfill.enableBG = true;
        }
    }else{
        if(cc.sys.browserType === cc.sys.BROWSER_TYPE_IE){
            polyfill.closeHistory = true;
        }
    }


})();

(function(polyfill){

    var RenderCmd;
    if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
        RenderCmd = _ccsg.Node.CanvasRenderCmd;
    } else {
        RenderCmd = _ccsg.Node.WebGLRenderCmd;
    }

    _ccsg.WebView.RenderCmd = function(node){
        RenderCmd.call(this, node);

        this._parent = null;
        this._div = null;
        this._iframe = null;
        this._listener = null;
    };

    var proto = _ccsg.WebView.RenderCmd.prototype = Object.create(RenderCmd.prototype);
    proto.constructor = _ccsg.WebView.RenderCmd;

    proto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);
        this.updateMatrix();
    };

    proto.updateStatus = function(){
        polyfill.devicePixelRatio = cc.view.isRetinaEnabled();
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        if(locFlag & flags.transformDirty){
            //update the transform
            this.transform(this.getParentRenderCmd(), true);
            this.updateMatrix();
            this._dirtyFlag = this._dirtyFlag & _ccsg.Node._dirtyFlags.transformDirty ^ this._dirtyFlag;
        }
    };

    proto.initEvent = function () {
        var node = this._node;
        this._iframe.addEventListener("load", function(){
            node._dispatchEvent(_ccsg.WebView.EventType.LOADED);
        });
        this._iframe.addEventListener("error", function(){
            node._dispatchEvent(_ccsg.WebView.EventType.ERROR);
        });
    };

    proto.resize = function(view){
        view = view || cc.view;
        var node = this._node,
            eventManager = cc.eventManager;
        if(node._parent && node._visible)
            this.updateMatrix();
        else{
            var list = eventManager._listenersMap[cc.game.EVENT_RESIZE].getFixedPriorityListeners();
            eventManager._removeListenerInVector(list, this._listener);
            this._listener = null;
        }
    };

    proto.updateMatrix = function(){
        if (!this._div) return;

        var node = this._node, scaleX = cc.view._scaleX, scaleY = cc.view._scaleY;
        var dpr = cc.view._devicePixelRatio;
        var t = this._worldTransform;

        scaleX /= dpr;
        scaleY /= dpr;

        var container = cc.game.container;
        var a = t.a * scaleX, b = t.b, c = t.c, d = t.d * scaleY;

        var offsetX = container && container.style.paddingLeft &&  parseInt(container.style.paddingLeft);
        var offsetY = container && container.style.paddingBottom && parseInt(container.style.paddingBottom);
        var tx = t.tx * scaleX + offsetX, ty = t.ty * scaleY + offsetY;

        var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
        this._div.style['transform'] = matrix;
        this._div.style['-webkit-transform'] = matrix;
        this._div.style['transform-origin'] = '0px 100% 0px';
        this._div.style['-webkit-transform-origin'] = '0px 100% 0px';
    };

    proto.initStyle = function(){
        if(!this._div)  return;
        var div = this._div;
        div.style.position = "absolute";
        div.style.bottom = "0px";
        div.style.left = "0px";
    };

    proto.updateURL = function(url){
        var iframe = this._iframe;
        iframe.src = url;
        var self = this;
        var cb = function(){
            self._loaded = true;
            self.updateVisibility();
            iframe.removeEventListener("load", cb);
        };
        iframe.addEventListener("load", cb);
    };

    proto.updateSize = function(w, h){
        var div = this._div;
        if(div){
            div.style["width"] = w+"px";
            div.style["height"] = h+"px";
        }
    };

    proto.createDom = function () {
        if(polyfill.enableDiv){
            this._div = document.createElement("div");
            this._div.style["-webkit-overflow"] = "auto";
            this._div.style["-webkit-overflow-scrolling"] = "touch";
            this._iframe = document.createElement("iframe");
            this._div.appendChild(this._iframe);
        }else{
            this._div = this._iframe = document.createElement("iframe");
        }

        if(polyfill.enableBG)
            this._div.style["background"] = "#FFF";

        this._div.style["background"] = "#FFF";
        var contentSize = this._node._contentSize;
        this._div.style.height = contentSize.height + "px";
        this._div.style.width = contentSize.width + "px";
        this._div.style.overflow = "scroll";
        this._div.style.border = "none";
        cc.game.container.appendChild(this._div);
    };

    proto.createNativeControl = function () {
        this.createDom();
        this.initStyle();
        this.initEvent();
    };

    proto.removeDom = function(){
        var div = this._div;
        if(div){
            var hasChild = false;
            if('contains' in cc.game.container) {
                hasChild = cc.game.container.contains(div);
            }else {
                hasChild = cc.game.container.compareDocumentPosition(div) % 16;
            }
            if(hasChild)
                cc.game.container.removeChild(div);
        }
        this._div = null;
    };

    proto.updateVisibility = function () {
        var node = this._node;
        if (!this._div) return;
        var div = this._div;
        if (node.visible) {
            div.style.visibility = 'visible';
            cc.game.container.appendChild(div);
        } else {
            div.style.visibility = 'hidden';
            if(div){
                var hasChild = false;
                if('contains' in cc.game.container) {
                    hasChild = cc.game.container.contains(div);
                }else {
                    hasChild = cc.game.container.compareDocumentPosition(div) % 16;
                }
                if(hasChild)
                    cc.game.container.removeChild(div);
            }
        }
    };

})(_ccsg.WebView._polyfill);


}).call(window, cc, ccui, ccs, cp);

//# sourceMappingURL=modular-cocos2d-cut.js.map