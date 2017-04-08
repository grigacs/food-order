import { Users } from "./user.interface"
import { Foods } from "./food.interface";
import { Orders } from "./order.interface";

export interface Data {
    users: Users[];
    foods: Foods[];
    orders: Orders[];
}
