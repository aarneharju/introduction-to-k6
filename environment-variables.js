import http from "k6/http";

export default function () {
    // NOTE: You need to run this with -> k6 run -e BASE_URL=https://test-api.k6.io environment-variables.js
    console.log(__ENV.BASE_URL);

    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}