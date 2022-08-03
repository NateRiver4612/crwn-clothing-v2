import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import {
  CategoryPreviewContainter,
  Title,
  Preview,
} from "./category-preview.styles";
import { ProductItemType } from "../../store/products/products.types";

type CategoryPreviewProps_Type = {
  title: string;
  products: ProductItemType[];
};

const CategoryPreview = ({ title, products }: CategoryPreviewProps_Type) => {
  return (
    <CategoryPreviewContainter>
      <Title>
        <Link to={title}>{title.toUpperCase()}</Link>
      </Title>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainter>
  );
};
export default CategoryPreview;
