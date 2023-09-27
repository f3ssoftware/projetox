import { Button } from "primereact/button";
import { Formik, useFormik, Field, Form, ErrorMessage } from 'formik';
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Toast, ToastMessage } from 'primereact/toast';
import { classNames } from "primereact/utils";
import * as Yup from 'yup';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import { BrazilState } from '../../../Shared/enums/BrazilState';
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";

export default function Step2NaturalPerson() {


    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [telphoneValue, setTelphoneValue] = useState<any>('');
    const [SSN, setSSN] = useState<any>('');
    const [postalCodelValue, setPostalCodelValue] = useState<any>('');
    const [stateValue, setStateValue] = useState('');
    const [countyValue, setCountyValue] = useState('');
    const [neighborhoodValue, setNeighborhoodValue] = useState('');
    const [publicPlaceValue, setPublicPlaceValue] = useState('');
    const [numberValue, setNumberValueValue] = useState<number>(undefined!);
    const [birthday, setBirthday] = useState('');
    const toast = useRef<Toast>(null);
    const brazilStates: BrazilState[] = Object.values(BrazilState);

    const showStepToast = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show([{ severity, summary, detail }]);

    };

    let maxDate = new Date();
    const checkPostalCode = async () => {
        try {
            const result = await axios.get(
                "https://viacep.com.br/ws/" + postalCodelValue + "/json/"
            );
            setStateValue(result.data.uf);
            setNeighborhoodValue(result.data.bairro);
            setPublicPlaceValue(result.data.logradouro);
            setCountyValue(result.data.localidade)
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        if (postalCodelValue.length == 8) {
            checkPostalCode();
        }
        else {
            setStateValue('');

            setNeighborhoodValue('');
            setPublicPlaceValue('');
        }
    }, [postalCodelValue]);

    // useEffect(() => {
    //     console.log(brazilStates);
    // }, []);



    return (
        <div>
            <Toast ref={toast} />
            <Formik

                initialValues={{ completeName: '', telphone: '', email: '', SSN: '', postalCode: '', state: '', birthday: '', county: '', neighborhood: "", publicPlace: '', number: undefined }}
                validationSchema={Yup.object({

                    completeName: Yup.string()
                        .max(35, 'Precisa ter 35 caracteres ou menos')
                        .required('Necessário preencher'),


                    telphone: Yup.string()
                        .min(11, 'Favor inserir número completo com DDD')
                        .required('Inserir número com DDD'),
                    email: Yup.string().email('Formatação inválida de e-mail').required('Necessário preencher'),
                    SSN: Yup.string()
                        .min(11, '11 digitos')
                        .required('Necessário preencher'),
                    postalCode: Yup.string()
                        .min(8, 'CEP precisa ter necessáriamente 8 digitos')
                        .required('Necessário preencher'),
                    state: Yup.string()
                        .required('Necessário preencher'),
                    birthday: Yup.string()
                        .required('Necessário preencher'),
                    county: Yup.string()
                        .required('Necessário preencher'),
                    neighborhood: Yup.string()
                        .required('Necessário preencher'),
                    publicPlace: Yup.string()
                        .required('Necessário preencher'),
                    number: Yup.number()
                        .required('Necessário preencher'),
                })}

                onSubmit={(values, { setSubmitting }) => {

                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));

                        setSubmitting(false);
                    }, 400);

                }}


            >
                {formik => (

                    <form onSubmit={formik.handleSubmit}>

                        <div className="grid">


                            <div className="col-12">
                                <span className="p-float-label" >
                                    <InputText
                                        id="completeName" name='completeName'

                                        value={formik.values.completeName}
                                        onChange={(e) => {
                                            formik.setFieldValue("completeName", e.target.value);
                                            setNameValue(e.target.value);

                                        }}
                                        className={classNames({
                                            "p-invalid": formik.touched.completeName && formik.errors.completeName,
                                        })}
                                    />

                                    {formik.touched.completeName && formik.errors.completeName ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.completeName}</div>
                                    ) : null}

                                    <label htmlFor="completeName">Nome Completo*</label>
                                </span>
                            </div>
                        </div>

                        <div className="grid" style={{ marginTop: '2%' }}>
                            <div className="col-6">
                                <span className="p-float-label" >
                                    <InputText id="email" name='email'
                                        value={formik.values.email}
                                        onChange={(e) => {
                                            formik.setFieldValue("email", e.target.value);
                                            setEmailValue(e.target.value);
                                        }}

                                        className={classNames({
                                            "p-invalid": formik.touched.email && formik.errors.email,
                                        })}

                                    />

                                    {formik.touched.email && formik.errors.email ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.email}</div>
                                    ) : null}

                                    <label htmlFor="email">Email*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputMask value={formik.values.telphone}
                                        id="telphone" name='telphone' onChange={(e: InputMaskChangeEvent) => { setTelphoneValue(e.target.value?.replace(/[^\d]/g, "")); formik.setFieldValue("telphone", e.target.value?.replace(/[^\d]/g, "")) }}
                                        mask="+99 99 9999999?99"

                                        className={classNames({
                                            "p-invalid": formik.touched.telphone && formik.errors.telphone,
                                        })} />

                                    {formik.touched.telphone && formik.errors.telphone ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.telphone}</div>
                                    ) : null}
                                    <label htmlFor="telphone">Telefone*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >

                                    <InputMask id="SSN" name='SSN' onChange={(e: InputMaskChangeEvent) => { setSSN(e.target.value?.replace(/[^\d]/g, "")); formik.setFieldValue("SSN", e.target.value?.replace(/[^\d]/g, "")) }}
                                        mask="999.999.999-99"
                                        value={formik.values.SSN}
                                        className={classNames({
                                            "p-invalid": formik.touched.SSN && formik.errors.SSN,
                                        })} />
                                    {formik.touched.SSN && formik.errors.SSN ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.SSN}</div>
                                    ) : null}

                                    <label htmlFor="SSN">CPF*</label>
                                </span>
                            </div>
                        </div>

                        <div className="grid" style={{ marginTop: '2%' }}>
                            <div className="col-3">
                                <span className="p-float-label" >

                                    <InputMask id="postalCode" name='postalCode' onChange={(e: InputMaskChangeEvent) => { setPostalCodelValue(e.target.value?.replace(/[^\d]/g, "")); formik.setFieldValue("postalCode", e.target.value?.replace(/[^\d]/g, "")) }}
                                        mask="99999-999"
                                        
                                        className={classNames({
                                            "p-invalid": formik.touched.postalCode && formik.errors.postalCode,
                                        })} />
                                    {formik.touched.postalCode && formik.errors.postalCode ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.postalCode}</div>
                                    ) : null}
                                    <label htmlFor="postalCode">CEP*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >

                                    <Dropdown value={stateValue} id="state" onChange={(e: DropdownChangeEvent) => { setStateValue(e.target.value); formik.setFieldValue('state', e.target.value) }} options={brazilStates}
                                        className={classNames({
                                            "p-invalid": formik.touched.neighborhood && !stateValue,
                                        })}

                                    />
                                    {formik.touched.neighborhood && !stateValue ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.state}</div>
                                    ) : null}
                                    <label htmlFor="state">UF*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText
                                        id="county" name='county'
                                        value={countyValue}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { formik.setFieldValue('county', e.target.value); setCountyValue(e.target.value) }}
                                        className={classNames({
                                            "p-invalid": formik.touched.neighborhood && !countyValue,
                                        })}
                                    />
                                    {formik.touched.neighborhood && !countyValue ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.county}</div>
                                    ) : null}
                                    <label htmlFor="county">Municipio*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText
                                        id='neighborhood'
                                        value={neighborhoodValue}
                                        onChange={(e) => { setNeighborhoodValue(e.target.value); formik.setFieldValue('neighborhood', e.target.value) }}

                                        className={classNames({
                                            "p-invalid": formik.touched.neighborhood && !neighborhoodValue,
                                        })}
                                    />
                                    {formik.touched.neighborhood && !neighborhoodValue ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.neighborhood}</div>
                                    ) : null}
                                    <label htmlFor="neighborhood">Bairro*</label>
                                </span>
                            </div>
                        </div>

                        <div className="grid" style={{ marginTop: '2%' }}>
                            <div className="col-6">
                                <span className="p-float-label" >
                                    <InputText value={publicPlaceValue} onChange={(e) => { setPublicPlaceValue(e.target.value); formik.setFieldValue('publicPlace', e.target.value) }}
                                        className={classNames({
                                            "p-invalid": formik.touched.publicPlace && !publicPlaceValue,
                                        })}

                                    />

                                    {formik.touched.publicPlace && !publicPlaceValue ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.publicPlace}</div>
                                    ) : null}
                                    <label htmlFor="publicPlace">Logradouro*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputNumber style={{ width: '100%' }} value={formik.values.number} useGrouping={false}
                                        onChange={(e) => { setNumberValueValue(e.value!); formik.setFieldValue('number', e.value); console.log(e.value) }}
                                        className={classNames({
                                            "p-invalid": formik.touched.number && formik.errors.number,
                                        })}
                                    />
                                    {formik.touched.number && formik.errors.number ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.number}</div>
                                    ) : null}
                                    <label htmlFor="numberValue">Número*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <Calendar
                                        id='date'
                                        value={formik.values.birthday}

                                        maxDate={maxDate}
                                        onChange={(e: any) => {
                                            setBirthday(e.target.value.toISOString());
                                            formik.setFieldValue('birthday', e.target.value);
                                        }}
                                        touchUI
                                        selectionMode="single"
                                        locale="en"
                                        dateFormat="dd/mm/yy"
                                        className={classNames({
                                            "p-invalid": formik.touched.birthday && formik.errors.birthday,
                                        })}
                                    />
                                    {formik.touched.birthday && formik.errors.birthday ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.birthday}</div>
                                    ) : null}
                                    <label htmlFor="SSN">Data de Nascimento*</label>
                                </span>
                            </div>

                        </div>

                        <div className='grid' style={{ marginTop: '5%' }} >

                            <div className='col-11'>
                            </div>

                            <div className='col-1'>
                                <div className="secondButton">
                                    <Button label="PRÓXIMO" type="submit"

                                    />

                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>

        </div>
    )
}