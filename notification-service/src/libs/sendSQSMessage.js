import AWS from "aws-sdk";

const sqs = new AWS.SQS();
export async function sendSQSMessage(event, context) {
  return await sqs.sendMessageBatch().promise();
}
