import { useState, useRef } from "react";


function AppUpload() {
  const [namefile, setNamefile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const fileInputRef = useRef(null);

  const upload = (file) => {
    console.log(file.target.files[0]);
    const selectedFile = file.target.files[0];
    console.log(selectedFile.name);
    setNamefile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const response = await fetch(
        `https://idge3vng43.execute-api.us-east-1.amazonaws.com/dev/upload?filename=${namefile.name}`
      );
      const data = await response.json();

      console.log(data.url);

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

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setShowPopup(true);
      setPopupMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="relative flex items-center justify-center my-auto">
      <div className=" flex sm:flex-row flex-col gap-4 w-auto border-4 rounded-lg p-4 items-center justify-center">
        <input
          className="rounded-lg bg-slate-100 h-full w-full border-2 mx-4"
          type="file"
          ref={fileInputRef}
          id="uploadInput"
          onChange={upload}
        />
        <button
          className="bg-slate-700 rounded-lg py-2 px-3 mx-3 hover:bg-blue-600 hover:text-slate-900 hover:ring-2"
          onClick={handleUpload}
        >
          UPLOAD S3
        </button>
      </div>
      <div className="absolute flex items-center justify-center">
        {showPopup && (
          <div className="popup flex flex-col items-center justify-center border-4 text-center text-slate-900 rounded-2xl bg-opacity-25 w-96 h-auto bg-slate-400">
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
    </div>
  );
}

export default AppUpload;
