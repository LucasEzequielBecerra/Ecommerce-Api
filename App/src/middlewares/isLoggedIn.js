import { HttpResponse } from "../utils/http.response.util.js"
const httpResponse = new HttpResponse()

export const isLoggedIn = (req, res, next) => {
    if (req.session.passport?.user) next();
    else httpResponse.Forbidden(res, 'your session is expired')
};