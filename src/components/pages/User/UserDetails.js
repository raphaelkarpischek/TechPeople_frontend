import api from "../../../utils/api"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import RoundedImage from "../../layouts/RoundedImage"

import styles from './UserDetails.module.css'

function UserDetails() {
    const [user, setUser] = useState({})
    const {id} = useParams()

    useEffect(() => {
        api.get(`/usuarios/${id}`).then((response) => {
            setUser(response.data)
        })
    }, [id])

    return(
        <section>
            <div class={styles.user_details_header}>
                <Link to={`/`}>Voltar</Link>
            </div>
                <div className={styles.user_details_container}>
                    <div className={styles.user_details_card}>
                        <div className={styles.user_details_card_img}>
                            <RoundedImage 
                                src={`${process.env.REACT_APP_API}/images/usuarios/${user.imagem}`} 
                                alt={user.nome}
                                width="px100"
                            />
                            </div>
                            <h3>{user.nome}</h3>
                            <h4>{user.area}</h4>
                            <p>
                                Descrição: {user.descricao}
                            </p>
                            <p>
                                Tecnologias: {user.tecnologia}
                            </p>

                                <a href="google" id={styles.github_button}><i class="bi bi-github fa-7x"/></a>
                                <a href="google" id={styles.linkedin_button}><i class="bi bi-linkedin"/></a>
                                <a href="google" id={styles.linkedin_button}><i class="bi bi-envelope-fill"/></a>
                                <a href="google" id={styles.linkedin_button}><i class="bi bi-whatsapp"/></a>
                        
                        </div>
            </div>
        </section>
    )
}

export default UserDetails