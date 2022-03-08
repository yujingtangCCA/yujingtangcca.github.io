//each person needs a node
//AND each family needs a node

var nodes = [
  //Homer and Marge's Family

  {
    id: '1001',
    name: 'Nicolas II',
    'age at death': 50,
    born: 1868,
    'Location of Birth': 'Alexander Palace, Tsarskoye Selo, Russian Empire',
    image: '../Images//Mikola_II_(cropped)-2.jpeg'
  },
  {
    id: '1002',
    name: 'Alexandra Feodorovna',
    'age at death': 46,
    born: 1872,
    'Location of Birth':
      'New Palace, Darmstadt, Grand Duchy of Hesse, German Empire',
    image: '../Images/Alexandra_Feodorovna.jpeg'
  },
  {
    id: '1003',
    name: 'Tatiana',
    'age at death': 21,
    born: 1897,
    'Location of Birth': 'Peterhof Palace, Saint Petersburg, Russian Empire',
    image: 'holder.png'
  },
  {
    id: '1004',
    name: 'Maria',
    'age at death': 19,
    born: 1899,
    'Location of Birth': 'Peterhof Palace, Saint Petersburg, Russian Empire',
    image: 'holder.png'
  },
  {
    id: '1005',
    name: 'Anastasia',
    'age at death': 16,
    born: 1901,
    'Location of Birth': 'Peterhof Palace, Saint Petersburg, Russian Empire',
    image:
      '../Images/1200px-Grand_Duchess_Anastasia_Nikolaevna_Crisco_edit_letters_removed.jpeg'
  },
  {
    id: '1006',
    name: 'Alexei',
    'age at death': 13,
    born: 1904,
    'Location of Birth': 'Peterhof Palace, Saint Petersburg, Russian Empire',
    image: '../Images/Alexei_Nikolaevich,_Tsarevich_of_Russia.jpeg'
  },

  //Abraham and Mona's Family

  {
    id: '1007',
    name: 'Olga',
    'age at death': 22,
    born: 1895,
    'Location of Birth':
      'Alexander Palace, Tsarskoye Selo, Saint Petersburg Governorate, Russian Empire',
    image: '../Images/1280px-Grand_Duchess_Olga_Nikolaevna_of_Russia.jpeg'
  },
  {
    id: '1008',
    name: 'Alexander III',
    'age at death': 48,
    born: 1856,
    'Location of Birth': 'Winter Palace, Saint Petersburg, Russian Empire',
    image: 'holder.png'
  },
  {
    id: '1009',
    name: 'Alexander II',
    'age at death': 62,
    born: 1818,
    'Location of Birth': 'The Moscow Kremlin, Moscow, Russia',
    image: '../Images/Zar_Alexander_II_(cropped).jpeg'
  },

  //Clancy and Jacqueline's Family

  {
    id: '1010',
    name: 'Maria Alexandrovna',
    'age at death': 55,
    born: 1841,
    'Location of Birth':
      'Darmstadt, Grand Duchy of Hesse, German Confederation',
    image: 'holder.png'
  },
  {
    id: '1011',
    name: 'Catherine Dolgorukova',
    'age at death': 74,
    born: 1847,
    'Location of Birth': 'Volhynian Governorate, Russian Empire',
    image: 'holder.png'
  },
  {
    id: '1012',
    name: 'Maria Feodorovna',
    'age at death': 80,
    born: 1847,
    'Location of Birth': 'Yellow Palace, Copenhagen, Denmark',
    image: '../Images/Maria_Feodorovna_of_Russia_1881.jpeg'
  }
]

//currently there are four types of links
//family - family id is always the source
//married - link between two person ids
//adopted and divorced - behave like family but
//dotted line for divorced, gold line for adopted

