import api from '../../utils/api'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import RoundedImage from '../layouts/RoundedImage'

import styles from './Home.module.css'
 
function Home() {
    const [users, setUsers] = useState({})
        
    useEffect(() => {
        api.get('/usuarios').then((response) => {
            setUsers(response.data.usuarios)
        })
    }, [])

    return (
        <section>
            <div className={styles.user_home_header}>
                <h1>Conheça os nossos DEVs</h1>
            </div>
            <div className={styles.user_container}>
                {users.length > 0 && 
                   users.map((user) => (
                        <div className={styles.user_card}>
                            <div className={styles.user_card_img}>
                            <RoundedImage 
                                src={`${process.env.REACT_APP_API}/images/usuarios/${user.imagem}`} 
                                alt={user.nome}
                                width="px100"
                            />
                            </div>
                            <h3>{user.nome}</h3>
                            <h4>{user.area}</h4>
                            <div className={styles.user_card_icons}>
                                <a href="google" className={styles.user_card_icons}><i class="bi bi-github" /></a>
                                <a href="google"><i class="bi bi-linkedin"/></a>
                            </div>
                            <Link to={`/user/${user.id}`}>Ver mais</Link>
                         </div>
                   ))
                }
                {users.lenght === 0 && (
                    <p>Não há DEVs cadastrados em nossa base no momento</p>
                )}
            </div>
        </section>
    )
}

export default Home