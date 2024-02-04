import './Register.css'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Toast, ToastMessage } from 'primereact/toast'
import Video from '../../Shared/img/PeopleBusiness.mp4'
import httpService from "../../Shared/HttpHelper/pjx-http.helper";
import { Calendar } from "primereact/calendar";
import { BrazilState } from "../../Shared/enums/BrazilState";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import axios from "axios";
import { InputNumber } from "primereact/inputnumber";

interface Gender {
    gender: string;
}

function EmailRegister() {

    let navigate = useNavigate()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
    const [apiGender, setApiGender] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [birthdateToServer, setBirthdateToServer] = useState('');
    const toast = useRef<Toast>(null);
    const gender: Gender[] = [
        { gender: 'Masculino' },
        { gender: 'Feminino' },
    ];
    const [stateValue, setStateValue] = useState('');
    let maxDate = new Date();
    const brazilStates: BrazilState[] = Object.values(BrazilState);
    const [postalCodelValue, setPostalCodelValue] = useState<any>('');
    const [countyValue, setCountyValue] = useState('');
    const [neighborhoodValue, setNeighborhoodValue] = useState('');
    const [streetValue, setStreetValue] = useState('');
    const [numberValue, setNumberValueValue] = useState<number>(undefined!);
    const [complement, setComplement] = useState('');

    const checkPostalCode = async () => {
        try {
            const result = await axios.get(
                "https://viacep.com.br/ws/" + postalCodelValue + "/json/"
            );
            setStateValue(result.data.uf);
            setNeighborhoodValue(result.data.bairro);
            setStreetValue(result.data.logradouro);
            setCountyValue(result.data.localidade)

        } catch (err) {
            alert(err);
        }
    };

    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };

    const novoUsuario = async (e: any) => {

        e.preventDefault();
        if (user !== '' && password !== '' && firstName !== "" && lastName !== '' && confirmationPassword !== '') {

            if (password === confirmationPassword) {
                try {
                    await httpService.post(`${process.env.REACT_APP_API_URL}/v2/users`, {

                        email: user,
                        password: password,
                        gender: selectedGender?.gender,
                        given_name: firstName,
                        family_name: lastName,
                        birthdate: birthdate,
                        andress: {
                            state: stateValue,
                            city: countyValue,
                            district: neighborhoodValue,
                            zipcode: postalCodelValue,
                            street: streetValue,
                            number: numberValue,
                            complement: complement
                        }
                    })
                    show('success', 'Success', 'Usuário registrado com sucesso.');

                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 3000);


                }

                catch (err: any) {
                    console.log(err);

                    show('error', 'Error', err.response);
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

    useEffect(() => {
        if (postalCodelValue.length == 8) {
            checkPostalCode();
        }
        else {
            setStateValue('');
            setNeighborhoodValue('');
            setStreetValue('');
        }
    }, [postalCodelValue]);

    useEffect(() => {
        if (selectedGender?.gender == 'Masculino') {
            setApiGender('male')

        }
        else if (selectedGender?.gender == 'Feminino') {
            setApiGender('female')

        }
    }, [selectedGender]);



    return (

        <div className='register-container' style={{ backgroundColor: '#2B2B2B' }}>
            <Toast ref={toast} />

            <div className='grid' >

                <div className='col-8' style={{ height: '100%' }}>
                    <video width="100%" height='100%' style={{ objectFit: 'cover' }} loop autoPlay muted >
                        <source src={Video} type="video/mp4" />
                    </video>
                </div>


                <div className='col-4'>

                    <form onSubmit={(e) => novoUsuario(e)}>
                        <div style={{ height: '100vh' }}>
                            <div className="grid" style={{ fontSize: '15px', color: '#4F4F4F', height: '100%', padding: '5%' }}>

                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label>Email</label>
                                    <InputText value={user} onChange={(e) => setUser(e.target.value)} />
                                </div>

                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label>Senha</label>
                                    <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />
                                </div>
                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label>Confirmar Senha</label>
                                    <Password value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} feedback={false} />
                                </div>

                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label>Sexo</label>
                                    <Dropdown value={selectedGender} onChange={(e) => setSelectedGender(e.value)} options={gender} optionLabel="gender"
                                    />
                                </div>
                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label>Primeiro Nome</label>
                                    <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label>Segundo Nome</label>
                                    <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>

                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label htmlFor="birthdate">Data de Nascimento</label>
                                    <Calendar
                                        style={{ maxHeight: '70%' }}
                                        id='birthdate'
                                        value={birthdate}
                                        maxDate={maxDate}
                                        onChange={(e: any) => {
                                            setBirthdateToServer(e.target.value.toISOString());
                                            setBirthdate(e.target.value);
                                        }}
                                        touchUI
                                        selectionMode="single"
                                        locale="en"
                                        dateFormat="dd/mm/yy"
                                    />
                                </div>


                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label htmlFor="birthdate">CEP</label>
                                    <InputMask id="zipcode" name='postalCode' onChange={(e: InputMaskChangeEvent) => { setPostalCodelValue(e.target.value?.replace(/[^\d]/g, "")) }}
                                        mask="99999-999"

                                    />
                                </div>

                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label htmlFor="state">UF</label>
                                    <Dropdown value={stateValue} id="state" onChange={(e: DropdownChangeEvent) => { setStateValue(e.target.value) }} options={brazilStates}
                                    />
                                </div>
                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label htmlFor="state">Município</label>
                                    <InputText
                                        id="county" name='county'
                                        value={countyValue}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCountyValue(e.target.value) }}
                                    />
                                </div>
                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label htmlFor="state">Bairro</label>
                                    <InputText
                                        id='neighborhood'
                                        value={neighborhoodValue}
                                        onChange={(e) => { setNeighborhoodValue(e.target.value) }}
                                    />
                                </div>

                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label htmlFor="state">Logradouro</label>
                                    <InputText value={streetValue} onChange={(e) => { setStreetValue(e.target.value) }}
                                    />
                                </div>

                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label htmlFor="state">Número</label>
                                    <InputNumber style={{ width: '100%' }} value={numberValue} useGrouping={false}
                                        onChange={(e) => { setNumberValueValue(e.value!) }}
                                        maxLength={5}
                                    />
                                </div>

                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <label htmlFor="state">Complemento</label>
                                    <InputText
                                        id='complement'
                                        value={complement}
                                        onChange={(e) => { setComplement(e.target.value) }}
                                    />

                                </div>
                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <Button label="Registrar" onClick={(e) => novoUsuario(e)} style={{ marginTop: "3%" }} />
                                </div>
                                <div className="col-12" style={{ margin: '0', padding: '0' }}>
                                    <div className='register-link' style={{ marginTop: "2%", display: 'flex', justifyContent: 'center', color: 'rgb(84, 208, 246), ' }}>
                                        <Link to={`/login`}>Já possuo conta</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>


                </div>
            </div>

        </div>
    );
}

export default EmailRegister;