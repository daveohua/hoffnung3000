module.exports = {
  up: queryInterface => Promise.all([
    queryInterface.bulkUpdate('configs', {
      participationPrice: 0,
      updatedAt: new Date(),
    }, { app: 'default' }),
    queryInterface.bulkUpdate('pages', {
      content: '<p>Register here to take part in the festival. Your account will be activated once your registration has been reviewed.</p>',
      updatedAt: new Date(),
    }, {
      slug: 'registration-intro',
      content: '',
    }),
  ]),

  down: () => Promise.resolve(),
}
