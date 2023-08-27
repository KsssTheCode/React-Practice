import React from 'react';

const MyParagraph = (props) => {
   console.log('MyParagraph OUTPUT');
   return <p>I'm not change!</p>;
};

export default React.memo(MyParagraph);
