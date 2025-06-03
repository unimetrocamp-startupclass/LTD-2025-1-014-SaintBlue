import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Switch from "./Switch";
import styles from "../Sidebar/Sidebar.module.css";
import Popup from "../../components/Popup/Popup";

function Sidebar() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Inicializa o estado com o valor do localStorage, convertendo a string "true"/"false" para booleano
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="relative text-[var(--color-text-light)]">
      {/* Botão de toggle para mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 w-10 h-10 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-primary-darker)] text-[var(--color-line-dark)] flex items-center justify-center text-xl font-bold cursor-pointer z-50 shadow-md hover:bg-[var(--color-primary-dark)] hover:scale-105 transition-all duration-300"
      >
        {isSidebarOpen ? (
          <i className="bi bi-x"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </button>

      {/* Nav */}
      <nav
        className={`w-auto ${
          isSidebarOpen && window.innerWidth < 768
            ? "fixed top-0 left-0 z-40 h-screen bg-[var(--color-primary-darker)] shadow-lg transition-transform duration-500 ease-in-out translate-y-0"
            : "hidden md:block"
        } ${
          window.innerWidth >= 768 ? "h-16 sm:h-20 lg:h-24" : ""
        } text-[var(--color-text-light)]`}
      >
        <div
          className={`${
            window.innerWidth < 768
              ? "flex flex-col h-full p-4"
              : "flex items-center justify-between h-full p-4 sm:p-6 lg:p-8"
          }`}
        >
          {/* Seção do Logo */}
          <div className="flex items-center space-x-3 mb-6">
            <img
              src="/saint_500.png"
              alt="Logo SaintBlue"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold">
              SaintBlue
            </span>
          </div>

          {/* Seção dos Links (Dashboard e Estoque) */}
          <div
            className={`${
              window.innerWidth < 768
                ? "flex flex-col space-y-6 mb-6"
                : "flex space-x-6"
            }`}
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-3 rounded-md transition-colors duration-300 text-base sm:text-lg lg:text-xl ${
                  window.innerWidth < 768
                    ? isActive
                      ? "text-[var(--color-text-light)] font-bold"
                      : "text-[var(--color-text-light)] hover:text-[var(--color-gray-light)]"
                    : isActive
                    ? "text-[var(--color-text-light)] font-bold text-5xl"
                    : "text-[var(--color-text-light)] hover:text-[var(--color-primary-dark)]"
                }`
              }
            >
              <i className="bi bi-house-door text-lg sm:text-xl lg:text-2xl"></i>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/estoque"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-3 rounded-md transition-colors duration-300 text-base sm:text-lg lg:text-xl ${
                  window.innerWidth < 768
                    ? isActive
                      ? "text-[var(--color-text-light)] font-bold"
                      : "text-[var(--color-text-light)] hover:text-[var(--color-gray-light)]"
                    : isActive
                    ? "text-[var(--color-text-light)] font-bold text-4xl"
                    : "text-[var(--color-text-light)] hover:text-[var(--color-primary-dark)]"
                }`
              }
            >
              <i className="bi bi-boxes text-lg sm:text-xl lg:text-2xl"></i>
              <span>Estoque</span>
            </NavLink>
          </div>

          {/* Seção dos Botões (Dark Mode e Sair) */}
          <div
            className={`${
              window.innerWidth < 768
                ? "flex flex-col space-y-6"
                : "flex space-x-6"
            }`}
          >
            <div className="flex items-center space-x-2 px-3 py-3">
              <i
                className={`bi ${
                  isDarkMode ? "bi-moon" : "bi-sun"
                } text-lg sm:text-xl lg:text-2xl`}
              ></i>
              <span className="text-xs sm:text-sm lg:text-base font-semibold">
                Dark Mode
              </span>
              <Switch isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>

            <div className={styles.perfil}>
              <ul>
                <li onClick={() => setIsPopUpOpen(true)}>
                  <i className="bi bi-person-circle"></i>
                  <span className={styles.btnPerfil}>Perfil</span>
                </li>
              </ul>
            </div>
            {/* Pop-up */}
            <Popup isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
            <Link
              to="/login"
              className="flex items-center space-x-2 px-3 py-3 rounded-md transition-colors duration-300 text-sm sm:text-base lg:text-lg font-medium"
            >
              <i className="bi bi-box-arrow-left text-lg sm:text-xl lg:text-2xl font-semibold"></i>
              <span>Sair</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
