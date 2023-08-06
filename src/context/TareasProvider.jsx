import { createContext,useState,useEffect } from "react"
import clienteAxios from "../config/axios";

const TareasContext = createContext();

const TareasProvider = ({children}) => {
    const [tareas, setTareas] = useState([]);

    const token = localStorage.getItem('task_token');
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer ${token}`
        }
    }

    const guardarTarea = async (tarea) => {
        const {title,description,date,time,checkList,filesList} = tarea;
        
        
        let dateFormat = new Date(date);
        dateFormat = new Date(dateFormat.getFullYear(), dateFormat.getMonth(), dateFormat.getDate());
        const formattedDate = dateFormat.toISOString().slice(0, 10); 

        const task = {
            "data": {
                title,
                description,
                "date_start": `${formattedDate} ${time}:00`
            },
            "include":{
                "checklists": checkList,
                "files": filesList
            }
        };

        try {
           const {data}  = await clienteAxios.post('/tasks',task,config)

           setTareas([data, ...tareas]);
        } catch (error) { 
            console.log(error);
        }

    }

  return (
    <TareasContext.Provider 
        value={{
            guardarTarea
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
