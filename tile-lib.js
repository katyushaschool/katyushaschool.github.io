var tileConfig = {
  size: 48,
  color: 'frost',
  bgFile: `../dungeontiles/dungeontiles-`,
  bgWidth: 10,
  bgHeight: 6,
  itemFile: `../dungeontiles/dungeonitems`,
  itemWidth: 10,
  itemHeight: 9,
  random: []
}

function generateRandoms() {
  for(var i = 0; i < 100 * 100; i++)
    tileConfig.random.push(Math.random())
}

function writeStyle() {
  document.write(`
    <style>
      div {
        image-rendering: -moz-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: pixelated;
        image-rendering: optimize-contrast;
        -ms-interpolation-mode: nearest-neighbor;
        }

      div.tileline {
      }

      div.tile {
        width: ${tileConfig.size}px;
        height: ${tileConfig.size}px;
        background-size:
          ${tileConfig.bgWidth * tileConfig.size}px
          ${tileConfig.bgHeight * tileConfig.size}px;
        background-image: url(${tileConfig.bgFile}${tileConfig.color}.png);
        display: inline-block;
        vertical-align: top;
        font-size: 45px;
        line-height: 52px;
        color: white;
        text-align: center;
        text-shadow:
          -1px -1px 0px #000,
           1px -1px 0px #000,
          -1px  1px 0px #000,
           1px  1px 0px #000;
      }

      div.item {
        width: ${tileConfig.size}px;
        height: ${tileConfig.size}px;
        background-size:
          ${tileConfig.itemWidth * tileConfig.size}px
          ${tileConfig.itemHeight * tileConfig.size}px;
        background-image: url(${tileConfig.itemFile}.png);
      }
    </style>
    `)
}

function makeTile(x, y, item){
  var result = `<div class=tile style="background-position: -${x*tileConfig.size}px -${y*tileConfig.size}px;">`

  if (item) {
    if (typeof item.u !== 'undefined' && typeof item.v !== 'undefined') {
      result += `<div class=item style="background-position: -${item.u*tileConfig.size}px -${item.v*tileConfig.size}px;"></div>`
    } else if (item.symbol) {
      if (item.color)
        result += `<span style="color:${item.color}">${item.symbol}</span>`
      else
        result += item.symbol
    }
  }

  return result + '</div>'
}

function makeMap(area, things) {
  var result = ''
  area = area.map(i=>i.split(""))
  things = things.reverse()

  for(var y = 0; y < area.length; y++){
    result += '<div class=tileline>'
    for(var x = 0; x < area[y].length; x++){
      var block = area[y][x]
      var item = things.find(item => item.x == x && item.y == y && item.show == true)

      if (block == '.') {
        result += makeTile(Math.round(tileConfig.random[y * area.length + x] * 5),0, item)
      } else if (block == ',') {
        result += makeTile(Math.round(tileConfig.random[y * area.length + x] * 3) + 6,0, item)
      } else if (block == '~') {
        result += makeTile(7,4, item)
      }
    }
    result += '</div>'
  }
  return result
}

generateRandoms()
writeStyle()
