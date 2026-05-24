import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },

        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice",
            default: null,
        },

        transactionCode: {
            type: String,
            trim: true,
            default: "",
        },

        providerTransactionId: {
            type: String,
            trim: true,
            default: "",
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        method: {
            type: String,
            enum: ["CASH", "VNPAY", "MOMO", "BANK_TRANSFER", "MOCK"],
            required: true,
        },

        status: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED", "CANCELLED", "REFUNDED"],
            default: "PENDING",
        },

        paymentType: {
            type: String,
            enum: ["DEPOSIT", "FULL_PAYMENT", "REMAINING_PAYMENT", "REFUND"],
            required: true,
        },

        paymentUrl: {
            type: String,
            trim: true,
            default: "",
        },

        expiredAt: {
            type: Date,
            default: null,
        },

        paidAt: {
            type: Date,
            default: null,
        },

        callbackData: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        note: {
            type: String,
            trim: true,
            default: "",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

paymentSchema.pre("validate", function (next) {
    if (this.status === "PAID" && !this.paidAt) {
        this.paidAt = new Date();
    }

    next();
});

paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ invoiceId: 1 });
paymentSchema.index({ transactionCode: 1 });
paymentSchema.index({ providerTransactionId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ method: 1 });
paymentSchema.index({ paymentType: 1 });
paymentSchema.index({ paidAt: -1 });
paymentSchema.index({ expiredAt: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;