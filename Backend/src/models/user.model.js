import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 150,
        },

        phone: {
            type: String,
            trim: true,
            maxlength: 20,
            default: "",
        },

        password: {
            type: String,
            required: true,
        },

        avatarUrl: {
            type: String,
            trim: true,
            default: "",
        },

        role: {
            type: String,
            required: true,
            enum: [
                "CUSTOMER",
                "RECEPTIONIST",
                "HOUSEKEEPER",
                "BRANCH_MANAGER",
                "SYSTEM_ADMIN",
            ],
            default: "CUSTOMER",
        },

        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null,
        },

        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "OTHER", ""],
            default: "",
        },

        dateOfBirth: {
            type: Date,
            default: null,
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },

        identityNumber: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "LOCKED"],
            default: "ACTIVE",
        },

        lastLoginAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ branchId: 1 });
userSchema.index({ status: 1 });

const User = mongoose.model("User", userSchema);

export default User;