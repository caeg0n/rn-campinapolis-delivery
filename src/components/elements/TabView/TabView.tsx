/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Dimensions, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from '../Icon';
import {TabView as RNTabView, TabBar, SceneMap} from 'react-native-tab-view';
import styles from './styles';

type Cenes = {
  [key: string]: React.ComponentType<any>;
};

type TabViewItem = {
  key: string;
  title: string;
  icon?: string;
  content: React.ComponentType<any>;
};

export type TabViewData = TabViewItem[];

type TabViewProps = {
  tabData: any;
  onTabIndexChange?: (index: number) => {};
  isTabBarFullWidth?: boolean;
  tabBarStyle?: StyleProp<ViewStyle>;
  resizeTab: any;
};

const TabView: React.FC<TabViewProps> = ({
  tabData,
  onTabIndexChange,
  isTabBarFullWidth,
  tabBarStyle,
  resizeTab,
}) => {
  const {
    colors: {card, primary, text},
  } = useTheme();
  const [navigationStateIndex, setNavigationStateIndex] = React.useState(0);

  const _renderIcon = (props: any) => {
    const {route} = props;
    if (route.icon) {
      return <Icon name={route.icon} size={20} color="white" />;
    }
    return null;
  };

  const onIndexChange = (index: number) => {
    setNavigationStateIndex(index);
    if (onTabIndexChange) {
      onTabIndexChange(index);
    }
  };

  const tabViewRoutes = tabData.map((item) => {
    return {
      key: item.key,
      title: item.title,
      icon: item.icon,
    };
  });
  const navigationState = {
    index: navigationStateIndex,
    routes: tabViewRoutes,
  };
  const scenes: Cenes = {};
  tabData.forEach((item) => {
    scenes[item.key] = item.content;
  });

  return (
    <RNTabView
      navigationState={navigationState}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderIcon={_renderIcon}
          style={[{backgroundColor: card}, tabBarStyle]}
          labelStyle={styles.tabBarLabel}
          activeColor={primary}
          inactiveColor={text}
          onTabPress={resizeTab}
          tabStyle={
            isTabBarFullWidth
              ? {
                  width: Dimensions.get('window').width / tabData.length,
                }
              : styles.tabBar
          }
          indicatorStyle={{
            backgroundColor: primary,
          }}
          scrollEnabled={true}
        />
      )}
      renderScene={SceneMap(scenes)}
      onIndexChange={onIndexChange}
      initialLayout={{
        width: Dimensions.get('window').width,
        height: 0,
      }}
    />
  );
};

export default TabView;
