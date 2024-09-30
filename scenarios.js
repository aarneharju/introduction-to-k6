import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";
import { Counter } from "k6/metrics"; // Counter, Rate, Gauge,  Trend

let myCounter = new Counter("my_counter");

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95) < 200", "max < 2000"],
    http_req_failed: ["rate < 0.01"], // 1% error rate allowed
    http_reqs: ["rate > 1", "count > 10"],
    vus: ["value > 3"],
    checks: ["rate > .99"],
    my_counter: ["count > 4"],
  },
};

export default function () {
  const response = http.get(
    "https://test.k6.io" + (exec.scenario.iterationInTest === 1 ? "/foo" : "")
  ); // simulates one request going haywire
  // console.log(response.status);
  myCounter.add(1);
  check(response, {
    "Response status is 200": (res) => res.status === 200,
    "Page is start page": (res) =>
      res.body.includes(
        "Collection of simple web-pages suitable for load testing."
      ),
  });
  sleep(2);
}
