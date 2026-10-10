import RootDocument from '@/components/layout/RootDocument';
import Header from '@/components/layout/Header';

export const metadata = {
  metadataBase: new URL('https://ulises.io'),
  title: { default: 'Programming and Software Engineering | Ulises.io', template: '%s | Ulises.io' },
  description: 'Practical articles on programming, software engineering, AI and developer careers by Ulises Rodríguez Candela.',
  authors: [{ name: 'Ulises Rodríguez Candela' }],
};

export default function EnglishLayout({ children }) {
  return (
    <RootDocument lang="en">
      <Header language="en" />
      {children}
    </RootDocument>
  );
}
