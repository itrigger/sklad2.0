module.exports = {
  siteMetadata: {
    siteUrl: "https://in.sushihiro.kz/",
    title: "Заявка на склад Суши Хиро",
    author: `Konstantin Moroz`,
    description: "Сервис для отправки заявки на продукты на склад Суши Хиро",
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-vanilla-extract",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Внутренни портал Суши Хиро",
        short_name: "Суши Хиро",
        start_url: "/",
        // These can be imported once ESM support lands
        background_color: "#ffffff",
        theme_color: "#E63B30",
        icon: "src/assets/images/favicon.png",
      },
    },
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://api.sushihiro.kz/graphql'
      }
    }
  ],
}
