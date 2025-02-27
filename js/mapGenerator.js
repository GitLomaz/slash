let worlds = [
  [
    7, 15, 13, 5, 7, 15, 15, 13, 7, 13, 4, 16, 10, 8, 16, 16, 16, 16, 14, 6, 7,
    16, 13, 6, 8, 16, 16, 14, 6, 6, 8, 16, 16, 10, 6, 6, 8, 16, 14, 6, 6, 6, 8,
    15, 14, 4, 10, 6, 6, 2, 6, 6, 8, 16, 10, 7, 9, 8, 14, 5, 4, 12, 15, 14, 7,
    16, 15, 10, 4, 10, 7, 13, 2, 2, 6, 4, 10, 5, 7, 9, 8, 12, 15, 11, 16, 15,
    13, 4, 12, 13, 4, 11, 12, 11, 12, 10, 4, 11, 11, 10,
  ],
  [
    7, 15, 13, 5, 7, 15, 15, 13, 7, 13, 4, 16, 10, 8, 16, 16, 16, 16, 14, 6, 7,
    16, 13, 6, 8, 16, 16, 14, 6, 6, 8, 16, 16, 10, 6, 6, 8, 16, 14, 6, 6, 6, 8,
    15, 14, 4, 10, 6, 6, 2, 6, 6, 8, 16, 10, 7, 9, 8, 14, 5, 4, 12, 15, 14, 7,
    16, 15, 10, 4, 10, 7, 13, 2, 2, 6, 4, 10, 5, 7, 9, 8, 12, 15, 11, 16, 15,
    13, 4, 12, 13, 4, 11, 12, 11, 12, 10, 4, 11, 11, 10,
  ],
];

let worldMap = { map: [], x: 1, y: 1, world: 0 };
for (let y = 0; y < 10; y++) {
  worldMap.map[y] = [];
  for (let x = 0; x < 10; x++) {
    let tileIndex = x + y * 10;
    worldMap.map[y][x] = {
      map: false,
      shape: worlds[worldMap.world][tileIndex],
    };
  }
}

function transformMap(map) {
  // Add shorelines
  map.validSpawnTiles = [];
  _.each(map.layers[0].data, function (row) {
    _.each(row, function (tile) {
      if (tile.index === 50) {
        map.validSpawnTiles.push({ x: tile.pixelX, y: tile.pixelY });
        let str = "";
        str += map.layers[0].data[tile.y - 1][tile.x].index === -1 ? "1" : "0";
        str += map.layers[0].data[tile.y][tile.x + 1].index === -1 ? "1" : "0";
        str += map.layers[0].data[tile.y + 1][tile.x].index === -1 ? "1" : "0";
        str += map.layers[0].data[tile.y][tile.x - 1].index === -1 ? "1" : "0";
        let digit = parseInt(str, 2);
        if (digit !== 0) {
          switch (digit) {
            case 9:
              tile.index = 25;
              break;
            case 12:
              tile.index = 27;
              break;
            case 8:
              tile.index = 26;
              break;
            case 4:
              tile.index = 51;
              break;
            case 1:
              tile.index = 49;
              break;
            case 3:
              tile.index = 73;
              break;
            case 6:
              tile.index = 75;
              break;
            case 2:
              tile.index = 74;
              break;
            default:
              console.log(digit);
              break;
          }
        }
      }
    });
  });
  _.each(map.layers[0].data, function (row) {
    _.each(row, function (tile) {
      if (tile.index === 50) {
        if (map.layers[0].data[tile.y - 1][tile.x - 1].index === -1) {
          tile.index = 52;
        } else if (map.layers[0].data[tile.y - 1][tile.x + 1].index === -1) {
          tile.index = 53;
        } else if (map.layers[0].data[tile.y + 1][tile.x - 1].index === -1) {
          tile.index = 76;
        } else if (map.layers[0].data[tile.y + 1][tile.x + 1].index === -1) {
          tile.index = 77;
        }
      }
    });
  });

  // Add doodads
  _.each(map.layers[0].data, function (row) {
    _.each(row, function (tile) {
      if (tile.index === 50) {
        if (oneIn(3)) {
          tile.index = getRandomInt(385, 408);
        }
        if (oneIn(20)) {
          map.layers[1].data[tile.y][tile.x].index = getRandomInt(7, 17);
        } else if (oneIn(100)) {
          map.layers[1].data[tile.y][tile.x].index = getRandomInt(31, 40);
        } else if (oneIn(100)) {
          let flower = getRandomInt(81, 88) + getRandomInt(0, 4) * 24;
          map.layers[1].data[tile.y][tile.x].index = flower;
        }
      }
    });
  });
  return map;
}
