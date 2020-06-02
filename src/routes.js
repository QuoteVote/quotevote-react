import PostPage from 'views/PostPage'
import LoginPage from 'views/Pages/LoginPage'

import add from 'assets/img/add.png'
import Alert from 'assets/img/Alerts.png'
import Avatar from 'assets/img/Avatar.png'

import TrendingPosts from 'views/TrendingPosts'
import SubmitPost from 'views/SubmitPost'
import SearchView from 'views/SearchView'
import Profile from 'views/profile'
import ManageInvites from 'views/ManageInvites'
import HomePage from 'views/Homepage/Homepage'
import Chat from 'assets/img/Chat.svg'
import Home from 'assets/img/Home.svg'
import Search from 'assets/img/Search.png'
import Settings from 'assets/img/Settings.png'
import Trending from 'assets/img/Trending.png'

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
    path: '/Trending',
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
    path: '/BuddyList',
    name: 'BuddyList Test',
    rtlName: 'التقويم',
    icon: Search,
    component: HomePage,
    layout: '/hhsb',
  },
  {
    path: '/ChatBar',
    name: 'Chat Feed',
    rtlName: 'التقويم',
    icon: Alert,
    component: HomePage,
    layout: '/hhsb',
  },
  {
    path: '/ChatBar',
    name: 'Chat Feed',
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
    path: '/login-page',
    name: 'Login Page',
    rtlName: 'هعذاتسجيل الدخول',
    mini: 'L',
    rtlMini: 'هعذا',
    component: LoginPage,
    layout: '/auth',
  },
]
export default hhsbRoutes
