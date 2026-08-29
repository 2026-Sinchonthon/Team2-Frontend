import HeartIcon from "./HeartIcon";

interface LikeButtonProps {
  liked: boolean;
  onToggle: () => void;
}

function LikeButton({ liked, onToggle }: LikeButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      aria-pressed={liked}
      className={`drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] ${
        liked ? "text-[#f74651]" : "text-white"
      }`}
    >
      <HeartIcon filled={liked} />
    </button>
  );
}

export default LikeButton;
