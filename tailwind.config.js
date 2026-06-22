/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // PIQ brand palette — dark mode
        forest: "#435449", // mid-forest: buttons + active accents
        "forest-deep": "#0b1712", // page base (deep near-black forest)
        panel: "#11211b", // slightly elevated dark section / card surface
        sage: "#7C967A", // accent ONLY, never actionable text
        gold: "#D4A054", // highlights / number accents / rules
        crimson: "#B22234", // alerts
        muted: "#95ADA0",
        warm: "#A8AC98",
        paper: "#F4F1E9", // primary text on dark
        ink: "#0b1712",
      },
      fontFamily: {
        // confident display/serif for headlines + numbers
        display: ['Fraunces', 'Georgia', 'serif'],
        // clean grotesque/sans for body
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        kicker: "0.22em",
      },
      maxWidth: {
        editorial: "78rem",
      },
      boxShadow: {
        lift: "0 24px 60px -28px rgba(0,0,0,0.55)",
        "lift-light": "0 30px 70px -40px rgba(29,37,31,0.45)",
      },
    },
  },
  plugins: [],
};
