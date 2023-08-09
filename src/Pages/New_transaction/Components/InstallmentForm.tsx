import { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Installment } from "../../../models/Installment";
import { CurrencyEnum } from "../../../Shared/enums/CurrencyEnum";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";

export default function InstallmentForm({
  index,
  onHandleUpdate,
  onError,
  walletCurrency
}: {
  index: number;
  onHandleUpdate: any;
  onError: Function;
  walletCurrency: CurrencyEnum
}) {
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState<Date>();
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const i: Installment = {
      amount: amount,
      due_date: date!,
      paid: paid,
      number: (index+1),
    };
    onHandleUpdate(i, index);
  }, [amount, date, paid]);

  const formik = useFormik({
    initialValues: {
      amount: null,
      date: [],
    },
    validate: (data) => {
      let errors: any = {};

        !data.amount ? (
          (errors.amount = data?.amount === null)
        ) : <></>
        !data.date ? (
          (errors.date = data?.date === null)
        ) : <></>


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
    <form onChange={formik.handleChange}>
      <div className="formgrid grid" style={{ marginTop: "2%" }}>
        <div className="field col">
          <span className="p-float-label">
            <InputNumber
              id="amount"
              name="amount"
              value={formik.values.amount}
              onValueChange={(e) => {
                formik.setFieldValue("amount", e.target.value);
                setAmount(Number(e.value));
              }}
              className={classNames({
                "p-invalid": isFormFieldInvalid("amount"),
              })}
              mode="currency"
              currency={walletCurrency}
              locale="pt-BR"
            />
            <label htmlFor="amount">Valor (Parcela {index + 1}) *</label>
          </span>
        </div>
        <div className="field col">
          <span className="p-float-label">
            <Calendar
              value={formik.values.date}
              onChange={(e: any) => {
                formik.setFieldValue("date", e.target.value);
                setDate(e.value!);
              }}
              locale="en"
              className={classNames({
                "p-invalid": isFormFieldInvalid("date"),
              })}
              dateFormat="dd/mm/yy"
            />
            <label htmlFor="date">Data *</label>
          </span>
        </div>
        <div className="field col">
          <div className="flex align-items-center" style={{ marginTop: "5%" }}>
            <Checkbox
              inputId="paid"
              name="paid"
              value=""
              onChange={(e) => setPaid(e.checked!)}
              checked={paid}
            ></Checkbox>
            <label htmlFor="paid" className="ml-2">
              Pago
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
