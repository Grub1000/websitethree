import InfiniteCarouselItem from "./InfiniteCarouselItem"
import "../css/InfiniteCarousel.css"

export default function InfiniteCarouselTrack({
  images
}: {
  images: string[];
}) {
  return (
    <ul className="InfiniteCarouselTrack">
      {images.map((image, index) => (
        <InfiniteCarouselItem key={index} src={image} />
      ))}
    </ul>
  );
}
