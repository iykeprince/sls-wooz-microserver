import createError from "http-errors";
import { extractExpectedParams } from "../libs/extractExpectedParams";
import { parseDataToTemplate } from "../libs/parseDataToTemplate";
import { readTemplateFromS3 } from "../libs/readTemplateFromS3";
import { saveLog } from "../libs/saveLog";
import { sendMailWithSES } from "../libs/sendMailWithSES";
import { templateGeneration } from "../libs/templateGeneration";
import { validateMailParams } from "../libs/validateMailParams";
import Templates from "./../libs/templateDictionary";

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log("events", JSON.stringify(event));
  const email = JSON.parse(record.body);
  // console.log("Record body of queue", record.body);

  const emailData = await templateGeneration(email);
  // const { emailType, data, from, to, subject } = email;
  // const foundTemplate = Templates[emailType];

  // if (!foundTemplate) {
  //   throw new createError.NotFound("Email type not recognized");
  // }

  // let htmlTemplate = await readTemplateFromS3(foundTemplate.bucketKey);
  // htmlTemplate = htmlTemplate.Body.toString();

  // const expectedParams = await extractExpectedParams(["{{", "}}"])(
  //   htmlTemplate
  // );

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

  try {
    await sendMailWithSES(emailData);
    // result = await sendMailWithSES(emailData);
    await saveLog(emailData.emailType, emailData.to, emailData);
    //update the mail log based on mailID

    // const result = await Promise.all(recordsAsync);
    // console.log(JSON.stringify(result));

    return "Queue job is done";
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = sendMail;
