import { computed } from "vue";
import { useRepuestosStore } from "stores/repuesto";

const useRepuestos = () => {
  const store = useRepuestosStore();

  const getAllRepuestos = async () => {
    await store.getAllRepuestos();
  };

  const getRepuestoById = async (id_repuesto) => {
    await store.getRepuestoById(id_repuesto);
  };

  const createNewRepuesto = async (RepuestoObj) => {
    console.log("createRepuesto ", RepuestoObj);
    await store.createRepuesto(RepuestoObj);
  };

  const updateRepuesto = async (id_repuesto, updateDis) => {
    console.log("updateRepuesto", id_repuesto, updateDis);
    await store.updateRepuesto(id_repuesto, updateDis);
  };

  const deleteRepuesto = async (id_repuesto) => {
    console.log("deleteRepuesto useRepuesto: ", id_repuesto);
    await store.deleteRepuesto(id_repuesto);
  };

  return {
    getAllRepuestos,
    getRepuestoById,
    createNewRepuesto,
    updateRepuesto,
    deleteRepuesto,
    getRepuestos: computed(() => store.getRepuestos),
  };
};

export default useRepuestos;
