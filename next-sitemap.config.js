/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.pick-a-ski.com',
    generateRobotsTxt: true, // (optional)
    i18n: {
      locales: ['en', 'nl', 'de', 'fr', 'pl', 'ja', 'es'], // List your locales here
      defaultLocale: 'en',
    },
    transform: async (config, path) => {
      // Correct the path for locale-specific URLs
      const correctedPath = path === '/' ? '' : path; // Adjusts root path correctly
    
      return {
        loc: `${config.siteUrl}${correctedPath}`, // Ensure the correct base URL
        changefreq: 'daily',
        priority: 0.7,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        

        alternateRefs: ["/nl", "/de", "/es", "/pl", "/ja", "/en", "/fr"].includes(path) ? [] : config.i18n.locales.map((locale) => {
          // dont add alternates for example.com/nl or example.com/en
          const href = `${config.siteUrl}/${locale}${correctedPath}`;
          return { href, hreflang: locale };
        }),
      }
    }
  }