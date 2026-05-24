import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
    {
        to: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        templateKey: {
            type: String,
            trim: true,
            default: "",
        },

        relatedType: {
            type: String,
            trim: true,
            default: "",
        },

        relatedId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        status: {
            type: String,
            enum: ["PENDING", "SENT", "FAILED"],
            default: "PENDING",
        },

        errorMessage: {
            type: String,
            trim: true,
            default: "",
        },

        sentAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

emailLogSchema.index({ to: 1 });
emailLogSchema.index({ status: 1 });
emailLogSchema.index({ relatedType: 1, relatedId: 1 });
emailLogSchema.index({ createdAt: -1 });

const EmailLog = mongoose.model("EmailLog", emailLogSchema);

export default EmailLog;