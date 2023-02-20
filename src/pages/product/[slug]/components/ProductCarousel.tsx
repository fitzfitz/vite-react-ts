import React, { useState } from "react";
// import { Carousel } from "flowbite-react";
import { ProductType } from "@tm-wear/app/api/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperProps } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { InnerImageZoom } from "react-inner-image-zoom";

interface Props {
  product: ProductType;
}

const ProductCarousel: React.FC<Props> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperProps | null>(null);

  return (
    <div className="flex-2 h-full">
      <div className="aspect-w-1 aspect-h-1 mb-2">
        <div className="h-full">
          {/* <Carousel slide={false}>
            {product?.product_images.map((image) => (
              <img
                loading="lazy"
                key={image?.id}
                src={image?.image}
                alt={product?.name}
              />
            ))}
          </Carousel> */}

          <Swiper
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-full"
            loop
            slideNextClass="text-orange-400"
            slidePrevClass="text-orange-400"
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
          >
            {product?.product_images.map((image) => (
              <SwiperSlide className="relative" key={image.id}>
                <InnerImageZoom
                  src={image?.image}
                  zoomSrc={image?.image}
                  zoomType="click"
                  zoomPreload={true}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {product?.product_images?.length > 0 ? (
        <Swiper
          navigation={true}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {product?.product_images.map((image) => (
            <SwiperSlide className="relative border opacity-30" key={image.id}>
              <img
                loading="lazy"
                key={image?.id}
                src={image?.image}
                alt={product?.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};
export default ProductCarousel;
