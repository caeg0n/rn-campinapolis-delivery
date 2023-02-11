// import {Place, mockRemarkablePlace} from '@src/data/mock-places';
import * as React from 'react';
import {Container} from '@src/components/elements';
import PlaceListItem from '@src/components/common/PlaceListItem';
import styles from './styles';

type TabGeneratorProps = {
  organizations: Array<Object>;
};

const TabGenerator: React.FC<TabGeneratorProps> = ({organizations}) => {
  return (
    // <Container style={styles.tabContent}>
    //   {mockRemarkablePlace.featured.map((item: Place) => {
    //     return <PlaceListItem key={item.id} data={item} />;
    //   })}
    // </Container>
    <Container style={styles.tabContent}>
      {organizations.map((item: any) => {
        return <PlaceListItem key={item.id} data={item} />;
      })}
    </Container>
  );
};

export default TabGenerator;
