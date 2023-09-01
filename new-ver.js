function handler(event) {
    var request = event.Records[0].cf.request;
    var uri = request.uri;

    // 如果請求的路徑已經是 /index.html 或以 /assets/ 開頭，則不進行導向
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

exports.handler = handler;
