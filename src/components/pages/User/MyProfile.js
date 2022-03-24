import api from '../../../utils/api'

import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
  
import styles from './Dashboard.module.css'

import RoundedImage from '../../layouts/RoundedImage'

import { Context } from '../../../context/UserContext'

function MyProfile() {
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
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
        api.patch('/usuarios/visibilidade').then((response) => {
            window.location.reload()
        })
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
                        src={`${process.env.REACT_APP_API}/images/usuarios/${user.imagem}`} 
                        alt={user.nome}
                        width="px100"
                    />
                    </div>
                    <h3>{user.nome}</h3>
                    <p>
                        <span className="bold">Estado: </span> {user.estado}
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
                        var confirm=window.confirm("Tem certeza que deseja apagar seu perfil?");
                        if (confirm === true) {
                            removeUser()
                        }
                    }} id={styles.delete}> Excluir Perfil
                    </Link>
                    </div>
                </div>
                <div className={styles.userStatus}>
                    <h1>{`Total de visitas: ${user.visita}`}</h1>
                    {user.visivel === true && 
                        <div>
                            <p>Seu perfil está ATIVO para buscas</p>
                            <input 
                                type="submit" 
                                onClick={handleStatus} 
                                value="Desativar" 
                            />
                        </div>
                    }
                    {user.visivel === false && 
                        <div>
                            <p>Seu perfil está INATIVO para buscas</p>
                            <input 
                                type="submit" 
                                onClick={handleStatus} 
                                value="Ativar" 
                            />
                        </div>
                    }  
                </div> 
            </div>
        </section>
    )
}

export default MyProfile