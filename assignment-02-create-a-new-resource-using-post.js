import http from 'k6/http';

export default function () {
    const bodyLogin = JSON.stringify({
        username: "userwithafairlylongname",
        password: "wordofpassing",
    });

    const bodyCreateCroc = JSON.stringify({
        name: "crock",
        sex: "F",
        date_of_birth: "2003-03-03"
    })

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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    }

    const responseCroc = http.post("https://test-api.k6.io/my/crocodiles/", bodyCreateCroc, paramsToken);
    console.log(responseCroc.json());
}