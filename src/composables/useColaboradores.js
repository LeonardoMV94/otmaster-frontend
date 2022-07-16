import { computed } from "vue";
import { useColaboradoresStore } from "stores/colaboradores";

const useColaborador = () => {
  const store = useColaboradoresStore();

  const getAllColaboradores = async () => {
    await store.getAllColaboradores();
  };

  const getColaboradorById = async (rut_colaborador) => {
    await store.getColaboradorById(rut_colaborador);
  };

  const createColaborador = async (ColaboradorObj) => {
    console.log("createColaborador useColaborador: ", ColaboradorObj);
    await store.createColaborador(ColaboradorObj);
  };

  const updateColaborador = async (rut_colaborador, updateCol) => {
    console.log(
      "updateColaborador useColaborador: ",
      rut_colaborador,
      updateCol
    );
    await store.updateColaborador(rut_colaborador, updateCol);
  };

  const deleteColaborador = async (rut_colaborador) => {
    console.log("deleteColaborador useColaborador: ", rut_colaborador);
    await store.deleteColaborador(rut_colaborador);
  };

  return {
    getAllColaboradores,
    getColaboradorById,
    createColaborador,
    updateColaborador,
    deleteColaborador,
    getColaboradores: computed(() => store.getColaboradores),
    getColaborador: computed(() => store.getColaborador),
  };
};

export default useColaborador;
