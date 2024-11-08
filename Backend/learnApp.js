
// const math = require("./math");
// // const {add,subtract}=require('./math')

// const addResult = math.add(2, 3);
// console.log(addResult);

// const subtractResult = math.subtract(5, 3);
// console.log(subtractResult);

// const addResult2=add(2,3);
// console.log(addResult2);

// const subtractResult2=subtract(5,3);
// console.log(subtractResult2);

// asynchronous programming

// const fs=require('fs');
// fs.readFile('./node.txt','utf8',(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     // console.log(data.toString());
//     console.log(data);
// } )

// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.write("hello world" );
//   res.end();
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

// app.get("/contacts/:id", (req, res) => {
//   res.send(`my unique identity is ${req.params.id}`);
// });

// make an api that shows the output 'my name is .....'

app.get("/name:name", (req, res) => {
  res.send(`my name is ${req.params.name}`);
});

const contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: " janedoe@gamil.com",
  },
  {
    id: 3,
    name: "Ram",
    email: "ram@gmail.com",
  },
];

app.get("/contacts/:id", (req, res) => {
   const id = req.params.id;
    const contact = contacts.find((contact) => contact.id == id);
    if (!contact) {
      res.status(404).send("contact not found");
    }
    res.status(200).json(contact);
}); 

 app.post("/user-post",(req,res)=>{
      res.status(200).json('post request is send');
 })

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
