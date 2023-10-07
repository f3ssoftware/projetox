import axios from "axios";
import { Formik } from "formik";
import { Button } from "primereact/button";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast, ToastMessage } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';

export default function Card({ formBody, setInitialStep }: { formBody: any, setInitialStep:any }) {

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState<number>();
    const [date, setDate] = useState('');
    const [cvv, setCvv] = useState('');


    const showStep3Toast = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show([{ severity, summary, detail }]);
    };

    const toast = useRef<Toast>(null);

    const SendForm = async () => {
        
        const body = {
            formBody,


                };
            

        
  
            try {
                await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/checkout`,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("access_token")!}`,
                        },
                    },

                );
                showStep3Toast("success", "Successo", "Transação incluida com sucesso");

            } catch (err) {
                err = 400
                    ? (showStep3Toast("error", "Erro", "Preencha os campos obrigatórios"))
                    : showStep3Toast("error", "Erro", "" + err);
            }

    }

    return (
        <div>
            <Toast ref={toast} />
            <Formik


                initialValues={{ name: '', number: '', date: '', cvv: '' }}
                validationSchema={Yup.object({

                    name: Yup.string()
                        .required('Necessário preencher'),
                    number: Yup.number()
                        .required('Necessário preencher'),
                    date: Yup.string()
                        .required('Necessário preencher'),
                    cvv: Yup.number()

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

                    <form onSubmit={formik.handleSubmit} >
                        <div className='grid'>
                            <div className='col-12'>
                                <h4 style={{ marginBottom: '2%', fontSize: '20px' }}>Pagamento com Cartão de Crédito</h4>
                             </div>

                            <div className="grid" style={{ marginBottom: '2%', width: '100%' }}>
                                <div className="col-12 md:col-4" style={{ marginTop: '2%' }}>
                                    <span className="p-float-label" >
                                        <InputText id="name" name='name'
                                            value={formik.values.name}
                                            onChange={(e) => {
                                                formik.setFieldValue("name", e.target.value);
                                                setName(e.target.value);
                                            }}

                                            className={classNames({
                                                "p-invalid": formik.touched.name && formik.errors.name,
                                            })}

                                        />

                                        {formik.touched.name && formik.errors.name ? (
                                            <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.name}</div>
                                        ) : null}

                                        <label htmlFor="email" style={{fontSize:'14px'}}>Nome Impresso no cartão*</label>
                                    </span>
                                </div>
                                <div className="col-12 md:col-4" style={{ marginTop: '2%' }}>
                                    <span className="p-float-label" >
                                        <InputNumber
                                            id="cardNumber" name='cardNumber' style={{ width: '100%' }} onChange={(e) => { setCardNumber(e.value!); formik.setFieldValue("number", e.value) }}
                                            useGrouping={false}

                                            className={classNames({
                                                "p-invalid": formik.touched.number && formik.errors.number,
                                            })} />

                                        {formik.touched.number && formik.errors.number ? (
                                            <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.number}</div>
                                        ) : null}
                                        <label htmlFor="cardNumber" style={{fontSize:'14px'}}>Número do cartão*</label>
                                    </span>
                                </div>

                            </div>
                            <div className="grid" style={{ marginBottom: '2%', width: '100%' }}>
                                <div className="col-6 md:col-2" style={{ marginTop: '2%' }}>
                                    <span className="p-float-label" >

                                        <InputMask id="date" name='date' onChange={(e: InputMaskChangeEvent) => { setDate(e.target.value!.replace(/[^\d]/g, "")); formik.setFieldValue("date", e.target.value!.replace(/[^\d]/g, "")) }}
                                            mask="99/99"

                                            className={classNames({
                                                "p-invalid": formik.touched.date && formik.errors.date,
                                            })} />
                                        {formik.touched.date && formik.errors.date ? (
                                            <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.date}</div>
                                        ) : null}
                                        <label htmlFor="date" style={{fontSize:'14px'}}>Data de Expiração*</label>
                                    </span>
                                </div>

                                <div className="col-6 md:col-2" style={{ marginTop: '2%' }}>
                                    <span className="p-float-label" >
                                        <InputText
                                            id="cvv" name='cvv' style={{ width: '100%' }} onChange={(e) => { setCvv(e.target.value); formik.setFieldValue("cvv", e.target.value) }}


                                            className={classNames({
                                                "p-invalid": formik.touched.number && formik.errors.number,
                                            })} />

                                        {formik.touched.number && formik.errors.number ? (
                                            <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.number}</div>
                                        ) : null}
                                        <label htmlFor="cvv" style={{fontSize:'14px'}}>CVV*</label>
                                    </span>
                                </div>
                            </div>


                        </div>

                        <div className='grid' style={{ marginTop: '5%' }} >

                        <div className='col-1'>
                                <div className="secondButton">
                                    <Button type="reset" label="CANCELAR" style={{color:'#0278D3', backgroundColor:'white', border:'1px solid #0278D3'}}
                                        onClick={() => <Link to={`/store`}/>}

                                    />

                                </div>
                            </div> 
                            <div className='col-10'>
                            </div>

                            <div className='col-1'>
                                <div className="secondButton">
                                    <Button label="FINALIZAR" type="submit"
                                        onClick={() => SendForm()}

                                    />

                                </div>
                            </div>
                        </div>

                    </form>
                )}
            </Formik>


        </div >
    )
}
