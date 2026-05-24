import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
            unique: true,
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },

        roomTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RoomType",
            default: null,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },

        status: {
            type: String,
            enum: ["VISIBLE", "HIDDEN", "PENDING"],
            default: "VISIBLE",
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.index({ bookingId: 1 });
reviewSchema.index({ customerId: 1 });
reviewSchema.index({ branchId: 1 });
reviewSchema.index({ roomTypeId: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ status: 1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;