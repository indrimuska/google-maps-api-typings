declare module '@google/maps/lib/util' {
    import {LatLngLiteral} from '@google/maps';

    /**
     * Encodes an array of LatLng objects as Polyline.
     *
     * See {@link https://developers.google.com/maps/documentation/utilities/polylinealgorithm}
     */
    export function encodePath(path: LatLngLiteral[]): string;

    /**
     * Decodes a polyline encoded string as an array of LatLng objects.
     *
     * See {@link https://developers.google.com/maps/documentation/utilities/polylinealgorithm}
     */
    export function decodePath(encodedPath: string): LatLngLiteral[];
}