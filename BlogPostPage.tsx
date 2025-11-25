import React from 'react';
import type { BlogPost } from '../types';

interface BlogPostPageProps {
    post: BlogPost;
    onBack: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
    return (
        <main className="flex-grow bg-white py-16 sm:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <button onClick={onBack} className="text-sm font-semibold text-primary-600 hover:text-primary-800">
                        &larr; Back to Blog
                    </button>
                </div>
                
                <article>
                    <header className="mb-8">
                         <div className="flex gap-2 mb-3">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-800">{tag}</span>
                            ))}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">{post.title}</h1>
                        <p className="mt-4 text-sm text-slate-500">
                            By {post.author} on {post.date}
                        </p>
                    </header>
                    
                    <div 
                        className="prose prose-lg prose-slate max-w-none prose-h2:font-bold prose-h2:text-slate-800 prose-a:text-primary-600 hover:prose-a:text-primary-800"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </main>
    );
};