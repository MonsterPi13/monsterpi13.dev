import Markdown from "markdown-to-jsx";

import type { MarkdownToJSX } from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import { TweetCard } from "./tweet-card/tweet-card";

interface MarkdownRendererProps {
  options?: MarkdownToJSX.Options;
  children: string;
  [key: string]: any;
}

const MarkdownRenderer = ({ options, ...rest }: MarkdownRendererProps) => {
  return (
    <Markdown
      options={{
        ...options,
        overrides: {
          a: ({ className, ...rest }) => <Link {...rest} />,
          p: ({ children }) => <p className="mb-2 text-sm">{children}</p>,
          img: ({ alt, src }) => (
            <span className="mt-2 block overflow-hidden rounded0xl border">
              <Image
                src={`https:${src}`}
                alt={alt}
                width={400}
                height={300}
                loading="lazy"
                className="aspect-auto w-full animate-reveal object-cover"
              />
            </span>
          ),
          tweet: ({ id }) => <TweetCard id={id} />,
        },
      }}
      {...rest}
    />
  );
};

export default MarkdownRenderer;
