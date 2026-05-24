import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        imageUrl: {
            type: String,
            required: true,
            trim: true,
        },

        targetUrl: {
            type: String,
            trim: true,
            default: "",
        },

        type: {
            type: String,
            required: true,
            enum: [
                "HOME_HERO",
                "HERO_SLIDER",
                "SMALL_BANNER",
                "SIDE_BANNER",
                "PROMOTION_BANNER",
            ],
        },

        position: {
            type: String,
            enum: [
                "HOME_TOP",
                "HOME_MIDDLE",
                "LEFT_SIDE",
                "RIGHT_SIDE",
                "TUTOR_PAGE",
                "BLOG_PAGE",
                "CLASS_PAGE",
                "GLOBAL",
            ],
            default: "GLOBAL",
        },

        displayOrder: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        startAt: {
            type: Date,
            default: null,
        },

        endAt: {
            type: Date,
            default: null,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

bannerSchema.index({ type: 1, isActive: 1 });
bannerSchema.index({ type: 1, displayOrder: 1 });
bannerSchema.index({ position: 1 });
bannerSchema.index({ startAt: 1, endAt: 1 });

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;