import { Button } from "primereact/button";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { GroupDTO } from "../../../../models/GroupDTO";
import httpService from "../../../../Shared/HttpHelper/pjx-http.helper";

export default function EditGroup({
    closeDialog,
    onSuccess,
    onError,
    group,
  }: {
    closeDialog: any;
    onSuccess: Function;
    onError: Function;
    group: GroupDTO;
  })

  {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [colorHEX, setColorHEX] = useState<any>("6466f1");
  
    const addGroups = async (params?: any) => {

      try {
        const result = await httpService.get(
          `${process.env.REACT_APP_API_URL}/v1/groups/detail/${group?.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
            params
          });
          setText1(result!.data.name)
          setText2(result!.data.label)
          setColorHEX(result!.data.color)
    
    
        } catch (err) {
          alert(err);
        }
      }

      const ChangeGroup = async () => {
        try {
            const result = await httpService.put(`${process.env.REACT_APP_API_URL}/v1/groups`, {
                id: group.id,
                name: text1,
                label: text2,
                color: colorHEX
            },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                    }
                })

            onSuccess('success', 'Success', 'Editado com sucesso.');


            closeDialog();

        }
        catch (err) {
            if (err = 400) {
                onError('error', 'Erro', '' + err);
            }
        }
    }
    
    useEffect(() => {
        console.log(group.id);
        addGroups();
    }, []);
    return (
      <div className="inclusao-container grid">
        <h1>Editar Grupo</h1>
  
        <div className="inclusao-frame grid">
          <label htmlFor="text1" style={{ marginBottom: "1%" }}>
            Nome
          </label>
          <InputText value={text1} onChange={(e) => setText1(e.target.value)} />
  
          <label htmlFor="text2" style={{ marginBottom: "1%" }}>
            Label
          </label>
          <InputText value={text2} onChange={(e) => setText2(e.target.value)} />
  
       
            <div className="grid">
              <label htmlFor="cp-hex" className="font-bold block mb-2 ">
                Cor
              </label>
              <ColorPicker
                inputId="cp-hex"
                format="hex"
                value={colorHEX}
                onChange={(e: ColorPickerChangeEvent) => setColorHEX('#' + e.value!)}
                className="mb-2 col-1"
              />
            </div>
  
          <div className="inclusao-button">
            {<Button label="EDITAR" onClick={() => ChangeGroup()} />}
          </div>
        </div>
      </div>
    );

  }

