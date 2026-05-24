import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        unit: {
            type: String,
            trim: true,
            default: "lần",
        },

        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    {
        timestamps: true,
    }
);

serviceSchema.index({ branchId: 1 });
serviceSchema.index({ status: 1 });

const Service = mongoose.model("Service", serviceSchema);

export default Service;