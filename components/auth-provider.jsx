'use client'

import { auth } from "@/firebase/config"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [authLoaded, setAuthLoaded] = useState(false)


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, _user => {
            setUser(_user)
            setAuthLoaded(true)
        })

        return () => unsub()
    }, [])

    const register = async (values) => {
        const toastId = toast.loading('Creating account...')
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)

            if(!userCredential.user) {
                throw new Error('Something went wrong, please try again later.')
            }
            console.log(userCredential);

            await updateProfile(userCredential.user, {
                displayName: `${values.firstName} ${values.lastName}`
            })

            toast.success('Account created!', { id: toastId })
        } catch (err) {
            console.log(err.message);
            console.log(err.code);
            const message = err.code.split('/')[1].replace(/-/g, ' ')
            toast.error(message || err.message, { id: toastId })
        }
    }

    const login = async (values) => {
        const toastId = toast.loading('Signing in...')
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)

            if(!userCredential.user) {
                throw new Error('Something went wrong, please try again later.')
            }

            toast.success('Signed in!', { id: toastId })
            
        } catch (err) {
            console.log(err.message);
            const message = err.code.split('/')[1].replace(/-/g, ' ')
            toast.error(message || err.message, { id: toastId })
        }
    }


    const value = {
        user,
        authLoaded,
        register,
        login
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth must be inside an AuthcontextProvider')

    return context
}