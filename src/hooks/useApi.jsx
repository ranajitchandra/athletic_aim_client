import useAxiosBase from "./useAxiosBase";

export default function useApi() {

    const axiosBase = useAxiosBase()

    const PostedJobPromise = email => {
        return axiosBase(`/jobs/applicantCount?email=${email}`)
            .then(res => res.data)
    }

    const myApplicationPromise = email => {
        return axiosBase(`/applications?email=${email}`)
            .then(res => res.data)
    }

    return {
        PostedJobPromise,
        myApplicationPromise
    }
}