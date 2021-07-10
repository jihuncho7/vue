import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./views/Home";
import HireActor from "./views/HireActor";
import HireStaff from "./views/HireStaff";
import Community from "./views/Community";
import Freeboard from "./board/Freeboard";
import FreeWrite from "./board/FreeWrite";
import FreeView from "./board/FreeView";
import FreeUpdate from "./board/FreeUpdate";
import Test from "./Test/Test"
import ResumeList from "./mypage/ResumeList";
import ResumeActor from "./mypage/ResumeActor";
import ResumeDetail from "./mypage/ResumeDetail";
import ResumeWrite from "./mypage/ResumeWrite";
import HireStaffDetail from "./views/HireStaffDetail";
import Profile from "./mypage/Profile";
import MypostList from "./mypage/mypostlist";

import Login from "./views/Login";

import StaffBoard from "./views/StaffBoard";
import StaffBoardDetail from "./views/StaffBoardDetail";
import ActorBoard from "./views/ActorBoard";
import ActorBoardDetail from "./views/ActorBoardDetail";
import search_result from "./board/search_result";
import HireStaffWrite from "./views/HireStaffWrite";
import HireStaffUpdate from "./views/HireStaffUpdate";
import HireActorWrite from "./views/HireActorWrite";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path:"/search_result",
            component: search_result,
            name: "search_result",
            props: true
        },
        {
            path:"/actorboarddetail/:id",
            component: ActorBoardDetail,
            name: "ActorBoardDetail",
            props: true
        },
        {
            path:"/actorboard",
            component: ActorBoard,
            name: "ActorBoard",
            props: true
        },
        {
            path:"/staffboarddetail/:id",
            component: StaffBoardDetail,
            name: "StaffBoardDetail",
            props: true
        },
        {
            path:"/staffboard",
            component: StaffBoard,
            name: "StaffBoard",
            props: true
        },
        {
            path:"/Test",
            component: Test,
            name: "Test",
            props: true
        },
        {
            path:"/mypostlist",
            component: MypostList,
            name: "MypostList",

        },
        {
            path:"/profile",
            component: Profile,
            name: "Profile",

        },
        {
            path:"/HireStaffUpdate/",
            component: HireStaffUpdate,
            name: 'HireStaffUpdate',
        },
        {
            path:"/HireStaffDetail/:id",
            component: HireStaffDetail,
            name: 'HireStaffDetail',
        },
        {
            path:"/HireStaffWrite",
            component: HireStaffWrite,
            name: 'HireStaffWrite',
        },
        {
            path:"/ResumeWrite",
            component: ResumeWrite,
            name: 'ResumeWrite',
        },
        {
            path:"/ResumeDetail/:id",
            component: ResumeDetail,
            name: 'ResumeDetail',
        },
        {
            path:"/ResumeList",
            component: ResumeList,
            name: 'ResumeList',
        },
        {
            path:"/ResumeActor",
            component: ResumeActor,
            name: 'ResumeActor',
        },
        {
            path:"/", 
            component: Home,
        },
        {
            path:"/Login", 
            component: Login,
            name: 'Login',
        },
        {
            path:"/HireActor",
            component: HireActor,
        },
        {
            path:"/HireActorWrite",
            component: HireActorWrite,
            name: 'HireActorWrite',
        },
        {
            path:"/HireStaff",
            component: HireStaff,
        },
        {
            path:"/Community",
            component: Community,
        },
        {
            path:"/Freeboard",
            component: Freeboard,
            name: 'Freeboard',
        },
        {
            path:"/FreeWrite",
            component: FreeWrite,
            name: 'FreeWrite',
        },
        {
            path:"/FreeView/:id",
            component: FreeView,
            name: 'FreeView',
        },
        {
          path:"/FreeUpdate/:id",
          component: FreeUpdate,
          name: 'FreeUpdate',
        },
    ]
})

export default router;