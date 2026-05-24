import mongoose from "mongoose";

const iconItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 300,
            default: "",
        },

        icon: {
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
    { _id: true }
);

const policySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },

        icon: {
            type: String,
            trim: true,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { _id: false }
);

const faqSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
        },

        answer: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
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

const hotelInfoContentSchema = new mongoose.Schema(
    {
        specialAmenities: {
            sectionTitle: {
                type: String,
                trim: true,
                default: "Tiện ích đặc quyền",
            },

            items: {
                type: [iconItemSchema],
                default: [],
            },

            isActive: {
                type: Boolean,
                default: true,
            },
        },

        roomAmenities: {
            sectionTitle: {
                type: String,
                trim: true,
                default: "Tiện ích phòng",
            },

            items: {
                type: [iconItemSchema],
                default: [],
            },

            isActive: {
                type: Boolean,
                default: true,
            },
        },

        cancellationPolicy: {
            type: policySchema,
            default: {
                title: "Chính sách huỷ phòng",
                content: "",
                icon: "",
                isActive: true,
            },
        },

        faqs: {
            sectionTitle: {
                type: String,
                trim: true,
                default: "Câu hỏi thường gặp",
            },

            items: {
                type: [faqSchema],
                default: [],
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

hotelInfoContentSchema.index({ isActive: 1 });

const HotelInfoContent = mongoose.model(
    "HotelInfoContent",
    hotelInfoContentSchema
);

export default HotelInfoContent;