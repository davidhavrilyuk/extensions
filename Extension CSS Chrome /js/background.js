(function () {
    "use strict";

    function setItem(key, value) {
        try {
            window.localStorage.removeItem(key);
            window.localStorage.setItem(key, value);
        } catch (ignor) {}
    }

    function getItem(key) {
        var val;
        try {
            val = window.localStorage.getItem(key);
        } catch (ignor) {}
        return val;
    }

    function setupDefaults() {
        if (!localStorage.hasOwnProperty('saveCSSExtension')) {
            setItem('saveCSSExtension', 'true');
        }
        if (!localStorage.hasOwnProperty('onloadValueExtension')) {
            setItem('onloadValueExtension', 'true');
        }
    }

    function injectEditor() {
        setupDefaults();
        var options = {
            onloadValue: getItem('onloadValueExtension') === 'true',
            saveCSS: getItem('saveCSSExtension') === 'true'
        };
        var code = 'сssExt('+ JSON.stringify(options) +')';

        chrome.tabs.insertCSS(null, {file: "style/containerSettings.css"});
        chrome.tabs.executeScript(null, {file: "js/interfaceCSS.js"}, function () {
            chrome.tabs.executeScript(null, {code: code});
        });

    }
    
    function loadExistingStyle(tabId) {
        if (getItem('onloadValueExtension') === 'true') {
            chrome.browserAction.setBadgeText({ text: '#', tabId: tabId });
            chrome.tabs.executeScript(null, {file: "js/append_style.js"});
        }
    }

    chrome.extension.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.modify) {
                loadExistingStyle(sender.tab.id);
            }
            sendResponse();
        }
    );

    ///работает при клике на иконку
    chrome.browserAction.onClicked.addListener(function (tab) {
        var url = tab.url;

        if (url.indexOf('chrome') === 0) {
            alert(chrome.i18n.getMessage('errorChromeURL'));
            return;
        }
            injectEditor();
    });

}());
