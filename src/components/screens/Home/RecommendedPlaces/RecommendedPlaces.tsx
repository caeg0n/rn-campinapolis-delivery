/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import {mockPlaces, Place} from '@src/data/mock-places';
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Section, Card} from '@src/components/elements';
import {Dimensions} from 'react-native';
import PlaceCardInfo from '@src/components/common/PlaceCardInfo';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecommendedPlaces} from '../../../../redux/actions';

type RecommendedPlacesProps = {};

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

const RecommendedPlaces: React.FC<RecommendedPlacesProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch() as any;
  const {recommended_places} = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    dispatch(getRecommendedPlaces());
  }, []);

  const _onButtonActionPressed = () => {
    navigation.navigate(
      'PlaceListScreen' as never,
      {title: 'Recommended'} as never,
    );
  };

  const _onPlaceItemPressed = () => {
    navigation.navigate('PlaceDetailsScreen' as never);
  };

  return (
    <Section
      title="Recommended"
      actionButtonText="View more"
      onButtonActionPressed={_onButtonActionPressed}>
      <Carousel
        data={recommended_places}
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

export default RecommendedPlaces;
