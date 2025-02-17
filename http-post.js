import http from "k6/http";
import { check } from "k6";

export default function () {
    const body = JSON.stringify(
        {
            username: "TestUser_" + Date.now(),
            password: "user",
        })

    const params = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    http.post("https://test-api.k6.io/user/register/", body, params);
}