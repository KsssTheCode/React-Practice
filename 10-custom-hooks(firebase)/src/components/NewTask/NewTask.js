import { useState } from 'react';
import useFetch from '../../hooks/use-fetch';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
   const createTask = (taskObj) => {
      const generatedId = taskObj.name;
      const createdTask = { id: generatedId, text: taskObj.text };
      props.onAddTask(createdTask);
   };

   const { isLoading, error, sendRequest: sendTasks } = useFetch() ;

   const enterTaskHandler = async (taskText) => {
      sendTasks('https://react-http-6b4a6.firebaseio.com/tasks.json', {
         method: 'POST',
         body: JSON.stringify({ text: taskText }),
         headers: {
            'Content-Type': 'application/json',
         },
         createTask,
      });
   };

   return (
      <Section>
         <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
         {error && <p>{error}</p>}
      </Section>
   );
};

export default NewTask;
