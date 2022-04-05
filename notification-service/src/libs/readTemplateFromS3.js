import AWS from "aws-sdk";
const s3 = new AWS.S3();

export const readTemplateFromS3 = async (bucketKey) => {
  try {
    console.log(`Hi from Node.js on Lambda!`);
    const data = await s3
      .getObject({
        Bucket: "notification-service-templates",
        Key: bucketKey,
      })
      .promise();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};
