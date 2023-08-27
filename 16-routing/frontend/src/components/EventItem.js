import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
   //다른 경로의 액션을 사용하는 경우 useSubmit()훅을 사용함
   //submit()을 호출한 부분에서 해당 라우터의 action으로 전달되고, 전달받은 곳에서 formData()로 추출가능
   const submit = useSubmit();

   function startDeleteHandler() {
      const proceed = window.confirm('Are you sure?');
      //submit(전달할객체, 설정객체)
      if (proceed) submit(null, { method: 'delete' });
   }

   return (
      <article className={classes.event}>
         <img src={event.image} alt={event.title} />
         <h1>{event.title}</h1>
         <time>{event.date}</time>
         <p>{event.description}</p>
         <menu className={classes.actions}>
            <Link to="edit">Edit</Link>
            <button onClick={startDeleteHandler}>Delete</button>
         </menu>
      </article>
   );
}

export default EventItem;
