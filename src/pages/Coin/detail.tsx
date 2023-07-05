import { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import useConstants from "../../utils/useConstants";
import useStores from "../../utils/useStores";

export default function CoinDetail() {
  const { id } = useParams();
  const { singleData, setSingleData } = useStores();
  const { isDev, URL } = useConstants();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://api.coinpaprika.com/v1/coins/${id}`).then(
        async (res) => {
          const json = await res.json();

          json && setSingleData(json);
        }
      );
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL.GET_DETAIL, isDev]);


  return (
    <Layout>
      <div className="p-5">
        <div className="flex-none text-[#2569A5] text-lg mb-10">
          Coin Detail
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-10">
            <h1 className="w-52">ID</h1>
            <p>{singleData?.id}</p>
          </div>

          <div className="flex items-center gap-x-10">
            <h1 className="w-52">Name</h1>
            <p>{singleData?.name}</p>
          </div>

          <div className="flex items-center gap-x-10">
            <h1 className="w-52">Symbol</h1>
            <p>{singleData?.symbol}</p>
          </div>

          <div className="flex items-center gap-x-10">
            <h1 className="w-52">Type</h1>
            <p>{singleData?.type}</p>
          </div>

          <div className="flex items-center gap-x-10">
            <h1 className="w-52">Active</h1>
            <p>{singleData?.is_active ? "True" : "False"}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
