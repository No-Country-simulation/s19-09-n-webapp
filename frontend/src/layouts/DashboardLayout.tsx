import Sidebar from "../components/ui/Sidebar";

export default function DashboardLayout() {
  return (
    <section>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}></div>
      </div>
    </section>
  );
}
