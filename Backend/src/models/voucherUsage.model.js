import mongoose from "mongoose";

const voucherUsageSchema = new mongoose.Schema(
    {
        voucherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Voucher",
            required: true,
        },

        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        discountAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        usedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

voucherUsageSchema.index({ voucherId: 1 });
voucherUsageSchema.index({ bookingId: 1 });
voucherUsageSchema.index({ userId: 1 });
voucherUsageSchema.index({ usedAt: -1 });

const VoucherUsage = mongoose.model("VoucherUsage", voucherUsageSchema);

export default VoucherUsage;