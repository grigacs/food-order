import { Users } from "./user.interface"
import { Foods } from "./food.interface";
import { UsersOrders } from "./user-orders.interface";
import { GuestsOrders } from "./guest-orders.interface";

/**
 * interface for database structure
 * */
export interface Data {
    users: Users[];
    foods: Foods[];
    usersOrders: UsersOrders[];
    guestsOrders: GuestsOrders[];
}
