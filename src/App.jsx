import { BrowserRouter,Routes,Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar"
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarTareas from "./paginas/AdministrarTareas";

import { AuthProvider } from "./context/AuthProvider";
import { TareasProvider } from "./context/TareasProvider";

function App() {

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <TareasProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar/>}/>
            </Route>
            <Route path='/admin' element={<RutaProtegida/>}>
              <Route index element={<AdministrarTareas />}/>
            </Route>
          </Routes>
        </TareasProvider>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
