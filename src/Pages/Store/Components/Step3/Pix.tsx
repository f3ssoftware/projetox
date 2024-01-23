import { Button } from "primereact/button";
import { Toast, ToastMessage } from "primereact/toast";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputTextarea } from 'primereact/inputtextarea';
import Timer from '../../../../Shared/timer'

export default function Pix({ pixImg, pixCopyPasteUrl }: { pixImg: any, pixCopyPasteUrl:any }) {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(`/store`)
    };
    const toast = useRef<Toast>(null);

    const pixToast = (severity: ToastMessage["severity"], summary: string, detail: string, life:number) => {
        toast.current?.show([{ severity, summary, detail, life }]);

        setTimeout(() => {
            toast.current?.clear();

        }, 30000);
    };
        
    

    const imagePix = pixImg;
    const [value, setValue] = useState<string>('');


        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        const copyToClipboard = () => {
            if(textareaRef.current){
                textareaRef.current.select();
                document.execCommand('copy');
                pixToast("success", "Pix Copiado!", "Cole em seu aplicativo bancário na área Pix ou utilize o QR Code.", 7000);
            }
        };
    
 
    return (
        <div>
            <Toast ref={toast}  />
            <div className='grid'>
                <div className='col-12'>
                    <h4 style={{ marginBottom: '4%', fontSize: '16px' }}>Pagamento com Pix</h4>
                </div>
                <div className="grid" style={{ width: '100%' }}>
                    <div className="col-12 md:col-3 lg:col-2" style={{display:'flex', justifyContent:'center' }}>
                        <img src={imagePix} alt='pix Image' style={{ width: '150px', height: '150px' }} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-5" style={{display:'flex', justifyContent:'center', flexDirection: 'column' }}>
                        <h4 style={{ fontSize: '12px', marginBottom: '1%' }}>PIX Copia e Cola</h4>
                        <InputTextarea ref={textareaRef} readOnly value={pixCopyPasteUrl} rows={5} cols={30} onClick={copyToClipboard} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '6%' }}>
                            <h4 style={{ fontSize: '12px' }}>Aguardando Pagamento...</h4>
                            <Timer />
                        </div>
                    </div>

                </div>
                <div className='grid' style={{ width: '100%' }}>

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