import LikeButton from "./LikeButton";
import momijiDish from "../assets/images/momiji-dish.jpg";

export const MOMIJI_ID = 1;

const MOMIJI_GALLERY = [
  {
    src: momijiDish,
    style: { height: "293.88%", width: "269.45%", left: "-21.33%", top: "0%" },
  },
  {
    src: momijiDish,
    style: {
      height: "333.52%",
      width: "306.71%",
      left: "-206.48%",
      top: "-121.01%",
    },
  },
  {
    src: momijiDish,
    style: { height: "288%", width: "263.83%", left: "-151.66%", top: "0%" },
  },
];

interface RestaurantDetailContentProps {
  name: string;
  tag: string;
  description: string;
  address: string;
  showGallery?: boolean;
  liked?: boolean;
  onToggleLike?: () => void;
}

function RestaurantDetailContent({
  name,
  tag,
  description,
  address,
  showGallery,
  liked,
  onToggleLike,
}: RestaurantDetailContentProps) {
  return (
    <>
      <div className="relative flex justify-center">
        <span className="inline-block rounded-full bg-[#f74651] px-2.5 py-1 text-xs font-semibold text-white">
          {tag}
        </span>
        {onToggleLike && (
          <div className="absolute right-0 top-0">
            <LikeButton liked={!!liked} onToggle={onToggleLike} />
          </div>
        )}
      </div>
      <p className="mt-1 text-center text-[18px] font-bold text-[#1f1c1a]">
        {name}
      </p>
      <p className="mt-1 text-center text-sm text-[#8f8e8d]">{description}</p>
      <p className="mt-1 text-center text-xs text-[#bcbbba]">📍 {address}</p>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
        {showGallery
          ? MOMIJI_GALLERY.map((photo, i) => (
              <div
                key={i}
                className="relative h-[104px] w-[142px] shrink-0 overflow-hidden rounded-[10px] bg-gray-200"
              >
                <img
                  src={photo.src}
                  alt=""
                  className="absolute max-w-none"
                  style={photo.style}
                />
              </div>
            ))
          : [0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[104px] w-[142px] shrink-0 rounded-[10px] bg-gray-200"
              />
            ))}
      </div>
    </>
  );
}

export default RestaurantDetailContent;
