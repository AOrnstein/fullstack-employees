import express from "express";
import employeesRouter from "#api/employees";
const app = express();
export default app;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Routers
app.use("/employees", employeesRouter);

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});
