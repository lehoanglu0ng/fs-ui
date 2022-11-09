const { I } = inject()

export default class HomePage {
  constructor() { }

  // locators
  menu = (menuName: string) => { return locate('a').withText(menuName).inside('.nav-menu').as(`${menuName} menu`) }


  // actions
  openHomePage = () => {
    I.amOnPage('/');
    return this;
  }

  clickMenu = (menuName: string) => {
    I.click(this.menu(menuName));
    return this;
  }
}
