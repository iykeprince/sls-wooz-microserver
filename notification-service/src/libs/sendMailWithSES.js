import AWS from "aws-sdk";
//{ region: "us-east-2" }
const ses = new AWS.SES();

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

  return await ses.sendEmail(params).promise();
}
