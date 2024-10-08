import http from "k6/http";
import { Counter } from "k6/metrics";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95) < 300"],
    "http_req_duration{page:order}": ["p(95) < 200"],
    http_errors: ["count === 0"],
    "http_errors{page:order}": ["count === 0"],
    checks: ["rate > 0.95"],
    "checks{page:order}": ["rate > 0.99"],
  },
};

let httpErrors = new Counter("http_errors");

export default function () {
  let response = http.get(
    "https://run.mocky.io/v3/72afceef-7082-4451-abb0-195bfe1360c9"
  );

  if (response.error) {
    httpErrors.add(1);
  }

  check(response, {
    "status is 200": (res) => res.status === 200,
  });

  // Submit order
  response = http.get(
    "https://run.mocky.io/v3/95293f08-1956-4e58-84b5-789af6368a62?mocky-delay=2000ms",
    {
      tags: {
        page: "order",
      },
    }
  );

  if (response.error) {
    httpErrors.add(1, { page: "order" });
  }

  check(
    response,
    { "status is 201": (res) => res.status === 201 },
    { page: "order" }
  );

  sleep(1);
}
