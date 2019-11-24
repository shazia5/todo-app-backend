const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyparser= require("body-parser");

const app = express();

// allows Express to parse JSON ddata that is sent on the body of any requests
app.use(bodyparser.json())
app.use(cors());


app.get("/tasks", function (request, response) {
  // Do the logic for getting all the tasks from the DB
  response.status(200).send({
    tasks: [
      {id: 1, text:"buy the bread", completed: false, dateDue:"2019-11-29", dateDone:""},
      {id: 2, text:"pick up prescription", completed: false, dateDue:"2019-11-28", dateDone:""},
      {id: 3, text:"buy some milk", completed: true, dateDue:"2019-11-16", dateDone:"2019-11-20"}
    ]
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