import createError from "http-errors";
import EmailLogsSchema from "../../models/emailLogs.schema";
import commonMiddleware from "../libs/commonMiddleware";
import { connectMongodb } from "../libs/connectMongodb";

async function searchEmail(event, context) {
  const { q } = event.queryStringParameters;
  if (q == "") {
    return new createError.BadRequest("the 'q' param is required");
  }

  try {
    await connectMongodb();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }
  const searchQuery = q;
  // console.log("search query", searchQuery);
  const result = await EmailLogsSchema.find({
    emailAddress: searchQuery,
  }).exec();

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}

export const handler = commonMiddleware(searchEmail);
