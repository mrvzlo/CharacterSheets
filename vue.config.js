module.exports = {
   publicPath: process.env.NODE_ENV === "production" ? "/DnDSheet/" : "/",
   pwa: {
      themeColor: "#333333",
      msTileColor: "#333333",
      appleMobileWebAppCache: "yes",
      manifestOptions: {
         start_url: "/DnDSheet/",
         icons: [
            {
               src: "./favicon-1.png",
               type: "image/png",
               sizes: "256x256",
            },
         ],
      },
      workboxOptions: {
         exclude: [/_config.yml/],
      },
   },
};
