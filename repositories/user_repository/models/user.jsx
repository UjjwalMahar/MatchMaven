export class User {
    constructor({
        uid = "",
        displayName = "",
        email = "",
        emailVerified = "",
        phoneNumber = "",
        photoURL = "",
    } = {}) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
        this.emailVerified = emailVerified;
        this.phoneNumber = phoneNumber;
        this.photoURL = photoURL;
    }
    static get empty() {
        return new User();
    }
    static fromJSON(json) {
        if (json == null) {
            return User.empty;
        }
        return new User({
            uid: json.uid ?? "",
            displayName: json.displayName ?? "",
            email: json.email ?? "",
            emailVerified: json.emailVerified ?? "",
            phoneNumber: json.phoneNumber ?? "",
            photoURL: json.photoURL ?? "",
        })
    }
    toJson() {
        return {
            uid: this.uid,
            displayName: this.displayName,
            email: this.email,
            emailVerified: this.emailVerified,
            phoneNumber: this.phoneNumber,
            photoURL: this.photoURL,
        }
    }
}