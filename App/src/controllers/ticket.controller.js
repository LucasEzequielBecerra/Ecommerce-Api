import { purchaseProductsService } from '../services/cart.service.js'
import * as services from '../services/ticket.service.js'

export const getAllTicketsController = async (req, res, next) => {
    try {
        const tickets = await services.getAllTicketsService()
        res.json(tickets)
    } catch (error) {
        next(error)
    }
}

export const createTicketsController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const uid = req.session.passport.user
        const newTicket = await services.createTicketService(uid)
        await purchaseProductsService(cid)
        res.json(newTicket)
    } catch (error) {
        next(error)
    }
}