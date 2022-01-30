'use strict'

function clearActive () {
  for (var a in elements)
    for (var b in elements[a].classList)
      'active' === elements[a].classList[b] &&
        elements[a].classList.remove('active')
}

function addActive (a) {
  elements[a].classList.add('active')
}

function printSequence (a) {
  for (var b = sequence[a], c = 0; c < b.length; c++)
    '1' === b[c] && addActive(c)
}

function stepSequence () {
  clearActive(),
    counter >= sequence.length && (counter = 0),
    printSequence(counter),
    (document.getElementById('display').innerHTML = sequence[counter]),
    counter++,
    setTimeout(stepSequence, frequency)
}

var frequency = 800,
  sequence = [
    '1110111',
    '0010100',
    '0111011',
    '0111101',
    '1011100',
    '1101101',
    '1101111',
    '0110100',
    '1111111',
    '1111100'
  ],
  elements = document.getElementById('shape').getElementsByTagName('*'),
  counter = 0

window.onload = function () {
  stepSequence()
}

'0000001', '0000010', '0000100', '0001000', '0010000', '0100000', '1000000'
