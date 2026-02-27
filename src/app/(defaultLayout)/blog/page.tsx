'use client';

import Blog4 from '../../Components/Blog/Blog4';
import BreadCumb from '../../Components/Common/BreadCumb';
import React, { useState, useEffect } from 'react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author?: any;
  createdAt?: string;
  slug: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  tags?: Array<{
    _id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  }>;
}

interface ApiResponse {
  success: boolean;
  data: Blog[];
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const Page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchBlogs = async (page: number = 1, category?: string, tag?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `/api/blogs?page=${page}&limit=10`;
      if (category) url += `&category=${category}`;
      if (tag) url += `&tag=${tag}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData: ApiResponse = await response.json();
      
      if (responseData.success && responseData.data) {
        setBlogs(responseData.data);
        if (responseData.pagination) {
          setPagination(responseData.pagination);
        }
      } else {
        throw new Error(responseData.error || 'Invalid response format');
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
    }
  };

  // Transform blog data for Blog4 component
  const transformedBlogs = blogs.map(blog => ({
    id: blog._id,
    title: blog.title,
    content: blog.content,
    excerpt: blog.excerpt,
    author: blog.author?.name || 'Wise Code Team',
    date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
    comments: 0, // You can add comment count if available
    slug: blog.slug,
    image: blog.featuredImage 
      ? (blog.featuredImage.startsWith('http') 
          ? blog.featuredImage 
          : `https://wise-code-agency.vercel.app${blog.featuredImage}`)
      : 'https://wise-code-agency.vercel.app/assets/images/pages/blog/blog1.jpg',
    category: blog.category?.name || 'General',
    tags: blog.tags?.map(tag => tag.name) || []
  }));

  return (
    <div>
      <BreadCumb
        Title="Our Blog"
        content="Wise Code empowers businesses with innovative strategies & creative agency solutions"
      />
      <Blog4 blogs={transformedBlogs} loading={loading} error={error} />
      
      {/* Pagination */}
      {!loading && !error && pagination.totalPages > 1 && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="agenko-pagination text-center pt-40 pb-80">
                <ul>
                  <li>
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pagination.page - 1);
                      }}
                      className={pagination.page === 1 ? 'disabled' : ''}
                      style={{ 
                        cursor: pagination.page === 1 ? 'not-allowed' : 'pointer',
                        opacity: pagination.page === 1 ? 0.5 : 1
                      }}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </a>
                  </li>
                  
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <li key={pageNum}>
                      <a 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNum);
                        }}
                        className={pagination.page === pageNum ? 'active' : ''}
                      >
                        {pageNum}
                      </a>
                    </li>
                  ))}
                  
                  <li>
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pagination.page + 1);
                      }}
                      className={pagination.page === pagination.totalPages ? 'disabled' : ''}
                      style={{ 
                        cursor: pagination.page === pagination.totalPages ? 'not-allowed' : 'pointer',
                        opacity: pagination.page === pagination.totalPages ? 0.5 : 1
                      }}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;