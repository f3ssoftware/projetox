import { useEffect } from 'react';
import Card from './Card';
import Pix from './Pix'

export default function Step3({ formBody, paymentMethod, setInitialStep }: { formBody: any, paymentMethod: any, setInitialStep:any }) {



    const RenderingPage = () => {
        switch (paymentMethod) {
            case 'pix':
                return (
                    <Pix />
                )
                break;

            case 'credit_card':
                return(      
                  <Card formBody={formBody} setInitialStep={setInitialStep} />
                    

                )
                break;

            default:


                return (<></>)
        }
    }

    useEffect(() => {
        console.log(paymentMethod);
    }, [paymentMethod])

    return (

        <div className="grid" style={{ marginBottom: '2%' }}>
            <div className="col-12">
                <div>
                    <RenderingPage />
                </div>
            </div>
        </div>

    )
}