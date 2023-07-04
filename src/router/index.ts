import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import CoinList from "../pages/Coin";
import CoinDetail from "../pages/Coin/detail";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/coin-list",
    Component: CoinList,
  },
  {
    path: "/coin/:id",
    Component: CoinDetail,
  },
]);

export default router;
