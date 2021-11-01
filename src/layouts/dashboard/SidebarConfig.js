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
        path: '/dashboard/tracking-order'
      },
      {
        title: 'Identity Card',
        path: '/dashboard/identity-card'
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
