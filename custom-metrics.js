import http from "k6/http";
import { sleep } from "k6";
import { Counter, Trend } from "k6/metrics"; // Counter, Rate, Gauge,  Trend

let myCounter = new Counter("my_counter");
let newsPageResponseTrend = new Trend("response_time_news_page");

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    my_counter: ["count > 4"],
    response_time_news_page: ["p(95) < 200", "p(99) < 250"],
  },
};

export default function () {
  let response = http.get("https://test.k6.io");
  myCounter.add(1);
  sleep(1);

  response = http.get("https://test.k6.io/news");
  newsPageResponseTrend.add(response.timings.duration);
  sleep(1);
}
