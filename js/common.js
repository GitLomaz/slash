const GLOBALS = {
  currentScore: 0,
  currentDay: 0,
  attackType: 0,
  skillType: 0,
};
let animal = animals[Phaser.Math.Between(0, 191)].toUpperCase();

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

function tryPushTile(tile, x, y) {
  try {
    if (scene.layer.layer.data[y][x].index !== -1) {
      tile.neighbours.push(scene.layer.layer.data[y][x]);
    }
  } catch (error) {}
}

function endDay() {
  GLOBALS.currentScore = scene.player.score;
  GLOBALS.currentDay = scene.day + 1;
  scene.scene.restart();
}

function displayNumber(y) {
  return y.toLocaleString("en-US");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function oneIn(value) {
  return getRandomInt(1, value + 1) === 1;
}

function getRoom(sprite) {
  if (sprite.y < 600 + 130) {
    if (sprite.x < 1000 + 130) {
      return 9;
    } else if (sprite.x < 1980 + 130) {
      return 2;
    } else {
      return 3;
    }
  } else if (sprite.y < 1172 + 130) {
    if (sprite.x < 1000 + 130) {
      return 8;
    } else if (sprite.x < 1980 + 130) {
      return 1;
    } else {
      return 4;
    }
  } else {
    if (sprite.x < 1000 + 130) {
      return 7;
    } else if (sprite.x < 1980 + 130) {
      return 6;
    } else {
      return 5;
    }
  }
}

function needToMoveTo(enemy) {
  let playerLocation = getRoom(scene.player);
  let enemyLocation = getRoom(enemy);
  if (
    playerLocation === enemyLocation ||
    Math.abs(playerLocation - enemyLocation) === 1
  ) {
    return false;
  } else if (
    (playerLocation === 9 && enemyLocation === 2) ||
    (playerLocation === 2 && enemyLocation === 9)
  ) {
    return false;
  } else {
    if (enemy.left === 1) {
      if (enemyLocation === 9) {
        return { room: 2, direction: 1 };
      } else {
        return { room: enemyLocation + 1, direction: 1 };
      }
    } else {
      if (enemyLocation === 2) {
        return { room: 9, direction: 0 };
      } else if (enemyLocation === 1) {
        return { room: 2, direction: 0 };
      } else {
        return { room: enemyLocation - 1, direction: 0 };
      }
    }
  }
}

function getWaypoint(obj) {
  // 923
  // 814
  // 765
  let point = obj.room;
  let dir = obj.direction;
  if (dir === 1) {
    switch (point) {
      case 2:
        return { x: 1180, y: 410 };
      case 3:
        return { x: 2180, y: 410 };
      case 4:
        return { x: 2635, y: 800 };
      case 5:
        return { x: 2635, y: 1380 };
      case 6:
        return { x: 2010, y: 1640 };
      case 7:
        return { x: 1010, y: 1640 };
      case 8:
        return { x: 550, y: 1240 };
      case 9:
        return { x: 550, y: 650 };
      default:
        return { x: 550, y: 650 };
    }
  } else {
    switch (point) {
      case 2:
        return { x: 2000, y: 400 };
      case 3:
        return { x: 2640, y: 666 };
      case 4:
        return { x: 2640, y: 1240 };
      case 5:
        return { x: 2170, y: 1666 };
      case 6:
        return { x: 1180, y: 1640 };
      case 7:
        return { x: 554, y: 1366 };
      case 8:
        return { x: 554, y: 800 };
      case 9:
        return { x: 1020, y: 390 };
      default:
        return { x: 1020, y: 390 };
    }
  }
}

function adjustScore(addition, score) {
  let newScore = addition + score;
  let scoreChecksum = parseInt(("" + newScore).slice(-2));
  let scoreCheck = parseInt(("" + newScore).slice(0, -2));
  let scoreTotal = sumOfDigits(scoreCheck);
  let diff = scoreTotal - scoreChecksum;
  return score + diff;
}

function sumOfDigits(number) {
  let remainder,
    sum = 0;
  while (number) {
    remainder = number % 10;
    sum = sum + remainder;
    number = Math.floor(number / 10);
  }
  return sum;
}

function getEnemies(day) {
  let enemies = ["blob", "bigBlob", "mage", "spore", "bull"];
  let list = [];
  _.each(enemies, function (e) {
    _.each(days[day].spawns, function (spawn) {
      if (
        spawn.hasOwnProperty("enemies") &&
        spawn.enemies.hasOwnProperty(e) &&
        spawn.enemies[e] > 0 &&
        !list.includes(e)
      ) {
        list.push(e);
      }
    });
  });
  return list;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function getVariant(weather, enemy) {
  switch (weather) {
    case 0: // sunny
      switch (enemy) {
        case "spore":
          return "Attack Speed - 50%";
        case "bull":
          return "Movement Speed + 25%";
        default:
          break;
      }
      break;
    case 1: // cloudy
      switch (enemy) {
        // case 'spore':
        //   return 'Attack Speed - 50%'
        // case 'bull':
        //   return 'Movement Speed + 25%'
        default:
          break;
      }
      break;
    case 2: // rainy
      switch (enemy) {
        case "blob":
          return "Movement Speed + 15%";
        case "bull":
          return "Movement Speed - 25%";
        default:
          break;
      }
      break;
    case 3: // thunder
      switch (enemy) {
        case "blob":
          return "Movement Speed + 25%";
        case "mage":
          return "Damage + 50%";
        case "bull":
          return "Movement Speed - 50%";
        default:
          break;
      }
      break;
  }
}

function generateDay(day) {
  let weather = getRandomInt(0, 4);
  let dayOutput = { weather: weather, spawns: [] };
  let limitedEnemies = [];
  let allEnemies = ["blob", "bull", "mage", "spore", "iceTotem", "mimic"];
  switch (weather) {
    case 0:
      limitedEnemies.push("spore");
      limitedEnemies.push("bull");
      break;
    case 1:
      break;
    case 2:
      limitedEnemies.push("blob");
      limitedEnemies.push("bull");
      break;
    case 3:
      limitedEnemies.push("blob");
      limitedEnemies.push("bull");
      limitedEnemies.push("mage");
      break;
    default:
      break;
  }
  while (limitedEnemies.length > 2) {
    shuffleArray(limitedEnemies);
    let remove = limitedEnemies.shift();
    allEnemies.remove(remove);
  }
  let dayType = getRandomInt(1, 4);
  for (let t = 0; t < 6000; t += 500 * dayType) {
    let enemyList = JSON.parse(JSON.stringify(allEnemies));
    let cap = (getRandomInt(day / 3, (day * 2) / 3) + 6) * dayType;
    let capMax = cap;
    shuffleArray(enemyList);
    let spawn = { time: t, enemies: {} };
    do {
      let enemy = enemyList.shift();
      let amount = getRandomInt(1, capMax + 1);
      if (cap - amount < 0) {
        amount = cap;
      }
      spawn.enemies[enemy] = amount;
      cap = cap - amount;
    } while (cap > 0 && enemyList.length > 0);
    dayOutput.spawns.push(spawn);
  }
  dayOutput.spawns.push({
    time: getRandomInt(6000, 8000),
    sundown: true,
  });
  return dayOutput;
}
