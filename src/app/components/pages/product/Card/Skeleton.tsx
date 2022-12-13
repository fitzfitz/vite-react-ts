import React from "react";

function SkeletonCard() {
  return (
    <>
      <div className="w-full">
        <div className="aspect-h-1 aspect-w-1 mb-4 w-full animate-pulse rounded bg-slate-300"></div>
        <div className="mb-4 h-8 w-full animate-pulse rounded bg-slate-100"></div>
        <div className="mb-4 h-8 w-full animate-pulse rounded bg-slate-100"></div>
      </div>
    </>
  );
}

export default SkeletonCard;
