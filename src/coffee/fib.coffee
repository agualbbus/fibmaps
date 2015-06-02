drawFib = () ->

    width      = $('#test-fib').width()
    iterations = 12
    scale      = width * .0105
    dAttr      = "m#{width * .29},#{width * .2}"

    #
    svg = d3.select('#test-fib')
      .append 'svg'
      .attr   'width', width
      .attr   'height', width * 0.64
      .append  'g'

    # SVG elliptical arc curve (in <path> d attribute):
    #  a (rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y)
    [fib, fibNext] = [1, 1]
    for ndx in [0...iterations]
      r = fib * scale
      x = if ndx % 4 < 2 then r else r * -1
      y = if (ndx + 1) % 4 < 2 then r else r * -1
      dAttr += "a#{r},#{r} 0 0 0 #{x},#{y}"
      [fib, fibNext] = [fibNext, fib+fibNext]
    path = svg.append('path').attr 'd', dAttr

    #
    length = path.node().getTotalLength()


#    window.draw = () ->
#      path
#        .attr 'stroke-dasharray', "#{length} #{length}"
#        .attr 'stroke-dashoffset', length
#        .transition()
#          .duration 5 * 1000
#          .ease 'cubic-in'
#          .attr 'stroke-dashoffset', 0
#    setTimeout(draw, 500)
