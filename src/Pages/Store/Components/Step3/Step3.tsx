import { useEffect } from 'react';
import Card from './Card';
import Pix from './Pix'

export default function Step3({ formBody, paymentMethod }: { formBody: any, paymentMethod: any }) {



    const RenderingPage = () => {
        switch (paymentMethod) {
            case 'pix':
                return (
                    <Pix />
                )
                break;

            case 'credit_card':
                return (
                    <div>                
                        <div className='grid'>
                        <div className='col-2'>
                            <h4 style={{ marginBottom: '3%', fontSize: '20px' }}>Pagamento com Cartão de Crédit</h4>
                        </div>
                        <Card formBody={formBody} />
                    </div>
                    </div>

                )
                break;

            default:


                return (<></>)
        }
    }

    // useEffect(() => {
    //     console.log(paymentMethod);
    // }, [paymentMethod])

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