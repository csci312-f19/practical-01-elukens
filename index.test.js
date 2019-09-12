/* eslint-disable no-global-assign, no-underscore-dangle */
const moment = require('moment');

const howOld = function howOld(birthday) {
  return moment().diff(birthday, 'years');
};

module.exports = {
  howOld,
};
const birthday = require('./index');

describe('Determines age based on birthday', () => {
  let _Date;
  beforeAll(() => {
    // Save original date module
    _Date = Date;
  });

  afterAll(() => {
    // Reset Date
    Date = _Date;
  });

  beforeEach(() => {
    // Set a fixed date
    Date.now = jest.fn(() => new Date('01 Jan 2018').valueOf());
  });

  test('Returns 0 if birthday is tomorrow', () => {
    expect(birthday.howOld(new Date('02 Jan 2018'))).toBe(0);
  });
  test('Returns 1 if birthday is a year ago', () => {
    expect(birthday.howOld(new Date('01 Jan 2017'))).toBe(1);
  });
  test('Returns 31 if birthday is 31 Dec 2017', () => {
    expect(birthday.howOld(new Date('31 Dec 2017'))).toBe(0);
  });
  test('Returns 20 if birthday is 01 Jan 1998', () => {
    expect(birthday.howOld(new Date('01 Jan 1998'))).toBe(20);
  });
});
