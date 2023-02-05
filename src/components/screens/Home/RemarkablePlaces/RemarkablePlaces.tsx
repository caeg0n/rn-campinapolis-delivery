/* eslint-disable @typescript-eslint/no-unused-vars */
import {NewestTab, TrendingTab, TabGenerator} from './Tabs';
import {FeaturedTab} from './Tabs';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {useSelector} from 'react-redux';
import * as React from 'react';
import {Container} from '@src/components/elements';
import {TabView} from '@src/components/elements';
import styles from './styles';
import {TabViewData} from '@src/components/elements/TabView/TabView';
import {getAllOrganizations} from '../../../../redux/actions';

type RemarkablePlacesProps = {};

const RemarkablePlaces: React.FC<RemarkablePlacesProps> = () => {
  const {all_organizations} = useSelector((state: any) => state.userReducer);
  const dispatch = useDispatch() as any;

  function generateTabData() {
    let TabGeneratorWithProps = () => <TabGenerator org={all_organizations} />;
    const tabData: TabViewData = [
      {key: '0', title: 'Featured', content: TabGeneratorWithProps},
    ];
    return tabData;
  }

  // useEffect(() => {
  //   // limpa asyncstorage
  //   // const clearData = async () => {
  //   //   await AsyncStorage.clear();
  //   // };
  //   // clearData().catch(console.error);
  // }, []);

  useEffect(() => {
    dispatch(getAllOrganizations());
  }, [dispatch]);

  return (
    <Container style={styles.container}>
      <TabView
        tabData={generateTabData()}
        tabBarStyle={styles.tabBarStyle}
        isTabBarFullWidth
      />
    </Container>
  );
};

export default RemarkablePlaces;
