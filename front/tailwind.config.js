/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      mainRed: colors.red,
      mainBlue: colors.blue,
      mainYellow: colors.yellow,
      mainGreen: colors.green,
      iceBlue: "#1fb6ff",
      red: "#e3342f",
      deepBlue: "#0800ff",
      yellow: "#eeff00",
      palePupple: "#ea6aed",
      lightGray: "#c9bfc9",
      white: "#ffffff",
      sharkGray: "#4d5666",
      deepPink: "#f7a3e3",
    },
    fontFamily: {
      netmarbleB: ["netmarbleB"],
      netmarbleL: ["netmarbleL"],
      netmarbleM: ["netmarbleM"],
      MaplestoryBold: ["MaplestoryBold"],
      MaplestoryLight: ["MaplestoryLight"],
      MaplestoryOTFBold: ["MaplestoryOTFBold"],
    },
    extend: {
      keyframes: {
        intro: {
          from: { transform: "translateY(300%) scale(0.5)" },
          to: { transform: "translateY(-300%) scale(1.0)" },
        },
        goTrain: {
          "0%": { transform: "translateX(700px) " },
          "100%": { transform: "translateX(-1400px)" },
        },
        oneTrain: {
          "0%": { transform: "translateX(0px) " },
          "100%": { transform: "translateX(-1400px)" },
        },
      },
      animation: {
        intro: "intro 4s linear infinite",
        goTrain: "goTrain 10s linear infinite",
        oneTrain: "oneTrain 1.5s linear",
      },
    },
    textFillColor: (theme) => theme("borderColor"),
    textStrokeColor: (theme) => theme("borderColor"),
    textStrokeWidth: (theme) => theme("borderWidth"),
    paintOrder: {
      fsm: { paintOrder: "fill stroke markers" },
      fms: { paintOrder: "fill markers stroke" },
      sfm: { paintOrder: "stroke fill markers" },
      smf: { paintOrder: "stroke markers fill" },
      mfs: { paintOrder: "markers fill stroke" },
      msf: { paintOrder: "markers stroke fill" },
    },
  },
  variants: {
    // all the following default to ['responsive']
    textFillColor: ["responsive"],
    textStrokeColor: ["responsive"],
    textStrokeWidth: ["responsive"],
    paintOrder: ["responsive"],
  },
  plugins: [
    require("tailwindcss-text-fill-stroke")(), // no options to configure
  ],
};
