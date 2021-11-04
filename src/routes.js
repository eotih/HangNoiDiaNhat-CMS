/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Account from './pages/Account';
import Profile from './pages/Profile';
import Role from './pages/Role';
import Payment from './pages/Payment';
import Service from './pages/Service';
import Category from './pages/Category';
import Brand from './pages/Brand';
import Utilities from './pages/Utilities';
import State from './pages/State';
import Banner from './pages/Banner';
import Field from './pages/Field';
import Organization from './pages/Organization';
import Customer from './pages/Customer';
import Contact from './pages/Contact';
import Shipper from './pages/Shipper';
import Product from './pages/Product';
import ShippingDepartment from './pages/ShippingDepartment';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'profile', element: <Profile /> },
      ]
    },
    {
      path: '/organization',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'account', element: <Account /> },
        { path: 'banner', element: <Banner /> },
        { path: 'organization', element: <Organization /> }
      ]
    },
    {
      path: '/component',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'role', element: <Role /> },
        { path: 'payment', element: <Payment /> },
        { path: 'category', element: <Category /> },
        { path: 'utilities', element: <Utilities /> },
        { path: 'state', element: <State /> },
        { path: 'brand', element: <Brand /> }
      ]
    },
    {
      path: '/delivery',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'services', element: <Service /> },
        { path: 'payment', element: <Payment /> },
        { path: 'shipper', element: <Shipper /> },
        { path: 'shipping-department', element: <ShippingDepartment /> }
      ]
    },
    {
      path: '/article',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'post', element: <Service /> },
        { path: 'field', element: <Field /> }
      ]
    },
    {
      path: '/management',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'customer', element: <Customer /> },
        { path: 'contact', element: <Contact /> },
        { path: 'product', element: <Product /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
