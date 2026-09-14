# AGENTS.md

Repository conventions for AI coding agents and human contributors.

## Website content conventions

Resource entries in `website/content/resources/_index.md` that link to
a video must embed the player inline using the `{{< rawhtml >}}`
shortcode with an `<iframe>` when the hosting platform exposes an
embed URL (for example, YouTube `/embed/` or Google Drive `/preview`).
Entries that link to articles or to media with no embeddable player
may omit the embed.
