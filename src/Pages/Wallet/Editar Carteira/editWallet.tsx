import { useState, useEffect, useRef } from 'react';
import './editWallet.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from "axios";
import { Toast, ToastMessage } from 'primereact/toast'
import { CurrencyEnum } from '../../../Shared/enums/CurrencyEnum';
import { Dropdown } from 'primereact/dropdown';

export default function EditWallet() {

    const [text1, setText1] = useState('');
    // const [text2, setText2] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const toast = useRef<Toast>(null);
    var currencyTypes = Object.values(CurrencyEnum);
    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };

    const ChangeWallet = async () => {
        try {
            const result = await axios.put(`${process.env.REACT_APP_API_URL}/v1/wallets/${sessionStorage.getItem('oldData')}`, {
                currency: selectedCurrency,
                name: text1,
                createdAt: new Date()
            },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                    }
                })
            sessionStorage.setItem('oldData', '');
            show('success', 'Success', 'Editado com sucesso.');

            const interval = setInterval(() => {
                window.location.reload();;
            }, 2 * 1000);
            return () => clearInterval(interval);

        }
        catch (err) {
            if (err = 400) {
                show('error', 'Erro', 'Invalid currency');
            }
        }
    }

    return (
        <div className='inclusao-container'>
            <Toast ref={toast} />
            <h1>Incluir Carteira</h1>

            <div className='inclusao-frame'>
                <label htmlFor="text1" style={{ marginBottom: "1%" }}>Título</label>
                <InputText value={text1} onChange={(e) => setText1(e.target.value)} />
                <Dropdown value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.value)} options={currencyTypes} 
                    placeholder="Select Currency" className="w-full md:w-14rem" />
                {/* <label htmlFor="text2">Moeda</label>
                <InputText value={text2} onChange={(e) => setText2(e.target.value)} /> */}
                <div className='inclusao-button'>
                    {<Button label="INCLUIR" onClick={ChangeWallet} />}
                </div>
            </div>

        </div>
    )
}