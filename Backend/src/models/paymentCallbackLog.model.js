import mongoose from "mongoose";

const paymentCallbackLogSchema = new mongoose.Schema(
    {
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            default: null,
        },

        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            default: null,
        },

        provider: {
            type: String,
            enum: ["VNPAY", "MOMO", "MOCK", "OTHER"],
            required: true,
        },

        rawData: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        isValidSignature: {
            type: Boolean,
            default: false,
        },

        processed: {
            type: Boolean,
            default: false,
        },

        errorMessage: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

paymentCallbackLogSchema.index({ paymentId: 1 });
paymentCallbackLogSchema.index({ bookingId: 1 });
paymentCallbackLogSchema.index({ provider: 1 });
paymentCallbackLogSchema.index({ createdAt: -1 });

const PaymentCallbackLog = mongoose.model(
    "PaymentCallbackLog",
    paymentCallbackLogSchema
);

export default PaymentCallbackLog;