import Cars from "../assets/Cars.json"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import ListItem from "../components/ListItem";
import { usePostSearchMutation } from "../store";

function Home() {

  const [postSearch, result] = usePostSearchMutation();

const [offerListings, setOfferListings] = useState([]);
const [saleListings, setSaleListings] = useState([]);
const [leaseListings, setLeaseListings] = useState([]);

console.log("Sale listings: ",saleListings)

useEffect(()=>{
  const fetchOfferListings = async ()=> {
    try {
      const res = await postSearch("offer=true&limit=4")
      setOfferListings(res.data);
      fetchLeaseListing();
    } catch (error) {
      console.log(error)
    }
  } 

  const fetchLeaseListing = async()=> {
    try {
      const res = await postSearch("type=lease&limit=4");
      setLeaseListings(res.data);
      fetchSaleListings();
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSaleListings = async()=> {
    try {
      const res = await postSearch("type=sale&limit=4")
      setSaleListings(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchOfferListings();
},
[])

  return <div className="bg-gradient-to-b rounded-sm">
    {/* {top} */}
    <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
      <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Drive Your Best</h1>
      <div className="text-gray-800 text-xs sm:text-sm">
        Get the best cars at TwendeCars at unbeatable prices!
      </div>
      <Link to={"/search"} className="text-xs sm:text-sm text-slate-800 font-bold hover:underline">
      Let's get started...
      </Link>
      
  </div>
  {/* {the cars} */}
  <div style={{marginBottom: "20%"}} className="h-[500px]">
      <Lottie  animationData={Cars}></Lottie>
  </div>
    {/* {listing results for offer, sale and lease} */}
  
  <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8">
    {
      offerListings && offerListings.length > 0 && (
        <div className="my-10">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
            <Link className="text-sm text-slate-800 hover:underline" to={'/search?offer=true'}>
            show more offers...
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {
              offerListings.map((listing)=> (
                <ListItem listing={listing} key={listing._id}></ListItem>
              ))
            }
          </div>
        </div>
      )
    }

{
      leaseListings && leaseListings.length > 0 && (
        <div className="my-10">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">Leasable Cars</h2>
            <Link className="text-sm text-slate-800 hover:underline" to={'/search?type=lease'}>
            show more cars for lease...
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {
              leaseListings.map((listing)=> (
                <ListItem listing={listing} key={listing._id}></ListItem>
              ))
            }
          </div>
        </div>
      )
    }

{
      saleListings && saleListings.length > 0 && (
        <div className="my-10">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">Cars For Sale</h2>
            <Link className="text-sm text-slate-800 hover:underline" to={'/search?type=sale'}>
            show more cars for sale...
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {
              saleListings.map((listing)=> (
                <ListItem listing={listing} key={listing._id}></ListItem>
              ))
            }
          </div>
        </div>
      )
    }
  </div>
  </div>;
}

export default Home;
