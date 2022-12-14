import { useEffect, useState } from 'react';

import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer, CenteredContainer } from './styles';
import { Category } from '../types/Category';
import { api } from '../utils/api';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleResetOrder = () => {
    setSelectedTable('');
    setCartItems([]);
  };

  const handleAddToCart = (product: Product) => {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prev) => {
      const itemIndex = prev.findIndex(cartItem => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prev.concat({
          quantity: 1,
          product
        });
      }

      const newCartItems = [...prev];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;
    });
  };

  const handleDecrementCartItem = (product: Product) => {

    setCartItems((prev) => {
      const itemIndex = prev.findIndex(cartItem => cartItem.product._id === product._id);

      const item = prev[itemIndex];

      const newCartItems = [...prev];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });
  };

  const handleSelectCategory = async (categoryId: string) => {
    const route = !categoryId
      ? '/products'
      :`/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  };

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });
  }, []);


  return (
    <>
      <Container>
        <Header selectedTable = {selectedTable} onCancelOrder = {handleResetOrder}/>

        {
          isLoading && (
            <CenteredContainer>
              <ActivityIndicator color='#D73035' size='large'/>
            </CenteredContainer>
          )
        }

        {
          !isLoading && (
            <>
              <CategoriesContainer>
                <Categories
                  categories={categories}
                  onSelectCategory={handleSelectCategory}/>
              </CategoriesContainer>

              {isLoadingProducts ? (
                <CenteredContainer>
                  <ActivityIndicator color='#D73035' size='large'/>
                </CenteredContainer>
              ) : (
                <>
                  {products.length > 0 ? (
                    <MenuContainer>
                      <Menu
                        onAddToCart={handleAddToCart}
                        products={products}
                      />
                    </MenuContainer>
                  ) : (
                    <CenteredContainer>
                      <Empty />
                      <Text color='#666' style={{marginTop: 24}}>Nenhum produto foi encontrado!</Text>
                    </CenteredContainer>
                  )}
                </>
              )}
            </>
          )
        }

      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              disabled={isLoading}
              onPress={() => setIsTableModalVisible(prev => !prev)}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}/>
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(prev => !prev)}
        onSave={handleSaveTable}
      />
    </>
  );
}
