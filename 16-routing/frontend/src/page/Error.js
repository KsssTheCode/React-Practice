import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageComponent from '../components/PageComponent';

const ErrorPage = () => {
   const error = useRouteError();

   let title = 'An error occurred!';
   let message = 'Something went wrong!';

   if (error.status === 500) {
      //에러처리방법 2 : Reponse()사용하기
      // message = JSON.parse(error.data).message;

      //에러처리방법 3 : json()헬퍼 사용하기 (파싱 X)
      message = error.data.message;
   } else if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page';
   }
   return (
      <>
         <MainNavigation />
         <PageComponent title={title}>
            <p>{message}</p>
         </PageComponent>
      </>
   );
};

export default ErrorPage;
