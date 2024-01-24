import { Document } from "@contentful/rich-text-types";

export interface SlugPageRes {
  title: string;
  slug: string;
  content: {
    json: Document;
    links: Record<string, any>;
  };
}

export interface ContentfulImage {
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
}

export interface LogbookRawItem {
  title: string;
  date: string;
  description: string;
  image: null | ContentfulImage;
}

export interface PostItem {
  slug: string;
  title: string;
  content: string;
  date: string;
  sys: {
    id: string;
    firstPublishedAt: string;
    publishedAt: string;
  };
}

export interface ViewItem {
  slug: string;
  view_count: number;
}
