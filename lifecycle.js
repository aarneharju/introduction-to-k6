import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "5s",
};

console.log("-- init stage --");

export default function (data) {
  console.log("-- VU stage --");
  sleep(1);
}

export function setup() {
  console.log("-- Setup stage --");
  sleep(5);
  const data = { foo: "bar" };
  return data;
}

export function teardown(data) {
  console.log("-- Teardown stage --");
}
