import "./RegisterStep1.css"
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast'
import SVGLogo from '../../Shared/img/LogoSVG'
import Video from '../../Shared/img/PeopleBusiness.mp4'
import httpService from "../../Shared/HttpHelper/pjx-http.helper";


function Register() {

    let navigate = useNavigate()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const toast = useRef<Toast>(null);


    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };

    const novoUsuario = async () => {



        if (user !== '' && password !== '' && firstName !== "" && lastName !== '' && confirmationPassword !== '') {

            if (password === confirmationPassword) {
                try {
                    const result = await httpService.post(`${process.env.REACT_APP_API_URL}/v1/users`, {

                        email: user,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                    })


                    navigate('/', { replace: true })

                }

                catch (err: any) {
                    console.log(err);
                    // alert('Falha ao registrar usuário.')
                    show('error', 'Error', err.response.data.message);
                }
            }
            else {
                show('warn', 'Warn', 'Favor inserir senha e confirmação de senha iguais.');
            }
        }
        else {
            // alert('Insira os dados em todos os campos.')
            show('warn', 'Warn', 'Favor inserir os dados em todos os  campos.');


        }
    }


    return (

        <div className="container">
            <Toast ref={toast} />
            <div className="fitting">
                <video width="100%" height="100%" style={{ objectFit: "cover" }} loop autoPlay muted >
                    <source src={Video} type="video/mp4" />
                </video>
            </div>

            <div className="reg_step1">

                <div className="logo">
                    <SVGLogo fill="#2B2B2B" width={200} height={250} />
                </div>

                <div className="step1-content">
                    <div className="email-content">
                        <Button style={{ backgroundColor: 'white', color: '#54D0F6', textTransform: 'uppercase', fontSize: '85%', fontWeight: 'bold' }} label="Registar utilizando email" onClick={() => navigate('/email_register')}/>
                        <div className="fit-email-content">
                            <div className="trace"></div>
                            <span>ou</span>
                            <div className="trace"></div>
                        </div>
                    </div>

                    <div className="socialMidia-register">

                        <Button style={{ backgroundColor: 'white', color: '#54D0F6', textTransform: 'uppercase', fontSize: '85%', fontWeight: 'bold', marginTop:'8%'  }} label="Registar com Google" />
                        <Button style={{ backgroundColor: 'white', color: '#54D0F6', textTransform: 'uppercase', fontSize: '85%', fontWeight: 'bold', marginTop:'3%' }} label="Registar com Facebook" />
                        <Button style={{ backgroundColor: 'white', color: '#54D0F6', textTransform: 'uppercase', fontSize: '85%', fontWeight: 'bold', marginTop:'3%' }} label="Registar com Instagram" />

                    </div>

                    <div className="back-login">
                        <Link to={`/login`}>Retornar ao Login</Link>
                    </div>


                </div>
            </div>
        </div>

    );
}

export default Register;