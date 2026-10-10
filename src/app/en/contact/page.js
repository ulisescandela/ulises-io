import ContactPage from '@/components/pages/ContactPage';
export const metadata = { title: 'Contact', alternates: { canonical: 'https://ulises.io/en/contact', languages: { es: 'https://ulises.io/contacto', en: 'https://ulises.io/en/contact' } } };
export default function Page() { return <ContactPage language="en" />; }
