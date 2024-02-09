import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    // Access the locale from the context
    const locale = ctx.locale || 'en'; // Fallback to 'en' if locale is not available

    return { ...initialProps, locale };
  }

  render() {
    // Use the locale for setting the `lang` attribute
    const { locale } = this.props as any; // Cast to any to access custom props

    return (
      <Html lang={locale}>
        <Head />
        <body>
          <noscript dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N39BC53F"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;