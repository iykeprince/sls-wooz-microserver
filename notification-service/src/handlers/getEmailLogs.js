import EmailLogsSchema from "../../models/emailLogs.schema";
import commonMiddleware from "../libs/commonMiddleware";
import { connectMongodb } from "../libs/connectMongodb";

async function getEmailLogs(event, context) {
  const { skip, limit } = event.queryStringParameters;
  try {
    await connectMongodb();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }
  let query = EmailLogsSchema.find().sort({ _id: 1 }).skip(skip);
  if (limit) {
    query.limit(limit);
  }
  let count = 0;

  const result = await Promise.all(
    (
      await query
    ).map((res) => ({
      id: res.id,
      emailAddress: res.emailAddress,
      payload: res.payload,
      status: res.status,
      created_at: res.created_at,
    }))
  );
  return { result, count };
}

export const handler = commonMiddleware(getEmailLogs);
