/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {SearchBar} from '@src/components/elements';
import {Alert, TextBase} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as React from 'react';
import {ScrollView, SafeAreaView, InteractionManager} from 'react-native';
import {useFocusEffect, useScrollToTop} from '@react-navigation/native';
import AppReviewModal from '@src/components/common/AppReviewModal';
import {LoadingIndicator} from '@src/components/elements';
import PopularPlaces from './PopularPlaces';
import RecommendedPlaces from './RecommendedPlaces';
import MerchantCampaigns from './MerchantCampaigns';
import PopularCategories from './PopularCategories';
import HotDeals from './HotDeals';
import RemarkablePlaces from './RemarkablePlaces';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [isNavigationTransitionFinished, setIsNavigationTransitionFinished] =
    React.useState(false);
  const scrollViewRef = React.useRef(null);

  useScrollToTop(scrollViewRef);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setIsNavigationTransitionFinished(true);
      });
      return () => task.cancel();
    }, []),
  );

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef} stickyHeaderIndices={[0]}>
        {/* <ScrollView ref={scrollViewRef} style={{flex: 1}}> */}
        <SearchBar placeholder="Find places, dishes, restaurants..." />
        {isNavigationTransitionFinished ? (
          <>
            <PopularCategories />
            <PopularPlaces />
            <MerchantCampaigns />
            <RecommendedPlaces />
            <HotDeals />
            <RemarkablePlaces />
          </>
        ) : (
          <LoadingIndicator size="large" hasMargin />
        )}
      </ScrollView>
      <AppReviewModal daysBeforeReminding={1} />
    </SafeAreaView>
  );
};

export default Home;
