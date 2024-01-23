import { useState, useEffect, useRef } from 'react';
import './editWallet.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast'
import { CurrencyEnum } from '../../../Shared/enums/CurrencyEnum';
import { Dropdown } from 'primereact/dropdown';
import { WalletDto } from '../../../models/wallet.dto';
import httpService from '../../../Shared/HttpHelper/pjx-http.helper';

export default function EditWallet({ closeDialog, wallet, onSuccess, onError }: { closeDialog: any, wallet: WalletDto, onSuccess: Function, onError: Function }) {

    const [text1, setText1] = useState('');
    // const [text2, setText2] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const Edittoast = useRef<Toast>(null);
    var currencyTypes = Object.values(CurrencyEnum);
    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        Edittoast.current?.show({ severity, summary, detail });
    };

    useEffect(() => {
        setText1(wallet?.name!);
        setSelectedCurrency(wallet?.currency!);
    }, [wallet]);

    const ChangeWallet = async () => {
        try {
            const result = await httpService.put(`${process.env.REACT_APP_API_URL}/v1/wallets/${wallet?.id}`, {
                currency: selectedCurrency,
                name: text1,
                createdAt: new Date()
            },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                    }
                })

            onSuccess('success', 'Success', 'Editado com sucesso.');


            closeDialog();

        }
        catch (err) {
            if (err = 400) {
                onError('error', 'Erro', 'Invalid currency');
            }
        }
    }

    return (
        <div className='inclusao-container'>
            <Toast ref={Edittoast} />
            <h1>Editar Carteira</h1>

            <div className='inclusao-frame'>
                <label htmlFor="text1" style={{ marginBottom: "1%" }}>Título</label>
                <InputText value={text1} onChange={(e) => setText1(e.target.value)} />
                <label htmlFor={selectedCurrency} style={{ marginBottom: "1%" }}>Moeda</label>
                <Dropdown value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.value)} options={currencyTypes}
                    className="w-full md:w-14rem" />
                {/* 
                <InputText value={text2} onChange={(e) => setText2(e.target.value)} /> */}
                <div className='inclusao-button'>
                    {<Button label="EDITAR" onClick={ChangeWallet} />}
                </div>
            </div>

        </div>
    )
}