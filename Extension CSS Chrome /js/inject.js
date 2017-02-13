(function () {
     var urlKey = document.location,
         css = window.localStorage.getItem('extensionСSS-styles-' + urlKey),
         replaceCSS = JSON.parse(window.localStorage.getItem('extensionСSS-replaceCSS-' +urlKey));

         if ((css && css !=='') || replaceCSS) {
             chrome.extension.sendMessage({modify: true}, function (response) {});
         }
}());