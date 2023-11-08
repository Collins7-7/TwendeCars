import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

function CreateList() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

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
          console.log(`Upload is ${progress}% done`);
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
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Create Cars List
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-lg"
            maxLength="62"
            required
            id="name"
          />
          <textarea
            type="text"
            placeholder="Description"
            className="p-3 rounded-lg"
            required
            id="description"
          />
          <input
            type="text"
            placeholder="Model Year"
            className="p-3 rounded-lg"
            required
            id="modelYear"
          />
          <div className="flex flex-wrap gap-8 mb-3">
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="lease" />
              <span>Lease</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
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
              />
              <span>Units</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="rounded-lg border border-gray-300 p-3"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                required
                className="rounded-lg border border-gray-300 p-3"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
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
                    onClick={() => handleImageDelete(i)}
                    className="uppercase text-red-600 hover:opacity-75 "
                  >
                    delete
                  </button>
                </div>
              );
            })}
          <button className="bg-slate-900 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
            Create car list
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateList;
