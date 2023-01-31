/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import {Image, View} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Text, Container, Touchable} from '@src/components/elements';
import {mockCategories} from '@src/data/mock-categories';
import styles from './styles';

type PopularCategoriesProps = {
  categories: array;
};

const PopularCategories: React.FC<PopularCategoriesProps> = ({categories}) => {
  const navigation = useNavigation();
  const {
    colors: {border},
  } = useTheme();

  const _onButtonCategoryItemPressed = (name: string) => {
    return () => {
      navigation.navigate('PlaceListScreen' as never, {title: name} as never);
    };
  };

  return (
    <Container style={styles.categoryContainer}>
      {categories.map((category) => {
        const {id, image_url, name} = category;
        return (
          <Touchable key={id} onPress={_onButtonCategoryItemPressed(name)}>
            <View style={[styles.categoryItem, {borderColor: border}]}>
              <Container>
                <Image style={styles.categoryImage} source={{uri:image_url}} />
              </Container>
              <Container>
                <Text style={styles.categoryTitle}>{name}</Text>
              </Container>
            </View>
          </Touchable>
        );
      })}
    </Container>
  );
};

export default PopularCategories;
