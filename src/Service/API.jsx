import axios from "axios";
import Config from "../Config/Config";

const APIService = axios.create({
  baseURL: Config.baseUrl,
  headers: {
    "Content-Type": "application/json",
    // Add other headers if needed token
  },
});

export const getReq = async (route) => {
  try {
    const response = await APIService.get(route);
    return response.data;
  } catch (error) {
    console.error("Error get req:", error);
    throw error;
  }
};

export const postReq = async (route, newPost) => {
  try {
    const response = await APIService.post(route, newPost);
    return response.data;
  } catch (error) {
    console.error("Error add req:", error);
    throw error;
  }
};

export const patchReq = async (route, payload) => {
  try {
    const response = await APIService.patch(route, payload);
    return response.data;
  } catch (error) {
    console.error("Error patch req:", error);
    throw error;
  }
};

export const deleteReq = async (route, payload) => {
  try {
    const response = await APIService.delete(route, payload);
    return response.data;
  } catch (error) {
    console.error("Error deleting :", error);
    throw error;
  }
};

export const putReq = async (route, payload) => {
  try {
    const response = await APIService.put(route, payload);
    return response.data;
  } catch (error) {
    console.error("Error put :", error);
    throw error;
  }
};
export default APIService;
