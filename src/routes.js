import PostPage from 'views/Posts/PostPage'

import add from 'assets/img/add.png'
import Alert from 'assets/img/Alerts.png'
import Avatar from 'assets/img/Avatar.png'

import TrendingPosts from 'views/TrendingPosts/TrendingPosts'
import SubmitPost from 'views/SubmitPostPage/SubmitPostPage'
import SearchView from 'views/SearchView/SearchView'
import ManageInvites from 'views/ManageInvites/ManageInvites'
import HomePage from 'views/Homepage/Homepage'
import Profile from 'views/Profile'
import ControlPanel from 'views/ControlPanel/ControlPanel'
import Chat from 'assets/img/Chat.svg'
import Home from 'assets/img/Home.svg'
import Search from 'assets/img/Search.png'
import Settings from 'assets/img/Settings.png'
import Trending from 'assets/img/Trending.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import LogoutPage from './components/LogoutPage'

const routes = [
  {
    path: '/Home',
    name: 'Home Page',
    rtlName: 'لوحة القيادة',
    icon: Home,
    component: HomePage,
    layout: '/hhsb',
  },
  {
    path: '/invites',
    name: 'Manage Invites',
    rtlName: 'Manage Invites',
    icon: Avatar,
    component: ManageInvites,
    layout: '/hhsb',
  },

  {
    path: '/Profile',
    name: 'My Profile',
    rtlName: 'الحاجيات',
    icon: Avatar,
    component: Profile,
    layout: '/hhsb',
  },
  {
    path: '/SubmitPost',
    name: 'Submit Post',
    rtlName: 'التقويم',
    icon: add,
    component: SubmitPost,
    layout: '/hhsb',
  },
  {
    path: '/TrendingContent',
    name: 'Trending Content',
    rtlName: 'التقويم',
    icon: Trending,
    component: TrendingPosts,
    layout: '/hhsb',
  },
  {
    path: '/ChatBar',
    name: 'Chat Feed',
    rtlName: 'التقويم',
    icon: Chat,
    component: HomePage,
    layout: '/hhsb',
  },
  {
    path: '/Search',
    name: 'Search',
    rtlName: 'search',
    icon: Search,
    component: SearchView,
    layout: '/hhsb',
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    rtlName: 'التقويم',
    icon: Alert,
    component: HomePage,
    layout: '/hhsb',
  },
  {
    path: '/Settings',
    name: 'Settings',
    rtlName: 'التقويم',
    icon: Settings,
    component: HomePage,
    layout: '/hhsb',
  },
  {
    path: '/post',
    name: 'Posts',
    component: PostPage,
    layout: '/hhsb',
  },
  {
    path: '/ControlPanel',
    name: 'ControlPanel',
    component: ControlPanel,
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
