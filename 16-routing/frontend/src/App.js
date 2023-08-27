import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditEventPage from './page/EditEventPage';
import EventDetailPage, {
   loader as eventDetailLoader,
   action as deleteEventAction,
} from './page/EventDetailPage';
import Events, { loader as eventsLoader } from './page/Events';
import HomePage from './page/HomePage';
import NewEventPage from './page/NewEventPage';
import RootLayout from './page/Root';
import EventsRootLayout from './page/EventsRoot';
import ErrorPage from './page/Error';
import { action as manipulateEventAction } from './components/EventForm';
import NewsLetterPage, {
   action as newsLetterAction,
} from './components/NewsLetter';

const router = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,

      //errorElement설정 위치에 따른 화면표시가 달라짐
      //만약 아래 children중 EventRootLayout에 해당하는 객체에 errorElement를 전달했다면,
      //RootLayout을 제외한 자식 영역에서만 표시됨
      errorElement: <ErrorPage />,
      children: [
         { index: true, element: <HomePage /> },
         {
            path: 'events',
            element: <EventsRootLayout />,
            children: [
               {
                  index: true,
                  element: <Events />,
                  //loader속성은 자식(또는 동일레벨) 컴포넌트에서 useLoaderData()로 사용가능 (부모x)
                  //loader속성의 메소드는 해당 컴포넌트로 갈 때 실행됨
                  loader: eventsLoader,
               },
               {
                  path: ':id',
                  id: 'event-detail',
                  loader: eventDetailLoader,
                  children: [
                     {
                        index: true,
                        element: <EventDetailPage />,
                        action: deleteEventAction,
                     },
                     {
                        path: 'edit',
                        element: <EditEventPage />,
                        action: manipulateEventAction,
                     },
                  ],
               },
               {
                  path: 'new',
                  element: <NewEventPage />,
                  //action속성을 사용하게되면 자동으로 백엔드로 전송하지 않고,
                  //전송한 Form내의 정보 모두를 action속성으로 전송함
                  action: manipulateEventAction,
               },
            ],
         },
         {
            path: 'newsLetter',
            element: <NewsLetterPage />,
            action: newsLetterAction,
         },
      ],
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
