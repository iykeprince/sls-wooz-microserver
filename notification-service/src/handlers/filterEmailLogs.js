import createError from "http-errors";
import moment from "moment";
import EmailLogsSchema from "../../models/emailLogs.schema";
import commonMiddleware from "../libs/commonMiddleware";
import { connectMongodb } from "../libs/connectMongodb";

async function filterEmailLogs(event, context) {
  const { start, end, when } = event.queryStringParameters;
  const YESTERDAY = "YESTERDAY";
  const LAST_WEEK = "LAST_WEEK";
  const LAST_MONTH = "LAST_MONTH";

  try {
    await connectMongodb();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  const now = moment().toDate();
  let result;
  if (when) {
    switch (when) {
      case YESTERDAY:
        let yesterdayDT = moment().subtract(1, "days").toDate();
        result = await EmailLogsSchema.find({
          created_at: {
            $gte: new Date(
              yesterdayDT.getFullYear(),
              yesterdayDT.getMonth(),
              yesterdayDT.getDate()
            ),
            $lt: new Date(),
          },
        }).exec();
        // return { date: moment().subtract(1, 'days').format('YYYY-MM-DD') };
        return { result };
      case LAST_WEEK:
        const lastWeekDT = moment().subtract(1, "weeks").toDate();

        result = await EmailLogsSchema.find({
          created_at: {
            $gte: new Date(
              lastWeekDT.getFullYear(),
              lastWeekDT.getMonth(),
              lastWeekDT.getDate()
            ),
            $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          },
        }).exec();
        // return { date: moment().subtract(1, 'weeks').format('YYYY-MM-DD') };
        return {
          result,
        };
      case LAST_MONTH:
        const lastMonthDT = moment().subtract(1, "months").toDate();

        result = await EmailLogsSchema.find({
          created_at: {
            $gte: new Date(
              lastMonthDT.getFullYear(),
              lastMonthDT.getMonth(),
              lastMonthDT.getDate()
            ),
            $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          },
        }).exec();
        // return { date: moment().subtract(1, 'weeks').format('YYYY-MM-DD') };
        return {
          result,
        };
    }
  } else if (start && end) {
    const startDate = moment(start, "YYYY-MM-DD").toDate();
    const endDate = moment(end, "YYYY-MM-DD").toDate();

    result = await EmailLogsSchema.find({
      created_at: {
        $gte: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        ),
        $lt: new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        ),
      },
    }).exec();
    return {
      result,
    };
  }
  return new createError.BadRequest("No filter operation to perform");
}

export const handler = commonMiddleware(filterEmailLogs);
