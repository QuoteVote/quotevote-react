import ContentDisplay from "hhsbviews/ContentDisplay.js"
import ContentFeed from "hhsbviews/topcontent.js"
import HomePage from "hhsbviews/HomePage.js"
import Profile from "hhsbviews/profile.js"
import SubmitPost from "hhsbviews/SubmitPost.js"

import add from 'hhsbAssets/add.png'
import Alert from 'hhsbAssets/Alerts.png'
import Avatar from 'hhsbAssets/Avatar.png'
import Chat from 'hhsbAssets/Chat.svg'
import Home from 'hhsbAssets/Home.svg'
import Search from 'hhsbAssets/Search.png'
import Settings from 'hhsbAssets/Settings.png'
import Trending from  'hhsbAssets/Trending.png'

var hhsbRoutes = [
  {
    path: "/Home",
    name: "Home Page",
    rtlName: "لوحة القيادة",
    icon: Home,
    component: HomePage,
    layout: "/hhsb"
  },
  
  {
    path: "/Trending",
    name: "My Profile",
    rtlName: "الحاجيات",
    icon: Avatar,
    component:Profile,
    layout: "/hhsb"
  },
  {
    path: "/SubmitPost",
    name: "Submit Post",
    rtlName: "التقويم",
    icon: add,
    component:SubmitPost,
    layout: "/hhsb"
  },
  {
    path: "/TrendingContent",
    name: "Trending Content",
    rtlName: "التقويم",
    icon: Trending,
    component:ContentFeed ,
    layout: "/hhsb"
  },
  {
    path: "/ChatBar",
    name: "Chat Feed",
    rtlName: "التقويم",
    icon: Chat,
    component: HomePage,
    layout: "/hhsb"
  },
  {
    path: "/BuddyList",
    name: "BuddyList Test",
    rtlName: "التقويم",
    icon: Search,
    component:HomePage,
    layout: "/hhsb"
  },
  {
    path: "/ChatBar",
    name: "Chat Feed",
    rtlName: "التقويم",
    icon: Alert,
    component: HomePage,
    layout: "/hhsb"
  },
  {
    path: "/ChatBar",
    name: "Chat Feed",
    rtlName: "التقويم",
    icon: Settings,
    component: HomePage,
    layout: "/hhsb"
  },
  {
    path: "/post",
    component: ContentDisplay,
    layout: "/hhsb"
  },
];
export default hhsbRoutes;
