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
 *     cc.spriteFrameAnimationCache is a singleton object that manages the Animations.<br/>
 *     It saves in a cache the animations. You should use this class if you want to save your animations in a cache.<br/>
 * <br/>
 * @class
 * @name cc.spriteFrameAnimationCache
 * @example
 * cc.spriteFrameAnimationCache.addAnimation(animation,"animation1");
 */
cc.spriteFrameAnimationCache = {
	_animations: {},

    /**
     * Adds a cc.SpriteFrameAnimation with a name.
     * @param {cc.SpriteFrameAnimation} animation
     * @param {String} name
     */
    addAnimation:function (animation, name) {
        this._animations[name] = animation;
    },

    /**
     * Deletes a cc.SpriteFrameAnimation from the cache.
     * @param {String} name
     */
    removeAnimation:function (name) {
        if (!name) {
            return;
        }
        if (this._animations[name]) {
            delete this._animations[name];
        }
    },

    /**
     * <p>
     *     Returns a cc.SpriteFrameAnimation that was previously added.<br/>
     *      If the name is not found it will return nil.<br/>
     *      You should retain the returned copy if you are going to use it.</br>
     * </p>
     * @param {String} name
     * @return {cc.SpriteFrameAnimation}
     */
    getAnimation:function (name) {
        if (this._animations[name])
            return this._animations[name];
        return null;
    },

    _addAnimationsWithDictionary:function (dictionary,plist) {
        var animations = dictionary["animations"];
        if (!animations) {
            cc.logID(2500);
            return;
        }

        var version = 1;
        var properties = dictionary["properties"];
        if (properties) {
            version = (properties["format"] != null) ? parseInt(properties["format"]) : version;
            var spritesheets = properties["spritesheets"];
            var spriteFrameCache = cc.spriteFrameCache;
            var path = cc.path;
            for (var i = 0; i < spritesheets.length; i++) {
                spriteFrameCache.addSpriteFrames(path.changeBasename(plist, spritesheets[i]));
            }
        }

        switch (version) {
            case 1:
                this._parseVersion1(animations);
                break;
            case 2:
                this._parseVersion2(animations);
                break;
            default :
                cc.logID(2501);
                break;
        }
    },

    /**
     * <p>
     *    Adds an animations from a plist file.<br/>
     *    Make sure that the frames were previously loaded in the cc.SpriteFrameCache.
     * </p>
     * @param {String} plist
     */
    addAnimations:function (plist) {

        cc.assertID(plist, 2509);

        var dict = cc.loader.getRes(plist);

        if(!dict){
            cc.logID(2502);
            return;
        }

        this._addAnimationsWithDictionary(dict,plist);
    },

    _parseVersion1:function (animations) {
        var frameCache = cc.spriteFrameCache;

        for (var key in animations) {
            var animationDict = animations[key];
            var frameNames = animationDict["frames"];
            var delay = parseFloat(animationDict["delay"]) || 0;
            var animation = null;
            if (!frameNames) {
                cc.logID(2503, key);
                continue;
            }

            var frames = [];
            for (var i = 0; i < frameNames.length; i++) {
                var spriteFrame = frameCache.getSpriteFrame(frameNames[i]);
                if (!spriteFrame) {
                    cc.logID(2504, key, frameNames[i]);
                    continue;
                }
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                frames.push(animFrame);
            }

            if (frames.length === 0) {
                cc.logID(2505, key);
                continue;
            } else if (frames.length !== frameNames.length) {
                cc.logID(2506, key);
            }
            animation = new cc.SpriteFrameAnimation(frames, delay, 1);
            cc.spriteFrameAnimationCache.addAnimation(animation, key);
        }
    },

    _parseVersion2:function (animations) {
        var frameCache = cc.spriteFrameCache;

        for (var key in animations) {
            var animationDict = animations[key];

            var isLoop = animationDict["loop"];
            var loopsTemp = parseInt(animationDict["loops"]);
            var loops = isLoop ? cc.macro.REPEAT_FOREVER : ((isNaN(loopsTemp)) ? 1 : loopsTemp);
            var restoreOriginalFrame = (animationDict["restoreOriginalFrame"] && animationDict["restoreOriginalFrame"] == true) ? true : false;
            var frameArray = animationDict["frames"];

            if (!frameArray) {
                cc.logID(2507, key);
                continue;
            }

            //Array of AnimationFrames
            var arr = [];
            for (var i = 0; i < frameArray.length; i++) {
                var entry = frameArray[i];
                var spriteFrameName = entry["spriteframe"];
                var spriteFrame = frameCache.getSpriteFrame(spriteFrameName);
                if (!spriteFrame) {
                    cc.logID(2508, key, spriteFrameName);
                    continue;
                }

                var delayUnits = parseFloat(entry["delayUnits"]) || 0;
                var userInfo = entry["notification"];
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, delayUnits, userInfo);
                arr.push(animFrame);
            }

            var delayPerUnit = parseFloat(animationDict["delayPerUnit"]) || 0;
            var animation = new cc.SpriteFrameAnimation();
            animation.initWithAnimationFrames(arr, delayPerUnit, loops);
            animation.setRestoreOriginalFrame(restoreOriginalFrame);
            cc.spriteFrameAnimationCache.addAnimation(animation, key);
        }
    },

	_clear: function () {
		this._animations = {};
	}
};
