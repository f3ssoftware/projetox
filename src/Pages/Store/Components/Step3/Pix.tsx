import { Formik } from "formik";
import { InputText } from "primereact/inputtext";
import { Toast, ToastMessage } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef } from "react";
import * as Yup from 'yup';


export default function Pix(){
    
    return(
        <div>
           <div className='grid'>
                            <div className='col-12'>
                                <h4 style={{ marginBottom: '3%', fontSize: '20px' }}>Pagamento com Pix</h4>
                            </div>

            </div>
        </div>

    )
}