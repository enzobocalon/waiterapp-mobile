import styled from 'styled-components/native';

export const Product = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 120px;
  height: 96px;
  border-radius: 8px;
`;

export const ProductDetails = styled.View`
  margin-left: 16px;
  flex: 1;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(204, 204, 204, .3);
  margin: 24px 0;
`;
