import mongoose from "mongoose";

const bookingRoomSchema = new mongoose.Schema(
    {
        roomTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RoomType",
            required: true,
        },

        /**
         * Khi khách đặt online: assignedRoomIds = []
         * Khi lễ tân check-in: gán phòng vật lý cụ thể vào đây
         * Ví dụ khách đặt 2 phòng Deluxe:
         * assignedRoomIds: [room301Id, room302Id]
         */
        assignedRoomIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Room",
            },
        ],

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },

        pricePerNight: {
            type: Number,
            required: true,
            min: 0,
        },

        nights: {
            type: Number,
            required: true,
            min: 1,
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: true }
);

const bookingGuestSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        identityNumber: {
            type: String,
            trim: true,
            default: "",
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        dateOfBirth: {
            type: Date,
            default: null,
        },

        nationality: {
            type: String,
            trim: true,
            default: "Việt Nam",
        },

        isPrimaryGuest: {
            type: Boolean,
            default: false,
        },
    },
    { _id: true }
);

const bookingSchema = new mongoose.Schema(
    {
        bookingCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
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

        checkInDate: {
            type: Date,
            required: true,
        },

        checkOutDate: {
            type: Date,
            required: true,
        },

        adults: {
            type: Number,
            default: 1,
            min: 1,
        },

        children: {
            type: Number,
            default: 0,
            min: 0,
        },

        guestsCount: {
            type: Number,
            required: true,
            min: 1,
        },

        rooms: {
            type: [bookingRoomSchema],
            default: [],
        },

        guests: {
            type: [bookingGuestSchema],
            default: [],
        },

        source: {
            type: String,
            enum: ["ONLINE", "WALK_IN", "PHONE", "STAFF_CREATED"],
            default: "ONLINE",
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "CONFIRMED",
                "CHECKED_IN",
                "CHECKED_OUT",
                "CANCELLED",
                "NO_SHOW",
            ],
            default: "PENDING",
        },

        paymentStatus: {
            type: String,
            enum: [
                "UNPAID",
                "PARTIALLY_PAID",
                "PAID",
                "FAILED",
                "REFUNDED",
            ],
            default: "UNPAID",
        },

        paymentMethod: {
            type: String,
            enum: ["ONLINE", "PAY_AT_HOTEL", "CASH", "BANK_TRANSFER"],
            default: "ONLINE",
        },

        totalRoomAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        serviceAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        discountAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        taxAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        voucherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Voucher",
            default: null,
        },

        voucherCode: {
            type: String,
            trim: true,
            uppercase: true,
            default: "",
        },

        customerNote: {
            type: String,
            trim: true,
            default: "",
        },

        staffNote: {
            type: String,
            trim: true,
            default: "",
        },

        cancelReason: {
            type: String,
            trim: true,
            default: "",
        },

        cancelledAt: {
            type: Date,
            default: null,
        },

        cancelledBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        noShowAt: {
            type: Date,
            default: null,
        },

        expiresAt: {
            type: Date,
            default: null,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Validate ngày check-in/check-out.
 */
bookingSchema.pre("validate", function (next) {
    if (this.checkInDate && this.checkOutDate) {
        if (this.checkInDate >= this.checkOutDate) {
            return next(new Error("Check-out date must be after check-in date"));
        }
    }

    this.guestsCount = (this.adults || 0) + (this.children || 0);

    next();
});

/**
 * Validate khi booking đã gán phòng vật lý.
 * Nếu đã gán thì số lượng assignedRoomIds không được lớn hơn quantity.
 */
bookingSchema.pre("validate", function (next) {
    if (Array.isArray(this.rooms)) {
        for (const item of this.rooms) {
            if (
                Array.isArray(item.assignedRoomIds) &&
                item.assignedRoomIds.length > item.quantity
            ) {
                return next(
                    new Error("Assigned rooms cannot be greater than booking quantity")
                );
            }
        }
    }

    next();
});

bookingSchema.index({ bookingCode: 1 });
bookingSchema.index({ customerId: 1 });
bookingSchema.index({ branchId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ source: 1 });
bookingSchema.index({ checkInDate: 1, checkOutDate: 1 });
bookingSchema.index({ expiresAt: 1 });
bookingSchema.index({ createdAt: -1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;