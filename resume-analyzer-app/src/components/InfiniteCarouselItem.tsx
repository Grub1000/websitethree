export default function InfiniteCarouselItem({
  src
}: {
  src: string;
}) {
  return (
    <li className="InfiniteCarouselItem">
      <img src={src} alt="Carousel" />
    </li>
  );
}
