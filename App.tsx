import React, {useEffect, useRef} from 'react';
import {Alert, LogBox, SafeAreaView} from 'react-native';
import {
  MapViewStore,
  MappedinDestinationSet,
  MappedinLocation,
  MiMapView,
} from '@mappedin/react-native-sdk';

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options = {
  clientId: '5eab30aa91b055001a68e996',
  clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
  venue: 'mappedin-demo-mall',
  perspective: 'Website',
  // labelAllLocationsOnInit: false, // do disable the location labels
};

const App: React.FC = () => {
  const mapView = useRef<MapViewStore>(null);
  const [destination, setDestination] = React.useState<MappedinLocation>();
  const [departure, setDeparture] = React.useState<MappedinLocation>();

  const drawDirections = async () => {
    if (!departure || !destination) return;
    const directions_ = await departure?.directionsTo(destination);
    mapView.current?.Journey.draw(directions_);
    // const directions = await departure.directionsTo(destination);
    // console.log(directions);
    // mapView.current?.Journey.draw(directions);
  };
  useEffect(() => {
    drawDirections();
  }, [departure, destination]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MiMapView
        style={{flex: 1}}
        key="mappedin"
        options={options}
        ref={mapView}
        // onClick={({polygons}) => {
        //   if (polygons.length > 0) {
        //     mapView.current?.setPolygonColor(polygons[0], '#BF4320');
        //   }
        // }}
        onPolygonClicked={({polygon}) => {
          if (departure === undefined) {
            setDeparture(polygon.locations[0]);
            mapView.current?.setPolygonColor(polygon, 'green');
          } else {
            setDestination(polygon.locations[0]);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default App;
