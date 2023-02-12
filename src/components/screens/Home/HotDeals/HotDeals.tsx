/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import {mockPlaces, Place} from '@src/data/mock-places';

import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Section, Card} from '@src/components/elements';
import {Dimensions} from 'react-native';
import PlaceCardInfo from '@src/components/common/PlaceCardInfo';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getHotDeals} from '../../../../redux/actions';

type HotDealsProps = {};

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

const HotDeals: React.FC<HotDealsProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch() as any;
  const {hot_deals} = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    dispatch(getHotDeals());
  }, []);

  const _onButtonActionPressed = () => {
    navigation.navigate(
      'PlaceListScreen' as never,
      {title: 'Hot Deals'} as never,
    );
  };

  const _onPlaceItemPressed = () => {
    navigation.navigate('PlaceDetailsScreen' as never);
  };

  return (
    <Section
      title="Hot Deals Around You"
      actionButtonText="View more"
      onButtonActionPressed={_onButtonActionPressed}>
      <Carousel
        data={hot_deals}
        itemWidth={Dimensions.get('window').width / 2 - 15}
        renderContent={(item: Place, index, parallaxProps) => {
          const {image, title, subTitle} = item;
          return (
            <Card
              coverImage={{uri: image as string}}
              isSmallCover
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

export default HotDeals;
