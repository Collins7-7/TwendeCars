import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetLandLordQuery } from "../store";

function Contact({ listing }) {
  const { data } = useGetLandLordQuery(listing?.userRef);
  const [message, setMessage] = useState("");
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      await data;
    };

    fetchData();
  }, [listing.userRef]);

  return (
    <div className="flex flex-col gap-4">
      <p>
        Contact owner <span className="font-semibold">{data?.username}</span>{" "}
        for <span className="font-semibold">{listing.name}</span>
      </p>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        name="message"
        id="message"
        rows="2"
        value={message}
        className="border w-full p-3 rounded-lg"
        placeholder="Enter message here..."
      ></textarea>
      <Link
        to={`mailto:${data?.email}?subject=Regarding ${data?.username}&body=${message}`}
        className="bg-slate-900 text-white uppercase p-3 rounded-lg text-center hover:opacity-95 "
      >
        Send Message
      </Link>
    </div>
  );
}

export default Contact;
