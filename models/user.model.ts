import { bookshelf } from "../config/database";
import { ClassModel } from "./class.model";
import { SchoolModel } from "./school.model";

export const UserModel = bookshelf.model("UserModel", {
      tableName: "users",
        school (){
          return this.belongsTo(SchoolModel, 'school_id')
  },

        kelas() {
          return this.belongsTo(ClassModel, 'class_id');
  }

});
