const express = require("express")
const  {observable, from} = require("rxjs")
const {map, filter} = require("rxjs/operators")

const app = express()
const port = 3000

const data = [
    {id:1, dni:4324689, name:"LORENA"},
    {id:2, dni:4866624, name:"KAREN"},
    {id:3, dni:4776573, name:"ANGELA"},
]

app.get("/api/people/:dni", (req, res)=>{
    console.log("REQUEST", new Date());
    let processData = [];
    const observable = from(data);
    observable.pipe(
        filter(e=>e.dni==req.params.dni),
        map( user => ({id:user.id, dni:user.dni, name:user.name, processed:true}) )
    )
    .subscribe({
        next:value=>{ processData.push(value) },
        complete:()=>{ 
            console.log("RESPONSE", new Date());
            res.json(processData) }
    })
});

app.listen(port, ()=>{
    console.log("Listen PEOPLE in "+port);
});