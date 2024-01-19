import { Document } from "@contentful/rich-text-types";

export interface SlugPageRes {
  title: string;
  slug: string;
  content: {
    json: Document;
    links: Record<string, any>;
  };
}
