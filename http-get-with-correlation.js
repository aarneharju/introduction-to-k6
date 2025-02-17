import http from "k6/http";
import { check } from "k6";

export default function () {
  let response = http.get("https://jsonplaceholder.typicode.com/todos");
  const allTodos = response.json();
  console.log(allTodos[3]);
  const todoID = allTodos[3].id;

  response = http.get(`https://jsonplaceholder.typicode.com/todos/${todoID}`);
  console.log(response.body);

  check(response, {
    "Status is 200": r => r.status === 200,
    "Todo title is correct": r => r.json().title === allTodos[3].title,
  })
};