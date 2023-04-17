export default function Loading() {
  return (
    <div className="relative  h-full w-full">
      <div className="absolute top-[50%] left-[25%] lds-ellipsis ">
        <div className="w-10 h-10"></div>
        <div className="w-10 h-10"></div>
        <div className="w-10 h-10"></div>
        <div className="w-10 h-10"></div>
      </div>
    </div>
  );
}
