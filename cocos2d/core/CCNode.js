/****************************************************************************
 Copyright (c) 2013-2017 Chukong Technologies Inc.

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

'use strict';

var PrefabHelper = require('./utils/prefab-helper');
var SgHelper = require('./utils/scene-graph-helper');

var Flags = cc.Object.Flags;
var Destroying = Flags.Destroying;

var POSITION_CHANGED = 'position-changed';
var SIZE_CHANGED = 'size-changed';
var ANCHOR_CHANGED = 'anchor-changed';
var CHILD_ADDED = 'child-added';
var CHILD_REMOVED = 'child-removed';
var CHILD_REORDER = 'child-reorder';

var ERR_INVALID_NUMBER = CC_EDITOR && 'The %s is invalid';

var Misc = require('./utils/misc');
//var RegisteredInEditor = Flags.RegisteredInEditor;

/**
 * !#en The event type supported by Node
 * !#zh Node 支持的事件类型
 * @enum Node.EventType
 * @static
 * @namespace Node
 */
var EventType = cc.Enum({
    /**
     * !#en The event type for touch start event, you can use its value directly: 'touchstart'
     * !#zh 当手指触摸到屏幕时。
     * @property TOUCH_START
     * @type {String}
     * @static
     */
    TOUCH_START: 'touchstart',
    /**
     * !#en The event type for touch move event, you can use its value directly: 'touchmove'
     * !#zh 当手指在屏幕上目标节点区域内移动时。
     * @property TOUCH_MOVE
     * @type {String}
     * @value 1
     * @static
     */
    TOUCH_MOVE: 'touchmove',
    /**
     * !#en The event type for touch end event, you can use its value directly: 'touchend'
     * !#zh 当手指在目标节点区域内离开屏幕时。
     * @property TOUCH_END
     * @type {String}
     * @static
     */
    TOUCH_END: 'touchend',
    /**
     * !#en The event type for touch end event, you can use its value directly: 'touchcancel'
     * !#zh 当手指在目标节点区域外离开屏幕时。
     * @property TOUCH_CANCEL
     * @type {String}
     * @static
     */
    TOUCH_CANCEL: 'touchcancel',

    /**
     * !#en The event type for mouse down events, you can use its value directly: 'mousedown'
     * !#zh 当鼠标按下时触发一次。
     * @property MOUSE_DOWN
     * @type {String}
     * @static
     */
    MOUSE_DOWN: 'mousedown',
    /**
     * !#en The event type for mouse move events, you can use its value directly: 'mousemove'
     * !#zh 当鼠标在目标节点在目标节点区域中移动时，不论是否按下。
     * @property MOUSE_MOVE
     * @type {String}
     * @static
     */
    MOUSE_MOVE: 'mousemove',
    /**
     * !#en The event type for mouse enter target events, you can use its value directly: 'mouseenter'
     * !#zh 当鼠标移入目标节点区域时，不论是否按下。
     * @property MOUSE_ENTER
     * @type {String}
     * @static
     */
    MOUSE_ENTER: 'mouseenter',
    /**
     * !#en The event type for mouse leave target events, you can use its value directly: 'mouseleave'
     * !#zh 当鼠标移出目标节点区域时，不论是否按下。
     * @property MOUSE_LEAVE
     * @type {String}
     * @static
     */
    MOUSE_LEAVE: 'mouseleave',
    /**
     * !#en The event type for mouse up events, you can use its value directly: 'mouseup'
     * !#zh 当鼠标从按下状态松开时触发一次。
     * @property MOUSE_UP
     * @type {String}
     * @static
     */
    MOUSE_UP: 'mouseup',
    /**
     * !#en The event type for mouse wheel events, you can use its value directly: 'mousewheel'
     * !#zh 当鼠标滚轮滚动时。
     * @property MOUSE_WHEEL
     * @type {String}
     * @static
     */
    MOUSE_WHEEL: 'mousewheel',
});

var _touchEvents = [
    EventType.TOUCH_START,
    EventType.TOUCH_MOVE,
    EventType.TOUCH_END,
    EventType.TOUCH_CANCEL,
];
var _mouseEvents = [
    EventType.MOUSE_DOWN,
    EventType.MOUSE_ENTER,
    EventType.MOUSE_MOVE,
    EventType.MOUSE_LEAVE,
    EventType.MOUSE_UP,
    EventType.MOUSE_WHEEL,
];

var _currentHovered = null;

var _touchStartHandler = function (touch, event) {
    var pos = touch.getLocation();
    var node = this.owner;

    if (node._hitTest(pos, this)) {
        event.type = EventType.TOUCH_START;
        event.touch = touch;
        event.bubbles = true;
        node.dispatchEvent(event);
        return true;
    }
    return false;
};
var _touchMoveHandler = function (touch, event) {
    var node = this.owner;
    event.type = EventType.TOUCH_MOVE;
    event.touch = touch;
    event.bubbles = true;
    node.dispatchEvent(event);
};
var _touchEndHandler = function (touch, event) {
    var pos = touch.getLocation();
    var node = this.owner;

    if (node._hitTest(pos, this)) {
        event.type = EventType.TOUCH_END;
    }
    else {
        event.type = EventType.TOUCH_CANCEL;
    }
    event.touch = touch;
    event.bubbles = true;
    node.dispatchEvent(event);
};

var _mouseDownHandler = function (event) {
    var pos = event.getLocation();
    var node = this.owner;

    if (node._hitTest(pos, this)) {
        event.type = EventType.MOUSE_DOWN;
        node.dispatchEvent(event);
        event.stopPropagation();
    }
};
var _mouseMoveHandler = function (event) {
    var pos = event.getLocation();
    var node = this.owner;
    if (node._hitTest(pos, this)) {
        event.stopPropagation();
        if (!this._previousIn) {
            // Fix issue when hover node switched, previous hovered node won't get MOUSE_LEAVE notification
            if (_currentHovered) {
                event.type = EventType.MOUSE_LEAVE;
                _currentHovered.dispatchEvent(event);
                _currentHovered._mouseListener._previousIn = false;
            }
            _currentHovered = this.owner;
            event.type = EventType.MOUSE_ENTER;
            node.dispatchEvent(event);
            this._previousIn = true;
        }
        event.type = EventType.MOUSE_MOVE;
        node.dispatchEvent(event);
    }
    else if (this._previousIn) {
        event.type = EventType.MOUSE_LEAVE;
        node.dispatchEvent(event);
        this._previousIn = false;
        _currentHovered = null;
    }
};
var _mouseUpHandler = function (event) {
    var pos = event.getLocation();
    var node = this.owner;

    if (node._hitTest(pos, this)) {
        event.type = EventType.MOUSE_UP;
        node.dispatchEvent(event);
        event.stopPropagation();
    }
};
var _mouseWheelHandler = function (event) {
    var pos = event.getLocation();
    var node = this.owner;

    if (node._hitTest(pos, this)) {
        event.type = EventType.MOUSE_WHEEL;
        node.dispatchEvent(event);
        //FIXME: separate wheel event and other mouse event.
        // event.stopPropagation();
    }
};

function _searchMaskParent (node) {
    var Mask = cc.Mask;
    if (Mask) {
        var index = 0;
        for (var curr = node; curr && cc.Node.isNode(curr); curr = curr._parent, ++index) {
            if (curr.getComponent(Mask)) {
                return {
                    index: index,
                    node: curr
                };
            }
        }
    }

    return null;
}

function updateOrder (node) {
    node._parent._delaySort();
    if (!CC_JSB) {
        cc.eventManager._setDirtyForNode(node);
    }
}

/**
 * !#en
 * Class of all entities in Cocos Creator scenes.<br/>
 * Node also inherits from {{#crossLink "EventTarget"}}Event Target{{/crossLink}}, it permits Node to dispatch events.
 * For events supported by Node, please refer to {{#crossLink "Node.EventType"}}{{/crossLink}}
 * !#zh
 * Cocos Creator 场景中的所有节点类。节点也继承了 {{#crossLink "EventTarget"}}EventTarget{{/crossLink}}，它允许节点发送事件。<br/>
 * 支持的节点事件，请参阅 {{#crossLink "Node.EventType"}}{{/crossLink}}。
 * @class Node
 * @extends _BaseNode
 */
