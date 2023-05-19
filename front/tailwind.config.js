/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: `jit`,
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      iceBlue: "#1fb6ff",
      red: "#e3342f",
      deepBlue: "#0800ff",
      yellow: "#eeff00",
      palePupple: "#ea6aed",
      lightGray: "#c9bfc9",
      white: "#ffffff",
      sharkGray: "#4d5666",
      deepPink: "#f7a3e3",
      sample: "#fcfb00",
      beige: "#fcf0c7",
      modernOrange: "#f48733",
      mint: "#91ffb7",
      lightYellow: "#fef08a",
      imageSky: "#58b2f0",
      buttonPurple: "#7daee2",
      buttonGreen: "#45964f",
      buttonBlue: "#54e1f7",
      buttonRed: "#fdae8b",
      buttonDeepPurple: "#3f7cba",
      buttonDeepGreen: "#407a3b",
      buttonDeepBlue: "#11c4e0",
      buttonDeepRed: "#ea7f52",
      // 기본 컬러
      mainBlack: colors.black,
      mainWhite: colors.white,
      mainSlate: colors.slate,
      mainGray: colors.gray,
      mainZinc: colors.zinc,
      mainNeutral: colors.neutral,
      mainStone: colors.stone,
      mainRed: colors.red,
      mainOrange: colors.orange,
      mainAmber: colors.amber,
      mainYellow: colors.yellow,
      mainLime: colors.lime,
      mainGreen: colors.green,
      mainEmerald: colors.emerald,
      mainTeal: colors.teal,
      mainCyan: colors.cyan,
      mainSky: colors.sky,
      mainBlue: colors.blue,
      mainIndigo: colors.indigo,
      mainViolet: colors.violet,
      mainPurple: colors.purple,
      mainFuchsia: colors.fuchsia,
      mainPink: colors.pink,
      mainRose: colors.rose,
      mainTransparent: colors.transparent,
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
        snow1: {
          "0%": { transform: "translateX(450px) translateY(-30px)" },
          "100%": { transform: "translateX(250px) translateY(350px)" },
        },
        snow2: {
          "0%": { transform: "translateX(100px) translateY(-20px)" },
          "100%": { transform: "translateX(250px) translateY(350px)" },
        },
        snow3: {
          "0%": { transform: "translateX(150px) translateY(-70px)" },
          "100%": { transform: "translateX(50px) translateY(350px)" },
        },
        snow4: {
          "0%": { transform: "translateX(250px) translateY(-40px)" },
          "100%": { transform: "translateX(150px) translateY(350px)" },
        },
        snow5: {
          "0%": { transform: "translateX(350px) translateY(-50px)" },
          "100%": { transform: "translateX(250px) translateY(350px)" },
        },
        snow6: {
          "0%": { transform: "translateX(50px) translateY(-60px)" },
          "100%": { transform: "translateX(0px) translateY(350px)" },
        },
        snow7: {
          "0%": { transform: "translateX(400px) translateY(-80px)" },
          "100%": { transform: "translateX(650px) translateY(350px)" },
        },
        snow8: {
          "0%": { transform: "translateX(550px) translateY(-30px)" },
          "100%": { transform: "translateX(750px) translateY(350px)" },
        },
        snow9: {
          "0%": { transform: "translateX(750px) translateY(-20px)" },
          "100%": { transform: "translateX(650px) translateY(350px)" },
        },
        snow10: {
          "0%": { transform: "translateX(200px) translateY(-10px)" },
          "100%": { transform: "translateX(450px) translateY(350px)" },
        },
        snow11: {
          "0%": { transform: "translateX(600px) translateY(-40px)" },
          "100%": { transform: "translateX(450px) translateY(350px)" },
        },
        snow12: {
          "0%": { transform: "translateX(300px) translateY(-50px)" },
          "100%": { transform: "translateX(550px) translateY(350px)" },
        },
        cloud0: {
          "0%" : {transform: "translateX(-10%)"},
          "50%": {transform: "translateX(15%)"},
          "100%": { transform: "translateX(-10%)" },
        },
        cloud1: {
          "0%" : {transform: "translateX(2%)"},
          "50%": {transform: "translateX(15%)"},
          "100%": { transform: "translateX(2%)" },
        },
        cloud2: {
          "0%" : {transform: "translateX(12%)"},
          "50%": {transform: "translateX(2%)"},
          "100%": { transform: "translateX(12%)" },
        },
        cloud3: {
          "0%" : {transform: "translateX(-30%)"},
          "50%": {transform: "translateX(25%)"},
          "100%": { transform: "translateX(-30%)" },
        },
        cloud4: {
          "0%" : {transform: "translateX(20%)"},
          "50%": {transform: "translateX(0%)"},
          "100%": { transform: "translateX(20%)" },
        },
        cloud5: {
          "0%" : {transform: "translateX(25%)"},
          "50%": {transform: "translateX(2%)"},
          "100%": { transform: "translateX(25%)" },
        },
        cloud6: {
          "0%" : {transform: "translateX(32%)"},
          "50%": {transform: "translateX(2%)"},
          "100%": { transform: "translateX(32%)" },
        },
        cloud7: {
          "0%" : {transform: "translateX(18%)"},
          "50%": {transform: "translateX(38%)"},
          "100%": { transform: "translateX(18%)" },
        },
        cloud8: {
          "0%" : {transform: "translateX(20%)"},
          "50%": {transform: "translateX(33%)"},
          "100%": { transform: "translateX(20%)" },
        },
        cloud9: {
          "0%" : {transform: "translateX(6%)"},
          "50%": {transform: "translateX(70%)"},
          "100%": { transform: "translateX(6%)" },
        },
        cloud10: {
          "0%" : {transform: "translateX(50%)"},
          "50%": {transform: "translateX(22%)"},
          "100%": { transform: "translateX(50%)" },
        },
        cloud11: {
          "0%" : {transform: "translateX(50%)"},
          "50%": {transform: "translateX(2%)"},
          "100%": { transform: "translateX(50%)" },
        },
        cloud12: {
          "0%" : {transform: "translateX(0%)"},
          "50%": {transform: "translateX(-20%)"},
          "100%": { transform: "translateX(0%)" },
        },
        cloud13: {
          "0%" : {transform: "translateX(5%)"},
          "50%": {transform: "translateX(0%)"},
          "100%": { transform: "translateX(5%)" },
        },
        leftFox: {
          "0%" : {transform: "translateX(-50vw)"},
          "100%" : {transform: "translateX(200vw)"}
        },
        textSlide: {
          "0%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.5)",
            transform: "scale(0.5)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        myBounce: {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            "-webkit-animation-timing-function": "ease-in",
            "animation-timing-function": "ease-in",
          },
          "50%": {
            "-webkit-transform": "translateY(1.5vh)",
            transform: "translateY(1.5vh)",
            "-webkit-animation-timing-function": "ease-out",
            "animation-timing-function": "ease-out",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            "-webkit-animation-timing-function": "ease-in",
            "animation-timing-function": "ease-in",
          },
        },
        cardBounce: {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            "-webkit-animation-timing-function": "ease-out",
            "animation-timing-function": "ease-out",
          },
          "25%": {
            "-webkit-transform": "translateY(0.5vh)",
            transform: "translateY(0.5vh)",
            "-webkit-animation-timing-function": "ease-in",
            "animation-timing-function": "ease-in",
          },
          "50%": {
            "-webkit-transform": "translateY(0vh)",
            transform: "translateY(0vh)",
            "-webkit-animation-timing-function": "ease-out",
            "animation-timing-function": "ease-out",
          },
          "75%": {
            "-webkit-transform": "translateY(-0.5vh)",
            transform: "translateY(-0.5vh)",
            "-webkit-animation-timing-function": "ease-in",
            "animation-timing-function": "ease-in",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            "-webkit-animation-timing-function": "ease-out",
            "animation-timing-function": "ease-out",
          },
        },
        loadingBall: {
          "15%": {
            transform: "translateX(0)",
          },
          "45%": {
            transform: "translateX( 22.75rem )", // $loader--width - $loader-dot--size
          },
          "65%": {
            transform: "translateX( 22.75rem )",
          },
          "95%": {
            transform: "translateX(0)",
          },
        },
        typing: {
          "0%": { transform: "translateX(0ch)" },
          "15%, 20%": { transform: "translateX(1ch)" },
          "55%, 60%": { transform: "translateX(2ch)" },
          "95%, 100%": { transform: "translateX(3ch)" },
        },
        ballBounce: {
          "0%": { transform: " translateY(-50px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        intro: "intro 4s linear infinite",
        goTrain: "goTrain 10s linear infinite",
        oneTrain: "oneTrain 1.5s linear",
        snow1: "snow1 13s linear infinite",
        snow2: "snow2 19s linear infinite",
        snow3: "snow3 15s linear infinite",
        snow4: "snow4 11s linear infinite",
        snow5: "snow5 17s linear infinite",
        snow6: "snow6 20s linear infinite",
        snow7: "snow7 15s linear infinite",
        snow8: "snow8 11s linear infinite",
        snow9: "snow9 21s linear infinite",
        snow10: "snow10 17s linear infinite",
        snow11: "snow11 22s linear infinite",
        snow12: "snow12 19s linear infinite",
        cloud0: "cloud0 5s linear infinite",
        cloud1: "cloud1 5s linear infinite",
        cloud2: "cloud2 5s linear infinite",
        cloud3: "cloud3 10s linear infinite",
        cloud4: "cloud4 5s linear infinite",
        cloud5: "cloud5 5s linear infinite",
        cloud6: "cloud6 5s linear infinite",
        cloud7: "cloud7 5s linear infinite",
        cloud8: "cloud8 5s linear infinite",
        cloud9: "cloud9 8s linear infinite",
        cloud10: "cloud10 5s linear infinite",
        cloud11: "cloud11 10s linear infinite",
        cloud12: "cloud12 5s linear infinite",
        cloud13: "cloud13 5s linear infinite",
        leftFox: "leftFox 15s linear infinite",
        "scale-up-center":
          "scale-up-center 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        bounce: "myBounce 1.3s infinite",
        "card-bounce": "cardBounce 1.6s infinite",

        loadingBall: "loadingBall 3s ease-in-out infinite",
        typing: "typing 1s ease-out .8s infinite",
        ballBounce: "ballBounce 0.9s infinite linear alternate  ",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        loading:
          "-2px 0 var(--tw-shadow-color), 0 2px var(--tw-shadow-color), 2px 0 var(--tw-shadow-color), 0 -2px var(--tw-shadow-color)",
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
    require("tailwindcss-animation-delay"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
