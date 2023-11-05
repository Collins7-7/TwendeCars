import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
} from "../store";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  console.log(currentUser);

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
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleUserDelete}
          className="text-red-600 cursor-pointer"
        >
          Delete Account?
        </span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>

      {/* I'll Use React-Tostify for these two also. */}
      {error && <p className="text-red-700 mt-5">{error}</p>}
      {updateSuccess && (
        <p className="text-green-700 mt-5">Profile Update Successful!</p>
      )}
    </div>
  );
}

export default Profile;
