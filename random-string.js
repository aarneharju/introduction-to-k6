import http from "k6/http";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: "20s",
}

export default function () {
    const credentials = {
        username: `user_${randomString(8)}`,
        password: `pass_${randomString(8)}`,
    }

    console.log(credentials);
}