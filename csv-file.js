import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

const userCredentials = new SharedArray("userCredentials", function () {
    const csvData = papaparse.parse(open("./data/users.csv"), { header: true }).data;
    return csvData;
});

export default function () {
    userCredentials.forEach(cred => {
        console.log(`Username: ${cred.username}, Password: ${cred.password}`);
    });
};