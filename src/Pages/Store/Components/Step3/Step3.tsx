import Card from './Card';
import Pix from './Pix'

export default function Step3({ formBody, paymentMethod }: { formBody:any, paymentMethod:any }) {

    

    const RenderingPage = () => {
        switch (paymentMethod) {
            case 'pix':
                return (

                    <Pix />

                )
                break;

            case 'credit_card':
                return (<Card formBody={formBody}/>)
                break;

            default:


                return (<></>)
        }
    }


    return (

        <div className="grid" style={{ marginBottom: '2%' }}>
            <div className="col-12">
                {/* <div>
                    <RenderingPage />
                </div> */}
            </div>
        </div>

    )
}