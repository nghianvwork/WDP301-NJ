import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },

        roomTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RoomType",
            required: true,
        },

        roomNumber: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        floor: {
            type: Number,
            default: 1,
        },

        status: {
            type: String,
            enum: [
                "AVAILABLE",
                "RESERVED",
                "OCCUPIED",
                "DIRTY",
                "CLEANING",
                "INSPECTION",
                "MAINTENANCE",
                "OUT_OF_SERVICE",
            ],
            default: "AVAILABLE",
        },

        note: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

roomSchema.index({ branchId: 1 });
roomSchema.index({ roomTypeId: 1 });
roomSchema.index({ branchId: 1, roomNumber: 1 }, { unique: true });
roomSchema.index({ status: 1 });
roomSchema.index({ floor: 1 });

const Room = mongoose.model("Room", roomSchema);

export default Room;