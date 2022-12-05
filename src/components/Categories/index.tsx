import { useState } from 'react';
import { FlatList } from 'react-native';

import { categories } from '../../mocks/categories';
import { Category  as ICategory } from '../../types/Category';
import { Text } from '../Text';
import { Category, Icon } from './styles';

interface Props {
  categories: ICategory[]
  onSelectCategory: (categoryId: string) => Promise<void>
}

export function Categories({categories, onSelectCategory}: Props) {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
    onSelectCategory(category);
  }

  return (
    <FlatList
      horizontal
      data={categories}
      contentContainerStyle = {{paddingRight: 24}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={category => category._id}
      renderItem={({item: category}) => {
        const isSelected = selectedCategory === category._id;
        return (
          <Category onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>

            <Text size={14} weight='600' opacity={isSelected ? 1 : 0.5}>{category.name}</Text>
          </Category>
        );
      }} />
  );
}
