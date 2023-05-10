import { GeoPoint } from "firebase/firestore";

export class UserLocation {
    constructor({
        geoLocation = new GeoPoint(-90, 90),
        ipAddress = "",
    } = {}) {
        this.geoLocation = geoLocation,
            this.ipAddress = ipAddress
    }
    static get empty() {
        return new UserLocation();
    }
    static fromJSON(json) {
        if (json == null) {
            return User.empty;
        }
        return new UserLocation({
            geoLocation: json.geoLocation ?? new GeoPoint(-90, 90),
            ipAddress: json.ipAddress ?? ""
        })
    }
    toJson() {
        return {
            geoLocation: this.geoLocation,
            ipAddress: this.ipAddress
        }
    }
}