/**
 * Created by griga on 2017-04-15.
 */

/**
 * interface for StoredFoods structure that contain the database
 * we need stored foods because this contain the quantity and size the ordered food
 * */
export interface StoredFoods {
  food_id: number,
  name: string,
  category: string,
  picture: string,
  basic_price: number,
  size: string,
  quantity: number;
}
