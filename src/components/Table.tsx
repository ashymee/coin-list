import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import useStores, { DataProps } from "../utils/useStores";

export default function Table({ data }: { data: DataProps[] }) {
  const { setDeletedId, isLoading, errorMessage } = useStores();

  // pagination prerequisites
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex-1">
      {isLoading && "please wait..."}

      {!isLoading && errorMessage && (
        <div className="flex flex-col gap-y-2 text-xs border rounded-md p-5">
          <div className="">
            Type: <b>{errorMessage}</b>
          </div>
        </div>
      )}

      {!isLoading && !errorMessage && (
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
                <td className="px-2 w-96">
                  <Link
                    to={`/coin/${item.id}`}
                    className="text-[#3783C6] hover:border-b border-[#3783C6]"
                  >
                    {item.id}
                  </Link>
                </td>
                <td className="px-2 w-96">{item.name}</td>
                <td className="px-2 w-44">{item.symbol}</td>
                <td className="px-2">{item.rank}</td>
                <td className="px-2">{item.type}</td>
                <td className="px-2">{item.is_active ? "True" : "False"}</td>
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
          nextClassName="bg-transparent hover:text-blue-500 text-gray-500 px-3 py-1"
          previousClassName="bg-transparent text-gray-500 px-3 py-1"
          activeClassName="bg-blue-500 text-white"
          disabledClassName="bg-transparent text-gray-500"
          disabledLinkClassName="cursor-not-allowed hover:text-white"
        />
      </div>
    </div>
  );
}
