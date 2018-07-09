declare module '@google/maps' {
    /**
     * Creates a Google Maps client. The client object contains all the API methods.
     */
    export interface CreateClientOptions {
        /** API key (required, unless clientID and clientSecret provided). */
        key: string;
        /** Maps API for Work client ID. */
        clientId?: string;
        /** Maps API for Work client secret (a.k.a. private key). */
        clientSecret?: string;
        /** Maps API for Work channel. */
        channel?: string;
        /** Timeout in milliseconds. (Default: 60 * 1000 ms). */
        timeout?: number;
        /** Default language for all queries. */
        language?: Language;
        /** Promise constructor (optional). */
        Promise?: PromiseConstructor;
        /** Rate options */
        rate?: RateOptions;
        /** Retry options */
        retryOptions?: RetryOptions;
    }

    export interface RateOptions {
        /** Controls rate-limiting of requests. Maximum number of requests per period. (Default: 50) */
        limit?: number;
        /** Period for rate limit, in milliseconds. (Default: 1000 ms) */
        period?: number;
    }

    export interface RetryOptions {
        /** If a transient server error occurs, how long to wait before retrying the request, in milliseconds. (Default: 500 ms) */
        interval?: number;
    }

    export function createClient(options: CreateClientOptions): GoogleMapsClient;

    /**
     * A callback function, which is called asynchronously when an API method completes. 
     * The callback is given either:
     *  - a successful ClientResponse object; or
     *  - an error, one of:
     *      - the string `"timeout"`; or
     *      - an error from the underlying `http` library; or
     *      - a ClientResponse whose status is not `OK`.
     * 
     * API methods don't require a callback function, if you use the Promise API.
     */
    export interface ResponseCallback<T> {
        (err: 'timeout' | ClientResponse<T>, response: ClientResponse<T>): void;
    }

    /**
     * The object given to the ResponseCallback, containing the HTTP status and headers, as well as the response JSON.
     */
    export interface ClientResponse<T> {
        /** The HTTP headers. */
        headers: { [index: string]: string };
        /** Deserialized JSON object for the API response. */
        json: T;
        /** The HTTP status. */
        status: number;
    }

    /** A handle that allows cancelling a request, or obtaining a Promise. */
    export interface RequestHandle<T> {
        /**
         * Returns the response as a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
         * This method is only available if you supplied the `Promise` constructor to the `createClient()` method when you constructed
         * the client object.
         */
        asPromise(): Promise<ClientResponse<T>>;
        /**
         * Cancels the request.
         * The ResponseCallback will not be invoked, and promises will not be settled.
         * Use the RequestHandle#finally handler will still be called.
         */
        cancel(): void;
        /**
         * Registers a callback that will be called when the response is finished, either successfully, or with an error,
         * or having been cancelled. Use this to clean up resources.
         * Returns this handle, for chaining.
         */
        finally(callback: Function): RequestHandle<T>;
    }

    /**
     * A latitude, longitude pair. The API methods accept either:
     *  - a two-item array of [latitude, longitude];
     *  - a comma-separated string;
     *  - an object with 'lat', 'lng' properties; or
     *  - an object with 'latitude', 'longitude' properties.
     */
    export type LatLng = (
        [number, number] |
        string |
        { lat: number; lng: number } |
        { latitude: number; longitude: number }
    );

    /** @see https://developers.google.com/maps/faq#languagesupport */
    export enum Language {
        Arabic = 'ar',
        Belarusian = 'be',
        Bulgarian = 'bg',
        Bengali = 'bn',
        Catalan = 'ca',
        Czech = 'cs',
        Danish = 'da',
        German = 'de',
        Greek = 'el',
        English = 'en',
        EnglishAustralian = 'en-Au',
        EnglishGreatBritain = 'en-GB',
        Spanish = 'es',
        Basque = 'eu',
        Farsi = 'fa',
        Finnish = 'fi',
        Filipino = 'fil',
        French = 'fr',
        Galician = 'gl',
        Gujarati = 'gu',
        Hindi = 'hi',
        Croatian = 'hr',
        Hungarian = 'hu',
        Indonesian = 'id',
        Italian = 'it',
        Hebrew = 'iw',
        Japanese = 'ja',
        Kazakh = 'kk',
        Kannada = 'kn',
        Korean = 'ko',
        Kyrgyz = 'ky',
        Lithuanian = 'lt',
        Latvian = 'lv',
        Macedonian = 'mk',
        Malayalam = 'ml',
        Marathi = 'mr',
        Burmese = 'my',
        Dutch = 'nl',
        Norwegian = 'no',
        Punjabi = 'pa',
        Polish = 'pl',
        Portuguese = 'pt',
        PortugueseBrazil = 'pt-BR',
        PortuguesePortugal = 'pt-PT',
        Romanian = 'ro',
        Russian = 'ru',
        Slovak = 'sk',
        Slovenian = 'sl',
        Albanian = 'sq',
        Serbian = 'sr',
        Swedish = 'sv',
        Tamil = 'ta',
        Telugu = 'te',
        Thai = 'th',
        Tagalog = 'tl',
        Turkish = 'tr',
        Ukrainian = 'uk',
        Uzbek = 'uz',
        Vietnamese = 'vi',
        ChineseSimlified = 'zh-CN',
        ChineseTraditional = 'zh-TW',
    }

    export interface GoogleMapsClient {
        /**
         * The Directions API is a service that calculates directions between locations.
         * You can search for directions for several modes of transportation, including transit, driving, walking, or cycling.
         * 
         * @see https://developers.google.com/maps/documentation/directions/intro
         */
        directions(query: DirectionsRequest, callback?: ResponseCallback<DirectionsResult>): RequestHandle<DirectionsResult>;
        /**
         * The Distance Matrix API is a service that provides travel distance and time for a matrix of origins and destinations.
         * The API returns information based on the recommended route between start and end points, as calculated by the Google Maps API,
         * and consists of rows containing duration and distance values for each pair.
         * 
         * @see https://developers.google.com/maps/documentation/distance-matrix/intro
         */
        distanceMatrix(query: DistanceMatrixRequest, callback?: ResponseCallback<DistanceMatrixResult>): RequestHandle<DistanceMatrixResult>;
    }

    export interface DirectionsRequest {
        /**
         * The address, textual latitude/longitude value, or place ID from which you wish to calculate directions.
         * 
         * - If you pass an address, the Directions service geocodes the string and converts it to a latitude/longitude coordinate to calculate directions. This coordinate may be different from that returned by the Geocoding API, for example a building entrance rather than its center.
         *     `origin=24+Sussex+Drive+Ottawa+ON`
         * - If you pass coordinates, they are used unchanged to calculate directions. Ensure that no space exists between the latitude and longitude values.
         *     `origin=41.43206,-81.38992`
         * - Place IDs must be prefixed with place_id:. The place ID may only be specified if the request includes an API key or a Google Maps APIs Premium Plan client ID. You can retrieve place IDs from the Geocoding API and the Places SDK (including Place Autocomplete). For an example using place IDs from Place Autocomplete, see Place Autocomplete and Directions. For more about place IDs, see the place ID overview.
         *     `origin=place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE`
         */
        origin: LatLng;
        /**
         * The address, textual latitude/longitude value, or place ID to which you wish to calculate directions.
         * The options for the `destination` parameter are the same as for the `origin` parameter, described above
         */
        destination: LatLng;
        /**
         * Specifies the mode of transport to use when calculating directions
         * 
         * @default TravelMode.Driving
         */
        mode?: TravelMode;
        /**
         * Specifies an array of waypoints.
         * Waypoints alter a route by routing it through the specified location(s).
         * A waypoint is specified as a latitude/longitude coordinate, an encoded polyline, a place ID, or an address which will be geocoded.
         * Encoded polylines must be prefixed with `enc:` and followed by a colon (`:`). Place IDs must be prefixed with `place_id:`.
         * The place ID may only be specified if the request includes an API key or a Google Maps APIs Premium Plan client ID.
         * Waypoints are only supported for driving, walking and bicycling directions.
         */
        waypoints?: Array<LatLng>;
        /**
         * If set to `true`, specifies that the Directions service may provide more than one route alternative in the response.
         * Note that providing route alternatives may increase the response time from the server.
         */
        alternatives?: boolean;
        /** Indicates that the calculated route(s) should avoid the indicated features */
        avoid?: Array<TravelRestriction>;
        /**
         * The language in which to return results.
         * 
         *  - If `language` is not supplied, the API attempts to use the preferred language as specified in the `Accept-Language` header,
         *      or the native language of the domain from which the request is sent.
         *  - The API does its best to provide a street address that is readable for both the user and locals. To achieve that goal,
         *      it returns street addresses in the local language, transliterated to a script readable by the user if necessary,
         *      observing the preferred language. All other addresses are returned in the preferred language.
         *      Address components are all returned in the same language, which is chosen from the first component.
         *  - If a name is not available in the preferred language, the API uses the closest match.
         *  - The preferred language has a small influence on the set of results that the API chooses to return,
         *      and the order in which they are returned. The geocoder interprets abbreviations differently depending on language,
         *      such as the abbreviations for street types, or synonyms that may be valid in one language but not in another.
         *      For example, utca and tér are synonyms for street in Hungarian.
         */
        language?: Language;
        /** Specifies the unit system to use when displaying results */
        units?: UnitSystem;
        /** Specifies the region code, specified as a ccTLD ("top-level domain") two-character value */
        region?: string;
        /**
         * Specifies the desired time of arrival for transit directions, in seconds since midnight, January 1, 1970 UTC.
         * You can specify either `departure_time` or `arrival_time`, but not both.
         * Note that `arrival_time` must be specified as an integer.
         */
        arrival_time?: Date | number;
        /**
         * Specifies the desired time of departure. You can specify the time as an integer in seconds since midnight, January 1, 1970 UTC.
         * Alternatively, you can specify a value of now, which sets the departure time to the current time (correct to the nearest second).
         * 
         * The departure time may be specified in two cases:
         *  - For requests where the travel mode is transit: You can optionally specify one of departure_time or arrival_time. If neither time is specified, the departure_time defaults to now (that is, the departure time defaults to the current time).
         *  - For requests where the travel mode is driving: You can specify the departure_time to receive a route and trip duration (response field: duration_in_traffic) that take traffic conditions into account. This option is only available if the request contains a valid API key, or a valid Google Maps APIs Premium Plan client ID and signature. The departure_time must be set to the current time or some time in the future. It cannot be in the past.
         */
        departure_time?: Date | number;
        /**
         * Specifies the assumptions to use when calculating time in traffic.
         * This setting affects the value returned in the `duration_in_traffic` field in the response, which contains the predicted time
         * in traffic based on historical averages. The `traffic_model` parameter may only be specified for driving directions
         * where the request includes a `departure_time`, and only if the request includes an API key or a Google Maps APIs Premium Plan client ID.
         * 
         * The default value of `best_guess` will give the most useful predictions for the vast majority of use cases.
         * It is possible the `best_guess` travel time prediction may be *shorter* than `optimistic`, or alternatively, *longer* than `pessimistic`,
         * due to the way the `best_guess` prediction model integrates live traffic information.
         * 
         * @default TrafficModel.BestGuess
         */
        traffic_model?: TrafficModel;
        /**
         * Specifies one or more preferred modes of transit.
         * This parameter may only be specified for transit directions, and only if the request includes an API key or
         * a Google Maps APIs Premium Plan client ID.
         */
        transit_mode?: Array<TransitMode>;
        /**
         * Specifies preferences for transit routes.
         * Using this parameter, you can bias the options returned, rather than accepting the default best route chosen by the API.
         * This parameter may only be specified for transit directions, and only if the request includes an API key or
         * a Google Maps APIs Premium Plan client ID.
         */
        transit_routing_preference?: TransitRoutingPreference;
        /** Wherever to optimize the provided route by rearranging the waypoints in a more efficient order */
        optimize?: boolean;
    }

    /**
     * When you calculate directions, you may specify the transportation mode to use.
     * By default, directions are calculated as `driving` directions.
     * 
     * **Note:** Both walking and bicycling directions may sometimes not include clear pedestrian or bicycling paths,
     * so these directions will return warnings in the returned result which you must display to the user.
     */
    export enum TravelMode {
        /** (default) indicates standard driving directions using the road network. */
        Driving = 'driving',
        /** requests walking directions via pedestrian paths & sidewalks (where available). */
        Walking = 'walking',
        /** requests bicycling directions via bicycle paths & preferred streets (where available). */
        Bicycling = 'bicycling',
        /**
         * requests directions via public transit routes (where available).
         * If you set the mode to transit, you can optionally specify either a departure_time or an arrival_time.
         * If neither time is specified, the departure_time defaults to now (that is, the departure time defaults to the current time).
         * You can also optionally include a transit_mode and/or a transit_routing_preference.
         */
        Transit = 'transit',
    }

    export enum TravelRestriction {
        /** indicates that the calculated route should avoid toll roads/bridges. */
        tolls = 'tolls',
        /** indicates that the calculated route should avoid highways. */
        highways = 'highways',
        /** indicates that the calculated route should avoid ferries. */
        ferries = 'ferries',
        /**
         * indicates that the calculated route should avoid indoor steps for walking and transit directions.
         * Only requests that include an API key or a Google Maps APIs Premium Plan client ID will receive indoor steps by default.
         */
        indoor = 'indoor',
    }

    /**
     * Directions results contain text within distance fields that may be displayed to the user to indicate the distance of
     * a particular "step" of the route. By default, this text uses the unit system of the origin's country or region.
     */
    export enum UnitSystem {
        /** specifies usage of the metric system. Textual distances are returned using kilometers and meters */
        metric = 'metric',
        /** specifies usage of the Imperial (English) system. Textual distances are returned using miles and feet */
        imperial = 'imperial',
    }

    export interface DirectionsResult {
        /** contains metadata on the request */
        status: DirectionsResultStatus;
        /** contains an array with details about the geocoding of origin, destination and waypoints */
        geocoded_waypoints: DirectionsGeocodedWaypoint[];
        /** contains an array of routes from the origin to the destination */
        routes: DirectionsRoute[];
        /** 
         * contains an array of available travel modes. This field is returned when a request specifies a travel `mode` and gets no results.
         * The array contains the available travel modes in the countries of the given set of waypoints.
         * This field is not returned if one or more of the waypoints are `via:` waypoints.
         */
        available_travel_modes: string[];
    }

    export enum TrafficModel {
        /**
         * (default) indicates that the returned `duration_in_traffic` should be the best estimate of travel time given what is known about
         * both historical traffic conditions and live traffic. Live traffic becomes more important the closer the departure_time is to now.
         */
        BestGuess = 'best_guess',
        /**
         * indicates that the returned `duration_in_traffic` should be longer than the actual travel time on most days,
         * though occasional days with particularly bad traffic conditions may exceed this value.
         */
        Pessimistic = 'pessimistic',
        /**
         * indicates that the returned `duration_in_traffic` should be shorter than the actual travel time on most days,
         * though occasional days with particularly good traffic conditions may be faster than this value.
         */
        Optimistic = 'optimistic',
    }

    export enum TransitMode {
        /** indicates that the calculated route should prefer travel by bus */
        Bus = 'bus',
        /** indicates that the calculated route should prefer travel by subway */
        Subway = 'subway',
        /** indicates that the calculated route should prefer travel by train */
        Train = 'train',
        /** indicates that the calculated route should prefer travel by tram and light rail */
        Tram = 'tram',
        /**
         * indicates that the calculated route should prefer travel by train, tram, light rail, and subway.
         * This is equivalent to `transit_mode=train|tram|subway`
         */
        Rail = 'rail',
    }

    export enum TransitRoutingPreference {
        /** indicates that the calculated route should prefer limited amounts of walking */
        LessWalking = 'less_walking',
        /** indicates that the calculated route should prefer a limited number of transfers */
        FewerTransfers = 'fewer_transfers',
    }

    /**
     * The `status` field within the Directions response object contains the status of the request, and may contain debugging information
     * to help you track down why the Directions service failed.
     */
    export enum DirectionsResultStatus {
        /** indicates the response contains a valid `result`. */
        OK = 'OK',
        /** indicates at least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded. */
        NOT_FOUND = 'NOT_FOUND',
        /** indicates no route could be found between the origin and destination. */
        ZERO_RESULTS = 'ZERO_RESULTS',
        /**
         * indicates that too many `waypoints` were provided in the request. For applications using the Directions API as a web service,
         * or the [directions service in the Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/directions),
         * the maximum allowed number of `waypoints` is 23, plus the origin and destination.
         */
        MAX_WAYPOINTS_EXCEEDED = 'MAX_WAYPOINTS_EXCEEDED',
        /**
         * indicates the requested route is too long and cannot be processed.
         * This error occurs when more complex directions are returned.
         * Try reducing the number of waypoints, turns, or instructions.
         */
        MAX_ROUTE_LENGTH_EXCEEDED = 'MAX_ROUTE_LENGTH_EXCEEDED ',
        /** indicates that the provided request was invalid. Common causes of this status include an invalid parameter or parameter value. */
        INVALID_REQUEST = 'INVALID_REQUEST',
        /**
         * indicates any of the following:
         *  - The API key is missing or invalid.
         *  - Billing has not been enabled on your account.
         *  - A self-imposed usage cap has been exceeded.
         *  - The provided method of payment is no longer valid (for example, a credit card has expired).
         * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.
         */
        OVER_DAILY_LIMIT = 'OVER_DAILY_LIMIT',
        /** indicates the service has received too many requests from your application within the allowed time period. */
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        /** indicates that the service denied use of the directions service by your application. */
        REQUEST_DENIED = 'REQUEST_DENIED',
        /** indicates a directions request could not be processed due to a server error. The request may succeed if you try again. */
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    }

    /**
     * Elements in the geocoded_waypoints array correspond, by their zero-based position, to the origin,
     * the waypoints in the order they are specified, and the destination
     */
    export interface DirectionsGeocodedWaypoint {
        /** indicates the status code resulting from the geocoding operation */
        geocoder_status: DirectionsGeocodedWaypointStatus;
        /**
         * indicates that the geocoder did not return an exact match for the original request, though it was able to match part of the requested address.
         * You may wish to examine the original request for misspellings and/or an incomplete address.
         * 
         * Partial matches most often occur for street addresses that do not exist within the locality you pass in the request.
         * Partial matches may also be returned when a request matches two or more locations in the same locality.
         * For example, "21 Henr St, Bristol, UK" will return a partial match for both Henry Street and Henrietta Street.
         * Note that if a request includes a misspelled address component, the geocoding service may suggest an alternative address.
         * Suggestions triggered in this way will also be marked as a partial match.
         */
        partial_match: boolean;
        /** unique identifier that can be used with other Google APIs. */
        place_id: string;
        /**
         * indicates the *address* type of the geocoding result used for calculating directions.
         * An empty list of types indicates there are no known types for the particular address component, for example, Lieu-dit in France.
         */
        types: AddressType[];
    }

    export enum DirectionsGeocodedWaypointStatus {
        /** indicates that no errors occurred; the address was successfully parsed and at least one geocode was returned. */
        OK = 'OK',
        /** indicates that the geocode was successful but returned no results. This may occur if the geocoder was passed a non-existent `address`. */
        ZERO_RESULTS = 'ZERO_RESULTS',
    }

    /**
     * This route may consist of one or more `legs` depending on whether any waypoints were specified.
     * As well, the route also contains copyright and warning information which must be displayed to the user in addition to the routing information.
     */
    export interface DirectionsRoute {
        /** contains a short textual description for the route, suitable for naming and disambiguating the route from alternatives. */
        summary: string;
        /**
         * contains an array which contains information about a leg of the route, between two locations within the given route.
         * A separate leg will be present for each waypoint or destination specified.
         * (A route with no waypoints will contain exactly one leg within the `legs` array.)
         * Each leg consists of a series of `steps`.
         */
        legs: DirectionsLeg[];
        /**
         * contains an array indicating the order of any waypoints in the calculated route.
         * This waypoints may be reordered if the request was passed `optimize:true` within its `waypoints` parameter.
         * 
         * If `optimizeWaypoints` was set to `true`, this field will contain the re-ordered permutation
         * of the input waypoints. For example, if the input was:
         *   Origin: Los Angeles
         *   Waypoints: Dallas, Bangor, Phoenix
         *   Destination: New York
         * and the optimized output was ordered as follows:
         *   Origin: Los Angeles
         *   Waypoints: Phoenix, Dallas, Bangor
         *   Destination: New York
         * then this field will be an Array containing the values [2, 0, 1]. Note that the numbering of waypoints
         * is zero-based. If any of the input waypoints has stopover set to false, this field will be empty,
         * since route optimization is not available for such queries.
         */
        waypoint_order: number[];
        /**
         * contains a single `points` object that holds an encoded polyline representation of the route.
         * This polyline is an approximate (smoothed) path of the resulting directions.
         */
        overview_polyline: string;
        /** contains the viewport bounding box of the `overview_polyline`. */
        bounds: LatLngBounds;
        /** contains the copyrights text to be displayed for this route. You must handle and display this information yourself. */
        copyrights: string;
        /** contains an array of warnings to be displayed when showing these directions. You must handle and display these warnings yourself. */
        warnings: string[];
        /**
         * If present, contains the total fare (that is, the total ticket costs) on this route.
         * This property is only returned for transit requests and only for routes where fare information is available for all transit legs.
         * 
         * **Note:** The Directions API only returns fare information for requests that contain either an API key or a client ID and digital signature.
         */
        fare: TransitFare;
        /**
         * An array of LatLngs representing the entire course of this route. The path is simplified in order to make
         * it suitable in contexts where a small number of vertices is required (such as Static Maps API URLs).
         */
        overview_path: LatLng[];
    }

    export interface TransitFare {
        /** An [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) indicating the currency that the amount is expressed in */
        currency: string;
        /** The total fare amount, in the currency specified above. */
        value: number;
        /** The total fare amount, formatted in the requested language. */
        text: string;
    }

    /**
     * A single leg of the journey from the origin to the destination in the calculated route.
     * For routes that contain no waypoints, the route will consist of a single "leg," but for routes that define one or more waypoints, the route will consist of one or more legs, corresponding to the specific legs of the journey.
     */
    export interface DirectionsLeg {
        /** contains an array of steps denoting information about each separate step of the leg of the journey */
        steps: DirectionsStep[];
        /**
         * indicates the total distance covered by this leg, as a field with the following elements.
         * 
         * Note that regardless of what unit system is displayed as text, the `distance.value` field always contains a value expressed in meters.
         * 
         * This field may be absent if the distance is unknown.
         */
        distance: Distance;
        /**
         * indicates the total duration of this leg.
         * 
         * This field may be absent if the duration is unknown.
         */
        duration: Duration;
        /**
         * indicates the total duration of this leg.
         * This value is an estimate of the time in traffic based on current and historical traffic conditions.
         * See the `traffic_model` request parameter for the options you can use to request that the returned value is optimistic, pessimistic,
         * or a best-guess estimate. The duration in traffic is returned only if all of the following are true:
         * 
         *  - The request includes a valid API key, or a valid Google Maps APIs Premium Plan client ID and signature.
         *  - The request does not include stopover waypoints. If the request includes waypoints, they must be prefixed with `via:`
         *      to avoid stopovers.
         *  - The request is specifically for driving directions—the `mode` parameter is set to `driving`.
         *  - The request includes a `departure_time` parameter.
         *  - Traffic conditions are available for the requested route.
         */
        duration_in_traffic: Duration;
        /** contains the estimated time of arrival for this leg. This property is only returned for transit directions. */
        arrival_time: Time;
        /**
         * contains the estimated time of departure for this leg, specified as a `Time` object.
         * The `departure_time` is only available for transit directions.
         */
        departure_time: Time;
        /**
         * contains the latitude/longitude coordinates of the origin of this leg.
         * Because the Directions API calculates directions between locations by using the nearest transportation option (usually a road)
         * at the start and end points, `start_location` may be different than the provided origin of this leg if, for example,
         * a road is not near the origin.
         */
        start_location: LatLng;
        /**
         * contains the latitude/longitude coordinates of the given destination of this leg.
         * Because the Directions API calculates directions between locations by using the nearest transportation option (usually a road)
         * at the start and end points, `end_location` may be different than the provided destination of this leg if, for example,
         * a road is not near the destination.
         */
        end_location: LatLng;
        /** contains the human-readable address (typically a street address) resulting from reverse geocoding the `start_location` of this leg */
        start_address: string;
        /** contains the human-readable address (typically a street address) from reverse geocoding the `end_location` of this leg */
        end_address: string;
        via_waypoints: LatLng[];
    }

    /**
     * A step is the most atomic unit of a direction's route, containing a single step describing a specific, single instruction on the journey.
     * E.g. "Turn left at W. 4th St." The step not only describes the instruction but also contains distance and duration information relating to
     * how this step relates to the following step. For example, a step denoted as "Merge onto I-80 West" may contain a duration of
     * "37 miles" and "40 minutes," indicating that the next step is 37 miles/40 minutes from this step.
     * 
     * When using the Directions API to search for transit directions, the steps array will include additional transit details in the form of
     * a `transit_details` array. If the directions include multiple modes of transportation, detailed directions will be provided for walking or
     * driving steps in an inner `steps` array. For example, a walking step will include directions from the start and end locations:
     * "Walk to Innes Ave & Fitch St". That step will include detailed walking directions for that route in the inner `steps` array, such as:
     * "Head north-west", "Turn left onto Arelious Walker", and "Turn left onto Innes Ave".
     */
    export interface DirectionsStep {
        /** contains formatted instructions for this step, presented as an HTML text string */
        html_instructions: string;
        /**
         * contains the distance covered by this step until the next step. (See the discussion of this field in Directions Legs)
         * 
         * This field may be undefined if the distance is unknown.
         */
        distance: Distance;
        /**
         * contains the typical time required to perform the step, until the next step. (See the description in Directions Legs)
         * 
         * This field may be undefined if the duration is unknown
         */
        duration: Duration;
        /** contains the location of the starting point of this step, as a single set of `lat` and `lng` fields */
        start_location: LatLng;
        /** contains the location of the last point of this step, as a single set of `lat` and `lng` fields */
        end_location: LatLng;
        /** contains the action to take for the current step (turn left, merge, straight, etc.). This field is used to determine which icon to display */
        maneuver: Maneuver;
        /** contains a single points object that holds an encoded polyline representation of the step. This polyline is an approximate (smoothed) path of the step */
        polyline: string;
        /**
         * contains detailed directions for walking or driving steps in transit directions.
         * Substeps are only available when `travel_mode` is set to "transit".
         * The inner `steps` array is of the same type as `steps`.
         */
        steps: DirectionsStep;
        /** contains transit specific information. This field is only returned with travel_mode is set to "transit" */
        transit_details: TransitDetails;
    }

    export interface Distance {
        /** indicates the distance in meters */
        value: number;
        /**
         * contains a human-readable representation of the distance, displayed in units as used at the origin
         * (or as overridden within the `units` parameter in the request).
         * (For example, miles and feet will be used for any origin within the United States.)
         */
        text: string;
    }

    export interface Duration {
        /** indicates the duration in seconds */
        value: number;
        /** contains a human-readable representation of the duration */
        text: string;
    }

    export interface Time {
        /** the time specified as a JavaScript `Date` object. */
        value: Date;
        /** the time specified as a string. The time is displayed in the time zone of the transit stop. */
        text: string;
        /**
         * contains the time zone of this station. The value is the name of the time zone as defined in the
         * [IANA Time Zone Database](http://www.iana.org/time-zones), e.g. "America/New_York".
         */
        time_zone: string;
    }

    export enum Maneuver {
        TurnSlightLeft = 'turn-slight-left',
        TurnSharpLeft = 'turn-sharp-left',
        UTurnLeft = 'uturn-left',
        TurnLeft = 'turn-left',
        TurnSlightRight = 'turn-slight-right',
        TurnSharpRight = 'turn-sharp-right',
        UTurnRight = 'uturn-right',
        TurnRight = 'turn-right',
        Straight = 'straight',
        RampLeft = 'ramp-left',
        RampRight = 'ramp-right',
        Merge = 'merge',
        ForkLeft = 'fork-left',
        ForkRight = 'fork-right',
        Ferry = 'ferry',
        FerryTrain = 'ferry-train',
        RoundaboutLeft = 'roundabout-left',
        RoundaboutRight = 'roundabout-right',
    }

    /**
     * Transit directions return additional information that is not relevant for other modes of transportation.
     * These additional properties are exposed through the `transit_details` object, returned as a field of an element in the `steps[]` array.
     * From the `TransitDetails` object you can access additional information about the transit stop, transit line and transit agency
     */
    export interface TransitDetails {
        /** contains information about the stop for this part of the trip */
        arrival_stop: TransitStop;
        /** contains information about the station for this part of the trip */
        departure_stop: TransitStop;
        /** contain the arrival time for this leg of the journey */
        arrival_time: Time;
        /** contain the departure time for this leg of the journey */
        departure_time: Time;
        /**
         * specifies the direction in which to travel on this line, as it is marked on the vehicle or at the departure stop.
         * This will often be the terminus station.
         */
        headsign: string;
        /**
         * specifies the expected number of seconds between departures from the same stop at this time.
         * For example, with a `headway` value of 600, you would expect a ten minute wait if you should miss your bus.
         */
        headway: number;
        /**
         * contains the number of stops in this step, counting the arrival stop, but not the departure stop.\
         * For example, if your directions involve leaving from Stop A, passing through stops B and C, and arriving at stop D,
         * `num_stops` will return 3.
         */
        num_stops: number;
        /** contains information about the transit line used in this step */
        line: TransitLine;
    }

    export interface TransitStop {
        /** the name of the transit station/stop. eg. "Union Square" */
        name: string;
        /** the location of the transit station/stop, represented as a `lat` and `lng` field */
        location: LatLng;
    }

    export interface TransitLine {
        /** contains the full name of this transit line. eg. "7 Avenue Express" */
        name: string;
        /** contains the short name of this transit line. This will normally be a line number, such as "M7" or "355" */
        short_name: string;
        /** contains the color commonly used in signage for this transit line. The color will be specified as a hex string such as: #FF0033 */
        color: string;
        /**
         * is an array containing a single `TransitAgency` object.
         * The `TransitAgency` object provides information about the operator of the line
         */
        agencies: TransitAgency[];
        /** contains the URL for this transit line as provided by the transit agency */
        url: string;
        /** contains the URL for the icon associated with this line */
        icon: string;
        /** contains the color of text commonly used for signage of this line. The color will be specified as a hex string */
        text_color: string;
        /** contains the type of vehicle used on this line */
        vehicle: TransitVehicle;
    }

    /** You must display the names and URLs of the transit agencies servicing the trip results. */
    export interface TransitAgency {
        /** contains the name of the transit agency */
        name: string;
        /** contains the phone number of the transit agency */
        phone: string;
        /** contains the URL for the transit agency */
        url: string;
    }

    export interface TransitVehicle {
        /** contains the name of the vehicle on this line. eg. "Subway." */
        name: string;
        /** contains the type of vehicle that runs on this line */
        type: VehicleType;
        /** contains the URL for an icon associated with this vehicle type */
        icon: string;
        /** contains the URL for the icon associated with this vehicle type, based on the local transport signage */
        local_icon: string;
    }

    /** @see https://developers.google.com/maps/documentation/directions/intro#VehicleType */
    export enum VehicleType {
        /** Rail */
        RAIL = 'RAIL',
        /** Light rail transit */
        METRO_RAIL = 'METRO_RAIL',
        /** Underground light rail */
        SUBWAY = 'SUBWAY',
        /** Above ground light rail */
        TRAM = 'TRAM',
        /** Monorail */
        MONORAIL = 'MONORAIL',
        /** Heavy rail */
        HEAVY_RAIL = 'HEAVY_RAIL',
        /** Commuter rail */
        COMMUTER_TRAIN = 'COMMUTER_TRAIN',
        /** High speed train */
        HIGH_SPEED_TRAIN = 'HIGH_SPEED_TRAIN',
        /** Bus */
        BUS = 'BUS',
        /** Intercity bus */
        INTERCITY_BUS = 'INTERCITY_BUS',
        /** Trolleybus */
        TROLLEYBUS = 'TROLLEYBUS',
        /** Share taxi is a kind of bus with the ability to drop off and pick up passengers anywhere on its route */
        SHARE_TAXI = 'SHARE_TAXI',
        /** Ferry */
        FERRY = 'FERRY',
        /** A vehicle that operates on a cable, usually on the ground. Aerial cable cars may be of the type `GONDOLA_LIFT` */
        CABLE_CAR = 'CABLE_CAR',
        /** An aerial cable car */
        GONDOLA_LIFT = 'GONDOLA_LIFT',
        /**
         * A vehicle that is pulled up a steep incline by a cable.
         * A Funicular typically consists of two cars, with each car acting as a counterweight for the other.
         */
        FUNICULAR = 'FUNICULAR',
        /** All other vehicles will return this type */
        OTHER = 'OTHER',
    }

    export enum AddressType {
        /** indicates a precise street address. */
        street_address = 'street_address',
        /** indicates a named route (such as "US 101"). */
        route = 'route',
        /** indicates a major intersection, usually of two major roads. */
        intersection = 'intersection',
        /** indicates a political entity. Usually, this type indicates a polygon of some civil administration. */
        political = 'political',
        /** indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
        country = 'country',
        /**
         * indicates a first-order civil entity below the country level. Within the United States, these administrative levels are states.
         * Not all nations exhibit these administrative levels.
         * In most cases, administrative_area_level_1 short names will closely match ISO 3166-2 subdivisions and other widely circulated lists;
         * however this is not guaranteed as our geocoding results are based on a variety of signals and location data.
         */
        administrative_area_level_1 = 'administrative_area_level_1',
        /**
         * indicates a second-order civil entity below the country level. Within the United States, these administrative levels are counties.
         * Not all nations exhibit these administrative levels.
         */
        administrative_area_level_2 = 'administrative_area_level_2',
        /**
         * indicates a third-order civil entity below the country level.
         * This type indicates a minor civil division. Not all nations exhibit these administrative levels.
         */
        administrative_area_level_3 = 'administrative_area_level_3',
        /**
         * indicates a fourth-order civil entity below the country level.
         * This type indicates a minor civil division. Not all nations exhibit these administrative levels.
         */
        administrative_area_level_4 = 'administrative_area_level_4',
        /**
         * indicates a fifth-order civil entity below the country level.
         * This type indicates a minor civil division. Not all nations exhibit these administrative levels.
         */
        administrative_area_level_5 = 'administrative_area_level_5',
        /** indicates a commonly-used alternative name for the entity. */
        colloquial_area = 'colloquial_area',
        /** indicates an incorporated city or town political entity. */
        locality = 'locality',
        /** indicates a specific type of Japanese locality, to facilitate distinction between multiple locality components within a Japanese address. */
        ward = 'ward',
        /**
         * indicates a first-order civil entity below a locality.
         * For some locations may receive one of the additional types: `sublocality_level_1` to `sublocality_level_5`.
         * Each sublocality level is a civil entity.
         * Larger numbers indicate a smaller geographic area.
         */
        sublocality = 'sublocality',
        /** indicates a named neighborhood */
        neighborhood = 'neighborhood',
        /** indicates a named location, usually a building or collection of buildings with a common name */
        premise = 'premise',
        /** indicates a first-order entity below a named location, usually a singular building within a collection of buildings with a common name */
        subpremise = 'subpremise',
        /** indicates a postal code as used to address postal mail within the country. */
        postal_code = 'postal_code',
        /** indicates a prominent natural feature. */
        natural_feature = 'natural_feature',
        /** indicates an airport. */
        airport = 'airport',
        /** indicates a named park. */
        park = 'park',
        /**
         * indicates a named point of interest. Typically, these "POI"s are prominent local entities that don't easily fit in another category,
         * such as "Empire State Building" or "Statue of Liberty."
         */
        point_of_interest = 'point_of_interest',
    }

    export interface DistanceMatrixRequest {
        /**
         * The starting point for calculating travel distance and time.
         * You can supply one or more locations separated by the pipe character (`|`), in the form of an address, latitude/longitude coordinates,
         * or a place ID:
         *  - If you pass an address, the service geocodes the string and converts it to a latitude/longitude coordinate to calculate distance.
         *      This coordinate may be different from that returned by the Geocoding API, for example a building entrance rather than its center.
         *      `origins=Bobcaygeon+ON|24+Sussex+Drive+Ottawa+ON`
         *  - If you pass latitude/longitude coordinates, they are used unchanged to calculate distance.
         *      Ensure that no space exists between the latitude and longitude values.
         *      `origins=41.43206,-81.38992|-33.86748,151.20699`
         *  - If you supply a place ID, you must prefix it with `place_id:`.
         *      You can only specify a place ID if the request includes an API key or a Google Maps APIs Premium Plan client ID.
         *      You can retrieve place IDs from the Geocoding API and the Places SDK (including Place Autocomplete).
         *      `origins=place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE`
         *  - Alternatively, you can supply an encoded set of coordinates using the Encoded Polyline Algorithm.
         *      This is particularly useful if you have a large number of origin points, because the URL is significantly shorter when using
         *      an encoded polyline.
         *      - Encoded polylines must be prefixed with `enc:` and followed by a colon (`:`). For example: `origins=enc:gfo}EtohhU:`
         *      - You can also include multiple encoded polylines, separated by the pipe character (`|`).
         *          For example: `origins=enc:wc~oAwquwMdlTxiKtqLyiK:|enc:c~vnAamswMvlTor@tjGi}L:|enc:udymA{~bxM:`

         */
        origins: Array<LatLng>;
        /**
         * One or more locations to use as the finishing point for calculating travel distance and time.
         * The options for the destinations parameter are the same as for the origins parameter, described above.
         */
        destinations: Array<LatLng>;
        /**
         * Specifies the mode of transport to use when calculating distance.
         * Valid values and other request details are specified in the Travel Modes section of this document.
         * 
         * @default TravelMode.Driving
         */
        mode?: TravelMode;
        /**
         * The language in which to return results.
         *  - If `language` is not supplied, the API attempts to use the preferred language as specified in the `Accept-Language` header,
         *      or the native language of the domain from which the request is sent.
         *  - The API does its best to provide a street address that is readable for both the user and locals. To achieve that goal,
         *      it returns street addresses in the local language, transliterated to a script readable by the user if necessary,
         *      observing the preferred language. All other addresses are returned in the preferred language.
         *      Address components are all returned in the same language, which is chosen from the first component.
         *  - If a name is not available in the preferred language, the API uses the closest match.
         *  - The preferred language has a small influence on the set of results that the API chooses to return,
         *      and the order in which they are returned. The geocoder interprets abbreviations differently depending on language,
         *      such as the abbreviations for street types, or synonyms that may be valid in one language but not in another.
         *      For example, utca and tér are synonyms for street in Hungarian.
         */
        language?: string;
        /**
         * The region code, specified as a [ccTLD](https://en.wikipedia.org/wiki/CcTLD) (country code top-level domain) two-character value.
         * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
         * This parameter will only influence, not fully restrict, results from the geocoder.
         * If more relevant results exist outside of the specified region, they may be included.
         */
        region?: string;
        /**
         * Introduces restrictions to the route. Valid values are specified in the Restrictions section of this document.
         * Only one restriction can be specified.
         */
        avoid?: Array<TravelRestriction>;
        /** Specifies the unit system to use when expressing distance as text */
        units?: UnitSystem;
        /**
         * Specifies the desired time of arrival for transit requests, in seconds since midnight, January 1, 1970 UTC.
         * You can specify either `departure_time` or `arrival_time`, but not both.
         * Note that `arrival_time` must be specified as an integer.
         */
        arrival_time?: Date | number;
        /**
         * The desired time of departure. You can specify the time as an integer in seconds since midnight, January 1, 1970 UTC.
         * Alternatively, you can specify a value of now, which sets the departure time to the current time (correct to the nearest second).
         * 
         * The departure time may be specified in two cases:
         *  - For requests where the travel mode is transit: You can optionally specify one of `departure_time` or `arrival_time`.
         *      If neither time is specified, the `departure_time` defaults to now (that is, the departure time defaults to the current time).
         *  - For requests where the travel mode is driving: You can specify the `departure_time` to receive a route and trip duration
         *      (response field: `duration_in_traffic`) that take traffic conditions into account.
         *      This option is only available if the request contains a valid API key, or a valid
         *      Google Maps APIs Premium Plan client ID and signature.
         *      The `departure_time` must be set to the current time or some time in the future. It cannot be in the past.
         * 
         *      **Note:** Distance Matrix requests specifying `departure_time` when `mode=driving` are limited
         *      to a maximum of 100 elements per request. The number of origins times the number of destinations defines the number of elements.
         */
        departure_time?: Date | number;
        /**
         * Specifies the assumptions to use when calculating time in traffic.
         * This setting affects the value returned in the `duration_in_traffic` field in the response,
         * which contains the predicted time in traffic based on historical averages.
         * The `traffic_model` parameter may only be specified for requests where the travel mode is `driving`,
         * and where the request includes a `departure_time`, and only if the request includes an API key or
         * a Google Maps APIs Premium Plan client ID.
         * 
         * @default TrafficModel.BestGuess
         */
        traffic_model?: TrafficModel;
        /** Specifies one or more preferred modes of transit. This parameter may only be specified for requests where the `mode` is `transit` */
        transit_mode?: Array<TransitMode>;
        /**
         * Specifies preferences for transit requests. Using this parameter, you can bias the options returned,
         * rather than accepting the default best route chosen by the API.
         * This parameter may only be specified for requests where the `mode` is `transit`.
         */
        transit_routing_preference?: TransitRoutingPreference;
    }

    export interface DistanceMatrixResult {
        /** contains metadata on the request. See Status Codes below. */
        status: DistanceMatrixResultTopLevelStatus;
        /**
         * When the top-level status code is other than `OK`, this field contains more detailed information
         * about the reasons behind the given status code.
         */
        error_message: string;
        /**
         * contains an array of addresses as returned by the API from your original request.
         * These are formatted by the geocoder and localized according to the language parameter passed with the request.
         */
        origin_addresses: string;
        /**
         * contains an array of addresses as returned by the API from your original request.
         * As with origin_addresses, these are localized if appropriate.
         */
        destination_addresses: string[];
        /** contains an array of elements, which in turn each contain a status, duration, and distance element */
        rows: DistanceMatrixRow[];
    }

    /** 
     * The status fields within the response object contain the status of the request, and may contain useful debugging information.
     * The Distance Matrix API returns a top-level status field, with information about the request in general,
     * as well as a status field for each element field, with information about that particular origin-destination pairing.
     */
    export enum DistanceMatrixResultTopLevelStatus {
        /** indicates the response contains a valid result */
        OK = 'OK',
        /** indicates that the provided request was invalid */
        INVALID_REQUEST = 'INVALID_REQUEST',
        /** indicates that the product of origins and destinations exceeds the per-query limit */
        MAX_ELEMENTS_EXCEEDED = 'MAX_ELEMENTS_EXCEEDED',
        /**
         * indicates any of the following:
         *  - The API key is missing or invalid.
         *  - Billing has not been enabled on your account.
         *  - A self-imposed usage cap has been exceeded.
         *  - The provided method of payment is no longer valid (for example, a credit card has expired).
         * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.
         */
        OVER_DAILY_LIMIT = 'OVER_DAILY_LIMIT',
        /** indicates the service has received too many requests from your application within the allowed time period */
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        /** indicates that the service denied use of the Distance Matrix service by your application */
        REQUEST_DENIED = 'REQUEST_DENIED',
        /** indicates a Distance Matrix request could not be processed due to a server error. The request may succeed if you try again */
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    }

    export enum DistanceMatrixResultElementLevelStatus {
        /** indicates the response contains a valid result */
        OK = 'OK',
        /** indicates that the origin and/or destination of this pairing could not be geocoded */
        NOT_FOUND = 'NOT_FOUND',
        /** indicates no route could be found between the origin and destination */
        ZERO_RESULTS = 'ZERO_RESULTS',
        /** indicates the requested route is too long and cannot be processed */
        MAX_ROUTE_LENGTH_EXCEEDED = 'MAX_ROUTE_LENGTH_EXCEEDED',
    }

    /**
     * When the Distance Matrix API returns results, it places them within a JSON `rows` array.
     * Even if no results are returned (such as when the origins and/or destinations don't exist), it still returns an empty array.
     * XML responses consist of zero or more `<row>` elements.
     * 
     * Rows are ordered according to the values in the `origin` parameter of the request.
     * Each row corresponds to an origin, and each `element` within that row corresponds to a pairing of the origin with a `destination` value.
     * 
     * Each `row` array contains one or more `element` entries, which in turn contain the information about a single origin-destination pairing.
     */
    export interface DistanceMatrixRow {
        elements: DistanceMatrixRowElement[];
    }

    /** The information about each origin-destination pairing is returned in an `element` entry */
    export interface DistanceMatrixRowElement {
        /** possible status codes  */
        status: DistanceMatrixResultElementLevelStatus;
        /**
         * The length of time it takes to travel this route, expressed in seconds (the `value` field) and as `text`.
         * The textual representation is localized according to the query's `language` parameter.
         */
        duration: Duration;
        /**
         * The length of time it takes to travel this route, based on current and historical traffic conditions.
         * See the `traffic_model` request parameter for the options you can use to request that the returned value is
         * `optimistic`, `pessimistic`, or a `best-guess` estimate. The duration is expressed in seconds (the `value` field) and as `text`.
         * The textual representation is localized according to the query's `language` parameter.
         * The duration in traffic is returned only if all of the following are true:
         *  - The request includes a `departure_time` parameter.
         *  - The request includes a valid API key, or a valid Google Maps APIs Premium Plan client ID and signature.
         *  - Traffic conditions are available for the requested route.
         *  - The `mode` parameter is set to `driving`.
         */
        duration_in_traffic: Duration;
        /**
         * The total distance of this route, expressed in meters (`value`) and as `text`.
         * The textual value uses the `unit` system specified with the unit parameter of the original request, or the origin's region.
         */
        distance: Distance;
        /**
         * If present, contains the total fare (that is, the total ticket costs) on this route.
         * This property is only returned for transit requests and only for transit providers where fare information is available.
         */
        fare: TransitFare;
    }
}