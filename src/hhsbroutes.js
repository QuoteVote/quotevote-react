
import ContentFeed from 'hhsbviews/topcontent'
import SubmitPost from 'hhsbviews/SubmitPost'
import SearchView from 'hhsbviews/SearchView'
import Profile from 'hhsbviews/profile'
import ManageInvites from 'hhsbviews/ManageInvites'
import HomePage from 'hhsbviews/HomePage'
import Chat from 'hhsbAssets/Chat.svg'
import Home from 'hhsbAssets/Home.svg'
import Avatar from 'hhsbAssets/Avatar.png'
import add from 'hhsbAssets/add.png'
import Trending from 'hhsbAssets/Trending.png'
import Settings from 'hhsbAssets/Settings.png'
import Search from 'hhsbAssets/Search.png'
import Alert from 'hhsbAssets/Alerts.png'
// @material-ui/icons

// import {face} from '@mdi';
// import { mdiEmail } from '@mdi';

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
    component: ContentFeed,
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

]
export default hhsbRoutes
