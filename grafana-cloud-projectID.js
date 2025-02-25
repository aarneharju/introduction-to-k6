import http from 'k6/http';

// k6 run grafana-cloud-projectID.js -o cloud
export const options = {
    vus: 10,
    duration: "30s",
    cloud: {
        projectID: 3749023
    }
};

export default function () {
    http.get("https://test.k6.io/public/crocodiles/");
};