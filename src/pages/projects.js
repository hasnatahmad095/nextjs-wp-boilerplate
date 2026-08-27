import Head from "next/head";
import Link from "next/link";
import { getEntries, getPageById } from "@/lib/wordpress";

// The WordPress page ID for the Projects landing page (optional — used to pull
// a curated list from an ACF field). Falls back to all published projects.
const PROJECTS_PAGE_ID =
  process.env.NEXT_PUBLIC_PROJECTS_PAGE_ID || "YOUR_PROJECTS_PAGE_ID";

export default function Projects({ page, projects }) {
  const title = page?.title?.rendered || "Projects";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <section className="container py-16">
        <h1>{title}</h1>

        {projects.length === 0 ? (
          <p className="mt-6">
            No projects found. Connect WordPress and register a{" "}
            <code>project</code> post type to see content here.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {projects.map((project) => (
              <li key={project.id}>
                <Link href={`/projects/${project.slug}`}>
                  <h3>{project.title.rendered}</h3>
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
  let projects = [];

  try {
    page = await getPageById(PROJECTS_PAGE_ID);
  } catch (error) {
    console.error("Error fetching projects page:", error.message);
  }

  try {
    // Option A: a curated list from an ACF relationship field (array of objects
    // with an `ID`). Option B (fallback): every published `project`.
    const acfProjects = page?.acf?.project_posts || [];
    const ids = acfProjects
      .map((item) => item.ID)
      .filter(Boolean)
      .join(",");

    projects = await getEntries(
      "project",
      ids ? { include: ids } : { per_page: 100 }
    );
  } catch (error) {
    console.error("Error fetching projects:", error.message);
  }

  return {
    props: { page, projects },
    revalidate: 3600,
  };
}
