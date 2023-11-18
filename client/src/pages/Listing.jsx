import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleListingQuery } from "../store";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/bundle";

function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const { data, isError, isLoading } = useGetSingleListingQuery(
    params.listingId
  );

  const [listing, setListing] = useState(null);
  useEffect(() => {
    const getListing = async () => {
      const res = await data;

      setListing(res);
      console.log(listing);
    };
    getListing();
  }, []);
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
      {listing && !isError && !isLoading && (
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
            className="mySwiper"
          >
            {listing.imageUrls.map((url) => {
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
        </div>
      )}
    </main>
  );
}

export default Listing;
