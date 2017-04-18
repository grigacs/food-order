/**
 * Created by griga on 2017-04-07.
 */

/**
 * interface for foods structure that contain the database
 * */
export interface Foods {
  food_id: number,
  name: string,
  category: string,
  picture: string,
  basis_price: number,
  size: string
}
