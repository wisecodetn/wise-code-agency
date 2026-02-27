"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

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
  tags?: string[];
  category?: string;
}

interface BlogDetailsProps {
  blog: Blog;
}

const BlogDetails = ({ blog }: BlogDetailsProps) => {
  const [blogWithImage, setBlogWithImage] = useState<Blog>(blog);

  useEffect(() => {
    // For static data, use the image as-is since we're providing local paths
    setBlogWithImage({
      ...blog,
      image: blog.image || "/assets/images/pages/blog/blog-single1.jpg",
    });
  }, [blog]);

  // Social sharing functions
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(blog.title)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `${blog.title} - ${blog.excerpt || 'Check out this amazing blog post!'}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}&summary=${encodeURIComponent(blog.excerpt || 'Check out this amazing blog post!')}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we'll copy the link to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard! You can now share it on Instagram.');
  };

  const shareOnWhatsApp = () => {
    const text = `${blog.title}\n${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="agenko-blog-detils pt-130 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="blog-details-wrapper">
              <div className="agenko-post-item pf_fadeup">
                <div className="main-post">
                  <div className="post-thumbnail">
                    <Image
                      src={
                        blogWithImage.image ||
                        "/assets/images/pages/blog/blog-single1.jpg"
                      }
                      alt={blog.title}
                      width={777}
                      height={605}
                    />
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span>
                        <i className="bi bi-person"></i>
                        {blog.author || "Wise Code Team"}
                      </span>
                      <span>
                        <i className="bi bi-calendar-fill"></i>
                        {blog.date || new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="post-title">{blog.title}</h4>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                   
                    <blockquote>
                      <div className="icon">
                        <i className="flaticon-inverted-commas"></i>
                      </div>
                      <h4>
                        Wise Code Agency transformed our business with their
                        innovative strategies and dedicated support. Their team
                        understood{" "}
                      </h4>
                     
                    </blockquote>
                   
                  </div>
                </div>
                <div className="entry-footer wow fadeInUp">
                  <div className="tag-links">
                    <span>Tag:</span>
                    {blog.tags?.map((tag, index) => (
                      <a key={index} href="#">
                        {tag}
                      </a>
                    )) || <a href="#">Design</a>}
                  </div>
                  <div className="social-share">
                    <span>share:</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); shareOnFacebook(); }}>
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); shareOnTwitter(); }}>
                      <i className="bi bi-twitter-x"></i>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); shareOnLinkedIn(); }}>
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); shareOnInstagram(); }}>
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); shareOnWhatsApp(); }}>
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div> 
            </div>
          </div>
          <div className="col-xl-4">
            <div className="sidebar-widget-area">
              <div className="sidebar-widget sidebar-search-widget mb-30 pf_fadeup">
                <div className="widget-content">
                  <h4 className="sidebar-title">Search</h4>
                  <form>
                    <div className="form-group">
                      <input
                        type="search"
                        className="form_control"
                        placeholder="Search here..."
                        name="search"
                        required
                      />
                      <button className="search-btn">
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="sidebar-widget sidebar-category-widget mb-30 pf_fadeup">
                <div className="widget-content">
                  <h4 className="sidebar-title">Categories</h4>
                  <ul className="widget-nav">
                    <li>
                      <a href="#">
                        Creative Agency <span>(05)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Modern Agency <span>(03)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Business <span>(06)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Marketing <span>(08)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Video Tutorial <span>(10)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Design Agency <span>(12)</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sidebar-widget sidebar-post-widget mb-30 pf_fadeup">
                <div className="widget-content">
                  <h4 className="sidebar-title">Recent Post</h4>
                  <ul className="recent-post-list">
                    <li className="post-thumbnail-content">
                      <Image
                        src="/assets/images/pages/blog/post-thumb1.jpg"
                        alt="img"
                        width={100}
                        height={110}
                      />
                      <div className="post-title-date">
                        <span>
                          <a href="#">Website</a>
                        </span>
                        <h6>
                          <a href="#">
                            Flavorful Fusion: Exploring the Art of culinary
                            blending
                          </a>
                        </h6>
                      </div>
                    </li>
                    <li className="post-thumbnail-content">
                      <Image
                        src="/assets/images/pages/blog/post-thumb2.jpg"
                        alt="img"
                        width={100}
                        height={110}
                      />
                      <div className="post-title-date">
                        <span>
                          <a href="#">Dashboard</a>
                        </span>
                        <h6>
                          <a href="#">
                            Chef Spotlight: Behind the scenes of culinary
                            mastery
                          </a>
                        </h6>
                      </div>
                    </li>
                    <li className="post-thumbnail-content">
                      <Image
                        src="/assets/images/pages/blog/post-thumb3.jpg"
                        alt="img"
                        width={100}
                        height={110}
                      />
                      <div className="post-title-date">
                        <span>
                          <a href="#">Mobile App</a>
                        </span>
                        <h6>
                          <a href="#">
                            Time-Honored recipes with a modern twist
                          </a>
                        </h6>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sidebar-widget sidebar-tag-widget pf_fadeup mb-30">
                <div className="widget-content">
                  <h4 className="sidebar-title">Popular Tags</h4>
                  <div className="tagcloud">
                    <a href="#">Design</a>
                    <a href="#">Creative</a>
                    <a href="#">Modern</a>
                    <a href="#">Digital</a>
                    <a href="#">Minimal</a>
                    <a href="#">Agenko</a>
                    <a href="#">Business</a>
                    <a href="#">Financial</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
