import PropTypes from "prop-types";
export default function LoadMoreBtn({ onLoadMoreBtn }) {
    return (
        <div className="load_more">
            <button type="submit" className="Button " onClick={onLoadMoreBtn}>
                Load More
            </button>
        </div>
    );
}

LoadMoreBtn.propTypes = {
    onLoadMoreBtn: PropTypes.func,
};