import http from "k6/http";
import { sleep } from "k6";
import exec from "k6/execution";

export const options = {
  vus: 10,
  duration: "60s",
};

export function setup() {
  const res = http.get("https://invalid.url/");
  if (res.error) {
    exec.test.abort("Aborting test, application is down.");
  }
}

export default function () {
  http.get("https://invalid.url/subpage");
  sleep(1);
}
