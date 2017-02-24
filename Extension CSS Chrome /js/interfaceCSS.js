var сssExt = function (options) {
    var urlKey = document.location;

    // Used Functions
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

    function nospace(str) {
        var VRegExp = new RegExp(/^(\s|\u00A0)+/g),
            VResult = str.replace(VRegExp, '');
        return VResult
    }

    function getElID(id) {
        return document.getElementById(id)
    }


    function getStorage(key) {
        return window.localStorage.getItem('extensionСSS-' + key + '-' + urlKey);
    }

    function setStorage(key, value) {
        window.localStorage.setItem('extensionСSS-' + key + '-' + urlKey, value);
    }

    function unsetStorage(key) {
        window.localStorage.removeItem('extensionСSS-' + key + '-' + urlKey);
        return true;
    }

///interface
    function InterfaceExt(options) {
        var self = this;
        this.html = '\
    <div id="CSS_panel_all" > \
      <div id="CSS_panel_Add">\
        <div id="CSS_panel_button_group">\
             <div id="CSS_panel_button_Vertical" class="CSS_panel_button_right"><img class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAO5JREFUSA1jYBgFoyEwGgKjIUDNEPCr2lpPLfOAZjVgM4sJXTCwdlsrUAyrYnS1RPLrA2t3gMxEASgWgyxlZWPPR1FBBQ4rG2s+uuVwi2GWGujrcVPBLhQjQGaiW84IUoFsKSsrK8Phw0dRNFLKsbW1Zvj9+zfDhYuXvv7+9Xvi+maPakZ0Sym1BJ9+ZMvhQY1PAy3kBi6oYb5BDvITJ04xbGrzBjsKJk8uDczH/y0szFDiF2QWPKjXN3tV//71cyIoAZBrCS59yIkKpgZuMUgAZjlMklo0LCUTNI8eRSZBR4wqGA2B0RAYDQFcIQAAPCh5IfnDAqcAAAAASUVORK5CYII=" width="16" height="16"></div>\
             <div id="CSS_panel_button_Horizontal" class="CSS_panel_button_bottom"><img class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAASRJREFUSA1jYBhqILB2W2tg7Y5Wct3NTI5GkKWsbOz5zMzMFmo2Udw3Di3ZR6o5JFsMs9RAX49bQkKc7fWbN0bkWE6SxciWsrKyMgB9zCAmKkqW5URbjG4pLGjJtZwRZgA+2q9qaz1QvgFZja2tNZh7+PBRZGEQu3FTm3cDuiA6nyiL0TUBHfIf2WKgRSSbw4RuKL34oxbTK6QZRoN6NKhpFgKjiYtmQYtu8GhQo4cIzfgsxJiMrSGArA9UPyPxqdsQwNX0AVn4+/dvhgsXL339/ev3xPXNHtVIjsDJJLrNdePQ0n1qNhHcr9+8NQI18EBtLRAgx1KQPqItBilGt/zfv38k+xRkDgiQ3FYCaYIFO4hNSvCC1FMMQJZT0oWh2AHkGgAAoO6ArkLow8UAAAAASUVORK5CYII=" width="16" height="16"></div>\
             <div id="CSS_panel_button_ClearStyle" ><img class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAARtJREFUSA1jYBhpgJEUD3eVLjZiZPi3HqhHDk3fo/8MTIFl3bHn0MRxcllwymCRYGT43/uf4X9tWXfCImTprtIFcSA5oJgjsjg+NoqPpzSs7P/+9UcBPg3kynFxc07MbgiDm43iY5ClgQmB5JqNV9/6BevzgQqwWwzSCVSA1wBqSaIENczQ7tKF/6nlc5BHSrvjMexhgllGb5qgxehBj84HORhdDJ2PzVMELcamiRpioxZTIxSJMmM0qIkKJmooGg1qaoQiUWaMBjVRwUQNRaNBjRGK6C0RdD5IA7oYOh/DUKAA1qBmYWF+fv3CdWzqSRK7ceEGA8gsbJpQWpkwBX///o+/e/3uZKBGdZgYOTQrO+tNoFm55OgdfnoAGgBKlrbaJaAAAAAASUVORK5CYII=" width="16" height="16"></div>\
        </div>\
        <div class="CSS_panel_Name">' + chrome.i18n.getMessage("titleAddStyle") + '</div> \
        <textarea id="CSS_code" class="CSS_field_style" placeholder="body {background: grey;}"></textarea> \
      </div> \
      <div id="CSS_panel_Change">\
        <div class="CSS_panel_Name">' + chrome.i18n.getMessage("titleReplaceStyle")  + '<input type="checkbox" id="CSS_panel_Checkbox">' +'</div> \
          <div id="CSS_panel_Change_Field">\
            <div id="CSS_option"></div> \
            <textarea id="CSS_code_Change" class="CSS_field_style" ></textarea> \
          </div>\
      </div>\
    </div>\
    ';
        this.saveCSS =   (options.saveCSS != undefined) ? options.saveCSS : true;
        this.cssCache = '';
        this.keyupTimer = null;
        this.styleElement = [];
        this.cacheCSSReplace = [];
    }


    InterfaceExt.prototype.addPanel = function () {
        var self = this;
        var el = document.createElement('div');
        el.setAttribute('id', 'CSS_panel');
        el.className = 'CSS_panel_position_top CSS_panel_position_right';
        el.innerHTML = this.html;
        document.body.appendChild(el)
    };

    InterfaceExt.prototype.activateButtons = function () {
        var self = this;
        var CSSpanelCheckbox = getElID("CSS_panel_Checkbox"),
            Addst = getElID('CSS_code'),
            ClearMyStyle = getElID('CSS_panel_button_ClearStyle'),
            moveVert = getElID('CSS_panel_button_Vertical'),
            moveHoriz = getElID('CSS_panel_button_Horizontal');

        ClearMyStyle.onclick = function () {
            self.clear()
        };

        CSSpanelCheckbox.onclick = function () {
            self.CSSpanel(self);

        };

        Addst.onkeyup = function () {
            self.createTegStyle('Style_Css_add');
            self.keyupTimer && clearTimeout(self.keyupTimer);
            self.keyupTimer = setTimeout(self.updateCSSTag(self), 100);
        };

        moveVert.onclick = this.moveVertical;
        moveHoriz.onclick = this.moveHorizontal;
    };

    InterfaceExt.prototype.moveVertical = function () {
        if (hasClass( getElID('CSS_panel_button_Vertical'), 'CSS_panel_button_right')) {
            removeClass(getElID('CSS_panel_button_Vertical'), 'CSS_panel_button_right');
            addClass(getElID('CSS_panel_button_Vertical'), 'CSS_panel_button_left' );
            removeClass(getElID('CSS_panel'), 'CSS_panel_position_right');
            addClass(getElID('CSS_panel'), 'CSS_panel_position_left')
        } else if (hasClass( getElID('CSS_panel_button_Vertical'), 'CSS_panel_button_left')) {
            removeClass(getElID('CSS_panel_button_Vertical'), 'CSS_panel_button_left');
            addClass(getElID('CSS_panel_button_Vertical'), 'CSS_panel_button_right');
            removeClass(getElID('CSS_panel'), 'CSS_panel_position_left');
            addClass(getElID('CSS_panel'), 'CSS_panel_position_right')
        }
    };

    InterfaceExt.prototype.moveHorizontal = function () {
        if (hasClass( getElID('CSS_panel_button_Horizontal'), 'CSS_panel_button_bottom')) {
            removeClass(getElID('CSS_panel_button_Horizontal'), 'CSS_panel_button_bottom');
            addClass(getElID('CSS_panel_button_Horizontal'), 'CSS_panel_button_top' );
            removeClass(getElID('CSS_panel'), 'CSS_panel_position_top');
            addClass(getElID('CSS_panel'), 'CSS_panel_position_bottom')
        } else if (hasClass( getElID('CSS_panel_button_Horizontal'), 'CSS_panel_button_top')) {
            removeClass(getElID('CSS_panel_button_Horizontal'), 'CSS_panel_button_top');
            addClass(getElID('CSS_panel_button_Horizontal'), 'CSS_panel_button_bottom');
            removeClass(getElID('CSS_panel'), 'CSS_panel_position_bottom');
            addClass(getElID('CSS_panel'), 'CSS_panel_position_top')
        }
    };

    InterfaceExt.prototype.createTegStyle = function (id) {
        if (getElID(id)) {
            return;
        }

        var elStyle = document.createElement('style');
        elStyle.id = id;
        elStyle.setAttribute("type", "text/css");
        document.head.appendChild(elStyle)
    };

    InterfaceExt.prototype.downloadCacheCSSrep = function () {
        var Cache = getStorage('replaceCSS');
        Cache = JSON.parse(Cache);
        if (Cache != null) {
            for (var i = 0; i < Cache.length; ++i) {
                var cache = Cache[i];
                cache.newStyle = StyleElemReplace.prototype.newStyle;
                this.cacheCSSReplace.push(cache)
            }
        }
    };

    InterfaceExt.prototype.updateCSSTag = function (self) {
        var source = getElID('CSS_code');
        if (source) {
            if (this.cssCache === source.value) return false;
            self.fillStyleTag(source.value)
        }
    };

    InterfaceExt.prototype.fillStyleTag = function  (css) {
        var tag = getElID('Style_Css_add');
        css = css || '';
        try {
            tag.innerHTML = css;
        } catch (ignor) {}
        this.cssCache = css;
        try {
            unsetStorage('styles')
        } catch (ignor) {}
        if (this.saveCSS) setStorage('styles', css);
    };

    InterfaceExt.prototype.clear = function () {
        if (getElID('Style_Css_add') !== null)   document.head.removeChild(getElID('Style_Css_add'));
        if (getElID('Style_CSS_replace') !== null)   document.head.removeChild(getElID('Style_CSS_replace'));
        unsetStorage('replaceCSS');
        unsetStorage('styles');
        getElID('CSS_code').value = '';
        getElID('CSS_code_Change').value = ''
    };

    InterfaceExt.prototype.contentPanelText = function () {
        var css = getStorage('styles'),
            el = getElID('CSS_code');
        if (css && css !== '' && this.saveCSS) el.innerHTML = css;
    };


    InterfaceExt.prototype.CSSpanel = function() {
        var self = this;
        var el = getElID('CSS_panel_Change_Field');
        if (getElID("CSS_panel_Checkbox") && getElID("CSS_panel_Checkbox").checked) {
            el.style.display = "block";
            this.CSSpanel.disableButtons();
            this.CSSpanel.disableLinks();
            document.ondblclick = function(e) {
                self.handler(e)
            }
        } else {
            this.CSSpanel.includeButtons();
            this.CSSpanel.includeLinks();
            el.style.display = "none";
            document.ondblclick = null
        }
    };


    InterfaceExt.prototype.CSSpanel.disableButtons = function () {
        var submit = document.querySelectorAll('input[type=submit]'),
            buttons1 = document.querySelectorAll('input[type=button]'),
            buttons2 = document.querySelectorAll('button');
        buttons1 = Array.prototype.slice.call(buttons1);
        buttons2 = Array.prototype.slice.call(buttons2);
        submit = Array.prototype.slice.call(submit);
        var buttons = buttons1.concat(buttons2, submit);
        buttons.forEach(function (item, index, arr) {
            if (!item.disabled) {
                addClass(item, 'buttonClassNameCSSExtension');
                item.disabled = true
            }
        })
    };

    InterfaceExt.prototype.CSSpanel.includeButtons = function () {
        var buttons = document.querySelectorAll('.buttonClassNameCSSExtension');
        buttons = Array.prototype.slice.call(buttons);
        buttons.forEach(function (item, index, arr) {
            item.disabled = false;
            removeClass(item, 'buttonClassNameCSSExtension')
        })
    };

    InterfaceExt.prototype.CSSpanel.disableLinks = function () {
        var links = document.getElementsByTagName('a');
        links = Array.prototype.slice.call(links);
        links.map(function (item, index, arr) {
            addClass(item, 'noLinkCSSextensions')
        });
        getElID('CSS_code_Change').value =  chrome.i18n.getMessage("MessageLinksDis")
    };

    InterfaceExt.prototype.CSSpanel.includeLinks = function () {
        var links = document.getElementsByTagName('a');
        links = Array.prototype.slice.call(links);
        links.map(function (item, index, arr) {
            removeClass(item, 'noLinkCSSextensions')
        });
        getElID('CSS_code_Change').value = ''
    };

    InterfaceExt.prototype.handler = function (e) {
        var self = this;
        if (getElID('CSS_select_option') != undefined) {
            getElID('CSS_option').removeChild(getElID('CSS_select_option'))
        }
        var elem = document.elementFromPoint(e.clientX, e.clientY);
        var styleElemReplace = new StyleElemReplace(e.clientX, e.clientY, elem, pageXOffset, pageYOffset, this.cacheCSSReplace.length),
            styleElem = window.getComputedStyle(elem),
            styleElemArr =  styleElem.cssText.split(';');
        this.styleElement = this.handler.filterStyleArr(styleElemArr);
        this.handler.createStyleOption(this.styleElement);
        var SelectStyle = getElID('CSS_select_option');
        SelectStyle.onchange = this.handler.chooseStyle.call(this);
        getElID('CSS_code_Change').onkeydown = function (e) {
            this.keyupTimer && clearTimeout(this.keyupTimer);
            this.keyupTimer = setTimeout(function () {
                self.handler.replaceCSS.call(self, styleElemReplace);
                self.handler.renderCSSReplace.call(self);
                try {
                    unsetStorage('replaceCSS')
                } catch (ignor) {}
                setStorage('replaceCSS', JSON.stringify(self.cacheCSSReplace))
            }, 100);
        }
    };

    InterfaceExt.prototype.handler.filterStyleArr = function (arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; ++i) {
            if ((arr[i].indexOf('animation') != -1) ||
                (arr[i].indexOf('-webkit') != -1) ||
                (arr[i].indexOf('transition') != -1)) continue;

            newArr.push(arr[i].split(':'))
        }
        newArr.length = 186;
        return newArr
    };

    InterfaceExt.prototype.handler.createStyleOption = function (arr) {
        var select = document.createElement('select');
        select.id = 'CSS_select_option';
        select.className = 'CSS_field_style';
        for (var i = 0; i < arr.length; ++i) {
            var option = document.createElement('option');
            option.innerHTML = arr[i][0];
            select.appendChild(option)
        }
        getElID('CSS_option').appendChild(select)
    };

    InterfaceExt.prototype.handler.chooseStyle = function () {
        var val = getElID('CSS_select_option').value;
        for (var i = 0; i < this.styleElement.length; ++i) {
            var styleName = nospace(this.styleElement[i][0]);
            if (val == styleName) {

                getElID('CSS_code_Change').value = "";
                getElID('CSS_code_Change').value = this.styleElement[i][1];
                break;
            }
        }
    };

    InterfaceExt.prototype.handler.replaceCSS = function (styleElemReplace) {
        var self = this;
        var nameCSS = getElID('CSS_select_option').value,
            NewValueCSS = getElID('CSS_code_Change').value,
            OldValueCss = (function () {
                for (var i = 0; i < self.styleElement.length; ++i) {
                    var OldstyleName = nospace(self.styleElement[i][0]);
                    if (OldstyleName == nameCSS) {
                        return self.styleElement[i][1]
                    }
                }
            }()),
            lack = true;

        for (var i = 0; i < this.cacheCSSReplace.length; ++i) {
            if (this.cacheCSSReplace[i].attr === styleElemReplace.attr) {
                this.cacheCSSReplace[i].newStyle(nameCSS, NewValueCSS, OldValueCss);
                lack = false;
                break;
            }
        }
        if (lack) {
            styleElemReplace.newStyle(nameCSS, NewValueCSS, OldValueCss);
            this.cacheCSSReplace.push(styleElemReplace)
        }
    };

    InterfaceExt.prototype.handler.renderCSSReplace = function () {
        this.createTegStyle('Style_CSS_replace');
        var styleElem = getElID('Style_CSS_replace'),
            CSS = "";
        for (var i = 0; i < this.cacheCSSReplace.length; ++i) {
            var  cacheCSSRe = this.cacheCSSReplace[i];
            var el = document.elementFromPoint(cacheCSSRe.x, cacheCSSRe.y);
            el.id = cacheCSSRe.attr;
            CSS += '#' + cacheCSSRe.attr + '{' + this.handler.allValStyles(cacheCSSRe.style) + '}'
        }

        styleElem.innerHTML = CSS
    };

    InterfaceExt.prototype.handler.allValStyles = function (arrStyle) {
        var val = '';
        for (var i = 0; i < arrStyle.length; ++i) {
            val += arrStyle[i][0] + ":" + arrStyle[i][1] + "; "
        }
        return val
    };


//// the object which contains the modified styles
    function StyleElemReplace(x, y, elem, offsetLeft, offsetTop, length) {
        this.x = x;
        this.y = y;
        this.element = elem;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
        this.style = [];
        this.attr = this.element.id || 'classExtUrl' + length;
    }

    StyleElemReplace.prototype.newStyle = function (NameStyle, newStyleValue, oldStyleValue ) {
        if (newStyleValue !== oldStyleValue && nospace(newStyleValue) !== "") {
            var lack = true;
            for (var i = 0; i < this.style.length; ++i) {
                if (this.style[i][0] === NameStyle) {
                    var arr = [NameStyle, newStyleValue];
                    lack = false;
                    this.style[i] = arr;
                    break;
                }
            }
            if (lack) {
                this.style.push([NameStyle, newStyleValue])
            }
        }
    };

///init
    function init() {
        var interfaceExt = new InterfaceExt(options);
        interfaceExt.addPanel();
        interfaceExt.contentPanelText();
        interfaceExt.activateButtons();
        interfaceExt.downloadCacheCSSrep();

    }

    if (getElID('CSS_panel') == undefined) {
        init()
    } else {
        document.body.removeChild(getElID('CSS_panel'));
    }
};
