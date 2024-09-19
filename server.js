const express = require('express')
const server = express()
const fs = require('fs') 
server.use(express.static("client"))
server.use(express.urlencoded()) //vitkig


server.post("/data", (req, res)=>{
    console.log(req.body)  //viktig 
    res.send("your username is "+req.body.username+" and ur password is "+req.body.password)
    fs.writeFileSync("info.JSON", JSON.stringify(req.body)) //viktig
})

server.post("/login", (req, res)=>{
    const savedData = JSON.parse(fs.readFileSync('info.json', {encoded: 'utf-8'}))
    console.log(savedData.password+ " från fil")
    console.log(req.body.password+ " från log in")
    if (savedData.password == req.body.password && savedData.username == req.body.username ){
        console.log("match")
        res.send("log in success")
    }
    else {
        console.log("invalid")
        res.send("invalid username or password")
    }

})



server.listen(3000, ()=>{
    console.log("Server up")
})


