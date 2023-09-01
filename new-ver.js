function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // If the requested path is already /index.html or starts with /assets/, no redirection is performed
    if (uri === '/index.html' || uri.indexOf('/assets/') === 0) {
        return request;
    }

    var newurl = 'https://d1bih7nq3u9t5x.cloudfront.net/index.html';

    var response = {
        status: '302',
        statusDescription: 'Found',
        headers: {
            location: [{ key: 'Location', value: newurl }],
        },
    };

    return response;
}

