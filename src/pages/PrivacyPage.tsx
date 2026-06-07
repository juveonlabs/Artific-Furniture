import LegalPageLayout from '../components/LegalPageLayout';

const RELATED = [
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Cookie Policy', to: '/cookies' },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title={<>Privacy <em>Policy</em></>}
      intro="This policy explains how Artific Furniture collects, uses, and protects your personal information when you visit our website, showrooms, or enquire about our products and services."
      lastUpdated="16 May 2026"
      relatedLinks={RELATED}
      sections={[
        {
          id: 'overview',
          title: 'Overview',
          paragraphs: [
            'Artific Furniture (“Artific”, “we”, “us”) is committed to protecting your privacy. This Privacy Policy applies to information collected through artificfurniture.com, our showrooms in Hyderabad, and any communication you have with our team regarding bespoke furniture and interior design services.',
            'By using our website or submitting an enquiry, you agree to the practices described in this policy. If you do not agree, please refrain from using our services or contact us with any questions before proceeding.',
          ],
        },
        {
          id: 'collection',
          title: 'Information we collect',
          paragraphs: [
            'We may collect the following types of information depending on how you interact with us:',
          ],
          list: [
            'Contact details such as name, email address, phone number, and postal address',
            'Project information including room dimensions, material preferences, and budget range',
            'Communications you send via enquiry forms, email, phone, or showroom visits',
            'Technical data such as IP address, browser type, and pages visited on our website',
            'Payment and billing information when you place an order (processed securely by our payment partners)',
          ],
        },
        {
          id: 'use',
          title: 'How we use your information',
          paragraphs: [
            'We use personal information solely for legitimate business purposes, including responding to enquiries, preparing quotations, fulfilling orders, arranging showroom visits, and improving our products and services.',
            'We may also use your contact details to send updates about your order or project. Marketing communications are sent only where you have opted in, and you may unsubscribe at any time.',
          ],
        },
        {
          id: 'sharing',
          title: 'Sharing and disclosure',
          paragraphs: [
            'We do not sell your personal information. We may share limited data with trusted third parties who assist us in operating our business — such as delivery partners, payment processors, and IT service providers — under strict confidentiality obligations.',
            'We may disclose information if required by law, court order, or to protect the rights, property, or safety of Artific, our clients, or others.',
          ],
        },
        {
          id: 'retention',
          title: 'Data retention and security',
          paragraphs: [
            'We retain personal information only for as long as necessary to fulfil the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Project records may be kept for several years to support warranties and after-sales service.',
            'We implement appropriate technical and organisational measures to protect your data against unauthorised access, alteration, or loss. No method of transmission over the internet is completely secure; we encourage you to use strong passwords and protect your account credentials.',
          ],
        },
        {
          id: 'rights',
          title: 'Your rights',
          paragraphs: [
            'Depending on applicable law, you may have the right to access, correct, or delete your personal information, restrict or object to certain processing, and request a copy of data we hold about you.',
            'To exercise these rights, contact us at Artificfurniture2023@gmail.com. We will respond within a reasonable timeframe.',
          ],
        },
        {
          id: 'contact',
          title: 'Contact us',
          paragraphs: [
            'For questions about this Privacy Policy or our data practices, please reach out to Artific Furniture at Artificfurniture2023@gmail.com or visit our showrooms at Mokila and Gachibowli, Hyderabad.',
          ],
        },
      ]}
    />
  );
}
