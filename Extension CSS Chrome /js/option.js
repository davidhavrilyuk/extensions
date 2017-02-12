(function () {
    'use strict';
    var save = true, action = true;

    function getElementById(id) {
        return document.getElementById(id)
    }

    function translation() {
        var objects = document.getElementsByTagName('*');
        objects = Array.prototype.slice.call(objects);
        objects.map(function (item, index, arr) {
            if (item.dataset && item.dataset.message) {
               item.innerHTML = chrome.i18n.getMessage(item.dataset.message)
            }
        })
    }
    
    function init() {
        if (localStorage.hasOwnProperty('onloadValueExtension')) {
           action = localStorage.onloadValueExtension === 'true'
        }

        if (localStorage.hasOwnProperty('saveCSSExtension')) {
            save = localStorage.saveCSSExtension === 'true'
        }

        var buttonSave = getElementById('save-button'),
            saveYes = getElementById('save-yes'),
            saveNo = getElementById("save-no"),
            activateYes = getElementById('activate-yes'),
            activateNo = getElementById("activate-no");
        buttonSave.onclick = function () {
            localStorage.onloadValueExtension = !!activateYes.checked;
            localStorage.saveCSSExtension = !!saveYes.checked;
            window.close()

        };
        (function () {
            if (save) {
                saveYes.checked = true
            } else {
                saveNo.checked = true
            }

            if (action) {
                activateYes.checked = true
            } else {
                activateNo.checked = true
            }
        }());
        translation()
    }

    window.onload = function () {
        init();
    };

}());