const bcrypt = require('bcrypt')

module.exports = {
  up: async queryInterface => {
    const email = process.env.INITIAL_ADMIN_EMAIL
    const password = process.env.INITIAL_ADMIN_PASSWORD

    if (!email || !password) {
      throw new Error(
        'INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD must be set before seeding'
      )
    }

    return queryInterface.bulkInsert('users', [{
      createdAt: new Date,
      updatedAt: new Date,
      username: 'Boo Boo',
      password: await bcrypt.hash(password, 10),
      email,
      isAdmin: true,
      isParticipant: false,
      isActive: true,
    }])
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('users', [{
      email: [
        'admin@domain.com',
      ],
    }])
  },
}
