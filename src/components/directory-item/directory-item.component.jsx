import { Link } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoyItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <Link className="directory-body-container" to={`/shop/${title}`}>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default DirectoyItem;
