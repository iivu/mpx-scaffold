/* eslint-disable */
const baseProjectConfig = { tokenName: "TUBU-MINI-TOKEN" };

const projectConfig = {
  test: {
    ...baseProjectConfig,
    apiPrefix: "https://a2-mini.tanhegucheng.com/eggv2ctest",
    cdn: 'http://192.168.10.102:2220/',
  },
  prod: {
    ...baseProjectConfig,
    apiPrefix: "https://a2-mini.tanhegucheng.com/eggv2c",
    cdn: "https://img.tanhegucheng.com/iivu/egg-bus-c/",
  },
};

exports.projectConfig = projectConfig[process.env.APP_MODE || __APP_MODE__];
