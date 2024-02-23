import { fetchApiUser } from "./JS/fetchApiUser";
import { useState, useRef } from "react";
import { BsArrowRepeat } from "react-icons/bs";

const UPLOAD_API_URL =
  "https://7u25b1bw4e.execute-api.us-east-1.amazonaws.com/dev/upload";

const DELETE_API_URL =
  "https://nqmcdup752.execute-api.us-east-1.amazonaws.com/deleteWall";

function AppIndex() {
  const { dataUser, handleClick, count } = fetchApiUser();
  const [namefile, setNamefile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const upload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.size <= 5000000) {
      setNamefile(selectedFile);
      console.log(selectedFile);
    } else {
      setShowPopup(true);
      setPopupMessage("Is Heavy");
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${UPLOAD_API_URL}?filename=${namefile.name}`
      );
      const data = await response.json();

      await fetch(data.url, {
        method: "PUT",
        body: namefile,
        headers: {
          "Content-Type": namefile.type,
          "Access-Control-Allow-Origin": "*",
        },
      });

      setShowPopup(true);
      setPopupMessage("File uploaded successfully!");
      setNamefile(null);
      setLoading(false);
      setTimeout(() => {
        handleClick();
      }, 3000);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setShowPopup(true);
      setPopupMessage("An error occurred while uploading the file.");
      setLoading(false);
    }
  };

  const deleteWall = async (filename) => {
    try {
      const fetchApi = `${DELETE_API_URL}?filename=${filename}`;
      await fetch(fetchApi, {
        method: "DELETE",
      });

      setTimeout(() => {
        handleClick();
      }, 3000);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      <div className="relative flex items-center justify-center w-full mx-auto lg:w-[800px] px-4 my-40 text-center bg-[url('/assets/backgrounds/blob-scene-haikei-hero.svg')] dark:bg-[url('/assets/backgrounds/blob-scene-haikei-hero-dark.svg')] bg-cover bg-center bg-no-repeat  sm:rounded-2xl py-32">
        <div className=" flex sm:flex-row w-full flex-col gap-2 border-4 dark:border-[#665fcc] rounded-lg p-4 items-center justify-center bg-[#001220] dark:bg-gray-700">
          <input
            className="rounded-lg bg-slate-100 h-full w-full border-2 dark:border-[#665fcc] mx-4"
            type="file"
            ref={fileInputRef}
            id="uploadInput"
            onChange={upload}
          />
          <button
            className="bg-slate-700 dark:bg-[#665fcc] rounded-lg py-2 px-4 mx-3 hover:bg-blue-600 text-white hover:ring-2"
            onClick={handleUpload}
          >
            UploadS3
          </button>
        </div>
        <div className="absolute flex items-center justify-center">
          {showPopup && (
            <div className="popup flex flex-col items-center justify-center py-8 border-4 text-center text-slate-900 rounded-2xl w-96 h-auto bg-slate-400">
              <p className="text-2xl pb-8 text-slate-900 font-semibold">
                {popupMessage}
              </p>
              <button
                className="bg-slate-900 text-white rounded-lg py-2 px-2.5 mx-4 hover:bg-blue-600 hover:text-slate-900 hover:ring-2"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div className="absolute bottom-5 flex items-center justify-center">
          {loading && (
            <div class="flex items-center justify-center px-2 py-2">
              <div class="px-3 py-2 text-xl font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                UpLoading...
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          className="w-auto px-2 rounded-lg mt-20 bg-blue-700 hover:bg-blue-800 text-white flex justify-center items-center"
          onClick={handleClick}
        >
          Refresh <BsArrowRepeat className="pl-2 w-full" size={15} />
        </button>
        <div className="grid grid-cols-1 mb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20 justify-center item center text-lg w-auto">
          {dataUser?.urls?.map((urlData, index) => (
            <div key={index} className="grid justify-center p-4 items-center">
              <a href={dataUser.urlsOri[index].signedUrlOri} target="_blank">
                <img
                  className="w-full max-w-96 rounded-lg h-auto max-h-96 ring-4 ring-gray-300 dark:ring-gray-500 hover:ring-blue-500 dark:hover:ring-blue-500"
                  src={urlData.signedUrl}
                  alt={dataUser.objectKeys[index]}
                />
              </a>
              <div className="flex justify-center items-center pt-4">
                <button
                  id={[index]}
                  className="w-24 rounded-lg bg-red-600 hover:bg-red-700 text-white flex justify-center items-center"
                  onClick={() => deleteWall(dataUser.objectKeys[index])}
                  value={dataUser.objectKeys[index]}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppIndex;
