import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataProps } from ".";
import Layout from "../../components/Layout";

export default function CoinDetail() {
  const { id } = useParams();
  const [data, setData] = useState<DataProps | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        await fetch(`https://api.coinpaprika.com/v1/coins/${id}`).then(
          async (res) => {
            const json = await res.json();
            json && setData(json);
          }
        );
      };

      fetchData();
    }
  }, [id]);

  return (
    <Layout>
      <div className="p-5">
        <div className="flex-none text-[#2569A5] text-lg mb-10">
          Coin Detail
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-10">
            <h1 className="w-52">ID</h1>
            <p>{data?.id}</p>
          </div>

          <div className="flex items-center gap-x-10">
            <h1 className="w-52">Name</h1>
            <p>{data?.name}</p>
          </div>

          <div className="flex items-center gap-x-10">
            <h1 className="w-52">Symbol</h1>
            <p>{data?.symbol}</p>
          </div>

          <div className="flex items-center gap-x-10">
            <h1 className="w-52">Type</h1>
            <p>{data?.type}</p>
          </div>

          <div className="flex items-center gap-x-10">
            <h1 className="w-52">Active</h1>
            <p>{data?.is_active ? "True" : "False"}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
