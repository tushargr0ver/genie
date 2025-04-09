import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 dark:text-gray-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: April 9, 2025</p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="dark:text-gray-300">
            At Genie, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our service.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Information We Collect</h2>
          <p className="dark:text-gray-300">We collect information that you provide directly to us when you:</p>
          <ul className="list-disc pl-6 mb-4 dark:text-gray-300">
            <li>Create an account</li>
            <li>Use our chat features</li>
            <li>Upload files or images</li>
            <li>Contact our support team</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">How We Use Your Information</h2>
          <p className="dark:text-gray-300">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 dark:text-gray-300">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and complete transactions</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Develop new products and services</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Sharing Your Information</h2>
          <p className="dark:text-gray-300">We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4 dark:text-gray-300">
            <li>Service providers who perform services on our behalf</li>
            <li>Partners with whom we offer co-branded services or products</li>
            <li>Law enforcement or other third parties as required by law</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Data Security</h2>
          <p className="dark:text-gray-300">
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, no method of transmission over the Internet or electronic storage is 100% secure, so
            we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Your Choices</h2>
          <p className="dark:text-gray-300">
            You can access, update, or delete your account information at any time by logging into your account
            settings. You can also opt-out of receiving promotional communications from us by following the instructions
            in those communications.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Changes to This Policy</h2>
          <p className="dark:text-gray-300">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Contact Us</h2>
          <p className="dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="dark:text-gray-300">
            <a href="mailto:privacy@genie-ai.com" className="text-purple-600 dark:text-purple-400">
              privacy@genie-ai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
