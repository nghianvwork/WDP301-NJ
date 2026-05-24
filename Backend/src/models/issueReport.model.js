import mongoose from "mongoose";

const issueReportSchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HousekeepingTask",
            default: null,
        },

        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        issueType: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },

        images: {
            type: [String],
            default: [],
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
            default: "MEDIUM",
        },

        status: {
            type: String,
            enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CANCELLED"],
            default: "OPEN",
        },
    },
    {
        timestamps: true,
    }
);

issueReportSchema.index({ taskId: 1 });
issueReportSchema.index({ roomId: 1 });
issueReportSchema.index({ reportedBy: 1 });
issueReportSchema.index({ status: 1 });
issueReportSchema.index({ priority: 1 });

const IssueReport = mongoose.model("IssueReport", issueReportSchema);

export default IssueReport;