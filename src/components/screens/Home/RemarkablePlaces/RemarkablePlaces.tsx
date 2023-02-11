/* eslint-disable no-const-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
// import {NewestTab, TrendingTab} from './Tabs';
// import {FeaturedTab} from './Tabs';
// import {useState} from 'react';

import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {Container} from '@src/components/elements';
import {TabView} from '@src/components/elements';
import {getAllOpenedOrganizations} from '../../../../redux/actions';
import {getAllClosedOrganizations} from '../../../../redux/actions';
import {TabGenerator} from './Tabs';
import styles from './styles';

type RemarkablePlacesProps = {};

const RemarkablePlaces: React.FC<RemarkablePlacesProps> = () => {
  const [x, setX] = React.useState(0);
  let minHeight = 500;
  const dispatch = useDispatch() as any;
  const {all_opened_organizations} = useSelector(
    (state: any) => state.userReducer,
  );
  const {all_closed_organizations} = useSelector(
    (state: any) => state.userReducer,
  );
  if (all_opened_organizations > all_closed_organizations) {
    minHeight = all_opened_organizations.length * 110;
    if (all_opened_organizations.length > 4) {
      minHeight = all_opened_organizations.length * 100;
    }
  }
  if (all_closed_organizations > all_opened_organizations) {
    minHeight = all_closed_organizations.length * 98;
  }

  useEffect(() => {
    const s = async () => {
      await dispatch(getAllOpenedOrganizations());
      await dispatch(getAllClosedOrganizations());
    };
    s();
  }, [dispatch]);

  function generateTabData() {
    let tabData: any = [];
    let tempData: any = {};
    let TabGeneratorWithProps = () => (
      <TabGenerator organizations={all_opened_organizations} />
    );
    tempData = {
      key: 0,
      title: 'Abertos',
      content: TabGeneratorWithProps,
    };
    tabData.push(tempData);
    TabGeneratorWithProps = () => (
      <TabGenerator organizations={all_closed_organizations} />
    );
    tempData = {
      key: 1,
      title: 'Fechados',
      content: TabGeneratorWithProps,
    };
    tabData.push(tempData);
    return tabData;
  }

  function updateTabSize(this: any, i) {
    setX(i);
  }

  return (
    <Container style={[styles.container, {minHeight: minHeight}]}>
      <TabView
        tabData={generateTabData()}
        tabBarStyle={styles.tabBarStyle}
        isTabBarFullWidth
        resizeTab={updateTabSize}
      />
    </Container>
  );
};

export default RemarkablePlaces;
