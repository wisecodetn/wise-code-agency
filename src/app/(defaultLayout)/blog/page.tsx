'use client';

import Blog4 from '../../Components/Blog/Blog4';
import BreadCumb from '../../Components/Common/BreadCumb';
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

interface ApiResponse {
  success: boolean;
  data: Blog[];
  fallback?: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 0,
    totalPages: 0
  });

  const fetchBlogs = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs?page=${page}&limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const responseData: ApiResponse = await response.json();
        
        if (responseData.success && responseData.data) {
          setBlogs(responseData.data);
          if (responseData.pagination) {
            setPagination(responseData.pagination);
          }
          console.log('Successfully fetched from local MongoDB API');
        } else {
          throw new Error('Invalid response format');
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Failed to fetch from local API:', err);
      
      // Fallback to mock data if local API fails
      const mockBlogs: Blog[] = [
        {
          id: '1',
          title: 'Web Development Best Practices for 2024',
          content: 'Discover the latest trends and best practices in modern web development including React, Next.js, and responsive design principles.',
          author: 'Wise Code Team',
          date: new Date().toLocaleDateString(),
          comments: 5,
          slug: 'web-development-best-practices'
        },
        {
          id: '2',
          title: 'Digital Marketing Strategies That Work',
          content: 'Learn effective digital marketing strategies that drive real results for businesses in today\'s competitive landscape.',
          author: 'Marketing Team',
          date: new Date().toLocaleDateString(),
          comments: 8,
          slug: 'digital-marketing-strategies'
        },
        {
          id: '3',
          title: 'E-Commerce Platform Development Guide',
          content: 'Complete guide to building scalable e-commerce platforms with modern technologies and user experience best practices.',
          author: 'Development Team',
          date: new Date().toLocaleDateString(),
          comments: 12,
          slug: 'ecommerce-platform-development'
        }
      ];
      
      // For mock data, simulate pagination
      const startIndex = (page - 1) * 1;
      const endIndex = startIndex + 1;
      const paginatedBlogs = mockBlogs.slice(startIndex, endIndex);
      
      setBlogs(paginatedBlogs);
      setPagination({
        page,
        limit: 1,
        total: mockBlogs.length,
        totalPages: Math.ceil(mockBlogs.length / 1)
      });
      console.warn('Using fallback mock data due to local API failure');
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

  return (
    <div>
      <BreadCumb
        Title="Our Blog"
        content="Wise Code empowers businesses with innovative strategies & creative agency solutions"
      />
      <Blog4 blogs={blogs} loading={loading} error={error} />
      
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

export default page;