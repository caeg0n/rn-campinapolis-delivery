import * as React from 'react';
import {Container} from '@src/components/elements';
import {Place, mockRemarkablePlace} from '@src/data/mock-places';
import PlaceListItem from '@src/components/common/PlaceListItem';
import styles from './styles';

type TabGeneratorProps = {
  org: Array<Object>;
};

const TabGenerator: React.FC<TabGeneratorProps> = () => {
  return (
    <Container style={styles.tabContent}>
      {mockRemarkablePlace.featured.map((item: Place) => {
        return <PlaceListItem key={item.id} data={item} />;
      })}
    </Container>
  );
};

export default TabGenerator;
