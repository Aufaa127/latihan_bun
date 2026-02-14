import type { Context } from "hono";
import { SchoolModel } from "../models/school.model";

export default class SchoolController {

    async getList(c: Context) {
        const schools = await SchoolModel
            .fetchAll()
            .map((item: any) => ({
                id: item.get("id"),
                name: item.get("name"),
                address: item.get("address"),
            }));

        return c.json({
            status: true,
            message: "Data successfully retrieved",
            data: schools,
        });
    }

    async getDetail(c: Context) {
        const id = c.req.param("id");

        const school = await SchoolModel
            .where("id", id)
            .fetch({
                require: false,
                withRelated: ["users"],
            });

        return c.json({
            status: true,
            message: "Data successfully retrieved",
            data: {
                id: school.get("id"),
                name: school.get("name"),
                address: school.get("address"),
                users: school.related("users"),
            },
        });
    }
}
