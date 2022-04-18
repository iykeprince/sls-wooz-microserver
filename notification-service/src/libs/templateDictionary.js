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
  CONFIRM_USER_REGISTRATION: {
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
  NEW_BANK_ACCOUNT: {
    expectedParams: ["name", "bankname"],
    bucketKey: "new_bank_account.html",
  },
  LAWYER_WELCOME_EMAIL: {
    expectedParams: ["fName"],
    bucketKey: "lawyer_welcome_email.html",
  },
  SEND_NEW_BANK_ACCOUNT_DETAIL_EMAIL: {
    expectedParams: ["fullName", "fName", "accountNumber"],
    bucketKey: "send_new_bank_account_detail.html",
  },
  ACCOUNT_CREATION: {
    expectedParams: ["name", "Bank Name"],
    bucketKey: "account_creation.html",
  },
  CS_WELCOME_EMAIL: {
    expectedParams: ["fName", "url"],
    bucketKey: "cswelcome-email.html"
  },
  CS_PRODUCT_APPROVAL_EMAIL: {
    expectedParams: ["fName", "productName", "msg"],
    bucketKey: "csproduct-approval.html"
  },
  CS_PASSWORD_RESET_EMAIL: {
    expectedParams: ["fName", "url"],
    bucketKey: 'cspassword-reset.html'
  },
  CS_NEW_ADMIN_EMAIL: {
    expectedParams: ["fName", "password"],
    bucketKey: 'csnew-admin.html'
  },
  CS_VERIFICATION_EMAIL: {
    expectedParams: ["fName", "url"],
    bucketKey: 'csemail-verification.html'
  },
  CS_BULK_PURCHASE: {
    expectedParams: ["name", "businessName", "email", "phone", "product", "description"],
    bucketKey: 'csbulk-purchase.html'
  },
  CS_BECOME_MERCHANT_FORM: {
    expectedParams: ["fName"],
    bucketKey: 'csbecome-merchant-form.html'
  },
  CS_BECOME_MERCHANT_APPROVAL: {
    expectedParams: ["fName"],
    bucketKey: 'csbecome-merchant-approval.html'
  }
};
