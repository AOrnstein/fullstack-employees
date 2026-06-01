import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";
import express from "express";
const router = express.Router();
export default router;

const error400MissingBody = (res) =>
  res.status(400).send("Requsest must have a body");

const error400MissingRequiredField = (res) =>
  res.status(400).send("Requsest body is missing a required field");

const error404EmplyeeNotFound = (res) =>
  res.status(404).send("Employee not found");

// Get list of all employees
router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

// creaete a new employee
router.post("/", async (req, res) => {
  if (!req.body) return error400MissingBody(res);
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) return error400MissingRequiredField(res);

  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

// get an employee by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await getEmployee(id);
  if (!employee) {
    return error404EmplyeeNotFound(res);
  }
  res.send(employee);
});

// delete an employee by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await deleteEmployee(id);
  if (!employee) {
    return error404EmplyeeNotFound(res);
  }
  res.status(204).send(employee);
});

// update a employee by id
router.put("/:id", async (req, res) => {
  if (!req.body) return error400MissingBody(res);
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) return error400MissingRequiredField(res);

  const { id } = req.params;
  const employee = await updateEmployee({ id, name, birthday, salary });
  if (!employee) {
    return error404EmplyeeNotFound(res);
  }
  res.send(employee);
});
