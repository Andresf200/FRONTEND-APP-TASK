import { BrowserRouter,Routes,Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar"
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarTareas from "./paginas/AdministrarTareas";

function App() {

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar/>}/>
          </Route>
          <Route path='/admin' element={<RutaProtegida/>}>
            <Route index element={<AdministrarTareas />}/>
          </Route>
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
