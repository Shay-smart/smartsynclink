import Link from "next/link";
import type { BlogContent } from "@/content/blog";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { NewsletterForm } from "../newsletter-form";
import { Media } from "../ui";

/**
 * The pieces the two blog pages share.
 *
 * They live together because the same row appears in three sizes across the
 * design — a wide featured row, a compact sidebar line, a card in the related
 * grid — and keeping them in one file makes the differences easy to see.
 */

/** "admin | January 3, 2025" — the byline that sits above every title. */
export function Byline({
  post,
  byline,
  className = "",
}: {
  post: Post;
  byline: string;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-2.5 text-[13px] text-muted ${className}`}>
      <span>{byline}</span>
      <span aria-hidden="true" className="text-line">|</span>
      {post.published_at ? (
        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
      ) : null}
    </p>
  );
}

/** The blue pill link that closes every article summary. */
export function ReadLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#052EFF] to-[#3300EA] px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 ${className}`}
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

/** Featured column: image left, everything else right. */
export function FeaturedRow({
  post,
  blog,
}: {
  post: Post;
  blog: BlogContent;
}) {
  return (
    <article className="grid gap-6 sm:grid-cols-[220px_1fr] sm:items-start">
      <Link href={`/blog/${post.slug}`} className="block">
        <Media
          image={{ src: post.cover, alt: post.title }}
          variant="plain"
          sizes="(max-width: 640px) 100vw, 220px"
          className="aspect-4/3 w-full rounded-[10px]"
        />
      </Link>

      <div className="flex flex-col items-start">
        <Byline post={post} byline={blog.byline} />
        <h3 className="mt-2.5 text-[19px] font-medium leading-[1.35] tracking-[-0.01em] text-ink">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        {post.excerpt ? (
          <p className="mt-2.5 line-clamp-3 text-[14px] leading-[1.6] text-[#1E1E1E]">
            {post.excerpt}
          </p>
        ) : null}
        <ReadLink
          href={`/blog/${post.slug}`}
          label={blog.readLabel}
          className="mt-5"
        />
      </div>
    </article>
  );
}

/** Sidebar: a thumbnail and two lines, nothing else. */
export function RecentRow({ post, byline }: { post: Post; byline: string }) {
  return (
    <article className="grid grid-cols-[74px_1fr] items-start gap-3.5">
      <Link href={`/blog/${post.slug}`} className="block">
        <Media
          image={{ src: post.cover, alt: post.title }}
          variant="plain"
          sizes="74px"
          className="aspect-4/3 w-full rounded-[8px]"
        />
      </Link>
      <div>
        <Byline post={post} byline={byline} className="text-[11px]" />
        <h3 className="mt-1 line-clamp-2 text-[13px] font-medium leading-[1.4] text-ink">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

/** The related grid, and the single larger card in the sidebar. */
export function PostCard({ post, blog }: { post: Post; blog: BlogContent }) {
  return (
    <article className="flex flex-col items-start">
      <Link href={`/blog/${post.slug}`} className="block w-full">
        <Media
          image={{ src: post.cover, alt: post.title }}
          variant="plain"
          sizes="(max-width: 768px) 100vw, 380px"
          className="aspect-16/10 w-full rounded-[10px]"
        />
      </Link>
      <Byline post={post} byline={blog.byline} className="mt-4" />
      <h3 className="mt-2 text-[17px] font-medium leading-[1.35] tracking-[-0.01em] text-ink">
        <Link href={`/blog/${post.slug}`} className="hover:text-brand">
          {post.title}
        </Link>
      </h3>
      {post.excerpt ? (
        <p className="mt-2 line-clamp-3 text-[13.5px] leading-[1.6] text-[#1E1E1E]">
          {post.excerpt}
        </p>
      ) : null}
      <ReadLink
        href={`/blog/${post.slug}`}
        label={blog.readLabel}
        className="mt-5"
      />
    </article>
  );
}

/**
 * A column label.
 *
 * The rule underneath belongs to the heads that sit above a list — Featured
 * Article, Recent post, Related blog post. Search and Newsletter label a
 * single box and carry no rule in the design.
 */
export function ColumnHead({
  children,
  rule = true,
}: {
  children: React.ReactNode;
  rule?: boolean;
}) {
  return (
    <h2
      className={`text-[15px] font-medium text-ink ${
        rule ? "border-b border-line pb-3" : ""
      }`}
    >
      {children}
    </h2>
  );
}

/* ---------------------------------------------------------------------------
   The /blog index tiles.

   Measured off the reference: a 560×315 cover (16:9) with no radius of its
   own, the card clipping it, then 12/20/20 of padding around a 20/28 bold
   title and the date. The whole card is one link — the design gives it no
   separate "read more", so anything less than the full surface would be a
   smaller hit area than it looks.
--------------------------------------------------------------------------- */

export function PostTile({ post }: { post: Post }) {
  return (
    <article className="overflow-hidden rounded-[10px] bg-surface">
      <Link href={`/blog/${post.slug}`} className="group block">
        <Media
          image={{ src: post.cover, alt: post.title }}
          variant="plain"
          sizes="(max-width: 900px) 100vw, 560px"
          className="aspect-16/9 w-full rounded-none"
        />
        <div className="px-5 pt-3 pb-5">
          <h2 className="blog-heading text-[20px] leading-[28px] text-ink transition-colors group-hover:text-brand">
            {post.title}
          </h2>
          {post.published_at ? (
            <time
              dateTime={post.published_at}
              className="mt-3 block text-[16px] leading-[24px] text-muted"
            >
              {formatDate(post.published_at)}
            </time>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

/**
 * The band that splits the grid in half.
 *
 * Full bleed colour, 1160 of content inside it — the copy and form sit left,
 * the artwork right. With no artwork uploaded the text simply keeps its
 * column rather than stretching across the band, so the band still reads as
 * designed instead of as a wide empty stripe.
 */
export function NewsletterBand({ blog }: { blog: BlogContent }) {
  const n = blog.newsletter;
  return (
    <section className="mt-16 bg-brand-soft">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 py-12 md:grid-cols-2">
        <div>
          <h2 className="blog-heading text-[32px] leading-[40px] text-ink">
            {n.heading}
          </h2>
          <p className="mt-2 max-w-[38ch] text-[16px] leading-[24px] text-muted">
            {n.body}
          </p>

          {/* into GHL as a contact tagged newsletter + newsletter-blog */}
          <NewsletterForm
            where="blog"
            size="lg"
            namePlaceholder={n.namePlaceholder}
            emailPlaceholder={n.placeholder}
            cta={n.cta}
            success={n.success}
            className="mt-6 w-full max-w-[360px]"
          />

          <p className="mt-3 text-[16px] leading-[24px] text-muted">
            {n.note}{" "}
            <a href={n.noteLink.href} className="text-brand underline">
              {n.noteLink.label}
            </a>
          </p>
        </div>

        {n.image?.src ? (
          <Media
            image={n.image}
            variant="plain"
            sizes="(max-width: 768px) 100vw, 560px"
            className="aspect-16/10 w-full rounded-none"
          />
        ) : null}
      </div>
    </section>
  );
}
