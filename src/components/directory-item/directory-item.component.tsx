import "./directory-item.styles.tsx";
import { useNavigate } from "react-router-dom";

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

import { Directory_Type } from "../directory/directory.component";

type DirectoryItemProps_Type = {
  category: Directory_Type;
};

const DirectoryItem = ({ category }: DirectoryItemProps_Type) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigationHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigationHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
