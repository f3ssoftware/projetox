import "./Login.css"
import { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import axios from "axios";
import { Toast, ToastMessage } from 'primereact/toast'

export default function Login() {

    let navigate = useNavigate()
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState(false);
    const toast = useRef<Toast>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };


    async function LogUser() {

        if (user !== '' && senha !== '') {

            try {
                const result = await axios.post(`${process.env.REACT_APP_API_URL}/v1/authentication/login`, {

                    username: user,
                    password: senha,

                })

                sessionStorage.setItem("access_token", result.data.access_token);
                sessionStorage.setItem("refresh_token", result.data.refresh_token);
                navigate('/admin', { replace: true })

            }

            catch (err: any) {
                //  alert('Usuário não credenciado.')
                show('error', 'Erro', 'Usuário não credenciado');

            }
        }

        else {
            show('warn', 'Atenção!', 'Insira os dados em todos os campos.');
        }






    }

    return (

        <div className="container">
            <div className="fitting" />
            <div className="login">
                <div className="pull-everybody">
                    <Toast ref={toast} />
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