var edges = [
  { id: 2, source: '1001', target: '1002', type: 'married' },
  { id: 3, source: '1001', target: '1003', type: 'child' },
  { id: 4, source: '1001', target: '1004', type: 'child' },
  { id: 5, source: '1001', target: '1005', type: 'child' },
  { id: 6, source: '1001', target: '1006', type: 'child' },
  { id: 8, source: '1001', target: '1008', type: 'parent' },
  { id: 9, source: '1008', target: '1009', type: 'parent' },
  { id: 10, source: '1008', target: '1012', type: 'married' },
  { id: 11, source: '1012', target: '1001', type: 'parent' },
  { id: 8, source: '1001', target: '1007', type: 'child' },
  { id: 9, source: '1010', target: '1008', type: 'parent' },
  { id: 10, source: '1010', target: '1009', type: 'married' },
  { id: 11, source: '1011', target: '1009', type: 'married' },
  { id: 12, source: '1002', target: '1003', type: 'child' },
  { id: 13, source: '1002', target: '1004', type: 'child' },
  { id: 15, source: '1002', target: '1005', type: 'child' },
  { id: 16, source: '1002', target: '1006', type: 'child' },
  { id: 17, source: '1002', target: '1007', type: 'child' }
]

//defining the chart
var myChart = familyChart()
  .nodes(nodes)
  .links(edges)

//defining the width and height of the svg
var width = window.innerWidth, // default width
  height = window.innerHeight

//drawing the svg and calling the familyChart opject.

var svg = d3
  .select('#forces')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('background-color', 'yellow')
  .call(myChart)

