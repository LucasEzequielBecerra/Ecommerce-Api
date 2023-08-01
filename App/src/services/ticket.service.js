import TicketRepository from "../persistence/daos/repository/ticket.repository.js";
const ticketDao = new TicketRepository()

export const getAllTicketsService = async () => {
    try {
        const tickets = await ticketDao.getAllTickets()
        return tickets
    } catch (error) {
        console.log(error.message)
    }
}
export const createTicketService = async (uid) => {
    try {
        const newTicket = await ticketDao.createTicket(uid)
        return newTicket
    } catch (error) {
        console.log(error.message)
    }
}