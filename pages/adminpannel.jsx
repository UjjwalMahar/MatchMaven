import { useTeamForm } from "@/context/forms/productformContext"
function Adminpannel() {
    const {
        team,
        image,
        setImage,
        setUid,
        setAvatar,
        setName,
        setCategory,
        setLocation,
        clearteam,
        handleImageSelect,
        handelUploadImage,
        handelSubmit,
        imageUploading,
        isLoading
    } = useTeamForm()
    return (
        <>
            <form onSubmit={(e) => { handelSubmit(e) }}>
                <div class="space-y-12 p-5 pb-12 border-gray-400 bg-white rounded-md shadow-md">
                    <div class="pb-12">
                        <h2 class="text-xl font-semibold leading-7 text-gray-900">My Profile</h2>
                        <p class="mt-1 font-medium text-sm leading-6 text-gray-600 pb-6">This information will be displayed publicly so be careful what you share.</p>
                        <div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {!image ? <div class="col-span-full">
                                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Upload Avatar / Change Avatar</label>
                                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div class="text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                        </svg>
                                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                                                <span>Change Avatar</span>
                                                <input onChange={(e) => { handleImageSelect(e) }} id="file-upload" name="file-upload" type="file" class="sr-only" />
                                            </label>
                                            <p class="pl-1">or drag and drop</p>
                                        </div>
                                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div> 
                            : <div className="flex mt-4 flex-col items-center mx-auto w-full  col-span-full">
  {image && (
   <div className="col-span-full">
     <img
      src={URL.createObjectURL(image)}
      width="200"
      height="200"
      alt="Uploaded Image"
    />
  
   </div>
   )}
  <button
    onClick={(e) => { handelUploadImage(e) }}
    className="px-4 py-2  text-white mx-auto font-medium bg-black  hover:bg-red-300 mt-4"
    disabled={imageUploading}
  >
    {imageUploading ? "Uploading..." : "Upload Image"}
  </button>
</div>
}
                            <div class="sm:col-span-2 sm:col-start-1">
                                <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Team Name</label>
                                <div class="mt-2">
                                    <input onChange={(e) => { setName(e.target.value) }} value={team.name} type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                <div class="mt-2">
                                    <select onChange={(e) => { setCategory(e.target.value) }} value={team.category} id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option>Cricket</option>
                                        <option>Football (Soccer)</option>
                                        <option>Basketball</option>
                                        <option>Tennis</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                                <div class="mt-2">
                                    <select onChange={(e) => { setLocation(e.target.value) }} value={team.location} id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option>Uttar Pradesh</option>
                                        <option>Delhi</option>
                                        <option>Maharashtra</option>
                                        <option>Uttarakhand</option>
                                        <option>Haryana</option>
                                        <option>Gujarat</option>
                                        <option>Goa</option>
                                        <option>other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mt-6 flex items-center  gap-x-6">
                                {!isLoading && <button onClick={(e) => { clearteam(e) }} type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>}
                                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 md:px-8 whitespace-nowrap text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoading ? "Loading...." : "Upload Team"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </>

    )
}

export default Adminpannel