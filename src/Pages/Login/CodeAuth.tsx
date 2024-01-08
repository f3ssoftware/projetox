import "./Login.css";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast, ToastMessage } from "primereact/toast";
import SVGLogo from "../../Shared/img/LogoSVG";
import Video from "../../Shared/img/PeopleBusiness.mp4";
import httpService from "../../Shared/HttpHelper/pjx-http.helper";
import {
  authenticateCognito,
  signUpCognito,
} from "../../Shared/GoogleAuth/GoogleAuth";

export default function CodeAuth() {
  let navigate = useNavigate();
  const [code, setCode] = useState("");

  const toast = useRef<Toast>(null);

  const show = (
    severity: ToastMessage["severity"],
    summary: string,
    detail: string
  ) => {
    toast.current?.show({ severity, summary, detail });
  };

  useEffect(() => {}, []);

  async function LogUser(e: any) {
    // e.preventDefault();
    // if (user !== '' && senha !== '') {
    //     // await authenticateCognito(user, senha).then(() => {
    //     //     navigate('/dashboard', { replace: true })
    //     // })
    //     try {
    //         const result = await httpService.post(`${process.env.REACT_APP_API_URL}/v2/authentication/login`, {
    //             email: user,
    //             password: senha,
    //         });
    //         sessionStorage.setItem("access_token", result?.data.idToken.jwtToken);
    //         sessionStorage.setItem("refresh_token", result?.data.idToken.refreshToken);
    //         navigate('/dashboard', { replace: true })
    //     }
    //     catch (err: any) {
    //         console.log(err);
    //         //  alert('Usuário não credenciado.')
    //         show('error', 'Erro', 'Usuário não credenciado');
    //     }
    // }
    // else {
    //     show('warn', 'Atenção!', 'Insira os dados em todos os campos.');
    // }
  }

  return (
    <div className="container">
      <div className="fitting">
        <video
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          loop
          autoPlay
          muted
        >
          <source src={Video} type="video/mp4" />
        </video>
      </div>

      <div className="login">
        <div className="pull-everybody">
          <div style={{marginBottom: '5%', color: '#FFFFFF'}}>
            <span>
              Um código de confirmação foi enviado para o email. informe-o para
              liberação do usuário
            </span>
          </div>

          <form onSubmit={(e) => LogUser(e)}>
            <Toast ref={toast} />
            <div className="login-user" style={{ width: "100%" }}>
              <label>Código</label>
              <InputText
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <Button
              label="Confirmar"
              onClick={(e) => LogUser(e)}
              style={{ marginTop: "10%" }}
            />

            <div className="Register" style={{ marginTop: "5%" }}>
              <Link to={`/login`}>Retornar ao Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