function familyChart () {
  var nodes = [],
    links = [] // default height

  function my (svg) {
    //set the radius of the family nodes

    //set the repel force - may need to be tweaked for multiple data
    //the lower the strength the more they will repel away from each other
    //the larger the distance, the more apart they will be
    var repelForce = d3
      .forceManyBody()
      .strength(-9000)
      .distanceMax(800)
      .distanceMin(85)

    //start the simulation
    //alpha decay - if less, force takes longer but is better positioned
    //center just keeps everything in the svg - otherwise you won't see it however much you pan or zoom
    //repel force see above
    //link distance - repel takes precidence - try upping or lowering the strength and changing the distances
    //collide - this is on maximum strength and is higher for family (bigger radius) than others so should keep
    //families further apart than people
    var simulation = d3
      .forceSimulation()
      //     .alphaDecay(0.04)
      //     .velocityDecay(0.4)
      //     .force("center", d3.forceCenter(width / 2, height / 2))
      .force('xAxis', d3.forceX(width / 2).strength(0.4))
      .force('yAxis', d3.forceY(height / 2).strength(0.6))
      .force('repelForce', repelForce)
      .force(
        'link',
        d3
          .forceLink()
          .id(function (d) {
            return d.id
          })
          .distance(dist)
          .strength(1.5)
      )
      .force(
        'collide',
        d3
          .forceCollide()
          .radius(function (d) {
            return d.r * 20
          })
          .iterations(10)
          .strength(1)
      )

    function dist (d) {
      //used by link force
      return 100
    }

    //define the links
    var links = svg
      .selectAll('foo')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke-width', function (d) {
        //stroke width - thicker if married/divorced
        if (d.type == 'married') {
          return '4px'
        } else {
          return '4px'
        }
      })

      .attr('stroke', function (d) {
        //grey unless adopted (blue) or married/divorced (gold) or married_invisible (white)
        if (d.type == 'married') {
          return 'red'
        } else if (d.type == 'parent') {
          return 'gold'
        } else {
          return 'gold'
        }
      })

    //define tooltip
    var tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .html('')

    //draw the nodes with drag functionality
    var node = svg
      .selectAll('foo')
      .data(nodes)
      .enter()
      .append('g')
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )

    //define defs and patterns - for the images
    var defs = node.append('defs')

    defs
      .append('pattern')
      .attr('id', function (d, i) {
        return 'my_image' + i
      })
      .attr('width', 1)
      .attr('height', 1)
      .append('svg:image')
      .attr('xlink:href', function (d) {
        if (d.image) {
          return d.image
        }
        return ''
      })
      .attr('height', '120')
      .attr('width', '120')
      .attr('object-fit', 'cover')
      .attr('x', -20)
      .attr('y', 0)

    //append deceased arc - only visible if "dead" is defined
    node
      .append('path')
      .attr('class', 'semi-circle')
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', function (d) {
        if (d.dead == undefined) {
          return '0px'
        } else {
          return '4px'
        }
      })
      .attr('d', describeArc(0, -2.5, 12.5, -90, 90))

    //append circles
    var circles = node
      .append('circle')
      .attr('class', 'circle')
      .attr('r', function (d) {
        //radius - bigger if family

        return 40
      })
      .attr('fill', function (d, i) {
        //white if family, otherwise image
        if (d.type == 'family') {
          return 'white'
        } else {
          return 'url(#my_image' + i + ')'
        }
      })
      .attr('stroke', function (d) {
        //different borders for family, male and female
        if (d.type == 'family') {
          return 'gold'
        }
      })
      .attr('stroke-width', '2px')
      .on('mouseover', function (d) {
        if (d.type !== 'family') {
          //sets tooltip.  t_text = content in html
          t_text =
            '<strong>' +
            titleCase(d.name) +
            '</strong><br>Age at Death: ' +
            d['age at death']
          if (d.born !== undefined) {
            //only add born if it is defined
            t_text += '<br>born: ' + d.born
          }
          if (d['Location of Birth'] !== undefined) {
            t_text += '<br>Location of Birth: ' + d['Location of Birth']
          }
          tooltip.html(t_text)
          return tooltip.style('visibility', 'visible')
        }
      })
      .on('mousemove', function () {
        return tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px')
      })
      .on('mouseout', function () {
        return tooltip.style('visibility', 'hidden')
      })

    //title case function used by tooltip and labels
    function titleCase (str) {
      str = str.toLowerCase().split(' ')
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
      }
      return str.join(' ')
    }

    //append labels
    var texts = node
      .append('text')
      .style('fill', 'black')
      .attr('dx', 0)
      .attr('dy', 50)
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return titleCase(d.name)
      })

    //finally - attach the nodes and the links to the simulation
    simulation.nodes(nodes)
    simulation.force('link').links(edges)

    //and define tick functionality
    simulation.on('tick', function () {
      links
        .attr('x1', function (d) {
          return d.source.x
        })
        .attr('y1', function (d) {
          return d.source.y
        })
        .attr('x2', function (d) {
          return d.target.x
        })
        .attr('y2', function (d) {
          return d.target.y
        })

      node.attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')'
      })
    })

    function dragstarted (d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
      if (d.type == 'family') {
        //stickiness - toggles the class to fixed/not-fixed to trigger CSS
        var my_circle = d3.select(this).selectAll('circle')
        if (my_circle.attr('class') == 'fixed') {
          my_circle.attr('class', 'not-fixed')
        } else {
          my_circle.attr('class', 'fixed')
        }
      }
    }

    function dragged (d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended (d) {
      if (!d3.event.active) simulation.alphaTarget(0)
      //stickiness - unfixes the node if not-fixed or a person
      var my_circle = d3.select(this).selectAll('circle')
      if (my_circle.attr('class') == 'not-fixed' || d.type !== 'family') {
        d.fx = null
        d.fy = null
      }
    }

    function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
      //for arcs - from excellent link - http://jsbin.com/quhujowota/1/edit?html,js,output
      var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      }
    }

    function describeArc (x, y, radius, startAngle, endAngle) {
      //for arcs - from excellent link - http://jsbin.com/quhujowota/1/edit?html,js,output

      var start = polarToCartesian(x, y, radius, endAngle)
      var end = polarToCartesian(x, y, radius, startAngle)

      var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

      var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
      ].join(' ')

      return d
    }
  }

  my.width = function (value) {
    if (!arguments.length) return width
    width = value
    return my
  }

  my.nodes = function (value) {
    if (!arguments.length) return nodes
    nodes = value
    return my
  }

  my.links = function (value) {
    if (!arguments.length) return links
    links = value
    return my
  }

  my.height = function (value) {
    if (!arguments.length) return height
    height = value
    return my
  }

  return my
}
