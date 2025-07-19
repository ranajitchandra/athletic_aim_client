import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"

export default function UserAuthContext() {
    const userAuthInfo = useContext(AuthContext)
    return userAuthInfo
}