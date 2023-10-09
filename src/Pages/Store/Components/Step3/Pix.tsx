import { Formik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast, ToastMessage } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';


export default function Pix() {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(`/store`)
    };
    return (
        <div>
            <div className='grid' style={{width: '100%'}}>
                <div className='col-12'>
                    <h4 style={{ marginBottom: '3%', fontSize: '20px' }}>Pagamento com Pix</h4>
                </div>


                <div className='grid' style={{width: '100%'}}>

                    <div className='col-3 md:col-2 lg:col-1'>
                        <div className="secondButton">
                            <Button type="button" label="CANCELAR" style={{ color: '#0278D3', backgroundColor: 'white', border: '1px solid #0278D3' }}
                                onClick={() => handleCancel()}

                            />
                        </div>
                    </div>
                    <div className='col-9 md:col-10 lg:col-11'>
                    </div>
                </div>
            </div>
        </div>

    )
}