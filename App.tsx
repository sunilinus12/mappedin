import React, {useRef} from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import {MapViewStore, MiMapView, Polygon} from '@mappedin/react-native-sdk';

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options = {
  clientId: '5eab30aa91b055001a68e996',
  clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
  venue: 'mappedin-demo-mall',
  perspective: 'Website',
};

const App: React.FC = () => {
  const mapView = useRef<MapViewStore>(null);
  const [selectedPolygon, setSelectedPolygon] = React.useState<Polygon | null>(
    null,
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <MiMapView
        style={{flex: 1}}
        key="mappedin"
        options={options}
        ref={mapView}
        onClick={({polygons}) => {
          if (polygons.length > 0) {
            mapView.current?.setPolygonColor(polygons[0], '#BF4320');
          }
        }}
      />
    </SafeAreaView>
  );
};

export default App;
