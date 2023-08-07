import { createContext,useState,useEffect } from "react"
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const TareasContext = createContext();

const TareasProvider = ({children}) => {
    const [tareas, setTareas] = useState([]);
    const {auth} = useAuth();

    const token = localStorage.getItem('task_token');


    useEffect(() => {
        const obtenerTareas = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'aplication/json', 
                        Authorization: `Bearer ${token}`
                    }
                }
                if(!token) return;

               const {data} = await clienteAxios('/tasks',config);
               setTareas(data.data);
            } catch (error) {
               console.log(error) ;
            }
        }
        obtenerTareas();
    },[auth]);

    const guardarTarea = async (tarea) => {
        const {title,description,date,time,checkList,filesList} = tarea;
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', 
                Authorization: `Bearer ${token}`
            }
        }
        
        let dateFormat = new Date(date);
        dateFormat = new Date(dateFormat.getFullYear(), dateFormat.getMonth(), dateFormat.getDate());
        const formattedDate = dateFormat.toISOString().slice(0, 10); 

        const task = {
            "data": {
                title,
                description,
                "date_start": `${formattedDate}`
            },
            "include":{
                "checklists": checkList,
                "files": filesList
            }
        };

        try {
           const {data}  = await clienteAxios.post('/tasks',task,config) 
            setTareas([...tareas,data.data])
           return;
        } catch (error) { 
            console.log(error);
        }

    }

    const eliminarTarea = async(id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'aplication/json', 
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`tasks/${id}`,config);

            const tareasActualizada = tareas.filter(tareaState => tareaState.attributes.id !== id)
            setTareas(tareasActualizada); 
            return;
        } catch (error) {
           console.log(error); 
        }
    }

  return (
    <TareasContext.Provider 
        value={{
            tareas,
            guardarTarea,
            eliminarTarea 
        }}
    >
        {children}
    </TareasContext.Provider>
  )
}

export {
    TareasProvider
};

export default TareasContext;
