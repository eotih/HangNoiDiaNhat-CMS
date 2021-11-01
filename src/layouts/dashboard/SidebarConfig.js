import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import keypadoutline from '@iconify/icons-eva/keypad-outline';
import briefcasefill from '@iconify/icons-eva/briefcase-fill';
import carfill from '@iconify/icons-eva/car-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    Header: 'Quản lý',
    path: false
  },
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Component  ',
    path: '/dashboard/user',
    icon: getIcon(briefcasefill),
    children: [
      {
        title: 'State',
        path: '/dashboard/state'
      },
      {
        title: 'Services',
        path: '/dashboard/services'
      },
      {
        title: 'Roles',
        path: '/dashboard/Roles'
      },
      {
        title: 'Utilities',
        path: '/dashboard/utilities'
      },
      {
        title: 'Category',
        path: '/dashboard/category'
      },
      {
        title: 'Field',
        path: '/dashboard/field'
      },
      {
        title: 'Payment',
        path: '/dashboard/payment'
      },
      {
        title: 'Brands',
        path: '/dashboard/brands'
      }
    ]
  },
  {
    title: 'Product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill),
    children: [
      {
        title: 'Quản Lý Product',
        path: '/dashboard/manage-products'
      },
      {
        title: 'Hình Ảnh Product',
        path: '/dashboard/Album-products'
      }
    ]
  },
  {
    title: 'Organization',
    path: '/dashboard/blog',
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Organization',
        path: '/dashboard/organization'
      },
      {
        title: 'Bank',
        path: '/dashboard/bank'
      },
      {
        title: 'Account',
        path: '/dashboard/account'
      }
    ]
  },
  {
    title: 'Delivery',
    path: '/dashboard/delivery',
    icon: getIcon(carfill),
    children: [
      {
        title: 'Shipper',
        path: '/dashboard/shipper'
      },
      {
        title: 'Shipping Department',
        path: '/dashboard/shipping-department'
      },
      {
        title: 'Tracking order',
        path: '/dashboard/Tracking-order'
      },
      {
        title: 'Identity Card',
        path: '/dashboard/indentity-card'
      }
    ]
  },
  {
    title: 'Management',
    path: '/dashboard/management',
    icon: getIcon(keypadoutline),
    children: [
      {
        title: 'Order',
        path: '/dashboard/order'
      },
      {
        title: 'OrderDetails',
        path: '/dashboard/order-details'
      }
    ]
  },
  {
    title: 'Actical',
    path: '/dashboard/actical',
    icon: getIcon(fileTextFill),
    children: [
      {
        title: 'Post',
        path: '/dashboard/post'
      },
      {
        title: 'Field',
        path: '/dashboard/field'
      }
    ]
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
