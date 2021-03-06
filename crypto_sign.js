var test = require('tape')
var alloc = require('buffer-alloc')
var equals = require('buffer-equals')
var from = require('buffer-from')

module.exports = function (sodium) {
  test('crypto_sign fixtures', function (assert) {
    var fixtures = require('./fixtures/crypto_sign.json')

    for (var i = 0; i < fixtures.length; i++) {
      var secretKey = from([].concat(fixtures[i][0], fixtures[i][1]))
      var publicKey = from(fixtures[i][1])
      var message = from(fixtures[i][3])

      var expected = from([].concat(fixtures[i][2], fixtures[i][3]))
      var actual = alloc(sodium.crypto_sign_BYTES + message.length)

      sodium.crypto_sign(actual, message, secretKey)

      if (equals(actual, expected) === false) {
        assert.fail('Failed on fixture #' + i)
        assert.end()
        return
      }
    }

    assert.pass('Passed all fixtures')
    assert.end()
  })
}
