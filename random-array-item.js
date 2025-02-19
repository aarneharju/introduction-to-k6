import http from "k6/http";
import { check } from "k6";
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
    let response = http.get(`https://test-api.k6.io/public/crocodiles/`);
    const crocodiles = response.json();
    console.log(crocodiles);
    const crocodileIds = crocodiles.map(crocodile => crocodile.id);
    console.log(`Crocodile IDs: ${crocodileIds}`);

    // Vanilla version
    response = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileIds[Math.floor(Math.random() * crocodileIds.length)]}`);
    console.log(`Random name vanilla: ${response.json().name}`);

    // Using k6-jsdoc-utils
    response = http.get(`https://test-api.k6.io/public/crocodiles/${randomItem(crocodileIds)}`);
    console.log(`Random name k6-jsdoc-utils: ${response.json().name}`);
}