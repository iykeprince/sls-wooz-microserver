import EmailLogsSchema from "../../models/emailLogs.schema";
import { v4 as uuid } from "uuid";

export async function saveLog(emailType, to, emailData) {
  const mailId = uuid();
  const logData = {
    mailId,
    mailType: emailType,
    emailAddress: to,
    payload: JSON.stringify(emailData),
    status: "DELIVERED",
  };
  const logSchema = new EmailLogsSchema(logData);
  return await logSchema.save();
}
