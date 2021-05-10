import TrendingPosts from 'views/TrendingPosts/TrendingPosts'
import HomePage from 'views/Homepage/Homepage'
import Profile from 'views/Profile'
import ControlPanel from 'views/ControlPanel/ControlPanel'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PostPage from 'views/PostsPage'
import LogoutPage from './components/LogoutPage'
import { ReactComponent as HomeSvg } from './assets/svg/Home.svg'
import ProfileAvatar from './components/Profile/ProfileAvatar'
import { ReactComponent as TrendingSvg } from './assets/svg/TrendingIcon.svg'
import { ReactComponent as NotificationsActiveSvg } from './assets/svg/NotificationsActive.svg'
import NotificationMobileView from './components/Notifications/NotificationMobileView'

const routes = [
  {
    path: '/Home',
    name: 'Home Page',
    rtlName: 'لوحة القيادة',
    icon: HomeSvg,
    component: HomePage,
    layout: '/quote',
  },
  {
    path: '/TrendingContent',
    name: 'Trending Content',
    rtlName: 'التقويم',
    icon: TrendingSvg,
    component: TrendingPosts,
    layout: '/quote',
  },
  {
    path: '/post',
    name: 'Posts',
    component: PostPage,
    layout: '/quote',
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    rtlName: 'التقويم',
    icon: NotificationsActiveSvg,
    component: NotificationMobileView,
    layout: '/quote',
  },
  {
    path: '/Profile',
    name: 'My Profile',
    rtlName: 'الحاجيات',
    icon: ProfileAvatar,
    component: Profile,
    layout: '/quote',
  },
  {
    path: '/logout',
    name: 'Logout',
    rtlName: 'هعذاتسجيل الدخول',
    mini: 'L',
    rtlMini: 'هعذا',
    icon: ExitToAppIcon,
    component: LogoutPage,
    layout: '/logout',
  },
  {
    path: '/ControlPanel',
    name: 'Control Panel',
    component: ControlPanel,
    layout: '/quote',
  },
]
export default routes
