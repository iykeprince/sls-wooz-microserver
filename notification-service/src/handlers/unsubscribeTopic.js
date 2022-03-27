import createError from "http-errors";
import commonMiddleware from "../libs/commonMiddleware";

async function unsubscribeTopic(event, context) {
  const { token, topic } = event.body;
  let response;
  try {
    response = await firebaseMessaging.unsubscribeFromTopic(token, topic);
  } catch (error) {
    console.error(error);
    throw new createError.BadRequest(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Successfully unsubscribed from topic: "${topic}"`,
      response,
    }),
  };
}

export const handler = commonMiddleware(unsubscribeTopic);
