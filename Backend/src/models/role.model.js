import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
            enum: [
                "CUSTOMER",
                "RECEPTIONIST",
                "HOUSEKEEPER",
                "BRANCH_MANAGER",
                "SYSTEM_ADMIN",
            ],
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        permissions: {
            type: [String],
            default: [],
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

roleSchema.index({ name: 1 });

const Role = mongoose.model("Role", roleSchema);

export default Role;