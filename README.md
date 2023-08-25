# How to Rewrite/Redirect URLs Using CloudFront with Lambda@Edge

This tutorial will guide you through using AWS's CloudFront service in combination with Lambda@Edge functions to achieve URL rewriting or redirection.

## Step 1: Create a Lambda Function
### Note: Lambda@Edge functions need to be created in the US East region, and require a specific IAM Role to achieve the purpose.
1. Log in to the AWS Management Console.
2. Navigate to the Lambda service.
3. Click "Create Function".
4. Set the function name, runtime (e.g., Node.js), IAM Role, etc.
5. Paste the following example code:

```javascript
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const host = headers['host'][0].value;
    const path = request.uri;

    // If the request path is already /v1/index.html, do not perform a redirect to avoid infinite loop
    if (path === '/v1/index.html') {
        callback(null, request);
        return;
    }

    const newurl = `https://${host}/v1/index.html`;

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
```
## Step 2: Create a CloudFront Distribution

1. Navigate to the CloudFront service.
2. Click "Create Distribution".
3. In the "Choose a content delivery method" section, configure the origin source, such as an S3 bucket or an Elastic Load Balancer (ELB).
4. In the "Behavior Settings" section, click "Add Behavior".
5. Configure the behavior with the "Event Type" set to "Viewer Request".
6. In the "Function Associations" section, specify the Lambda function you created earlier. Choose "All Requests" for "Cache Based on Selected Request Headers".
7. Complete the remaining settings and then click "Create Distribution".

### Notes

- Setting the "Viewer Request" behavior ensures that the Lambda function handles each incoming request.
- Ensure that you select the appropriate origin source and other settings based on your actual application.

## Step 3: Test URL Rewriting/Redirection

1. Wait for the CloudFront distribution deployment to complete.
2. Test the changes by entering your distribution's domain name in a web browser (e.g., https://your-distribution-id.cloudfront.net).
3. Verify whether the URL rewriting or redirection is being applied according to the rules defined in your Lambda function.

These are the essential steps to demonstrate how to use CloudFront in conjunction with Lambda@Edge to achieve URL rewriting or redirection. In real-world scenarios, additional configuration and adjustments may be necessary. For more detailed information, please consult the [AWS official documentation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html).

If you encounter any issues, refer to the [AWS official documentation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html) for further assistance.
