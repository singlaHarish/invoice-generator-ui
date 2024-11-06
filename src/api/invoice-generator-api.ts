import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { MemoDetails } from '../models/InvoiceModels';
import { invoice_api_base_url } from '../support/Constants';
import { RootState } from '../redux/store';

// Define types for the base query parameters
interface AxiosBaseQueryArgs {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // or other HTTP methods as needed
    data?: any;
  }

const axiosBaseQuery = async ({ url, method, data }: AxiosBaseQueryArgs) => {
    try {
      const result = await axios({ url, method, data });
      return { data: result.data };
    } catch (error) {
      let axiosError = error as AxiosError
      return { error: axiosError.response?.data || axiosError.message };
    }
  };

const baseQuery = ({ baseUrl }: {baseUrl: string} = {baseUrl: ''}): BaseQueryFn<
{
  url: string,
  method: AxiosRequestConfig['method'],
  data?: AxiosRequestConfig['data'],
  params?: AxiosRequestConfig['params'],
  headers?: AxiosRequestConfig['headers']
}
> => 
async( { url, method, data, params, headers}, {getState}) => {
  try {
    const state = getState() as RootState
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers
    })
    return { data: result.data };
  } catch (error) {
    let axiosError = error as AxiosError
    return { error: axiosError.response?.data || axiosError.message };
  }
}

export const invoiceGeneratorApi = createApi({
    reducerPath: 'invoice-generator-app',
    baseQuery: baseQuery({
      baseUrl: invoice_api_base_url,
    }),
    endpoints: (builder) => ({
        saveMemoDetails: builder.mutation<void, MemoDetails>({
            query: (memoDetails: MemoDetails) => ({
                url: '/memo/items',
                method: 'POST',
                data: memoDetails
            }),
        }),
    }),
})

export const { useSaveMemoDetailsMutation } = invoiceGeneratorApi;


