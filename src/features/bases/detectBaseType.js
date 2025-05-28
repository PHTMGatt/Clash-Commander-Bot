//src\features\bases\'detectBaseType.js'

function detectBaseType(messageContent) {
  const lower = messageContent.toLowerCase();
  const type = /cwl/.test(lower) ? 'cwl' :
               /legend/.test(lower) ? 'legend' :
               /war/.test(lower) ? 'war' : null;

  const style = /ring/.test(lower) ? 'ring' :
                /diamond/.test(lower) ? 'diamond' :
                /box/.test(lower) ? 'box' :
                /anti/.test(lower) ? 'anti-3' : 'unknown';

  const townHall = /th(1[3-9]|20)/.exec(lower)?.[0].toUpperCase() || null;

  return { type, style, townHall };
}

module.exports = { detectBaseType };