var Node = cc.Class({
    name: 'cc.Node',
    extends: require('./utils/base-node'),

    properties: {
        // SERIALIZABLE
        _opacity: 255,
        _color: cc.Color.WHITE,
        _cascadeOpacityEnabled: true,
        _anchorPoint: cc.p(0.5, 0.5),
        _contentSize: cc.size(0, 0),
        _rotationX: 0,
        _rotationY: 0.0,
        _scaleX: 1.0,
        _scaleY: 1.0,
        _position: cc.p(0, 0),
        _skewX: 0,
        _skewY: 0,
        _localZOrder: 0,
        _globalZOrder: 0,
        _opacityModifyRGB: false,

        // internal properties

        /**
         * !#en
         * Group index of node.<br/>
         * Which Group this node belongs to will resolve that this node's collision components can collide with which other collision componentns.<br/>
         * !#zh
         * 节点的分组索引。<br/>
         * 节点的分组将关系到节点的碰撞组件可以与哪些碰撞组件相碰撞。<br/>
         * @property groupIndex
         * @type {Integer}
         * @default 0
         */
        groupIndex: {
            default: 0,
            type: cc.Integer
        },

        /**
         * !#en
         * Group of node.<br/>
         * Which Group this node belongs to will resolve that this node's collision components can collide with which other collision componentns.<br/>
         * !#zh
         * 节点的分组。<br/>
         * 节点的分组将关系到节点的碰撞组件可以与哪些碰撞组件相碰撞。<br/>
         * @property group
         * @type {String}
         */
        group: {
            get: function () {
                return cc.game.groupList[this.groupIndex] || '';
            },

            set: function (value) {
                this.groupIndex = cc.game.groupList.indexOf(value);
                this.emit('group-changed');
            }
        },

        //properties moved from base node begin

        /**
         * !#en x axis position of node.
         * !#zh 节点 X 轴坐标。
         * @property x
         * @type {Number}
         * @example
         * node.x = 100;
         * cc.log("Node Position X: " + node.x);
         */
        x: {
            get: function () {
                return this._position.x;
            },
            set: function (value) {
                var localPosition = this._position;
                if (value !== localPosition.x) {
                    if (!CC_EDITOR || isFinite(value)) {
                        if (CC_EDITOR) {
                            var oldValue = localPosition.x;
                        }

                        localPosition.x = value;
                        this._sgNode.setPositionX(value);

                        // fast check event
                        var capListeners = this._capturingListeners &&
                            this._capturingListeners._callbackTable[POSITION_CHANGED];
                        var bubListeners = this._bubblingListeners &&
                            this._bubblingListeners._callbackTable[POSITION_CHANGED];
                        if ((capListeners && capListeners.length > 0) || (bubListeners && bubListeners.length > 0)) {
                            // send event
                            if (CC_EDITOR) {
                                this.emit(POSITION_CHANGED, new cc.Vec2(oldValue, localPosition.y));
                            }
                            else {
                                this.emit(POSITION_CHANGED);
                            }
                        }
                    }
                    else {
                        cc.error(ERR_INVALID_NUMBER, 'new x');
                    }
                }
            },
        },

        /**
         * !#en y axis position of node.
         * !#zh 节点 Y 轴坐标。
         * @property y
         * @type {Number}
         * @example
         * node.y = 100;
         * cc.log("Node Position Y: " + node.y);
         */
        y: {
            get: function () {
                return this._position.y;
            },
            set: function (value) {
                var localPosition = this._position;
                if (value !== localPosition.y) {
                    if (!CC_EDITOR || isFinite(value)) {
                        if (CC_EDITOR) {
                            var oldValue = localPosition.y;
                        }

                        localPosition.y = value;
                        this._sgNode.setPositionY(value);

                        // fast check event
                        var capListeners = this._capturingListeners &&
                            this._capturingListeners._callbackTable[POSITION_CHANGED];
                        var bubListeners = this._bubblingListeners &&
                            this._bubblingListeners._callbackTable[POSITION_CHANGED];
                        if ((capListeners && capListeners.length > 0) || (bubListeners && bubListeners.length > 0)) {
                            // send event
                            if (CC_EDITOR) {
                                this.emit(POSITION_CHANGED, new cc.Vec2(localPosition.x, oldValue));
                            }
                            else {
                                this.emit(POSITION_CHANGED);
                            }
                        }
                    }
                    else {
                        cc.error(ERR_INVALID_NUMBER, 'new y');
                    }
                }
            },
        },

        /**
         * !#en Rotation of node.
         * !#zh 该节点旋转角度。
         * @property rotation
         * @type {Number}
         * @example
         * node.rotation = 90;
         * cc.log("Node Rotation: " + node.rotation);
         */
        rotation: {
            get: function () {
                if (this._rotationX !== this._rotationY)
                    cc.logID(1602);
                return this._rotationX;
            },
            set: function (value) {
                if (this._rotationX !== value || this._rotationY !== value) {
                    this._rotationX = this._rotationY = value;
                    this._sgNode.rotation = value;
                }
            }
        },

        /**
         * !#en Rotation on x axis.
         * !#zh 该节点 X 轴旋转角度。
         * @property rotationX
         * @type {Number}
         * @example
         * node.rotationX = 45;
         * cc.log("Node Rotation X: " + node.rotationX);
         */
        rotationX: {
            get: function () {
                return this._rotationX;
            },
            set: function (value) {
                if (this._rotationX !== value) {
                    this._rotationX = value;
                    this._sgNode.rotationX = value;
                }
            },
        },

        /**
         * !#en Rotation on y axis.
         * !#zh 该节点 Y 轴旋转角度。
         * @property rotationY
         * @type {Number}
         * @example
         * node.rotationY = 45;
         * cc.log("Node Rotation Y: " + node.rotationY);
         */
        rotationY: {
            get: function () {
                return this._rotationY;
            },
            set: function (value) {
                if (this._rotationY !== value) {
                    this._rotationY = value;
                    this._sgNode.rotationY = value;
                }
            },
        },

        /**
         * !#en Scale on x axis.
         * !#zh 节点 X 轴缩放。
         * @property scaleX
         * @type {Number}
         * @example
         * node.scaleX = 0.5;
         * cc.log("Node Scale X: " + node.scaleX);
         */
        scaleX: {
            get: function () {
                return this._scaleX;
            },
            set: function (value) {
                if (this._scaleX !== value) {
                    this._scaleX = value;
                    this._sgNode.scaleX = value;
                }
            },
        },

        /**
         * !#en Scale on y axis.
         * !#zh 节点 Y 轴缩放。
         * @property scaleY
         * @type {Number}
         * @example
         * node.scaleY = 0.5;
         * cc.log("Node Scale Y: " + node.scaleY);
         */
        scaleY: {
            get: function () {
                return this._scaleY;
            },
            set: function (value) {
                if (this._scaleY !== value) {
                    this._scaleY = value;
                    this._sgNode.scaleY = value;
                }
            },
        },

        /**
         * !#en Skew x
         * !#zh 该节点 Y 轴倾斜角度。
         * @property skewX
         * @type {Number}
         * @example
         * node.skewX = 0;
         * cc.log("Node SkewX: " + node.skewX);
         */
        skewX: {
            get: function () {
                return this._skewX;
            },
            set: function (value) {
                this._skewX = value;
                this._sgNode.skewX = value;
            }
        },

        /**
         * !#en Skew y
         * !#zh 该节点 X 轴倾斜角度。
         * @property skewY
         * @type {Number}
         * @example
         * node.skewY = 0;
         * cc.log("Node SkewY: " + node.skewY);
         */
        skewY: {
            get: function () {
                return this._skewY;
            },
            set: function (value) {
                this._skewY = value;
                this._sgNode.skewY = value;
            }
        },

        /**
         * !#en Opacity of node, default value is 255.
         * !#zh 节点透明度，默认值为 255。
         * @property opacity
         * @type {Number}
         * @example
         * node.opacity = 255;
         */
        opacity: {
            get: function () {
                return this._opacity;
            },
            set: function (value) {
                if (this._opacity !== value) {
                    this._opacity = value;
                    this._sgNode.setOpacity(value);
                    if (!this._cascadeOpacityEnabled) {
                        var sizeProvider = this._sizeProvider;
                        if (sizeProvider instanceof _ccsg.Node && sizeProvider !== this._sgNode) {
                            sizeProvider.setOpacity(value);
                        }
                    }
                }
            },
            range: [0, 255]
        },

        /**
         * !#en Indicate whether node's opacity value affect its child nodes, default value is true.
         * !#zh 节点的不透明度值是否影响其子节点，默认值为 true。
         * @property cascadeOpacity
         * @type {Boolean}
         * @example
         * cc.log("CascadeOpacity: " + node.cascadeOpacity);
         */
        cascadeOpacity: {
            get: function () {
                return this._cascadeOpacityEnabled;
            },
            set: function (value) {
                if (this._cascadeOpacityEnabled !== value) {
                    this._cascadeOpacityEnabled = value;
                    this._sgNode.cascadeOpacity = value;

                    var opacity = value ? 255 : this._opacity;
                    var sizeProvider = this._sizeProvider;
                    if (sizeProvider instanceof _ccsg.Node) {
                        sizeProvider.setOpacity(opacity);
                    }
                }
            },
        },

        /**
         * !#en Color of node, default value is white: (255, 255, 255).
         * !#zh 节点颜色。默认为白色，数值为：（255，255，255）。
         * @property color
         * @type {Color}
         * @example
         * node.color = new cc.Color(255, 255, 255);
         */
        color: {
            get: function () {
                var color = this._color;
                return new cc.Color(color.r, color.g, color.b, color.a);
            },
            set: function (value) {
                if (!this._color.equals(value)) {
                    var color = this._color;
                    color.r = value.r;
                    color.g = value.g;
                    color.b = value.b;
                    if (CC_DEV && value.a !== 255) {
                        cc.warnID(1626);
                    }
                    if (this._sizeProvider instanceof _ccsg.Node) {
                        this._sizeProvider.setColor(value);
                    }
                }
            },
        },

        /**
         * !#en Anchor point's position on x axis.
         * !#zh 节点 X 轴锚点位置。
         * @property anchorX
         * @type {Number}
         * @example
         * node.anchorX = 0;
         */
        anchorX: {
            get: function () {
                return this._anchorPoint.x;
            },
            set: function (value) {
                var anchorPoint = this._anchorPoint;
                if (anchorPoint.x !== value) {
                    anchorPoint.x = value;
                    var sizeProvider = this._sizeProvider;
                    if (sizeProvider instanceof _ccsg.Node) {
                        sizeProvider.setAnchorPoint(anchorPoint);
                    }
                    this.emit(ANCHOR_CHANGED);
                }
            },
        },

        /**
         * !#en Anchor point's position on y axis.
         * !#zh 节点 Y 轴锚点位置。
         * @property anchorY
         * @type {Number}
         * @example
         * node.anchorY = 0;
         */
        anchorY: {
            get: function () {
                return this._anchorPoint.y;
            },
            set: function (value) {
                var anchorPoint = this._anchorPoint;
                if (anchorPoint.y !== value) {
                    anchorPoint.y = value;
                    var sizeProvider = this._sizeProvider;
                    if (sizeProvider instanceof _ccsg.Node) {
                        sizeProvider.setAnchorPoint(anchorPoint);
                    }
                    this.emit(ANCHOR_CHANGED);
                }
            },
        },

        /**
         * !#en Width of node.
         * !#zh 节点宽度。
         * @property width
         * @type {Number}
         * @example
         * node.width = 100;
         */
        width: {
            get: function () {
                if (this._sizeProvider) {
                    var w = this._sizeProvider._getWidth();
                    this._contentSize.width = w;
                    return w;
                }
                else {
                    return this._contentSize.width;
                }
            },
            set: function (value) {
                if (value !== this._contentSize.width) {
                    var sizeProvider = this._sizeProvider;
                    if (sizeProvider) {
                        sizeProvider.setContentSize(value, sizeProvider._getHeight());
                    }
                    if (CC_EDITOR) {
                        var clone = cc.size(this._contentSize);
                    }
                    this._contentSize.width = value;
                    if (CC_EDITOR) {
                        this.emit(SIZE_CHANGED, clone);
                    }
                    else {
                        this.emit(SIZE_CHANGED);
                    }
                }
            },
        },

        /**
         * !#en Height of node.
         * !#zh 节点高度。
         * @property height
         * @type {Number}
         * @example
         * node.height = 100;
         */
        height: {
            get: function () {
                if (this._sizeProvider) {
                    var h = this._sizeProvider._getHeight();
                    this._contentSize.height = h;
                    return h;
                }
                else {
                    return this._contentSize.height;
                }
            },
            set: function (value) {
                if (value !== this._contentSize.height) {
                    var sizeProvider = this._sizeProvider;
                    if (sizeProvider) {
                        sizeProvider.setContentSize(sizeProvider._getWidth(), value);
                    }
                    if (CC_EDITOR) {
                        var clone = cc.size(this._contentSize);
                    }
                    this._contentSize.height = value;
                    if (CC_EDITOR) {
                        this.emit(SIZE_CHANGED, clone);
                    }
                    else {
                        this.emit(SIZE_CHANGED);
                    }
                }
            },
        },

        /**
         * Indicate whether ignore the anchor point property for positioning.
         * @property _ignoreAnchor
         * @type {Boolean}
         * @private
         */
        _ignoreAnchor: {
            get: function () {
                return this.__ignoreAnchor;
            },
            set: function (value) {
                if (this.__ignoreAnchor !== value) {
                    this.__ignoreAnchor = value;
                    this._sgNode.ignoreAnchor = value;
                    var sizeProvider = this._sizeProvider;
                    if (sizeProvider instanceof _ccsg.Node && sizeProvider !== this._sgNode) {
                        sizeProvider.ignoreAnchor = value;
                    }
                    this.emit(ANCHOR_CHANGED);
                }
            },
        },

        /**
         * !#en Z order in depth which stands for the drawing order.
         * !#zh 该节点渲染排序的 Z 轴深度。
         * @property zIndex
         * @type {Number}
         * @example
         * node.zIndex = 1;
         * cc.log("Node zIndex: " + node.zIndex);
         */
        zIndex: {
            get: function () {
                return this._localZOrder;
            },
            set: function (value) {
                if (this._localZOrder !== value) {
                    this._localZOrder = value;
                    this._sgNode.zIndex = value;

                    if (this._parent) {
                        updateOrder(this);
                    }
                }
            }
        },

        //properties moved from base node end
    },

    ctor: function (name) {

        /**
         * Current scene graph node for this node.
         *
         * @property _sgNode
         * @type {_ccsg.Node}
         * @private
         */
        var sgNode = this._sgNode = new _ccsg.Node();
        if (CC_JSB) {
            sgNode.retain();
            sgNode._entity = this;
            sgNode.onEnter = function () {
                _ccsg.Node.prototype.onEnter.call(this);
                if (this._entity && !this._entity._active) {
                    cc.director.getActionManager().pauseTarget(this);
                    cc.eventManager.pauseTarget(this);
                }
            };
        }
        if (!cc.game._isCloning) {
            sgNode.cascadeOpacity = true;
        }

        /**
         * Current active size provider for this node.
         * Size provider can equals to this._sgNode.
         *
         * @property _sizeProvider
         * @type {_ccsg.Node}
         * @private
         */
        this._sizeProvider = null;

        this.__ignoreAnchor = false;
        this._reorderChildDirty = false;

        // cache component
        this._widget = null;

        // Touch event listener
        this._touchListener = null;

        // Mouse event listener
        this._mouseListener = null;

        // Retained actions for JSB
        if (CC_JSB) {
            this._retainedActions = [];
        }
    },

    statics: {
        // is node but not scene
        isNode: function (obj) {
            return obj instanceof Node && (obj.constructor === Node || !(obj instanceof cc.Scene));
        }
    },

    // OVERRIDES

    _onPreDestroy: function () {
        var i, len;

        // marked as destroying
        this._objFlags |= Destroying;

        // detach self and children from editor
        var parent = this._parent;
        var destroyByParent = parent && (parent._objFlags & Destroying);
        if (!destroyByParent) {
            if (CC_EDITOR || CC_TEST) {
                this._registerIfAttached(false);
            }
        }

        // destroy children
        var children = this._children;
        for (i = 0, len = children.length; i < len; ++i) {
            // destroy immediate so its _onPreDestroy can be called
            children[i]._destroyImmediate();
        }

        // destroy self components
        for (i = 0, len = this._components.length; i < len; ++i) {
            var component = this._components[i];
            // destroy immediate so its _onPreDestroy can be called
            component._destroyImmediate();
        }

        // Actions
        cc.director.getActionManager().removeAllActionsFromTarget(this);
        this._releaseAllActions();

        // Remove Node.currentHovered
        if (_currentHovered === this) {
            _currentHovered = null;
        }

        // Remove all listeners
        if (CC_JSB && this._touchListener) {
            this._touchListener.release();
            this._touchListener.owner = null;
            this._touchListener.mask = null;
            this._touchListener = null;
        }
        if (CC_JSB && this._mouseListener) {
            this._mouseListener.release();
            this._mouseListener.owner = null;
            this._mouseListener.mask = null;
            this._mouseListener = null;
        }
        cc.eventManager.removeListeners(this);
        for (i = 0, len = this.__eventTargets.length; i < len; ++i) {
            var target = this.__eventTargets[i];
            target && target.targetOff(this);
        }
        this.__eventTargets.length = 0;

        // remove from persist
        if (this._persistNode) {
            cc.game.removePersistRootNode(this);
        }

        if (!destroyByParent) {
            // remove from parent
            if (parent) {
                var childIndex = parent._children.indexOf(this);
                parent._children.splice(childIndex, 1);
                parent.emit('child-removed', this);
            }

            this._removeSgNode();

            // simulate some destruct logic to make undo system work correctly
            if (CC_EDITOR) {
                // ensure this node can reattach to scene by undo system
                this._parent = null;
            }
        }
        else if (CC_JSB) {
            this._sgNode.release();
            this._sgNode._entity = null;
            this._sgNode = null;
        }
    },

    // INTERNAL

    /*
     * The initializer for Node which will be called before all components onLoad
     */
    _onBatchCreated: function () {
        var prefabInfo = this._prefab;
        if (prefabInfo && prefabInfo.sync && !prefabInfo._synced) {
            // checks to ensure no recursion, recursion will caused only on old data.
            if (prefabInfo.root === this) {
                PrefabHelper.syncWithPrefab(this);
            }
        }

        this._updateDummySgNode();

        if (this._parent) {
            this._parent._sgNode.addChild(this._sgNode);
        }

        if (!this._activeInHierarchy) {
            // deactivate ActionManager and EventManager by default
            cc.director.getActionManager().pauseTarget(this);
            cc.eventManager.pauseTarget(this);
        }

        var children = this._children;
        for (var i = 0, len = children.length; i < len; i++) {
            children[i]._onBatchCreated();
        }
    },

    _onActive_EventsActions: function (newActive) {
        // ActionManager, EventManager
        if (newActive) {
            // activate
            cc.director.getActionManager().resumeTarget(this);
            cc.eventManager.resumeTarget(this);
            if (this._touchListener) {
                this._touchListener.mask = _searchMaskParent(this);
            }
            if (this._mouseListener) {
                this._mouseListener.mask = _searchMaskParent(this);
            }
        }
        else {
            // deactivate
            cc.director.getActionManager().pauseTarget(this);
            cc.eventManager.pauseTarget(this);
        }
    },

    _onHierarchyChanged: function (oldParent) {
        this._onHierarchyChangedBase(oldParent);
        cc._widgetManager._nodesOrderDirty = true;
    },

// EVENTS
    /**
     * !#en
     * Register a callback of a specific event type on Node.<br/>
     * Use this method to register touch or mouse event permit propagation based on scene graph,
     * you can propagate the event to the parents or swallow it by calling stopPropagation on the event.<br/>
     * It's the recommended way to register touch/mouse event for Node,
     * please do not use cc.eventManager directly for Node.
     * !#zh
     * 在节点上注册指定类型的回调函数，也可以设置 target 用于绑定响应函数的调用者。<br/>
     * 同时您可以将事件派发到父节点或者通过调用 stopPropagation 拦截它。<br/>
     * 推荐使用这种方式来监听节点上的触摸或鼠标事件，请不要在节点上直接使用 cc.eventManager。
     * @method on
     * @param {String} type - A string representing the event type to listen for.<br>
     *                        See {{#crossLink "Node/position-changed:event"}}Node Events{{/crossLink}} for all builtin events.
     * @param {Function} callback - The callback that will be invoked when the event is dispatched.
     *                              The callback is ignored if it is a duplicate (the callbacks are unique).
     * @param {Event} callback.param event
     * @param {Object} [target] - The target to invoke the callback, can be null
     * @param {Boolean} useCapture - When set to true, the capture argument prevents callback
     *                              from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE.
     *                              When false, callback will NOT be invoked when event's eventPhase attribute value is CAPTURING_PHASE.
     *                              Either way, callback will be invoked when event's eventPhase attribute value is AT_TARGET.
     * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
     * @example
     * this.node.on(cc.Node.EventType.TOUCH_START, this.memberFunction, this);  // if "this" is component and the "memberFunction" declared in CCClass.
     * node.on(cc.Node.EventType.TOUCH_START, callback, this.node);
     * node.on(cc.Node.EventType.TOUCH_MOVE, callback, this.node);
     * node.on(cc.Node.EventType.TOUCH_END, callback, this.node);
     * node.on(cc.Node.EventType.TOUCH_CANCEL, callback, this.node);
     * node.on("anchor-changed", callback, this);
     */
    on: function (type, callback, target, useCapture) {
        var newAdded = false;
        if (_touchEvents.indexOf(type) !== -1) {
            if (!this._touchListener) {
                this._touchListener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    owner: this,
                    mask: _searchMaskParent(this),
                    onTouchBegan: _touchStartHandler,
                    onTouchMoved: _touchMoveHandler,
                    onTouchEnded: _touchEndHandler
                });
                if (CC_JSB) {
                    this._touchListener.retain();
                }
                cc.eventManager.addListener(this._touchListener, this);
                newAdded = true;
            }
        }
        else if (_mouseEvents.indexOf(type) !== -1) {
            if (!this._mouseListener) {
                this._mouseListener = cc.EventListener.create({
                    event: cc.EventListener.MOUSE,
                    _previousIn: false,
                    owner: this,
                    mask: _searchMaskParent(this),
                    onMouseDown: _mouseDownHandler,
                    onMouseMove: _mouseMoveHandler,
                    onMouseUp: _mouseUpHandler,
                    onMouseScroll: _mouseWheelHandler,
                });
                if (CC_JSB) {
                    this._mouseListener.retain();
                }
                cc.eventManager.addListener(this._mouseListener, this);
                newAdded = true;
            }
        }
        if (newAdded && !this._activeInHierarchy) {
            cc.director.getScheduler().schedule(function () {
                if (!this._activeInHierarchy) {
                    cc.eventManager.pauseTarget(this);
                }
            }, this, 0, 0, 0, false);
        }

        return this._EventTargetOn(type, callback, target, useCapture);
    },

    /**
     * !#en
     * Removes the callback previously registered with the same type, callback, target and or useCapture.
     * This method is merely an alias to removeEventListener.
     * !#zh 删除之前与同类型，回调，目标或 useCapture 注册的回调。
     * @method off
     * @param {String} type - A string representing the event type being removed.
     * @param {Function} callback - The callback to remove.
     * @param {Object} [target] - The target to invoke the callback, if it's not given, only callback without target will be removed
     * @param {Boolean} useCapture - Specifies whether the callback being removed was registered as a capturing callback or not.
     *                              If not specified, useCapture defaults to false. If a callback was registered twice,
     *                              one with capture and one without, each must be removed separately. Removal of a capturing callback
     *                              does not affect a non-capturing version of the same listener, and vice versa.
     * @example
     * this.node.off(cc.Node.EventType.TOUCH_START, this.memberFunction, this);
     * node.off(cc.Node.EventType.TOUCH_START, callback, this.node);
     * node.off("anchor-changed", callback, this);
     */
    off: function (type, callback, target, useCapture) {
        this._EventTargetOff(type, callback, target, useCapture);

        if (_touchEvents.indexOf(type) !== -1) {
            this._checkTouchListeners();
        }
        else if (_mouseEvents.indexOf(type) !== -1) {
            this._checkMouseListeners();
        }
    },

    /**
     * !#en Removes all callbacks previously registered with the same target.
     * !#zh 移除目标上的所有注册事件。
     * @method targetOff
     * @param {Object} target - The target to be searched for all related callbacks
     * @example
     * node.targetOff(target);
     */
    targetOff: function (target) {
        this._EventTargetTargetOff(target);

        this._checkTouchListeners();
        this._checkMouseListeners();
    },

    _checkTouchListeners: function () {
        if (!(this._objFlags & Destroying) && this._touchListener) {
            var i = 0;
            if (this._bubblingListeners) {
                for (; i < _touchEvents.length; ++i) {
                    if (this._bubblingListeners.has(_touchEvents[i])) {
                        return;
                    }
                }
            }
            if (this._capturingListeners) {
                for (; i < _touchEvents.length; ++i) {
                    if (this._capturingListeners.has(_touchEvents[i])) {
                        return;
                    }
                }
            }

            cc.eventManager.removeListener(this._touchListener);
            this._touchListener = null;
        }
    },
    _checkMouseListeners: function () {
        if (!(this._objFlags & Destroying) && this._mouseListener) {
            var i = 0;
            if (this._bubblingListeners) {
                for (; i < _mouseEvents.length; ++i) {
                    if (this._bubblingListeners.has(_mouseEvents[i])) {
                        return;
                    }
                }
            }
            if (this._capturingListeners) {
                for (; i < _mouseEvents.length; ++i) {
                    if (this._capturingListeners.has(_mouseEvents[i])) {
                        return;
                    }
                }
            }

            if (_currentHovered === this) {
                _currentHovered = null;
            }

            cc.eventManager.removeListener(this._mouseListener);
            this._mouseListener = null;
        }
    },

    _hitTest: function (point, listener) {
        var w = this.width,
            h = this.height;
        var rect = cc.rect(0, 0, w, h);
        var trans = this.getNodeToWorldTransform();
        cc._rectApplyAffineTransformIn(rect, trans);
        var left = point.x - rect.x,
            right = rect.x + rect.width - point.x,
            bottom = point.y - rect.y,
            top = rect.y + rect.height - point.y;
        if (left >= 0 && right >= 0 && top >= 0 && bottom >= 0) {
            if (listener && listener.mask) {
                var mask = listener.mask;
                var parent = this;
                for (var i = 0; parent && i < mask.index; ++i, parent = parent.parent) {
                }
                // find mask parent, should hit test it
                if (parent === mask.node) {
                    var comp = parent.getComponent(cc.Mask);
                    return (comp && comp.enabledInHierarchy) ? comp._hitTest(point) : true;
                }
                // mask parent no longer exists
                else {
                    listener.mask = null;
                    return true;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    },

    // Store all capturing parents that are listening to the same event in the array
    _getCapturingTargets: function (type, array) {
        var parent = this.parent;
        while (parent) {
            if (parent.hasEventListener(type, true)) {
                array.push(parent);
            }
            parent = parent.parent;
        }
    },

    // Store all bubbling parents that are listening to the same event in the array
    _getBubblingTargets: function (type, array) {
        var parent = this.parent;
        while (parent) {
            if (parent.hasEventListener(type)) {
                array.push(parent);
            }
            parent = parent.parent;
        }
    },

    // for event manager
    isRunning: function () {
        return this._activeInHierarchy;
    },

// ACTIONS
    /**
     * !#en
     * Executes an action, and returns the action that is executed.<br/>
     * The node becomes the action's target. Refer to cc.Action's getTarget() <br/>
     * Calling runAction while the node is not active won't have any effect. <br/>
     * Note：You shouldn't modify the action after runAction, that won't take any effect.<br/>
     * if you want to modify, when you define action plus.
     * !#zh
     * 执行并返回该执行的动作。该节点将会变成动作的目标。<br/>
     * 调用 runAction 时，节点自身处于不激活状态将不会有任何效果。<br/>
     * 注意：你不应该修改 runAction 后的动作，将无法发挥作用，如果想进行修改，请在定义 action 时加入。
     * @method runAction
     * @param {Action} action
     * @return {Action} An Action pointer
     * @example
     * var action = cc.scaleTo(0.2, 1, 0.6);
     * node.runAction(action);
     * node.runAction(action).repeatForever(); // fail
     * node.runAction(action.repeatForever()); // right
     */
    runAction: function (action) {
        if (!this.active)
            return;
        cc.assertID(action, 1618);

        if (CC_JSB) {
            this._retainAction(action);
            this._sgNode._owner = this;
        }
        cc.director.getActionManager().addAction(action, this, false);
        return action;
    },

    /**
     * !#en Stops and removes all actions from the running action list .
     * !#zh 停止并且移除所有正在运行的动作列表。
     * @method stopAllActions
     * @example
     * node.stopAllActions();
     */
    stopAllActions: function () {
        cc.director.getActionManager().removeAllActionsFromTarget(this);
    },

    /**
     * !#en Stops and removes an action from the running action list.
     * !#zh 停止并移除指定的动作。
     * @method stopAction
     * @param {Action} action An action object to be removed.
     * @example
     * var action = cc.scaleTo(0.2, 1, 0.6);
     * node.stopAction(action);
     */
    stopAction: function (action) {
        cc.director.getActionManager().removeAction(action);
    },

    /**
     * !#en Removes an action from the running action list by its tag.
     * !#zh 停止并且移除指定标签的动作。
     * @method stopActionByTag
     * @param {Number} tag A tag that indicates the action to be removed.
     * @example
     * node.stopAction(1);
     */
    stopActionByTag: function (tag) {
        if (tag === cc.Action.TAG_INVALID) {
            cc.logID(1612);
            return;
        }
        cc.director.getActionManager().removeActionByTag(tag, this);
    },

    /**
     * !#en Returns an action from the running action list by its tag.
     * !#zh 通过标签获取指定动作。
     * @method getActionByTag
     * @see cc.Action#getTag and cc.Action#setTag
     * @param {Number} tag
     * @return {Action} The action object with the given tag.
     * @example
     * var action = node.getActionByTag(1);
     */
    getActionByTag: function (tag) {
        if (tag === cc.Action.TAG_INVALID) {
            cc.logID(1613);
            return null;
        }
        return cc.director.getActionManager().getActionByTag(tag, this);
    },

    /**
     * !#en
     * Returns the numbers of actions that are running plus the ones that are schedule to run (actions in actionsToAdd and actions arrays).<br/>
     *    Composable actions are counted as 1 action. Example:<br/>
     *    If you are running 1 Sequence of 7 actions, it will return 1. <br/>
     *    If you are running 7 Sequences of 2 actions, it will return 7.</p>
     * !#zh
     * 获取运行着的动作加上正在调度运行的动作的总数。<br/>
     * 例如：<br/>
     * - 如果你正在运行 7 个动作中的 1 个 Sequence，它将返回 1。<br/>
     * - 如果你正在运行 2 个动作中的 7 个 Sequence，它将返回 7。<br/>
     *
     * @method getNumberOfRunningActions
     * @return {Number} The number of actions that are running plus the ones that are schedule to run
     * @example
     * var count = node.getNumberOfRunningActions();
     * cc.log("Running Action Count: " + count);
     */
    getNumberOfRunningActions: function () {
        return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
    },

    _retainAction: function (action) {
        if (CC_JSB && action instanceof cc.Action && this._retainedActions.indexOf(action) === -1) {
            this._retainedActions.push(action);
            action.retain();
        }
    },

    _releaseAllActions: function () {
        if (CC_JSB) {
            for (var i = 0; i < this._retainedActions.length; ++i) {
                this._retainedActions[i].release();
            }
            this._retainedActions.length = 0;
        }
    },

    //functions moved from base node begin

    //override
    setTag: function (value) {
        this._tag = value;
        this._sgNode.tag = value;
    },

    setParent: function (value) {
        if (this._parent === value) {
            return;
        }
        if (CC_EDITOR && !cc.engine.isPlaying) {
            if (_Scene.DetectConflict.beforeAddChild(this, value)) {
                return;
            }
        }
        var sgNode = this._sgNode;
        if (sgNode.parent) {
            sgNode.parent.removeChild(sgNode, false);
        }
        //
        var oldParent = this._parent;
        this._parent = value || null;
        if (value) {
            var parent = value._sgNode;
            parent.addChild(sgNode);
            updateOrder(this);
            value._children.push(this);
            value.emit(CHILD_ADDED, this);
        }
        if (oldParent) {
            if (!(oldParent._objFlags & Destroying)) {
                var removeAt = oldParent._children.indexOf(this);
                if (CC_DEV && removeAt < 0) {
                    return cc.errorID(1633);
                }
                oldParent._children.splice(removeAt, 1);
                oldParent.emit(CHILD_REMOVED, this);
                this._onHierarchyChanged(oldParent);
            }
        }
        else if (value) {
            this._onHierarchyChanged(null);
        }
    },

    _onSiblingIndexChanged: function (index) {
        // update rendering scene graph, sort them by arrivalOrder
        var parent = this._parent;
        var siblings = parent._children;
        var i = 0, len = siblings.length, sibling;
        if (CC_JSB) {
            if (cc.runtime) {
                for (; i < len; i++) {
                    sibling = siblings[i]._sgNode;
                    // Reset zorder to update their arrival order
                    var zOrder = sibling.getLocalZOrder();
                    sibling.setLocalZOrder(zOrder + 1);
                    sibling.setLocalZOrder(zOrder);
                }
            }
            else {
                parent._sgNode.removeChild(this._sgNode, false);
                if (index + 1 < siblings.length) {
                    var nextSibling = siblings[index + 1];
                    parent._sgNode.insertChildBefore(this._sgNode, nextSibling._sgNode);
                }
                else {
                    parent._sgNode.addChild(this._sgNode);
                }
            }
        }
        else {
            for (; i < len; i++) {
                sibling = siblings[i]._sgNode;
                sibling._arrivalOrder = i;
                cc.eventManager._setDirtyForNode(sibling);
            }
            cc.renderer.childrenOrderDirty = true;
            parent._sgNode._reorderChildDirty = true;
            parent._delaySort();
        }
    },

    //end override

    /**
     * !#en Returns a copy of the position (x,y) of the node in cocos2d coordinates. (0,0) is the left-bottom corner.
     * !#zh 获取在父节点坐标系中节点的位置（ x , y ）。
     * @method getPosition
     * @return {Vec2} The position (x,y) of the node in OpenGL coordinates
     * @example
     * cc.log("Node Position: " + node.getPosition());
     */
    getPosition: function () {
        return cc.p(this._position);
    },

    /**
     * !#en
     * Changes the position (x,y) of the node in cocos2d coordinates.<br/>
     * The original point (0,0) is at the left-bottom corner of screen.<br/>
     * Usually we use cc.v2(x,y) to compose CCVec2 object.<br/>
     * and Passing two numbers (x,y) is more efficient than passing CCPoint object.
     * !#zh
     * 设置节点在父坐标系中的位置。<br/>
     * 可以通过 2 种方式设置坐标点：<br/>
     * 1.传入 cc.v2(x, y) 类型为 cc.Vec2 的对象。<br/>
     * 2.传入 2 个数值 x 和 y。
     * @method setPosition
     * @param {Vec2|Number} newPosOrxValue - The position (x,y) of the node in coordinates or the X coordinate for position
     * @param {Number} [yValue] - Y coordinate for position
     * @example {@link utils/api/engine/docs/cocos2d/core/utils/base-node/setPosition.js}
     */
    setPosition: function (newPosOrxValue, yValue) {
        var xValue;
        if (typeof yValue === 'undefined') {
            xValue = newPosOrxValue.x;
            yValue = newPosOrxValue.y;
        }
        else {
            xValue = newPosOrxValue;
            yValue = yValue;
        }

        var locPosition = this._position;
        if (locPosition.x === xValue && locPosition.y === yValue) {
            return;
        }

        if (CC_EDITOR) {
            var oldPosition = new cc.Vec2(locPosition);
        }

        if (!CC_EDITOR || isFinite(xValue)) {
            locPosition.x = xValue;
        }
        else {
            return cc.error(ERR_INVALID_NUMBER, 'x of new position');
        }
        if (!CC_EDITOR || isFinite(yValue)) {
            locPosition.y = yValue;
        }
        else {
            return cc.error(ERR_INVALID_NUMBER, 'y of new position');
        }

        this._sgNode.setPosition(xValue, yValue);

        // fast check event
        var capListeners = this._capturingListeners &&
            this._capturingListeners._callbackTable[POSITION_CHANGED];
        var bubListeners = this._bubblingListeners &&
            this._bubblingListeners._callbackTable[POSITION_CHANGED];
        if ((capListeners && capListeners.length > 0) || (bubListeners && bubListeners.length > 0)) {
            // send event
            if (CC_EDITOR) {
                this.emit(POSITION_CHANGED, oldPosition);
            }
            else {
                this.emit(POSITION_CHANGED);
            }
        }
    },

    /**
     * !#en
     * Returns the scale factor of the node.
     * Assertion will fail when _scaleX != _scaleY.
     * !#zh 获取节点的缩放。当 X 轴和 Y 轴有相同的缩放数值时。
     * @method getScale
     * @return {Number} The scale factor
     * @example
     * cc.log("Node Scale: " + node.getScale());
     */
    getScale: function () {
        if (this._scaleX !== this._scaleY)
            cc.logID(1603);
        return this._scaleX;
    },

    /**
     * !#en Sets the scale factor of the node. 1.0 is the default scale factor. This function can modify the X and Y scale at the same time.
     * !#zh 设置节点的缩放比例，默认值为 1.0。这个函数可以在同一时间修改 X 和 Y 缩放。
     * @method setScale
     * @param {Number|Vec2} scaleX - scaleX or scale
     * @param {Number} [scaleY=scale]
     * @example
     * node.setScale(cc.v2(1, 1));
     * node.setScale(1, 1);
     */
    setScale: function (scaleX, scaleY) {
        if (typeof scaleX === 'object') {
            scaleY = scaleX.y;
            scaleX = scaleX.x
        }
        else {
            scaleY = (scaleY || scaleY === 0) ? scaleY : scaleX;
        }
        if (this._scaleX !== scaleX || this._scaleY !== scaleY) {
            this._scaleX = scaleX;
            this._scaleY = scaleY;
            this._sgNode.setScale(scaleX, scaleY);
        }
    },

    /**
     * !#en
     * Returns a copy the untransformed size of the node. <br/>
     * The contentSize remains the same no matter the node is scaled or rotated.<br/>
     * All nodes has a size. Layer and Scene has the same size of the screen by default. <br/>
     * !#zh 获取节点自身大小，不受该节点是否被缩放或者旋转的影响。
     * @method getContentSize
     * @param {Boolean} [ignoreSizeProvider=false] - true if you need to get the original size of the node
     * @return {Size} The untransformed size of the node.
     * @example
     * cc.log("Content Size: " + node.getContentSize());
     */
    getContentSize: function (ignoreSizeProvider) {
        if (this._sizeProvider && !ignoreSizeProvider) {
            var size = this._sizeProvider.getContentSize();
            this._contentSize = size;
            return size;
        }
        else {
            return cc.size(this._contentSize);
        }
    },

    /**
     * !#en
     * Sets the untransformed size of the node.<br/>
     * The contentSize remains the same no matter the node is scaled or rotated.<br/>
     * All nodes has a size. Layer and Scene has the same size of the screen.
     * !#zh 设置节点原始大小，不受该节点是否被缩放或者旋转的影响。
     * @method setContentSize
     * @param {Size|Number} size - The untransformed size of the node or The untransformed size's width of the node.
     * @param {Number} [height] - The untransformed size's height of the node.
     * @example
     * node.setContentSize(cc.size(100, 100));
     * node.setContentSize(100, 100);
     */
    setContentSize: function (size, height) {
        var locContentSize = this._contentSize;
        var clone;
        if (height === undefined) {
            if ((size.width === locContentSize.width) && (size.height === locContentSize.height))
                return;
            if (CC_EDITOR) {
                clone = cc.size(locContentSize);
            }
            locContentSize.width = size.width;
            locContentSize.height = size.height;
        } else {
            if ((size === locContentSize.width) && (height === locContentSize.height))
                return;
            if (CC_EDITOR) {
                clone = cc.size(locContentSize);
            }
            locContentSize.width = size;
            locContentSize.height = height;
        }
        if (this._sizeProvider) {
            this._sizeProvider.setContentSize(locContentSize);
        }
        if (CC_EDITOR) {
            this.emit(SIZE_CHANGED, clone);
        }
        else {
            this.emit(SIZE_CHANGED);
        }
    },

    /**
     * !#en
     * Set whether color should be changed with the opacity value,
     * useless in ccsg.Node, but this function is override in some class to have such behavior.
     * !#zh 设置更改透明度时是否修改RGB值，
     * @method setOpacityModifyRGB
     * @param {Boolean} opacityValue
     * @example
     * node.setOpacityModifyRGB(true);
     */
    setOpacityModifyRGB: function (opacityValue) {
        if (this._opacityModifyRGB !== opacityValue) {
            this._opacityModifyRGB = opacityValue;
            this._sgNode.setOpacityModifyRGB(opacityValue);
            var sizeProvider = this._sizeProvider;
            if (sizeProvider instanceof _ccsg.Node && sizeProvider !== this._sgNode) {
                sizeProvider.setOpacityModifyRGB(opacityValue);
            }
        }
    },

    /**
     * !#en Get whether color should be changed with the opacity value.
     * !#zh 更改透明度时是否修改RGB值。
     * @method isOpacityModifyRGB
     * @return {Boolean}
     * @example
     * var hasChange = node.isOpacityModifyRGB();
     */
    isOpacityModifyRGB: function () {
        return this._opacityModifyRGB;
    },

    /*
     * !#en
     * Defines the oder in which the nodes are renderer.
     * Nodes that have a Global Z Order lower, are renderer first.
     * <br/>
     * In case two or more nodes have the same Global Z Order, the oder is not guaranteed.
     * The only exception if the Nodes have a Global Z Order == 0. In that case, the Scene Graph order is used.
     * <br/>
     * By default, all nodes have a Global Z Order = 0. That means that by default, the Scene Graph order is used to render the nodes.
     * <br/>
     * Global Z Order is useful when you need to render nodes in an order different than the Scene Graph order.
     * <br/>
     * Limitations: Global Z Order can't be used used by Nodes that have SpriteBatchNode as one of their ancestors.
     * And if ClippingNode is one of the ancestors, then "global Z order" will be relative to the ClippingNode.
     * !#zh
     * 定义节点的渲染顺序。
     * 节点具有全局 Z 顺序，顺序越小的节点，最先渲染。
     * </br>
     * 假设两个或者更多的节点拥有相同的全局 Z 顺序，那么渲染顺序无法保证。
     * 唯一的例外是如果节点的全局 Z 顺序为零，那么场景中的顺序是可以使用默认的。
     * </br>
     * 所有的节点全局 Z 顺序都是零。这就是说，默认使用场景中的顺序来渲染节点。
     * </br>
     * 全局 Z 顺序是非常有用的当你需要渲染节点按照不同的顺序而不是场景顺序。
     * </br>
     * 局限性: 全局 Z 顺序不能够被拥有继承 “SpriteBatchNode” 的节点使用。
     * 并且如果 “ClippingNode” 是其中之一的上代，那么 “global Z order” 将会和 “ClippingNode” 有关。
     * @method setGlobalZOrder
     * @param {Number} globalZOrder
     * @example
     * node.setGlobalZOrder(0);
     */
    setGlobalZOrder: function (globalZOrder) {
        this._globalZOrder = globalZOrder;
        this._sgNode.setGlobalZOrder(globalZOrder);
    },

    /*
     * !#en Return the Node's Global Z Order.
     * !#zh 获取节点的全局 Z 顺序。
     * @method getGlobalZOrder
     * @returns {number} The node's global Z order
     * @example
     * cc.log("Global Z Order: " + node.getGlobalZOrder());
     */
    getGlobalZOrder: function () {
        this._globalZOrder = this._sgNode.getGlobalZOrder();
        return this._globalZOrder;
    },

    /**
     * !#en
     * Returns a copy of the anchor point.<br/>
     * Anchor point is the point around which all transformations and positioning manipulations take place.<br/>
     * It's like a pin in the node where it is "attached" to its parent. <br/>
     * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner. <br/>
     * But you can use values higher than (1,1) and lower than (0,0) too.  <br/>
     * The default anchor point is (0.5,0.5), so it starts at the center of the node.
     * !#zh
     * 获取节点锚点，用百分比表示。<br/>
     * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br/>
     * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br/>
     * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br/>
     * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br/>
     * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
     * @method getAnchorPoint
     * @return {Vec2} The anchor point of node.
     * @example
     * cc.log("Node AnchorPoint: " + node.getAnchorPoint());
     */
    getAnchorPoint: function () {
        return cc.p(this._anchorPoint);
    },

    /**
     * !#en
     * Sets the anchor point in percent. <br/>
     * anchor point is the point around which all transformations and positioning manipulations take place. <br/>
     * It's like a pin in the node where it is "attached" to its parent. <br/>
     * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.<br/>
     * But you can use values higher than (1,1) and lower than (0,0) too.<br/>
     * The default anchor point is (0.5,0.5), so it starts at the center of the node.
     * !#zh
     * 设置锚点的百分比。<br/>
     * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br/>
     * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br/>
     * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br/>
     * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br/>
     * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
     * @method setAnchorPoint
     * @param {Vec2|Number} point - The anchor point of node or The x axis anchor of node.
     * @param {Number} [y] - The y axis anchor of node.
     * @example
     * node.setAnchorPoint(cc.v2(1, 1));
     * node.setAnchorPoint(1, 1);
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
        var sizeProvider = this._sizeProvider;
        if (sizeProvider instanceof _ccsg.Node) {
            sizeProvider.setAnchorPoint(locAnchorPoint);
        }
        this.emit(ANCHOR_CHANGED);
    },

    /**
     * !#en
     * Returns a copy of the anchor point in absolute pixels.  <br/>
     * you can only read it. If you wish to modify it, use setAnchorPoint.
     * !#zh
     * 返回锚点的绝对像素位置。<br/>
     * 你只能读它。如果您要修改它，使用 setAnchorPoint。
     * @see cc.Node#getAnchorPoint
     * @method getAnchorPointInPoints
     * @return {Vec2} The anchor point in absolute pixels.
     * @example
     * cc.log("AnchorPointInPoints: " + node.getAnchorPointInPoints());
     */
    getAnchorPointInPoints: function () {
        return this._sgNode.getAnchorPointInPoints();
    },

    /**
     * !#en
     * Returns the displayed opacity of Node,
     * the difference between displayed opacity and opacity is that displayed opacity is calculated based on opacity and parent node's opacity when cascade opacity enabled.
     * !#zh
     * 获取节点显示透明度，
     * 显示透明度和透明度之间的不同之处在于当启用级连透明度时，
     * 显示透明度是基于自身透明度和父节点透明度计算的。
     *
     * @method getDisplayedOpacity
     * @returns {number} displayed opacity
     * @example
     * var displayOpacity = node.getDisplayedOpacity();
     */
    getDisplayedOpacity: function () {
        return this._sgNode.getDisplayedOpacity();
    },

    /*
     * !#en Update displayed opacity.
     * !#zh 更新显示透明度。
     * @method _updateDisplayedOpacity
     * @param {Number} parentOpacity
     * @example
     * node._updateDisplayedOpacity(255);
     */
    _updateDisplayedOpacity: function (parentOpacity) {
        this._sgNode.updateDisplayedOpacity(parentOpacity);
    },

    /**
     * !#en
     * Returns the displayed color of Node,
     * the difference between displayed color and color is that displayed color is calculated based on color and parent node's color when cascade color enabled.
     * !#zh
     * 获取节点的显示透明度，
     * 显示透明度和透明度之间的不同之处在于显示透明度是基于透明度和父节点透明度启用级连透明度时计算的。
     * @method getDisplayedColor
     * @returns {Color}
     * @example
     * var displayColor = node.getDisplayedColor();
     */
    getDisplayedColor: function () {
        return this._sgNode.getDisplayedColor();
    },

    /**
     * !#en
     * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
     * The matrix is in Pixels.<br/>
     * This method is AR (Anchor Relative).
     * !#zh
     * 返回这个将节点（局部）的空间坐标系转换成父节点的空间坐标系的矩阵。<br/>
     * 这个矩阵以像素为单位。<br/>
     * 该方法基于节点坐标。
     * @method getNodeToParentTransformAR
     * @return {AffineTransform} The affine transform object
     * @example
     * var affineTransform = node.getNodeToParentTransformAR();
     */
    getNodeToParentTransformAR: function () {
        var contentSize = this.getContentSize();
        var mat = this._sgNode.getNodeToParentTransform();
        if (!this._isSgTransformArToMe(contentSize)) {
            // see getNodeToWorldTransform
            var tx = this._anchorPoint.x * contentSize.width;
            var ty = this._anchorPoint.y * contentSize.height;
            var offset = cc.affineTransformMake(1, 0, 0, 1, tx, ty);
            mat = cc.affineTransformConcatIn(offset, mat);
        }
        return mat;
    },

    /**
     * !#en
     * Returns a "local" axis aligned bounding box of the node. <br/>
     * The returned box is relative only to its parent.
     * !#zh 返回父节坐标系下的轴向对齐的包围盒。
     * @method getBoundingBox
     * @return {Rect} The calculated bounding box of the node
     * @example
     * var boundingBox = node.getBoundingBox();
     */
    getBoundingBox: function () {
        var size = this.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        return cc._rectApplyAffineTransformIn(rect, this.getNodeToParentTransform());
    },

    /**
     * !#en
     * Returns a "world" axis aligned bounding box of the node.<br/>
     * The bounding box contains self and active children's world bounding box.
     * !#zh
     * 返回节点在世界坐标系下的对齐轴向的包围盒（AABB）。<br/>
     * 该边框包含自身和已激活的子节点的世界边框。
     * @method getBoundingBoxToWorld
     * @return {Rect}
     * @example
     * var newRect = node.getBoundingBoxToWorld();
     */
    getBoundingBoxToWorld: function () {
        var trans;
        if (this.parent) {
            trans = this.parent.getNodeToWorldTransformAR();
        }
        return this._getBoundingBoxTo(trans);
    },

    _getBoundingBoxTo: function (parentTransformAR) {
        var size = this.getContentSize();
        var width = size.width;
        var height = size.height;
        var rect = cc.rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);

        var transAR = cc.affineTransformConcat(this.getNodeToParentTransformAR(), parentTransformAR);
        cc._rectApplyAffineTransformIn(rect, transAR);

        //query child's BoundingBox
        if (!this._children)
            return rect;

        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child = locChildren[i];
            if (child && child.active) {
                var childRect = child._getBoundingBoxTo(transAR);
                if (childRect)
                    rect = cc.rectUnion(rect, childRect);
            }
        }
        return rect;
    },

    /**
     * !#en
     * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
     * The matrix is in Pixels.
     * !#zh 返回这个将节点（局部）的空间坐标系转换成父节点的空间坐标系的矩阵。这个矩阵以像素为单位。
     * @method getNodeToParentTransform
     * @return {AffineTransform} The affine transform object
     * @example
     * var affineTransform = node.getNodeToParentTransform();
     */
    getNodeToParentTransform: function () {
        var contentSize = this.getContentSize();
        var mat = this._sgNode.getNodeToParentTransform();
        if (this._isSgTransformArToMe(contentSize)) {
            // see getNodeToWorldTransform
            var tx = -this._anchorPoint.x * contentSize.width;
            var ty = -this._anchorPoint.y * contentSize.height;
            var offset = cc.affineTransformMake(1, 0, 0, 1, tx, ty);
            mat = cc.affineTransformConcatIn(offset, mat);
        }
        return mat;
    },

    /**
     * !#en Returns the world affine transform matrix. The matrix is in Pixels.
     * !#zh 返回节点到世界坐标系的仿射变换矩阵。矩阵单位是像素。
     * @method getNodeToWorldTransform
     * @return {AffineTransform}
     * @example
     * var affineTransform = node.getNodeToWorldTransform();
     */
    getNodeToWorldTransform: function () {
        var contentSize = this.getContentSize();

        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            // ensure transform computed
            cc.director._visitScene();
        }
        var mat = this._sgNode.getNodeToWorldTransform();

        if (this._isSgTransformArToMe(contentSize)) {
            // _sgNode.getNodeToWorldTransform is not anchor relative (AR), in this case,
            // we should translate to bottem left to consistent with it
            // see https://github.com/cocos-creator/engine/pull/391
            var tx = -this._anchorPoint.x * contentSize.width;
            var ty = -this._anchorPoint.y * contentSize.height;
            var offset = cc.affineTransformMake(1, 0, 0, 1, tx, ty);
            mat = cc.affineTransformConcatIn(offset, mat);
        }
        return mat;
    },

    /**
     * !#en
     * Returns the world affine transform matrix. The matrix is in Pixels.<br/>
     * This method is AR (Anchor Relative).
     * !#zh
     * 返回节点到世界坐标仿射变换矩阵。矩阵单位是像素。<br/>
     * 该方法基于节点坐标。
     * @method getNodeToWorldTransformAR
     * @return {AffineTransform}
     * @example
     * var mat = node.getNodeToWorldTransformAR();
     */
    getNodeToWorldTransformAR: function () {
        var contentSize = this.getContentSize();

        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            // ensure transform computed
            cc.director._visitScene();
        }
        var mat = this._sgNode.getNodeToWorldTransform();

        if (!this._isSgTransformArToMe(contentSize)) {
            // see getNodeToWorldTransform
            var tx = this._anchorPoint.x * contentSize.width;
            var ty = this._anchorPoint.y * contentSize.height;
            var offset = cc.affineTransformMake(1, 0, 0, 1, tx, ty);
            mat = cc.affineTransformConcatIn(offset, mat);
        }
        return mat;
    },

    /**
     * !#en
     * Returns the matrix that transform parent's space coordinates to the node's (local) space coordinates.<br/>
     * The matrix is in Pixels. The returned transform is readonly and cannot be changed.
     * !#zh
     * 返回将父节点的坐标系转换成节点（局部）的空间坐标系的矩阵。<br/>
     * 该矩阵以像素为单位。返回的矩阵是只读的，不能更改。
     * @method getParentToNodeTransform
     * @return {AffineTransform}
     * @example
     * var affineTransform = node.getParentToNodeTransform();
     */
    getParentToNodeTransform: function () {
        return this._sgNode.getParentToNodeTransform();
    },

    /**
     * !#en Returns the inverse world affine transform matrix. The matrix is in Pixels.
     * !#en 返回世界坐标系到节点坐标系的逆矩阵。
     * @method getWorldToNodeTransform
     * @return {AffineTransform}
     * @example
     * var affineTransform = node.getWorldToNodeTransform();
     */
    getWorldToNodeTransform: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            // ensure transform computed
            cc.director._visitScene();
        }
        return this._sgNode.getWorldToNodeTransform();
    },

    _isSgTransformArToMe: function (myContentSize) {
        var renderSize = this._sgNode.getContentSize();
        if (renderSize.width === 0 && renderSize.height === 0 &&
            (myContentSize.width !== 0 || myContentSize.height !== 0)) {
            // anchor point ignored
            return true;
        }
        if (this._sgNode.isIgnoreAnchorPointForPosition()) {
            // sg transform become anchor relative...
            return true;
        }
        return false;
    },

    /**
     * !#en Converts a Point to node (local) space coordinates. The result is in Vec2.
     * !#zh 将一个点转换到节点 (局部) 坐标系。结果以 Vec2 为单位。
     * @method convertToNodeSpace
     * @param {Vec2} worldPoint
     * @return {Vec2}
     * @example
     * var newVec2 = node.convertToNodeSpace(cc.v2(100, 100));
     */
    convertToNodeSpace: function (worldPoint) {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            // ensure transform computed
            cc.director._visitScene();
        }
        var nodePositionIgnoreAnchorPoint = this._sgNode.convertToNodeSpace(worldPoint);
        return cc.pAdd(nodePositionIgnoreAnchorPoint, cc.p(this._anchorPoint.x * this._contentSize.width, this._anchorPoint.y * this._contentSize.height));
    },

    /**
     * !#en Converts a Point to world space coordinates. The result is in Points.
     * !#zh 将一个点转换到世界空间坐标系。结果以 Vec2 为单位。
     * @method convertToWorldSpace
     * @param {Vec2} nodePoint
     * @return {Vec2}
     * @example
     * var newVec2 = node.convertToWorldSpace(cc.v2(100, 100));
     */
    convertToWorldSpace: function (nodePoint) {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            // ensure transform computed
            cc.director._visitScene();
        }
        var x = nodePoint.x - this._anchorPoint.x * this._contentSize.width;
        var y = nodePoint.y - this._anchorPoint.y * this._contentSize.height;
        return cc.v2(this._sgNode.convertToWorldSpace(cc.v2(x, y)));
    },

    /**
     * !#en
     * Converts a Point to node (local) space coordinates. The result is in Points.<br/>
     * treating the returned/received node point as anchor relative.
     * !#zh
     * 将一个点转换到节点 (局部) 空间坐标系。结果以 Vec2 为单位。<br/>
     * 返回值将基于节点坐标。
     * @method convertToNodeSpaceAR
     * @param {Vec2} worldPoint
     * @return {Vec2}
     * @example
     * var newVec2 = node.convertToNodeSpaceAR(cc.v2(100, 100));
     */
    convertToNodeSpaceAR: function (worldPoint) {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            // ensure transform computed
            cc.director._visitScene();
        }
        if (this._sgNode.isIgnoreAnchorPointForPosition()) {
            // see https://github.com/cocos-creator/engine/pull/391
            return cc.v2(this._sgNode.convertToNodeSpace(worldPoint));
        }
        else {
            return this._sgNode.convertToNodeSpaceAR(worldPoint);
        }
    },

    /**
     * !#en
     * Converts a local Point to world space coordinates.The result is in Points.<br/>
     * treating the returned/received node point as anchor relative.
     * !#zh
     * 将一个点转换到世界空间坐标系。结果以 Vec2 为单位。<br/>
     * 返回值将基于世界坐标。
     * @method convertToWorldSpaceAR
     * @param {Vec2} nodePoint
     * @return {Vec2}
     * @example
     * var newVec2 = node.convertToWorldSpaceAR(cc.v2(100, 100));
     */
    convertToWorldSpaceAR: function (nodePoint) {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            // ensure transform computed
            cc.director._visitScene();
        }
        if (this._sgNode.isIgnoreAnchorPointForPosition()) {
            // see https://github.com/cocos-creator/engine/pull/391
            return cc.v2(this._sgNode.convertToWorldSpace(nodePoint));
        }
        else {
            return cc.v2(this._sgNode.convertToWorldSpaceAR(nodePoint));
        }
    },

    /**
     * !#en convenience methods which take a cc.Touch instead of cc.Vec2.
     * !#zh 将触摸点转换成本地坐标系中位置。
     * @method convertTouchToNodeSpace
     * @param {Touch} touch - The touch object
     * @return {Vec2}
     * @example
     * var newVec2 = node.convertTouchToNodeSpace(touch);
     */
    convertTouchToNodeSpace: function (touch) {
        return this.convertToNodeSpace(touch.getLocation());
    },

    /**
     * !#en converts a cc.Touch (world coordinates) into a local coordinate. This method is AR (Anchor Relative).
     * !#zh 转换一个 cc.Touch（世界坐标）到一个局部坐标，该方法基于节点坐标。
     * @method convertTouchToNodeSpaceAR
     * @param {Touch} touch - The touch object
     * @return {Vec2}
     * @example
     * var newVec2 = node.convertTouchToNodeSpaceAR(touch);
     */
    convertTouchToNodeSpaceAR: function (touch) {
        return this.convertToNodeSpaceAR(touch.getLocation());
    },

    setNodeDirty: function () {
        this._sgNode.setNodeDirty();
    },

    /**
     * !#en
     * "add" logic MUST only be in this method <br/>
     * !#zh
     * 添加子节点，并且可以修改该节点的 局部 Z 顺序和标签。
     * @method addChild
     * @param {Node} child - A child node
     * @param {Number} [localZOrder] - Z order for drawing priority. Please refer to setZOrder(int)
     * @param {Number|String} [tag] - An integer or a name to identify the node easily. Please refer to setTag(int) and setName(string)
     * @example
     * node.addChild(newNode, 1, 1001);
     */
    addChild: function (child, localZOrder, tag) {
        localZOrder = localZOrder === undefined ? child._localZOrder : localZOrder;
        var name, setTag = false;
        if (typeof tag === 'undefined') {
            tag = undefined;
            name = child._name;
        } else if (cc.js.isString(tag)) {
            name = tag;
            tag = undefined;
        } else if (cc.js.isNumber(tag)) {
            setTag = true;
            name = "";
        }

        if (CC_DEV && !cc.Node.isNode(child)) {
            return cc.errorID(1634, cc.js.getClassName(child));
        }
        cc.assertID(child, 1606);
        cc.assertID(child._parent === null, 1605);

        // invokes the parent setter
        child.parent = this;

        child.zIndex = localZOrder;
        if (setTag)
            child.setTag(tag);
        else
            child.setName(name);
    },

    /**
     * !#en Stops all running actions and schedulers.
     * !#zh 停止所有正在播放的动作和计时器。
     * @method cleanup
     * @example
     * node.cleanup();
     */
    cleanup: function () {
        // actions
        cc.director.getActionManager().removeAllActionsFromTarget(this);
        // event
        cc.eventManager.removeListeners(this);

        // children
        var i, len = this._children.length, node;
        for (i = 0; i < len; ++i) {
            node = this._children[i];
            if (node)
                node.cleanup();
        }
    },

    /**
     * !#en Sorts the children array depends on children's zIndex and arrivalOrder,
     * normally you won't need to invoke this function.
     * !#zh 根据子节点的 zIndex 和 arrivalOrder 进行排序，正常情况下开发者不需要手动调用这个函数。
     *
     * @method sortAllChildren
     */
    sortAllChildren: function () {
        if (this._reorderChildDirty) {
            this._reorderChildDirty = false;
            var _children = this._children;
            if (_children.length > 1) {
                // insertion sort
                var len = _children.length, i, j, child;
                for (i = 1; i < len; i++) {
                    child = _children[i];
                    j = i - 1;

                    //continue moving element downwards while zOrder is smaller or when zOrder is the same but mutatedIndex is smaller
                    while (j >= 0) {
                        if (child._localZOrder < _children[j]._localZOrder) {
                            _children[j + 1] = _children[j];
                        } else if (child._localZOrder === _children[j]._localZOrder &&
                            child._sgNode._arrivalOrder < _children[j]._sgNode._arrivalOrder) {
                            _children[j + 1] = _children[j];
                        } else {
                            break;
                        }
                        j--;
                    }
                    _children[j + 1] = child;
                }
                this.emit(CHILD_REORDER);
            }
            cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this, this.__eventTargets);
        }
    },

    _delaySort: function () {
        if (!this._reorderChildDirty) {
            this._reorderChildDirty = true;
            cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this, this.__eventTargets);
        }
    },

    _updateDummySgNode: function () {
        var self = this;
        var sgNode = self._sgNode;

        sgNode.setPosition(self._position);
        sgNode.setRotationX(self._rotationX);
        sgNode.setRotationY(self._rotationY);
        sgNode.setScale(self._scaleX, self._scaleY);
        sgNode.setSkewX(self._skewX);
        sgNode.setSkewY(self._skewY);
        sgNode.setIgnoreAnchorPointForPosition(self.__ignoreAnchor);

        var arrivalOrder = sgNode._arrivalOrder;
        sgNode.setLocalZOrder(self._localZOrder);
        sgNode._arrivalOrder = arrivalOrder;     // revert arrivalOrder changed in setLocalZOrder

        sgNode.setGlobalZOrder(self._globalZOrder);

        if (CC_JSB) {
            // fix tintTo and tintBy action for jsb displays err for fireball/issues/4137
            sgNode.setColor(this._color);
        }
        sgNode.setOpacity(self._opacity);
        sgNode.setOpacityModifyRGB(self._opacityModifyRGB);
        sgNode.setCascadeOpacityEnabled(self._cascadeOpacityEnabled);
        sgNode.setTag(self._tag);
    },

    _updateSgNode: function () {
        this._updateDummySgNode();
        var sgNode = this._sgNode;
        sgNode.setAnchorPoint(this._anchorPoint);
        sgNode.setVisible(this._active);
        sgNode.setColor(this._color);

        // update ActionManager and EventManager because sgNode maybe changed
        if (this._activeInHierarchy) {
            cc.director.getActionManager().resumeTarget(this);
            cc.eventManager.resumeTarget(this);
        }
        else {
            cc.director.getActionManager().pauseTarget(this);
            cc.eventManager.pauseTarget(this);
        }
    },

    _removeSgNode: SgHelper.removeSgNode,

    onRestore: CC_EDITOR && function () {
        this._updateDummySgNode();

        var sizeProvider = this._sizeProvider;
        if (sizeProvider) {
            sizeProvider.setContentSize(this._contentSize);
            if (sizeProvider instanceof _ccsg.Node) {
                sizeProvider.setAnchorPoint(this._anchorPoint);
                sizeProvider.setColor(this._color);
                if (sizeProvider !== this._sgNode) {
                    sizeProvider.ignoreAnchor = this.__ignoreAnchor;
                    sizeProvider.setOpacityModifyRGB(this._opacityModifyRGB);
                    if (!this._cascadeOpacityEnabled) {
                        sizeProvider.setOpacity(this._opacity);
                    }
                }
            }
        }

        var sgParent = this._parent && this._parent._sgNode;
        if (this._sgNode._parent !== sgParent) {
            if (this._sgNode._parent) {
                this._sgNode.removeFromParent();
            }
            if (sgParent) {
                sgParent.addChild(this._sgNode);
            }
        }

        this._onRestoreBase();

        if (this._activeInHierarchy) {
            cc.director.getActionManager().resumeTarget(this);
            cc.eventManager.resumeTarget(this);
        }
        else {
            cc.director.getActionManager().pauseTarget(this);
            cc.eventManager.pauseTarget(this);
        }
    },

    //functions moved from base node end

});

