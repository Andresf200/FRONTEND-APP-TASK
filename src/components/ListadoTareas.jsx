import useTareas from "../hooks/useTareas"
import Tarea from "./Tarea";

const ListadoTareas = () => {
    const {tareas} = useTareas();

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
    </>
  )
}

export default ListadoTareas
