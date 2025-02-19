import http from "k6/http";
import { check } from "k6";

export default function () {
    const bodyLogin = JSON.stringify({
        username: "userwithafairlylongname",
        password: "wordofpassing",
    });

    const bodyCreateCroc = JSON.stringify({
        name: "iamgoingtobePATCHed",
        sex: "M",
        date_of_birth: "2005-05-05"
    });

    const bodyPatch = JSON.stringify({
        name: "iHaveBeenPATCHed",
    });

    const paramsLogin = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const responseLogin = http.post("https://test-api.k6.io/auth/token/login/", bodyLogin, paramsLogin);

    // console.log(responseLogin.json().access);
    const accessToken = responseLogin.json().access;

    const paramsToken = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    }

    const responseCrocCreate = http.post("https://test-api.k6.io/my/crocodiles/", bodyCreateCroc, paramsToken);
    // console.log(responseCrocCreate.json());
    const idOfTheCrocToBePATCHed = responseCrocCreate.json().id;

    const responsePatch = http.patch(`https://test-api.k6.io/my/crocodiles/${idOfTheCrocToBePATCHed}/`, bodyPatch, paramsToken);
    // console.log(responsePut);

    let responseCrocList = http.get("https://test-api.k6.io/my/crocodiles/", paramsToken);
    // console.log(responseCrocList.json());

    check(responseCrocList, {
        "status is 200": (r) => r.status === 200,
        "The crocodile has been PATCHed": (r) => r.json().find((croc) => croc.id === idOfTheCrocToBePATCHed).name === "iHaveBeenPATCHed",
    });

    const responseDelete = http.del(`https://test-api.k6.io/my/crocodiles/${idOfTheCrocToBePATCHed}/`, null, paramsToken);
    // console.log(responseDelete);

    responseCrocList = http.get("https://test-api.k6.io/my/crocodiles/", paramsToken);
    // console.log(responseCrocList.json());

    check(responseCrocList, {
        "status is 200": (r) => r.status === 200,
        "The crocodile is deleted (some check)": (r) => !r.json().some((croc) => croc.id === idOfTheCrocToBePATCHed),
    })


}