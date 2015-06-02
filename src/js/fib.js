var drawFib;

drawFib = function() {
  var dAttr, fib, fibNext, i, iterations, length, ndx, path, r, ref, ref1, ref2, scale, svg, width, x, y;
  width = $('#test-fib').width();
  iterations = 12;
  scale = width * .0105;
  dAttr = "m" + (width * .29) + "," + (width * .2);
  svg = d3.select('#test-fib').append('svg').attr('width', width).attr('height', width * 0.64).append('g');
  ref = [1, 1], fib = ref[0], fibNext = ref[1];
  for (ndx = i = 0, ref1 = iterations; 0 <= ref1 ? i < ref1 : i > ref1; ndx = 0 <= ref1 ? ++i : --i) {
    r = fib * scale;
    x = ndx % 4 < 2 ? r : r * -1;
    y = (ndx + 1) % 4 < 2 ? r : r * -1;
    dAttr += "a" + r + "," + r + " 0 0 0 " + x + "," + y;
    ref2 = [fibNext, fib + fibNext], fib = ref2[0], fibNext = ref2[1];
  }
  path = svg.append('path').attr('d', dAttr);
  return length = path.node().getTotalLength();
};
