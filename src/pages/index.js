import Head from "next/head";
import { getPageById } from "@/lib/wordpress";

// The WordPress page ID to use as the home page.
// Set NEXT_PUBLIC_HOME_PAGE_ID in .env.local, or replace the fallback below.
const HOME_PAGE_ID =
  process.env.NEXT_PUBLIC_HOME_PAGE_ID || "YOUR_HOME_PAGE_ID";

export default function Home({ page }) {
  const title = page?.title?.rendered || "Next.js + Headless WordPress";

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="A Next.js headless WordPress boilerplate powered by the REST API."
        />
      </Head>

      <section className="container py-16">
        <h1>{title}</h1>

        {page?.content?.rendered ? (
          <div
            className="paragraph mt-6"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        ) : (
          <p className="mt-6">
            Set <code>NEXT_PUBLIC_API_BASE_URL</code> and your page ID to load
            content from WordPress.
          </p>
        )}
      </section>
    </>
  );
}

export async function getStaticProps() {
  let page = null;

  try {
    page = await getPageById(HOME_PAGE_ID);
  } catch (error) {
    console.error("Error fetching home page:", error.message);
  }

  return {
    props: { page },
    revalidate: 3600, // Incremental Static Regeneration: rebuild at most hourly.
  };
}
