import React from 'react';
import type { BlogPost } from './types';

interface BlogPageProps {
    posts: BlogPost[];
    onSelectPost: (postId: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost }) => {
    return (
        <main className="flex-grow bg-white">
            {/* Hero Section */}
            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
                        The White-Label Wonder Blog
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Insights, strategies, and technical deep-dives for agencies looking to scale with white-label solutions.
                    </p>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <article key={post.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                <div className="p-6 flex-grow">
                                    <div className="flex gap-2 mb-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 text-xs font-semibold rounded-md bg-primary-100 text-primary-800">{tag}</span>
                                        ))}
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800 hover:text-primary-600">
                                        <button onClick={() => onSelectPost(post.id)} className="text-left">{post.title}</button>
                                    </h2>
                                    <p className="mt-3 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
                                </div>
                                <footer className="p-6 bg-slate-50 rounded-b-xl border-t border-slate-200 mt-auto">
                                     <div className="flex items-center justify-between">
                                        <div className="text-xs text-slate-500">
                                            <p className="font-semibold">{post.author}</p>
                                            <p>{post.date}</p>
                                        </div>
                                        <button onClick={() => onSelectPost(post.id)} className="text-sm font-semibold text-primary-600 hover:text-primary-800">
                                            Read More &rarr;
                                        </button>
                                    </div>
                                </footer>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};