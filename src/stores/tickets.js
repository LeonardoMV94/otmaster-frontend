import { defineStore } from "pinia";
import { api } from "boot/axios";
import { createNotify } from "../utils/Notifications";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useTicketsStore = defineStore("tickets", {
  state: () => ({
    tickets: [],
    ticket: {},
    estados: [],
    countRepuestos: [],
  }),
  getters: {
    getTickets: (state) => state.tickets,
    getTicket: (state) => state.ticket,
    getEstados: (state) => state.estados,
    getCountRepuestoss: (state) => state.countRepuestos,
  },
  actions: {
    async getAllTickets() {
      const token = auth.getToken;
      if (token == "") {
        return this.tickets;
      }

      const { data } = await api.get("/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("getAllTickets ACTIONS: ", data);
      this.tickets = data;
    },
    async getTicketById(id_ticket) {
      const token = auth.getToken;
      const { data } = await api.get(`/tickets/${id_ticket}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      this.cliente = data;
    },
    async getCountRepuestos() {
      const token = await auth.getToken;
      const { data } = await api.get("tickets/countrepuestos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("getCountRepuestos: ", data);
      this.countRepuestos = data;
    },
    async getEstadosTickets() {
      const token = await auth.getToken;
      const { data } = await api.get("tickets/estados/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("getEstados: ", data);
      this.estados = data;
    },
    async createTicket(data) {
      const token = await auth.getToken;
      await api
        .post("/tickets/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data.id_ticket);
          createNotify(
            `Ticket ${response.data.id_ticket} creado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllTickets();
    },
    async updateTicket(id_ticket, data) {
      const token = auth.getToken;
      console.log("updateticket actions:", id_ticket, data);
      await api
        .patch(`tickets/update/${id_ticket}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Ticket ${response.data.id_ticket} actualizado exitosamente!`,
            "positive"
          );
          //this.tickets = this.tickets.map( t => t.id_ticket).indexOf(this.tickets.id_ticket)
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });
      this.getAllTickets();
    },
    async deleteTicket(id_ticket) {
      const token = auth.getToken;
      await api
        .delete(`tickets/delete/${id_ticket}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          createNotify(`Ticket ${data.id} eliminado exitosamente!`, "negative");
          console.log("antes ", this.tickets);
          this.tickets = this.tickets.filter(
            (ti) => ti.id_ticket !== id_ticket
          );
          console.log("despues", this.tickets);
          console.log("deleteTicket ACTIONS: ", data);
        })
        .catch((error) => {
          console.log("deleteTicket ACTIONS: ", error.response.data.message);
          createNotify(error.response.data.message, "negative");
          console.log("Error", error.response.data.message);
        });
    },
  },
});
