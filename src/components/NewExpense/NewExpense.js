import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  // this function is executed by its child component (ExpenseForm)
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };

  const toggleEditingHandler = () => {
    setIsEditing((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="new-expense">
      {isEditing ? (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={toggleEditingHandler}
        />
      ) : (
        <button onClick={toggleEditingHandler}>Add New Expense</button>
      )}
    </div>
  );
};

export default NewExpense;
