const email = 'Antiuniversitynow@gmail.com'
const passwordHash = '$2b$10$O4GfFlC5tkT1IIi2/NSQCezd0BjexfXjuacatr4MjaBsnEN1EDYSK'

module.exports = {
  up: async queryInterface => {
    const [users] = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email',
      { replacements: { email } }
    )

    if (users.length > 0) {
      return queryInterface.bulkUpdate('users', {
        password: passwordHash,
        isAdmin: true,
        isActive: true,
        updatedAt: new Date(),
      }, { email })
    }

    return queryInterface.bulkInsert('users', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'Antiuniversity Now',
      password: passwordHash,
      email,
      isAdmin: true,
      isParticipant: false,
      isActive: true,
    }])
  },

  down: () => Promise.resolve(),
}
