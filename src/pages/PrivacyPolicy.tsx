import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';

function PrivacyPolicy() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-4xl font-orbitron font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-8 text-white/80">
        <div className="mb-6">
          <p className="text-sm text-white/60">Last Updated: 01/28/2025</p>
        </div>

        <p>
          CYANIS values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard your data when using CYANIS.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Information We Collect</h2>
          <p>When you use CYANIS, we may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Personal Information:</span> If you create an account or contact us, we may collect your name, email address, and other identifying details.
            </li>
            <li>
              <span className="font-semibold">Usage Data:</span> We collect anonymized data regarding your interactions with CYANIS to improve performance and user experience.
            </li>
            <li>
              <span className="font-semibold">Device & Log Information:</span> This includes IP addresses, browser type, and access times to ensure security and functionality.
            </li>
            <li>
              <span className="font-semibold">User-Provided Content:</span> Any text, prompts, or queries entered into CYANIS may be processed to improve response accuracy.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. How We Use Your Information</h2>
          <p>We use the collected data to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, improve, and personalize CYANIS's services.</li>
            <li>Ensure security, prevent misuse, and comply with legal obligations.</li>
            <li>Develop new features and enhance user experience.</li>
            <li>Respond to customer inquiries and provide support.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Data Storage & Security</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your data is stored securely with encryption and access controls.</li>
            <li>We do not sell or share personal data with third parties.</li>
            <li>Anonymized usage data may be used for research and AI model improvements.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Your Rights & Choices</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of data collection where applicable.</li>
            <li>Request a copy of the data we have stored about you.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Third-Party Services</h2>
          <p>
            CYANIS may integrate with third-party tools for additional functionalities. However, we do not share personally identifiable information with external parties beyond what is necessary to provide the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. Cookies & Tracking</h2>
          <p>
            CYANIS may use cookies or similar tracking technologies to enhance user experience. You can manage cookie preferences through your browser settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">7. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. Continued use of CYANIS after changes are made constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60">
            For any questions or concerns regarding this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@cyanis.xyz" className="text-white hover:text-white/80 transition-colors">
              support@cyanis.xyz
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;