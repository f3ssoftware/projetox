import './advanced-filter.css'
import { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Toast, ToastMessage } from 'primereact/toast';
import { useFormik } from 'formik';

export default function AdvancedFilter({ walletId, fetch, closeDialog, walletCurrency }: { walletId: string, fetch: Function, closeDialog: any,  walletCurrency: any }) {

    const [dates, setDates] = useState<any[]>()
    var [value2, setValue2] = useState("");
    const [value3, setValue3] = useState<number|null>(null);
    const [value4, setValue4] = useState<number|null>(null);

    const formik = useFormik({initialValues:{
        email: 'lala@gmail.com',
    },
    onSubmit: values => {
        alert('Funcion')
    }
})

    const onSave = () => {
         
            (dates)?
            fetch({startDate: dates[0],endDate: dates[1],reference: value2,minAmount: value3,maxAmount: value4})
            
        :
            
            fetch({reference: value2 ,minAmount: value3,maxAmount: value4})
            closeDialog();
        }


    useEffect(() => {
      
    }, []);
    const toast = useRef<Toast>(null);

    const AdvFilterToast = (severity: ToastMessage["severity"], summary: string, detail: string) => {
        toast.current?.show([{ severity, summary, detail }]);
    };

    return (

        <div className='filter-container'>

            <Toast ref={toast} />

            <div id='enquadramento-full'>
                <div id='enquadramento'>
                    <div className='inputs'>

                        <span className="p-float-label" style={{ marginTop: '4%', fontSize: '90%' }}>

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
                            <label htmlFor="value1">Período</label>

                        </span>

                        <span className="p-float-label" style={{ marginTop: '6%', fontSize: '90%' }}>

                            <InputText id='value2' value={value2} onChange={(e) => setValue2(e.target.value) }/>
                            <label htmlFor="value2">Nome da Referência</label>

                        </span>

                        <div id='range'>
                            <span className="p-float-label" style={{ width: '48%', marginTop: '6%', fontSize: '90%' }} >
                                <InputNumber id='value3' value={value3} onChange={(e) => setValue3(e.value)} prefix={walletCurrency + ' '} useGrouping={false} />
                                <label htmlFor="value3">Valor Mínimo</label>
                            </span>
                            <span className="p-float-label" style={{ width: '48%', marginTop: '6%', fontSize: '90%' }}>
                                <InputNumber id='value4' value={value4} onChange={(e) => setValue4(e.value)} style={{ marginTop: '1%' }} prefix={walletCurrency + ' '} useGrouping={false} />
                                <label htmlFor="value4">Valor Máximo</label>
                            </span>
                        </div>

                    </div>

                </div>

                <div className='enquadramento-filtro'>
                    {<Button label="FILTRAR" onClick={() => (value3!=null && value4!=null && (value3 >= value4) && walletId)? AdvFilterToast('warn', 'Atenção!', 'Valor mínimo deve ser inferior ao valor máximo.') : onSave()} />}
                </div>

            </div>

        </div>
    )

}