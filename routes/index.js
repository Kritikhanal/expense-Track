var express = require("express");
var router = express.Router();

var expenses = require("../Database/database");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(expenses);
  res.render("index", { title: "Expense Tracker", expenseList: expenses });
});

// router.get("/wlit", function (req, res, next) {
//   res.render("index", { title: "WLIT", num: 10 });
// });

//add form
router.get("/add", function (req, res, next) {
  res.render("addexpense", { title: "AddExpense" });
});

//add and save the expense
router.post("/saveexpense", function (req, res, next) {
  // req.body.title; //reading title from name

  let FormData = {
    title: req.body.title,
    paidBy: req.body.paidBy,
    description: req.body.description,
    amount: req.body.amount,
  };

  console.log(FormData);
  expenses.push({ ...FormData, _id: expenses.length + 1 });
  res.redirect("/");
});

//delete the data
router.get("/delete/:index", function (req, res) {
  // console.log(req.params.index);
  expenses.splice(req.params.index, 1);
  res.redirect("/");
});

//edit the data
router.get("/edit/:id", function (req, res) {
  const expense = expenses.find((expense) => expense._id == req.params.id);
  console.log(expense);
  res.render("editexpense", { title: "editExpense", expense: expense });
});

// Save The edited Data
router.post("/saveEdited/:id", function (req, res) {
  let FormData = {
    title: req.body.title,
    paidBy: req.body.paidBy,
    description: req.body.description,
    amount: req.body.amount,
  };

  const index = expenses.findIndex((expense) => {
    return expenses._id == req.params.id;
  });
  expenses.splice(index, 1, { _id: req.params.id, ...FormData });
  res.redirect("/");
});

module.exports = router;
