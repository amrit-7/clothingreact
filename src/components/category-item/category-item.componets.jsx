import {
  CategoryContainer,
  BackgroundImage,
  CategoryBodyContainer,
} from "./category-item.style.jsx";

const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <CategoryContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <CategoryBodyContainer>
        <h2>{title}</h2>
        <p> Show Now </p>
      </CategoryBodyContainer>
    </CategoryContainer>
  );
};
export default CategoryItem;
