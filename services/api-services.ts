import axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { createClient } from "@/lib/supabase/client";
import { InviteApplicant, User, } from "@/lib/validations/user";
import { ContractDataType, } from "@/lib/validations/contracts-schema";
import { IdValidation } from "@/lib/validations/identify-validation-schema";


const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        Accept: "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<AxiosRequestHeaders>) => {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session?.access_token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response.status === 401) {
            // Handle authentication errors
            // For example, redirect to the login page
        } else {
            // Handle other errors
        }
        return Promise.reject(error);
    }
);




export const getUser = async (): Promise<AxiosResponse<User>> => {
    return api.get<User>(`/users/current/`);
};

export const getApplicantList = async () => {
    return api.get("/users/applicants/");
};


export const postInviteApplicant = async (data: InviteApplicant) => {
    return api.post<InviteApplicant>("/users/applicants/invite/", data);
};


export const getContracts = async (): Promise<AxiosResponse<ContractDataType>> => {
    return api.get<ContractDataType>("/contracts/current/", {
        headers: {
            "x-api-key": "APIKEY",
        }
    });
};


export const postIdVerification = async (data: IdValidation): Promise<AxiosResponse<IdValidation>> => {
    return api.post<IdValidation>("/users/id-verification", data);
};