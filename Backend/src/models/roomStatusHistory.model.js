import mongoose from "mongoose";

const roomStatusHistorySchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },

        oldStatus: {
            type: String,
            required: true,
        },

        newStatus: {
            type: String,
            required: true,
        },

        reason: {
            type: String,
            trim: true,
            default: "",
        },

        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

roomStatusHistorySchema.index({ roomId: 1 });
roomStatusHistorySchema.index({ changedBy: 1 });
roomStatusHistorySchema.index({ createdAt: -1 });

const RoomStatusHistory = mongoose.model(
    "RoomStatusHistory",
    roomStatusHistorySchema
);

export default RoomStatusHistory;