import React from "react";
import { usePagination, PAGINATION_DOTS } from "./usePagination";
import styles from "./Pagination.module.scss";
import { fcx } from "@fitzzz/utils";

type Classes = {
  root: string;
  arrowContainer: string;
  paginationItem: string;
};

interface Props {
  onPageChange?: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  classes?: Classes;
  leftArrowComponent?: React.ReactNode;
  rightArrowComponent?: React.ReactNode;
}
const TMPagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    classes,
    leftArrowComponent,
    rightArrowComponent,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange?.(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange?.(currentPage - 1);
  };

  const lastPage = paginationRange?.[paginationRange.length - 1];

  return (
    <ul
      className={fcx(styles["pagination-container"], className, classes?.root)}
    >
      <li
        aria-hidden
        className={fcx(
          styles["pagination-item"],
          styles["arrow-container"],
          classes?.arrowContainer,
          currentPage !== 1 && styles["active"],
          currentPage === 1 && styles["disabled"]
        )}
        onClick={onPrevious}
      >
        <div className={`${styles["arrow"]} ${styles["left"]} arrow-left`}>
          {leftArrowComponent}
        </div>
      </li>
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === PAGINATION_DOTS) {
          return (
            <li
              key={pageNumber}
              className={`${styles["pagination-item"]} ${styles["dots"]}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            aria-hidden
            className={fcx(
              styles["pagination-item"],
              classes?.paginationItem,
              pageNumber === currentPage && styles["selected"]
            )}
            onClick={() =>
              currentPage !== +pageNumber
                ? onPageChange?.(+pageNumber)
                : undefined
            }
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        aria-hidden
        className={fcx(
          styles["pagination-item"],
          styles["arrow-container"],
          classes?.arrowContainer,
          currentPage === lastPage && styles["disabled"],
          currentPage !== lastPage && styles["active"]
        )}
        onClick={onNext}
      >
        <div className={`${styles["arrow"]} ${styles["right"]} arrow-right`}>
          {rightArrowComponent}
        </div>
      </li>
    </ul>
  );
};

/*
Using it on the client as a compoennt

<TMPagination
  onPageChange={(page) => console.log(page)}
  currentPage={3}
  pageSize={10}
  totalCount={135}
  leftArrowComponent={<BsChevronLeft />}
  rightArrowComponent={<BsChevronRight />}
/>

*/

export default TMPagination;
