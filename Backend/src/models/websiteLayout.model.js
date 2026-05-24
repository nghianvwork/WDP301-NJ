import mongoose from "mongoose";

const navigationLinkSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        url: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
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
    { _id: false }
);

const footerColumnSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        links: {
            type: [navigationLinkSchema],
            default: [],
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
    { _id: false }
);

const socialLinkSchema = new mongoose.Schema(
    {
        platform: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "FACEBOOK",
                "YOUTUBE",
                "INSTAGRAM",
                "TIKTOK",
                "LINKEDIN",
                "ZALO",
                "OTHER",
            ],
        },

        url: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        iconUrl: {
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
    { _id: false }
);

const contactInfoSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            default: "",
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { _id: false }
);

const websiteLayoutSchema = new mongoose.Schema(
    {
        logoTitle: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        logoSubtitle: {
            type: String,
            trim: true,
            maxlength: 200,
            default: "",
        },

        logoUrl: {
            type: String,
            trim: true,
            default: "",
        },

        header: {
            navigationLinks: {
                type: [navigationLinkSchema],
                default: [],
            },

            showLoginButton: {
                type: Boolean,
                default: true,
            },

            showRegisterButton: {
                type: Boolean,
                default: true,
            },

            isSticky: {
                type: Boolean,
                default: true,
            },

            isActive: {
                type: Boolean,
                default: true,
            },
        },

        footer: {
            description: {
                type: String,
                trim: true,
                maxlength: 500,
                default: "",
            },

            columns: {
                type: [footerColumnSchema],
                default: [],
            },

            contactInfo: {
                type: contactInfoSchema,
                default: {},
            },

            socialLinks: {
                type: [socialLinkSchema],
                default: [],
            },

            policyLinks: {
                type: [navigationLinkSchema],
                default: [],
            },

            copyrightText: {
                type: String,
                trim: true,
                maxlength: 300,
                default: "",
            },

            isActive: {
                type: Boolean,
                default: true,
            },
        },

        isActive: {
            type: Boolean,
            default: true,
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

websiteLayoutSchema.index({ isActive: 1 });

const WebsiteLayout = mongoose.model("WebsiteLayout", websiteLayoutSchema);

export default WebsiteLayout;