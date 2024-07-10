import React, {useRef} from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import {
  MapViewStore,
  MappedinDestinationSet,
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
  return (
    <SafeAreaView style={{flex: 1}}>
      <MiMapView
        style={{flex: 1}}
        // making labels interactive
        // onFirstMapLoaded={() => {
        //   mapView.current?.FloatingLabels.labelAllLocations({
        //     interactive: true,
        //   });
        // }}
        onFirstMapLoaded={() => {
          const departure = mapView.current?.venueData?.locations.find(
            location => location.name === 'ThinkKitchen',
          )!;
          const Dronology = mapView.current?.venueData?.locations.find(
            location => location.name === 'White Barn',
          )!;
          const target = mapView.current?.venueData?.locations.find(
            location => location.name === 'One Tooth',
          )!;
          if (Dronology ?? target ?? true) return;
          const direction_ = departure.directionsTo(
            new MappedinDestinationSet([Dronology]),
          );
          mapView.current?.Journey.draw(direction_, {
            inactivePathOptions: {
              interactive: true,
            },
          });
          // const directions = departure?.directionsTo(
          //   new MappedinDestinationSet([
          //     mapView.current?.venueData?.locations.find(
          //       location => location.name === 'American Eagle',
          //     )!,
          //     mapView.current?.venueData?.locations.find(
          //       location => location.name === 'Target',
          //     )!,
          //   ]),
          // );
        }}
        onClick={({paths}) => {
          console.log('pathspathspaths', paths);

          paths?.forEach(path => {
            mapView.current?.Journey.setStepByPath(path);
          });
        }}
        key="mappedin"
        options={options}
        ref={mapView}
      />
    </SafeAreaView>
  );
};

export default App;
