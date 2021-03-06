'use strict';
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const CONSTANTS = require('./constants');

exports.uploadToS3 = async function(fileObj, fileLocation='') {
    let S3Bucket = new AWS.S3({
        accessKeyId: CONSTANTS.aws.s3.accessKey,
        secretAccessKey: CONSTANTS.aws.s3.secretKey,
        Bucket: CONSTANTS.aws.s3.defaultBucket,
        apiVersion: CONSTANTS.aws.s3.apiVersion
    });
    let key = fileLocation + '/' + uuidv4() + '-' + fileObj.hapi.filename
    try {
        await S3Bucket.putObject({
            Bucket: CONSTANTS.aws.s3.defaultBucket,
            Key: key,
            Body: fileObj._data,
            ContentType: fileObj.hapi.headers['content-type']
        }).promise();
    }
    catch(e) {
        throw e;
    }
    return CONSTANTS.aws.s3.defaultBucketBaseURL + '/' + key;
}
