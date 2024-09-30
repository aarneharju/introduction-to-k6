import http from "k6/http";

export const options = {
  thresholds: {
    http_req_duration: ["p(95) < 1000"],
    "http_req_duration{status: 200}": ["p(95) < 1000"],
    "http_req_duration{status: 201}": ["p(95) < 1000"],
  },
};

export default function () {
  http.get("https://run.mocky.io/v3/25b5c374-97b2-4b1b-9b0c-214e9708693b");
  http.get(
    "https://run.mocky.io/v3/869f0325-d96d-4fea-ac09-7a0856b46963?mocky-delay=2000ms"
  );
}
