import { Link } from "react-router-dom";

import { FaCar, FaCarSide } from "react-icons/fa";

function ListItem({ listing }) {
  return (
    <div className="w-full bg-white shadow-md hover:shadow-lg transition-shadow sm:w-[330px] rounded-lg overflow-hidden">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGG4rsbT6C2hO2QbUbniHcqXaXa73tBT7Nfw&s"}
          alt="listing-cover"
          className="h-[320px] sm:h-[220px] rounded-lg hover:scale-105
          transition-scale object-cover w-full duration-300"
        />
        <div className="flex p-3 flex-col gap-2 w-full">
          <p className="text-lg truncate font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <FaCar className="text-green-500 h-4 w-4" />
            <p className="text-sm truncate text-gray-600">
              Model Year {listing.modelYear}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="mt-2 text-slate-500 font-semibold">
            Ksh
            {listing.offer
              ? listing?.discountPrice.toLocaleString("en-US")
              : listing?.regularPrice.toLocaleString("en-US")}
            {listing.type === "lease" && "/month"}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {listing.units}
            <span className="text-green-500">
              <FaCarSide />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListItem;
