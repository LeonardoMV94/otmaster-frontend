import { computed } from "vue";
import { useTiposDispositivosStore } from "stores/tipoDispositivo";

const useTipoDispositivo = () => {
  const store = useTiposDispositivosStore();

  const getAllTipoDispositivos = async () => {
    await store.getAllTipoDispositivos();
  };

  const getTipoDispositivoById = async (id_tipo) => {
    await store.getTDById(id_tipo);
  };

  const createTipoDispositivo = async (TipoDispositivoObj) => {
    console.log("createTipoDispositivo ", TipoDispositivoObj);
    await store.createTipoDispositivo(TipoDispositivoObj);
  };

  const updateTipoDispositivo = async (id_tipo, updateCol) => {
    console.log("updateTipoDispositivo", id_tipo, updateCol);
    await store.updateTD(id_tipo, updateCol);
  };

  const deleteTipoDispositivo = async (id_tipo) => {
    console.log("deleteTipoDispositivo useTipoDispositivo: ", id_tipo);
    await store.deleteTD(id_tipo);
  };

  return {
    getAllTipoDispositivos,
    getTipoDispositivoById,
    createTipoDispositivo,
    updateTipoDispositivo,
    deleteTipoDispositivo,
    getTiposDispositivos: computed(() => store.getTipoDispositivos),
    getTipoDispositivo: computed(() => store.getTipoDispositivo),
    getTDtoSelects: computed(() => store.getTDtoSelect),
  };
};

export default useTipoDispositivo;
