import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "us-east-1" });

export async function sendMailWithSES(body) {
  const { from, to, subject, template } = body;

  const params = {
    Source: from,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: template,
        },
      },
      Subject: {
        Data: subject,
      },
    },
  };
  console.log("mail params", params);
  const result = await ses.sendEmail(params).promise();

  return result;
}
