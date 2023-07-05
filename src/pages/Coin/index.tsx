import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import Navigation from "../../components/Navigation";
import Table from "../../components/Table";
import useConstants from "../../utils/useConstants";
import useStores, { DataProps } from "../../utils/useStores";

export default function CoinList() {
  const { URL, isDev } = useConstants();
  const { setIsLoading, deletedId, searchText, data, setData } = useStores();
  const [memoedData, setMemoedData] = useState<DataProps[]>([]);

  // run once, when data is not stored in state
  useEffect(() => {
    const fetchData = async () => {
      await fetch(URL.GET_ALL).then(async (res) => {
        const json = await res.json();

        if (json) {
          setData(json);
          setIsLoading(false);
        }
      });
    };

    if (data.length < 1) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL.GET_ALL, isDev, memoedData.length]);

  const memo = useMemo(() => {
    let memoed = [];

    searchText === ""
      ? deletedId === ""
        ? (memoed = data)
        : (memoed = data.filter((item: DataProps) => item.id !== deletedId))
      : deletedId === ""
      ? (memoed = data.filter((item: DataProps) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        ))
      : (memoed = data.filter(
          (item: DataProps) =>
            item.id !== deletedId &&
            item.name.toLowerCase().includes(searchText.toLowerCase())
        ));

    setMemoedData(memoed);

    return memoed;
  }, [data, deletedId, searchText]);

  return (
    <Layout>
      <div className="flex flex-col w-full p-5 gap-y-3">
        <Navigation />
        <Table data={memo} />
      </div>
    </Layout>
  );
}
