// src/features/bases/'parseBase.js'

module.exports.parseBaseMessage = (content) => {
  const linkMatch = content.match(/https:\/\/link\.clashofclans\.com\/en\/\?action=OpenLayout&id=[\w%-]+/);
  if (!linkMatch) return null;

  const link = linkMatch[0];

  const thMatch = content.match(/TH(\d{2})/i);
  const townHall = thMatch ? `TH${thMatch[1]}` : 'TH15';

  const typeMatch = content.match(/(war|cwl|legend)/i);
  const baseType = typeMatch ? typeMatch[1].toLowerCase() : 'war';

  const layoutMatch = content.match(/(box|ring|diamond|symmetrical|asymmetrical)/i);
  const layoutStyle = layoutMatch ? layoutMatch[1].toLowerCase() : 'unspecified';

  return {
    link,
    townHall,
    baseType,
    layoutStyle
  };
};
