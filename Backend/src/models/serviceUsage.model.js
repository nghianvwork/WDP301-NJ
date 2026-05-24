import mongoose from "mongoose";

const serviceUsageSchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },

        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },

        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
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

serviceUsageSchema.index({ bookingId: 1 });
serviceUsageSchema.index({ serviceId: 1 });
serviceUsageSchema.index({ createdBy: 1 });

const ServiceUsage = mongoose.model("ServiceUsage", serviceUsageSchema);

export default ServiceUsage;