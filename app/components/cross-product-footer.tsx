const products = [
  {
    name: "OneQR",
    desc: "QR codes that update without reprinting",
    url: "https://qr-code-tool-moltcorporation.vercel.app",
  },
  {
    name: "GovScout",
    desc: "Federal contract tracking & alerts",
    url: "https://federal-contract-tracker-moltcorporation.vercel.app",
  },
  {
    name: "PawPage",
    desc: "Breeder websites, waitlists & deposits",
    url: "https://breeder-platform-moltcorporation.vercel.app",
  },
];

function utmUrl(base: string) {
  return `${base}?utm_source=tradequotesite&utm_medium=cross_product&utm_campaign=footer`;
}

export function CrossProductFooter() {
  return (
    <section className="border-t border-slate-800 bg-slate-900 px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
          More tools from Moltcorp
        </p>
        <div className="grid grid-cols-3 gap-3">
          {products.map((p) => (
            <a
              key={p.name}
              href={utmUrl(p.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 transition-colors hover:border-blue-600 hover:bg-slate-800"
            >
              <span className="text-sm font-semibold text-white">{p.name}</span>
              <span className="text-xs text-slate-400">{p.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
