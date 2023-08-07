import { useState,useEffect } from "react";
import useTareas from "../hooks/useTareas"
import Tarea from "./Tarea";
import Modal from "./Modal";

const ListadoTareas = () => {
    const {tareas,setEdicion,eliminarTarea} = useTareas();
    const [modal,setModal] = useState({});

    const handleEliminarTarea = (id) => {
        setModal({estado: true,id: id});
        return;
    }

    const cancelarModal = () => {
        setModal({estado: false,id: null});
        return;
    }

    const confirmarModal = (id) => {
        eliminarTarea(id);
        setModal({estado: false,id: null});
    }


  return (
    <>
        {tareas.length ? 
        <>
            <h2 className="font-black text-3xl text-center">Listado de Tareas</h2>
            <p className="text-xl mt-5 mb-10 text-center">Administra {''} <span className="text-blue-600 font-bold"> tus Tareas</span></p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tareas.map(tarea => 
                (
                    <Tarea  
                        key={tarea.id}
                        tarea={tarea}
                        eliminarTarea={handleEliminarTarea}
                    />
                ) 
            )}
            </div>
        </> : 
        (
            <>
            <h2 className="font-black text-3xl text-center">No hay Tareas</h2>
            <p className="text-xl mt-5 mb-10 text-center">Comienza agregando tus Tareas {''} <span className="text-blue-600 font-bold">y apareceran en este lugar</span></p>
            </>
        )
        }

        {modal.estado && (
        <Modal 
            modal={modal}
            > 
                <button className="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400"
                onClick={cancelarModal}
                >Cancelar</button>
                <button className="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400"
                onClick={() => confirmarModal(modal.id)}
                >Confirmar</button> 
            </Modal>
        )}
    </>
  )
}

export default ListadoTareas
