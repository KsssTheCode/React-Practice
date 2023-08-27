import { Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';

import classes from './Root.module.css';

const RootLayout = () => {
   return (
      <>
         <MainNav />
         <main className={classes.content}>
            <Outlet />
         </main>
      </>
   );
};

export default RootLayout;