// In JSB, when inner sg node being replaced, the system event listeners will be cleared.
// We need a mechanisme to guarentee the persistence of system event listeners.
if (CC_JSB) {
    var updateListeners = function () {
        if (!this._activeInHierarchy) {
            cc.eventManager.pauseTarget(this);
        }
    };

    cc.js.getset(Node.prototype, '_sgNode',
        function () {
            return this.__sgNode;
        },
        function (value) {
            this.__sgNode = value;
            if (this._touchListener || this._mouseListener) {
                if (this._touchListener) {
                    this._touchListener.retain();
                    cc.eventManager.removeListener(this._touchListener);
                    cc.eventManager.addListener(this._touchListener, this);
                    this._touchListener.release();
                }
                if (this._mouseListener) {
                    this._mouseListener.retain();
                    cc.eventManager.removeListener(this._mouseListener);
                    cc.eventManager.addListener(this._mouseListener, this);
                    this._mouseListener.release();
                }
                cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, updateListeners, this);
            }
        },
        true
    );
}

/**
 * @event position-changed
 * @param {Event} event
 * @param {Vec2} event.detail - The old position, but this parameter is only available in editor!
 */
/**
 * @event size-changed
 * @param {Event} event
 * @param {Size} event.detail - The old size, but this parameter is only available in editor!
 */
