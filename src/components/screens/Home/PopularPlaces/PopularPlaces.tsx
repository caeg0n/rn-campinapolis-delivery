/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import {mockPlaces, Place} from '@src/data/mock-places';
// import {Place} from '@src/data/mock-places';

import {getMostPopular} from '../../../../redux/actions';
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Section, Card} from '@src/components/elements';
import {Dimensions} from 'react-native';
import PlaceCardInfo from '@src/components/common/PlaceCardInfo';
import {useDispatch, useSelector} from 'react-redux';

type Place = {
  id: string;
  title: string;
  coverImage?: string;
  image: string;
  subTitle: string;
  distance: number;
  time: number;
  rating: number;
  dishSection?: string;
};

type PopularPlacesProps = {};

const PopularPlaces: React.FC<PopularPlacesProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch() as any;
  const {most_popular} = useSelector((state: any) => state.userReducer);

  React.useEffect(() => {
    dispatch(getMostPopular());
  }, [dispatch]);

  const _onButtonActionPressed = () => {
    navigation.navigate(
      'PlaceListScreen' as never,
      {title: 'Popular Near You'} as never,
    );
  };

  const _onPlaceItemPressed = () => {
    navigation.navigate('PlaceDetailsScreen' as any);
  };

  return (
    <Section
      title="Mais Populares"
      actionButtonText="Mostrar mais"
      onButtonActionPressed={_onButtonActionPressed}>
      <Carousel
        data={most_popular}
        hasParallaxImages
        itemWidth={Dimensions.get('window').width - 50}
        renderContent={(item: Place, index, parallaxProps) => {
          const {image, title, subTitle} = item;
          return (
            <Card
              coverImage={{uri: image as string}}
              title={title}
              subTitle={subTitle}
              parallaxProps={parallaxProps}
              onPress={_onPlaceItemPressed}>
              <PlaceCardInfo data={item} />
            </Card>
          );
        }}
      />
    </Section>
  );
};

export default PopularPlaces;
