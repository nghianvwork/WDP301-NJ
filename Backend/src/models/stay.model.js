import mongoose from "mongoose";

const assignedRoomSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },

        roomTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RoomType",
            required: true,
        },

        assignedAt: {
            type: Date,
            default: Date.now,
        },

        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { _id: false }
);

const staySchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
            unique: true,
        },

        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        checkedInAt: {
            type: Date,
            default: null,
        },

        checkedOutAt: {
            type: Date,
            default: null,
        },

        receptionistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        assignedRooms: {
            type: [assignedRoomSchema],
            default: [],
        },

        checkInNote: {
            type: String,
            trim: true,
            default: "",
        },

        checkOutNote: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: ["STAYING", "CHECKED_OUT", "CANCELLED"],
            default: "STAYING",
        },
    },
    {
        timestamps: true,
    }
);

staySchema.index({ bookingId: 1 });
staySchema.index({ branchId: 1 });
staySchema.index({ customerId: 1 });
staySchema.index({ receptionistId: 1 });
staySchema.index({ status: 1 });
staySchema.index({ checkedInAt: -1 });
staySchema.index({ checkedOutAt: -1 });

const Stay = mongoose.model("Stay", staySchema);

export default Stay;