const Sequelize = require('sequelize')
const pkg = require('./package.json')
const databaseName = pkg.name

const db = new Sequelize(`postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)

const Civilian = db.define('civilian', {
  person: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  timeStamp: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  callType: {
    type: Sequelize.ENUM('Incoming', 'Outgoing'),
  },
  numberCalled: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: '(000) 000-0000'
  },
  attackDate: {
    type: Sequelize.STRING,
    defaultValue: '2001-09-11'
  },
  courierPhoneNumber: {
    type: Sequelize.STRING,
    defaultValue: '(000) 000-0000'
  },
  class: {
    type: Sequelize.ENUM('civilian', 'potential terrorist'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})


module.exports = {
  Civilian,
  db
}
