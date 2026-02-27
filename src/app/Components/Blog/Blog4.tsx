import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
  comments?: number;
  slug?: string;
  excerpt?: string;
}

interface Blog4Props {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const Blog4: React.FC<Blog4Props> = ({ blogs, loading, error }) => {
  const [blogsWithImages, setBlogsWithImages] = useState<Blog[]>([]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const updatedBlogs = blogs.map((blog) => ({
        ...blog,
        image: `${blog.image}`
      }));
      setBlogsWithImages(updatedBlogs);
    }
  }, [blogs]);

  if (loading) {
    return (
      <section className="agenko-blog-grid pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading blogs...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="agenko-blog-grid pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blogsWithImages || blogsWithImages.length === 0) {
    return (
      <section className="agenko-blog-grid pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>No blogs available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="agenko-blog-grid pt-130 pb-80">
      <div className="container">
        <div className="row">
          {blogsWithImages.map((blog) => (
            <div key={blog.id} className="col-xl-4 col-md-6 col-sm-12">
              <div className="agenko-blog-item style-four mb-40 pf_fadeup">
                <div className="post-thumbnail">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    title={blog.title}
                    width={414} 
                    height={323} 
                  />
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span><i className="bi bi-person"></i>{blog.author || 'Wise Code'}</span>
                    <span><i className="bi bi-calendar-fill"></i>{blog.date || new Date().toLocaleDateString()}</span>
                    <span><i className="bi bi-chat"></i>{blog.comments || 0} Comments</span>
                  </div>
                  <h4 className="title">
                    <Link href={`/blog/${blog.slug || blog.id}`}>
                      {blog.title}
                    </Link>
                  </h4>
                  <p>{blog.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog4;