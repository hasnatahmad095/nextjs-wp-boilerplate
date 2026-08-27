import Head from "next/head";
import { getAllSlugs, getEntryBySlug } from "@/lib/wordpress";

export default function RegionDetail({ region }) {
  if (!region) {
    return (
      <section className="container py-16">
        <h1>Region not found</h1>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{region.title.rendered}</title>
      </Head>

      <section className="container py-16">
        <h1>{region.title.rendered}</h1>

        {region.content?.rendered && (
          <div
            className="paragraph mt-6"
            dangerouslySetInnerHTML={{ __html: region.content.rendered }}
          />
        )}
      </section>
    </>
  );
}

export async function getStaticPaths() {
  let slugs = [];

  try {
    slugs = await getAllSlugs("region");
  } catch (error) {
    console.error("Error fetching region slugs:", error.message);
  }

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  let region = null;

  try {
    region = await getEntryBySlug("region", params.slug);
  } catch (error) {
    console.error("Error fetching region:", error.message);
  }

  if (!region) {
    return { notFound: true, revalidate: 3600 };
  }

  return {
    props: { region },
    revalidate: 3600,
  };
}
