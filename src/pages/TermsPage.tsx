import LegalPageLayout from '../components/LegalPageLayout';

const RELATED = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Cookie Policy', to: '/cookies' },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title={<>Terms of <em>Service</em></>}
      intro="These terms govern your use of the Artific Furniture website and the purchase of our bespoke furniture and interior design services. Please read them carefully before placing an enquiry or order."
      lastUpdated="16 May 2026"
      relatedLinks={RELATED}
      sections={[
        {
          id: 'agreement',
          title: 'Agreement to terms',
          paragraphs: [
            'By accessing artificfurniture.com or engaging Artific Furniture for products or services, you agree to be bound by these Terms of Service and our Privacy Policy. If you are entering into an agreement on behalf of a company, you represent that you have authority to bind that entity.',
            'We reserve the right to update these terms at any time. Continued use of our website or services after changes are posted constitutes acceptance of the revised terms.',
          ],
        },
        {
          id: 'services',
          title: 'Products and services',
          paragraphs: [
            'Artific specialises in bespoke and made-to-order furniture, including dining tables, seating, beds, office pieces, and complete interior solutions. Product images on our website are representative; natural materials such as stone and leather may vary in veining, colour, and texture.',
            'Quotations are valid for the period stated on the proposal. Final pricing is confirmed upon signed approval of designs, materials, and specifications.',
          ],
        },
        {
          id: 'orders',
          title: 'Orders and payment',
          paragraphs: [
            'Orders are confirmed only upon receipt of the agreed deposit and written confirmation from Artific. Lead times are estimates and may vary based on material availability, customisation complexity, and site conditions.',
          ],
          list: [
            'Deposits are non-refundable once production has commenced, except where required by applicable consumer law',
            'Balance payments are due as specified in your order agreement prior to delivery or installation',
            'We accept payment methods as communicated at the time of order',
          ],
        },
        {
          id: 'delivery',
          title: 'Delivery and installation',
          paragraphs: [
            'Delivery and installation are arranged by mutual agreement. You are responsible for ensuring access to the site, accurate measurements, and any structural preparations required. Additional charges may apply for difficult access, re-delivery, or changes requested after production has begun.',
            'Risk of loss passes to you upon delivery. Please inspect all items upon receipt and report any damage or defects within 48 hours.',
          ],
        },
        {
          id: 'warranty',
          title: 'Warranty and returns',
          paragraphs: [
            'Artific warrants that products are free from material defects in workmanship under normal residential use for the period specified in your order documentation. This warranty does not cover misuse, unauthorised modifications, normal wear, or damage caused after delivery.',
            'Because most pieces are made to order, returns are not accepted unless the item is defective or materially different from the approved specification. Remedies may include repair, replacement, or refund at our discretion.',
          ],
        },
        {
          id: 'liability',
          title: 'Limitation of liability',
          paragraphs: [
            'To the fullest extent permitted by law, Artific shall not be liable for indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability for any claim shall not exceed the amount paid by you for the specific product or service giving rise to the claim.',
          ],
        },
        {
          id: 'governing',
          title: 'Governing law',
          paragraphs: [
            'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.',
            'For questions regarding these Terms of Service, contact Artific Furniture at Artificfurniture2023@gmail.com or +91 99595 02020.',
          ],
        },
      ]}
    />
  );
}
