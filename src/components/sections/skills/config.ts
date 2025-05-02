import { Skill } from '@/types/skill';

const trimLen: number = -1;

const skills: Skill[] = [
  {
    name: 'Software Development',
    thumbnail: '/images/skills/software-development.jpg',
    description: 'Python, TypeScript, JavaScript, Java, Rust, C/C++, SQL, R, and Go. Building scalable applications and microservices using modern development practices.'
  },
  {
    name: 'Web Technologies',
    thumbnail: '/images/skills/web-technologies.jpg',
    description: 'React.js, Next.js, Flask, Django, and Node.js. Building responsive, performant web applications with focus on user experience.'
  },
  {
    name: 'Database & Cloud',
    thumbnail: '/images/skills/database.jpg',
    description: 'MySQL, Redis, DynamoDB, MongoDB, Supabase. AWS (EC2/S3/Bedrock), Docker, Git. Designing scalable architectures and managing cloud infrastructure.'
  },
  {
    name: 'AI & Machine Learning',
    thumbnail: '/images/skills/ai-ml.jpg',
    description: 'RAG, TensorFlow, SpaCy, and Pandas. Implementing NLP solutions and sentiment analysis with focus on practical AI applications.'
  }
];

export { trimLen, skills };
