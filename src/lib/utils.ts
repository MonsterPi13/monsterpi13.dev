import { PostItem } from "@/types/contentful";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks whether a given link is an external link by evaluating its href attribute.
 * If the href is empty or null, it is considered an internal link.
 * Otherwise, if the href does not start with '/' or '#', it is regarded as an external link.
 * @param href The href attribute value of the link to be checked.
 * @returns A boolean value indicating whether the link is an external link.
 */
export const isExternalLink = (href: string) => {
  if (!href) return false;
  return !href.startsWith("/") && !href.startsWith("#");
};

/**
 * Converts a given string to a dashed lowercase format.
 * This function replaces any occurrences of one or more consecutive spaces with a dash, and converts the resulting string to lowercase.
 * @param text The input text to be dasherized.
 * @returns The dasherized version of the input text.
 */
export const dasherize = (text: string) =>
  String(text).replace(/ +/g, "-").toLowerCase();

/**
 * Checks if the current environment is set to development mode.
 * The function compares the value of the `NODE_ENV` environment variable with 'development'.
 * @returns A boolean value indicating whether the current environment is set to development mode.
 */
export const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Sorts an array of blog post objects based on their date field (only for old blog posts) or publication dates in descending order.
 * The function compares the 'date' property of each post or 'firstPublishedAt' property from the 'sys' object.
 * The posts are sorted by creating Date objects from the publication dates and comparing them.
 * @param posts The array of blog post objects to be sorted.
 * @returns The sorted array of blog posts in descending order based on their publication dates.
 */
export const getSortedPosts = (posts: PostItem[]) => {
  return posts.sort((a, b) => {
    const dateA = a.date || a.sys.firstPublishedAt;
    const dateB = b.date || b.sys.firstPublishedAt;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
};

/**
 * Formats a given date string into a localized date representation based on the 'en-US' locale.
 * The resulting date format includes the full month name, two-digit day, and the numeric year.
 * e.g. 'June 23, 1992'
 * @param date The date string to be formatted.
 * @returns A localized date string representation formatted as 'Month Day, Year'.
 */
export const getDateTimeFormat = (date: string) => {
  const dateObj = new Date(date);
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dateObj);
};

/**
 * Initializes an instance of `Intl.NumberFormat` named `viewCountFormatter`
 * with the 'nl-NL' locale for formatting view counts.
 *
 * Example usage:
 * const count = 1000000;
 * const formattedCount = viewCountFormatter.format(count);
 * console.log(formattedCount); // Output: "1,000,000"
 */
export const viewCountFormatter = new Intl.NumberFormat("en-US");
