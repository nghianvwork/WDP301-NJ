import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 200,
        },

        address: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        city: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        hotline: {
            type: String,
            trim: true,
            maxlength: 30,
            default: "",
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: 150,
            default: "",
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        images: {
            type: [String],
            default: [],
        },

        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
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

branchSchema.index({ slug: 1 });
branchSchema.index({ city: 1 });
branchSchema.index({ status: 1 });
branchSchema.index({ managerId: 1 });

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;