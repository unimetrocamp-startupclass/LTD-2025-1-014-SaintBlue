import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Land from "./pages/LandPaging/Land";
import Login from "./components/Login/login";
import Inicio from "./pages/Dashboard/Inicio";
import Estoque from "./pages/Estoque/Estoque";
import UpdateProduto from "./pages/UpdateProduto/UpdateProduto";
import CreateProduto from "./pages/CreateProduto/CreateProduto";
import Erro from "./pages/Erro/Erro";
import { Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

// Layout específico para /login
function LoginLayout({ children }) {
  return <>{children}</>;
}

// Layout padrão para outras rotas
function DefaultLayout({ children, showSidebar }) {
  return (
    <div className="flex flex-col min-h-screen">
      {showSidebar && <Sidebar />}
      {children}
    </div>
  );
}

function RoutesApp() {
  const location = useLocation();
  const hideSidebarRoutes = ["/login", "/"];
  const showSidebar = !hideSidebarRoutes.includes(
    location.pathname.toLowerCase()
  );
  const isDashboardOrEstoque = ["/dashboard", "/estoque"].includes(
    location.pathname.toLowerCase()
  );
  const isLogin = location.pathname.toLowerCase() === "/login";

  // Definindo variantes para a transição suave
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 0.98,
    },
  };

  const pageTransition = {
    duration: 0.4,
    ease: "easeInOut",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Renderiza a Sidebar fora da transição */}
      {isDashboardOrEstoque && <Sidebar />}

      {/* Transição com framer-motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.key}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="flex-1 page-container"
          style={{ overflowX: "hidden" }}
        >
          {isDashboardOrEstoque ? (
            <div className="flex flex-col min-h-100svh">
              <main
                className="flex-1 overflow-y-auto overflow-x-hidden"
              >
                <Routes location={location}>
                  <Route path="/dashboard" element={<Inicio />} />
                  <Route
                    path="/inicio"
                    element={<Navigate to="/dashboard" />}
                  />
                  <Route path="/estoque" element={<Estoque />} />
                </Routes>
              </main>
            </div>
          ) : isLogin ? (
            <LoginLayout>
              <Routes location={location}>
                <Route path="/login" element={<Login />} />
              </Routes>
            </LoginLayout>
          ) : (
            <DefaultLayout showSidebar={showSidebar}>
              <Routes location={location}>
                <Route path="/" element={<Land />} />
                <Route path="/createProduct" element={<CreateProduto />} />
                <Route
                  path="/updateProduct/:codigo"
                  element={<UpdateProduto />}
                />
                <Route path="*" element={<Erro />} />
              </Routes>
            </DefaultLayout>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default AppWrapper;
