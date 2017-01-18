cc._LogInfos = {

    ActionManager: {
        addAction: "cc.ActionManager.addAction(): action must be non-null",
        removeAction: "cocos2d: removeAction: Target not found",
        removeActionByTag: "cc.ActionManager.removeActionByTag(): an invalid tag",
        removeActionByTag_2: "cc.ActionManager.removeActionByTag(): target must be non-null",
        getActionByTag: "cc.ActionManager.getActionByTag(): an invalid tag",
        getActionByTag_2: "cocos2d : getActionByTag(tag = %s): Action not found",
    },

    configuration: {
        loadConfigFile: "Expected 'data' dict, but not found. Config file: %s",
        loadConfigFile_2: "Please load the resource first : %s",
    },

    Director: {
        resume: "cocos2d: Director: Error in gettimeofday",
        setProjection: "cocos2d: Director: unrecognized projection",
        popToSceneStackLevel: "cocos2d: Director: unrecognized projection",
        popToSceneStackLevel_2: "cocos2d: Director: Error in gettimeofday",
        popScene: "running scene should not null",
        pushScene: "the scene should not null",
    },

    Array: {
        verifyType: "element type is wrong!",
    },

    deprecated: '"%s" is deprecated, please use "%s" instead.',

    Scheduler: {
        scheduleCallbackForTarget: "CCSheduler#scheduleCallback. Callback already scheduled. Updating interval from:%s to %s",
        scheduleCallbackForTarget_2: "cc.scheduler.scheduleCallbackForTarget(): callback_fn should be non-null.",
        scheduleCallbackForTarget_3: "cc.scheduler.scheduleCallbackForTarget(): target should be non-null.",
        pauseTarget: "cc.Scheduler.pauseTarget():target should be non-null",
        resumeTarget: "cc.Scheduler.resumeTarget():target should be non-null",
        isTargetPaused: "cc.Scheduler.isTargetPaused():target should be non-null",
    },

    Node: {
        getZOrder: "getZOrder is deprecated. Please use getLocalZOrder instead.",
        setZOrder: "setZOrder is deprecated. Please use setLocalZOrder instead.",
        getRotation: "RotationX != RotationY. Don't know which one to return",
        getScale: "ScaleX != ScaleY. Don't know which one to return",
        addChild: "An Node can't be added as a child of itself.",
        addChild_2: "child already added. It can't be added again",
        addChild_3: "child must be non-null",
        removeFromParentAndCleanup: "removeFromParentAndCleanup is deprecated. Use removeFromParent instead",
        boundingBox: "boundingBox is deprecated. Use getBoundingBox instead",
        removeChildByTag: "argument tag is an invalid tag",
        removeChildByTag_2: "cocos2d: removeChildByTag(tag = %s): child not found!",
        removeAllChildrenWithCleanup: "removeAllChildrenWithCleanup is deprecated. Use removeAllChildren instead",
        stopActionByTag: "cc.Node.stopActionBy(): argument tag an invalid tag",
        getActionByTag: "cc.Node.getActionByTag(): argument tag is an invalid tag",
        reumeSchedulerAndActions: "resumeSchedulerAndActions is deprecated, please use resume instead.",
        pauseSchedulerAndActions: "pauseSchedulerAndActions is deprecated, please use pause instead.",
        _arrayMakeObjectsPerformSelector: "Unknown callback function",
        reorderChild: "child must be non-null",
        runAction: "cc.Node.runAction(): action must be non-null",
        schedule: "callback function must be non-null",
        schedule_2: "interval must be positive",
        initWithTexture: "cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.",
        _requestDirtyFlag: "_ccsg.Node._requestDirtyFlag: failed to satisfy the request, key (%s) for flag have already been taken"
    },

    AtlasNode: {
        _updateAtlasValues: "cc.AtlasNode.updateAtlasValues(): Shall be overridden in subclasses",
        _initWithTileFile: "",
        _initWithTexture: "cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.",
    },

    _checkEventListenerAvailable: {
        keyboard: "cc._EventListenerKeyboard.checkAvailable(): Invalid EventListenerKeyboard!",
        touchOneByOne: "cc._EventListenerTouchOneByOne.checkAvailable(): Invalid EventListenerTouchOneByOne!",
        touchAllAtOnce: "cc._EventListenerTouchAllAtOnce.checkAvailable(): Invalid EventListenerTouchAllAtOnce!",
        acceleration: "cc._EventListenerAcceleration.checkAvailable(): _onAccelerationEvent must be non-nil",
    },

    EventListener: {
        create: "Invalid parameter.",
    },

    __getListenerID: "Don't call this method if the event is for touch.",

    LayerMultiplex: {
        initWithLayers: "parameters should not be ending with null in Javascript",
        switchTo: "Invalid index in MultiplexLayer switchTo message",
        switchToAndReleaseMe: "Invalid index in MultiplexLayer switchTo message",
        addLayer: "cc.Layer.addLayer(): layer should be non-null",
    },

    view: {
        setDesignResolutionSize: "Resolution not valid",
        setDesignResolutionSize_2: "should set resolutionPolicy",
    },

    inputManager: {
        handleTouchesBegin: "The touches is more than MAX_TOUCHES, nUnusedIndex = %s",
    },

    checkGLErrorDebug: "WebGL error %s",

    spriteFrameAnimationCache: {
        _addAnimationsWithDictionary: "cocos2d: cc.SpriteFrameAnimationCache: No animations were found in provided dictionary.",
        _addAnimationsWithDictionary_2: "cc.SpriteFrameAnimationCache. Invalid animation format",
        addAnimations: "cc.SpriteFrameAnimationCache.addAnimations(): File could not be found",
        _parseVersion1: "cocos2d: cc.SpriteFrameAnimationCache: Animation '%s' found in dictionary without any frames - cannot add to animation cache.",
        _parseVersion1_2: "cocos2d: cc.SpriteFrameAnimationCache: Animation '%s' refers to frame '%s' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.",
        _parseVersion1_3: "cocos2d: cc.SpriteFrameAnimationCache: None of the frames for animation '%s' were found in the cc.SpriteFrameCache. Animation is not being added to the Animation Cache.",
        _parseVersion1_4: "cocos2d: cc.SpriteFrameAnimationCache: An animation in your dictionary refers to a frame which is not in the cc.SpriteFrameCache. Some or all of the frames for the animation '%s' may be missing.",
        _parseVersion2: "cocos2d: CCAnimationCache: Animation '%s' found in dictionary without any frames - cannot add to animation cache.",
        _parseVersion2_2: "cocos2d: cc.SpriteFrameAnimationCache: Animation '%s' refers to frame '%s' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.",
        addAnimations_2: "cc.SpriteFrameAnimationCache.addAnimations(): Invalid texture file name",
    },

    Sprite: {
        reorderChild: "cc.Sprite.reorderChild(): this child is not in children list",
        ignoreAnchorPointForPosition: "cc.Sprite.ignoreAnchorPointForPosition(): it is invalid in cc.Sprite when using SpriteBatchNode",
        setDisplayFrameWithAnimationName: "cc.Sprite.setDisplayFrameWithAnimationName(): Frame not found",
        setDisplayFrameWithAnimationName_2: "cc.Sprite.setDisplayFrameWithAnimationName(): Invalid frame index",
        setDisplayFrame: "setDisplayFrame is deprecated, please use setSpriteFrame instead.",
        _updateBlendFunc: "cc.Sprite._updateBlendFunc(): _updateBlendFunc doesn't work when the sprite is rendered using a cc.CCSpriteBatchNode", initWithSpriteFrame: "cc.Sprite.initWithSpriteFrame(): spriteFrame should be non-null",
        initWithSpriteFrameName: "cc.Sprite.initWithSpriteFrameName(): spriteFrameName should be non-null",
        initWithSpriteFrameName1: " is null, please check.",
        initWithFile: "cc.Sprite.initWithFile(): filename should be non-null",
        setDisplayFrameWithAnimationName_3: "cc.Sprite.setDisplayFrameWithAnimationName(): animationName must be non-null",
        reorderChild_2: "cc.Sprite.reorderChild(): child should be non-null",
        addChild: "cc.Sprite.addChild(): cc.Sprite only supports cc.Sprites as children when using cc.SpriteBatchNode",
        addChild_2: "cc.Sprite.addChild(): cc.Sprite only supports a sprite using same texture as children when using cc.SpriteBatchNode",
        addChild_3: "cc.Sprite.addChild(): child should be non-null",
        setTexture: "cc.Sprite.texture setter: Batched sprites should use the same texture as the batchnode",
        updateQuadFromSprite: "cc.SpriteBatchNode.updateQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children", insertQuadFromSprite: "cc.SpriteBatchNode.insertQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children",
        addChild_4: "cc.SpriteBatchNode.addChild(): cc.SpriteBatchNode only supports cc.Sprites as children",
        addChild_5: "cc.SpriteBatchNode.addChild(): cc.Sprite is not using the same texture",
        initWithTexture: "Sprite.initWithTexture(): Argument must be non-nil ",
        setSpriteFrame: "Invalid spriteFrameName",
        setTexture_2: "Invalid argument: cc.Sprite.texture setter expects a CCTexture2D.",
        updateQuadFromSprite_2: "cc.SpriteBatchNode.updateQuadFromSprite(): sprite should be non-null",
        insertQuadFromSprite_2: "cc.SpriteBatchNode.insertQuadFromSprite(): sprite should be non-null",
    },

    SpriteBatchNode: {
        addSpriteWithoutQuad: "cc.SpriteBatchNode.addQuadFromSprite(): SpriteBatchNode only supports cc.Sprites as children",
        increaseAtlasCapacity: "cocos2d: CCSpriteBatchNode: resizing TextureAtlas capacity from %s to %s.",
        increaseAtlasCapacity_2: "cocos2d: WARNING: Not enough memory to resize the atlas",
        reorderChild: "cc.SpriteBatchNode.addChild(): Child doesn't belong to Sprite",
        removeChild: "cc.SpriteBatchNode.addChild(): sprite batch node should contain the child",
        addSpriteWithoutQuad_2: "cc.SpriteBatchNode.addQuadFromSprite(): child should be non-null",
        reorderChild_2: "cc.SpriteBatchNode.addChild(): child should be non-null",
        updateQuadFromSprite: "cc.SpriteBatchNode.updateQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children",
        insertQuadFromSprite: "cc.SpriteBatchNode.insertQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children",
        addChild: "cc.SpriteBatchNode.addChild(): cc.SpriteBatchNode only supports cc.Sprites as children",
        initWithTexture: "Sprite.initWithTexture(): Argument must be non-nil ",
        addChild_2: "cc.Sprite.addChild(): child should be non-null",
        setSpriteFrame: "Invalid spriteFrameName",
        setTexture: "Invalid argument: cc.Sprite texture setter expects a CCTexture2D.",
        updateQuadFromSprite_2: "cc.SpriteBatchNode.updateQuadFromSprite(): sprite should be non-null",
        insertQuadFromSprite_2: "cc.SpriteBatchNode.insertQuadFromSprite(): sprite should be non-null",
        addChild_3: "cc.SpriteBatchNode.addChild(): child should be non-null",
    },

    spriteFrameCache: {
        _getFrameConfig: "cocos2d: WARNING: originalWidth/Height not found on the cc.SpriteFrame. AnchorPoint won't work as expected. Regenrate the .plist",
        addSpriteFrames: "cocos2d: WARNING: an alias with name %s already exists",
        _checkConflict: "cocos2d: WARNING: Sprite frame: %s has already been added by another source, please fix name conflit",
        getSpriteFrame: "cocos2d: cc.SpriteFrameCahce: Frame %s not found",
        _getFrameConfig_2: "Please load the resource first : %s",
        addSpriteFrames_2: "cc.SpriteFrameCache.addSpriteFrames(): plist should be non-null",
        addSpriteFrames_3: "Argument must be non-nil",
    },

    TextureAtlas: {
        initWithFile: "cocos2d: Could not open file: %s",
        insertQuad: "cc.TextureAtlas.insertQuad(): invalid totalQuads",
        initWithTexture: "cc.TextureAtlas.initWithTexture():texture should be non-null",
        updateQuad: "cc.TextureAtlas.updateQuad(): quad should be non-null",
        updateQuad_2: "cc.TextureAtlas.updateQuad(): Invalid index",
        insertQuad_2: "cc.TextureAtlas.insertQuad(): Invalid index",
        insertQuads: "cc.TextureAtlas.insertQuad(): Invalid index + amount",
        insertQuadFromIndex: "cc.TextureAtlas.insertQuadFromIndex(): Invalid newIndex",
        insertQuadFromIndex_2: "cc.TextureAtlas.insertQuadFromIndex(): Invalid fromIndex",
        removeQuadAtIndex: "cc.TextureAtlas.removeQuadAtIndex(): Invalid index",
        removeQuadsAtIndex: "cc.TextureAtlas.removeQuadsAtIndex(): index + amount out of bounds",
        moveQuadsFromIndex: "cc.TextureAtlas.moveQuadsFromIndex(): move is out of bounds",
        moveQuadsFromIndex_2: "cc.TextureAtlas.moveQuadsFromIndex(): Invalid newIndex",
        moveQuadsFromIndex_3: "cc.TextureAtlas.moveQuadsFromIndex(): Invalid oldIndex",
    },

    textureCache: {
        addPVRTCImage: "TextureCache:addPVRTCImage does not support on HTML5",
        addETCImage: "TextureCache:addPVRTCImage does not support on HTML5",
        textureForKey: "textureForKey is deprecated. Please use getTextureForKey instead.",
        addPVRImage: "addPVRImage does not support on HTML5",
        addUIImage: "cocos2d: Couldn't add UIImage in TextureCache",
        dumpCachedTextureInfo: "cocos2d: '%s' id=%s %s x %s",
        dumpCachedTextureInfo_2: "cocos2d: '%s' id= HTMLCanvasElement %s x %s",
        dumpCachedTextureInfo_3: "cocos2d: TextureCache dumpDebugInfo: %s textures, HTMLCanvasElement for %s KB (%s MB)",
        addUIImage_2: "cc.Texture.addUIImage(): image should be non-null",
        invalidKey: "TextureCache: url should be non-null",
    },

    Texture2D: {
        initWithETCFile: "initWithETCFile does not support on HTML5",
        initWithPVRFile: "initWithPVRFile does not support on HTML5",
        initWithPVRTCData: "initWithPVRTCData does not support on HTML5",
        addImage: "cc.Texture.addImage(): path should be non-null",
        initWithImage: "cocos2d: cc.Texture2D. Can't create Texture. UIImage is nil",
        initWithImage_2: "cocos2d: WARNING: Image (%s x %s) is bigger than the supported %s x %s",
        initWithString: "initWithString isn't supported on cocos2d-html5",
        initWithETCFile_2: "initWithETCFile does not support on HTML5",
        initWithPVRFile_2: "initWithPVRFile does not support on HTML5",
        initWithPVRTCData_2: "initWithPVRTCData does not support on HTML5",
        bitsPerPixelForFormat: "bitsPerPixelForFormat: %s, cannot give useful result, it's a illegal pixel format",
        _initPremultipliedATextureWithImage: "cocos2d: cc.Texture2D: Using RGB565 texture since image has no alpha",
        addImage_2: "cc.Texture.addImage(): path should be non-null",
        initWithData: "NSInternalInconsistencyException",
    },

    MissingFile: "Missing file: %s",
    RectWidth: "Rect width exceeds maximum margin: %s",
    RectHeight: "Rect height exceeds maximum margin: %s",

    EventManager: {
        addListener: "0 priority is forbidden for fixed priority since it's used for scene graph based priority.",
        removeListeners: "Invalid listener type!",
        setPriority: "Can't set fixed priority with scene graph based listener.",
        addListener_2: "Invalid parameters.",
        addListener_3: "listener must be a cc.EventListener object when adding a fixed priority listener",
        addListener_4: "The listener has been registered, please don't register it again.",
        addListener_5: "Unsupported listener target.",
        _forceAddEventListener: "Invalid scene graph priority!",
        _updateListeners: "If program goes here, there should be event in dispatch.",
        _updateListeners_2: "_inDispatch should be 1 here."
    }
};

if (CC_DEV) {
    cc._LogInfos.Editor = {
        Class: {
            callSuperCtor: "cc.Class will automatically call super constructor of %s, you should not call it manually."
        }
    };
}
