import {
  HiUserCircle,
  HiOfficeBuilding,
  HiUsers,
  HiCreditCard,
} from 'react-icons/hi'

export const tabsList = [
  {
    title: 'My Account',
    content: 'Account Details',
    icon: HiUserCircle,
    key: 'my-account',
  },
  {
    title: 'Company',
    content: 'Company Details',
    key: 'company',
    icon: HiOfficeBuilding,
  },
  {
    title: 'Team Members',
    content: 'Team Members Details',
    key: 'team-members',
    icon: HiUsers,
  },
  {
    title: 'Billing',
    content: 'Billing Details',
    key: 'billing',
    icon: HiCreditCard,
  },
]
