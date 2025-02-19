import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const baseUrl = "https://test-api.k6.io";

export const options = {
    vus: 5,
    duration: "5s",
}
export default function () {
    http.get(`${baseUrl}/public/crocodiles/`);
    const randomSleep = Math.random() * 3;
    sleep(randomSleep);
    console.log(`Sleeping for ${randomSleep} seconds`);
    const randomSleepBetweenXY = randomIntBetween(2, 4);
    sleep(randomSleepBetweenXY);
    console.log(`Thinking for ${randomSleepBetweenXY} seconds`);
}