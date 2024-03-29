import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const history = useHistory()

    useEffect(() => {

        const token = localStorage.getItem('token')

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    },[])

    async function register(formData) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/usuarios/cadastro', formData, {
                'Content-Type': 'multipart/form-data'
            }).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch(error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function login(user) {
        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'
        
        try {
            const data = await api.post('/usuarios/login', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch(error) {
            msgText = error.response.data.message
            msgType = 'error'

        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        history.push('/user/profile')
        setTimeout(() => {
            window.location.reload()
        },800)
    }

    function logout () {
        const msgText = 'Logout realizado com sucesso'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        history.push('/')

        setFlashMessage(msgText, msgType)
    }

    function deleteUser () {
        const msgText = 'Conta excluída com sucesso'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        history.push('/')

        setFlashMessage(msgText, msgType)
    }

    return { authenticated, register, logout, login, deleteUser }
}