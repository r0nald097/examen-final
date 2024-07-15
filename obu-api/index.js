const axios = require("axios")
const  {Observable} = require("rxjs")
const {tap, catchError} = require("rxjs/operators")

const peopleAPIUrl="http://localhost:3000/api";
const policeAPIUrl="http://localhost:3001/api";
const dni= '4376602';

/* CONSUMIENDO PEOPLE */
function fetchPeopleReactive(){
    return new Observable( observer => {
        axios.get(peopleAPIUrl+"/people/"+dni).then(response=>{
            observer.next(response);
            observer.complete();
        })
        .catch(e=>{ observer.error(e) });
    });
}
fetchPeopleReactive().pipe(
    tap(data=>{
        console.log("datos PEOPLE recibidos de manera reactiva", data.data);
    }),
    catchError(e=>{
        console.log("Error al consumir PEOPLE datos", e);
        return [];
    })
).subscribe();

/* CONSUMIENDO POLICE */
function fetchPoliceReactive(){
    return new Observable( observer => {
        axios.get(policeAPIUrl+"/police/"+dni).then(response=>{
            observer.next(response);
            observer.complete();
        })
        .catch(e=>{ observer.error(e) });
    });
}

fetchPoliceReactive().pipe(
    tap(data=>{
        console.log("datos POLICE recibidos de manera reactiva", data.data);
    }),
    catchError(e=>{
        console.log("Error al consumir POLICE datos", e);
        return [];
    })
).subscribe();