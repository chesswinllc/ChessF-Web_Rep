export default class User {
    public id?: string;
    public birthdate: string;
    public email: string;
    public gender: string;
    public name: string;
    public preferred_username: string;
    public password: string;
    public country: string;
    public gold_points: number = 0;
    public silver_points: number = 0;
    public profile_picture?: string
    public fb_user?: boolean = false;

    constructor(id?: string) {
        this.id = id;
    }
}