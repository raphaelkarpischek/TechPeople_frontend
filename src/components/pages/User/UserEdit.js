import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../form/Input'
import Select from '../../form/Select'

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'
import RoundedImage from '../../layouts/RoundedImage'

import useFlashMessage from '../../../hooks/useFlashMessage'

function UserEdit() {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')
    const history = useHistory()
    const areas = ["Desenvolvedor back-end", "Desenvolvedor front-end", 
    "Desenvolvedor Full-stack", "DBA", "Scrum Master", "Tech Lead"]
    const states = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", "Maranhão",
        "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", 
        "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins", "Distrito Federal"
    ] 

    useEffect(() => {
        api.get('/usuarios/check', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setUser(response.data)
            console.log(response)
        })
    }, [token])

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0] })
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value })
        console.log(user.name)
    }

    function handleState(e) {
        setUser({...user, estado: e.target.options[e.target.selectedIndex].text})
    }

    function handleArea(e) {
        setUser({...user, area: e.target.options[e.target.selectedIndex].text})
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'success'
        
        const formData = new FormData() 

        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        const data = await api.patch('/usuarios/edicao', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        if(msgType === 'success') {
            history.push('/user/profile')
        }
    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>{`Editando: ${user.nome}`}</h1>
                {(user.imagem || preview ) && (
                    <RoundedImage
                     src={
                         preview
                          ? URL.createObjectURL(preview) 
                          : `${process.env.REACT_APP_API}/images/usuarios/${user.imagem}`
                        }
                    alt={user.nome} 
                    width="px100"
                    />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
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
                    value={user.nome || ''}
                />
                <Input
                    text="Email"
                    type="text"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="telefone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                    value={user.telefone || ''}
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
                    value={user.descricao || ''}
                />
                <Input
                    text="Tecnologias"
                    type="text"
                    name="tecnologia"
                    placeholder="Digite quais tecnologias você conhece"
                    handleOnChange={handleChange}
                    value={user.tecnologia || ''}
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
                <input type="submit" value="Editar" />
            </form>
            
        </section>
        
    )
}



export default UserEdit