
export type Job = {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  tags: string[]
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
}

export const jobs: Job[] = [
  {
    id: 'fe-01',
    title: 'Frontend Developer (React + Tailwind)',
    company: 'QATTH Labs',
    location: 'Hà Nội / Hybrid',
    salary: '$1200 - $1800',
    tags: ['React','TypeScript','Tailwind','Vite'],
    description: 'Phát triển giao diện web hiện đại cho nền tảng tuyển dụng và phỏng vấn.',
    responsibilities: [
      'Xây dựng component, layout theo thiết kế và guideline',
      'Tối ưu hiệu năng, SEO và khả năng truy cập (a11y)',
      'Viết unit test cơ bản, tham gia review code',
    ],
    requirements: [
      'Kinh nghiệm 1-3 năm với React',
      'Thành thạo TypeScript, Tailwind',
      'Hiểu về state management, REST/GraphQL',
    ],
    benefits: ['Macbook/PC tuỳ chọn','Lương tháng 13','Bảo hiểm đầy đủ','Làm việc hybrid']
  },
  {
    id: 'be-01',
    title: 'Backend Developer (Node.js)',
    company: 'QATTH Labs',
    location: 'TP.HCM / Remote',
    salary: '$1300 - $2000',
    tags: ['Node.js','Express','PostgreSQL','Docker'],
    description: 'Thiết kế và phát triển API cho hệ thống quản lý tuyển dụng.',
    responsibilities: [
      'Thiết kế database, tối ưu truy vấn',
      'Xây dựng REST API/GraphQL bảo mật',
      'Triển khai CI/CD cơ bản'
    ],
    requirements: [
      'Kinh nghiệm với Node.js/Express/NestJS',
      'Hiểu biết về SQL, Docker, Redis',
      'Biết viết test là lợi thế'
    ],
    benefits: ['Bảo hiểm','Remote','Lương thưởng theo hiệu suất']
  },
  {
    id: 'fs-01',
    title: 'Fullstack Developer',
    company: 'FinTech Next',
    location: 'Đà Nẵng / Hybrid',
    salary: '$1500 - $2300',
    tags: ['React','Node.js','AWS'],
    description: 'Phối hợp phát triển end-to-end các tính năng thanh toán.',
    responsibilities: ['Phát triển frontend & backend','Viết test và monitor','Tối ưu chi phí hạ tầng'],
    requirements: ['React, Node.js','AWS cơ bản','Kỹ năng giao tiếp tốt'],
    benefits: ['Lương thưởng hấp dẫn','Cơ hội onsite']
  },
  {
    id: 'da-01',
    title: 'Data Analyst',
    company: 'Retail Insight',
    location: 'Hà Nội',
    salary: '$900 - $1400',
    tags: ['Python','Pandas','SQL','Power BI'],
    description: 'Phân tích dữ liệu bán lẻ, xây dashboard cho phòng kinh doanh.',
    responsibilities: ['Làm sạch & trực quan hóa dữ liệu','Tạo báo cáo định kỳ','Thực hiện A/B testing'],
    requirements: ['Python/Pandas','SQL','Power BI/Tableau'],
    benefits: ['Laptop công ty','Đào tạo nội bộ']
  },
  {
    id: 'ai-01',
    title: 'AI/ML Engineer',
    company: 'VisionX',
    location: 'TP.HCM',
    salary: '$1800 - $3000',
    tags: ['Python','Pytorch','NLP/CV'],
    description: 'Xây dựng pipeline huấn luyện & triển khai mô hình NLP/CV.',
    responsibilities: ['Thu thập dữ liệu','Huấn luyện & đánh giá mô hình','Triển khai inference'],
    requirements: ['Pytorch/Tensorflow','MLOps cơ bản','Kinh nghiệm dự án thực tế'],
    benefits: ['Compute budget','Hỗ trợ nghiên cứu']
  },
  {
    id: 'qa-01',
    title: 'QA Automation Engineer',
    company: 'QATTH Labs',
    location: 'Hybrid',
    salary: '$1000 - $1500',
    tags: ['Selenium','Cypress','Jest'],
    description: 'Thiết lập quy trình test tự động cho webapp.',
    responsibilities: ['Viết test E2E','Thiết kế test plan','Báo cáo chất lượng'],
    requirements: ['Selenium/Cypress','Kinh nghiệm CI','Tư duy cẩn thận'],
    benefits: ['Giờ làm linh hoạt']
  },
  {
    id: 'devops-01',
    title: 'DevOps Engineer',
    company: 'CloudWise',
    location: 'Remote',
    salary: '$1800 - $2600',
    tags: ['AWS','Docker','Kubernetes','Terraform'],
    description: 'Quản lý hạ tầng cloud, tối ưu CI/CD và observability.',
    responsibilities: ['Thiết lập pipeline','Tự động hoá hạ tầng','Giám sát hệ thống'],
    requirements: ['AWS, Docker, K8s','Terraform','Linux/Networking'],
    benefits: ['Remote 100%','Gói thiết bị làm việc']
  },
  {
    id: 'pm-01',
    title: 'Product Manager',
    company: 'EduNext',
    location: 'Hà Nội',
    salary: '$1500 - $2200',
    tags: ['Agile','Scrum','UX'],
    description: 'Dẫn dắt sản phẩm giáo dục số, làm việc chéo với nhiều team.',
    responsibilities: ['Xác định roadmap','Phân tích insight người dùng','Viết PRD, user story'],
    requirements: ['Tư duy sản phẩm','Kỹ năng giao tiếp','Hiểu biết UX cơ bản'],
    benefits: ['Đào tạo PM','Thăng tiến theo lộ trình']
  },
  {
    id: 'ui-01',
    title: 'UI/UX Designer',
    company: 'Studio 7',
    location: 'TP.HCM',
    salary: '$900 - $1500',
    tags: ['Figma','Design System'],
    description: 'Thiết kế giao diện thân thiện, xây dựng design system.',
    responsibilities: ['Nghiên cứu người dùng','Prototype nhanh','Bàn giao dev'],
    requirements: ['Figma','Khả năng trình bày','Hiểu về a11y'],
    benefits: ['Lịch làm linh hoạt']
  }
]
