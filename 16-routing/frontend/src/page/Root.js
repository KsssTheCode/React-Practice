import { Outlet /*useNavigation*/ } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

const Root = () => {
   // const navigation = useNavigation();

   //idle, submitting, loading중 하나
   // navigation.state === '';
   return (
      <>
         <main>
            <MainNavigation />
         </main>
         <Outlet />
      </>
   );
};

export default Root;
