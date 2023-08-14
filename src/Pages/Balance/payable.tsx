import { Column } from 'primereact/column'
import './style.css'
import { DataTable } from 'primereact/datatable'
import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { WalletDto } from '../../models/wallet.dto';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast, ToastMessage } from 'primereact/toast';
import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { Dialog } from 'primereact/dialog';
import PaymentAction from './Components/PaymentAction';

export default function Due_Dated() {

  const [wallets, setWallets] = useState<WalletDto[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([])
  const [selectedWallet, setSelectedWallet] = useState<WalletDto>();
  const [selectedTransaction, setSelectedTransaction] = useState<any>();
  const [showPaymentAction, setShowPaymentAction] = useState(false);
  const toast = useRef<Toast>(null);

  const actions: MenuItem[] = [
    {
      label: "Pagamento",
      icon: "pi pi-money-bill",
      command: async () => {

        setShowPaymentAction(true);
      },
    },
  ];

  const DueToast = (
    severity: ToastMessage["severity"],
    summary: string,
    detail: string
  ) => {
    toast.current?.show([{ severity, summary, detail }]);
  };

  const fetchWallets = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/wallets`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")!}`,
          },
        }
      );
      setWallets(result.data);
      setSelectedWallet(result.data[0])
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchWallets();

  }, []);

  useEffect(() => {
    if (selectedWallet) {
      fetchTransactions({ category: 'PAYABLE' });
    }
  }, [selectedWallet]);

  const fetchTransactions = async (params?: any) => {

    try {
      var result = await axios.get(`${process.env.REACT_APP_API_URL}/v1/transactions/${selectedWallet?.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        params
      });

      setTransactions(result.data)
      console.log(transactions, result.data)


    } catch (err) {
      alert(err);
    }

  }


  return (
    <div className='main-content'>
      <h1>A Pagar</h1>
      <div className='filtering' style={{ width: '80%', marginBottom: '2%' }}>

        <div className='filtering-inputs' style={{ width: '50%' }}>
          <span className="p-float-label" style={{ width: '45%' }}>
            <Dropdown value={selectedWallet} onChange={(e) => (setSelectedWallet(e.value))} options={wallets} optionLabel="name" />
            <label htmlFor="date">Carteira</label>
          </span>


          <span className="p-float-label" style={{ width: '45%' }}>
            <Calendar
              id='date'
              value={dates}
              onChange={(e: any) => {
                setDates(e.value);
              }}

              selectionMode="range"
              locale="en"
              dateFormat="dd/mm/yy"
            />
            <label htmlFor="date">Período</label>
          </span>
        </div>

        <div className='buttons' style={{ width: '50%' }}>
          <Button label="FILTRAR" style={{ width: '25%' }}
            onClick={() =>
              dates ?
                fetchTransactions({
                  category: 'PAYABLE',
                  startDate: dates[0],
                  endDate: dates[1]
                }) : fetchTransactions({ category: 'PAYABLE' })
            } />

          <SplitButton
            label="AÇÕES"
            icon=""
            onClick={() => {
              console.log("clicked");
            }}
            model={actions}
          />

          <Button label="INCLUIR" style={{ width: '25%' }} />

        </div>
      </div>
      <div className='data-table'>

        <DataTable value={transactions}
          selectionMode="single"
          tableStyle={{ minWidth: '50rem' }}
          selection={selectedTransaction}
          onSelectionChange={(e) => {
            setSelectedTransaction(e.value);
          }}>
          <Column body={(data) => {
            return <span>{new Date(data.due_date).toLocaleDateString('pt-BR')}</span>
          }} header="Data"></Column>
          <Column field="reference" header="Referência"></Column>
          <Column body={(transaction) => <span style={{ color: (transaction.type === 'BILLING' ? 'green' : 'red') }}>{Math.abs(transaction?.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>} header="Valor"></Column>
          <Column field="observation" header="Observação"></Column>
          <Column field="fees" header="Juros"></Column>
          <Column field="assessment" header="Multa"></Column>
        </DataTable>

        <Dialog
          header="Pagamento"
          className=""
          visible={showPaymentAction}
          style={{ width: "50vw" }}
          onHide={() => setShowPaymentAction(false)}
        >
          <PaymentAction
            transaction={selectedTransaction}
            onSuccess={DueToast}
            onError={DueToast}
          ></PaymentAction>
        </Dialog>
      </div>
    </div>

  )
}