/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: "egg-cors",
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
