import "./balance.css";
import { useState, useEffect, SetStateAction, useRef } from "react";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import AdvancedFilter from "../Filtros Avançados/advanced-filter";
import NewTransaction from "../New_transaction/new_transaction";
import { SelectWallet } from "./SelectWallet/SelectWallet";
import { WalletDto } from "../../models/wallet.dto";
import { Toast, ToastMessage } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import PaymentAction from "./Components/PaymentAction";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import httpService from "../../Shared/HttpHelper/pjx-http.helper";


export default function Balance() {

  const [wallets, setWallets] = useState<any[]>([]);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  let [vencidas, setVencidas] = useState(0);
  let [aPagar, setAPagar] = useState(0);
  let [aReceber, setAReceber] = useState(0);
  const [walletName, setWalletName] = useState("Selecionar Carteira");
  const [visible, setVisible] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showIncludeTransaction, setShowIncludeTransaction] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<WalletDto>();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<any>();
  const [dates, setDates] = useState<any[]>([]);
  const toast = useRef<Toast>(null);
  const [showPaymentAction, setShowPaymentAction] = useState(false);
  const [showDeleteWallet, setShowDeleteTransaction] = useState(false);

  const actions: MenuItem[] = [
    {
      label: "Pagamento",
      icon: "pi pi-money-bill",
      command: async () => {
        console.log(selectedWallet);
        setShowPaymentAction(true);
      },
    },
    {
      label: "Invalidar",
      icon: 'pi pi-trash',
      command: () => {
        console.log(selectedWallet)
        confirmDialog({
          message: 'Deseja deletar?',
          header: 'Deletar Carteira',
          accept: deleteTransaction,
          reject: () => setShowDeleteTransaction(false)
        })
      }
    },
  ];

  const deleteTransaction = async () => {

    try {
      await httpService.delete(`${process.env.REACT_APP_API_URL}/v1/transactions/${selectedTransaction.id}`, {

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

  const showToast = (
    severity: ToastMessage["severity"],
    summary: string,
    detail: string
  ) => {
    toast.current?.show([{ severity, summary, detail }]);
  };

  const walletsBill = async () => {
    try {
      const result = await httpService.get(
        `${process.env.REACT_APP_API_URL}/v1/wallets/${selectedWallet?.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );
      setValue1(result!.data.stats.walletBalance);
      setVencidas(result!.data.stats.walletExpiredBillingQuantity);
      setValue2(result!.data.stats.walletExpiredBillingAmount);
      setValue3(result!.data.stats.walletOutcomeBillingAmount);
      setAPagar(result!.data.stats.walletOutcomeBillingQuantity);
      setAReceber(result!.data.stats.walletIncomeBillingQuantity);
      setValue4(result!.data.stats.walletIncomeBillingAmount);
    } catch (err) {
      alert(err);
    }
  };

  const fetchWallets = async () => {
    try {
      const result = await httpService.get(
        `${process.env.REACT_APP_API_URL}/v1/wallets`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")!}`,
          },
        }
      );
      setWallets(result!.data);
    } catch (err) {
      alert(err);
    }
  };
  const fetchTransactions = async (params?: any) => {
    if (params) {
      try {
        var result = await httpService.get(
          `${process.env.REACT_APP_API_URL}/v1/transactions/${selectedWallet?.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
            params,
          }
        );

        setTransactions(result!.data);
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        var result = await httpService.get(
          `${process.env.REACT_APP_API_URL}/v1/transactions/${selectedWallet?.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        );

        setTransactions(result!.data);
      } catch (err) {
        alert(err);
      }
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    setSelectedWallet(wallets[0])
  }, [wallets])

  useEffect(() => {
    if (selectedWallet) {
      console.log("selecionada: ", selectedWallet);
      setWalletName(selectedWallet?.name!);
      fetchTransactions();
      walletsBill();
    }
  }, [selectedWallet]);

  return (
    <div className="balance-container">
      <Toast ref={toast} />
      <div className="balance-main-content">
        <h1>Balanço</h1>

        <div className="finantial-balance">
          <div className="wallet-name">
            <Button label={walletName} onClick={() => setVisible(true)} />
            <Dialog
              header="Selecionar Carteira"
              visible={visible}
              style={{ width: "50vw" }}
              onHide={() => setVisible(false)}
            >
              <SelectWallet
                wallets={wallets}
                onUpdate={(selectedWallet: WalletDto) => {
                  setSelectedWallet(selectedWallet);
                  setVisible(false);
                }}
              ></SelectWallet>
            </Dialog>
            {/*  */}
          </div>

          {selectedWallet ? <div className="finantial-organization">
            <div className="finantial-framework">
              <label htmlFor="value1">Saldo ({selectedWallet?.currency})</label>
              <span>
                {value1.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: `${selectedWallet?.currency!}`,
                })}
              </span>
            </div>
            <div className="finantial-framework">
              <label htmlFor="value2">Vencidas ({vencidas})</label>
              <span>
                {value2.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: `${selectedWallet?.currency!}`,
                })}
              </span>
            </div>
            <div className="finantial-framework">
              <label htmlFor="value3">A pagar ({aPagar})</label>
              <span>
                {value3.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: `${selectedWallet?.currency!}`,
                })}
              </span>
            </div>
            <div className="finantial-framework">
              <label htmlFor="value4">A receber ({aReceber})</label>
              <span>
                {value4.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: `${selectedWallet?.currency!}`,
                })}
              </span>
            </div>
          </div> : <></>}

        </div>

        <div className="filtering-data">
          <div className="split-botoes">
            <span className="p-float-label">
              <Calendar
                id="date"
                value={dates}
                onChange={(e: any) => {
                  setDates(e.value);
                }}
                selectionMode="range"
                locale="en"
                dateFormat="dd/mm/yy"

              ></Calendar>
              <label htmlFor="date">Período</label>
            </span>
          </div>
          <div className="botoes">



            <Button
              label="FILTRAR"
              onClick={() =>
                dates
                  ? fetchTransactions({
                    startDate: dates[0],
                    endDate: dates[1],
                  })
                  : fetchTransactions()
              }
            />
            {
              <Button
                id="advanced-filter"
                label="FILTROS AVANÇADOS"
                onClick={() => setShowFilter(true)}
              />
            }
            <SplitButton
              label="AÇÕES"
              icon=""
              onClick={() => {
                console.log("clicked");
              }}
              model={actions}
            />
            {
              <Button
                label="INCLUIR"
                onClick={(e) => {
                  setShowIncludeTransaction(true);
                }}
              />
            }


          </div>
        </div>

        <div className="data-table">
          <DataTable
            value={transactions}
            selectionMode="single"
            selection={selectedTransaction}
            onSelectionChange={(e) => {
              setSelectedTransaction(e.value);
            }}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              body={(data) => {
                return (
                  <span>
                    {new Date(data.due_date).toLocaleDateString("pt-BR")}
                  </span>
                );
              }}
              header="Data"
            ></Column>
            <Column field="reference" header="Referência"></Column>
            <Column
              body={(transaction) => (
                <span
                  style={{
                    color: transaction.type === "BILLING" ? "green" : "red",
                  }}
                >
                  {Math.abs(transaction?.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: `${selectedWallet?.currency!}`,
                  })}
                </span>
              )}
              header="Valor"
            ></Column>
            <Column
              body={(transaction) => (
                <span>{transaction.paid ? "Pago" : "Não Pago"}</span>
              )}
              header="Pago"
            ></Column>
            <Column field="observation" header="Observação"></Column>
          </DataTable>
        </div>
        <Dialog
          header="Nova Transação"
          visible={showIncludeTransaction}
          style={{ width: "50vw" }}
          onHide={() => setShowIncludeTransaction(false)}
        >
          <NewTransaction
            toast={toast}
            closeDialog={() => {
              setShowIncludeTransaction(false);
              fetchTransactions();
              walletsBill();
            }}
            walletId={selectedWallet?.id!}
            walletCurrency={selectedWallet?.currency!}
          ></NewTransaction>
        </Dialog>
        <Dialog
          header="Filtros Avançados"
          className="filter-dialog"
          visible={showFilter}
          style={{ width: "50vw" }}
          onHide={() => setShowFilter(false)}
        >
          <AdvancedFilter
            walletId={selectedWallet?.id!}
            fetch={fetchTransactions}
            closeDialog={() => {
              setShowFilter(false);
            }}
          ></AdvancedFilter>
        </Dialog>

        <Dialog
          header="Pagamento"
          className=""
          visible={showPaymentAction}
          style={{ width: "50vw" }}
          onHide={() => setShowPaymentAction(false)}
        >
          <PaymentAction
            transaction={selectedTransaction}
            onSuccess={showToast}
            onError={showToast}
          ></PaymentAction>
        </Dialog>

        <ConfirmDialog />

      </div>
    </div>
  );
}