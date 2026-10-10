import { getAllPostsData } from '../../../lib/posts';
import { getReadingPaths } from '../../../lib/readingPaths';
import { getEnglishPosts } from '../../../lib/translations';
import TrackedLink from './TrackedLink';

export default function ReadingPaths({ detailed = false, language = "es" }) {
  const english = language === "en";
  const translations = new Map(getEnglishPosts().map(post => [post.sourceSlug, post]));
  const labels = { aprender: ["Learn to program", "Choose your tools, learn the fundamentals and finish your first project."], trabajo: ["Find a developer job", "Build a portfolio you can explain and prepare for interviews."], ia: ["Program with AI", "Use AI to build while developing your own judgment and skills."] };
  const routes = getReadingPaths(getAllPostsData()).map(route => english ? { ...route, title: labels[route.id][0], description: labels[route.id][1], posts: route.posts.map(post => translations.get(post.slug)).filter(Boolean) } : route);
  return (
    <section id="rutas" aria-labelledby="rutas-title" className="py-12 text-left scroll-mt-24">
      <h2 id="rutas-title" className="text-3xl font-bold text-zinc-100 mb-4">{english ? "Choose your next step" : "Elige tu siguiente paso"}</h2>
      <p className="text-zinc-400 mb-8">{english ? "Follow a sequence of guides toward a concrete goal." : "Guías en orden para avanzar hacia un objetivo concreto."}</p>
      <div className="grid gap-6 md:grid-cols-3">
        {routes.map((route) => (
          <div key={route.id} id={route.id} className="glass-card rounded-2xl p-6 scroll-mt-24">
            <h3 className="text-xl font-semibold text-white mb-3">{route.title}</h3>
            <p className="text-zinc-400 mb-5">{route.description}</p>
            {detailed ? (
              <ol className="list-decimal pl-5 space-y-4 text-blue-300">
                {route.posts.map((post) => (
                  <li key={post.slug}>
                    <TrackedLink href={`${english ? "/en" : "/blog"}/${post.slug}`} eventName="reading_path_article" eventLabel={route.id} className="hover:text-white underline underline-offset-4">
                      {post.frontMatter.title}
                    </TrackedLink>
                  </li>
                ))}
              </ol>
            ) : (
              <TrackedLink href={`${english ? "/en/start-here" : "/empieza-aqui"}#${route.id}`} eventName="reading_path_select" eventLabel={route.id} className="text-blue-300 hover:text-white font-medium">
                {english ? "Explore the path" : "Ver la ruta"} <span aria-hidden>→</span>
              </TrackedLink>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
