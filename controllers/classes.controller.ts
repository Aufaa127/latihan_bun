import type { Context } from "hono";
import { ClassModel } from "../models/class.model";

export default class ClassesController {

    async getList(c: Context) {
        const classes = await ClassModel
            .fetchAll()
            .map((item: any) => ({
                id: item.get("id"),
                name: item.get("name"),
            }));

        return c.json({
            status: true,
            message: "Data successfully retrievedd",
            data: classes,
        });
    }

    async getDetail(c: Context) {
        const id = c.req.param("id");

        const classData = await ClassModel
            .where("id", id)
            .fetch({
                require: false,
                withRelated: ["users.school"],
            });

        return c.json({
            status: true,
            message: "Data successfully retrieved",
            data: {
                id: classData.get("id"),
                name: classData.get("name"),
                users: classData.related("users").map((user: any) => {
                    let genderText = "";

                    if (user.get("gender") === 1) {
                        genderText = "Laki-laki";
                    } else if (user.get("gender") === 2) {
                        genderText = "Perempuan";
                    }

                    return {
                        id: user.get("id"),
                        name: user.get("name"),
                        gender: genderText,
                        address: user.get("address"),
                        school: {
                            id: user.related("school").get("id"),
                            name: user.related("school").get("name"),
                        },
                    };
                }),
            },
        });
    }
}
