import { useNavigate } from "react-router-dom";
import {
  Body,
  DirectoryItemContainer,
  BackgoundImage,
} from "./directory-item.styles";
const DirectoyItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => {
    navigate(route);
  };
  return (
    <DirectoryItemContainer
      className="directory-item-container"
      onClick={onNavigateHandler}
    >
      <BackgoundImage className="background-image" imageUrl={imageUrl} />
      <Body className="directory-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoyItem;
