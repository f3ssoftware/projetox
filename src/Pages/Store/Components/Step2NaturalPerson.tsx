import { Button } from "primereact/button";
import { Formik, useFormik, Field, Form, ErrorMessage } from 'formik';
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Toast, ToastMessage } from 'primereact/toast';
import { classNames } from "primereact/utils";
import * as Yup from 'yup';

export default function Step2NaturalPerson() {


    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [telphoneValue, setTelphoneValue] = useState('');
    const [SSN, setSSN] = useState<any>('');
    const [postalCodelValue, setPostalCodelValue] = useState<any>('');
    const [stateValue, setStateValue] = useState('');
    const [countyValue, setCountyValue] = useState('');
    const [neighborhoodValue, setNeighborhoodValue] = useState('');
    const [publicPlaceValue, setPublicPlaceValue] = useState('');
    const [numberValue, setNumberValueValue] = useState('');
    const [birthday, setBirthday] = useState('');
    const toast = useRef<Toast>(null);

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

    // const formik = useFormik({
    //     initialValues: {
    //         completeName: "",
    //         //       value: null,
    //         //       date: [],
    //         //       selectedType: '',
    //         //       group: ''
    //     },
    //     validationSchema: Yup.object({
    //         completeName: Yup.string()
    //             .max(32, 'Nome completo precisa ter no máximo 32 caracteres')
    //             .required('Necessário'),
    //         // lastName: Yup.string()
    //         //   .max(20, 'Must be 20 characters or less')
    //         //   .required('Required'),
    //         // email: Yup.string().email('Invalid email address').required('Required'),
    //     }),
    //     onSubmit: values => {
    //         alert(JSON.stringify(values, null, 2));
    //     },
    // });

    // const isFormFieldInvalid = (fieldName: string) => {
    //     const formikToucheds: any = formik.touched;
    //     const formikError: any = formik.errors;
    //     return !!formikToucheds[fieldName] && !!formikError[fieldName];
    // };


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

    return (
        <div>
            <Toast ref={toast} />
            <Formik
                initialValues={{ completeName: '', telphone: '', email: '', SSN: '', postalCode: '', state: '' }}
                validationSchema={Yup.object({
                    completeName: Yup.string()
                        .max(35, 'Precisa ter 35 caracteres ou menos')
                        .required('Necessário preencher'),
                        
                    telphone: Yup.number()
                        .max(13, 'Favor, inserir número com DDD')
                        .required('Necessário preencher'),
                    email: Yup.string().email('Formatação inválida de e-mail').required('Necessário preencher'),
                    SSN: Yup.number()
                        .min(11, '11 digitos')
                        .max(11, '11 digitos')
                        .required('Necessário preencher'),
                    postalCode: Yup.number()
                        .min(8, 'CEP precisa ter 8 digitos')
                        .max(8, 'CEP precisa ter necessáriamente 8 digitos')
                        .required('Necessário preencher'),
                    state: Yup.string()
                        // .max(35, 'Precisa ter 35 caracteres ou menos') 
                        .required('Preencha seu Estado'),
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
                                        id="completeName"
                                        {...formik.getFieldProps('completeName')}
                                        className={classNames({
                                            "p-invalid": formik.touched.completeName && formik.errors.completeName,
                                          })}
                                    />
                                    
                                    {formik.touched.completeName && formik.errors.completeName ? (
                                        <div style={{color:'red', fontSize:'12px', fontFamily:'Roboto'}}>{formik.errors.completeName}</div>
                                    ) : null}

                                    <label htmlFor="completeName">Nome Completo*</label>
                                </span>
                            </div>
                        </div>

                        <div className="grid" style={{ marginTop: '2%' }}>
                            <div className="col-6">
                                <span className="p-float-label" >
                                    <InputText  id="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                                    <label htmlFor="email">Email*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText value={telphoneValue} onChange={(e) => setTelphoneValue(e.target.value)} />
                                    <label htmlFor="telphone">Telefone*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText value={SSN} onChange={(e) => setSSN(e.target.value)} />
                                    <label htmlFor="SSN">CPF*</label>
                                </span>
                            </div>
                        </div>

                        <div className="grid" style={{ marginTop: '2%' }}>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText value={postalCodelValue} onChange={(e) => setPostalCodelValue(e.target.value)} />
                                    <label htmlFor="postalCode">CEP*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText value={stateValue} onChange={(e) => setStateValue(e.target.value)} />
                                    <label htmlFor="state">UF*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText value={countyValue} onChange={(e) => setCountyValue(e.target.value)} />
                                    <label htmlFor="county">Municipio*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText
                                        //  disabled 
                                        value={neighborhoodValue} onChange={(e) => setNeighborhoodValue(e.target.value)} />
                                    <label htmlFor="neighborhood">Bairro*</label>
                                </span>
                            </div>
                        </div>

                        <div className="grid" style={{ marginTop: '2%' }}>
                            <div className="col-6">
                                <span className="p-float-label" >
                                    <InputText value={publicPlaceValue} onChange={(e) => setPublicPlaceValue(e.target.value)} />
                                    <label htmlFor="publicPlace">Logradouro*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <InputText value={numberValue} onChange={(e) => setNumberValueValue(e.target.value)} />
                                    <label htmlFor="numberValue">Número*</label>
                                </span>
                            </div>
                            <div className="col-3">
                                <span className="p-float-label" >
                                    <Calendar
                                        id='date'
                                        value={birthday}
                                        maxDate={maxDate}
                                        onChange={(e: any) => {
                                            setBirthday(e.value);

                                        }}

                                        selectionMode="single"
                                        locale="en"
                                        dateFormat="dd/mm/yy"
                                    />
                                    <label htmlFor="SSN">Data de Nascimento*</label>
                                </span>
                            </div>

                        </div>

                        <div className='grid' style={{ marginTop: '5%' }} >

                            <div className='col-11'>
                            </div>

                            <div className='col-1'>
                                <div className="secondButton">
                                    <Button label="PRÓXIMO" type="submit" />

                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>

        </div>
    )
}