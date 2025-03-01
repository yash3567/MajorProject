import { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios';
const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const localData = localStorage.getItem("token")
        console.log(localData)
        if (localData) {
        
        setAuth({
            ...auth,
            user: localData.user,
            token: localData.token,
        });
        }
    
    }, []);


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth };
