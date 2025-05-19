import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Land from "./pages/LandPaging/Land";
import Login from "./components/Login/login";
import Inicio from "./pages/Inicio/Inicio";
import Estoque from "./pages/Estoque/Estoque";
import  UpdateProduto  from "./pages/UpdateProduto/UpdateProduto";
import  CreateProduto  from "./pages/CreateProduto/CreateProduto";
import Erro from "./pages/Erro/Erro";
import { Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import "./transitions.css";

function Layout({ children }) {
  const location = useLocation();
  const hideSidebarRoutes = ["/login", "/"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {showSidebar && <Sidebar />}
      {children}
    </>
  );
}

function RoutesApp() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={300} classNames="fade">
        <div className="page-container">
          <Routes location={location}>
            <Route path="/" element={<Land />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Inicio />} />
            <Route path="/inicio" element={<Navigate to="/dashboard" />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/createProduct" element={<CreateProduto />} />
            <Route path="/updateProduct/:codigo" element={<UpdateProduto />} />
            <Route path="*" element={<Erro />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <Layout>
        <RoutesApp />
      </Layout>
    </BrowserRouter>
  );
}

export default AppWrapper;
