import TrendingPosts from 'views/TrendingPosts/TrendingPosts'
import SubmitPost from 'views/SubmitPostPage/SubmitPostPage'
import HomePage from 'views/Homepage/Homepage'
import Profile from 'views/Profile'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PostPage from 'views/PostsPage/PostPage'
import LogoutPage from './components/LogoutPage'
import { ReactComponent as HomeSvg } from './assets/svg/Home.svg'
import ProfileAvatar from './components/Profile/ProfileAvatar'
import { ReactComponent as TrendingSvg } from './assets/svg/TrendingIcon.svg'
import { ReactComponent as AddPostSvg } from './assets/svg/AddPost.svg'
import { ReactComponent as NotificationsActiveSvg } from './assets/svg/NotificationsActive.svg'
import NotificationMobileView from './components/Notifications/NotificationMobileView'

const routes = [
  {
    path: '/Home',
    name: 'Home Page',
    rtlName: 'لوحة القيادة',
    icon: HomeSvg,
    component: HomePage,
    layout: '/hhsb',
  },
  {
    path: '/TrendingContent',
    name: 'Trending Content',
    rtlName: 'التقويم',
    icon: TrendingSvg,
    component: TrendingPosts,
    layout: '/hhsb',
  },
  {
    path: '/SubmitPost',
    name: 'Submit Post',
    rtlName: 'التقويم',
    icon: AddPostSvg,
    component: SubmitPost,
    layout: '/hhsb',
  },
  {
    path: '/post',
    name: 'Posts',
    component: PostPage,
    layout: '/hhsb',
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    rtlName: 'التقويم',
    icon: NotificationsActiveSvg,
    component: NotificationMobileView,
    layout: '/hhsb',
  },
  {
    path: '/Profile',
    name: 'My Profile',
    rtlName: 'الحاجيات',
    icon: ProfileAvatar,
    component: Profile,
    layout: '/hhsb',
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
]
export default routes
