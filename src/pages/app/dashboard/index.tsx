import DashboardLayout from "../layout";

export default function Dashboard() {
  return (
    <DashboardLayout
      pageTitle="Dashboard"
      pageDescription="Get an overview of all activities and transactions"
    >
      <section className="py-5">
        {/* <ReusableTab tabList={TABS} /> */}
      </section>
    </DashboardLayout>
  );
}
