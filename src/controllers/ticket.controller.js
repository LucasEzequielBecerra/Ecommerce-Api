import { purchaseProductsService } from '../services/cart.service.js'
import * as services from '../services/ticket.service.js'
import { HttpResponse } from '../utils/http.response.util.js'
import { logger } from '../utils/logger.util.js'
const httpResponse = new HttpResponse()

export const createTicketsController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const uid = req.session.passport?.user
        const newTicket = await services.createTicketService(uid)
        if (newTicket) {
            await purchaseProductsService(cid)
            return httpResponse.Ok(res, newTicket, "Your purchase has been completed")
        }
        else return httpResponse.NotFound(res, 'The purchase has not been completed')
    } catch (error) {
        next(error.message)
    }
}
export const getAllTicketsController = async (req, res, next) => {
    try {
        const tickets = await services.getAllTicketsService()
        if (tickets) return httpResponse.Ok(res, tickets, "Tickets founded")
        else return httpResponse.NotFound(res, 'Tickets not found')
    } catch (error) {
        next(error.message)
    }
}
