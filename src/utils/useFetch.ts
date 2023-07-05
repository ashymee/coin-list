import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStores, { DataProps } from "./useStores";

const useFetch = () => {
  const isDev = import.meta.env.MODE === "development";
  const { id } = useParams();
  const [data, setData] = useState<DataProps[]>([]);
  const { setIsLoading, deletedId, setSingleData, searchText } = useStores();

  // pagination prerequisites
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const URL = {
    DUMMY_DEV: "http://localhost:5173/coins.json",
    GET_ALL: "https://api.coinpaprika.com/v1/coins",
    GET_DETAIL: `https://api.coinpaprika.com/v1/coins/${id}`,
  };

  // run once, when data is not stored in state
  useEffect(() => {
    const fetchData = async () => {
      await fetch(isDev ? URL.DUMMY_DEV : URL.GET_ALL).then(async (res) => {
        const json = await res.json();

        if (json) {
          setData(json);
          setIsLoading(false);
        }
      });
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedId, searchText]);

  // update changes when data is exist, this is to reduced hit request each actions
  useEffect(() => {
    let isChanged = true;

    if (data.length > 0 && isChanged) {
      const json = [...data];

      setData(
        searchText === ""
          ? deletedId === ""
            ? json
            : json.filter((item: DataProps) => item.id !== deletedId)
          : deletedId === ""
          ? json.filter((item: DataProps) =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            )
          : json.filter(
              (item: DataProps) =>
                item.id !== deletedId &&
                item.name.toLowerCase().includes(searchText.toLowerCase())
            )
      );
    }

    return () => {
      isChanged = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, deletedId, searchText]);

  // fetcher data by id
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        await fetch(URL.GET_DETAIL).then(async (res) => {
          const json = await res.json();
          json && setSingleData(json);
        });
      };

      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return {
    itemOffset,
    searchText,
    deletedId,
    endOffset,
    pageCount,
    handlePageClick,
    data,
  };
};

export default useFetch;
