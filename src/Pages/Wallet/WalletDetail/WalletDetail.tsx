import "../wallet.css";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { Dialog } from "primereact/dialog";
import { Chart } from "primereact/chart";

import { Toast, ToastMessage } from "primereact/toast";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import IncludeGroup from "./Dialogs/IncludeGroup";
import EditGroup from "./Dialogs/editGroup";
import { GroupDTO } from "../../../models/GroupDTO";
import httpService from "../../../Shared/HttpHelper/pjx-http.helper";

export default function WalletDetail() {
  const [loading, setLoading] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [showEditWallet, setShowEditWallet] = useState(false);
  const [showDeleteWallet, setShowDeleteWallet] = useState(false);
  const toast = useRef<Toast>(null);
  const { state } = useLocation();
  const { selectedWallet } = state;
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chart, setChart] = useState<any[]>([]);
  const [transactionVolume, setTransactionVolume] = useState(0);
  const [balance, setBalance] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<any>();
  const [groups, setGroups] = useState<GroupDTO[]>([]);

  const showToast = (
    severity: ToastMessage["severity"],
    summary: string,
    detail: string
  ) => {
    toast.current?.show([{ severity, summary, detail }]);
    fetchGroups();
  };

  const fetchCharts = async (params?: any) => {
    try {
      const result = await httpService.get(
        `${process.env.REACT_APP_API_URL}/v1/charts/cashflow`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
          params,
        }
      );
      setChart(result!.data);
    } catch (err) {
      alert(err);
    }
  };

  const walletsInfo = async () => {
    try {
      const result = await httpService.get(
        `${process.env.REACT_APP_API_URL}/v1/wallets/${selectedWallet?.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );
      setTransactionVolume(result!.data.stats.walletTransactionsVolume);
      setBalance(result!.data.stats.walletBalance);
    } catch (err) {
      alert(err);
    }
  };

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const result = await httpService.get(
        `${process.env.REACT_APP_API_URL}/v1/groups/${selectedWallet?.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );
      setLoading(false);
      setGroups(result!.data);
    } catch (err) { }
  };

  useEffect(() => {
    fetchCharts({ wallet_id: selectedWallet.id, days_gone: 365 });
    fetchGroups();
    walletsInfo();
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: chart.map((p, index) => {
        return new Date(p.x).toLocaleDateString("pt-BR", { timeZone: "UTC" });
      }),
      datasets: [
        {
          label: selectedWallet?.name!,
          data: chart.map((p, index) => {
            return p.y;
          }),
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [chart]);


  const actions: MenuItem[] = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: async () => {
        setShowEditWallet(true);
      },
    },
  ];

  return (
    <div className="wallet-container">
      <Toast ref={toast} />
      <div className="wallet-main-content">
        <h1>Detalhar Carteira - {selectedWallet?.name!}</h1>

        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col-8">
            <div className="card">
              <Chart type="line" data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="col-2" style={{ marginLeft: "1%" }}>
            <h5>Volume: {transactionVolume} transações</h5>
            <h5 style={{ marginTop: "10%" }}>
              Saldo:{" "}
              {balance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h5>
          </div>
        </div>

        <div className="wallet-menu" style={{ marginTop: "2%" }}>
          <div className="wallet-buttons"></div>
          <div style={{ width: "40%" }}>
            <SplitButton
              label="AÇÕES"
              icon=""
              onClick={() => {
                console.log("clicked");
              }}
              model={actions}
            />
          </div>

          <div style={{ height: "100%" }}>
            <Button
              id="inclusao"
              label="INCLUIR"
              onClick={() => setShowNewGroup(true)}
            />
          </div>
        </div>

        <DataTable
          loading={loading}
          selectionMode="single"
          onSelectionChange={(e) => {
            setSelectedGroup(e.value);
          }}
          tableStyle={{ minWidth: "50rem" }}
          value={groups}
        >
          <Column field="name" header="Nome"></Column>
          <Column field="label" header="Label"></Column>
          <Column field="color" header="Cor" body={(data) => {
            return (
              <div style={{ backgroundColor: `${data.color}`, width: '27px', height: '27px', borderRadius: '10%' }}></div>
            );
          }}></Column>
        </DataTable>
      </div>
      <Dialog
        visible={showNewGroup}
        style={{ width: "50vw" }}
        onHide={() => {
          setShowNewGroup(false);
        }}
      >
        <IncludeGroup
          closeDialog={() => {
            setShowNewGroup(false);
          }}
          onSuccess={showToast}
          onError={showToast}
          walletId={selectedWallet?.id!}
        ></IncludeGroup>
      </Dialog>
      
      <Dialog
        visible={showEditWallet}
        style={{ width: "50vw" }}
        onHide={() => {
          setShowEditWallet(false);
        }}
      >
        <EditGroup
          closeDialog={() => {
            setShowEditWallet(false);
          }}
          onSuccess={showToast}
          onError={showToast}
          group={selectedGroup}
        ></EditGroup>
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}
