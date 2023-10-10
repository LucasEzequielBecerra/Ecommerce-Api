import { HttpResponse } from "../utils/http.response.util.js"
const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    return httpResponse.ServerError(res, error.message)
}