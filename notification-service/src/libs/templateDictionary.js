export default {
  COMPLAINT_EMAIL: {
    expectedParams: [
      "reason",
      "section",
      "entryId",
      "userId",
      "userDisplayName",
      "userFirstName",
      "userLastName",
    ],
    bucketKey: `complaint_email.html`,
  },
  CONFIRMATION_EMAIL: {
    expectedParams: ["fName", "emailConfirmationToken"],
    bucketKey: `confirmation_email.html`,
  },
  FORGOT_PASSWORD: {
    expectedParams: ["fName", "passwordResetToken"],
    bucketKey: `forgot_password.html`,
  },
  CREATE_BANK_ACCOUNT: {
    expectedParams: ["fName", "accountNumber", "lastName", "firstName"],
    bucketKey: `new_bank_account.html`,
  },
  WELCOME_EMAIL: {
    expectedParams: ["fName"],
    bucketKey: "welcome_email.html",
  },
};
