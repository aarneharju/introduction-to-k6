import http from "k6/http";

export default function () {
  const response = http.get("https://test.k6.io/public/crocodiles/");
  console.log(response);
}
