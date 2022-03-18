import {Link} from 'react-router-dom'
import { useContext } from 'react'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/techpeople_logo.png'

/* context */
import { Context } from '../../context/UserContext'

function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="TechPeople" />
                <h2>TechPeople</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Encontrar um DEV</Link>
                </li>
                {authenticated ? (
                    <>
                        <li>
                            <Link to="/user/profile">Meu perfil</Link>
                        </li>
                        <li onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>                   
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>                   
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
  }

export default Navbar