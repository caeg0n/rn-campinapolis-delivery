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
  const {all_opened_organizations} = useSelector(
    (state: any) => state.userReducer,
  );
  const {all_closed_organizations} = useSelector(
    (state: any) => state.userReducer,
  );
  const dispatch = useDispatch() as any;
  const closedListHeight = all_closed_organizations.length * 96;
  const openedListHeight = all_opened_organizations.length * 96;

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
    console.log('4', closedListHeight, openedListHeight);
    return tabData;
  }

  useEffect(() => {
    dispatch(getAllOpenedOrganizations());
    dispatch(getAllClosedOrganizations());
  }, [dispatch]);

  return (
    <Container style={styles.container}>
      {console.log('***', closedListHeight, openedListHeight)}
      <Container
        style={{
          minHeight: closedListHeight,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}>
        <TabView
          tabData={generateTabData()}
          tabBarStyle={styles.tabBarStyle}
          isTabBarFullWidth
        />
      </Container>
    </Container>
  );
};

export default RemarkablePlaces;
