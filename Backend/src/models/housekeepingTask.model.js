import mongoose from "mongoose";

const housekeepingTaskSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },

        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        status: {
            type: String,
            enum: [
                "ASSIGNED",
                "IN_PROGRESS",
                "DONE",
                "NEED_INSPECTION",
                "CANCELLED",
            ],
            default: "ASSIGNED",
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
            default: "MEDIUM",
        },

        note: {
            type: String,
            trim: true,
            default: "",
        },

        startedAt: {
            type: Date,
            default: null,
        },

        completedAt: {
            type: Date,
            default: null,
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

housekeepingTaskSchema.index({ roomId: 1 });
housekeepingTaskSchema.index({ branchId: 1 });
housekeepingTaskSchema.index({ assignedTo: 1 });
housekeepingTaskSchema.index({ status: 1 });
housekeepingTaskSchema.index({ priority: 1 });

const HousekeepingTask = mongoose.model(
    "HousekeepingTask",
    housekeepingTaskSchema
);

export default HousekeepingTask;