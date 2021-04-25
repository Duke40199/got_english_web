import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const ManageAdmin = React.lazy(() => import('./views/pages/manage-admin/ManageAdmin'));
const ManageModerator = React.lazy(() => import('./views/pages/manage-moderator/ManageModerator'));
const ManageExpert = React.lazy(() => import('./views/pages/manage-expert/ManageExpert'));
const ViewExpertFeedback = React.lazy(() => import('./views/pages/manage-expert/view-expert-feedback/ViewExpertFeedback'));
const ViewApplicationForm = React.lazy(() => import('./views/pages/view-application-form/ViewApplicationForm'));
const ManageCoinBundle = React.lazy(() => import('./views/pages/manage-coin-bundle/ManageCoinBundle'));
const ManageExchangeRate = React.lazy(() => import('./views/pages/manage-exchange-rate/ManageExchangeRate'));
const ManageLearner = React.lazy(() => import('./views/pages/manage-learner/ManageLearner'));
const ManagePricing = React.lazy(() => import('./views/pages/manage-pricing/ManagePricing'));
const MyProfile = React.lazy(() => import('./views/pages/my-profile/MyProfile'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));

const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/dashboard', name: 'Bảng tin', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/manage-admin', name: 'Quản lý Quản Trị Viên', component: ManageAdmin, exact: true },
  { path: '/manage-moderator', name: 'Quản lý Điều Hành Viên', component: ManageModerator, exact: true },
  { path: '/manage-expert', exact: true, name: 'Quản lý Chuyên Gia', component: ManageExpert },
  { path: '/manage-expert/view-expert-feedback', name: 'Xem chi tiết Đánh Giá của Chuyên Gia', component: ViewExpertFeedback },
  { path: '/view-application-form', name: 'Xem hồ sơ Ứng Viên', component: ViewApplicationForm, exact: true },
  { path: '/manage-coin-bundle', name: 'Quản lý Gói Coin', component: ManageCoinBundle, exact: true },
  { path: '/manage-exchange-rate', name: 'Quản lý Chiết Khấu', component: ManageExchangeRate, exact: true },
  { path: '/manage-learner', name: 'Quản lý Học Viên', component: ManageLearner, exact: true },
  { path: '/manage-pricing', name: 'Quản lý Đơn Giá', component: ManagePricing, exact: true },
  { path: '/my-profile', name: 'Hồ sơ của tôi', component: MyProfile, exact: true },
  { path: '*', name: '404', component: Page404 },
];

export default routes;
