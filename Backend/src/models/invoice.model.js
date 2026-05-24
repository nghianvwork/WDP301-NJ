import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
    {
        itemType: {
            type: String,
            enum: ["ROOM", "SERVICE", "SURCHARGE", "DISCOUNT", "TAX", "OTHER"],
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },

        unitPrice: {
            type: Number,
            default: 0,
            min: 0,
        },

        amount: {
            type: Number,
            required: true,
        },

        note: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { _id: true }
);

const invoiceSchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
            unique: true,
        },

        invoiceCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
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

        roomAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        serviceAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        surchargeAmount: {
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
            required: true,
            min: 0,
        },

        paidAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        remainingAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        paymentStatus: {
            type: String,
            enum: ["UNPAID", "PARTIALLY_PAID", "PAID", "REFUNDED"],
            default: "UNPAID",
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

        surchargeNote: {
            type: String,
            trim: true,
            default: "",
        },

        items: {
            type: [invoiceItemSchema],
            default: [],
        },

        issuedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        issuedAt: {
            type: Date,
            default: Date.now,
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

invoiceSchema.pre("validate", function (next) {
    this.remainingAmount = Math.max(
        0,
        (this.totalAmount || 0) - (this.paidAmount || 0)
    );

    if (this.remainingAmount === 0 && this.totalAmount > 0) {
        this.paymentStatus = "PAID";
    } else if (this.paidAmount > 0 && this.remainingAmount > 0) {
        this.paymentStatus = "PARTIALLY_PAID";
    } else if (this.paidAmount === 0) {
        this.paymentStatus = "UNPAID";
    }

    next();
});

invoiceSchema.index({ bookingId: 1 });
invoiceSchema.index({ invoiceCode: 1 });
invoiceSchema.index({ branchId: 1 });
invoiceSchema.index({ customerId: 1 });
invoiceSchema.index({ paymentStatus: 1 });
invoiceSchema.index({ issuedAt: -1 });
invoiceSchema.index({ issuedBy: 1 });

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;