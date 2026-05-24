import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
    {
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        slug: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            maxlength: 150,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        capacity: {
            type: Number,
            required: true,
            min: 1,
        },

        area: {
            type: Number,
            default: 0,
        },

        bedType: {
            type: String,
            trim: true,
            default: "",
        },

        basePrice: {
            type: Number,
            required: true,
            min: 0,
        },

        amenities: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Amenity",
            },
        ],

        images: {
            type: [String],
            default: [],
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

roomTypeSchema.index({ branchId: 1 });
roomTypeSchema.index({ branchId: 1, slug: 1 }, { unique: true });
roomTypeSchema.index({ capacity: 1 });
roomTypeSchema.index({ basePrice: 1 });
roomTypeSchema.index({ status: 1 });

const RoomType = mongoose.model("RoomType", roomTypeSchema);

export default RoomType;