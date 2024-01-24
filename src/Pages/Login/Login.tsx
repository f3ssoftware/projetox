import "./Login.css"
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast'
import SVGLogo from '../../Shared/img/LogoSVG'
import Video from '../../Shared/img/PeopleBusiness.mp4'
import httpService from "../../Shared/HttpHelper/pjx-http.helper";

export default function Login() {

    let navigate = useNavigate()
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');

    const toast = useRef<Toast>(null);


    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };

    useEffect(() => {


    }, []);

    async function LogUser(e: any) {

        e.preventDefault();
        if (user !== '' && senha !== '') {

            try {
                const result = await httpService.post(`${process.env.REACT_APP_API_URL}/v2/authentication/login`, {
                    email: user,
                    password: senha,
                });

                sessionStorage.setItem("access_token", result?.data.access_token);
                sessionStorage.setItem("refresh_token", result?.data.refresh_token);
                navigate('/dashboard', { replace: true })
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

        <div className="login-container">

            <div className="login-fitting" style={{padding: '0', margin: '0' }}>

                <video loop autoPlay muted style={{padding: '0', margin: '0' }}>
                    <source src={Video} type="video/mp4" />
                </video>
            </div>

            <div className="login" style={{margin: '0', padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{height: '50%'}}>

                    <div className="logo">
                        <SVGLogo fill="#2B2B2B" width={250} height={250} />
                    </div>

                    <form onSubmit={(e) => LogUser(e)}>
                        <Toast ref={toast} />
                        <div className="login-user" style={{ width: "100%" }}>

                            <label>Usuário</label>
                            <InputText value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>
                        <div style={{ marginTop: "1%", width: "100%" }}>
                            <label>Senha</label>
                            <Password value={senha} onChange={(e) => setSenha(e.target.value)} feedback={false} />

                        </div>

                        <Button label="Entrar" onClick={(e) => LogUser(e)} style={{ marginTop: "10%" }} />

                        <div className="Register" style={{ marginTop: "5%" }}>
                            <Link to={`/register`}>Não possuo conta</Link>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

