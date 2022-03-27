import createError from "http-errors";
import commonMiddleware from "../libs/commonMiddleware";

async function subscribeTopic(event, context) {
  const { token, topic } = event.body;
  let response;
  try {
    response = await firebaseMessaging.subscribeToTopic(token, topic);
  } catch (error) {
    throw new createError.BadRequest(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Successfully subscribed to topic: "${topic}"`,
      response,
    }),
  };
}

export const handler = commonMiddleware(subscribeTopic);
