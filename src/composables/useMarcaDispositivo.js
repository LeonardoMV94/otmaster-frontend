import { computed } from "vue";
import { useMarcasDispositivosStore } from "stores/marcaDispositivo";

const useMarcaDispositivo = () => {
  const store = useMarcasDispositivosStore();

  const getAllMarcaDispositivos = async () => {
    await store.getAllsMarcaDispositivos();
  };

  const getMarcaDispositivoById = async (id_marca) => {
    await store.getTDById(id_marca);
  };

  const createMarcaDispositivo = async (MarcaDispositivoObj) => {
    console.log("createMarcaDispositivo ", MarcaDispositivoObj);
    await store.createMarcasDispositivo(MarcaDispositivoObj);
  };

  const updateMarcaDispositivo = async (id_marca, updateCol) => {
    console.log("updateMarcaDispositivo", id_marca, updateCol);
    await store.updateMarcaDispositivo(id_marca, updateCol);
  };

  const deleteMarcaDispositivo = async (id_marca) => {
    console.log("deleteMarcaDispositivo useMarcaDispositivo: ", id_marca);
    await store.deleteMarcaDispositivo(id_marca);
  };

  return {
    getAllMarcaDispositivos,
    getMarcaDispositivoById,
    createMarcaDispositivo,
    updateMarcaDispositivo,
    deleteMarcaDispositivo,
    getMarcasDispositivos: computed(() => store.getMarcasDispositivos),
    getMarcaDispositivo: computed(() => store.getMarcaDispositivo),
    getMDtoSelect: computed(() => store.getMDSelect),
  };
};

export default useMarcaDispositivo;
