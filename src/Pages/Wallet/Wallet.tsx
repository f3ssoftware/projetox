import './wallet.css'
import { Menu } from 'primereact/menu';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { SplitButton } from 'primereact/splitbutton';
import { WalletDto } from '../../models/wallet.dto';
import { MenuItem } from 'primereact/menuitem';
import { Dialog } from 'primereact/dialog';
import IncludeWallet from './Incluir Carteira/IncludeWallet';
import EditWallet from './Editar Carteira/editWallet'
import { Toast, ToastMessage } from 'primereact/toast';
import { FilterWalletDto } from './dtos/filter-wallet.dto';
import DeleteWallet from './Deleta Carteira/deleteWallet';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function Wallet() {

    const [find, setFind] = useState('')
    const [loading, setLoading] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState<any>();
    const [wallets, setWallets] = useState<WalletDto[]>([]);
    const [showNewWallet, setShowNewWallet] = useState(false);
    const [showEditWallet, setShowEditWallet] = useState(false);
    const [showDeleteWallet, setShowDeleteWallet] = useState(false);
    const toast = useRef<Toast>(null);

    const showToast = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show([{ severity, summary, detail }]);
    };

    const actions: MenuItem[] = [
        {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: async () => {
                console.log(selectedWallet);
                setShowEditWallet(true); //Basically I set this to call a dialog which invokes the editWallet component so the user can edit the infos 
                //from the selected row in the table. At the moment, user needs to refresh the page to see the result.  
            }
        },
        {
            label: 'Deletar',
            icon: 'pi pi-trash',
            command: () => {
                console.log(selectedWallet)
                confirmDialog({
                    message: 'Deseja deletar?',
                    header: 'Deletar Carteira',
                    accept: deleteWallets,
                    reject: () => setShowDeleteWallet(false)
                })
            }
        }
    ];

    useEffect(() => {
        fetchWallets();
    }, []);


    const deleteWallets = async () => {

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/v1/wallets/${selectedWallet?.id}`, {

                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            showToast('success', 'Success', 'Deletado com sucesso.');
            fetchWallets();
        }

        catch (err: any) {
            if (err.status = 401) {
                showToast('error', 'Unauthorized', 'Acesso negado! O token de acesso informado é inválido.');
            }
        }


    }
    const fetchWallets = async (params?: any) => {
        try {
            setLoading(true);
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/v1/wallets`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                },
                params
            });
            setLoading(false);
            setWallets(result.data);
        } catch (err) {

        }

    }

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <div className='wallet-container'>
            <Toast ref={toast} />
            <div className='wallet-main-content'>

                <h1>Carteiras</h1>

                <div className='wallet-menu'>

                    <div className="col-3 md:col-3 lg:col-3">

                        <span className="p-float-label" >
                            <InputText id='text1' value={find} onChange={(e) => setFind(e.target.value)} />
                            <label htmlFor="text1">Nome</label>
                        </span>

                    </div>

                    <div className='wallet-buttons'>

                        <div className="col-3 md:col-6 lg:col-3" style={{marginLeft: '5%'}}>

                            <Button label="FILTRAR" onClick={() => {
                                fetchWallets({ name: find });
                            }} />

                        </div>
                    </div>
                    <div style={{ width: '40%' }}>

                        <SplitButton label="AÇÕES" icon="" onClick={() => {
                            console.log('clicked');
                        }} model={actions} />

                    </div>

                    <div style={{  height:'100%' }}>

                        <Button id='inclusao' label="INCLUIR" onClick={() => setShowNewWallet(true)} />

                    </div>
                </div>


                <DataTable loading={loading} selectionMode='single' selection={selectedWallet} onSelectionChange={(e) => {
                    setSelectedWallet(e.value);
                }} tableStyle={{ minWidth: '50rem' }} value={wallets}>
                    <Column body={(data) => {
                        return <span>{new Date(data.createdAt).toLocaleDateString('pt-BR')}</span>
                    }} header="Data de Criação"></Column>
                    <Column field="name" header="Nome"></Column>
                    <Column field="currency" header="Moeda"></Column>
                </DataTable>
            </div>
            <Dialog visible={showNewWallet} style={{ width: '50vw' }} onHide={() => {
                setShowNewWallet(false)
            }}>
                <IncludeWallet closeDialog={() => {
                    setShowNewWallet(false);
                    fetchWallets();
                }} onSuccess={showToast} onError={showToast}></IncludeWallet>
            </Dialog>
            <Dialog visible={showEditWallet} style={{ width: '50vw' }} onHide={() => setShowEditWallet(false)}>
                <EditWallet wallet={selectedWallet} closeDialog={() => {
                    setShowEditWallet(false);
                    // showToast('success', 'Success', 'Carteira editada com sucesso.');
                    fetchWallets();
                }} onSuccess={showToast} onError={showToast}></EditWallet>
            </Dialog>
            <ConfirmDialog />
        
        </div>
    )
}