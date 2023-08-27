import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductPage from './pages/Products';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
   {
      path: '/root',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
         { /*path: ''대신 Index사용가능*/ index: true, element: <HomePage /> },
         { path: 'products', element: <ProductPage /> },
         { path: 'products/:productId', element: <ProductDetail /> },
      ],
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
