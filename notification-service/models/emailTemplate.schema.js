import * as mongoose from "mongoose";

const EmailTemplateSchema = new mongoose.Schema({
  email_type: { type: String, required: true },
  template: { type: String, required: true },
  params: { type: Array, required: true },
});

export default mongoose.model("email_templates", EmailTemplateSchema);
