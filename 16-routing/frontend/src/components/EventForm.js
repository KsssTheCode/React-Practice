import {
   Form,
   useNavigate,
   useNavigation, //실제 라우터의 변경이 이루어지는 경우에 사용
   useActionData,
   json,
   redirect,
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
   const data = useActionData();
   const navigate = useNavigate();
   const navigation = useNavigation();

   const isSubmitting = navigation.state === 'submitting';

   function cancelHandler() {
      navigate('..');
   }

   return (
      //Form태그의 action속성을 이용하여 해당 라우터의 action속성이 아닌,
      //다른 라우터의 action속성으로 Form을 전송할 수 있음 (action="해당라우터의 액션")
      <Form method={method} className={classes.form}>
         {data && data.errors && (
            <ul>
               {Object.values(data.errors).map((err) => (
                  <li key={err}>{err}</li>
               ))}
            </ul>
         )}
         <p>
            <label htmlFor="title">Title</label>
            <input
               id="title"
               type="text"
               name="title"
               defaultValue={event ? event.title : ''}
               required
            />
         </p>
         <p>
            <label htmlFor="image">Image</label>
            <input
               id="image"
               type="url"
               name="image"
               defaultValue={event ? event.image : ''}
               required
            />
         </p>
         <p>
            <label htmlFor="date">Date</label>
            <input
               id="date"
               type="date"
               name="date"
               defaultValue={event ? event.date : ''}
               required
            />
         </p>
         <p>
            <label htmlFor="description">Description</label>
            <textarea
               id="description"
               name="description"
               rows="5"
               defaultValue={event ? event.description : ''}
               required
            />
         </p>
         <div className={classes.actions}>
            <button
               type="button"
               onClick={cancelHandler}
               disabled={isSubmitting}
            >
               Cancel
            </button>
            <button disabled={isSubmitting}>
               {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
         </div>
      </Form>
   );
}

export const action = async ({ request, params }) => {
   const data = await request.formData(); // request에서 form내의 정보를 가져오기위한 메소드
   const eventData = {
      title: data.get('title'), //get('필드의 Name밸류');로 값 추출가능
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description'),
   };

   const method = request.method;
   let url = 'http://localhost:8080/events';
   if (method === 'PATCH') url = 'http://localhost:8080/events/' + params.id;

   const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
   });
   if (response.status === 422) return response;

   if (!response.ok)
      throw json({ message: 'Could not save event' }, { status: 500 });

   return redirect('/events');
};

export default EventForm;
