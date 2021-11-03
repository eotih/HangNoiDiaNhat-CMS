/* eslint-disable prettier/prettier */
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import keypadoutline from '@iconify/icons-eva/keypad-outline';
import briefcasefill from '@iconify/icons-eva/briefcase-fill';
import carfill from '@iconify/icons-eva/car-fill';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Organization',
    path: '/dashboard/app',
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Organization',
        path: '/organization/organization'
      },
      {
        title: 'Bank',
        path: '/organization/bank'
      },
      {
        title: 'Account',
        path: '/organization/account'
      }
    ]
  },
  {
    title: 'Component  ',
    path: '/dashboard/app',
    icon: getIcon(briefcasefill),
    children: [
      {
        title: 'State',
        path: '/component/state'
      },
      {
        title: 'Roles',
        path: '/component/role'
      },
      {
        title: 'Utilities',
        path: '/component/utilities'
      },
      {
        title: 'Category',
        path: '/component/category'
      },
      {
        title: 'Payment',
        path: '/component/payment'
      },
      {
        title: 'Brands',
        path: '/component/brands'
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
      },
      {
        title: 'Customer',
        path: '/dashboard/customer'
      },
      {
        title: 'Product',
        path: '/dashboard/product'
      },
      {
        title: 'Product Images',
        path: '/dashboard/product-images'
      },
    ]
  },
  {
    title: 'Delivery',
    path: '/dashboard/delivery',
    icon: getIcon(carfill),
    children: [
      {
        title: 'Shipper',
        path: '/delivery/shipper'
      },
      {
        title: 'Shipping Department',
        path: '/delivery/shipping-department'
      },
      {
        title: 'Services',
        path: '/delivery/services'
      },
      {
        title: 'Tracking order',
        path: '/delivery/tracking-order'
      },
      {
        title: 'Identity Card',
        path: '/delivery/identity-card'
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
  }
];

export default sidebarConfig;
