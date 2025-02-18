import http from "k6/http";
import { check } from "k6";

export default function () {

    const credentials = {
        username: "testuser_" + Date.now(),
        password: "test_" + Date.now(),
    }

    const body = JSON.stringify(
        {
            username: credentials.username,
            password: credentials.password,
        }
    )

    const params = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    http.post("https://test-api.k6.io/user/register/", body, params);

    const response = http.post("https://test-api.k6.io/auth/token/login/", body, params);

    console.log(response.json().access);
}
