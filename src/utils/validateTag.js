function validateTag(tag) {
  if (!tag) return null;
  return tag.toUpperCase().replace(/[^0289PYLQGRJCUV]/gi, '');
}

module.exports = { validateTag };