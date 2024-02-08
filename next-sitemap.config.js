/** @type {import('next-sitemap').IConfig} */

const siteUrl = 'https://www.pick-a-ski.com';
module.exports = {
  siteUrl: 'https://www.pick-a-ski.com',
  generateRobotsTxt: true, // Generate robots.txt
  sitemapSize: 7000, // Split sitemap into multiple files if you have more URLs
  outDir: './public', // Output directory for the generated sitemap files

  alternateRefs: [
    {
      href: `${siteUrl}/en`,
      hreflang: 'en',
    },
    {
      href: `${siteUrl}/fr`,
      hreflang: 'fr',
    },
    {
      href: `${siteUrl}/de`,
      hreflang: 'de',
    },
    {
      href: `${siteUrl}/es`,
      hreflang: 'es',
    },
    {
      href: `${siteUrl}/nl`,
      hreflang: 'nl',
    },
    {
      href: `${siteUrl}/pl`,
      hreflang: 'pl',
    },
    {
      href: `${siteUrl}/ja`,
      hreflang: 'ja',
    },
  ],
  transform: async (config, path) => {
    // Exclude certain paths
    if (["/nl", "/pl", "/ja", "/es", "/de", "/fr"].includes(path)) {
      return null;
    }
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
    // Rest of your transform function...
  },







/*
  transform: async (config, path) => {
    // Define your locales
    
    const locales = ['en', 'fr', 'de', 'es', 'nl', 'pl', 'ja'];
    let alternateRefs = locales.map(locale => ({
      href: `https://www.pick-a-ski.com/${locale}${path}`,
      hreflang: locale,
    }));
    if (["/nl", "/pl", "/ja", "/es", "/de", "/fr"].includes(path)) {
      alternateRefs = []
    }

    return {
      loc: path, // Original path
      alternateRefs, // Alternate references for different locales
    };
  },
*/
  // Additional options can be defined here, such as `exclude` to omit certain paths
  exclude: ['/404', '/404.html'], // Example of excluding specific paths
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      // If you have additional sitemaps (e.g., dynamic sitemaps), list them here
      `${siteUrl}/sitemap.xml`, // Main sitemap
      // Example: `${siteUrl}/server-sitemap.xml`, // If you have a server-generated sitemap
    ],
  },
};