import EmailLogsSchema from "../../models/emailLogs.schema";
import commonMiddleware from "../libs/commonMiddleware";
import { connectMongodb } from "../libs/connectMongodb";

async function getEmailLogs(event, context) {
  const { skip, limit } = event.queryStringParameters;
  let result;
  let count = 0;
  let perPage = 5;
  let pages = 1;

  try {
    await connectMongodb();

    const query = EmailLogsSchema.find().sort({ _id: 1 });
    if (skip) {
      query.skip(skip);
    }
    if (limit) {
      perPage = limit;
    }

    query.limit(perPage);
    result = await query.exec();
    count = await EmailLogsSchema.count().exec();
    pages = Math.ceil(count / Number(perPage));
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  const data = result.map((res) => ({
    id: res.id,
    emailAddress: res.emailAddress,
    payload: res.payload,
    status: res.status,
    created_at: res.created_at,
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      pages,
      perPage,
      total: count,
      data,
    }),
  };
}

export const handler = commonMiddleware(getEmailLogs);
