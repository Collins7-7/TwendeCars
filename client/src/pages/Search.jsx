function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              className=" w-full border p-3 rounded-lg "
              type="text"
              placeholder="Search..."
              id="searchTerm"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="all" />
              <span>Lease & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="lease" />
              <span>Lease</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort:</label>
            <select id="sort_order" className="p-3 border rounded-lg">
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">latest</option>
              <option value="">oldest</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="font-semibold text-3xl border-b p-3 text-slate-800">
          Search Result:
        </h1>
      </div>
    </div>
  );
}

export default Search;
