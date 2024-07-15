const axios = require("axios")
const  {Observable} = require("rxjs")
const {tap, catchError} = require("rxjs/operators")

const peopleAPIUrl="http://localhost:3000/api";
const dni= '4376602';
function fetchDataReactive(){
    return new Observable( observer => {
        axios.get(peopleAPIUrl+"/people/"+dni).then(response=>{
            observer.next(response);
            observer.complete();
        })
        .catch(e=>{ observer.error(e) });
    });
}
fetchDataReactive().pipe(
    tap(data=>{
        console.log("datos recibidos de manera reactiva", data.data);
    }),
    catchError(e=>{
        console.log("Error al consumidr datos", e);
        return [];
    })
).subscribe();