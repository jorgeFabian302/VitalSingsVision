import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";


interface Options{
    baseURL: string;
    params: Record<string, string>
}

export  class AxiosAdapter implements HttpAdapter{

    private axiosInstace: AxiosInstance;

    constructor( options: Options){
        this.axiosInstace = axios.create({
            baseURL: options.baseURL,
            params: options.params,
        })
    }

    //Conexion en axios para retener los JSON de la API
    async get<T>(url: string, options?: Record<string, unknown> | undefined): Promise<T> {
        try{
            const { data } = await this.axiosInstace.get<T>(url, options);

            return data;

        }catch (error){
            throw new Error(`Error feching Get: ${ url }`);
            
        }
    }

}