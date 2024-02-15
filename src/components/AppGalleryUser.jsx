import { fetchApiUser } from "./JS/fetchApiUser";

function AppGalleryUser() {
  const { dataUser } = fetchApiUser();


  const deleteWall = async (namefile) => {
    try {
      const apiUrl = `https://nqmcdup752.execute-api.us-east-1.amazonaws.com/deleteWall?filename=${namefile}`;

      console.log(namefile);

      await fetch(apiUrl, {
        method: "DELETE",
      });


    } catch (error) {
      console.error("Error Deleting file:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20 justify-center item center text-lg w-auto">
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
  );
}

export default AppGalleryUser;
