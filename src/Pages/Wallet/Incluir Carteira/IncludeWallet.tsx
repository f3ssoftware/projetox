import { useEffect, useRef, useState } from 'react';
import './inclusao.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { CurrencyEnum } from '../../../Shared/enums/CurrencyEnum';
import httpService from '../../../Shared/HttpHelper/pjx-http.helper';


export default function IncludeWallet({ closeDialog, onSuccess, onError }: { closeDialog: any, onSuccess: Function, onError: Function }) {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    // const toast = useRef<Toast>(null);

    const [selectedCurrency, setSelectedCurrency] = useState('');
    var currencyTypes = Object.values(CurrencyEnum);

    const addWallets = async () => {
        try {
            const result = await httpService.post(`${process.env.REACT_APP_API_URL}/v1/wallets`, {
                currency: selectedCurrency,
                name: text1,
                createdAt: new Date()
            },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                    }

                })
            onSuccess('success', 'Success', 'Carteira alterada com sucesso.');
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
            <h1>Incluir Carteira</h1>

            <div className='inclusao-frame'>
                <label htmlFor="text1" style={{ marginBottom: "1%" }}>Título</label>
                <InputText value={text1} onChange={(e) => setText1(e.target.value)} />

                <label htmlFor="text2" style={{ marginBottom: "1%" }}>Moeda</label>
                <Dropdown value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.value)} options={currencyTypes}
                    className="w-full md:w-14rem" />
                {/* <InputText value={text2} onChange={(e) => setText2(e.target.value)} /> */}

                <div className='inclusao-button'>
                    {<Button label="INCLUIR" onClick={() => addWallets()} />}
                </div>
            </div>

        </div>
    )
}