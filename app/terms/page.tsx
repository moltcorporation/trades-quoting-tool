import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | TradeQuote",
  description:
    "TradeQuote terms of service — acceptable use, data handling, accounts, and liability for our quoting and approval platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-amber-600 hover:text-amber-700"
        >
          &larr; Back to TradeQuote
        </Link>

        <h1 className="text-3xl font-bold text-stone-800">Terms of Service</h1>
        <p className="mt-2 text-sm text-stone-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By creating an account or using TradeQuote, you agree to these
              Terms of Service. If you do not agree, do not use the service.
              TradeQuote is operated by Moltcorp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              2. Description of Service
            </h2>
            <p className="mt-2">
              TradeQuote provides tradespeople with tools to create professional
              quotes, send them to clients via shareable links, track client
              approvals, and manage jobs. The service includes a free tier and
              paid subscription plans.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              3. Account Responsibilities
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                You must provide accurate information when creating your account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                You are responsible for all activity that occurs under your
                account.
              </li>
              <li>
                You must be at least 18 years old to create an account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              4. Acceptable Use
            </h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Use the service for any unlawful purpose.</li>
              <li>
                Submit false, misleading, or fraudulent quotes or business
                information.
              </li>
              <li>
                Collect or store personal information of clients except through
                the provided quoting and approval features.
              </li>
              <li>
                Attempt to interfere with or disrupt the service or its
                infrastructure.
              </li>
              <li>
                Resell or redistribute access to the service without
                authorization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              5. Data Handling
            </h2>
            <p className="mt-2">
              You retain ownership of all content you create, including quotes,
              job descriptions, and client information. By using TradeQuote, you
              grant us a license to display this content on client-facing quote
              pages and within the platform as necessary to provide the service.
              See our{" "}
              <Link
                href="/privacy"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                Privacy Policy
              </Link>{" "}
              for details on how we handle personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              6. Payments and Subscriptions
            </h2>
            <p className="mt-2">
              Paid plans are billed monthly unless otherwise stated. You may
              cancel at any time; your access continues until the end of the
              current billing period. Refunds are not provided for partial
              billing periods. TradeQuote reserves the right to change pricing
              with 30 days&apos; notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              7. Quotes and Client Transactions
            </h2>
            <p className="mt-2">
              TradeQuote facilitates quote creation and client approval on behalf
              of tradespeople. You are solely responsible for the accuracy of
              your quotes, the quality of your work, and any agreements with your
              clients. TradeQuote is not a party to any transaction between you
              and your clients.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              8. Account Termination
            </h2>
            <p className="mt-2">
              You may delete your account at any time through your account
              settings. We may suspend or terminate your account if you violate
              these terms or engage in abusive behavior. Upon termination, your
              quotes and data will be deleted in accordance with our Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              9. Limitation of Liability
            </h2>
            <p className="mt-2">
              TradeQuote is provided &quot;as is&quot; without warranties of any
              kind. To the maximum extent permitted by law, Moltcorp shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of the service, including but not
              limited to lost profits, data loss, or business interruption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              10. Changes to Terms
            </h2>
            <p className="mt-2">
              We may update these terms from time to time. We will notify you of
              material changes via email or through the service. Continued use
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              11. Contact
            </h2>
            <p className="mt-2">
              Questions about these terms? Use the{" "}
              <Link
                href="/feedback"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                feedback form
              </Link>{" "}
              to reach us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
