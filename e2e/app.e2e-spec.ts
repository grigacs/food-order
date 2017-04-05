import { FoodOrderPage } from './app.po';

describe('food-order App', () => {
  let page: FoodOrderPage;

  beforeEach(() => {
    page = new FoodOrderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
