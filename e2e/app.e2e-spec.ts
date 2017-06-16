import { BggListifyPage } from './app.po';

describe('bgg-listify App', () => {
  let page: BggListifyPage;

  beforeEach(() => {
    page = new BggListifyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
