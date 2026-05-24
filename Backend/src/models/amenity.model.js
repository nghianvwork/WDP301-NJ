import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        iconKey: {
            type: String,
            trim: true,
            default: "",
        },

        iconUrl: {
            type: String,
            trim: true,
            default: "",
        },

        type: {
            type: String,
            enum: ["ROOM", "HOTEL", "SPECIAL"],
            default: "ROOM",
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        displayOrder: {
            type: Number,
            default: 0,
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

amenitySchema.index({ type: 1, isActive: 1 });

const Amenity = mongoose.model("Amenity", amenitySchema);

export default Amenity;