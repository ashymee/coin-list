import Layout from "../../components/Layout";
import Navigation from "../../components/Navigation";
import Table from "../../components/Table";

export default function CoinList() {
  return (
    <Layout>
      <div className="flex flex-col max-h-[599px] w-full p-5 gap-y-3">
        <Navigation />
        <Table />
      </div>
    </Layout>
  );
}
