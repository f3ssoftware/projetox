import { useRef, useState } from 'react';
import './deleteWallet.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { WalletDto } from '../../../models/wallet.dto';
import httpService from '../../../Shared/HttpHelper/pjx-http.helper';



export default function DeleteWallet({ closeDialog, wallet }: { closeDialog: any, wallet: WalletDto }) {


    const toast = useRef<Toast>(null);

    const show = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail });
    };
    const accept = () => {
        toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }


    const deleteWallets = async () => {

        try {

            await httpService.delete(`${process.env.REACT_APP_API_URL}/v1/wallets/${wallet?.id}`, {

                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                }
            })
            show('success', 'Success', 'Deletado com sucesso.');
            closeDialog();
        }
        catch (err) {
            if (err = 401) {
                show('error', 'Unauthorized', 'Acesso negado! O token de acesso informado é inválido.');
            }
        }


    }


    return (
        <div className='deleting-wallet'>

            <Toast ref={toast} />

            {/* <h1 className="card flex justify-content-center">Deletar Carteira</h1> */}  


            <ConfirmDialog header />
            <div className="card flex flex-wrap justify-content-between">
                <Button onClick={() => closeDialog()} outlined severity='danger' icon="pi pi-times" label="Cancelar" className="button-delete"></Button>
                <Button onClick={deleteWallets} icon="pi pi-check" severity='success' label="Confirmar" className="button-delete"></Button>
            </div>



        </div>
    )
}