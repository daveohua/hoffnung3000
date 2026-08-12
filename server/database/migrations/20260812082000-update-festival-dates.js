module.exports = {
  up: queryInterface => queryInterface.bulkUpdate('configs', {
    festivalDateEnd: '2026-10-18',
    festivalDateStart: '2026-10-12',
  }, { app: 'default' }),

  down: queryInterface => queryInterface.bulkUpdate('configs', {
    festivalDateEnd: '2017-08-27',
    festivalDateStart: '2017-08-24',
  }, { app: 'default' }),
}
