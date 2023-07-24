import { SHA256 } from 'crypto-js';
import React, { useState } from 'react';

const GITHUB_TOKEN = "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";

const Button = () => {
    const [URL_ENDPOINT, setEndpoint] = useState("");
    const callWorkflow = async (url, urlbin, modelname) => {
        let datakey = "i-love-adsoftsito|" + Date.now();
        console.log(datakey);
        let mysha = SHA256(datakey);
        console.log("SHA : " + mysha);
        await fetch('https://api.github.com/repos/ZurisaddaiRJ/myMLOps_Hello-World/dispatches', {
            method: 'POST',
            body: JSON.stringify({
                event_type: "predictionjs",
                client_payload: {
                    "codeurl": url,
                    "codebin": urlbin,
                    "MODEL_NAME": modelname,
                    "sha": mysha
                }
            }),
            headers: {
                'Authorization': 'Bearer ' + GITHUB_TOKEN,
                'Accept': 'application/vnd.github.v3+json',
                'Content-type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response);
            })
            .then((data) => {
                console.log(data);
                URL_ENDPOINT = "https://linear-model-service-modelos-zurisaddairj.cloud.okteto.net/v1/models/linear-model:predict";
                setEndpoint(URL_ENDPOINT)
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleClick = () => {
        // Llamar a la función callWorkFlow con los parámetros necesarios
        callWorkflow("urlValue", "urlbinValue", "modelnameValue");
    };

    return (
        <button onClick={handleClick}>Activar función</button>
    );
};

export default Button;