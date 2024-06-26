import { lazy } from "react";
const Default = lazy(() => import("pages/default"));
const Products = lazy(() => import("pages/products"));
const User = lazy(() => import("pages/admin"));
const NotFound = lazy(() => import("pages/notFound"));
const LocalizationPanel = lazy(() => import("pages/localizationPanel"));
// const Login = lazy(() => import("pages/login"));

export interface IRoute {
  path: string;
  access?: string[] | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [
  {
    path: "/",
    access: ["admin", "user"],
    title: "Welcome",
    element: <Default />,
  },
  {
    path: "/profile",
    access: ["admin"],
    title: "Profile",
    element: <User />,
  },
  {
    path: "/products",
    access: ["admin"],
    title: "Mahsulotlar",
    element: <Products />,
  },
  {
    path: "/translations",
    access: ["admin"],
    title: "Translations",
    element: <LocalizationPanel />,
  },
  {
    path: "*",
    access: ["admin"],
    title: "",
    element: <NotFound />,
  },
];

const publicRoutes: IRoute[] = [
  // {
  //   path: "/login",
  //   access: [],
  //   title: "Login",
  //   element: <Login />,
  // },
];

export { privateRoutes, publicRoutes };
