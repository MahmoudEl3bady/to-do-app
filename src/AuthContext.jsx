import {createContext , useState,useContext} from 'react';

//  Custom Hook for Login Authentication

const AuthContext = createContext();

export const useAuth = ()=>useContext(AuthContext);

export const AuthProvider = ({children})=>{
    const [ userData , setUserData] = useState(null);
    return (
        <AuthContext.Provider value = {{userData,setUserData}} >
            {children}
        </AuthContext.Provider>
    )
}