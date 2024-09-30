import http from "k6/http";
import { Counter } from "k6/metrics";
import { checks, sleep } from "k6";

export const options = {
    thresholds: {
        http_req_duration: ["p(95) < 300"],
        http_errors: ["count === 0"],
    },
};

let httpErrors = new Counter(http_errors);

export default function () {
    let response = http.get("");
}

// export default function() {
console.log("helpp");
