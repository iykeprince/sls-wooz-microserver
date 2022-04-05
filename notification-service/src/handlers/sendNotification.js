import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../libs/commonMiddleware";

const sqs = new AWS.SQS();
/**
 * sendMail handler function should get the body from client,
 * send mail using SES
 * persist the log on mongodb
 */
async function sendNotification(event, context) {
  const body = event.body;
  console.log(
    "MAIL QUEUE :",
    JSON.stringify({
      QueueUrl: process.env.MAIL_QUEUE_URL,
      MessageBody: JSON.stringify(body),
    })
  );
  try {
    const sqsResult = await sqs
      .sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify(body),
      })
      .promise();

    console.log("sqs result", sqsResult);
    return {
      statusCode: 200,
      body: JSON.stringify(`Mail forwarded to queue`),
    };
  } catch (error) {
    throw new createError.InternalServerError(error);
  }

  // const foundTemplate = Templates[emailType];

  // if (!foundTemplate) {
  //   throw new createError.NotFound("Email type not recognized");
  // }
  // console.log("loading the templates from s3");
  // let htmlTemplate = await readTemplateAsync(foundTemplate.bucketKey);
  // htmlTemplate = htmlTemplate.Body.toString();
  // console.log(`htmlTemplate: ${htmlTemplate}`);

  // const expectedParams = await extractExpectedParams(["{{", "}}"])(
  //   htmlTemplate
  // );
  // console.log("expected params", expectedParams);

  // const validateParams = validateMailParams(Object.keys(data), expectedParams);

  // if (!validateParams) {
  //   throw new createError.BadRequest(
  //     `Expected parameters:"${JSON.stringify(expectedParams)}"`
  //   );
  // }

  // console.log("validateParam", validateParams);
  // const parsedEmailTemplate = parseDataToTemplate(
  //   ["{{", "}}"],
  //   data
  // )(htmlTemplate);

  // const emailData = {
  //   emailType,
  //   data,
  //   from,
  //   to,
  //   subject,
  //   template: parsedEmailTemplate,
  // };
  // console.log("email Data", emailData);

  // let result;
}

export const handler = commonMiddleware(sendNotification);
