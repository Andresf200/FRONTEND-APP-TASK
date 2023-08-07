import { useState } from "react";
import useTareas from "../hooks/useTareas"
import clienteAxios from "../config/axios";

const informacionTareaModal = ({mostrarTarea, setMostrarTarea}) => {

    const [checkLists, setCheckLists] = useState([]);
    const {tarea} = useTareas();

    if(!tarea.data) return null;
    
    const {title,description,id,state,date_start,date_end} = tarea.data.attributes;
    const {checklists,files} = tarea.included;


    let stateFormat;
    if(state == 'todo'){
        stateFormat = 'Por Hacer'
    }else if(state == 'progress'){
        stateFormat = 'En Progreso';
    }else if(state == 'completed'){
        stateFormat = 'Hecho';
    }

    const formaterFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX',{dateStyle: 'long'}).format(nuevaFecha);
    };

    const handleChecked = async(index) => {
      try {
          const token = localStorage.getItem('task_token');
            const config = {
                headers: {
                    'Content-Type': 'aplication/json', 
                    Authorization: `Bearer ${token}`
                }
            } 

            const {data} = await clienteAxios.get(`/checklist/toggleCompleted/${index}`,config);
            setCheckLists(prevChecklists => 
              prevChecklists.map(check => {
                check.id === index ? { ...check, completed: data.data.attributes.completed } : check}
            ));
      } catch (error) {
        console.log(error); 
      }
    };


  return (
     <>
     {tarea.data &&  (
     <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <h1 className="mb-4 text-3xl font-extrabold text-blue-600">Informacion de la Tarea</h1>

                  <p className="font-bold uppercase text-gray-700 my-2">Titulo:{' '} 
                      <span className="font-normal normal-case text-black">{title}</span>
                  </p>

                  <p className="font-bold uppercase text-gray-700 my-2">Descripcion:{' '} 
                      <span className="font-normal normal-case text-black">{description}</span>
                  </p>
                  <p className="font-bold uppercase text-gray-700 my-2">Fecha Inicio:{' '} 
                      <span className="font-normal normal-case text-black">{formaterFecha(date_start)}</span>
                  </p>
                  <p className="font-bold uppercase text-gray-700 my-2">Fecha Fin:{' '} 
                      <span className="font-normal normal-case text-black">{date_end ? formaterFecha(date_end): 'Por Definir'}</span>
                  </p>
                  <p className="font-bold uppercase text-gray-700 my-2">Estado:{' '} 
                      <span className="font-normal normal-case text-black">{stateFormat}</span>
                  </p>

                  {checkLists && (
                  <div className="grid grid-cols-2 gap-4">
                    { checklists.map(check => (
                         <label className="inline-flex items-center" key={check.id}>
                          
                            <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out focus:ring-2 focus:ring-blue-500"
                            checked={check.completed}
                            onChange={() => handleChecked(check.id)}
                            />
                            <span className="ml-2 text-gray-700">{check.item}</span>
                          </label>                      
                    ))}
                  </div>
                  )}

                  <p className="font-bold uppercase text-gray-700 my-2">Nombre:{' '} 
                      <span className="font-normal normal-case text-black">{tarea.included[0].name}</span>
                  </p>
                  <p className="font-bold uppercase text-gray-700 my-2">Email:{' '} 
                      <span className="font-normal normal-case text-black">{tarea.included[0].email}</span>
                  </p>
    
                    
                  <button className="p-1 my-4 bg-white border rounded-full w-full font-semibold" 
                  onClick={() => setMostrarTarea({estado:false})} 
                  >Cerrar pestaña</button>
                </div>
              </div>
            </div>
          </div>
        </div>
)}
     </> 
  )
}

export default informacionTareaModal
