module.exports = {
   publicPath: "/DnDSheet/",
   pwa: {
      themeColor: "#333333",
      msTileColor: "#333333",
      appleMobileWebAppCache: "yes",
      manifestOptions: {
         start_url: "/DnDSheet/",
         icons: [
            {
               src: "./img/icons/favicon-256x256.png",
               type: "image/png",
               sizes: "256x256",
            },
         ],
      },
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
         swSrc: "src/sw.js",
      },
   },
};
