import {mockPlaces, Place} from '@src/data/mock-places';
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Section, Card} from '@src/components/elements';
import {Dimensions} from 'react-native';
import PlaceCardInfo from '@src/components/common/PlaceCardInfo';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecommendedPlaces} from '../../../../redux/actions';


type HotDealsProps = {};

const HotDeals: React.FC<HotDealsProps> = () => {
  const navigation = useNavigation();

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
        data={mockPlaces}
        itemWidth={Dimensions.get('window').width / 2 - 15}
        renderContent={(item: Place, index, parallaxProps) => {
          const {image, title, subTitle} = item;
          return (
            <Card
              coverImage={image}
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
