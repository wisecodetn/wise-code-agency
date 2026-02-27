"use client"
import React, { useEffect } from 'react';
import loadBackgroudImages from '../Common/loadBackgroudImages';
import Link from 'next/link';
import Image from 'next/image';

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

interface Blog2Props {
  blogs?: Blog[];
}

const Blog2 = ({ blogs = [] }: Blog2Props) => {

    useEffect(() => {
        loadBackgroudImages();
    }, []);

    // If no blogs passed, return empty section
    if (blogs.length === 0) {
        return null;
    }

    const blogContent = blogs.map(blog => ({
        img: blog.image || '/assets/images/digital-agency/blog/blog1.jpg',
        title: blog.title,
        slug: blog.slug,
        authorImg: '/assets/wise-code/home/logo.png',
        author: blog.author,
        date: blog.date,
        category: blog.category,
        tags: blog.tags
    })); 

    return (
        <section className="agk-blogs pt-130 pb-90">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    
                    <div className="section-title mb-50 pf_fadeup">
                        <span className="sub-title">Latest Blog</span>
                        <h2>Wise Code Blog</h2>
                    </div>
                </div>
                <div className="col-lg-6">
                    
                    <div className="agk-button float-lg-end mb-60 pf_fadeup">
                        <a href="/blog" className="theme-btn style-one">
                            <span className="text-flip">
                                <span className="text">View All Blogs</span>
                                <span className="text">View All Blogs</span>
                            </span>
                        </a>
                    </div>    
                </div>
            </div>
            <div className="row">
            {blogContent.map((item, i) => (
                <div key={i} className="col-lg-12">
                    <div className="agenko-blog-item style-one mb-40 pf_fadeup">
                        <div className="post-hover-wrap bg_cover" data-background={item.img}>
                            <div className="agk-button">
                                <Link href={item.slug ? `/blog/${item.slug}` : "/blog/blog-details"} className="theme-btn style-one">
                                    <span className="text-flip">
                                        <span className="text">Read More</span>
                                        <span className="text">Read More</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="post-inner-wrap">
                            <div className="author-item">
                                <div className="author-thumb">
                                    <img src={item.authorImg} alt="Wise Code" title="Wise Code" />
                                </div>
                                <div className="author-info">
                                    <span>Posted By</span>
                                    <h4>{item.author || 'Wise Code'}</h4>
                                </div>
                            </div>
                            <div className="post-content">
                                <h3 className="title"><Link href={item.slug ? `/blog/${item.slug}` : "/blog/blog-details"}>{item.title}</Link></h3>
                                <div className="post-categories">
                                    {item.category && <a href="#">{item.category}</a>}
                                    {item.tags && item.tags.slice(0, 2).map((tag, index) => (
                                        <a key={index} href="#">{tag}</a>
                                    ))}
                                </div>
                            </div>
                            <div className="post-date">
                            <i className="bi bi-calendar-check"></i>
                                <a href="#">{item.date || new Date().toLocaleDateString()}</a>
                            </div>
                        </div>
                    </div>
                </div>
                ))}


            </div>
        </div>
    </section>
    );
};

export default Blog2;