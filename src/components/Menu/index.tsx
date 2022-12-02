import { useState } from 'react';
import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';

import { ProductContainer, Image, ProductDetails, Separator, AddToCartButton } from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
}

export function Menu({onAddToCart}: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setIsModalVisible(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={product => product._id}
        style={{ marginTop: 32 }}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <Image source={{
              uri: `http://192.168.1.109:3001/uploads/${product.imagePath}`,
            }} />
            <ProductDetails>
              <Text weight='600'>{product.name}</Text>
              <Text size={14} color='#666' style={{ paddingVertical: 8 }}>{product.description}</Text>
              <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )} />

      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}/>
    </>
  );
}
