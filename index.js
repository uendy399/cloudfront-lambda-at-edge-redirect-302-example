exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const host = headers['host'][0].value;
    const path = request.uri;

    // 如果請求的路徑已經是 legacy-files/index.html，則不進行導向，避免無限迴圈
    if (path === '/legacy-files/index.html') {
        callback(null, request);
        return;
    }

    const newurl = `https://${host}/legacy-files/index.html`;

    const response = {
        status: '302',
        statusDescription: 'Found',
        headers: {
            location: [{
                key: 'Location',
                value: newurl,
            }],
        },
    };

    callback(null, response);
};
