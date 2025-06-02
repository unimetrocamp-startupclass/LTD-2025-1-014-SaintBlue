/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Habilita o modo escuro com a classe 'dark-mode'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          darker: "var(--color-primary-darker)",
        },
        background: {
          light: "var(--color-background-light)",
          dark: "var(--color-background-dark)",
        },
        text: {
          light: "var(--color-text-light)",
          dark: "var(--color-text-dark)",
        },
        gray: {
          light: "var(--color-gray-light)",
          dark: "var(--color-gray-dark)",
        },
        line: {
          DEFAULT: "var(--color-line)",
          dark: "var(--color-line-dark)",
        },
      },
    },
  },
  plugins: [],
};
