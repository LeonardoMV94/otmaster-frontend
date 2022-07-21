import { Notify } from "quasar";

export const createNotify = (mensaje, tipo_mensaje) => {
  Notify.create({
    message: `${mensaje}`,
    type: tipo_mensaje,
    actions: [
      {
        label: "Cerrar",
        color: "white",
      },
    ],
  });
};
