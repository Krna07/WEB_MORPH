import AdaptiveDashboard from '../components/dashboard/AdaptiveDashboard';
import ErrorBoundary from '../components/common/ErrorBoundary';

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <AdaptiveDashboard />
    </ErrorBoundary>
  );
}
