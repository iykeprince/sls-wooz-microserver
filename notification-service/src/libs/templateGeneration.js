import createError from "http-errors";
import { extractExpectedParams } from "../libs/extractExpectedParams";
import { parseDataToTemplate } from "../libs/parseDataToTemplate";
import { readTemplateFromS3 } from "../libs/readTemplateFromS3";
import { saveLog } from "../libs/saveLog";
import { sendMailWithSES } from "../libs/sendMailWithSES";
import { validateMailParams } from "../libs/validateMailParams";
import Templates from "./../libs/templateDictionary";

export async function templateGeneration(email) {
  const { emailType, data, from, to, subject } = email;
  const foundTemplate = Templates[emailType];

  if (!foundTemplate) {
    throw new createError.NotFound("Email type not recognized");
  }

  let htmlTemplate = await readTemplateFromS3(foundTemplate.bucketKey);
  htmlTemplate = htmlTemplate.Body.toString();

  const expectedParams = await extractExpectedParams(["{{", "}}"])(
    htmlTemplate
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
  )(htmlTemplate);

  return {
    emailType,
    data,
    from,
    to,
    subject,
    template: parsedEmailTemplate,
  };
}
