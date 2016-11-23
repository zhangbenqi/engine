var _noCacheRex = /\?/;

module.exports = {
    //isUrlCrossOrigin: function (url) {
    //    if (!url) {
    //        cc.log('invalid URL');
    //        return false;
    //    }
    //    var startIndex = url.indexOf('://');
    //    if (startIndex === -1)
    //        return false;
    //
    //    var endIndex = url.indexOf('/', startIndex + 3);
    //    var urlOrigin = (endIndex === -1) ? url : url.substring(0, endIndex);
    //    return urlOrigin !== location.origin;
    //},
    urlAppendTimestamp: function (url) {
        if (cc.game.config['noCache'] && typeof url === 'string') {
            if(_noCacheRex.test(url))
                url += '&_t=' + (new Date() - 0);
            else
                url += '?_t=' + (new Date() - 0);
        }
        return url;
    },

    //BQ add
    urlAppendCrc: function(url) {
        var newUrl = url.substr(url.lastIndexOf('/')+1);
        if(window.urlCrc) {
            // console.log("1111 newUrl = "+newUrl)
            var crc = window.urlCrc[newUrl];
            if(crc && crc.length > 0) {
                // console.log("crc = "+crc);
                url += "?v=" + crc;
            }
        }
        console.log("url = "+url);
        return url;
    },

};
