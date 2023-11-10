import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useAddListingMutation } from "../store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateList() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    modelYear: "",
    regularPrice: 50,
    discountPrice: 0,
    units: 1,
    type: "lease",
    offer: false,
    userRef: currentUser._id,
  });

  const navigate = useNavigate();

  const [addListing, result] = useAddListingMutation();

  console.log(result);

  const [imageUploadError, setImageUploadError] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [error, setError] = useState(false);

  const handleImageUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setIsLoadingImages(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);

          ///Use the React-toastify for notification of images having successfully been uploaded.
          setIsLoadingImages(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed(2mb max per image)", err);
          setIsLoadingImages(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setIsLoadingImages(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
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
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => {
        return index !== i;
      }),
    });
  };

  const handleInputChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "lease") {
      return setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (e.target.id === "offer") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleCreateList = (e) => {
    e.preventDefault();
    try {
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Regular Price should be greater than discount price");
      }
      if (formData.imageUrls.length < 1) {
        return setError("You need to upload at least one image");
      }

      addListing(formData);

      if (result.isSuccess === true) {
        toast("List Created Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(result.data);
        // navigate(`/listing/${result.data._id}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Create Cars List
      </h1>
      <form
        onSubmit={handleCreateList}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-lg"
            maxLength="62"
            required
            id="name"
            onChange={handleInputChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="p-3 rounded-lg"
            required
            id="description"
            onChange={handleInputChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Model Year"
            className="p-3 rounded-lg"
            required
            id="modelYear"
            onChange={handleInputChange}
            value={formData.modelYear}
          />
          <div className="flex flex-wrap gap-8 mb-3">
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="sale"
                onChange={handleInputChange}
                checked={formData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="lease"
                onChange={handleInputChange}
                checked={formData.type === "lease"}
              />
              <span>Lease</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="offer"
                onChange={handleInputChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="number"
                id="units"
                min="1"
                max="10"
                required
                className=" rounded-lg border border-gray-300 p-3"
                onChange={handleInputChange}
                value={formData.units}
              />
              <span>Units</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                required
                className="rounded-lg border border-gray-300 p-3"
                onChange={handleInputChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  required
                  className="rounded-lg border border-gray-300 p-3"
                  onChange={handleInputChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Image:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              className="p-3 border w-full rounded"
              id="image"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageUpload}
              type="button"
              className="p-4 border text-purple-500 border-purple-500 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {isLoadingImages ? "Loading..." : "Upload"}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-600">{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, i) => {
              return (
                <div
                  key={url}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <img
                    className="h-20 w-20 object-contain rounded-lg"
                    src={url}
                    alt="carList image"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(i)}
                    className="uppercase text-red-600 hover:opacity-75 "
                  >
                    delete
                  </button>
                </div>
              );
            })}

          {imageUploadError ? (
            <p className="text-center">
              <span className="text-red-600">{imageUploadError}</span>
            </p>
          ) : filePerc >= 0 && filePerc < 100 ? (
            <p className="text-center">
              <span
                hidden={!filePerc}
                className="text-gray-500"
              >{`${filePerc}%`}</span>
            </p>
          ) : (
            <p className="text-center">
              <span
                hidden={!isLoadingImages}
                className="text-green-500"
              >{`${filePerc}% Image upload successful!`}</span>
            </p>
          )}

          {error && <p className="text-red-600">{error}</p>}
          <button
            disabled={result.isLoading || isLoadingImages}
            className="bg-slate-900 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {result.isLoading ? "Creating..." : "Create car list"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateList;
