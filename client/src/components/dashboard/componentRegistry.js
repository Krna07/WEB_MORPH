import RevenueCard from '../widgets/RevenueCard';
import OrdersCard from '../widgets/OrdersCard';
import CustomerCard from '../widgets/CustomerCard';
import ConversionCard from '../widgets/ConversionCard';
import RevenueChart from '../widgets/RevenueChart';
import SalesChart from '../widgets/SalesChart';
import CustomerGrowthChart from '../widgets/CustomerGrowthChart';
import TransactionTable from '../widgets/TransactionTable';
import RegionalSalesChart from '../widgets/RegionalSalesChart';
import ProductPerformance from '../widgets/ProductPerformance';
import NotificationPanel from '../widgets/NotificationPanel';
import MarketingAnalytics from '../widgets/MarketingAnalytics';
import FailureAnalytics from '../widgets/FailureAnalytics';
import FailedTransactionTable from '../widgets/FailedTransactionTable';
import ErrorDistribution from '../widgets/ErrorDistribution';
import ResolutionPanel from '../widgets/ResolutionPanel';
import CustomerSegmentation from '../widgets/CustomerSegmentation';
import ChurnAnalysis from '../widgets/ChurnAnalysis';
import CustomerLifetimeValue from '../widgets/CustomerLifetimeValue';
import EngagementMetrics from '../widgets/EngagementMetrics';
import ProductRankingTable from '../widgets/ProductRankingTable';
import DecliningSalesChart from '../widgets/DecliningSalesChart';
import InventoryStatus from '../widgets/InventoryStatus';
import ProfitMarginChart from '../widgets/ProfitMarginChart';
import RegionalMap from '../widgets/RegionalMap';
import CityPerformance from '../widgets/CityPerformance';
import SalesRepPerformance from '../widgets/SalesRepPerformance';
import RegionalComparison from '../widgets/RegionalComparison';

export const componentRegistry = {
  RevenueCard, OrdersCard, CustomerCard, ConversionCard,
  RevenueChart, SalesChart, CustomerGrowthChart, TransactionTable,
  RegionalSalesChart, ProductPerformance, NotificationPanel, MarketingAnalytics,
  FailureAnalytics, FailedTransactionTable, ErrorDistribution, ResolutionPanel,
  CustomerSegmentation, ChurnAnalysis, CustomerLifetimeValue, EngagementMetrics,
  ProductRankingTable, DecliningSalesChart, InventoryStatus, ProfitMarginChart,
  RegionalMap, CityPerformance, SalesRepPerformance, RegionalComparison
};

export const defaultLayout = [
  'RevenueCard', 'OrdersCard', 'CustomerCard', 'ConversionCard',
  'RevenueChart', 'SalesChart', 'CustomerGrowthChart', 'TransactionTable',
  'RegionalSalesChart', 'ProductPerformance', 'NotificationPanel', 'MarketingAnalytics'
];
