// src/api/services/authService.js
import api from "./axios";
import { QueryFormData } from "../types";

export const queyForm = {
    
  submitForm: async (data: QueryFormData) => {
    try {
      console.log("vite url: ", import.meta.env.VITE_API_URL)
      const response = await api.post("/api/query-form", data);
      console.log("query form data: ",response.data);
      return response.data;
    } catch (error) {
      console.log("error in query-form: ", error);
    }
  },
};
