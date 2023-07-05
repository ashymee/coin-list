import { Fragment } from "react";
import { LuSearch } from "react-icons/lu";
import useStores from "../utils/useStores";

export default function Navigation() {
  const { searchText, setSearchText } = useStores();

  return (
    <Fragment>
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
    </Fragment>
  );
}
