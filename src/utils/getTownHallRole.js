function getTownHallRole(townHallLevel) {
  return townHallLevel >= 13 && townHallLevel <= 20 ? `TH${townHallLevel}` : null;
}

module.exports = { getTownHallRole };