/**
 * @event anchor-changed
 * @param {Event} event
 */
/**
 * @event child-added
 * @param {Event} event
 * @param {Node} event.detail - child
 */
/**
 * @event child-removed
 * @param {Event} event
 * @param {Node} event.detail - child
 */
/**
 * @event child-reorder
 * @param {Event} event
 */
/**
 * @event group-changed
 * @param {Event} event
 */

/**
 *
 * @event touchstart
 *
 */

/**
 * !#en The local scale relative to the parent.
 * !#zh 节点相对父节点的缩放。
 * @property scale
 * @type {Number}
 * @example
 * node.scale = 1;
 */

/**
 * !#en Returns the x axis position of the node in cocos2d coordinates.
 * !#zh 获取节点 X 轴坐标。
 * @method getPositionX
 * @return {Number} x - The new position in x axis
 * @example
 * var posX = node.getPositionX();
 */

/**
 * !#en Sets the x axis position of the node in cocos2d coordinates.
 * !#zh 设置节点 X 轴坐标。
 * @method setPositionX
 * @param {Number} x
 * @example
 * node.setPositionX(1);
 */

/**
 * !#en Returns the y axis position of the node in cocos2d coordinates.
 * !#zh 获取节点 Y 轴坐标。
 * @method getPositionY
 * @return {Number}
 * @example
 * var posY = node.getPositionY();
 */

