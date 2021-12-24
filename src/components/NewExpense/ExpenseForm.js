import { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  // version 1 using three different states

  // const [enteredTitle, setEnteredTitle] = useState('');
  // const [enteredAmount, setEnteredAmount] = useState('');
  // const [enteredDate, setEnteredDate] = useState('');

  // const titleChangedHandler = (event) => {
  //   setEnteredTitle(event.target.value); // event.target.value will always be a string
  // };

  // const amountChangedHandler = (event) => {
  //   setEnteredAmount(event.target.value);
  // };

  // const dateChangedHandler = (event) => {
  //   setEnteredDate(event.target.value);
  // };

  // version 2 using one state

  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  const titleChangedHandler = (event) => {
    // use this syntax when our state update depends on the previous state
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredTitle: event.target.value,
      };
    });
  };

  const amountChangedHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredAmount: event.target.value,
      };
    });
  };

  const dateChangedHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredDate: event.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: userInput.enteredTitle,
      amount: +userInput.enteredAmount, // the "+" operator converts the string to a number
      date: new Date(userInput.enteredDate),
    };

    props.onSaveExpenseData(expenseData); // returning expenseData back to parent

    resetFields();

    props.onCancel();
  };

  const resetFields = () => {
    setUserInput({
      enteredTitle: '',
      enteredAmount: '',
      enteredDate: '',
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.enteredTitle} // using both value and onChange creates a two-way binding
            onChange={titleChangedHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={userInput.enteredAmount}
            onChange={amountChangedHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={userInput.enteredDate}
            onChange={dateChangedHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          {/* set type="button" for cancel buttons within a form */}
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
