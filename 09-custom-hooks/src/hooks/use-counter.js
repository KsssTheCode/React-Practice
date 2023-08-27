import { useState, useEffect } from 'react';

const useCounter = (props) => {
   const [counter, setCounter] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         if (props === 'forward') setCounter((prevCounter) => prevCounter + 1);
         if (props === 'backward') setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(interval);
   }, [props]);

   return counter;
};

export default useCounter;
