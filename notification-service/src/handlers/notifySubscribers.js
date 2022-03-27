import createError from "http-errors";
import commonMiddleware from "../libs/commonMiddleware";
import { firebaseMessaging } from "../libs/firebaseInit";

async function notifySubscribers(event, context) {
  const body = event.body;
  let response;
  try {
    response = await firebaseMessaging.send(body);
  } catch (error) {
    console.error(error);
    throw new createError.BadRequest(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: "notification sent", response }),
  };
}

export const handler = commonMiddleware(notifySubscribers);
