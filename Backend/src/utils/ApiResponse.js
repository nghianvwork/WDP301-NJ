class ApiResponse {
    constructor(statusCode, data = null, message = "Success", meta = null) {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

        if (meta) {
            this.meta = meta;
        }
    }

    static success(res, data = null, message = "Success", statusCode = 200, meta = null) {
        return res.status(statusCode).json(
            new ApiResponse(statusCode, data, message, meta)
        );
    }

    static created(res, data = null, message = "Created successfully") {
        return ApiResponse.success(res, data, message, 201);
    }

    static noContent(res) {
        return res.status(204).send();
    }
}

export default ApiResponse;
