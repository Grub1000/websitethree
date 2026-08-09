import "../css/home_page_css/InfiniteCarousel.css"

export default function InfiniteCarouselItem({
  src
}: {
  src: string;
}) {
  return (
    <li className="InfiniteCarouselItem">
      <img className="InfiniteCarouselImage" src={src} alt="Carousel" />
    </li>
  );
}
