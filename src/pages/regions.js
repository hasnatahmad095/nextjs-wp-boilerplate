import Head from "next/head";
import Link from "next/link";
import { getEntries, getPageById } from "@/lib/wordpress";

// The WordPress page ID for the Regions landing page (optional — used to pull a
// curated list from an ACF field). Falls back to all published regions.
const REGIONS_PAGE_ID =
  process.env.NEXT_PUBLIC_REGIONS_PAGE_ID || "YOUR_REGIONS_PAGE_ID";

export default function Regions({ page, regions }) {
  const title = page?.title?.rendered || "Regions";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <section className="container py-16 md:py-36">
        <h1>{title}</h1>

        {regions.length === 0 ? (
          <p className="mt-6">
            No regions found. Connect WordPress and register a{" "}
            <code>region</code> post type to see content here.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {regions.map((region) => (
              <li key={region.id}>
                <Link href={`/regions/${region.slug}`}>
                  <h3>{region.title.rendered}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export async function getStaticProps() {
  let page = null;
  let regions = [];

  try {
    page = await getPageById(REGIONS_PAGE_ID);
  } catch (error) {
    console.error("Error fetching regions page:", error.message);
  }

  try {
    // ACF `all_regions` is expected to be an array of region IDs.
    const ids = (page?.acf?.all_regions || []).filter(Boolean).join(",");

    regions = await getEntries(
      "region",
      ids ? { include: ids } : { per_page: 100 }
    );
  } catch (error) {
    console.error("Error fetching regions:", error.message);
  }

  return {
    props: { page, regions },
    revalidate: 3600,
  };
}
