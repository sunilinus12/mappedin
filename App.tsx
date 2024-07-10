import React, {useRef} from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import {MapViewStore, MiMapView} from '@mappedin/react-native-sdk';

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options = {
  clientId: '5eab30aa91b055001a68e996',
  clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
  venue: 'mappedin-demo-mall',
  perspective: 'Website',
  labelAllLocationsOnInit: false, // do disable the location labels
};

const App: React.FC = () => {
  const mapView = useRef<MapViewStore>(null);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MiMapView
        style={{flex: 1}}
        onFirstMapLoaded={() => {
          mapView.current?.FloatingLabels.labelAllLocations({
            interactive: true,
          });
        }}
        key="mappedin"
        options={options}
        ref={mapView}
        // onClick={({polygons}) => {
        //   if (polygons.length > 0) {
        //     mapView.current?.setPolygonColor(polygons[0], '#BF4320');
        //   }
        // }}
        onClick={({floatingLabels}) => {
          console.log('floatingLabels:', floatingLabels);

          if (floatingLabels && floatingLabels.length > 0) {
            const polygon = floatingLabels[0].node.polygon;
            console.log('Setting color for polygon:', polygon);

            mapView.current?.setPolygonColor(polygon, 'red');
          } else {
            console.log('Clearing all polygon colors');

            mapView.current?.clearAllPolygonColors();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default App;
