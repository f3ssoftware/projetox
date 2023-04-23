import "./Login.css"
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import axios from "axios";

import { Toast } from 'primereact/toast';

        


export default function Login() {

    let navigate = useNavigate()
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState(false);
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('');



    async function LogUser() {

        if (user !== '' && senha !== '') {

            try{
            const result = await axios.post('https://dev-api.pjx.f3ssoftware.com/v1/authentication/login', {

                username: user,
                password: senha,

            })
               
                    setAccessToken(result.data.access_token)
                    setRefreshToken(result.data.refresh_token)
                    sessionStorage.setItem("access_token", accessToken);
                    sessionStorage.setItem("refresh_token", refreshToken);
                    navigate('/admin', {replace: true})

                }
                
                catch{
                     alert('Usuário não credenciado.')

                }
        }

        else {
            alert('Insira os dados em todos os campos')
        }






    }

    return (

        <div className="container">
            <div className="fitting" />
            <div className="login">
                <div className="pull-everybody">
                    <div style={{ marginTop: "2%", width: "100%" }}>
                        <label>Usuário</label>
                        <InputText value={user} onChange={(e) => setUser(e.target.value)} />
                        {/* <input type="email" value={user}
                            onChange={(e) => setUser(e.target.value)} /> */}
                    </div>
                    <div style={{ marginTop: "1%", width: "100%" }}>
                        <label>Senha</label>
                        <Password value={senha} onChange={(e) => setSenha(e.target.value)} feedback={false} />
                        {/* <input value={senha}
                            onChange={(e) => setSenha(e.target.value)} /> */}
                    </div>
                    
                    <Button label="Entrar" onClick={LogUser} style={{ marginTop: "10%" }} />
                    {/* <button onClick={logUser}>Entrar</button> */}
                    <div className="Register" style={{ marginTop: "5%" }}>
                        <Link to={`/register`}>Não possuo conta</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

