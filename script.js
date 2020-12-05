
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 10000;
const db = require("./db/db.json")
let num = 0

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

app.use(express.static('public'))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
// });


app.get("/api/notes", (req, res) => {
    res.json(db);
    
});

app.post("/api/notes", (req, res) => {
    num++
    const newNote= req.body;
        newNote.id = num;
        db.push(newNote)
    const redb = JSON.stringify(db)
    fs.writeFile("./db/db.json", redb, err=>{
        if(err){throw err}
    });
    res.json(redb)
});

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;

   
    for(let i = 0; i < db.length; i++){
        
        
        if(db[i].id == id){
            db.splice(i,1);
            
        };
    };
   
    const redb = JSON.stringify(db);
    fs.writeFile("./db/db.json", redb, err=>{
        if(err){throw err}
    });
    return res.send();
})

app.listen(PORT, () => {
    console.log("You started up the server");
});
