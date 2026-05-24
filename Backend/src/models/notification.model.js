import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "BOOKING",
                "PAYMENT",
                "HOUSEKEEPING",
                "ISSUE",
                "SYSTEM",
                "PROMOTION",
            ],
            default: "SYSTEM",
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },

        isRead: {
            type: Boolean,
            default: false,
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
    },
    {
        timestamps: true,
    }
);

notificationSchema.index({ receiverId: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;