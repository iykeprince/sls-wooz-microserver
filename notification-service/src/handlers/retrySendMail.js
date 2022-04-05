import createError from "http-errors";
import EmailLogsSchema from "../../models/emailLogs.schema";
import { sendMailWithSES } from "../libs/sendMailWithSES";
import commonMiddleware from "../libs/commonMiddleware";
import { connectMongodb } from "../libs/connectMongodb";
import EmailTemplate from "./../../models/emailTemplate.schema";
import { extractExpectedParams } from "../libs/extractExpectedParams";
import { validateMailParams } from "../libs/validateMailParams";
import { parseDataToTemplate } from "../libs/parseDataToTemplate";
import { saveLog } from "../libs/saveLog";

async function retrySendMail(event, context) {
  const { id } = event.pathParameters;
  try {
    await connectMongodb();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  const foundObj = await EmailLogsSchema.findById(id).exec();
  const result = JSON.parse(foundObj.payload);
  console.log("result", result);

  //fetch template
  const { emailType, data, from, to, subject } = body;
  const foundTemplate = await EmailTemplate.findOne({
    email_type: emailType,
  }).exec();

  if (!foundTemplate) {
    throw new createError.NotFound("Email type not recognized");
  }

  const expectedParams = await extractExpectedParams(["{{", "}}"])(
    foundTemplate.template
  );

  const validateParams = validateMailParams(Object.keys(data), expectedParams);

  if (!validateParams) {
    throw new createError.BadRequest(
      `Expected parameters:"${JSON.stringify(expectedParams)}"`
    );
  }

  const parsedEmailTemplate = parseDataToTemplate(
    ["{{", "}}"],
    data
  )(foundTemplate.template);

  const emailData = {
    emailType: result.emailType,
    from: result.from,
    to: result.to,
    data: result.data,
    subject: result.subject,
    template: parsedEmailTemplate,
  };

  let res;
  try {
    res = await sendMailWithSES(emailData);
    await saveLog(emailType, to, emailData);
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
}
export const handler = commonMiddleware(retrySendMail);
