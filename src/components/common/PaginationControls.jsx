export const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  itemsLength,
}) => (
  <div className="mt-6 flex items-center justify-center gap-4">
    <button
      onClick={onPrevious}
      disabled={currentPage === 1}
      className="px-4 py-2 text-sm rounded border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg enabled:hover:border-secondary transition"
    >
      Previous
    </button>

    <span className="text-xs text-gray-500">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={onNext}
      disabled={currentPage === totalPages || itemsLength === 0}
      className="px-4 py-2 text-sm rounded border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg enabled:hover:border-secondary transition"
    >
      Next
    </button>
  </div>
);
