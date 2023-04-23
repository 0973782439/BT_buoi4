import React from "react";
interface Props {
  loadingRef: any;
}
const Loading: React.FC<Props> = ({ loadingRef }) => {
  return (
    <div className="text-red-700 text-2xl text-center" ref={loadingRef}>
      ... Loading ...
    </div>
  );
};

export default Loading;
