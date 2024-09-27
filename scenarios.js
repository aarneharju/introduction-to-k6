import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const response = http.get('https://test.k6.io');
  console.log(response.status);
  check(true, {
    "True is true": (value) => value === true,
  });
}