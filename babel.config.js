module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
    //   plugins: ['nativewind/babel'], // 👈 Aqui é o que importa
    };
  };
  