/**
 * Created by griga on 2017-04-17.
 */

/**
 * interface for GuestOrders structure that contain the database
 * */
export interface GuestsOrders {
  first_name: string,
  last_name: string,
  mail: string;
  address: string,
  mobile: string,
  food_ids: Array<number>,
  food_quantities: Array<number>,
  food_sizes: Array<string>,
  delivered: boolean,
  totalPrice: number,
}
