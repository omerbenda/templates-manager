const MainPage = () => {
  const dirGap = 100;

  return (
    <div className="w-full">
      <div
        className="flex flex-col items-end"
        style={{ width: `calc(100% - ${dirGap}px)` }}
      >
        <div className="w-full text-2xl">Dir</div>
        <div
          className="flex flex-col items-end"
          style={{ width: `calc(100% - ${dirGap}px)` }}
        >
          <div className="w-full text-2xl">Dir</div>
          <div
            className="flex flex-col items-end"
            style={{ width: `calc(100% - ${dirGap}px)` }}
          >
            <div className="w-full text-2xl">File1</div>
            <div className="w-full text-2xl">File2</div>
          </div>
          <div className="w-full text-2xl">File1</div>
          <div className="w-full text-2xl">File2</div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
