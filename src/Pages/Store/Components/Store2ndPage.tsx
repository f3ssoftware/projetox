import { useEffect, useRef, useState } from "react";
import './Store2ndPage.css'
import "primeicons/primeicons.css";
import './StoreMainPage.css'
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuItem } from 'primereact/menuitem';
import { Steps } from 'primereact/steps';
import { Toast, ToastMessage } from 'primereact/toast';
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'


export default function Store2ndPage() {

    let { cardId } = useParams();
    let [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef<Toast>(null);
    const [step2BodyInfo, setStep2BodyInfo] = useState<any>();
    const [paymentMethod, setPaymentMethod] = useState<any>();
    const [pixResult, setPixResult] = useState(''); //url for QR Code
    const [pixCopyPaste, setPixCopyPaste] = useState('');
    

    const showToast = (
        severity: ToastMessage["severity"],
        summary: string,
        detail: string
    ) => {
        toast.current?.show([{ severity, summary, detail }]);
    };

    const items: MenuItem[] = [
        {
            label: 'Resumo',
            command: (event) => {
                // showToast('info', 'First Step', 'deu certo');

            }

        },
        {
            label: 'Forma de Pagamento',
            command: (event) => {
                // showToast('info', 'Second Step', 'deu certo');

            }
        },
        {
            label: 'Pagamento',
            command: (event) => {

            }
        }
    ];
    const RenderingPage = () => {
        switch (activeIndex) {
            case 0:
                return (<Step1 productId={cardId} setNextStep={setActiveIndex}/>)
                break;

            case 1:
                return (<Step2 productId={cardId} setNextStep={setActiveIndex} step2Body={setStep2BodyInfo} setPaymentChosed={setPaymentMethod} pixImg={setPixResult} pixCopyPaste={setPixCopyPaste} />)
                break;

            case 2:

                return (<Step3 formBody={step2BodyInfo} paymentMethod={paymentMethod} productId={cardId} pixImg={pixResult} pixCopyPasteUrl={pixCopyPaste}/>)
                break;
            default:

                return (<></>)
        }
    }

    // useEffect(() => {
    //     console.log(paymentMethod)
    // }, [paymentMethod])


    return (
        <div className="store-container">
            <Toast ref={toast} />
            <div className="store-main-content">
                <h1>Loja</h1>

                <div className='store-container'>

                    <div className='steps' style={{ marginBottom: '1%', width: '100%' }}>
                        <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={true} style={{ marginBottom: '5%' }} />

                    </div>
                    <div>
                        <RenderingPage />
                    </div>
   
                </div>
            </div>
        </div>
    )

}