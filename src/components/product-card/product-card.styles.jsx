import styled from "styled-components";
import {
  BaseButton,
  InvertedButton,
  GoogleSignButton,
} from "../button/button.styles";

export const ProductCardImage = styled.img`
  width: 100%;
  height: 95%;
  object-fit: cover;
  margin-bottom: 5px;
`;

export const ProductName = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const ProductPrice = styled.span`
  width: 10%;
`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 550px;
  align-items: center;
  position: relative;
  ${BaseButton},
  ${GoogleSignButton},
  ${InvertedButton} {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    left: 10%;
    display: none;
  }
  &:hover {
    ${ProductCardImage} {
      opacity: 0.8;
    }

    ${BaseButton},
    ${GoogleSignButton},
    ${InvertedButton} {
      opacity: 0.85;
      display: flex;
    }
  }
`;
