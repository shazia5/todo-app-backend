const express=require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser= require("body-parser");
const mysql = require("mysql");
const uuidv4 = require("uuid/v4");


const app = express();
app.use(cors());
// allows Express to parse JSON ddata that is sent on the body of any requests
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "mytodolist"
});
// request not needed this for get / read 
app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM task", function(err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).send({
        tasks: data
      });
    }
  });
});



app.delete("/tasks/:id", function (request, response) {
  const id = request.params.id;
  connection.query("DELETE FROM task WHERE id = ?", [id], function (err,data){ 
    if (err) {
      console.log("Error deleting task with id", err);
      response.status(500).json({
        error: err
      });
    } else {
      console.log("Deleted task with id" + id)
      response.status(200).send({
        tasks: data

      });
    }
  });
});


app.post("/tasks", function (request, response) {
  const id = request.params.id;
  const task={
    id:uuidv4(),
    taskDescription:request.body.taskDescription,
    completed:request.body.completed,
    creationDate:request.body.creationDate,
    userId:request.body.userId,
    }
  
  connection.query("INSERT INTO task SET ? ", task, function (err, data) {
    if (err) {
      console.log("Error inserting task", err);
      response.status(500).json({
        error: err
      });
    } else {
      console.log("Created task with id " + id);
      response.status(201).send({
        tasks: data
      });
    }
  });
});


app.put("/tasks/:id", function (request, response) {
//update task
const id= request.params.id;
const updatedTask = request.body.completed;
connection.query('UPDATE task SET completed = ? WHERE id = ?', [updatedTask, id], function (err, data) {
  if (err) {
    console.log("Error updating task with id " + id, err);
    response.status(500).json({
      error: err
    });
  } else {
    console.log(updatedTask.insertedId)
    response.status(200).send({
      tasks: data
    })
  }
});
});


module.exports.tasks=serverlessHttp(app);





