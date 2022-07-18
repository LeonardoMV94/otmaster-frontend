import { computed } from "vue";
import { useDispositivosStore } from "stores/dispositivo";

const useDispositivo = () => {
  const store = useDispositivosStore();

  const getAllDispositivos = async () => {
    await store.getAllDispositivos();
  };

  const getDispositivoById = async (id_dispositivo) => {
    await store.getTDById(id_dispositivo);
  };

  const createDispositivo = async (dispositivoObj) => {
    console.log("createDispositivo ", dispositivoObj);
    await store.createDispositivo(dispositivoObj);
  };

  const updateDispositivo = async (id_dispositivo, updateDis) => {
    console.log("updateDispositivo", id_dispositivo, updateDis);
    await store.updateDispositivo(id_dispositivo, updateDis);
  };

  const deleteDispositivo = async (id_dispositivo) => {
    console.log("deleteDispositivo useDispositivo: ", id_dispositivo);
    await store.deleteDispositivo(id_dispositivo);
  };

  return {
    getAllDispositivos,
    getDispositivoById,
    createDispositivo,
    updateDispositivo,
    deleteDispositivo,
    getDispositivos: computed(() => store.getDispositivos),
    getDispositivo: computed(() => store.getDispositivo),
    getOnlyIdDispositivos: computed(() => store.getOnlyIdDispositivos),
  };
};

export default useDispositivo;
