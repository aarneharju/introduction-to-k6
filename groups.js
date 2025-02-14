import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95) < 250"],
  },
};

export default function () {
  group("Main page", function () {
    let response = http.get("https://test.k6.io/");
    check(response, { "status is 200": (res) => res.status === 200 });

    group("Assets", function () {
      http.get("https://test.k6.io/static/css/site.css");
      http.get("https://test.k6.io/static/js/prisms.js");
    });
  });

  group("News page", function () {
    http.get("https://test.k6.io/news");
  });
  sleep(1);
}
