import About1 from '../Components/About/About1';
import Services2 from '../Components/Services/Services2';
import Project2 from '../Components/Project/Project2';
import Process2 from '../Components/Process/Process2';
import Faq1 from '../Components/Faq/Faq1';
import Blog2 from '../Components/Blog/Blog2';
import HeroBanner3 from '../Components/HeroBanner/HeroBanner3';

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

async function getLatestBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.com'
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/latest-blogs?limit=3`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
 
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        console.error('API returned error:', data.message);
        return [];
      }
    } else {
      console.error('API response not ok:', response.status, response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    return [];
  }
}

const page = async () => {
    const latestBlogs = await getLatestBlogs();

    return (
        <div>
            <HeroBanner3></HeroBanner3>
            <About1></About1>
            <Services2></Services2>
            <Project2></Project2>
            <Process2></Process2>
            <Faq1></Faq1>
            <Blog2 blogs={latestBlogs} />          
        </div>
    );
};

export default page;