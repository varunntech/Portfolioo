/**
 * Projects Data
 * Edited to reflect Varun Kumar's specific project list and custom upload thumbnails.
 */

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'data-analysis', label: 'Data Analysis' },
  { id: 'machine-learning', label: 'Machine Learning' },
  { id: 'web-dev', label: 'Web Development' },
  { id: 'programming', label: 'Programming' },
];

export const projects = [
  {
    id: 1,
    title: 'Gastric Care',
    description: 'An advanced machine learning application for stomach cancer susceptibility prediction. Trained on patients\' clinical indicators to forecast diagnostic risks, allowing early-stage intervention. Deployed as a live web application tool.',
    category: 'machine-learning',
    tags: ['Python', 'Scikit-learn', 'Machine Learning', 'Flask', 'Data Analysis'],
    githubUrl: 'https://github.com/varunntech/gastric-care',
    liveUrl: 'https://gastric-care.onrender.com/',
    thumbnail: '/project-thumbnails/gastric_care.png',
    featured: true,
    stats: {
      accuracy: '94.2%',
      parameters: '12 clinical factors',
      modelType: 'XGBoost & Random Forest'
    }
  },
  {
    id: 2,
    title: 'Netflix Data Analysis',
    description: 'Comprehensive exploratory data analysis of Netflix content catalog. Analyzed viewing trends, content distribution by genre, country, and release year. Built interactive dashboards with Python analytics to visualize insights on content strategy and viewer preferences.',
    category: 'data-analysis',
    tags: ['Python', 'Pandas', 'Jupyter Notebook', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/varunntech/netflix-data-analysis',
    liveUrl: '', // Leave empty if no live demo
    thumbnail: '/project-thumbnails/netflix.jpg',
    featured: false,
    stats: {
      datasetSize: '8,000+ titles',
      visualizations: '15+ charts',
      insights: '10 key findings'
    }
  },
  {
    id: 3,
    title: 'Amazon Sales Performance Analysis',
    description: 'In-depth analysis of Amazon sales datasets using Python and analytics tools. Uncovered key performance indicators, regional sales trends, seasonality effects, and product category distribution.',
    category: 'data-analysis',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/varunntech/amazon-sales-performance-analysis',
    liveUrl: '',
    thumbnail: '/project-thumbnails/amazon.jpg',
    featured: false,
    stats: {
      recordsCount: '100K+ entries',
      kpis: 'Revenue, Growth, Seasonality',
      efficiency: '95% query speedup'
    }
  },
  {
    id: 4,
    title: 'Veloura - The Shopping Site',
    description: 'A complete, responsive e-commerce web platform for fashion shopping. Built interactive checkout simulations, product catalog categorization, smooth search and filter interactions, and dynamic cart operations.',
    category: 'web-dev',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    githubUrl: 'https://github.com/varunntech/veloura',
    liveUrl: 'https://velouraa.onrender.com/',
    thumbnail: '/project-thumbnails/veloura.png',
    featured: false,
    stats: {
      components: '18+ custom cards',
      features: 'Filters, search, dynamic cart',
      performance: 'Lighthouse score 98%'
    }
  },
  {
    id: 5,
    title: 'Employee Management System',
    description: 'A robust desktop application implementing object-oriented programming (OOP) principles to manage organizational structures. Includes database operations, department allocation tracking, and employee profile administration.',
    category: 'programming',
    tags: ['Python', 'Pandas', 'OOP', 'SQLite'],
    githubUrl: 'https://github.com/varunntech/employee-management-system',
    liveUrl: '',
    thumbnail: '/project-thumbnails/employee.jpg',
    featured: false,
    stats: {
      principles: 'OOP, Inheritance',
      database: 'SQLite / CSV',
      components: 'CRUD Operations'
    }
  },
];
