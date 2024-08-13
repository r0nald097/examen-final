const express = require("express")
const  {observable, from} = require("rxjs")
const {map,filter} = require("rxjs/operators")

const app = express()
const port = 3001

const data = [
    {id:5, dni:4324345, diagnostico:[{name:'dolor de cabeza'}] },
    {id:6, dni:4844554, diagnostico:[{name:'operacion de radio'} ] },
    {id:7, dni:4234473, diagnostico:[{name:'dolor del tobillo'}] },
]

app.get("/api/doctor/:dni", (req, res)=>{
    console.log("REQUEST", new Date());
    let processData = [];
    const observable = from(data);
    observable.pipe(
        filter(e=>e.dni==req.params.dni),
        map( user => ({id:user.id, dni:user.dni, diagnostico:user.diagnostico}) )
    )
    .subscribe({
        next:value=>{ processData.push(value) },
        complete:()=>{ 
            console.log("RESPONSE", new Date());
            res.json(processData) }
    })
});

app.listen(port, ()=>{
    console.log("Listen DOCTOR in "+port);
});
