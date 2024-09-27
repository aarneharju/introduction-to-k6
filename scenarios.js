import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const response = http.get('https://test.k6.io');
  console.log(response.status);
  check(response, {
    "Response status is 200": (res) => res.status === 200,
    "Page is start page": (res) => res.body.includes("Collection of simple web-pages suitable for load testing."),
  });
}