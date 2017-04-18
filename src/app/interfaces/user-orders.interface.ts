/**
 * Created by griga on 2017-04-07.
 */

/**
 * interface for UsersOrders structure that contain the database
 * */
export interface UsersOrders {
  user_id: number,
  food_ids: Array<number>,
  food_quantities: Array<number>,
  delivered: boolean
}

