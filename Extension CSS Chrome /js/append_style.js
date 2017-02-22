(function () {
        var elemStyle = document.createElement('style'),
            urlKey =  document.location,
            replaceCSS = JSON.parse(window.localStorage.getItem('extensionСSS-replaceCSS-' + urlKey)),
            css = window.localStorage.getItem('extensionСSS-styles-' + urlKey);
        if (css && css !=='') {
            elemStyle.id = 'Style_Css_add';
            elemStyle.setAttribute("type", "text/css");
            elemStyle.innerHTML = css;
            document.head.appendChild(elemStyle)
        }

    function allValStyles(arrStyle) {
        var val = '';
        for (var i = 0; i < arrStyle.length; ++i) {
            val += arrStyle[i][0] + ":" + arrStyle[i][1] + "; "
        }
        return val
    }

    function renderCSSReplace() {
        var styleElem = document.createElement('style'),
            CSS = "";
        styleElem.id = 'Style_CSS_replace';
        for (var i = 0; i < replaceCSS.length; ++i) {
            var   cacheCSSRe = replaceCSS[i];
            window.scrollTo(cacheCSSRe.offsetLeft, cacheCSSRe.offsetTop);
            var el = document.elementFromPoint(cacheCSSRe.x, cacheCSSRe.y);
            el.id = cacheCSSRe.attr;
            CSS += '#' + cacheCSSRe.attr + '{' + allValStyles(cacheCSSRe.style) + '} ';
            window.scrollTo(0, 0);
        }
        styleElem.innerHTML = CSS;
        document.head.appendChild(styleElem)
    }

    if (replaceCSS != undefined) {
        renderCSSReplace()
    }
}());