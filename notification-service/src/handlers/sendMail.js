import { sendMailWithSES } from "../libs/sendMailWithSES";
import commonMiddleware from "../libs/commonMiddleware";
import createError from "http-errors";
import { connectMongodb } from "../libs/connectMongodb";

/**
 * sendMail handler function should get the body from client,
 * send mail using SES
 * persist the log on mongodb
 */
async function sendMail(event, context) {
  const body = event.body;
  let result;

  // try {
  //   result = await sendMailWithSES(body);
  //   //persist to mongodb
  //   // const db = await connectMongodb();
  // } catch (error) {
  //   console.log(error);
  //   throw new createError.InternalServerError(error);
  // }

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
}

export const handler = commonMiddleware(sendMail);
