import createError from "http-errors";
import EmailLogsSchema from "../../models/emailLogs.schema";
import commonMiddleware from "../libs/commonMiddleware";
import { connectMongodb } from "../libs/connectMongodb";

async function searchEmail(event, context) {
  const { q } = event.queryStringParameters;
  if (q == "") {
    return new createError.BadRequest("the 'q' param is required");
  }
  let result;
  let perPage = 10;
  let count;
  let pages;
  try {
    await connectMongodb();

    const searchQuery = q;
    // console.log("search query", searchQuery);
    const query = EmailLogsSchema.find({
      emailAddress: searchQuery,
    }).limit(perPage);

    result = await query.exec();
    count = await EmailLogsSchema.find({
      emailAddress: searchQuery,
    })
      .count()
      .exec();
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

export const handler = commonMiddleware(searchEmail);