/**
 * !#en Sets the y axis position of the node in cocos2d coordinates.
 * !#zh 设置节点 Y 轴坐标。
 * @method setPositionY
 * @param {Number} y - The new position in y axis
 * @example
 * node.setPositionY(100);
 */

/**
 * !#en Returns the local Z order of this node.
 * !#zh 获取节点局部 Z 轴顺序。
 * @method getLocalZOrder
 * @returns {Number} The local (relative to its siblings) Z order.
 * @example
 * var localZorder = node.getLocalZOrder();
 */

/**
 * !#en
 * LocalZOrder is the 'key' used to sort the node relative to its siblings.                                        <br/>
 *                                                                                                                 <br/>
 * The Node's parent will sort all its children based ont the LocalZOrder value.                                   <br/>
 * If two nodes have the same LocalZOrder, then the node that was added first to the children's array              <br/>
 * will be in front of the other node in the array.                                                                <br/>
 * Also, the Scene Graph is traversed using the "In-Order" tree traversal algorithm ( http://en.wikipedia.org/wiki/Tree_traversal#In-order ) <br/>
 * And Nodes that have LocalZOder values smaller than 0 are the "left" subtree <br/>
 * While Nodes with LocalZOder greater than 0 are the "right" subtree.
 * !#zh
 * LocalZOrder 是 “key” (关键)来分辨节点和它兄弟节点的相关性。
 * 父节点将会通过 LocalZOrder 的值来分辨所有的子节点。
 * 如果两个节点有同样的 LocalZOrder，那么先加入子节点数组的节点将会显示在后加入的节点的前面。
 * 同样的，场景图使用 “In-Order（按顺序）” 遍历数算法来遍历
 * ( http://en.wikipedia.org/wiki/Tree_traversal#In-order ) 并且拥有小于 0 的 LocalZOrder 的值的节点是 “ left ” 子树（左子树）
 * 所以拥有大于 0 的 LocalZOrder 的值得节点是 “ right ”子树（右子树）。
 * @method setLocalZOrder
 * @param {Number} localZOrder
 * @example
 * node.setLocalZOrder(1);
 */

