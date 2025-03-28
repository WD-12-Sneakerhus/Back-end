import Table from "../../components/Table";
import AdminLayout from "../../layouts/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>
      <Table />
    </AdminLayout>
  );
};

export default Dashboard;
