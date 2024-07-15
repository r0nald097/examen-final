const express = require("express")
const  {observable, from} = require("rxjs")
const {map} = require("rxjs/operators")

const app = express()
const port = 3000

const data = [
    {id:5, dni:4376601, antecedentes:[] },
    {id:6, dni:4376602, antecedentes:[{name:'demanda por alimentos'} ] },
    {id:7, dni:4376603, antecedentes:[{name:'pertubar via publica'}] },
]

app.get("/api/people", (req, res)=>{
    let processData = [];
    const observable = from(data);
    observable.pipe(
        map( user => ({id:user.id, dni:user.dni, name:user.name, processed:true}) )
    )
    .subscribe({
        next:value=>{ processData.push(value) },
        complete:()=>{ res.json(processData) }
    })
});

app.listen(port, ()=>{
    console.log("Listen in "+port);
});