import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export const Pagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="text-primary border  font-bold px-4 py-2 rounded-l-xl shadow-2xl bg-white"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {page > 1 && (
        <button
          className="text-primary border  font-bold px-4 py-2 shadow-2xl bg-white"
          onClick={() => handlePageChange(page - 1)}
        >
          {page - 1}
        </button>
      )}
      <button className="bg-primary text-secondary border font-bold px-4 py-2">
        {page}
      </button>
      {page < totalPages && (
        <button
          className="text-primary border font-bold px-4 py-2 shadow-2xl bg-white "
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </button>
      )}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="text-primary border font-bold px-4 py-2 rounded-r-xl shadow-2xl bg-white"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
