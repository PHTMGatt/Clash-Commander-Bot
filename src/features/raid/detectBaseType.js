// src/features/raid/detectBaseType.js

/**
 * Attempts to classify a base link into a layout type
 * (box, diamond, island, ring, anti-2, anti-3, teaser, unknown)
 */

function detectBaseType(link) {
  const lower = link.toLowerCase();

  if (lower.includes('ring')) return 'Ring';
  if (lower.includes('box')) return 'Box';
  if (lower.includes('diamond')) return 'Diamond';
  if (lower.includes('island')) return 'Island';
  if (lower.includes('teaser')) return 'Teaser';
  if (lower.includes('anti2')) return 'Anti-2 Star';
  if (lower.includes('anti3')) return 'Anti-3 Star';
  if (lower.includes('symmetrical')) return 'Symmetrical';

  return 'Unknown';
}

module.exports = detectBaseType;
