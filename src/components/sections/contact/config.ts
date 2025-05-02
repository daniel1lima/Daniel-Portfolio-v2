import { Contact } from '@/types/contact';
import {
  SiGithub,
  SiLinkedin,
} from '@icons-pack/react-simple-icons';

const contact: Contact = {
  email: 'damorosolima@gmail.com',
  socials: [
    {
      name: 'Github',
      href: 'https://github.com/daniel1lima',
      Icon: SiGithub
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/danielbalima/',
      Icon: SiLinkedin
    }
  ]
};

export { contact };
