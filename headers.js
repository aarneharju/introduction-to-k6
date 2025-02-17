import http from "k6/http";
import { check } from "k6";

export default function () {
  let response = http.get("https://jsonplaceholder.typicode.com/todos");

  console.log(response.headers);
  console.log(response.headers["Content-Type"]);

  check(response, {
    "Status is 200": r => r.status === 200,
  })
};