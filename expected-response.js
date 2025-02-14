import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95) < 5500"],
    "http_req_duration{expected_response:true}": ["p(95) < 1000"],
    "group_duration{group:::Main page}": ["p(95) < 8000"],
    "group_duration{group:::Main page::Assets}": ["p(95) < 3000"],
    "group_duration{group:::News page}": ["p(95) < 6000"],
  },
};

export default function () {
  group("Main page", function () {
    let response = http.get(
      "https://run.mocky.io/v3/7e4d2a14-1401-4337-be84-884299ef4cab?mocky-delay=900ms"
    );
    check(response, { "status is 200": (res) => res.status === 200 });

    group("Assets", function () {
      http.get(
        "https://run.mocky.io/v3/7e4d2a14-1401-4337-be84-884299ef4cab?mocky-delay=900ms"
      );
      http.get(
        "https://run.mocky.io/v3/7e4d2a14-1401-4337-be84-884299ef4cab?mocky-delay=900ms"
      );
    });
  });

  group("News page", function () {
    http.get("https://run.mocky.io/v3/5ae44c88-9fd0-450b-b9fc-2b46e6ad9408");
  });
  sleep(1);
}
