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



    function hasClass(el, name) {
        return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
    }

    function addClass(el, name) {
        if (!hasClass(el, name)) {
            el.className += (el.className ? ' ' : '') +name;
        }
    }

    function removeClass(el, name) {
        if (hasClass(el, name)) {
            var newName = el.className;
            newName = newName.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ');
            newName = newName.replace(/^\s+|\s+$/g, '');
            el.className = newName;
        }
    }

    function allValStyles(arrStyle) {
        var val = '';
        for (var i = 0; i < arrStyle.length; ++i) {
            val += arrStyle[i][0] + ":" + arrStyle[i][1] + ";"
        }
        return val
    }

    function renderCSSReplace() {
        var styleElem = document.createElement('style'),
            CSS = "";
        styleElem.id = 'Style_CSS_replace';
        for (var i = 0; i < replaceCSS.length; ++i) {
            var   cacheCSSRe = replaceCSS[i];
            var el = document.elementFromPoint(cacheCSSRe.x, cacheCSSRe.y);
            removeClass(el, cacheCSSRe.attr);
            addClass(el, cacheCSSRe.attr);
            CSS += '.' + cacheCSSRe.attr + '{' + allValStyles(cacheCSSRe.style) + '}'
        }
        styleElem.innerHTML = CSS;
        document.head.appendChild(styleElem)
    }

    if (replaceCSS != undefined) {
        renderCSSReplace()
    }

}());