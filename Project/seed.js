'use strict'
//import chance a native node module to generate random strings, numbers etc.
const chance = require('chance')(123)
//node promise library
const Promise = require('bluebird')

const { db, Civilian } = require('./civilian_model')
const numCivilians = 50

// ===== helper functions =======

const Class = ['civilian', 'potential terrorist']
const persons = ['person1', 'person2', 'person3']


function doTimes(n, fn) {
  const results = []
  while (n--) {
    results.push(fn())
  }
  return results
}

// if interaction is more than 90%, class sets to potential terrorist


// ===== generate singles =======
function randCivilian() {
  return Civilian.build({
    // id: userIds.pop(),
    person: chance.weighted(persons, [35, 30, 35]),
    numberCalled: chance.phone(),
    phoneNumber: chance.phone(),
    callType: chance.weighted(['Incoming', 'Outgoing'], [50, 50]),
    timeStamp: chance.date({ year: 2001, month: 8, day: 10 }),
    class: chance.weighted(Class, [85, 15]),
  })
}


// ===== generate multiple  =======
function generateCivilians() {
  return doTimes(numCivilians, randCivilian)
}

// ===== create and save the multiples in the database =======
function createCivilian() {
  return Promise.map(generateCivilians(), civilian => {
    return civilian.save()
  })
}

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const civilians = await createCivilian()

  console.log(`seeded ${civilians.length} civilians`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

