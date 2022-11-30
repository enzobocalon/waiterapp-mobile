import { useState } from 'react';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleCancelOrder = () => {
    setSelectedTable('');
  };

  return (
    <>
      <Container>
        <Header selectedTable = {selectedTable} onCancelOrder = {handleCancelOrder}/>

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>

      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(prev => !prev)}>
              Novo Pedido
            </Button>
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
