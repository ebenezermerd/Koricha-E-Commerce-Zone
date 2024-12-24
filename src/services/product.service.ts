// src/services/product.service.ts
import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';
import { IProductItemProps } from 'src/types/product';

export const productService = {
  getProducts: async (): Promise<IProductItemProps[]> => {
    const response = await axios.get(endpoints.product.list);
    return response.data;
  },

  getProduct: async (id: string): Promise<IProductItemProps> => {
    const response = await axios.get(`${endpoints.product.details}/${id}`);
    return response.data;
  },

  searchProducts: async (query: string): Promise<IProductItemProps[]> => {
    const response = await axios.get(`${endpoints.product.search}?query=${query}`);
    return response.data;
  }
};