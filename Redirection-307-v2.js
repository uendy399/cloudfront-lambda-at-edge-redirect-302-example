function handler(event) {
    var redirects = {
        'TW': '/legacy-files/',
        'US': '/legacy-files/legacy/'
    };
    var headers = event.request.headers;
    var originalPath = event.request.uri;

    if (originalPath === '/legacy-files/legacy/') {
        setTimeout(function() {
            var country = headers['cloudfront-viewer-country'].value;
            var newPath = originalPath; 
            if (country in redirects) {
                newPath = redirects[country];
            }
            return {
                statusCode: 307,
                statusDescription: 'Temporary Redirect',
                headers: { "location": { "value": newPath } }
            };
        }, 3000); // 3000毫秒 = 3秒
    } else {
        var newPath = originalPath; 
        var country = headers['cloudfront-viewer-country'].value;
        if (country in redirects) {
            newPath = redirects[country];
        }
        return {
            statusCode: 307,
            statusDescription: 'Temporary Redirect',
            headers: { "location": { "value": newPath } }
        };
    }
}
