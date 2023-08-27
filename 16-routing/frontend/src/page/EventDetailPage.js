import { Suspense } from 'react';
import {
   json,
   redirect,
   defer,
   useRouteLoaderData /*useParams*/,
   Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetailPage = () => {
   //useLaoderData()로 loader속성에서 params를 받아오기때문에 사용할 필요없음
   //  const params = useParams();

   //부모 Router의 형제에 다른 Loader도 존재하기 때문에 (eventsLaoder, eventDetailLoader 두개)
   //useLoaderData()대신 useRouteLoaderData()를 사용해야 eventDetailLaoder에 접근가능
   //부모레벨의 loader 중 Router의 id가 'evnet-detail'인 Loader에 접근
   //const data = useLoaderData() ==> X

   const data = useRouteLoaderData('event-detail');

   //defer사용으로 기존 loader()에서 fetch결과로 받은 객체 가 아닌,
   //defer에서 전달받은 {event:~~, events:~~}로 사용해야하므로
   //단순 data에 하나의 Fetch()결과가 아닌 loadEvent, loadEvents의 결과 2개가 포함되어 있음
   return (
      <>
         <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={data.event}>
               {(loadedEvent) => <EventItem event={loadedEvent} />}
            </Await>
         </Suspense>
         <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={data.events}>
               {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
         </Suspense>
      </>
   );
};

export default EventDetailPage;

const loadEvent = async (id) => {
   const response = await fetch('http://localhost:8080/events/' + id);
   if (response.status === 422) return response;
   if (!response.ok)
      throw json({ message: 'Could not load event' }, { status: 500 });

   const responseData = await response.json();
   return responseData.events;
};

//자세한 코드설명은 Events.js에서 있음
const loadEvents = async () => {
   const response = await fetch('http://localhost:8080/events');

   if (!response.ok) {
      return json({ message: 'Could not fetch events.' }, { status: 500 });
   } else {
      const responseData = await response.json();
      return responseData.events;
   }
};

//useEffect를 사용할 수도 있지만 laoder로 간편하게 처리
export const loader = async ({ req, params }) => {
   //loader에서 params훅을 사용할 수 없음 (일반 React기능이 아니기 때문)
   //BrowerRouter를 생성하는 createBrowerRouter 내의 loader기능이 필요한 라우트 매개변수 하나를 loader에 해당하는 함수에 전달함
   //따라서, loader에 해당하는 함수에 전달된 매개변수({request, params})를 사용하여 params에 접근
   //request : url, requestBody(formData()사용)...
   //params : 모든 라우터 매개변수 값
   //path가 '/events/:id'이기때문에 params.id로 사용

   // const response = await fetch('http://localhost:8080/events/' + params.id);
   // if (response.status === 422) return response;
   // if (!response.ok)
   //    throw json({ message: 'Could not load event' }, { status: 500 });

   // return response;

   //defer()사용으로 인한 변경 !!!!!!!!
   return defer({
      event: loadEvent(params.id),
      events: loadEvents(),
   });
};

export const action = async ({ request, params }) => {
   const response = await fetch('http://localhost:8080/events/' + params.id, {
      method: request.method,
   });

   if (!response.ok)
      throw json({ message: 'Could not delete event.' }, { status: 500 });

   return redirect('/events');
};
