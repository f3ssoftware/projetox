import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Installment } from "../../../models/Installment";
import InstallmentForm from "./InstallmentForm";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { CurrencyEnum } from "../../../Shared/enums/CurrencyEnum";
import httpService from "../../../Shared/HttpHelper/pjx-http.helper";

export default function TransactionForm({
  walletId,
  onSuccess,
  onError,
  closeDialog,
  walletCurrency
}: {
  walletId: string;
  onSuccess: Function;
  onError: Function;
  closeDialog: any
  walletCurrency: CurrencyEnum
}) {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState<string | Date | Date[] | null>([]);
  const [reference, setReference] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [installmentNumber, setInstallmentNumber] = useState(0);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [paid, setPaid] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState<any>();

  const asyncNewTransaction = async () => {
    try {
      await httpService.post(
        `${process.env.REACT_APP_API_URL}/v1/transactions`,
        {
          reference: reference,
          due_date: installmentNumber > 0 ? selectedDate : date!,
          installments: installmentNumber > 0 ? installments : null,
          type: selectedType,
          amount: value,
          wallet_id: walletId,
          paid: paid,
          group_id: selectedGroup
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")!}`,
          },
        }
      );
      onSuccess("success", "Successo", "Transação incluida com sucesso");
      setTimeout(() => {
        closeDialog();
      }, 3000);
      
    } catch (err) {
      err = 400
        ? (onError("error", "Erro", "Preencha os campos obrigatórios"))
        : onError("error", "Erro", "");
    }
  };
  const formik = useFormik({
    initialValues: {
      reference: "",
      value: null,
      date: [],
      selectedType: '',
      group: ''
    },
    validate: (data) => {
      let errors: any = {};

      !data.reference ? (
        (errors.reference = data?.reference?.length === 0)
      ) : <></>
      !data.value ? (
        (errors.value = data?.value === null)
      ) : <></>
      !data.date ? (
        (errors.date = data?.date === null)
      ) : <></>
      !data.selectedType ? (
        (errors.selectedType = data?.selectedType?.length === 0)
      ) : <></>

      return errors;
    },
    onSubmit: (data) => {
      data && onError(data);
      formik.resetForm();
    },
  });

  const   isFormFieldInvalid = (fieldName: string) => {
    const formikToucheds: any = formik.touched;
    const formikError: any = formik.errors;
    return !!formikToucheds[fieldName] && !!formikError[fieldName];
  };

  const fetchGroups = async () => {
    try {
      const response = await httpService.get(`${process.env.REACT_APP_API_URL}/v1/groups/${walletId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")!}`,
        }
      });
      setGroups(response!.data)
    } catch (err) {

    }
  }

  const paidValidate = () => {
    const isPaid =
      installments.filter((i: Installment) => i.paid === false).length > 0;
    setPaid(!isPaid);
  };
  const selectedDate = installments
    .map((i: Installment) => i.due_date)
    .slice(-1)[0];

  useEffect(() => {
    paidValidate();
  }, [installments]);

  const onUpdateItem = (installment: Installment, index: number) => {
    const installmentsArr = [...installments];
    installmentsArr[index] = installment;
    setInstallments(installmentsArr);
  };

  const updateInstallmentNumber = (installmentNumber: number) => {
    let installmentArr = [];
    for (let i = 0; i < installmentNumber; i++) {
      installmentArr.push({
        number: i,
      });
    }
    setInstallments(installmentArr);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col-12">
            <span className="p-float-label">
              <InputText
                id="reference"
                name="reference"
                value={formik.values.reference} 
                onChange={(e) => {
                  formik.setFieldValue("reference", e.target.value);
                  setReference(e.target.value);
                 
                }}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("reference"),
                })}
              />
              <label htmlFor="reference">Referencia *</label>
            </span>
          </div>
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col-12">
            <span className="p-float-label">
              <InputNumber
                id="value"
                name="value"
                value={formik.values.value}
                onValueChange={(e) => {
                  formik.setFieldValue("value", e.value);
                  setValue(Number(e.value));  
                }}
                inputClassName={classNames({
                  "p-invalid": isFormFieldInvalid("value"),
                })}
                mode="currency"
                currency={walletCurrency}
                locale="pt-BR"
              />
              <label htmlFor="amount">Valor *</label>
            </span>
          </div>
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col-12">
            <span className="p-float-label">
              <Dropdown
                value={formik.values.group}
                name="group"
                onChange={(e: DropdownChangeEvent) => { setSelectedGroup(e.value!); formik.setFieldValue('group', e.value) }}
                className={classNames({
                  "p-invalid w-full md:w-14rem": isFormFieldInvalid("group"),
                })}
                options={groups.map((g: any) => {
                  return { label: g.name, value: g.id }
                })}
              
                optionLabel="label"
                optionValue="value"
                editable
                placeholder="Selecione um tipo"
              />
              <label htmlFor="amount">Grupo</label>
            </span>
          </div>
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col-12">
            <span className="p-float-label">
              {installmentNumber > 0 ? (
                <Calendar
                  value={date}
                  onChange={(e: CalendarChangeEvent) => {
                    setDate(e.value!);
                  }}
                  locale="en"
                  disabled
                  dateFormat="dd/mm/yy"
                />
              ) : (
                <Calendar
                  value={formik.values.date}
                  name="date"
                  onChange={(e: CalendarChangeEvent) => {
                    formik.setFieldValue("date", e.value);
                    setDate(e.value!);
                  }}
                  className={classNames({
                    "p-invalid": isFormFieldInvalid("date"),
                  })}
                  locale="en"
                  dateFormat="dd/mm/yy"
                />
              )}
              <label htmlFor="date">Data *</label>
            </span>
          </div>
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col-12">
            <span className="p-float-label">
              <Dropdown
                value={formik.values.selectedType}
                name="selectedType"
                onChange={(e: DropdownChangeEvent) => { setSelectedType(e.value); formik.setFieldValue('selectedType', e.value) }}
                className={classNames({
                  "p-invalid w-full md:w-14rem": isFormFieldInvalid("selectedType"),
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
              <label htmlFor="type">Tipo *</label>
            </span>
          </div>
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col-12">
            <span className="p-float-label">
              <InputNumber
                value={installmentNumber}
                onChange={(e) => {
                  updateInstallmentNumber(e.value!);
                  setInstallmentNumber(e.value!);
                }}
                showButtons
                buttonLayout="horizontal"
                style={{ width: "9rem" }}
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                min={0}
                decrementButtonIcon="pi pi-minus"
              />
              <label htmlFor="installments">Parcelas</label>
            </span>
          </div>
          {installmentNumber > 0 ? (
            <div></div>
          ) : (
            <div className="col-12">
              <div
                className="flex align-items-center"
                style={{ marginTop: "5%" }}
              >
                <Checkbox
                  inputId="paid"
                  name="paid"
                  onChange={(e) => setPaid(e.checked!)}
                  checked={paid}
                ></Checkbox>
                <label htmlFor="paid" className="ml-2">
                  Pago
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col-12">
            {installments.map((newInstallments, index) => {
              return (
                <InstallmentForm
                  index={index}
                  key={index}
                  onHandleUpdate={onUpdateItem}
                  onError={onError}
                  walletCurrency={walletCurrency}
                ></InstallmentForm>
              );
            })}
          </div>
        </div>
        <div className="grid">
          <div className="col-12">
            <Button
              label="Salvar"
              type="submit"
              onClick={asyncNewTransaction}
              style={{ marginTop: "10%" }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
