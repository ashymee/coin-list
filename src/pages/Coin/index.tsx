import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

export interface DataProps {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function CoinList() {
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [deletedId, setDeletedId] = useState("");
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  // const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://api.coinpaprika.com/v1/coins").then(async (res) => {
        const json = await res.json();

        if (json) {
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
          setLoading(false);
        }
      });
    };

    fetchData();
  }, [deletedId, searchText]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <Layout>
      <div className="flex flex-col max-h-[599px] w-full p-5 gap-y-3">
        <div className="flex-none text-[#2569A5] text-lg">Coin List</div>

        <div className="flex items-center gap-x-2">
          <select
            disabled
            className="px-4 py-2 w-56 rounded-lg"
            placeholder="Select"
          >
            <option value="select">Select</option>
          </select>

          <div className="relative">
            <input
              type="text"
              className="pr-4 py-2 w-56 rounded-lg border pl-8"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <LuSearch className="absolute top-3 left-2 text-gray-400" />
          </div>

          <button className="px-4 py-2 w-32 bg-[#2569A5] hover:bg-[#2569A5] rounded-lg text-white">
            Search
          </button>
        </div>

        <div className="flex-1">
          {loading && "please wait..."}

          {!loading && (
            <table className="w-full">
              <thead className="bg-[#3783C6] text-white">
                <tr>
                  <th className="text-left p-2 rounded-tl-lg">ID</th>
                  <th className="text-left p-2">name</th>
                  <th className="text-left p-2">symbol</th>
                  <th className="text-left p-2">rank</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Active</th>
                  <th className="text-left p-2 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(itemOffset, endOffset).map((item, index) => (
                  <tr key={index}>
                    <td className="px-2">
                      <Link to={`/coin/${item.id}`}>{item.id}</Link>
                    </td>
                    <td className="px-2">{item.name}</td>
                    <td className="px-2">{item.symbol}</td>
                    <td className="px-2">{item.rank}</td>
                    <td className="px-2">{item.type}</td>
                    <td className="px-2">
                      {item.is_active ? "True" : "False"}
                    </td>
                    <td className="px-2">
                      <button
                        className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg text-white"
                        onClick={() => setDeletedId(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex items-center justify-end py-3">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName="flex gap-x-2"
              pageClassName="px-3 py-1 border rounded-lg"
              nextClassName="bg-transparent text-gray-500 px-3 py-1"
              previousClassName="bg-transparent text-gray-500 px-3 py-1"
              activeClassName="bg-blue-500 text-white"
              disabledClassName="bg-transparent text-gray-500"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
