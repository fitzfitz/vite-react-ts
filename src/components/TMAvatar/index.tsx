import React, { SyntheticEvent, useState } from "react";
import { fcx } from "@fitzzz/utils";

interface Props {
  isOnline?: boolean;
  image?: string | null | undefined;
  fullname: string | null | undefined;
  size?: "xs" | "sm" | "md";
  className?: string;
}

function createNameInitial(name: string | null | undefined) {
  const generatedInitials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");
  const initials = generatedInitials?.match(/^.|.$/g);

  return name ? initials : "";
}

function TMAvatar({
  isOnline,
  image,
  fullname,
  size = "sm",
  className,
}: Props) {
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true);
    e.currentTarget.src = "https://avatars.dicebear.com/api/bottts/:seed.svg";
  };
  return (
    <div
      className={fcx(
        "relative flex",
        size === "xs"
          ? "h-6 w-6 text-xs"
          : size === "md"
          ? "h-24 w-24 text-2xl"
          : "h-12 w-12 text-xl",
        "items-center justify-center rounded-full bg-gray-500 text-white",
        className
      )}
    >
      {/* {!image || isError || isLoad ? ( */}
      <span className="absolute z-0 flex h-full w-full items-center justify-center">
        {createNameInitial(fullname)}
      </span>
      {/* ) : null} */}
      {image && !isError ? (
        <img
          src={image}
          className="z-0 rounded-full"
          alt="@tm-wear"
          loading="lazy"
          onError={onImageError}
          onLoadStart={() => setIsLoad(true)}
          onLoadedData={() => setIsLoad(false)}
        />
      ) : null}
      {isOnline ? (
        <div
          className={`absolute right-0 top-0 z-[2] ${fcx(
            size === "xs"
              ? "h-2 w-2 border"
              : size === "md"
              ? "h-8 w-8 border-2"
              : "h-3 w-3 border"
          )} rounded-full border-white bg-green-400`}
        ></div>
      ) : null}
    </div>
  );
}

export default TMAvatar;
