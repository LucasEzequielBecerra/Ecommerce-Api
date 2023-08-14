import { purchaseProductsService } from '../services/cart.service.js'
import * as services from '../services/ticket.service.js'
import { HttpResponse } from '../utils/http.response.util.js'
import { logger } from '../utils/logger.util.js'
const httpResponse = new HttpResponse()

export const getAllTicketsController = async (req, res, next) => {
    try {
        const tickets = await services.getAllTicketsService()
        // if (!tickets) return httpResponse.NotFound(res, "tickets not authorized")
        res.json(tickets)
    } catch (error) {
        logger.error('controller error: ')
        next(error)
    }
}

export const createTicketsController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const uid = req.session.passport.user
        const newTicket = await services.createTicketService(uid)
        if (!newTicket) return httpResponse.NotFound(res, "ticket not exists")
        await purchaseProductsService(cid)
        res.json(newTicket)
    } catch (error) {
        logger.error('controller error: ')
        next(error)
    }
}