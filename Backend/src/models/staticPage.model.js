import mongoose from "mongoose";

const pageSectionSchema = new mongoose.Schema(
    {
        sectionKey: {
            type: String,
            trim: true,
            default: "",
        },

        title: {
            type: String,
            trim: true,
            maxlength: 200,
            default: "",
        },

        subtitle: {
            type: String,
            trim: true,
            maxlength: 300,
            default: "",
        },

        content: {
            type: String,
            trim: true,
            default: "",
        },

        imageUrl: {
            type: String,
            trim: true,
            default: "",
        },

        buttonText: {
            type: String,
            trim: true,
            maxlength: 100,
            default: "",
        },

        buttonUrl: {
            type: String,
            trim: true,
            maxlength: 500,
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
    { _id: true }
);

const staticPageSchema = new mongoose.Schema(
    {
        pageName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: 150,
        },

        pageType: {
            type: String,
            required: true,
            enum: [
                "ABOUT",
                "CONTACT",
                "BOOKING_POLICY",
                "PRIVACY_POLICY",
                "TERMS_OF_SERVICE",
                "FAQ",
                "GUIDE",
                "CUSTOM",
            ],
            default: "CUSTOM",
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        subtitle: {
            type: String,
            trim: true,
            maxlength: 300,
            default: "",
        },

        thumbnailUrl: {
            type: String,
            trim: true,
            default: "",
        },

        content: {
            type: String,
            trim: true,
            default: "",
        },

        sections: {
            type: [pageSectionSchema],
            default: [],
        },

        seoTitle: {
            type: String,
            trim: true,
            maxlength: 200,
            default: "",
        },

        seoDescription: {
            type: String,
            trim: true,
            maxlength: 300,
            default: "",
        },

        seoKeywords: {
            type: [String],
            default: [],
        },

        isPublished: {
            type: Boolean,
            default: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        publishedAt: {
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

staticPageSchema.index({ slug: 1 });
staticPageSchema.index({ pageType: 1 });
staticPageSchema.index({ isPublished: 1, isActive: 1 });

const StaticPage = mongoose.model("StaticPage", staticPageSchema);

export default StaticPage;