const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
};

export class HttpResponse {
    Ok(res, data, message) {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: message || 'Success',
            data: data
        });
    };

    NotFound(res, data, message) {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: message || 'Not Found',
            error: data
        });
    };

    Unauthorized(res, data, message) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: message || 'Unauthorized',
            error: data
        });
    };

    Forbidden(res, data, message) {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: message || 'Forbidden',
            error: data
        });
    };

    ServerError(res, data, message) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: message || 'Internal Server Error',
            error: data
        });
    };
};