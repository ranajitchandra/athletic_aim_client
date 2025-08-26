import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://athletic-server.vercel.app`
})

const useAxiosApi = () => {
    return axiosInstance;
};

export default useAxiosApi;