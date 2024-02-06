import { InputText } from 'primereact/inputtext'
import Video from '../../Shared/img/PeopleBusiness.mp4'
import { Button } from 'primereact/button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useQuery } from '../../Hooks/useQuery'
import httpService from '../../Shared/HttpHelper/pjx-http.helper'
import { Toast, ToastMessage } from 'primereact/toast'

export default function AuthUser() {

    // let { email } = useParams();
    let navigate = useNavigate()
    const query = useQuery();
    const [code, setCode] = useState('')
    const toast = useRef<Toast>(null);
    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };

    const confirmCode = async (e:any) => {
        e.preventDefault();

        try {
            await httpService.post(`${process.env.REACT_APP_API_URL}/v2/users/verify-user`, {
                email: query.get("email"),
                code: code
                
            })
            show('success', 'Success', 'Usuário confirmado com sucesso.');

            setTimeout(() => {
                navigate(`/login`);
            }, 2000);


        }
        catch (err: any) {
            // console.log(err.message.join(' '));
            show('error', 'Error', 'Erro ao confirmar usuário');
        }
    }

    return (
        <div style={{ backgroundColor: '#2B2B2B' }}>
            <Toast ref={toast} />

            <div className='grid' style={{ margin: '0', height: '100vh' }}>
                <div className='col md:col-8' style={{ padding: '0' }}>
                    <video width="100%" height='100%' style={{ objectFit: 'cover', padding: '0', margin: '0' }} loop autoPlay muted >
                        <source src={Video} type="video/mp4" />
                    </video>
                </div>

                <div className='col-12 md:col-4' style={{ color: 'white', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                    <div className='grid'>
                        <div className='col-12' style={{padding: '3%'}}>
                            <p>Um código de confirmação foi enviado para o e-mail {query.get("email")}.
                                Informe-o para liberação do usuário</p>
                            <div className='grid'>
                                <div className='col-1' />
                                <div className='col-10' style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                    <h3>Código</h3>
                                    <InputText style={{ width: '100%' }} onChange={(e) => setCode(e.target.value)}/>
                                </div>
                                <div className='col-1' />
                            </div>
                            <div className='grid' style={{ marginTop: "3%" }}>
                                <div className='col-1' />
                                <div className='col-10'>
                                    
                                    <div style={{ margin: '0', padding: '0' }}>
                                        <Button label="CONFIRMAR" style={{ width: '100%' }}
                                        onClick={(e) => confirmCode(e)} 

                                        />
                                    </div>
                                    <div style={{ margin: '0', padding: '0' }}>
                                        <div className='register-link' style={{ marginTop: "2%", display: 'flex', justifyContent: 'center', color: 'rgb(84, 208, 246), ' }}>
                                            <Link to={`/login`}>Retornar ao Login</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-1' />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}