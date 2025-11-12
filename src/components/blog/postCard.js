import Link from 'next/link';
import { formatDate } from './postHeader';

export default function PostCard({ post }) {
  if (!post || !post.frontMatter) {
    return null;
  }

  const { title, date, excerpt, readTime, tags } = post.frontMatter;

  return (
    <PostContainer>
      <Link href={`/blog/${post.slug}`}>
      
          <PostTitle title={title} />

          <div className='flex flex-wrap gap-2 mb-4 items-center text-zinc-200'>
          {date && <PostDate date={date} />}
          <span className='leading-none'>•</span>
          {readTime && <PostReadTime readTime={readTime} />}
          </div>

          {excerpt && <PostExcerpt excerpt={excerpt} />}
          {tags && <PostTags tags={tags} />}
          <ReadMore />
      </Link>
    </PostContainer>
  );
}

function PostContainer({ children }) {
  return (
    <article className="p-6 h-fit mb-4 rounded-xl bg-white/5 backdrop-blur-md backdrop-saturate-125 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 text-left hover:scale-102 hover:cursor-pointer">
      {children}
    </article>
  );
}

function PostReadTime({ readTime }) {
  return (
      <span className="text-sm italic bg-zinc-500/20 px-2 py-1 rounded-full">{readTime} de lectura</span>
  );
}

export function PostTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      {tags.map((tag) => (
        <span key={tag} className="text-xs bg-blue-600/50 text-white px-2 py-1 rounded-full">
          {tag}
        </span>
      ))}
    </div>
  );
}


function PostTitle({ title }) {
  return (
    <h3 className='text-2xl lg:text-4xl  font-semibold lg:line-clamp-1 mb-3 line-clamp-2'>{title}</h3>
  );
}

function PostDate({ date }) {
  return (
    <time className='italic text-sm'>{formatDate(date)}</time>
  );
}

function PostExcerpt({ excerpt }) {
  return (
    <p className='mb-4'>{excerpt}</p>
  );
}
function ReadMore() {
  return (
    <p className='text-blue-400 border border-blue-400 rounded-md px-2 py-1 inline-block hover:bg-white/5'>Leer más →</p>
  );
}