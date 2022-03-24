import api from '../../utils/api'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import RoundedImage from '../layouts/RoundedImage'

import styles from './Home.module.css'
 
function Home() {
    const [users, setUsers] = useState([])
        
    useEffect(() => {
        api.get('/usuarios').then((response) => {
            setUsers(response.data.usuarios)
        })
    }, [])

    function handleChange(e) {}

    function handleSearch(e) {}
    

    return (
        <section>
            <div className={styles.user_home_header}>
                <h1>Conheça os nossos DEVs</h1>
                {users.length > 0 &&
                <form onSubmit={handleSearch}>
                    <div className={styles.search}>
                        <input
                            text="Pesquisar por nome, "
                            type="text"
                            name="telefone"
                            placeholder="Procure por nome, tecnologia, ou área de atuação"
                            handleOnChange={handleChange}
                        />
                        <input type="submit" value="Buscar" />
                    </div>
                </form>
                }
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
                            <h5>{user.tecnologia}</h5>
                            <div className={styles.actions}>
                                <a href="google" id={styles.github_button}><i class="bi bi-github fa-7x"/></a>
                                <a href="google" id={styles.linkedin_button}><i class="bi bi-linkedin"/></a>
                            </div>
                            <Link to={`/user/${user.id}`}>Ver mais</Link>
                         </div>
                   ))
                }
                {users.length === 0 && (
                    <p>Ops! Não há DEVs cadastrados em nossa base no momento, volte mais tarde</p>
                )}
            </div>
        </section>
    )
}

export default Home