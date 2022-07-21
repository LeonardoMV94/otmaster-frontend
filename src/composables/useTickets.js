import { computed } from "vue";
import { useTicketsStore } from "stores/tickets";

const useTicket = () => {
  const store = useTicketsStore();

  const getAllTickets = async () => {
    await store.getAllTickets();
  };
  const getAllEstados = async () => {
    await store.getEstadosTickets();
  };

  const getAllCountRepuestos = async () => {
    await store.getCountRepuestos();
  };

  const getTicketById = async (id_ticket) => {
    await store.getTicketById(id_ticket);
  };

  const createTicket = async (TicketObj) => {
    console.log("createTicket ", TicketObj);
    await store.createTicket(TicketObj);
  };

  const updateTicket = async (id_ticket, updateDis) => {
    console.log("updateTicket", id_ticket, updateDis);
    await store.updateTicket(id_ticket, updateDis);
  };

  const deleteTicket = async (id_ticket) => {
    console.log("deleteTicket useTicket: ", id_ticket);
    await store.deleteTicket(id_ticket);
  };

  return {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    getAllEstados,
    getAllCountRepuestos,
    getTickets: computed(() => store.getTickets),
    getTicket: computed(() => store.getTicket),
    getEstadosTicket: computed(() => store.getEstados),
    getCountAllRepuestos: computed(() => store.getCountRepuestoss),
    getEstadosSelects: computed(() => store.getEstadosSelect),
  };
};

export default useTicket;
