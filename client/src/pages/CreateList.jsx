function CreateList() {
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
            <input type="file" className="p-3 border w-full rounded" />
            <button className="p-4 border text-purple-500 border-purple-500 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="bg-slate-900 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
            Create car list
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateList;
