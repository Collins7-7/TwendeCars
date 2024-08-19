import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSingleListingQuery } from "../store";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaCar, FaCarSide } from "react-icons/fa";
import Contact from "../components/Contact";

function Listing() {
  SwiperCore.use([Navigation]);

  const { currentUser } = useSelector((state) => state.user);

  const [contact, setContact] = useState(false);
  const params = useParams();
  const { data, isError, isLoading } = useGetSingleListingQuery(
    params.listingId
  );

  // const [listing, setListing] = useState(null);
  // useEffect(() => {
  //   const getListing = async () => {
  //     const res = await data;

  //     setListing(res);
  //     console.log(listing);
  //   };
  //   getListing();
  // }, [params.listingId]);
  return (
    <main>
      {isError && <div>Could Not Get Listing</div>}
      {isLoading && (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-lg w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {data && !isError && !isLoading && (
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-[550px] mySwiper"
          >
            {data.imageUrls.map((url) => {
              return (
                <SwiperSlide key={url}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {data.name} - ${" "}
              {data.offer
                ? (+data.regularPrice - +data.discountPrice).toLocaleString("en-US")
                : data.regularPrice.toLocaleString("en-US")}
              {data.type === "lease" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaCar className="text-green-700" />
              {data.modelYear}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {data.type === "lease" ? "For Lease" : "For Sale"}
              </p>
              {data.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {/* ${+data.regularPrice - +data.discountPrice} OFF */}
                  ${+data.discountPrice} OFF
                  
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {data.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCarSide className="text-lg" />
                {data.units && `${data.units} available`}
              </li>
            </ul>
            {currentUser && currentUser._id !== data.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-900 rounded-lg hover:opacity-95 text-white p-3 uppercase"
              >
                Contact Owner
              </button>
            )}
            {contact && <Contact listing={data} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
