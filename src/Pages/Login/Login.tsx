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
                if (err.code == 403) {
                    show('error', 'Erro', 'Usuário não credenciado');
                }
                else if(err.code == 409){
                    navigate(`/token?email=${user}`, { replace: true }); 
                }
            }
            // finally {
            //     // Para o spinner após o término da requisição (com sucesso ou erro)
            //     setLoading(false);
            // }
        }

        else {
            show('warn', 'Atenção!', 'Insira os dados em todos os campos.');
        }

    }

    return (

        <div className="login-container">

            <div className="login-fitting" style={{ padding: '0', margin: '0' }}>

                <video loop autoPlay muted style={{ padding: '0', margin: '0' }}>
                    <source src={Video} type="video/mp4" />
                </video>
            </div>

            <div className="login" style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <div className="grid" >
                    <div className="col-12 " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="logo">
                            <SVGLogo fill="#2B2B2B" width={250} height={250} />
                        </div>
                    </div>

                    <div className="col-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10%', color: 'white' }}>
                        <form onSubmit={(e) => LogUser(e)} style={{ maxWidth: '100%' }}>
                            <Toast ref={toast} />
                            <div className="login-user" style={{ width: "100%", maxWidth: '100%' }}>
                                <div style={{ marginBottom: '2%' }}>
                                    <label >Usuário</label>
                                </div>
                                <InputText value={user} onChange={(e) => setUser(e.target.value)} />
                            </div>
                            <div style={{ marginTop: "1%", width: "100%" }}>
                                <div style={{ marginBottom: '2%' }}>
                                    <label>Senha</label>
                                </div>
                                <Password value={senha} onChange={(e) => setSenha(e.target.value)} feedback={false} />

                            </div>

                            <Button label="Entrar" onClick={(e) => LogUser(e)} style={{ marginTop: "10%" }} />
                            {/* {loading && <ProgressSpinner style={{ width: '30px', height: '30px', margin: '10px' }} />} */}

                            <div className="Register" style={{ marginTop: "5%" }}>
                                <Link to={`/register`}>Não possuo conta</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

