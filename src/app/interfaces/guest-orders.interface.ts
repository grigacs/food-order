/**
 * Created by griga on 2017-04-17.
 */
export interface GuestsOrders {
  first_name: string,
  last_name: string,
  mail: string;
  address: string,
  mobile: string,
  food_ids: Array<number>,
  food_quantities: Array<number>,
  delivered: boolean
}
