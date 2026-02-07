import { useHasPermission } from "../../src/hooks/permissionsHook";
import Cards from "./Cards";
import Producttable from "./Producttable";
import SaleChart from "./SaleChart";

const Dashboard = () => {
  const hasCardsPermission = useHasPermission('read_order_statistics')
  const hasFewerProductsPermission = useHasPermission('read_fewer_products')
  const hasChartPermission = useHasPermission('read_orders_year')
  return (
    <div id="dashboard_section" className="dashboard_section main_section">
      {hasCardsPermission && <Cards/>}
      <div className="row">
        {hasFewerProductsPermission && <Producttable/>}
        {hasChartPermission && <SaleChart/>}
      </div>
    </div>
  );
};

export default Dashboard;