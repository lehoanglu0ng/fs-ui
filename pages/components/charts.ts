const { I } = inject()

export default class Charts {
  constructor() { }

  // locators
  highChart = locate('.highcharts-container').first().as('the first chart');
  highchartsPoint = locate('.highcharts-tracker .highcharts-point').as('chart point/column');
  highchartsText = locate('.highcharts-label.highcharts-tooltip text').as('the tooltip content');


  // actions
  getChartData = async () => {
    I.scrollTo(this.highChart);
    I.moveCursorTo(this.highChart);
    await within(this.highChart, async () => {
      const noOfElements = await I.grabNumberOfVisibleElements(this.highchartsPoint);
      for (let i = 1; i <= noOfElements; i++) {
        I.moveCursorTo(locate(this.highchartsPoint).at(i).as(`the point/column: ${i}`));
        const text = await I.grabTextFrom(this.highchartsText);
        I.say(text);
      }
    });
  }

  getPieChartData = async () => {
    const data = [];
    I.scrollTo(this.highChart);
    I.moveCursorTo(this.highChart);
    await within(this.highChart, async () => {
      const noOfElements = await I.grabNumberOfVisibleElements(this.highchartsPoint);
      for (let i = 1; i <= noOfElements; i++) {
        this.hideSection(i);
      }
      for (let i = 1; i <= noOfElements; i++) {
        this.showSection(i);
        I.moveCursorTo(locate(this.highchartsPoint).at(i).as(`the section: ${i}`));
        const text = await I.grabTextFrom(this.highchartsText);
        data.push(text)
        this.hideSection(i);
      }
    });
    return data;
  }

  hideSection = (nth: number) => {
    I.usePlaywrightTo('hide pie chart section', async ({ page }) => {
      const elementHandle = await page.locator(`xpath=${locate(this.highchartsPoint).at(nth).toXPath()}`);
      await elementHandle.evaluate(node => node.setAttribute('style', 'display: none;'));
    });
  }

  showSection = (nth: number) => {
    I.usePlaywrightTo('show pie chart section', async ({ page }) => {
      const elementHandle = await page.locator(`xpath=${locate(this.highchartsPoint).at(nth).toXPath()}`);
      await elementHandle.evaluate(node => node.setAttribute('style', 'display: visible;'));
    });
  }
}