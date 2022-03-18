import { useState, useContext } from 'react'

import Input from '../../form/Input'
import Select from '../../form/Select'

import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* contexts */
import {Context} from '../../../context/UserContext'

function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)
    
    const areas = ["Desenvolvedor back-end", "Desenvolvedor front-end", 
    "Desenvolvedor Full-stack", "DBA", "Scrum Master", "Tech Lead"]
    const states = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", "Maranhão",
        "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernanbuco", "Piauí", "Rio de Janeiro", 
        "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins", "Distrito Federal"
    ] 

    function onFileChange(e) {
        setUser({...user, [e.target.name]: e.target.files[0] })
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value })
    }

    function handleArea(e) {
        setUser({...user, area: e.target.options[e.target.selectedIndex].text})
    }

    function handleState(e) {
        setUser({...user, estado: e.target.options[e.target.selectedIndex].text})
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        register(formData)
    }

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="nome"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Email"
                    type="text"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="telefone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                />
                <Select
                    name="estado"
                    text="Selecione o seu estado"
                    options={states}
                    handleOnChange={handleState}
                    value={user.estado || ''}
                />
                <Select
                    name="area"
                    text="Selecione a sua área"
                    options={areas}
                    handleOnChange={handleArea}
                    value={user.area || ''}
                />
                <Input
                    text="Descrição"
                    type="textarea"
                    name="descricao"
                    placeholder="Descreva o seu perfil"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Tecnologias"
                    type="text"
                    name="tecnologia"
                    placeholder="Digite quais tecnologias você conhece"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="senha"
                    placeholder="Digite uma senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmacaosenha"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já tem uma conta? <Link to="/login">Clique aqui</Link>
            </p>
        </section>
    )
}

export default Register