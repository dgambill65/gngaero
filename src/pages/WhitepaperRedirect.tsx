import { useEffect } from "react";

/**
 * The old white paper used to be served as a static file at
 * /resources/fdt-hybrid-evtol-whitepaper.pdf. That document is superseded and the
 * current edition is handed out as a signed link from the Resources section, so
 * any lingering links land there instead of a 404.
 */
const WhitepaperRedirect = () => {
  useEffect(() => {
    window.location.replace("/#resources");
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <p className="text-muted-foreground text-center">
        This white paper has been updated.{" "}
        <a href="/#resources" className="text-primary underline">
          Get the current edition
        </a>
        .
      </p>
    </main>
  );
};

export default WhitepaperRedirect;
