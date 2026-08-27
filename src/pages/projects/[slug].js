import Head from "next/head";
import { getAllSlugs, getEntryBySlug } from "@/lib/wordpress";

export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <section className="container py-16">
        <h1>Project not found</h1>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title.rendered}</title>
      </Head>

      <section className="container py-16">
        <h1>{project.title.rendered}</h1>

        {project.content?.rendered && (
          <div
            className="paragraph mt-6"
            dangerouslySetInnerHTML={{ __html: project.content.rendered }}
          />
        )}
      </section>
    </>
  );
}

export async function getStaticPaths() {
  let slugs = [];

  try {
    slugs = await getAllSlugs("project");
  } catch (error) {
    console.error("Error fetching project slugs:", error.message);
  }

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  let project = null;

  try {
    project = await getEntryBySlug("project", params.slug);
  } catch (error) {
    console.error("Error fetching project:", error.message);
  }

  if (!project) {
    return { notFound: true, revalidate: 3600 };
  }

  return {
    props: { project },
    revalidate: 3600,
  };
}
