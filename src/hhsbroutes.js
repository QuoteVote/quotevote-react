import PostPage from 'hhsbviews/PostPage'

import add from 'hhsbAssets/add.png'
import Alert from 'hhsbAssets/Alerts.png'
import Avatar from 'hhsbAssets/Avatar.png'

import TrendingPosts from 'hhsbviews/TrendingPosts'
import SubmitPost from 'hhsbviews/SubmitPost'
import SearchView from 'hhsbviews/SearchView'
import ManageInvites from 'hhsbviews/ManageInvites'
import HomePage from 'hhsbviews/Homepage/Homepage'
import Chat from 'hhsbAssets/Chat.svg'
import Home from 'hhsbAssets/Home.svg'
import Search from 'hhsbAssets/Search.png'
import Settings from 'hhsbAssets/Settings.png'
import Trending from 'hhsbAssets/Trending.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import LogoutPage from './hhsbComponents/LogoutPage'

const hhsbRoutes = [
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
    component: HomePage,
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
    component: PostPage,
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
export default hhsbRoutes
