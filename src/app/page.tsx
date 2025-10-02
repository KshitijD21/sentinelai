import { AppLayout } from "@/components/app-layout";
import DashboardPage from "@/components/dashboard";

/**
 * Home page component - displays the SentinelAI dashboard
 */
export default function Home() {
  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  );
}
