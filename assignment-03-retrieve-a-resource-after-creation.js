import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const bodyLogin = JSON.stringify({
        username: "userwithafairlylongname",
        password: "wordofpassing",
    });

    const paramsLogin = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const responseLogin = http.post("https://test-api.k6.io/auth/token/login/", bodyLogin, paramsLogin);

    console.log(responseLogin.json().access);
    const accessToken = responseLogin.json().access;

    const paramsToken = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    const responseCroc = http.get("https://test-api.k6.io/my/crocodiles/15520941/", paramsToken);
    console.log(responseCroc.json());

    check(responseCroc, {
        "status is 200": (r) => r.status === 200,
    });
}