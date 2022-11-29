import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { Text } from '../Text';

import { Product, Image, ProductDetails, Separator } from './styles';

export function Menu() {
  return (
    <FlatList
      data={products}
      keyExtractor={product => product._id}
      style={{marginTop: 32}}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={{paddingHorizontal: 24}}
      renderItem={({item: product}) => (
        <Product>
          <Image source={{
            uri: `http://192.168.1.109:3001/uploads/${product.imagePath}`,
          }}/>
          <ProductDetails>
            <Text weight='600'>{product.name}</Text>
            <Text size={14} color='#666' style={{paddingVertical: 8}}>{product.description}</Text>
            <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
          </ProductDetails>
        </Product>
      )}
    />
  );
}
