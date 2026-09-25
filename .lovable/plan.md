# GnG Aero Video Library

## Scope
- Add a typed 19-item video catalog with slug lookup and path helpers.
- Build a filterable `/videos` library using the current site typography, colors, cards, header, and footer.
- Build `/videos/:slug` detail pages with YouTube, LinkedIn, or scheduled states, plus metadata, navigation, and calls to action.
- Add the two routes and link Videos from desktop navigation, mobile navigation, and the Resources section.
- Add the library and all 19 video pages to the sitemap and page index.
- Keep the white-paper flow, Supabase, Founder page, and all other sections unchanged. Do not publish.

## Behavior
- Library defaults to All and filters locally by Technical or Business, ordered Topic 1–19.
- Detail pages render a privacy-enhanced YouTube embed only when `youtubeId` exists, otherwise LinkedIn or scheduled messaging.
- Unknown slugs use the existing Not Found page.
- Video metadata updates per detail page; `VideoObject` structured data appears only for YouTube videos.

## Validation
- Check the current diagnostics after edits and resolve any build errors.
- Run the project typecheck/tests available for this scope.
- Verify `/videos`, a valid detail page, filtering, an unknown slug, and mobile layout in the preview.
- Confirm no publish action was taken.
