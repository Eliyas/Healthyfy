const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => {
        console.log(ext);
        return ext !== 'svg' || ext !== 'js'
    }),
      sourceExts: [...sourceExts, 'svg', 'js'],
    },
  };
})();