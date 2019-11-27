const express=require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyparser= require("body-parser");
const mysql = require("mysql");


const app = express();
app.use(cors());
// allows Express to parse JSON ddata that is sent on the body of any requests
app.use(bodyparser.json())

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "mytodolist"
});


app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM task", function(err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        tasks: data
      });
    }
  });
});
    
app.post("/tasks", function (request, response) {
  // Do the logic for saving the new task in the DB
  const task = request.body;
  // { text: "do the dishes", completed: true, date: "2019" }
  response.status(201).send("Successfully created task: " + task.text);
});

// my fields from state in app.js
// text
// completed
// dateDone
// dateDue
// id
// possibly userid

app.delete("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  response.status(200).send("Received request to Delete task with id " + taskId);
});
app.put("/tasks/:taskId", function (request, response) {
//update task
  const taskId = request.params.taskId;
  const updatedTask = request.body;
  // eslint-disable-next-line no-undef
  response.status(200).send(" Update task with id " + taskId + " with " + task.text + task.completed );
});


module.exports.tasks=serverlessHttp(app);