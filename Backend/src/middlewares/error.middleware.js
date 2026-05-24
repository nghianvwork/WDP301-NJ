import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const isProduction = process.env.NODE_ENV === "production";

const normalizeValidationErrors = (error) => {
    if (error?.name === "ValidationError" && error.errors) {
        return Object.values(error.errors).map((item) => ({
            field: item.path,
            message: item.message,
        }));
    }

    if (Array.isArray(error?.inner)) {
        return error.inner.map((item) => ({
            field: item.path,
            message: item.message,
        }));
    }

    return [];
};

const normalizeError = (error) => {
    if (error instanceof ApiError) {
        return error;
    }

    if (error instanceof mongoose.Error.ValidationError) {
        return ApiError.validation("Validation failed", normalizeValidationErrors(error));
    }

    if (error instanceof mongoose.Error.CastError) {
        return ApiError.badRequest(`Invalid ${error.path}: ${error.value}`);
    }

    if (error?.code === 11000) {
        const fields = Object.keys(error.keyValue || {});
        return ApiError.conflict(
            fields.length
                ? `${fields.join(", ")} already exists`
                : "Duplicate value already exists"
        );
    }

    if (error?.name === "JsonWebTokenError") {
        return ApiError.unauthorized("Invalid token");
    }

    if (error?.name === "TokenExpiredError") {
        return ApiError.unauthorized("Token expired");
    }

    if (error?.name === "ValidationError") {
        return ApiError.validation("Validation failed", normalizeValidationErrors(error));
    }

    return new ApiError(
        error.statusCode || 500,
        error.message || "Internal server error",
        error.errors || [],
        error.stack
    );
};

export const notFoundHandler = (req, res, next) => {
    next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};

export const errorHandler = (error, req, res, next) => {
    const normalizedError = normalizeError(error);
    const statusCode = normalizedError.statusCode || 500;

    const response = {
        success: false,
        statusCode,
        message: normalizedError.message,
        errors: normalizedError.errors || [],
    };

    if (!isProduction) {
        response.stack = normalizedError.stack;
    }

    return res.status(statusCode).json(response);
};
