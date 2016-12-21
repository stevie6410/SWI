import { SwiWebPage } from './app.po';

describe('swi-web App', function() {
  let page: SwiWebPage;

  beforeEach(() => {
    page = new SwiWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
