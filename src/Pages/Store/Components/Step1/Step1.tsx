import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Step1({ productId, setNextStep }: { productId: any, setNextStep: any }) {

  const [products, setProducts] = useState<any[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<any>();
  const navigate = useNavigate();
    const handleCancel = () => {
        navigate(`/store`)
    };

  const fetchProduct = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/store/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          }
        }
      );

      setProducts([result.data])


    } catch (err) {
      alert(err);
    }
  };




  useEffect(() => {
    fetchProduct();
  }, []);

  return (

    <div className="data-table">
      <DataTable
        value={products}
        selectionMode="single"
        //   selection={selectedTransaction}
        //   onSelectionChange={(e:any) => {
        //     setSelectedTransaction(e.value);
        //   }}
        tableStyle={{ width: '92%' }}
      >
        <Column field="name" header="Nome do Item"></Column>

        <Column
          field="description" header="Descrição"
        ></Column>

        <Column
          field="amount" header="Valor"
          body={(product) => (
            <span
            >
              {product.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: 'BRL',
              })}
            </span>
          )}
        ></Column>

      </DataTable>

     

      <div className='grid' style={{ marginTop: '5%', width: '93%' }} >

      <div className='col-1'>
        <div className="secondButton" >
          <Button type="button" label="CANCELAR" style={{ color: '#0278D3', backgroundColor: 'white', border: '1px solid #0278D3' }}
            onClick={() => handleCancel()}

          />

        </div>
      </div>
        <div className='col-10'>
        </div>

        <div className='col-1'>
          <div className="secondButton">
            <Button label="PRÓXIMO" onClick={() => setNextStep(1)} />

          </div>
        </div>
      </div>


    </div>

  )
}