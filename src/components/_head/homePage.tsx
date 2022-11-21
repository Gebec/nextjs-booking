import Head from 'next/head'

export const IndexHead = () => {
  return (
    <Head>
      <title>Najděte si karavan</title>
      <meta name="title" content="Najděte si karavan" />
      <meta name="description" content="Najděte, zarezervujte, vyzvedněte si karavan, se kterým můžete objevit celý svět." />

      <meta property="og:title" content="Najděte si karavan" />
      <meta property="og:site_name" content="Let's get a caravan" />
      <meta property="og:url" content="https://lets-get-a.caravan" />
      <meta property="og:description" content="Najděte, zarezervujte, vyzvedněte si karavan, se kterým můžete objevit celý svět." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.campiri.com/static/images/og_image_campiri_main.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://lets-get-a.caravan" />
      <meta property="twitter:title" content="Najděte si karavan" />
      <meta property="twitter:description" content="Najděte, zarezervujte, vyzvedněte si karavan, se kterým můžete objevit celý svět." />
      <meta property="twitter:image" content="https://www.campiri.com/static/images/og_image_campiri_main.png" />
    </Head>
  )
}
