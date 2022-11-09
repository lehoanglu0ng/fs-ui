/// <reference types='codeceptjs' />

type pages = typeof import('./pageFactory');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, pages: pages }
  interface Methods extends Playwright {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
