import { PaginationControls } from "@/components/common/PaginationControls";
import PaymentCard from "./PaymentCard";

export const TabContent = ({
  title,
  isLoading,
  isError,
  errorMessage,
  items,
  totalRecords,
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => (
  <>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold text-text">{title}</h2>
      <p className="text-xs text-gray-500">Total: {totalRecords} payments</p>
    </div>

    {isLoading ? (
      <div className="text-center py-8 text-gray-500">Loading...</div>
    ) : isError ? (
      <div className="text-center py-8 text-red-500">{errorMessage}</div>
    ) : items.length === 0 ? (
      <div className="text-center py-8 text-gray-500">No payments found</div>
    ) : (
      <>
        <div className="space-y-4">
          {items?.map((item) => (
            <PaymentCard key={item.id} item={item} />
          ))}
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={onPrevious}
          onNext={onNext}
          itemsLength={items.length}
        />
      </>
    )}
  </>
);
