import "./Register.css"
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast'
import axios from "axios";
import Video from '../../Shared/img/PeopleBusiness.mp4'
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";


function EmailRegister() {

    let navigate = useNavigate()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const toast = useRef<Toast>(null);
    const [sex, setSex] = useState('female');
    const [birthdate, setBirthdate] = useState<Date | Date[] | string>(new Date());


    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };

    const novoUsuario = async (e: any) => {

        e.preventDefault();
        if (user !== '' && password !== '' && firstName !== "" && lastName !== '' && confirmationPassword !== '') {

            if (password === confirmationPassword) {
                try {
                    const result = await axios.post(`${process.env.REACT_APP_API_URL}/v2/users`, {

                        email: user,
                        password: password,
                        given_name: firstName,
                        family_name: lastName,
                        gender: sex,
                        birthdate,
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

                        <label>Primeiro Nome</label>
                        <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                        <label>Segundo Nome</label>
                        <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} />

                        <label>Data de Nascimento</label>
                        <Calendar value={birthdate} onChange={(e) => setBirthdate(e.target.value!)} />

                        <label>Sexo</label>
                        <Dropdown value={sex} onChange={(e) => setSex(e.value)} options={[{ label: 'Feminino', value: 'female' }, { label: 'Masculino', value: 'male' }]} optionLabel="label"
                            className="w-full md:w-14rem" optionValue="value" />

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