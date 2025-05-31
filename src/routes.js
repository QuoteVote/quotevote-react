import TrendingPosts from 'views/TrendingPosts/TrendingPosts'
import HomePage from 'views/Homepage/Homepage'
import Profile from 'views/Profile'
import ControlPanel from 'views/ControlPanel/ControlPanel'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PostPage from 'views/PostsPage'
import LogoutPage from './components/LogoutPage'
import { ReactComponent as HomeSvg } from './assets/svg/Home.svg'
import ProfileAvatar from './components/Profile/ProfileAvatar'
import TrendingSvg from './assets/svg/TrendingIcon.svg'
import AddPostSvg from './assets/svg/AddPost.svg'
import NotificationsActiveSvg from './assets/svg/NotificationsActive.svg'
import NotificationMobileView from './components/Notifications/NotificationMobileView'

const routes = [
  {
    path: 'Home',
    name: 'Home Page',
    rtlName: 'لوحة القيادة',
    icon: HomeSvg,
    component: HomePage,
    layout: '/',
  },
  {
    path: 'TrendingContent',
    name: 'Trending Content',
    rtlName: 'التقويم',
    icon: () => <img src={TrendingSvg} alt="Trending" style={{width: '100%', height: '100%'}} />,
    component: TrendingPosts,
    layout: '/',
  },
  {
    path: 'post',
    name: 'Posts',
    icon: () => <img src={AddPostSvg} alt="Add Post" style={{width: '100%', height: '100%'}} />,
    component: PostPage,
    layout: '/',
  },
  {
    path: 'Notifications',
    name: 'Notifications',
    rtlName: 'التقويم',
    icon: () => <img src={NotificationsActiveSvg} alt="Notifications" style={{width: '100%', height: '100%'}} />,
    component: NotificationMobileView,
    layout: '/',
  },
  {
    path: 'Profile',
    name: 'My Profile',
    rtlName: 'الحاجيات',
    icon: ProfileAvatar,
    component: Profile,
    layout: '/',
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
    path: 'ControlPanel',
    name: 'Control Panel',
    component: ControlPanel,
    layout: '/',
  },
]
export default routes
