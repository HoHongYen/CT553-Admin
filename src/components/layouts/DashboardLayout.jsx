import styled from "styled-components";
import { useRecentBookings } from "@/hooks/dashboard/useRecentBookings";
import { useRecentStays } from "@/hooks/dashboard/useRecentStays";
import { useUsers } from "@/hooks/users/useUsers";

import Spinner from "@/components/ui/Spinner";
import Stats from "@/components/dashboard/Stats";
import SalesChart from "@/components/dashboard/SalesChart";
import DurationChart from "@/components/dashboard/DurationChart";
import TodayActivity from "@/components/dashboard/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { users, isLoading: isLoading3 } = useUsers();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={users.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
