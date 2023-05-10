import axiosInstance from "util/Axios";

const gameURL = "game";

export const game = {
  get: {
    bubble: async (difficulty) => {
      const response = await axiosInstance.get(
        `${gameURL}/bubble/${difficulty}`
      );
      return response;
    },
    jump: async (difficulty) => {
      const response = await axiosInstance.get(`${gameURL}/jump/${difficulty}`);
      return response;
    },
    run: async (difficulty) => {
      const response = await axiosInstance.get(`${gameURL}/run/${difficulty}`);
      return response;
    },
    train: async (difficulty) => {
      const response = await axiosInstance.get(
        `${gameURL}/train/${difficulty}`
      );
      return response;
    },
  },
  post: {},
  put: {},
  delete: {},
};
