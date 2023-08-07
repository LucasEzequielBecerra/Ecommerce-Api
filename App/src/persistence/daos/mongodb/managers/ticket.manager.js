import { TicketModel } from "../models/ticket.model.js"
import { UserModel } from "../models/user.model.js"
import { CartModel } from "../models/cart.model.js"
import { newTicketCode } from "../../../../utils.js"

export default class TicketManagerMongo {

    async getAllTickets() {
        try {
            const tickets = await TicketModel.find({})
            return tickets
        } catch (error) {
            console.log(error.message)
        }
    }

    async createTicket(uid) {
        try {
            const { email, cartId } = await UserModel.findById(uid)
            if (cartId === undefined) throw new Error('Invalid')
            const { total } = await CartModel.findById(cartId.toHexString())

            if (total === 0) throw new Error('Your cart has no items')
            const newTicket = await TicketModel.create({
                code: await newTicketCode(),
                purchase_datetime: new Date().toUTCString(),
                amount: total,
                purchaser: email,
                cart: cartId
            })
            return newTicket

        } catch (error) {
            console.log(error)
        }
    }


}