/**
 * !#en Returns whether node's opacity value affect its child nodes.
 * !#zh 返回节点的不透明度值是否影响其子节点。
 * @method isCascadeOpacityEnabled
 * @returns {Boolean}
 * @example
 * cc.log(node.isCascadeOpacityEnabled());
 */

/**
 * !#en Enable or disable cascade opacity, if cascade enabled, child nodes' opacity will be the multiplication of parent opacity and its own opacity.
 * !#zh 启用或禁用级连不透明度，如果级连启用，子节点的不透明度将是父不透明度乘上它自己的不透明度。
 * @method setCascadeOpacityEnabled
 * @param {Boolean} cascadeOpacityEnabled
 * @example
 * node.setCascadeOpacityEnabled(true);
 */

/*
 * !#en Returns whether node's color value affect its child nodes.
 * !#zh 返回节点的颜色值是否影响其子节点。
 * @method isCascadeColorEnabled
 * @returns {Boolean}
 * @example
 * cc.log(node.isCascadeColorEnabled());
 */

/**
 * !#en Enable or disable cascade color, if cascade enabled, child nodes' opacity will be the cascade value of parent color and its own color.
 * !#zh 启用或禁用级连颜色，如果级连启用，子节点的颜色将是父颜色和它自己的颜色的级连值。
 * @method setCascadeColorEnabled
 * @param {Boolean} cascadeColorEnabled
 * @example
 * node.setCascadeColorEnabled(true);
 */

var SameNameGetSets = ['parent', 'tag', 'skewX', 'skewY', 'position', 'rotation', 'rotationX', 'rotationY',
    'scale', 'scaleX', 'scaleY', 'opacity', 'color',];

var DiffNameGetSets = {
    x: ['getPositionX', 'setPositionX'],
    y: ['getPositionY', 'setPositionY'],
    zIndex: ['getLocalZOrder', 'setLocalZOrder'],
    opacityModifyRGB: ['isOpacityModifyRGB', 'setOpacityModifyRGB'],
    cascadeOpacity: ['isCascadeOpacityEnabled', 'setCascadeOpacityEnabled'],
};

Misc.propertyDefine(Node, SameNameGetSets, DiffNameGetSets);

Node.EventType = EventType;

cc.Node = module.exports = Node;
