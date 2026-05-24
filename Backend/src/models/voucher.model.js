import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
            maxlength: 50,
        },

        name: {
            type: String,
            trim: true,
            maxlength: 150,
            default: "",
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        discountType: {
            type: String,
            enum: ["PERCENT", "FIXED_AMOUNT"],
            required: true,
        },

        discountValue: {
            type: Number,
            required: true,
            min: 0,
        },

        maxDiscountAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        minBookingAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        usageLimit: {
            type: Number,
            default: 0,
            min: 0,
        },

        usedCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null,
        },

        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "EXPIRED"],
            default: "ACTIVE",
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

voucherSchema.index({ code: 1 });
voucherSchema.index({ branchId: 1 });
voucherSchema.index({ status: 1 });
voucherSchema.index({ startDate: 1, endDate: 1 });

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;