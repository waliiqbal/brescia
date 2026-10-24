import sanitizeHtml from "sanitize-html";

/**
 * Cleans HTML written in the admin editor before it is saved. Article text is
 * shown on the public site as HTML, so anything outside this list (scripts,
 * event handlers, outside images, iframes...) is removed.
 */
export function sanitizeArticleHtml(html: string) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;

  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "em", "u", "s", "h2", "h3", "ul", "ol", "li",
      "blockquote", "a", "img", "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
    exclusiveFilter: (frame) =>
      frame.tag === "img" &&
      !(cloud && frame.attribs.src?.startsWith(`https://res.cloudinary.com/${cloud}/`)),
  }).trim();
}

/** Plain text of some HTML, used to check an article is not empty. */
export function htmlToText(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}
