import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useEffect, useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import Step2Form from "./Step2NaturalPerson";
import Step2NaturalPerson from "./Step2NaturalPerson";
import Step2LegalPerson from "./Step2LegalPerson";
import "./Step2.css"


export default function Step2({ setNextStep, productId, step2Body, setPaymentChosed, pixImg, pixCopyPaste }: { setNextStep: any, productId: any, step2Body: any, setPaymentChosed:any, pixImg:any, pixCopyPaste:any }) {

    const [personChosed, setPersonChosed] = useState<any>('');
    const categories = [
        { name: 'Pix', key: 'pix' },
        { name: 'Credit Card', key: 'credit_card' }
    ];
    const [selectedCategory, setSelectedCategory] = useState<any>(categories[0]);
    const personType: any = [
        { name: 'Pessoa Física', key: 'individual' },
        { name: 'Pessoa Jurídica', key: 'company' }
    ];
    

    const RenderingPage = () => {
        switch (personChosed.name) {
            case 'Pessoa Física':


                return (

                    <Step2NaturalPerson personChosed={personChosed} changeStep={setNextStep} paymentMethod={selectedCategory} productId={productId} step2Body={step2Body} setPayment3Step = {setPaymentChosed} pixImg={pixImg} pixCopyPaste={pixCopyPaste}/>

                )
                break;

            case 'Pessoa Jurídica':
                return (

                    <Step2LegalPerson personChosed={personChosed} changeStep={setNextStep} paymentMethod={selectedCategory} productId={productId} step2Body={step2Body} setPayment3Step = {setPaymentChosed} pixImg={pixImg} pixCopyPaste={pixCopyPaste}/>

                )
                break;

            default:


                return (<></>)
        }
    }

    
    const updatePaymentType = (params:any) => {
        setSelectedCategory(params)
    }




    return (

        <div className="grid">
            <div className="col-12">

                <h4 style={{ marginBottom: '3%', fontSize: '20px' }}>Escolha um Método de Pagamento</h4>


                {categories.map((category) => {
                    return (
                        <div key={category.key} className="flex align-items-center" style={{ marginBottom: '1%' }}>
                            <RadioButton inputId={category.key} name="category" value={category} checked={selectedCategory.key === category.key} onChange={(e: RadioButtonChangeEvent) => {updatePaymentType(e.value)}}  />
                            <label htmlFor={category.key} className="ml-2">{category.name}</label>
                        </div>
                    );
                })}

                <div className="personalInfo-tittle">
                    <h4 style={{ marginBottom: '3%', marginTop: '3%' }}>Informações Pessoais</h4>
                </div>
                <div className="grid">
                    <div className="col-12 md:col-4 lg:col-4" style={{ marginTop: '2%', marginBottom: '3%' }}>
                        <span className="p-float-label">
                            <Dropdown value={personChosed} onChange={(e: DropdownChangeEvent) => setPersonChosed(e.value)} options={personType} optionLabel="name" editable />
                            <label htmlFor="date">Tipo de Pessoa</label>
                        </span>
                    </div>
                </div>

                <div>
                    <RenderingPage />
                </div>

            </div>

        </div>
    )
}