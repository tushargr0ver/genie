import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: April 9, 2025</p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="dark:text-gray-300">
            Welcome to Genie! These Terms of Service ("Terms") govern your access to and use of the Genie website and
            services. Please read these Terms carefully before using our services.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Acceptance of Terms</h2>
          <p className="dark:text-gray-300">
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these
            Terms, you may not access or use our services.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Changes to Terms</h2>
          <p className="dark:text-gray-300">
            We may modify these Terms at any time. If we make changes, we will provide notice by posting the updated
            Terms on our website and updating the "Last Updated" date. Your continued use of our services after the
            changes have been posted constitutes your acceptance of the revised Terms.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Account Registration</h2>
          <p className="dark:text-gray-300">
            To use certain features of our services, you may need to create an account. You are responsible for
            maintaining the confidentiality of your account credentials and for all activities that occur under your
            account.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">User Content</h2>
          <p className="dark:text-gray-300">
            You retain ownership of any content you submit to our services. By submitting content, you grant us a
            worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and
            distribute your content in any existing or future media.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Prohibited Conduct</h2>
          <p className="dark:text-gray-300">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4 dark:text-gray-300">
            <li>Use our services for any illegal purpose</li>
            <li>Violate any laws or regulations</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt our services</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use our services to transmit harmful code or malware</li>
            <li>Collect or harvest user data without permission</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Termination</h2>
          <p className="dark:text-gray-300">
            We may terminate or suspend your access to our services at any time, without prior notice or liability, for
            any reason, including if you breach these Terms.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Disclaimer of Warranties</h2>
          <p className="dark:text-gray-300">
            Our services are provided "as is" and "as available" without warranties of any kind, either express or
            implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Limitation of Liability</h2>
          <p className="dark:text-gray-300">
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or inability to use our services.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Governing Law</h2>
          <p className="dark:text-gray-300">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we
            operate, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3 dark:text-white">Contact Us</h2>
          <p className="dark:text-gray-300">If you have any questions about these Terms, please contact us at:</p>
          <p className="dark:text-gray-300">
            <a href="mailto:terms@genie-ai.com" className="text-purple-600 dark:text-purple-400">
              terms@genie-ai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
