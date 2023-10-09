import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Timer() {
    const [minutos, setMinutos] = useState(15);
    const [segundos, setSegundos] = useState(0);

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(`/store`)
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (minutos === 0 && segundos === 0) {
                clearInterval(interval);
                handleCancel(); //caso o temporizador zere, a aquisição será cancelada e o user enviado para a página inicial de Store
            } else {
                if (segundos === 0) {
                    setMinutos(minutos - 1);
                    setSegundos(59);
                } else {
                    setSegundos(segundos - 1);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [minutos, segundos]);

    const formattedMinutos = minutos < 10 ? `0${minutos}` : minutos;
    const formattedSegundos = segundos < 10 ? `0${segundos}` : segundos;

    return (
        <div>
          <h1>{formattedMinutos}:{formattedSegundos}</h1>
        </div>
      );
}