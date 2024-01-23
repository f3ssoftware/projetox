import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  ColorPicker,
  ColorPickerChangeEvent,
} from "primereact/colorpicker";
import httpService from "../../../../Shared/HttpHelper/pjx-http.helper";

export default function IncludeGroup({
  closeDialog,
  onSuccess,
  onError,
  walletId,
}: {
  closeDialog: any;
  onSuccess: Function;
  onError: Function;
  walletId: string;
}) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [colorHEX, setColorHEX] = useState<any>("6466f1");

  const addGroups = async () => {
    try {
      await httpService.post(
        `${process.env.REACT_APP_API_URL}/v1/groups/${walletId}`,
        {
          name: text1,
          label: text2,
          color: colorHEX,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );
      onSuccess("success", "Success", "Grupo criado com sucesso.");
      closeDialog();
    } catch (err) {
      if ((err = 400)) {
        onError("error", "Erro", "Erro ao criar grupo");
      }
    }
  };

  return (
    <div className="inclusao-container grid">
      <h1>Incluir Grupo</h1>

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
          {<Button label="INCLUIR" onClick={() => addGroups()} />}
        </div>
      </div>
    </div>
  );
}
