import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
   let renderingExpenses =
      props.items.length === 0 ? (
         <h2 className="expenses-list__fallback">No Expenses Found.</h2>
      ) : (
         props.items.map((expense) => (
            <ExpenseItem
               title={expense.title}
               amount={expense.amount}
               date={expense.date}
               key={expense.id}
            ></ExpenseItem>
         ))
      );

   return <ul className="expenses-list">{renderingExpenses}</ul>;
};

export default ExpensesList;
