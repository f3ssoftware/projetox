import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { WalletDto } from "../../../models/wallet.dto";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { CurrencyEnum } from "../../../Shared/enums/CurrencyEnum";
import httpService from "../../../Shared/HttpHelper/pjx-http.helper";

export default function InterForm({
  walletId,
  onSuccess,
  onError,
  closeDialog,
  walletCurrency,
}: {
  walletId: string;
  onSuccess: Function;
  onError: Function;
  closeDialog: any;
  walletCurrency: CurrencyEnum;
}) {
  const [amount, setAmount] = useState<number>();
  const [baseDate, setBaseDate] = useState<string | Date | Date[] | null>(
   ''
  );
  const [reference, setReference] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [wallets, setWallets] = useState<any[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<WalletDto>();

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

  useEffect(() => {
    fetchWallets();
  }, []);

  const asyncNewInterWallet = async (e:any) => {
    e.preventDefault()
    try {
      const result = await httpService.post(
        `${process.env.REACT_APP_API_URL}/v1/transactions/inter-wallet`,
        {
          reference: reference,
          due_date: baseDate,
          type: selectedType,
          amount: amount,
          wallet_id: walletId,
          destinatary_wallet_id: selectedWallet?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")!}`,
          },
        }
      );
      onSuccess("success", "Successo", "Transação incluida com sucesso.");
      setTimeout(() => {
        closeDialog();
      }, 3000);
    } catch (err) {
      {
        err = 400
          ? onError("error", "Erro", "Preencha todos os campos obrigatórios")
          : onError("error", "Erro", "");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      reference: "",
      amount: null,
      baseDate: new Date(),
      selectedType: "",
      selectedWallet: "",
    },
    validate: (data) => {
      let errors: any = {};

      !data.reference ? (
        (errors.reference = data?.reference?.length === 0)
      ) : (
        <></>
      );

      !data.amount ? (errors.amount = data?.amount === null) : <></>;
      !data.baseDate ? (errors.baseDate = data?.baseDate === null) : <></>;
      !data.selectedType ? (
        (errors.selectedType = data?.selectedType?.length === 0)
      ) : (
        <></>
      );
      !data.selectedType ? (
        (errors.selectedWallet = data?.selectedWallet?.length === 0)
      ) : (
        <></>
      );

      return errors;
    },
    onSubmit: (data) => {
      data && onError(data);
      formik.resetForm();
    },
  });

  const isFormFieldInvalid = (fieldName: string) => {
    const formikToucheds: any = formik.touched;
    const formikError: any = formik.errors;
    return !!formikToucheds[fieldName] && !!formikError[fieldName];
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col">
            <span className="p-float-label">
              <Dropdown
                value={formik.values.selectedWallet}
                onChange={(e: DropdownChangeEvent) => {
                  setSelectedWallet(e.value);
                  formik.setFieldValue("selectedWallet", e.value);
                }}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("selectedWallet"),
                })}
                options={wallets}
                optionLabel="name"
                placeholder="Selecione uma carteira"
              />
              <label htmlFor="type">Carteira Destino</label>
            </span>
          </div>
          <div className="col">
            <span className="p-float-label">
              <InputNumber
                id="amount"
                value={formik.values.amount}
                onValueChange={(e) => {
                  formik.setFieldValue("amount", e.value);
                  setAmount(Number(e.value));
                }}
                inputClassName={classNames({
                  "p-invalid": isFormFieldInvalid("amount"),
                })}
                mode="currency"
                currency={walletCurrency}
                locale="pt-BR"
              />
              <label htmlFor="amount">Valor</label>
            </span>
          </div>
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col">
            <span className="p-float-label">
              <Calendar
                value={formik.values.baseDate}
                name="baseDate"
                onChange={(e: CalendarChangeEvent) => {
                  formik.setFieldValue("baseDate", e.value);
                  setBaseDate(e.value!);
                }}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("baseDate"),
                })}
                locale="en"
                dateFormat="dd/mm/yy"
              />
              <label htmlFor="date">Data Base</label>
            </span>
          </div>
          <div className="col">
            <span className="p-float-label">
              <InputText
                value={formik.values.reference}
                onChange={(e) => {
                  formik.setFieldValue("reference", e.target.value);
                  setReference(e.target.value);
                }}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("reference"),
                })}
              />
              <label htmlFor="reference">Referencia</label>
            </span>
          </div>
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col">
            <span className="p-float-label">
              <Dropdown
                value={formik.values.selectedType}
                onChange={(e: DropdownChangeEvent) => {
                  setSelectedType(e.value);
                  formik.setFieldValue("selectedType", e.value);
                }}
                className={classNames({
                  "p-invalid w-full md:w-14rem":
                    isFormFieldInvalid("selectedType"),
                })}
                options={[
                  { label: "Cobrança", value: "BILLING" },
                  { label: "Pagamento", value: "PAYMENT" },
                ]}
                optionLabel="label"
                optionValue="value"
                editable
                placeholder="Selecione um tipo"
              />
              <label htmlFor="type">Tipo</label>
            </span>
          </div>
        </div>
        <Button
          label="Salvar"
          onClick= {(e) => (asyncNewInterWallet(e))}
        
          style={{ marginTop: "10%" }}
        />
      </div>
    </form>
  );
}
