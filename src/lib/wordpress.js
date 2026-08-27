import axios from "axios";

/**
 * Base URL of your WordPress install, e.g. https://cms.example.com
 * Configure it in `.env.local` (see `.env.example`).
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn(
    "[wordpress] NEXT_PUBLIC_API_BASE_URL is not set. " +
      "Requests will fail until you configure it in .env.local (see .env.example)."
  );
}

/** Pre-configured axios instance pointed at the WP REST API v2 root. */
export const wp = axios.create({
  baseURL: `${API_BASE_URL ?? ""}/wp-json/wp/v2`,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/**
 * Fetch a single page by its numeric ID.
 * @param {number|string} id
 */
export async function getPageById(id) {
  const { data } = await wp.get(`/pages/${id}`);
  return data;
}

/**
 * Fetch a list of entries for any post type (`posts`, `pages`, or a custom
 * post type such as `project` / `region`).
 * @param {string} type    REST base of the post type (e.g. "project")
 * @param {object} params  Query params (e.g. { per_page: 100, include: "1,2" })
 */
export async function getEntries(type, params = {}) {
  const { data } = await wp.get(`/${type}`, { params });
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch a single entry of a post type by its slug.
 * @param {string} type
 * @param {string} slug
 */
export async function getEntryBySlug(type, slug) {
  const { data } = await wp.get(`/${type}`, { params: { slug } });
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

/**
 * Fetch every slug for a post type — handy for `getStaticPaths`.
 * Note: WordPress caps `per_page` at 100; add pagination for larger sites.
 * @param {string} type
 */
export async function getAllSlugs(type) {
  const entries = await getEntries(type, { per_page: 100, _fields: "slug" });
  return entries.map((entry) => entry.slug).filter(Boolean);
}
