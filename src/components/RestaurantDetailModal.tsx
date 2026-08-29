import RestaurantDetailContent from "./RestaurantDetailContent";

interface RestaurantDetailModalProps {
  name: string;
  tag: string;
  description: string;
  address: string;
  showGallery?: boolean;
  liked?: boolean;
  onToggleLike?: () => void;
  onClose: () => void;
}

function RestaurantDetailModal({
  onClose,
  ...content
}: RestaurantDetailModalProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="no-scrollbar max-h-[80%] w-full overflow-y-auto rounded-t-[20px] bg-white px-4 pb-8 pt-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <RestaurantDetailContent {...content} />
      </div>
    </div>
  );
}

export default RestaurantDetailModal;
