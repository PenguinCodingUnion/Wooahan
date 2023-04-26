import React from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "./UI/Card";
import "./Expenses.css";
import "./ExpenseFilter";
import ExpensesFilter from "./ExpenseFilter";
import { useState } from "react";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");
  const filterChangeHandler = (selectedYear) => {
    console.log("출력된다");
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  let expensesContent = <p>자료가없네요</p>;

  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((Expenses) => (
      <ExpenseItem
        key={Expenses.id}
        title={Expenses.title}
        amount={Expenses.amount}
        date={Expenses.date}
      />
    ));
  }
  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {expensesContent}
    </Card>
  );
};

export default Expenses;
