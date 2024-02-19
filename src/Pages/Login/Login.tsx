import "./Login.css"
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import axios from "axios";
import { Toast, ToastMessage } from 'primereact/toast'
import SVGLogo from '../../Shared/img/LogoSVG'
import Video from '../../Shared/img/PeopleBusiness.mp4'
import httpService from "../../Shared/HttpHelper/pjx-http.helper";
import { authenticateCognito, signUpCognito } from "../../Shared/GoogleAuth/GoogleAuth";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Login() {

    let navigate = useNavigate()
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);


    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };

    async function LogUser(e: any) {

        e.preventDefault();
        if (user !== '' && senha !== '') {

            // await authenticateCognito(user, senha).then(() => {
            //     navigate('/dashboard', { replace: true })
            // })
            setLoading(true);

            try {
                const result = await httpService.post(`${process.env.REACT_APP_API_URL}/v2/authentication/login`, {
                    email: user,
                    password: senha,
                });

                sessionStorage.setItem("access_token", result?.data.accessToken.jwtToken);
                sessionStorage.setItem("refresh_token", result?.data.refreshToken.token);
                navigate('/dashboard', { replace: true })

            }


            catch (err: any) {
                console.log(err)
                if (err.code == 401) {
                    show('error', 'Erro', 'Usuário ou senha incorretos');
                }
                if (err.code == 403) {
                    show('error', 'Erro', 'Usuário não credenciado');
                }
                else if (err.code == 409) {
                    navigate(`/token?email=${user}`, { replace: true });
                }
            }
            finally {
                // Para o spinner após o término da requisição (com sucesso ou erro)
                setLoading(false)
            }

        }

        else {
            show('warn', 'Atenção!', 'Insira os dados em todos os campos.');
        }

    }

    return (

        <div className="container">

            <div className="fitting">

                <video width="100%" height="100%" style={{ objectFit: "cover" }} loop autoPlay muted >
                    <source src={Video} type="video/mp4" />
                </video>
            </div>

            <div className="login">

                <div className="pull-everybody">
                    <Toast ref={toast} />
                    <div className="logo">
                        <SVGLogo fill="#2B2B2B" width={250} height={250} />
                    </div>

                    <form onSubmit={(e) => LogUser(e)}>

                        <div className="login-user" style={{ width: "100%" }}>

                            <label>Usuário</label>
                            <InputText value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>
                        <div style={{ marginTop: "1%", width: "100%" }}>
                            <label>Senha</label>
                            <Password value={senha} onChange={(e) => setSenha(e.target.value)} feedback={false} toggleMask />

                        </div>

                        <Button label="Entrar" onClick={(e) => LogUser(e)} style={{ marginTop: "10%" }} />
                        {loading && <ProgressSpinner style={{ width: '100%', height: '30px', marginTop: '3%', display: 'flex', justifyContent: 'center' }} />}

                        <div className="Register" style={{ marginTop: "5%" }}>
                            <Link to={`/register`}>Não possuo conta</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    )
}