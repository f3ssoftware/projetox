import { useEffect } from 'react';
import Card from './Card';
import Pix from './Pix'

export default function Step3({ formBody, paymentMethod, productId, pixImg }: { formBody: any, paymentMethod: any, productId: any, pixImg:any }) {



    const RenderingPage = () => {
        switch (paymentMethod) {
            case 'pix':
                return (
                    <Pix pixImg={pixImg}/>
                )
                break;

            case 'credit_card':
                return(      
                  <Card formBody={formBody} productId={productId} />
                    

                )
                break;

            default:


                return (<></>)
        }
    }

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