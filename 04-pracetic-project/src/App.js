import React, { useState, Fragment } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
   const [usersList, setUsersList] = useState([]);

   const onAddUserHandler = (name, age, id) => {
      setUsersList((prevList) => {
         return [...prevList, { name, age, id }];
      });
   };

   return (
      <Fragment>
         <AddUser onAddUser={onAddUserHandler} />
         <UsersList users={usersList} />
      </Fragment>
   );
}

export default App;
