import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useTicketsStore = defineStore("tickets", {
  state: () => ({
    tickets: [],
    ticket: {},
  }),
  getters: {
    getTickets: (state) => state.tickets,
    getTicket: (state) => state.ticket,
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
    async createTicket(data) {
      const token = await auth.getToken;
      await api
        .post("/tickets/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          Notify.create({
            message: `Ticket ${response.data.id_ticket} creado exitosamente!`,
            type: "positive",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log(response);
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.errors[0].message,
            type: "negative",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log("Error", error.response.data.message);
        });

      this.getAllTickets();
    },
    async updateTicket(id_ticket, data) {
      const token = auth.getToken;
      console.log("updateticket actions:", id_ticket, data);
      await api
        .put(`tickets/update/${id_ticket}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          Notify.create({
            message: `Cliente ${response.data.id_ticket} actualizado exitosamente!`,
            type: "positive",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log(response);
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.errors[0].message,
            type: "negative",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
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
          Notify.create({
            message: `Ticket ${data} eliminado exitosamente!`,
            type: "negative",
            caption: "Cuidado al eliminar!",
            progress: true,
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          this.clientes = this.clientes.filter(
            (cli) => cli.id_ticket !== id_ticket
          );
          console.log("deleteTicket ACTIONS: ", data);
        })
        .catch((error) => {
          console.log("deleteTicket ACTIONS: ", error.response.data.message);
          Notify.create({
            message: error.response.data.message,
            type: "negative",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log("Error", error.response.data.message);
        });

      this.getAllTickets();
    },
  },
});
