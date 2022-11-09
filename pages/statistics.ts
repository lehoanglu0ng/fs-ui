const { I, pages } = inject()

export default class StatisticsPage {
  constructor() { }

  // locators
  //div[normalize-space()="${name}"]/preceding-sibling::font <-- xpath style
  statistic = (name: string) => { return locate('font').before(locate('div').withText(name)).as(name) };
  //.progressGraphicContainer .tab-button:text-is("${name}") <-- xpath style
  progressGraphicTab = (name: string) => {
    return locate('.tab-button').withText(name).inside('.progressGraphicContainer').as(`${name} tab`);
  };
  totalApproved = locate('[for="toggle-approved"]').as('Total approved');
  amountDisbursed = locate('[for="toggle-disbursed"]').as('Amount disbursed');
  defautRate = locate('[for="toggle-default"]').as('Default rate');


  // actions
  verifyStatisticsAreDisplayed = (names: string[]) => {
    names.forEach(name => {
      I.seeElement(this.statistic(name));
    });
    return this;
  }

  verifyProgressGraphicTabsAreDisplayed = (names: string[]) => {
    names.forEach(name => {
      I.seeElement(this.progressGraphicTab(name));
    });
    return this;
  }

  getTotalApprovedLoans = async () => {
    I.click(this.totalApproved);
    await pages.charts.getChartData();
    return this;
  }

  getAmountDisbursed = async () => {
    I.click(this.amountDisbursed);
    await pages.charts.getChartData();
    return this;
  }

  getDefaultRate = async () => {
    I.click(this.defautRate);
    await pages.charts.getChartData();
    return this;
  }

  getRepaymentData = async () => {
    I.click(this.progressGraphicTab('Repayment'));
    await pages.charts.getChartData();
    return this;
  }

  getDisbursementData = async () => {
    I.click(this.progressGraphicTab('Disbursement'));
    const rawData = await pages.charts.getPieChartData();
    const disbursementData = [];
    rawData.forEach((item: string) => {
      const data = item.split('● Percentage (%): ');
      if (data.length = 2) {
        let temp = new DisbursementData();
        temp.industryName = data[0];
        temp.percentage = parseFloat(data[1]);
        disbursementData.push(temp);
      }
    });
    disbursementData.sort((a: DisbursementData, b: DisbursementData) => (a.percentage - b.percentage));
    disbursementData.forEach((data: DisbursementData) => I.say(`${data.percentage} -> ${data.industryName}`));
    return this;
  }
}

export class DisbursementData {
  industryName: string;
  percentage: number;
}