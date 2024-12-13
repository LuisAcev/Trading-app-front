import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ChartDraw } from "../components/chartDraw/ChartDraw";
import { Calculator } from "../components/MenuContentButtons/calculator/Calculator";
import { EconomicCalendar } from "../components/MenuContentButtons/economicCalendar/EconomicCalendar";
import { TradingIdeas } from "../components/MenuContentButtons/tradingIdeas/TradingIdeas";
import { CandleCharts } from "../components/charts/CandleCharts";
import { LineCharts } from "../components/charts/LineCharts";
import { AreaCharts } from "../components/charts/AreaCharts";
import { BarCharts } from "../components/charts/BarCharts";
import { SignIn } from "../theme/singIn/SinIn";
import { SignUp } from "../theme/signUp/SignUp";
import { Home } from "../theme/home/Home";
import { Account } from "../components/MenuContentButtons/account/Account";
import { ProtectedRoute } from "./pretectedRoute/ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "sign_in",
      element: <SignIn />,
    },
    {
      path: "sign_up",
      element: <SignUp />,
    },
    {
      path: "dashboard",
      element: <ProtectedRoute />,

      children: [
        {
          path: "charts",
          element: <ChartDraw />,
          children: [
            { path: "c", element: <CandleCharts /> },
            { path: "b", element: <BarCharts /> },
            { path: "l", element: <LineCharts /> },
            { path: "a", element: <AreaCharts /> },
          ],
        },
        { path: "economic_calendar", element: <EconomicCalendar /> },
        { path: "calculator", element: <Calculator /> },
        { path: "trading_ideas", element: <TradingIdeas /> },
        { path: "account", element: <Account /> },
        { path: "home", element: <Navigate to="/" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    },
  }
);

export const AppRouter = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export default AppRouter;
