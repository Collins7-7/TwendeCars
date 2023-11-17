import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-toastify";
import {
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  useGetUserListingsQuery,
  useRemoveListingMutation,
} from "../store";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const { data, isError, isFetching } = useGetUserListingsQuery(currentUser);
  const [carListings, setCarListings] = useState([]);

  const [removeListing, result] = useRemoveListingMutation();
  console.log(result);

  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
        console.error(error);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) =>
          setFormData({ ...formData, avatar: downLoadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(profileUpdateStart());
      const response = await axios.post(
        `/api/users/profile/${currentUser._id}`,
        { ...formData }
      );
      if (response.data.success === false) {
        dispatch(profileUpdateFailure(response.data.message));

        return;
      }

      dispatch(profileUpdateSuccess(response.data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(profileUpdateFailure(error.response.data.message));
    }
  };

  ///Use the delete message in the React Tostify to show the delete message.

  const handleUserDelete = async () => {
    try {
      dispatch(deleteProfileStart());
      const res = await axios.delete(`/api/users/delete/${currentUser._id}`);

      if (res.data.success === false) {
        return dispatch(deleteProfileFailure(res.data.message));
      }

      dispatch(deleteProfileSuccess(res.data));
    } catch (error) {
      dispatch(deleteProfileFailure(error.response.data.message));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      const res = await axios.get("/api/auth/logout");
      dispatch(logoutSuccess(res.data));
    } catch (error) {
      dispatch(logoutFailure(error.response.data.message));
    }
  };

  const handleDisplayCars = () => {
    try {
      if (data && data.length > 0) {
        console.log(data);
        return setCarListings(data);
      }
    } catch (error) {
      isError;
      console.error(error);
    }
  };

  const handleDeleteListing = async (id) => {
    setCarListings([]);
    try {
      const res = await removeListing(id);
      if (res.isSuccess) {
        setCarListings(
          carListings.filter((listing) => {
            return listing._id !== id;
          })
        );

        toast.success("Listing deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error).message;
      setCarListings(carListings);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-3xl text-center my-7">Profile</h1>
      <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 self-center mt-3 cursor-pointer"
          src={formData.avatar || currentUser.avatar}
          alt="profile-pic"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Uploading Image (image must be less than 2mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="border p-3 rounded-lg bg-slate-900 text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-teal-700 p-3 rounded-lg uppercase text-white text-center hover:opacity-95"
          to={"/create-list"}
        >
          create car list
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleUserDelete}
          className="text-red-600 cursor-pointer"
        >
          Delete Account?
        </span>
        <span onClick={handleLogout} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

      {/* I'll Use React-Tostify for these two also. */}
      {error && <p className="text-red-700 mt-5">{error}</p>}
      {updateSuccess && (
        <p className="text-green-700 mt-5">Profile Update Successful!</p>
      )}

      <button
        onClick={handleDisplayCars}
        className="w-full p-3 rounded-lg mt-5 text-green-500 border bg-slate-900"
      >
        My Cars
      </button>
      {isError &&
        toast.error("Error getting cars listings", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })}
      {isFetching && (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
      {carListings.length > 0 && (
        <div className="flex gap-4 flex-col">
          <h1 className="text-center w-full mt-7 text-3xl">Your Cars</h1>
          {carListings.map((listing) => {
            return (
              <div
                className="flex p-3 rounded-lg border justify-between items-center"
                key={listing._id}
              >
                <Link to={`/listing/${listing._id}`} className="h-16 w-16">
                  <img
                    src={listing.imageUrls[0]}
                    alt="Listing cover image"
                  ></img>
                </Link>
                <Link
                  to={`/listing/${listing._id}`}
                  className="flex-1 hover:underline truncate"
                >
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col">
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="uppercase text-red-600"
                  >
                    delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="uppercase text-green-500">edit</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
