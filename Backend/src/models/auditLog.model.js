import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        action: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        targetType: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        oldValue: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        newValue: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        ipAddress: {
            type: String,
            trim: true,
            default: "",
        },

        userAgent: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

auditLogSchema.index({ userId: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ targetType: 1, targetId: 1 });
auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;