const express=require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser= require("body-Parser");
const mysql = require("mysql");
const uuid = require("uuid/v4");


const app = express();
app.use(cors());
// allows Express to parse JSON ddata that is sent on the body of any requests
app.use(bodyParser.json())

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

app.delete("/tasks/:taskId", function (request, response) {
  const id = request.params.id;
  connection.query("DELETE FROM task WHERE id = ?", [id], function (err,data){ 
    if (err) {
      console.log("Error fetching task", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.sendstatus(200);
    }
  });
});


app.post("/tasks", function (request, response) {
  // Do the logic for saving the new task in the DB
  const task = request.body;
  // { text: "do the dishes", completed: true, date: "2019" }
  response.status(201).send("Successfully created task: " + task.taskDescription);
});


app.put("/tasks/:taskId", function (request, response) {
//update task
  const taskId = request.params.taskId;
  const updatedTask = request.body;
  // eslint-disable-next-line no-undef
  response.status(200).send(" Update task with id " + taskId + " with " + task.taskDescription + task.completed );
});


module.exports.tasks=serverlessHttp(app);





