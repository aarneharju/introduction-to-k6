import http from "k6/http";

export default function () {
    const body = JSON.stringify({
        username: "userwithafairlylongname",
        password: "wordofpassing",
    });

    const params = {
        headers: {
            "content-type": "application/json",
        }
    }

    const response = http.post("https://test-api.k6.io/auth/token/login/", body, params);

    console.log(response.json());

    const accesToken = response.json().access;

    const responseCrocodiles = http.get(
        "https://test-api.k6.io/my/crocodiles/",
        {
            headers: {
                Authorization: `Bearer ${accesToken}`,
            }
        }
    );

    console.log(responseCrocodiles.json());

}