import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

// shared array needs to be run in the init phase
const crocodilesFromJSONfile = new SharedArray('crocodilesFromJSONfile', function () {
    return JSON.parse(open('./data/crocodiles.json')).crocodiles;
});

const paramsContentTypeJSON = {
    headers: {
        "Content-Type": "application/json",
    },
}

export function setup() {

    const bodyLogin = JSON.stringify({
        username: "userwithafairlylongname",
        password: "wordofpassing",
    });

    const responseLogin = http.post("https://test-api.k6.io/auth/token/login/", bodyLogin, paramsContentTypeJSON);
    const accessToken = responseLogin.json().access;
    console.log("Access token:::::" + accessToken);


    const paramsToken = {
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json",
        },
    }

    crocodilesFromJSONfile.forEach(crocodile => {
        const responseCreate = http.post("https://test-api.k6.io/my/crocodiles/", JSON.stringify(crocodile), paramsToken);
    });

    return { accessToken };
}

export default function (data) {

    console.log("Access token from VU stage:::::" + data.accessToken);


    const paramsToken = {
        headers: {
            "Authorization": "Bearer " + data.accessToken,
        },
    }

    // get a random croc
    const responseCrocs = http.get(`https://test-api.k6.io/my/crocodiles/`, paramsToken);
    check(responseCrocs, {
        'status of responseCrocs is 200': (r) => r.status === 200,
    });

    console.log(responseCrocs.json()[0].name);

    const crocList = responseCrocs.json();
    const randomCroc = crocList[Math.floor(Math.random() * crocList.length)];

    console.log(`Random croc name: ${randomCroc.name}`);

    //delete created users with csv file
    crocodilesFromJSONfile.forEach(croc => {
        // find the croc id from crocList based on the name
        const crocID = crocList.find(c => c.name === croc.name).id;
        const response = http.del(
            `https://test-api.k6.io/my/crocodiles/${crocID}/`,
            null,
            paramsToken,
        );
        check(response, {
            'status is 204': (r) => r.status === 204,
        });
    });

}