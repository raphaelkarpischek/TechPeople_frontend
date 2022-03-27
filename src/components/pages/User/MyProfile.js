import api from '../../../utils/api'

import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
  
import styles from './Dashboard.module.css'

import RoundedImage from '../../layouts/RoundedImage'
import useFlashMessage from '../../../hooks/useFlashMessage'

import { Context } from '../../../context/UserContext'

function MyProfile() {
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const { deleteUser } = useContext(Context)

    useEffect(() => {
        api.get('/usuarios/check', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    async function removeUser() {
        await api.delete('/usuarios/exclusao', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            return err.response.data
        })
        deleteUser()
    }

    async function handleStatus() {

        let msgType = 'success'

        const data = await api.patch('/usuarios/visibilidade').then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        window.scrollTo(0, 0)
        setFlashMessage(data.message,msgType)

        setTimeout(() => {
            window.location.reload()
        }, 600)
    }

    return (
        <section>
            <div className={styles.user_profile_header}>
                <h1>{`Olá, ${user.nome}!`}</h1>
            </div>
            <div className={styles.user_profile_container}> 
                <div className={styles.user_profile_card}>
                    <div className={styles.user_profile_card_img}>
                    <RoundedImage 
                        src={`https://techpeople-backend.herokuapp.com/images/usuarios/${user.imagem}`} 
                        alt={user.nome}
                        width="px100"
                    />
                    </div>
                    <h3>{user.nome}</h3>
                    <p>
                        <span className="bold">Estado: </span> {user.estado}
                    </p>
                    <p>
                        <span className="bold">Telefone: </span> {user.telefone}
                    </p>
                    <p>
                        <span className="bold">Área: </span> {user.area}
                    </p>
                    <p>
                        <span className="bold">Tecnologias: </span> {user.tecnologia}
                    </p>
                    
                    <div className={styles.actions}>
                    <Link to={`/user/edit/`} id={styles.edit}>Editar</Link>
                    <Link onClick={() => {
                        var confirm=window.confirm("Tem certeza que deseja apagar seu perfil? Esta ação não pode ser revertida!");
                        if (confirm === true) {
                            removeUser()
                        }
                    }} id={styles.delete}> Excluir Perfil
                    </Link>
                    </div>
                </div>
                <div className={styles.user_status}>
                    <h1>{`Total de visitas: ${user.visita}`}</h1>
                    {user.visivel === true && 
                        <div className={styles.turn_off}>
                            <p>Seu perfil está ATIVO para buscas</p>
                            <input 
                                type="submit" 
                                onClick={handleStatus} 
                                value="Desativar Perfil" 
                            />
                        </div>
                    }
                    {user.visivel === false && 
                        <div className={styles.turn_on}>
                            <p>Seu perfil está INATIVO para buscas</p>
                            <input 
                                type="submit" 
                                onClick={handleStatus} 
                                value="Ativar Perfil" 
                            />
                        </div>
                    }  
                </div> 
            </div>
        </section>
    )
}

export default MyProfile