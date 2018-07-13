# Google Maps API Typings

This project contains the TypeScript interface declaration of the [`@google/maps`](https://github.com/googlemaps/google-maps-services-js) Node.JS API project.

It also provides inline documentation from the official [Google Maps Documentation](https://developers.google.com/maps/documentation/) platform.

![Google Maps API Typings Example](google-maps-api-typings.gif)

## Installation

Just install both the official Google Maps API package and the Google Maps API Typings using *npm*:

```
npm i @google/maps
npm i google-maps-api-typings --save-dev
```

## Usage

```
import { createClient, Language } from "@google/maps";

const client = createClient({
    key: 'my-google-maps-api-key',
    language: Language.Japanese,
    Promise: Promise
});

client
    .geocode({ address: 'Leaning Tower of Pisa' })
    .asPromise()
    .then(response => {
        response.json.results.forEach(result => {
            console.log(
                result.geometry.location
            );
        })
    });
```

This will output: `{ lat: 43.722952, lng: 10.396597 }`.

## Supported APIs

 - [directions](https://developers.google.com/maps/documentation/directions/intro)
 - [distanceMatrix](https://developers.google.com/maps/documentation/distance-matrix/intro)
 - [elevation](https://developers.google.com/maps/documentation/elevation/intro)
 - [elevationAlongPath](https://developers.google.com/maps/documentation/elevation/intro)
 - [findPlace](https://developers.google.com/places/web-service/search#FindPlaceRequests)
 - [geocode](https://developers.google.com/maps/documentation/geocoding/intro#GeocodingRequests)
 - [geolocate](https://developers.google.com/maps/documentation/geolocation/intro)
 - [nearestRoads](https://developers.google.com/maps/documentation/roads/nearest)
 - [place](https://developers.google.com/places/web-service/details)
 - [places](https://developers.google.com/places/web-service/search#TextSearchRequests)
 - [placesAutoComplete](https://developers.google.com/places/web-service/autocomplete)
 - [placesNearby](https://developers.google.com/places/web-service/search#PlaceSearchRequests)
 - [placesPhoto](https://developers.google.com/places/web-service/photos)
 - [placesQueryAutoComplete](https://developers.google.com/places/web-service/query)
 - [placesRadar](https://developers.google.com/places/web-service/search#RadarSearchRequests)
 - [reverseGeocode](https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding)
 - [snappedSpeedLimits](https://developers.google.com/maps/documentation/roads/speed-limits)
 - [snapToRoads](https://developers.google.com/maps/documentation/roads/snap)
 - [speedLimits](https://developers.google.com/maps/documentation/roads/speed-limits)
 - [timezone](https://developers.google.com/maps/documentation/timezone/intro)

### Note

Do not confuse the Google Maps Node.JS API with the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript).