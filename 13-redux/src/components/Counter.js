// import { Component } from 'react';
import { useSelector, useDispatch /*connect*/ } from 'react-redux';
import { useRef } from 'react';

import { counterActions } from '../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
   const dispatch = useDispatch();
   const { counter, showCounter } = useSelector((state) => state.counter);
   const enteredNumberRef = useRef();

   const increamentHandler = () => {
      dispatch(counterActions.increaseOne());
   };
   const increamentFiveHandler = () => {
      dispatch(counterActions.increaseFive());
   };
   const decreamentHandler = () => {
      dispatch(counterActions.decreaseOne());
   };
   const decreamentFiveHandler = () => {
      dispatch(counterActions.decreaseFive());
   };
   const initializeHandler = () => {
      dispatch(counterActions.initialize());
   };
   const calculateInput = () => {
      dispatch(counterActions.calculateInput(enteredNumberRef.current.value));
      //전달될 때, 기존 {type: '~~~', action: {number: enteredNumberRef}}가 아니라,
      //기본 값으로 { type: '~~~' } 가 전달되고, 입력한 매개변수를 추가하여 {type:'~~~', payload: 매개변수}로 전달함
   };
   const toggleCounterHandler = () => {
      dispatch(counterActions.toggle());
   };

   return (
      <main className={classes.counter}>
         <h1>Redux Counter</h1>
         {showCounter && (
            <>
               <div className={classes.value}>{counter}</div>
               <div>
                  <button onClick={decreamentFiveHandler}>
                     Decrement by 5
                  </button>
                  <button onClick={decreamentHandler}>Decrement</button>
                  <button onClick={initializeHandler}>Initialize</button>
                  <button onClick={increamentHandler}>Increment</button>
                  <button onClick={increamentFiveHandler}>
                     Increment by 5
                  </button>
                  <div>
                     <input ref={enteredNumberRef} type="number" />
                     <button onClick={calculateInput}>Calculate</button>
                  </div>
               </div>
            </>
         )}
         <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </main>
   );
};

export default Counter;

//class방식
// class ClassCounter extends Component {
//    increamentHandler() {
//       this.props.increment();
//    }
//    decrementHandler() {
//       this.props.decrement();
//    }
//    initializeHandler() {
//       this.props.initialize();
//    }
//    toggleCounterHanlder() {}

//    render() {
//       return (
//          <main className={classes.counter}>
//             <h1>Redux Counter</h1>
//             <div className={classes.value}>{this.props.counter}</div>
//             <div>
//                <button onClick={this.decrementHandler.bind(this)}>
//                   Decrement
//                </button>
//                <button onClick={this.initializeHandler.bind(this)}>
//                   Initialize
//                </button>
//                <button onClick={this.increamentHandler.bind(this)}>
//                   Increment
//                </button>
//             </div>
//             <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//          </main>
//       );
//    }
// }

// const mapStateToProps = (state) => {
//    return {
//       counter: state.counter,
//    };
// };

// const mapDispatchToProps = (dispatch) => {
//    return {
//       increment: () => {
//          dispatch({ type: 'INCREMENT' });
//       },
//       decrement: () => {
//          dispatch({ type: 'DECREMENT' });
//       },
//       initialize: () => {
//          dispatch({ type: 'INITIALIZE' });
//       },
//    };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ClassCounter);
