import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login";
import LandingPage from "../views/Landing";
import WorkingHours from "../views/WorkingHoursPublic";
import SignUp from "../views/SignUp";

const routes = [
  {
    path: "/",
    name: "Landing-Page",
    component: LandingPage,
  },
  {
    path: "/workinghours",
    name: "WorkingHoursPublic-Page",
    component: WorkingHours,
  },
  {
    path: "/signup",
    name: "SignUp-Page",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login-Page",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
