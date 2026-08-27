/**
 * Wraps every page. Add your shared UI here — Header, Footer, nav, etc.
 * Each page renders its own <main>, so keep this a neutral wrapper.
 */
export default function Layout({ children }) {
  return (
    <>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
