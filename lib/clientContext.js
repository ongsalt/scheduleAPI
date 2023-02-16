import { createContext, useContext, useState, useEffect } from "react";
import Pocketbase, { LocalAuthStore } from "pocketbase";
import { useRouter } from "next/router";


const globalContext = createContext({

})

const initPocketBase = (fallback = false) => {
    if (fallback) {
        return new Pocketbase('http://127.0.0.1:8090', LocalAuthStore)
    } else {
        console.log('fallback pb client')
        return new Pocketbase('http://127.0.0.1:8090')
    }
}


const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false)

    const router = useRouter()

    const pb = initPocketBase()

    // console.log({ global: pb })

    pb.authStore.onChange(() => {
        setUser(pb.authStore.model)
    })

    useEffect(() => {
        setUser(pb.authStore.model)
    }, [])


    const login = async (username, password) => {
        try {
            const result = await pb.collection('users').authWithPassword(username, password)
            setUser(pb.authStore.model);
            setError(null)
            setShowError(false)
            return result
        } catch (e) {
            console.log(e)
            setError('Username or password is incorrect')
            setShowError(true)
        }
    }
    const logout = () => {
        pb.authStore.clear()
        setUser(pb.authStore.model);
    }

    const pack = {
        pb, login, logout, user,
        error, setError,
        loading, setLoading,
        error, setError,
        showError, setShowError, router
    }

    return (
        <globalContext.Provider value={pack}>
            {children}
        </globalContext.Provider>
    )
}

const useAuth = () => {
    // { pb, login, logout }
    return useContext(globalContext);
}

export { globalContext, useAuth, initPocketBase }
export default GlobalProvider