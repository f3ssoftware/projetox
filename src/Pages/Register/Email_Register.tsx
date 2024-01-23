import "./Register.css"
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast, ToastMessage } from 'primereact/toast'
import Video from '../../Shared/img/PeopleBusiness.mp4'
import httpService from "../../Shared/HttpHelper/pjx-http.helper";

interface Gender {
    gender: string;
}

function EmailRegister() {

    let navigate = useNavigate()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const toast = useRef<Toast>(null);
    const gender: Gender[] = [
        { gender: 'Masculino' },
        { gender: 'Feminino' },
    ];


    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };

    const novoUsuario = async (e: any) => {

        e.preventDefault();
        if (user !== '' && password !== '' && firstName !== "" && lastName !== '' && confirmationPassword !== '') {

            if (password === confirmationPassword) {
                try {
                    const result = await httpService.post(`${process.env.REACT_APP_API_URL}/v1/users`, {

                        email: user,
                        password: password,
                        gender: selectedGender,
                        given_name: firstName,
                        family_name: lastName,
                        birthdate: birthdate,
                    })
                    show('success', 'Success', 'Usuário registrado com sucesso.');

                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 3000);


                }

                catch (err: any) {
                    console.log(err);

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
            <div className="fitting">
                <video width="100%" height="100%" style={{ objectFit: "cover" }} loop autoPlay muted >
                    <source src={Video} type="video/mp4" />
                </video>
            </div>

            <div className="reg">
                <div className="register-pull-everybody" >
                    <Toast ref={toast} />

                    <form onSubmit={(e) => novoUsuario(e)}>
                        <label>Email</label>
                        <InputText value={user} onChange={(e) => setUser(e.target.value)} />

                        <label>Senha</label>
                        <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />

                        <label>Confirmar Senha</label>
                        <Password value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} feedback={false} />

                        <label>Sexo</label>
                        <Dropdown value={selectedGender} onChange={(e) => setSelectedGender(e.value)} options={gender} optionLabel="gender"
                         className="w-full md:w-14rem" />

                        <label>Primeiro Nome</label>
                        <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                        <label>Segundo Nome</label>
                        <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} />

                        <Button label="Registrar" onClick={(e) => novoUsuario(e)} style={{ marginTop: "10%" }} />

                        <div className="go-to-login" style={{ marginTop: "5%" }}>
                            <Link to={`/login`}>Já possuo conta</Link>
                        </div>

                    </form>
                </div>
            </div>


        </div>
    );
}

export default EmailRegister;