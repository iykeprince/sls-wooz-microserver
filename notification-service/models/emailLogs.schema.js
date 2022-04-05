import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema({
  mailId: { type: String, required: true },
  mailType: { type: String, required: true },
  emailAddress: { type: String, required: true },
  payload: { type: String, required: true },
  errorMessage: { type: String, default: null },
  status: { type: String, default: "pending" },
  created_at: { type: Date, default: Date.now() },
});

export default mongoose.model("email_logs", EmailLogSchema);
