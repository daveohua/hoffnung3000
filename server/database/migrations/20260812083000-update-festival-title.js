module.exports = {
  up: queryInterface => queryInterface.bulkUpdate('configs', {
    title: 'Antiuniversity Now Festival 2026',
  }, { app: 'default' }),

  down: queryInterface => queryInterface.bulkUpdate('configs', {
    title: 'HOFFNUNG 3000',
  }, { app: 'default' }),
}
