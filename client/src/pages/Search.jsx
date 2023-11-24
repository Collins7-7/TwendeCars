import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostSearchMutation } from "../store";
import ListItem from "../components/ListItem";

function Search() {
  const [searchContent, setSearchContent] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [postSearch, result] = usePostSearchMutation();
  console.log(result);

  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermForm = urlParams.get("searchTerm");
    const typeForm = urlParams.get("type");
    const offerForm = urlParams.get("offer");
    const sortForm = urlParams.get("sort");
    const orderForm = urlParams.get("order");

    if (searchTermForm || typeForm || offerForm || sortForm || orderForm) {
      setSearchContent({
        searchTerm: searchTermForm || "",
        type: typeForm || "all",
        offer: offerForm === "true" ? true : false,
        sort: sortForm || "created_at",
        order: orderForm || "desc",
      });
    }

    const searchQuery = urlParams.toString();

    const fetchRequest = async () => {
      setShowMore(false);
      const res = await postSearch(searchQuery);
      setListings(res.data);

      if (listings.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    };

    fetchRequest();
  }, [location.search]);

  const handleSubmission = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchContent.searchTerm);
    urlParams.set("type", searchContent.type);
    urlParams.set("offer", searchContent.offer);
    urlParams.set("sort", searchContent.sort);
    urlParams.set("order", searchContent.order);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const handleFormChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "lease" ||
      e.target.id === "sale"
    ) {
      setSearchContent({ ...searchContent, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSearchContent({ ...searchContent, searchTerm: e.target.value });
    }
    if (e.target.id === "offer") {
      setSearchContent({
        ...searchContent,
        offer: e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSearchContent({ ...searchContent, sort, order });
    }
  };

  const handleShowMore = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const query = urlParams.toString();
    const res = await postSearch(query);

    if (res.data < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...res.data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmission} className="flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              className=" w-full border p-3 rounded-lg "
              type="text"
              placeholder="Search..."
              id="searchTerm"
              value={searchContent.searchTerm}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="all"
                checked={searchContent.type === "all"}
                onChange={handleFormChange}
              />
              <span>Lease & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="lease"
                checked={searchContent.type === "lease"}
                onChange={handleFormChange}
              />
              <span>Lease</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="sale"
                checked={searchContent.type === "sale"}
                onChange={handleFormChange}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                checked={searchContent.offer}
                onChange={handleFormChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="p-3 border rounded-lg"
              onChange={handleFormChange}
              defaultValue="created_at_desc"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">latest</option>
              <option value="createdAt_asc">oldest</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="font-semibold text-3xl border-b p-3 text-slate-800">
          Search Result:
        </h1>
        <div className="flex gap-4 flex-wrap p-7">
          {!result.isLoading ||
            (listings.length < 1 && (
              <p className="text-xl text-slate-700">No listing found</p>
            ))}

          {result.isLoading && (
            <p className="text-xl text-slate-700">Loading...</p>
          )}
          {listings?.map((listing) => {
            return <ListItem key={listing._id} listing={listing} />;
          })}
        </div>
        {showMore && (
          <button
            className="text-purple-500 underline"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
