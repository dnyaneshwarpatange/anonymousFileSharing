import FileDownload from '../components/FileDownload';

const DownloadPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-8">
          Download File
        </h1>
        <FileDownload />
      </div>
    </div>
  );
};

export default DownloadPage;
