import WebsiteDetails from "./WebsiteDetails";

const AdminHome = () => {
  return (
    <section className="w-full flex flex-col gap-y-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full rounded-lg shadow p-4">
          <WebsiteDetails />
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
