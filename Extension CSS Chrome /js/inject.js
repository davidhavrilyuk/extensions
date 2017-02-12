(function () {
     var urlKey = document.location,
         key = "styles",
         css = window.localStorage.getItem('extensionСSS-' + key + '-' + urlKey);

         if (css && css !=='') {
             chrome.extension.sendMessage({modify: true}, function (response) {});
         }
}());