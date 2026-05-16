import LegalPageLayout from '../components/LegalPageLayout';

const RELATED = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title={<>Cookie <em>Policy</em></>}
      intro="This policy explains how Artific Furniture uses cookies and similar technologies on our website, what they do, and how you can manage your preferences."
      lastUpdated="16 May 2026"
      relatedLinks={RELATED}
      sections={[
        {
          id: 'what',
          title: 'What are cookies?',
          paragraphs: [
            'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, understand how visitors use the site, and improve your browsing experience.',
            'We may also use similar technologies such as local storage and session identifiers for essential site functionality.',
          ],
        },
        {
          id: 'types',
          title: 'Cookies we use',
          paragraphs: [
            'Our website may use the following categories of cookies:',
          ],
          list: [
            'Strictly necessary — required for the site to function, such as navigation and security',
            'Performance — help us understand how visitors interact with pages (e.g. analytics)',
            'Functional — remember choices such as language or region where applicable',
            'Marketing — used only if we run advertising campaigns that rely on tracking (currently limited)',
          ],
        },
        {
          id: 'third-party',
          title: 'Third-party cookies',
          paragraphs: [
            'Some cookies may be set by third-party services we use, such as analytics providers, embedded video players, or social media platforms linked from our site. These parties have their own privacy policies governing how they use data.',
            'We do not control third-party cookies and encourage you to review the policies of any external services you interact with through our website.',
          ],
        },
        {
          id: 'manage',
          title: 'Managing cookies',
          paragraphs: [
            'You can control and delete cookies through your browser settings. Most browsers allow you to block all cookies, block third-party cookies only, or delete existing cookies. Note that disabling certain cookies may affect site functionality.',
            'If we implement a cookie consent banner in the future, you will be able to accept or reject non-essential cookies at that time.',
          ],
        },
        {
          id: 'updates',
          title: 'Updates to this policy',
          paragraphs: [
            'We may update this Cookie Policy periodically to reflect changes in technology, regulation, or our practices. The “Last updated” date at the top of this page indicates when the policy was last revised.',
          ],
        },
        {
          id: 'contact',
          title: 'Contact us',
          paragraphs: [
            'If you have questions about our use of cookies, contact Artific Furniture at Artificfurniture2023@gmail.com or visit our showrooms in Mokila and Gachibowli, Hyderabad.',
          ],
        },
      ]}
    />
  );
}
