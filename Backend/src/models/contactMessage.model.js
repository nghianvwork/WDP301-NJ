import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 150,
        },

        phone: {
            type: String,
            trim: true,
            maxlength: 30,
            default: "",
        },

        subject: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },

        status: {
            type: String,
            enum: ["NEW", "PROCESSING", "RESPONDED", "CLOSED"],
            default: "NEW",
        },

        handledBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        responseNote: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ handledBy: 1 });
contactMessageSchema.index({ createdAt: -1 });

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;