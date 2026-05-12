import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const industries = [
  {
    title: 'Your Company',
    cards: [
      {
        icon: 'teal',
        title: 'Email automation',
        description: 'Send follow-ups, confirmations, and newsletters without lifting a finger.',
        delay: '',
        iconPath: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
      },
      {
        icon: 'gold',
        title: 'Customer support',
        description: 'Handle common questions and route complex issues to the right team instantly.',
        delay: 'reveal-delay-1',
        iconPath: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25-9-8.25s9 3.694 9 8.25z',
      },
      {
        icon: 'warm',
        title: 'Data entry & processing',
        description: 'Extract and organize information from documents and emails automatically.',
        delay: 'reveal-delay-2',
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
      {
        icon: 'teal',
        title: 'Appointment scheduling',
        description: 'Let customers book meetings without back-and-forth emails.',
        delay: '',
        iconPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5',
      },
      {
        icon: 'gold',
        title: 'Invoice & payment reminders',
        description: 'Send payment reminders and track overdue invoices automatically.',
        delay: 'reveal-delay-1',
        iconPath: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 5.25v0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75h-.75A.75.75 0 013 6v0a.75.75 0 01.75-.75H6a.75.75 0 01.75.75v0A.75.75 0 017.5 6v0a.75.75 0 01-.75.75H4.5a1.5 1.5 0 00-1.5 1.5v.75a1.5 1.5 0 001.5 1.5h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75h-.75a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5h.75A.75.75 0 019 7.5v0a.75.75 0 01-.75.75H6A.75.75 0 015.25 7.5v0A.75.75 0 016 6.75h.75a1.5 1.5 0 011.5 1.5v.75a1.5 1.5 0 01-1.5 1.5h-.75a.75.75 0 01-.75-.75v0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h.75zM12 12a.75.75 0 01.75-.75H15a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zm.75 3.75a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V15.75z',
      },
      {
        icon: 'warm',
        title: 'Report generation',
        description: 'Turn raw data into polished reports and dashboards.',
        delay: 'reveal-delay-2',
        iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
      },
    ],
  },
  {
    title: 'Small Businesses',
    cards: [
      {
        icon: 'teal',
        title: 'Invoice tracking',
        description: 'Monitor sent invoices and remind customers about overdue payments automatically.',
        delay: '',
        iconPath: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 5.25v0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75h-.75A.75.75 0 013 6v0a.75.75 0 01.75-.75H6a.75.75 0 01.75.75v0A.75.75 0 017.5 6v0a.75.75 0 01-.75.75H4.5a1.5 1.5 0 00-1.5 1.5v.75a1.5 1.5 0 001.5 1.5h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75h-.75a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5h.75A.75.75 0 019 7.5v0a.75.75 0 01-.75.75H6A.75.75 0 015.25 7.5v0A.75.75 0 016 6.75h.75a1.5 1.5 0 011.5 1.5v.75a1.5 1.5 0 01-1.5 1.5h-.75a.75.75 0 01-.75-.75v0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h.75zM12 12a.75.75 0 01.75-.75H15a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zm.75 3.75a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V15.75z',
      },
      {
        icon: 'gold',
        title: 'Customer follow-up',
        description: 'Stay in touch with customers and leads without manual email chains.',
        delay: 'reveal-delay-1',
        iconPath: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
      },
      {
        icon: 'warm',
        title: 'Social media posting',
        description: 'Schedule and publish social media content automatically across platforms.',
        delay: 'reveal-delay-2',
        iconPath: 'M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0l-9.566-5.314m9.566 5.314L21 12',
      },
      {
        icon: 'teal',
        title: 'Expense categorization',
        description: 'Automatically organize receipts and expenses for cleaner bookkeeping.',
        delay: '',
        iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 3.07-.879 4.242 0l.879.659M6 18.75h.008v.008H6v-.008zM6.75 12h.008v.008H6.75V12zM9 9.75h.008v.008H9V9.75zM9.75 6h.008v.008H9.75V6zM12 9.75h.008v.008H12V9.75zM12.75 12h.008v.008H12.75V12zM15 6h.008v.008H15V6zM15.75 9.75h.008v.008H15.75V9.75zM18 12h.008v.008H18V12z',
      },
      {
        icon: 'gold',
        title: 'Lead qualification',
        description: 'Filter and prioritize new leads so you focus on the best prospects.',
        delay: 'reveal-delay-1',
        iconPath: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
      },
      {
        icon: 'warm',
        title: 'Basic analytics & insights',
        description: 'Get weekly summaries of key metrics without spending hours on analysis.',
        delay: 'reveal-delay-2',
        iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
      },
    ],
  },
  {
    title: 'Law Firms',
    cards: [
      {
        icon: 'teal',
        title: 'Contract review',
        description: 'Review contracts quickly, flag risks, and surface critical clauses without manual reading.',
        delay: '',
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
      {
        icon: 'gold',
        title: 'Discovery document analysis',
        description: 'Sort and summarize discovery documents so attorneys spend time on strategy, not paperwork.',
        delay: 'reveal-delay-1',
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
      {
        icon: 'warm',
        title: 'Drafting standard agreements',
        description: 'Generate first drafts of standard agreements and speed up review cycles.',
        delay: 'reveal-delay-2',
      },
      {
        icon: 'teal',
        title: 'Intake automation',
        description: 'Capture new client details, route cases, and populate matter records automatically.',
        delay: '',
      },
    ],
  },
  {
    title: 'Healthcare',
    cards: [
      {
        icon: 'teal',
        title: 'Appointment scheduling',
        description: 'Automate scheduling, reminders, and cancellations to reduce no-shows.',
        delay: '',
      },
      {
        icon: 'gold',
        title: 'Insurance verification',
        description: 'Check patient coverage automatically before appointments.',
        delay: 'reveal-delay-1',
      },
      {
        icon: 'warm',
        title: 'Clinical note summarization',
        description: 'Turn visit notes into structured summaries for faster record keeping.',
        delay: 'reveal-delay-2',
      },
      {
        icon: 'teal',
        title: 'Patient follow-ups',
        description: 'Send follow-up messages, reminders, and care instructions without manual effort.',
        delay: '',
      },
    ],
  },
  {
    title: 'Real Estate',
    cards: [
      {
        icon: 'teal',
        title: 'Listing generation',
        description: 'Create attractive property listings automatically from your data.',
        delay: '',
      },
      {
        icon: 'gold',
        title: 'Lead qualification',
        description: 'Score and route leads so agents spend time only on qualified prospects.',
        delay: 'reveal-delay-1',
      },
      {
        icon: 'warm',
        title: 'Document processing',
        description: 'Process contracts, disclosures, and closing paperwork faster.',
        delay: 'reveal-delay-2',
      },
      {
        icon: 'teal',
        title: 'Comp analysis',
        description: 'Generate comparable market reports automatically from property data.',
        delay: '',
      },
    ],
  },
  {
    title: 'E-Commerce',
    cards: [
      {
        icon: 'teal',
        title: 'Product description generation',
        description: 'Create SEO-ready product copy automatically from product specs.',
        delay: '',
      },
      {
        icon: 'gold',
        title: 'Customer service',
        description: 'Handle common customer questions and returns with AI-powered automation.',
        delay: 'reveal-delay-1',
      },
      {
        icon: 'warm',
        title: 'Inventory forecasting',
        description: 'Predict stock needs to avoid overstock and out-of-stock situations.',
        delay: 'reveal-delay-2',
      },
      {
        icon: 'teal',
        title: 'Review summarization',
        description: 'Summarize customer feedback and highlight trends automatically.',
        delay: '',
      },
    ],
  },
  {
    title: 'Agencies',
    cards: [
      {
        icon: 'teal',
        title: 'Client reporting',
        description: 'Auto-generate campaign reports and analytics summaries for clients.',
        delay: '',
      },
      {
        icon: 'gold',
        title: 'Content production',
        description: 'Help create copy, briefs, and content drafts quickly.',
        delay: 'reveal-delay-1',
      },
      {
        icon: 'warm',
        title: 'Project status updates',
        description: 'Generate progress updates automatically so teams stay aligned.',
        delay: 'reveal-delay-2',
      },
      {
        icon: 'teal',
        title: 'Meeting summaries',
        description: 'Turn meetings into concise notes with action items.',
        delay: '',
      },
    ],
  },
  {
    title: 'Manufacturing and Logistics',
    cards: [
      {
        icon: 'teal',
        title: 'Demand forecasting',
        description: 'Predict demand trends so you can plan production and inventory.',
        delay: '',
      },
      {
        icon: 'gold',
        title: 'Quality inspection',
        description: 'Detect defects and quality issues automatically with AI.',
        delay: 'reveal-delay-1',
      },
      {
        icon: 'warm',
        title: 'Predictive maintenance',
        description: 'Identify equipment issues before they cause downtime.',
        delay: 'reveal-delay-2',
      },
      {
        icon: 'teal',
        title: 'Supply chain monitoring',
        description: 'Track shipments and flag delays so operations stay on schedule.',
        delay: '',
      },
    ],
  },
  {
    title: 'Accounting Firms',
    cards: [
      {
        icon: 'teal',
        title: 'Receipt / invoice processing',
        description: 'Capture receipts and invoices automatically into your accounting workflow.',
        delay: '',
      },
      {
        icon: 'gold',
        title: 'Client communication',
        description: 'Automate client updates and document requests without manual outreach.',
        delay: 'reveal-delay-1',
      },
      {
        icon: 'warm',
        title: 'Tax prep automation',
        description: 'Speed up tax prep with automated categorization and document assembly.',
        delay: 'reveal-delay-2',
      },
      {
        icon: 'teal',
        title: 'Bookkeeping',
        description: 'Reconcile accounts and categorize transactions automatically.',
        delay: '',
      },
    ],
  },
  {
    title: 'Insurance',
    cards: [
      {
        icon: 'teal',
        title: 'Claims processing',
        description: 'Automate intake, routing, and initial assessment of claims.',
        delay: '',
      },
      {
        icon: 'gold',
        title: 'Underwriting support',
        description: 'Provide underwriters with fast risk insights and recommendations.',
        delay: 'reveal-delay-1',
      },
      {
        icon: 'warm',
        title: 'Policy summarization',
        description: 'Summarize policies for agents and customers in plain language.',
        delay: 'reveal-delay-2',
      },
      {
        icon: 'teal',
        title: 'Customer triage',
        description: 'Route inquiries to the right team or response path instantly.',
        delay: '',
      },
    ],
  },
]

export default function Features() {
  const ref = useScrollReveal<HTMLElement>()
  const [selectedIndustry, setSelectedIndustry] = useState(0)
  const currentIndustry = industries[selectedIndustry]

  // Re-reveal cards when industry changes
  useEffect(() => {
    if (ref.current) {
      const cards = ref.current.querySelectorAll('.feature-card')
      cards.forEach(card => {
        card.classList.remove('visible')
        setTimeout(() => {
          card.classList.add('visible')
        }, 0)
      })
    }
  }, [selectedIndustry])

  return (
    <section className="features" id="features" ref={ref}>
      <div className="section-label reveal">Your Custom AI Employees </div>
     <h2 className="section-heading reveal reveal-delay-1">
  What we can do for <em>{selectedIndustry === 0 ? "your company" : currentIndustry.title}</em>
</h2>
      <p className="section-subtext reveal reveal-delay-2">
      </p>

      <div className="industry-tabs reveal reveal-delay-2">
        {industries.slice(1).map((industry, index) => (
          <button
            key={industry.title}
            className={`industry-tab ${selectedIndustry === index + 1 ? 'active' : ''}`}
            onClick={() => setSelectedIndustry(index + 1)}
          >
            {industry.title}
          </button>
        ))}
      </div>

      <div className="industry-display reveal reveal-delay-2">
        {currentIndustry.cards.map((card) => (
          <div key={card.title} className={`feature-card reveal ${card.delay}`}>
            <div className={`feature-icon icon-${card.icon}`}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={card.iconPath || "M4.5 12.75l6 6 9-13.5"} />
              </svg>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
