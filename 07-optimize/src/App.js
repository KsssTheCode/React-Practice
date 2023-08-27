import React, { useState, useCallback } from 'react';
import Button from './components/UI/Button/Button';

import './App.css';
import DemoOutput from './components/Demo/DemoOutput';
import MyParagraph from './components/Demo/MyParagraph';

function App() {
   const [showParagraph, setShowParagraph] = useState(false);
   const [allowToggle, setAllowToggle] = useState(false);

   const toggleParagraphHandler = useCallback(() => {
      console.log(allowToggle);
      if (allowToggle)
         setShowParagraph((prevShowParagraph) => !prevShowParagraph);
   }, [allowToggle]);

   const allowToggleHandler = useCallback(() => {
      setAllowToggle((prev) => !prev);
   }, [allowToggle]);

   return (
      <div className="app">
         <h1>Hi there!</h1>
         <DemoOutput show={showParagraph} />
         <MyParagraph />
         <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
         <hr />
         <Button onClick={allowToggleHandler}>Allow Toggle!</Button>
      </div>
   );
}

export default App;
