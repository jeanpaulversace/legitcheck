import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAJRBRXDEVWXFHMLGQ',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '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',
});

function getUploadPreSignedUrl(key) {
  return s3.getSignedUrl('putObject', {
    Bucket: 'legitcheck',
    Key: key,
    ACL: 'authenticated-read',
    // This must match with your ajax contentType parameter
    ContentType: 'binary/octet-stream',
    /* then add all the rest of your parameters to AWS puttObect here */
  });
}

function getDownloadPreSignedUrl(key) {
  return s3.getSignedUrl('getObject', {
    Bucket: 'legitcheck',
    Key: key,
    /* set a fixed type, or calculate your mime type from the file extension */
    ResponseContentType: 'image/*',
    /* and all the rest of your parameters to AWS getObect here */
  });
}

export default {
  getUploadPreSignedUrl,
  getDownloadPreSignedUrl,
};
