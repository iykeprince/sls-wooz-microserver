import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "us-east-1" });

export async function sendMailWithSES(body) {
  const { emailType, data, from, to, subject } = body;
  //   {
  //     "emailType": "ACCOUNT_CREATION",
  //     "data": {
  //         "name": "John Smith",
  //         "Bank Name": "Access"
  //     },
  //     "from": "info@woozeee.com",
  //     "to": "iykeprince48@gmail.com",
  //     "subject": "Test Subject 1"
  // }
  const template = `<html><body><h2>Hello test email from serverless microservice.</h2></body></html>`;

  const params = {
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
    Source: from,
  };

  const result = await ses.sendEmail(params).promise();

  return result;
}
