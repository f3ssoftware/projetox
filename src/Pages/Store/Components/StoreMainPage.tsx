import LogoSVGWithoutPJXWritten from '../../../Shared/img/LogoSVGWithoutPJXWritten'
import { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import './StoreMainPage.css'
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'primereact/card';
import StoreSteps from './Store2ndPage'
import Store2ndPage from './Store2ndPage';


export default function StoreMainPage() {

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);
    let navigate = useNavigate();
    var [value, setValue] = useState<any[]>([])

    const fetchCards = async () => {
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_API_URL}/v1/store`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                }
            );
            setValue(result.data)
            console.log(result.data)

        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <div className="store-container">
            <div className="store-main-content">
                <h1 style={{marginBottom:'3%'}}>Loja</h1>

                <div className='store-container'>
                    <div className='grid'>
                        {value.map((cardItem, index) => {
                            return (


                                <div className='col-12 md:col-8 lg:col-4'>
                                    <Card style={{height:'100%'}}>

                                    <div key={index} style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems: 'center'}}>
                                        <img style={{ width: '200px', height: '200px' }}
                                            src={cardItem?.thumbnail!}
                                            alt="thumbnail"
                                        />
                                        <h4 style={{marginTop:'5%', fontWeight:'bold', textAlign:'center'}}>{cardItem.name}</h4>
                                
                                     
                                        <h3 style={{marginTop:'5%', fontWeight:'bold'}}>{cardItem.amount.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: 'BRL',
                                        })}</h3>
                        
                                        <Button label="COMPRAR" onClick={() => navigate('/storeresume/' + cardItem.id)} style={{ width: '50%', marginTop: '10%', marginBottom: '5%' }} />
                                    </div>
                                    </Card>
                                   
                                </div>

                            )

                        }

                        )
                        }
                    </div>

                </div>

            </div>
        </div >

    )

}