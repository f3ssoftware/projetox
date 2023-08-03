import { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Installment } from "../../../models/Installment";
import { CurrencyEnum } from "../../../Shared/enums/CurrencyEnum";

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

  return (
    <form>
      <div className="formgrid grid" style={{ marginTop: "2%" }}>
        <div className="field col">
          <span className="p-float-label">
            <InputNumber
              id="amount"
              name="amount"
              value={amount}
              onValueChange={(e) => {
                setAmount(Number(e.value));
              }}
              className={amount === 0 ? "p-invalid" : ""}
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
              value={date}
              onChange={(e: any) => {
                setDate(e.value!);
              }}
              locale="en"
              className={date === undefined ? "p-invalid" : ""}
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
