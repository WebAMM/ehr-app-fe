import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

const StickyHeader = ({
  linkTo,
  linkText,
  showFavorite = false,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <div className="sticky top-0 z-20 bg-card border-b border-border bg-pageBackground shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between ">
        <Link to={linkTo} className="flex items-center gap-2 text-foreground">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{linkText}</span>
        </Link>

        {showFavorite && (
          <button
            onClick={onFavoriteToggle}
            className="text-muted-foreground hover:text-red-500"
          >
            <Heart
              className="w-6 h-6"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default StickyHeader;
