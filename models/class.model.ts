import { bookshelf } from "../config/database";
import { UserModel } from "./user.model";


export const ClassModel = bookshelf.model('ClassModel', {
    tableName: 'class',

    users() {
        return this.hasMany(UserModel, 'class_id');
    }
});
