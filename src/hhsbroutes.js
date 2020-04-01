import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";
import ContentFeed from "hhsbviews/topcontent.js"
import ContentDisplay from "hhsbviews/ContentDisplay.js"
import Profile from "hhsbviews/profile.js"
import HomePage from "hhsbviews/HomePage.js"
import MessageContainer from "hhsbviews/MessageContainer.js"
import BuddyList from "hhsbviews/BuddyList.js"
import ChatComponent from 'hhsbviews/ChatComponent.js'
import Chat from 'hhsbAssets/Chat.svg'
import Home from 'hhsbAssets/Home.svg'
import Avatar from 'hhsbAssets/Avatar.png'
import add from 'hhsbAssets/add.png'
import Trending from  'hhsbAssets/Trending.png'
import Settings from 'hhsbAssets/Settings.png'
import Search from 'hhsbAssets/Search.png'
import Alert from 'hhsbAssets/Alerts.png'
// @material-ui/icons

//import {face} from '@mdi/js';
//import { mdiEmail } from '@mdi/js'; 
import Add from "@material-ui/icons/Add";
import Email from  "@material-ui/icons/Email";
import  mdiFileAlertOutline  from  "@material-ui/icons/FileCopy";
import Build from "@material-ui/icons/Build";

import Place from "@material-ui/icons/Place";
import DashboardIcon from   "@material-ui/icons/Dashboard";
import mdiChartTimelineVariant from  "@material-ui/icons/Timeline";
import EmojiIcon from "hhsbIcons/EmojiIcon.js"
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
    path: "/SubmitContent",
    name: "Content Display",
    rtlName: "التقويم",
    icon: add ,
    component:ContentDisplay,
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
  
];
export default hhsbRoutes;
