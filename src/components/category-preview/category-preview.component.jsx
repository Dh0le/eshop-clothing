import ProductCard from "../product-card/product-card.component";
//import "./category-preview.styles.scss";
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  CategoryPreviewContent,
} from "./category-preview.styles";
const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryPreviewTitle to={`${title}`}>
          {title.toUpperCase()}
        </CategoryPreviewTitle>
      </h2>
      <CategoryPreviewContent>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryPreviewContent>
    </CategoryPreviewContainer>
  );
};
export default CategoryPreview;
