import EmailLogsSchema from "../../models/emailLogs.schema";
import { v4 as uuid } from "uuid";

export async function saveLog(emailType, to, emailData) {
  const mailId = uuid();
  const logData = {
    mailId,
    emailType,
    emailAddress: to,
    payload: JSON.stringify(emailData),
  };
  const logSchema = new EmailLogsSchema(logData);
  return await logSchema.save();
}
