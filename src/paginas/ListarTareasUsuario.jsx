import { useState,useEffect } from "react"
import clienteAxios from "../config/axios";

const ListarTareasUsuario = () => {
    const [users, setUsers] = useState([]);
    const [selectUser, setSelectUser] = useState([]);
    const [tasks, setTasks] = useState([]);

        const obtenerUsers = async() => {
            try {
                const token = localStorage.getItem('task_token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }  
                
                const {data} = await clienteAxios('/users',config);
                setUsers(data);
            } catch (error) {
               console.log(error);
            }
        }

    const handleUsers = () => {
        obtenerUsers();
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
 
        try {
            const token = localStorage.getItem('task_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }  
            
            const {data} = await clienteAxios(`/usertask/${selectUser}`,config);
            setTasks(data.include);
        } catch (error) {
           console.log(error);
        }
    }

  return (
    <>
    <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <form>
            <div className="-mx-3 flex justify-around mt-3">
                <label className="mt-2 text-xl">
                   Seleccione el usuario 
                </label>
                <div className="w-1/3 px-2">
                    <select
                      type="user"
                      name='user'
                      id="user"
                      onClick={handleUsers}
                      onChange={e => setSelectUser(e.target.value)}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-400 focus:shadow-md"
                    >
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                        ))}
                    </select>  
                </div> 
                <button
                    className=" w-40 hover:shadow-form rounded-md bg-blue-500 py-auto px-2 text-center text-base font-semibold text-white outline-none "
                    onClick={e => handleSubmit(e)}
                    >
                    Guardar
                </button>
            </div> 
            </form>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Titulo</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Descripcion</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Fecha inicio</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Fecha terminada</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Estado</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                                {tasks.map(task => (
                                    <tr key={task.id}>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{task.title}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{task.description}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{task.date_start}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{task.date_end ? task_end : 'Por Definir'}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{task.state}</div> 
                                        </td>
                                    </tr>
                                ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default ListarTareasUsuario
