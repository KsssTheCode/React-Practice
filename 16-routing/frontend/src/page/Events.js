import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
   //useLoaderData()는 실행된 loader속성이 Promise객체더라도 Resolved된 결과만 반환
   const data = useLoaderData();

   //에러처리 방법 1 : 에러관련 객체를 보내 컴포넌트에서 변환하여 출력하도록 함
   // if(data.isError) return <p>{data.message}</p>

   // const events = data.events;
   // return (
   //    <>
   //       <EventsList events={events} />
   //    </>
   // );

   // =>

   //defer()을 사용했기 때문에 data = { events : ~~~ }가 되고,
   //Await기능을 사용하여 resolve속성으로 전달될 값을 넣어놓고,
   //Await태그 사이에 resolve데이터가 완료되었을 때 리액트 라우터가 실행할 코드를 넣어줌
   //또한, 'react'의 Suspense기능을 사용하여 완료되기 전까지 보여질 컴포넌트 형태를 fallback속성으로 제시함
   return (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
         <Await resolve={data.events}>
            {(loadedEvents) => {
               <EventsList events={loadedEvents} />;
            }}
         </Await>
      </Suspense>
   );
}

const loadEvents = async () => {
   const response = await fetch('http://localhost:8080/events');

   if (!response.ok) {
      //에러처리 방법 1 : 에러관련 객체를 보내 컴포넌트에서 변환하여 출력하도록 함
      // return { isError: true, message: 'Could not fetch events.' };
      //에러처리 방법 2 : throw구문을 사용하여 errorElement에서 처리하도록 함 (+useRouterError훅으로 에러페이지에 내용전달)
      // throw Response(
      //    JSON.stringify({ message: 'Could not fetch events.' }, { status: 500 })
      // );
      //에러처리 방법 3 : react-router-dom패키지의 json헬퍼 사용 (Response객체와 기능은 동일하나 JSON처리가 필요없는 함수)
      return json({ message: 'Could not fetch events.' }, { status: 500 });
   } else {
      // const responseData = await response.json();

      //Response()는 브라우저 내장객체로 1번쨰 매개변수로 전달할 데이터를 받고, 2번쨰 매개변수로 각종 상태를 전달받음
      // const res = new Response(responseData, {status: 201});
      // return res;

      //useLoaderData()는 Resolved된 결과만 반환하기때문에 아래 코드로도 축약하여 사용가능
      // return response;

      //직접받은 값일 때는 작동했지만,
      //중간에 defer()을 사용하기 때문에 수동으로 파싱해주어야하므로 다시 변경
      const responseData = await response.json();
      return responseData.events;
   }
};

//loader는 리액트코드가 아니기 때문에 UseState같은 훅을 사용할 수 없음
//loader는 브라우저 상에서 실행되는 코드로 localStorage나 cookie에 모두 접근가능함(Vanila JS와 동일)
export const loader = () => {
   //defer()을 사용하여 비동기함수인 loadEvents가 실행되기 전까지 컴포넌트를 로딩하고 렌더링하기 위해 사용
   //defer라는 개념은 Promise함수에서 Resolve되는 값이 있다는 것을 가정함
   return defer({
      events: loadEvents(), //단순히 해당 함수를 가르키는게 아니라 실행하여 결과값을 events라는 키에 담음
   });
};

export default EventsPage;
