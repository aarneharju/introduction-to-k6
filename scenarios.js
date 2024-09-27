import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95) < 200'],
    http_req_duration: ['max < 2000'],
    http_req_failed: ['rate < 0.01'], // 1% error rate allowed
    http_reqs: ['rate > 4'],
    http_reqs: ['count > 20'],
    vus: ['value > 9'],
  }
}

export default function () {
  const response = http.get('https://test.k6.io');
  // console.log(response.status);
  check(response, {
    "Response status is 200": (res) => res.status === 200,
    "Page is start page": (res) => res.body.includes("Collection of simple web-pages suitable for load testing."),
  });
  sleep(2);
}