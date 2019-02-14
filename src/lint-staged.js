const config = {
  '*.{ts,tsx,js,jsx}': 'dev-core lint',
}

function getLintStagedConfig() {
  return config
}

module.exports = {
  getLintStagedConfig,
}
