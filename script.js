angular.module('IosSafariPdfTestApp', [])
.controller('IosSafariPdfTestController', function($scope, $http, $window) {
    $scope.testMsg = "Angular works";

    /**
     * Download PDF as Base64 encoded Binary and open it in a new tab. 
     * The only (found) way it works on Safari for iOS (with Pop-up blockers enabled)
     */
    $scope.downloadPdf = function() {
        // Fakes call of REST API
        var res = $scope.getRes();
        console.log("Response from Server: " + res);

        // Generate BLob from Base64 encoded PDF Binary
        var file = new Blob([$scope.convertBase64ToByteArray(res)], {
            type: 'application/pdf'
        })

        url = $window.URL || $window.webkitURL;
        $scope.fileUrl = url.createObjectURL(file);

        // works.. opens white pdf in same tab
        // window.location.href = $scope.fileUrl;

        // works but only without addblocker 
        // var downloadLink = angular.element('<a></a>');
        // downloadLink.attr('href', $scope.fileUrl);
        // downloadLink.attr('download', "preisblatt.pdf");
        // downloadLink.attr('target', '_blank');
        // downloadLink[0].click();

        // OPENING NEW WINDOW WITH WAITING MSG
        var pdfWindow = $window.open('', 'name');
        pdfWindow.focus();
        pdfWindow.document.open();
        pdfWindow.document.write("<html><head><title>preisblatt.pdf</title></head><body><h1>Dokument wird geladen . . .</h1></body></html>");

        // WRITING DATA FROM BLOB INTO NEW WINDOW (REFERENCED BY NAME)
        // Mind the iOS Safari workaround -> A link must be clicked
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', $scope.fileUrl);
        downloadLink.attr('download', "preisblatt.pdf");
        downloadLink.attr('target', 'name');
        downloadLink[0].click();
    }

    /**
     * Helper to get a Uint8Array with PDF Binary
     * @param {string} base64 Encoded PDF Data
     */
    $scope.convertBase64ToByteArray = function(base64) {
        var byteCharacters = atob(base64);
        var byteNumbers = new Array(byteCharacters.length);

        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        return new Uint8Array(byteNumbers);
    }

    /**
     * Fakes call of REST API to load Base64 encoded PDF binary
     */
    $scope.getRes = function() {
        return     'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
        'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
        'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
        'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
        'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
        'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
        'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
        'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
        'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
        'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
        'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
        'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
        'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
    };
    
});