/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.

 http://www.cocos.com

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

var eventRegx = /^(click)(\s)*=/;
/**
 * A utils class for parsing HTML texts. The parsed results will be an object array.
 */
cc.HtmlTextParser = function() {
    this._parsedObject = {};
    this._specialSymbolArray = [];
    this._specialSymbolArray.push([/&lt;/g, '<']);
    this._specialSymbolArray.push([/&gt;/g, '>']);
    this._specialSymbolArray.push([/&amp;/g, '&']);
    this._specialSymbolArray.push([/&quot;/g, '"']);
    this._specialSymbolArray.push([/&apos;/g, '\'']);
};

cc.HtmlTextParser.prototype = {
    constructor: cc.HtmlTextParser,
    parse: function(htmlString) {
        this._resultObjectArray = [];
        this._stack = [];

        var startIndex = 0;
        var length = htmlString.length;
        while (startIndex < length) {
            var tagBeginIndex = htmlString.indexOf('<', startIndex);
            if (tagBeginIndex < 0) {
                this._stack.pop();
                this._processResult(htmlString.substring(startIndex));
                startIndex = length;
            } else {
                this._processResult(htmlString.substring(startIndex, tagBeginIndex));

                var tagEndIndex = htmlString.indexOf('>', startIndex);
                if (tagEndIndex === -1) {
                    // cc.error('The HTML tag is invalid!');
                    tagEndIndex = tagBeginIndex;
                } else if (htmlString.charAt(tagBeginIndex + 1) === '\/'){
                    this._stack.pop();
                } else {
                    this._addToStack(htmlString.substring(tagBeginIndex + 1, tagEndIndex));
                }
                startIndex = tagEndIndex + 1;

            }
        }


        return this._resultObjectArray;
    },

    _attributeToObject: function (attribute) {
        attribute = attribute.trim();

        var obj = {};
        var header = attribute.match(/^(color|size)(\s)*=/);
        var tagName;
        var nextSpace;
        var eventObj;
        var eventHanlderString;
        if (header) {
            tagName = header[0];
            attribute = attribute.substring(tagName.length).trim();
            if(attribute === "") return obj;

            //parse color
            nextSpace = attribute.indexOf(' ');
            switch(tagName[0]){
              case 'c':
                  if (nextSpace > -1) {
                      obj.color = attribute.substring(0, nextSpace).trim();
                  } else {
                      obj.color = attribute;
                  }
                  break;
              case 's':
                  obj.size = parseInt(attribute);
                  break;
            }

            //tag has event arguments
            if(nextSpace > -1) {
                eventHanlderString = attribute.substring(nextSpace+1).trim();
                eventObj = this._processEventHandler(eventHanlderString);
                obj.event = eventObj;
            }
            return obj;
        }

        header = attribute.match(/^(br(\s)*\/)/);
        if(header && header[0].length > 0) {
            tagName = header[0].trim();
            if(tagName.startsWith("br") && tagName[tagName.length-1] === "/") {
                obj.isNewLine = true;
                this._resultObjectArray.push({text: "", style: {newline: true}});
                return obj;
            }
        }

        header = attribute.match(/^(img(\s)*src(\s)*=[^>]+\/)/);
        if(header && header[0].length > 0) {
            tagName = header[0].trim();
            if(tagName.startsWith("img") && tagName[tagName.length-1] === "/") {
                var srcBegin = tagName.indexOf('=');
                var remainingArgument = tagName.substring(srcBegin+1).trim();
                var imageSrc;
                var endQuotIndex = -1;
                var isValidImageTag = false;
                switch(remainingArgument[0]){
                  case "'":
                      endQuotIndex = remainingArgument.indexOf("'", 1);
                      if(endQuotIndex > -1) {
                          imageSrc = remainingArgument.substring(1, endQuotIndex);
                          isValidImageTag = true;
                      }
                      break;
                  case "\"":
                      endQuotIndex = remainingArgument.indexOf("\"", 1);
                      if(endQuotIndex > -1) {
                          imageSrc = remainingArgument.substring(1, endQuotIndex);
                          isValidImageTag = true;
                      }
                      break;
                  default:
                      //invalid tag
                      break;
                }
                if(isValidImageTag) {
                    obj.isImage = true;
                    obj.src = imageSrc;
                    eventHanlderString = remainingArgument.substring(endQuotIndex+1).trim();
                    if(eventHanlderString.match(eventRegx)){
                        eventObj = this._processEventHandler(eventHanlderString);
                        obj.event = eventObj;
                    }
                    this._resultObjectArray.push({text: "", style: obj});
                }

                return {};
            }
        }

        header = attribute.match(/^(outline(\s)*[^>]*)/);
        if (header) {
            attribute = header[0].substring("outline".length).trim();
            var defaultOutlineObject = {color: "#ffffff", width: 1};
            if (attribute) {
                var outlineAttrReg = /(\s)*color(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=/;
                header = attribute.match(outlineAttrReg);
                var tagValue;
                while (header) {
                    //skip the invalid tags at first
                    attribute = attribute.substring(attribute.indexOf(header[0]));
                    tagName = attribute.substr(0, header[0].length);
                    //remove space and = character
                    remainingArgument = attribute.substring(tagName.length).trim();
                    nextSpace = remainingArgument.indexOf(' ');
                    if (nextSpace > -1) {
                        tagValue = remainingArgument.substr(0, nextSpace);
                    } else {
                        tagValue = remainingArgument;
                    }
                    tagName = tagName.replace(/[^a-zA-Z]/g, "").trim();
                    tagName = tagName.toLocaleLowerCase();

                    attribute = remainingArgument.substring(nextSpace).trim();
                    if (tagName === "click") {
                        obj.event = this._processEventHandler(tagName + "=" + tagValue);
                    } else if (tagName === "color") {
                        defaultOutlineObject.color = tagValue;
                    } else if (tagName === "width") {
                        defaultOutlineObject.width = parseInt(tagValue);
                    }
                    header = attribute.match(outlineAttrReg);
                }
            }
            obj.outline = defaultOutlineObject;
        }

        header = attribute.match(/^(on|u|b|i)(\s)*/);
        if(header && header[0].length > 0) {
            tagName = header[0];
            attribute = attribute.substring(tagName.length).trim();
            switch(tagName[0]){
              case 'u':
                  obj.underline = true;
                  break;
              case 'i':
                  obj.italic = true;
                  break;
              case 'b':
                  obj.bold = true;
                  break;
            }
            if(attribute === "") {
                return obj;
            }
            eventObj = this._processEventHandler(attribute);
            obj.event = eventObj;
        }


        return obj;
    },

    _processEventHandler: function (eventString) {
        var index = 0;
        var obj = {};
        var eventNames = eventString.match(eventRegx);
        var isValidTag = false;
        while(eventNames) {
            var eventName = eventNames[0];
            var eventValue = "";
            isValidTag = false;
            eventString = eventString.substring(eventName.length).trim();
            if(eventString.charAt(0) === "\"") {
                index = eventString.indexOf("\"", 1);
                if (index > -1) {
                    eventValue = eventString.substring(1, index).trim();
                    isValidTag = true;
                }
                index++;
            } else if(eventString.charAt(0) === "\'") {
                index = eventString.indexOf('\'', 1);
                if(index > -1) {
                    eventValue = eventString.substring(1, index).trim();
                    isValidTag = true;
                }
                index++;
            } else {
                //skip the invalid attribute value
                var match = eventString.match(/(\S)+/);
                if(match) {
                    eventValue = match[0];
                } else {
                    eventValue = "";
                }
                index = eventValue.length;
            }

            if(isValidTag) {
                eventName = eventName.substring(0, eventName.length-1).trim();
                obj[eventName] = eventValue;
            }

            eventString = eventString.substring(index).trim();
            eventNames = eventString.match(eventRegx);
        }

        return obj;
    },

    _addToStack: function(attribute) {
        var obj = this._attributeToObject(attribute);

        if (this._stack.length === 0){
            this._stack.push(obj);
        } else {
            if(obj.isNewLine || obj.isImage) {
                return;
            }
            //for nested tags
            var previousTagObj = this._stack[this._stack.length - 1];
            for (var key in previousTagObj) {
                if (!(obj[key])) {
                    obj[key] = previousTagObj[key];
                }
            }
            this._stack.push(obj);
        }
    },

    _processResult: function(value) {
        if (value === "") {
            return;
        }

        value = this._escapeSpecialSymbol(value);
        if (this._stack.length > 0) {
            this._resultObjectArray.push({text: value, style: this._stack[this._stack.length - 1]});
        } else {
            this._resultObjectArray.push({text: value});
        }
    },

    _escapeSpecialSymbol: function(str) {
        for(var i = 0; i < this._specialSymbolArray.length; ++i) {
            var key = this._specialSymbolArray[i][0];
            var value = this._specialSymbolArray[i][1];

            str = str.replace(key, value);
        }
        return str;
    }
};


cc.htmlTextParser = new cc.HtmlTextParser();
