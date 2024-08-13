const express = require('express');
const axios = require('axios');
const { Observable } = require('rxjs');
const { tap, catchError } = require('rxjs/operators');

const app = express();
const port = 3002;

const peopleAPIUrl = "http://localhost:3000/api";
const doctorAPIUrl = "http://localhost:3001/api";
const dni = '4376602';

/* CONSUMIENDO PEOPLE */
function fetchPeopleReactive() {
    return new Observable(observer => {
        axios.get(peopleAPIUrl + "/people/" + dni).then(response => {
            observer.next(response);
            observer.complete();
        })
        .catch(e => { observer.error(e) });
    });
}

/* CONSUMIENDO DOCTOR */
function fetchDoctorReactive() {
    return new Observable(observer => {
        axios.get(doctorAPIUrl + "/doctor/" + dni).then(response => {
            observer.next(response);
            observer.complete();
        })
        .catch(e => { observer.error(e) });
    });
}

app.get('/fetch-data', (req, res) => {
    const peopleSubscription = fetchPeopleReactive().pipe(
        tap(data => {
            console.log("Datos PEOPLE recibidos de manera reactiva", data.data);
        }),
        catchError(e => {
            console.log("Error al consumir PEOPLE datos", e);
            return [];
        })
    ).subscribe();

    const doctorSubscription = fetchDoctorReactive().pipe(
        tap(data => {
            console.log("Datos DOCTOR recibidos de manera reactiva", data.data);
        }),
        catchError(e => {
            console.log("Error al consumir DOCTOR datos", e);
            return [];
        })
    ).subscribe();

    res.send('Datos solicitados de manera reactiva');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
