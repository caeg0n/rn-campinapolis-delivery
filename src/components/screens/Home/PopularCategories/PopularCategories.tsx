/* eslint-disable prettier/prettier */
// import {mockCategories} from '@src/data/mock-categories';

import * as React from 'react';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {Text, Container, Touchable} from '@src/components/elements';
import {useSelector, useDispatch} from 'react-redux';
import { getAllCategories } from '../../../../redux/actions';

import styles from './styles';
import { useEffect } from 'react';

type PopularCategoriesProps = {};

const PopularCategories: React.FC<PopularCategoriesProps> = () => {
  const { all_categories } = useSelector((state:any) => state.userReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch() as any;
  const {
    colors: {border},
  } = useTheme();

  useEffect(() =>{
      dispatch(getAllCategories());
  },[dispatch]);

  const _onButtonCategoryItemPressed = (name: string) => {
    return () => {
      navigation.navigate('PlaceListScreen' as never, {title: name} as never);
    };
  };

  return (
    <Container style={styles.categoryContainer}>
      {all_categories.map((category) => {
        const {id, image_url, name} = category;
        return (
          <Touchable key={id} onPress={_onButtonCategoryItemPressed(name)}>
            <View style={[styles.categoryItem, {borderColor: border}]}>
              <Container>
                <Image style={styles.categoryImage}  source={{uri: image_url }} />
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
