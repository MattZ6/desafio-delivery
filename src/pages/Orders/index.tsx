import React, { useEffect, useState } from 'react';
import { Image, Alert } from 'react-native';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  formattedValue: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Product[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      try {
        const { data } = await api.get<Product[]>('orders');

        setOrders(
          data.map(x => ({ ...x, formattedValue: formatValue(x.price) })),
        );
      } catch (error) {
        Alert.alert(
          'Algo deu errado',
          'Não foi possível buscar seus pedidos. Por favor, tente novamente',
        );
      }
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedValue}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
