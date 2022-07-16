import { Notify } from "quasar";

export const createNotify = (mensaje, tipo) => {
  Notify.create({
    message: `${mensaje}`,
    type: tipo,
    actions: [
      {
        label: "Cerrar",
        color: "white",
      },
    ],
  });
};
