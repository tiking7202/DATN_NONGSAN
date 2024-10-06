const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-100 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary border-solid m-4 p-4"> </div>
    </div>
  );
};

export default Loading;