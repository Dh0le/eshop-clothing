import {
  Body,
  DirectoryItemContainer,
  BackgoundImage,
} from "./directory-item.styles";
const DirectoyItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer className="directory-item-container">
      <BackgoundImage className="background-image" imageUrl={imageUrl} />
      <Body className="directory-body-container" to={`/shop/${title}`}>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoyItem;
