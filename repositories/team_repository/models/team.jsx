export class Team {
    constructor({
        uid = "",
        name = "",
        avatar = "",
        category = "",
        location = "",
    } = {}) {
        this.uid = uid;
        this.name = name;
        this.avatar = avatar;
        this.category = category;
        this.location = location;
    }

    static get empty() {
        return new Team();
    }

    static fromJSON(json) {
        if (json == null) {
            return Team.empty;
        }
        return new Team({
            uid: json.uid ?? "",
            name: json.name ?? "",
            avatar: json.avatar ?? "",
            category: json.category ?? "",
            location: json.location ?? "",
        });
    }

    toJson() {
        return {
            uid: this.uid,
            name: this.name,
            avatar: this.avatar,
            category: this.category,
            location: this.location,
        };
    }
}