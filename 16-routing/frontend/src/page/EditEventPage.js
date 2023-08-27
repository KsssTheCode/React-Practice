import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

const EditEventPage = () => {
   //부모레벨의 loader 중 Router의 id가 'evnet-detail'인 Loader에 접근
   const data = useRouteLoaderData('event-detail');
   return <EventForm method="PATCH" event={data.event} />;
};

export default EditEventPage;
