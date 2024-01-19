/**
 * Converts a category name to a display name ("PUMPS" --> "Pumps").
 * Replaces underscores with spaces, converts to lowercase, and capitalizes the first letter of each word.
 * @param categoryName - The category name to convert.
 * @returns The converted display name.
 */
function ValueAsSentenceCase(categoryName?: string) {
  if (!categoryName) {
    return "";
  }

  return categoryName
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
}

export default ValueAsSentenceCase;
