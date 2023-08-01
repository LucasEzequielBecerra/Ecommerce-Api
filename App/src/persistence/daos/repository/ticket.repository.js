import factory from "../../factory.js";
const { ticketManager } = factory

export default class TicketRepository {

    async getAllTickets() {
        try {
            const tickets = await ticketManager.getAllTickets()
            return tickets
        } catch (error) {
            console.log(error.message)
        }
    }

    async createTicket(uid) {
        try {
            const newTicket = await ticketManager.createTicket(uid)
            return newTicket
        } catch (error) {

        }
    }
}