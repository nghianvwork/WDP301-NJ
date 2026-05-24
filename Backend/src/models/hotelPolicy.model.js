import mongoose from "mongoose";

const cancellationRuleSchema = new mongoose.Schema(
    {
        beforeHours: {
            type: Number,
            required: true,
            min: 0,
        },

        refundPercent: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { _id: true }
);

const hotelPolicySchema = new mongoose.Schema(
    {
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null,
        },

        checkInTime: {
            type: String,
            default: "14:00",
        },

        checkOutTime: {
            type: String,
            default: "12:00",
        },

        depositPercent: {
            type: Number,
            default: 30,
            min: 0,
            max: 100,
        },

        holdMinutes: {
            type: Number,
            default: 30,
            min: 1,
        },

        cancellationRules: {
            type: [cancellationRuleSchema],
            default: [],
        },

        earlyCheckinFee: {
            type: Number,
            default: 0,
            min: 0,
        },

        lateCheckoutFee: {
            type: Number,
            default: 0,
            min: 0,
        },

        taxPercent: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        serviceFeePercent: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        isDefault: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

hotelPolicySchema.index({ branchId: 1 });
hotelPolicySchema.index({ isDefault: 1 });
hotelPolicySchema.index({ isActive: 1 });

const HotelPolicy = mongoose.model("HotelPolicy", hotelPolicySchema);

export default HotelPolicy;