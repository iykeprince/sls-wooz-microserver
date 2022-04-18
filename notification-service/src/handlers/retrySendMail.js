import AWS from "aws-sdk";
import createError from "http-errors";
import EmailLogsSchema from "../../models/emailLogs.schema";
import commonMiddleware from "../libs/commonMiddleware";
import { connectMongodb } from "../libs/connectMongodb";
import { sendMailWithSES } from "../libs/sendMailWithSES";
import { templateGeneration } from "../libs/templateGeneration";

const sqs = new AWS.SQS();

async function retrySendMail(event, context) {
  const { id } = event.pathParameters;

  try {
    await connectMongodb();

    const foundObj = await EmailLogsSchema.findById(id).exec();
    if (!foundObj) {
      console.log("Mail id not found");
      throw new createError.NotFound(`No mail with mailId ${id} found`);
    }

    const body = JSON.parse(foundObj.payload);
    console.log("result", body);
    const emailData = await templateGeneration(body);
    //fetch template
    // const { emailType, data, from, to, subject } = result;
    //  foundTemplate = await EmailTemplate.findOne({
    //   email_type: emailType,
    // }).exec();

    // await sqs
    //   .sendMessage({
    //     QueueUrl: process.env.MAIL_QUEUE_URL,
    //     MessageBody: JSON.stringify(body),
    //   })
    //   .promise();
    await sendMailWithSES(emailData);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Mail sent!",
      }),
    };
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  // if (!foundTemplate) {
  //   throw new createError.NotFound("Email type not recognized");
  // }

  // const expectedParams = await extractExpectedParams(["{{", "}}"])(
  //   foundTemplate.template
  // );

  // const validateParams = validateMailParams(Object.keys(data), expectedParams);

  // if (!validateParams) {
  //   throw new createError.BadRequest(
  //     `Expected parameters:"${JSON.stringify(expectedParams)}"`
  //   );
  // }

  // const parsedEmailTemplate = parseDataToTemplate(
  //   ["{{", "}}"],
  //   data
  // )(foundTemplate.template);

  // const emailData = {
  //   emailType: result.emailType,
  //   from: result.from,
  //   to: result.to,
  //   data: result.data,
  //   subject: result.subject,
  //   template: parsedEmailTemplate,
  // };

  // let res;
  // try {
  //   res = await sendMailWithSES(emailData);
  //   await saveLog(emailType, to, emailData);
  // } catch (error) {
  //   console.log(error);
  //   throw new createError.InternalServerError(error);
  // }
}
export const handler = commonMiddleware(retrySendMail);
