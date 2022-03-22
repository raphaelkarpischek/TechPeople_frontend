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
                </div> 
                <div className={styles.actions}>
                        <button onClick={() => {
                            removeUser()
                        }}
                        >
                            Excluir Perfil
                        </button>
                        <br></br>
                        <Link to={`/user/edit/`}>Editar</Link>
                    </div>
            </div>
        </section>
    )
}

export default MyProfile