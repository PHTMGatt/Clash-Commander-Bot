function parseBaseMessage(content) {
  const linkMatch = content.match(/https:\/\/link\.clashofclans\.com\/en\?action=CopyLayout.*?(?=\s|$)/);
  if (!linkMatch) return null;

  const lower = content.toLowerCase();

  const thMatch = lower.match(/th\s?(\d{1,2})/);
  const townHall = thMatch ? `TH${thMatch[1]}` : 'TH-Unknown';

  const type = /cwl|war|legend/.exec(lower);
  const baseType = type ? type[0] : 'general';

  let layoutStyle = 'unspecified';
  if (lower.includes('box')) layoutStyle = 'box';
  else if (lower.includes('ring')) layoutStyle = 'ring';
  else if (lower.includes('diamond')) layoutStyle = 'diamond';
  else if (lower.includes('symmetrical')) layoutStyle = 'symmetrical';
  else if (lower.includes('asymmetrical')) layoutStyle = 'asymmetrical';

  return {
    townHall,
    baseType,
    layoutStyle,
    link: linkMatch[0]
  };
}

module.exports = { parseBaseMessage };
