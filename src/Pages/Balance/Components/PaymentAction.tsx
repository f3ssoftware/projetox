import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import httpService from "../../../Shared/HttpHelper/pjx-http.helper";

export default function PaymentAction({
  transaction,
  onSuccess,
  onError,
}: {
  transaction: any;
  onSuccess: Function;
  onError: Function;
}) {
  const [amount, setAmount] = useState<number>();
  const [finalAmount, setFinalAmount] = useState<number>();
  const [fees, setFees] = useState<number>();
  const [fine, setFine] = useState<number>();
  const [paymentDate, setPaymentDate] = useState<string | Date | Date[] | null>(
    new Date()
  );
  const [reference, setReference] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [expirationDate, setExpirationDate] = useState<
    string | Date | Date[] | null
  >();

  useEffect(() => {
    setReference(transaction?.reference!);
    setExpirationDate(transaction?.due_date!);
    setSelectedType(transaction?.type!);
    setAmount(transaction?.amount!);
  }, [transaction]);

  useEffect(() => {
    selectedType === "PAYMENT"
      ? setFinalAmount(amount! + fees! * -1 + fine! * -1)
      : setFinalAmount(amount! + fees! + fine!);
  }, [amount, fees, fine]);

  const asyncNewRecurrency = async () => {
    try {
      await httpService.put(
        `${process.env.REACT_APP_API_URL}/v1/transactions/pay/${transaction?.id}`,
        {
          
          fine_amount: selectedType === "PAYMENT" ? fine!*-1 : fine,
          fee_amount: selectedType === "PAYMENT" ? fees!*-1 : fees,
          payment_date: paymentDate,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")!}`,
          },
        }
      );
      onSuccess("success", "Successo", "Pagamento realizado com sucesso.");
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
      fees: null,
      fine: null,
      payDate: new Date(),
    },
    validate: (data) => {
      let errors: any = {};

      !data.fees ? (errors.fees = data?.fees === null) : <></>;
      !data.fine ? (errors.fine = data?.fine === null) : <></>;
      !data.payDate ? (errors.payDate = data?.payDate === null) : <></>;

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
              <InputText
                value={reference}
                onChange={(e) => {
                  setReference(e.target.value);
                }}
                disabled
              />
              <label htmlFor="reference">Referencia</label>
            </span>
          </div>
        </div>
        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col">
            <span className="p-float-label">
              <Calendar
                value={expirationDate}
                name="expDate"
                locale="en"
                dateFormat="dd/mm/yy"
                disabled
              />
              <label htmlFor="date">Data Vencimento</label>
            </span>
          </div>
          <div className="col">
            <span className="p-float-label">
              <Calendar
                value={formik.values.payDate}
                name="payDate"
                onChange={(e: CalendarChangeEvent) => {
                  formik.setFieldValue("payDate", e.value);
                  setPaymentDate(e.value!);
                }}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("payDate"),
                })}
                locale="en"
                dateFormat="dd/mm/yy"
              />
              <label htmlFor="date">Data Pagamento</label>
            </span>
          </div>
          <div className="col">
            <span className="p-float-label">
              <Dropdown
                value={selectedType}
                onChange={(e: DropdownChangeEvent) => {
                  setSelectedType(e.value);
                }}
                options={[
                  { label: "Cobrança", value: "BILLING" },
                  { label: "Pagamento", value: "PAYMENT" },
                ]}
                optionLabel="label"
                optionValue="value"
                editable
                placeholder="Selecione um tipo"
                disabled
              />
              <label htmlFor="type">Tipo</label>
            </span>
          </div>
        </div>

        <div className="grid" style={{ marginTop: "2%" }}>
          <div className="col">
            <span className="p-float-label">
              <InputNumber
                id="amount"
                value={selectedType === "PAYMENT" ? amount! * -1 : amount}
                onValueChange={(e) => {
                  setAmount(Number(e.value));
                }}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                disabled
              />
              <label htmlFor="amount">Valor</label>
            </span>
          </div>
          <div className="col">
            <span className="p-float-label">
              <InputNumber
                id="finalAmount"
                value={selectedType === "PAYMENT" ? finalAmount! * -1 : finalAmount}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                disabled
              />
              <label htmlFor="amount">Valor Final</label>
            </span>
          </div>
          <div className="col">
            <span className="p-float-label">
              <InputNumber
                id="fees"
                value={formik.values.fees}
                onValueChange={(e) => {
                  formik.setFieldValue("fees", e.value);
                  setFees(Number(e.value));
                }}
                inputClassName={classNames({
                  "p-invalid": isFormFieldInvalid("fees"),
                })}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
              />
              <label htmlFor="amount">Juros</label>
            </span>
          </div>
          <div className="col">
            <span className="p-float-label">
              <InputNumber
                id="fine"
                value={formik.values.fine}
                onValueChange={(e) => {
                  formik.setFieldValue("fine", e.value);
                  setFine(Number(e.value));
                }}
                inputClassName={classNames({
                  "p-invalid": isFormFieldInvalid("fine"),
                })}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
              />
              <label htmlFor="amount">Multa </label>
            </span>
          </div>
        </div>
        <Button
          label="Salvar"
          onClick={asyncNewRecurrency}
          style={{ marginTop: "10%" }}
        />
      </div>
    </form>
  );
}
