import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../libs/commonMiddleware";
import { sendMailWithSES } from "../libs/sendMailWithSES";
import { templateGeneration } from "../libs/templateGeneration";

const sqs = new AWS.SQS();
/**
 * sendMail handler function should get the body from client,
 * send mail using SES
 * persist the log on mongodb
 */
async function sendNotification(event, context) {
  const body = event.body;

  const emailData = await templateGeneration(body);
  try {
    // await sqs
    //   .sendMessage({
    //     QueueUrl: process.env.MAIL_QUEUE_URL,
    //     MessageBody: JSON.stringify(body),
    //   })
    //   .promise();
    await sendMailWithSES(emailData);
    //persist to mongodb with a pending status flag
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Mail sent!",
      }),
    };
  } catch (error) {
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(sendNotification);
