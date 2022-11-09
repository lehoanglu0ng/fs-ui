Feature('e2e');

Scenario('Verify Statistics Data', async ({ I, pages }) => {
    pages.homePage.openHomePage().clickMenu('Statistics');
    pages.statisticsPage.verifyStatisticsAreDisplayed([
        "Total funded",
        "No. offinancing",
        "Defaultrate",
        "Financingfulfillment rate"
    ])
    pages.statisticsPage.verifyProgressGraphicTabsAreDisplayed([
        "General",
        "Repayment",
        "Disbursement",
    ]);
    await pages.statisticsPage.getTotalApprovedLoans();
    await pages.statisticsPage.getAmountDisbursed();
    await pages.statisticsPage.getDefaultRate();
    await pages.statisticsPage.getRepaymentData();
    await pages.statisticsPage.getDisbursementData();
});
