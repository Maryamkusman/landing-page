import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ICONS: Record<string, string> = {
  mail: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
  chat: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z',
  document: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  calendar: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5',
  receipt: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z',
  chart: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  share: 'M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z',
  dollar: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 3.07-.879 4.242 0l.879.659M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  check: 'M9 12.75l2.25 2.25L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  shield: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  search: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  pencil: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10',
  clipboard: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
  truck: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  wrench: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m5.108-.233l3.276-3.276',
  box: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m16.5 0h.375c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125H3.75m16.5 0H3.75m6 0v9.75',
  tag: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z',
  home: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  star: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
}

const industries = [
  {
    title: 'Your Company',
    cards: [
      { icon: 'teal', iconKey: 'mail', title: 'Email automation', description: 'Send follow-ups, confirmations, and newsletters without lifting a finger.', delay: '' },
      { icon: 'gold', iconKey: 'chat', title: 'Customer support', description: 'Handle common questions and route complex issues to the right team instantly.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'document', title: 'Data entry & processing', description: 'Extract and organize information from documents and emails automatically.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'calendar', title: 'Appointment scheduling', description: 'Let customers book meetings without back-and-forth emails.', delay: '' },
      { icon: 'gold', iconKey: 'receipt', title: 'Invoice & payment reminders', description: 'Send payment reminders and track overdue invoices automatically.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'chart', title: 'Report generation', description: 'Turn raw data into polished reports and dashboards.', delay: 'reveal-delay-2' },
    ],
  },
  {
    title: 'Small Businesses',
    cards: [
      { icon: 'teal', iconKey: 'receipt', title: 'Invoice tracking', description: 'Monitor sent invoices and remind customers about overdue payments automatically.', delay: '' },
      { icon: 'gold', iconKey: 'mail', title: 'Customer follow-up', description: 'Stay in touch with customers and leads without manual email chains.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'share', title: 'Social media posting', description: 'Schedule and publish social media content automatically across platforms.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'dollar', title: 'Expense categorization', description: 'Automatically organize receipts and expenses for cleaner bookkeeping.', delay: '' },
      { icon: 'gold', iconKey: 'check', title: 'Lead qualification', description: 'Filter and prioritize new leads so you focus on the best prospects.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'chart', title: 'Basic analytics & insights', description: 'Get weekly summaries of key metrics without spending hours on analysis.', delay: 'reveal-delay-2' },
    ],
  },
  {
    title: 'Law Firms',
    cards: [
<<<<<<< Updated upstream
      { icon: 'teal', iconKey: 'document', title: 'Contract review', description: 'Review contracts quickly, flag risks, and surface critical clauses without manual reading.', delay: '' },
      { icon: 'gold', iconKey: 'search', title: 'Discovery document analysis', description: 'Sort and summarize discovery documents so attorneys spend time on strategy, not paperwork.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'pencil', title: 'Drafting standard agreements', description: 'Generate first drafts of standard agreements and speed up review cycles.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'clipboard', title: 'Intake automation', description: 'Capture new client details, route cases, and populate matter records automatically.', delay: '' },
=======
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
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
      {
        icon: 'teal',
        title: 'Intake automation',
        description: 'Capture new client details, route cases, and populate matter records automatically.',
        delay: '',
        iconPath: 'M9 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H0v-.008zm.375 0h.008v.008h-.008v-.008zm2.625 0h.008v.008h-.008v-.008zm2.625 0h.008v.008h-.008v-.008zm-5.625 2.25h.008v.008H0v-.008zm.375 0h.008v.008h-.008v-.008zm5.625 0h.008v.008h-.008v-.008zm.375 0h.008v.008h-.008v-.008z',
      },
>>>>>>> Stashed changes
    ],
  },
  {
    title: 'Healthcare',
    cards: [
<<<<<<< Updated upstream
      { icon: 'teal', iconKey: 'calendar', title: 'Appointment scheduling', description: 'Automate scheduling, reminders, and cancellations to reduce no-shows.', delay: '' },
      { icon: 'gold', iconKey: 'shield', title: 'Insurance verification', description: 'Check patient coverage automatically before appointments.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'document', title: 'Clinical note summarization', description: 'Turn visit notes into structured summaries for faster record keeping.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'chat', title: 'Patient follow-ups', description: 'Send follow-up messages, reminders, and care instructions without manual effort.', delay: '' },
=======
      {
        icon: 'teal',
        title: 'Appointment scheduling',
        description: 'Automate scheduling, reminders, and cancellations to reduce no-shows.',
        delay: '',
        iconPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5',
      },
      {
        icon: 'gold',
        title: 'Insurance verification',
        description: 'Check patient coverage automatically before appointments.',
        delay: 'reveal-delay-1',
        iconPath: 'M9 12.75L11.25 15 15 9.75m-3-6.75a6.75 6.75 0 110 13.5A6.75 6.75 0 0112 3z',
      },
      {
        icon: 'warm',
        title: 'Clinical note summarization',
        description: 'Turn visit notes into structured summaries for faster record keeping.',
        delay: 'reveal-delay-2',
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
      {
        icon: 'teal',
        title: 'Patient follow-ups',
        description: 'Send follow-up messages, reminders, and care instructions without manual effort.',
        delay: '',
        iconPath: 'M21 8.25c0-1.085-.672-2.022-1.623-2.607l-7.5-4.5a2.25 2.25 0 00-2.254 0l-7.5 4.5A2.25 2.25 0 003 8.25v8.5c0 1.085.672 2.022 1.623 2.607l7.5 4.5a2.25 2.25 0 002.254 0l7.5-4.5c.951-.585 1.623-1.522 1.623-2.607V8.25z',
      },
>>>>>>> Stashed changes
    ],
  },
  {
    title: 'Real Estate',
    cards: [
<<<<<<< Updated upstream
      { icon: 'teal', iconKey: 'home', title: 'Listing generation', description: 'Create attractive property listings automatically from your data.', delay: '' },
      { icon: 'gold', iconKey: 'check', title: 'Lead qualification', description: 'Score and route leads so agents spend time only on qualified prospects.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'document', title: 'Document processing', description: 'Process contracts, disclosures, and closing paperwork faster.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'chart', title: 'Comp analysis', description: 'Generate comparable market reports automatically from property data.', delay: '' },
=======
      {
        icon: 'teal',
        title: 'Listing generation',
        description: 'Create attractive property listings automatically from your data.',
        delay: '',
        iconPath: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21H17.625c.621 0 1.125-.504 1.125-1.125V9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        icon: 'gold',
        title: 'Lead qualification',
        description: 'Score and route leads so agents spend time only on qualified prospects.',
        delay: 'reveal-delay-1',
        iconPath: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
      },
      {
        icon: 'warm',
        title: 'Document processing',
        description: 'Process contracts, disclosures, and closing paperwork faster.',
        delay: 'reveal-delay-2',
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
      {
        icon: 'teal',
        title: 'Comp analysis',
        description: 'Generate comparable market reports automatically from property data.',
        delay: '',
        iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
      },
>>>>>>> Stashed changes
    ],
  },
  {
    title: 'E-Commerce',
    cards: [
<<<<<<< Updated upstream
      { icon: 'teal', iconKey: 'tag', title: 'Product description generation', description: 'Create SEO-ready product copy automatically from product specs.', delay: '' },
      { icon: 'gold', iconKey: 'chat', title: 'Customer service', description: 'Handle common customer questions and returns with AI-powered automation.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'box', title: 'Inventory forecasting', description: 'Predict stock needs to avoid overstock and out-of-stock situations.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'star', title: 'Review summarization', description: 'Summarize customer feedback and highlight trends automatically.', delay: '' },
=======
      {
        icon: 'teal',
        title: 'Product description generation',
        description: 'Create SEO-ready product copy automatically from product specs.',
        delay: '',
        iconPath: 'M12 7.5h1.386c.22 0 .44-.107.577-.297l7.85-10.835a2.25 2.25 0 00-1.75-3.68c-.593 0-1.142.233-1.538.645l-7.5 8.954a.75.75 0 01-.577.3H12m0 0l3 3m0-8.25l-3-3',
      },
      {
        icon: 'gold',
        title: 'Customer service',
        description: 'Handle common customer questions and returns with AI-powered automation.',
        delay: 'reveal-delay-1',
        iconPath: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25-9-8.25s9 3.694 9 8.25z',
      },
      {
        icon: 'warm',
        title: 'Inventory forecasting',
        description: 'Predict stock needs to avoid overstock and out-of-stock situations.',
        delay: 'reveal-delay-2',
        iconPath: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M15.75 7.5v-1.338a2.25 2.25 0 00-2.25-2.25h-5.25a2.25 2.25 0 00-2.25 2.25V7.5',
      },
      {
        icon: 'teal',
        title: 'Review summarization',
        description: 'Summarize customer feedback and highlight trends automatically.',
        delay: '',
        iconPath: 'M11.48 3.499a.5.5 0 011.04 0l.213 1.413a2 2 0 00.582.727l1.1.84c.383.291.644.906.461 1.405l-.203 1.412a2 2 0 00.523 1.423l.756 1.08c.294.395.772.553 1.28.46l1.46-.252a2 2 0 011.457 2.848l-.694 1.142a2 2 0 00-.53 1.406l.99 1.005c.316.31.638.758.268 1.27l-.51 1.42a2 2 0 01-1.934 1.18l-1.423-.143a2 2 0 00-1.496.542l-.839 1.112c-.31.41-.78.746-1.335.746-.56 0-1.025-.335-1.335-.746l-.838-1.112a2 2 0 00-1.496-.542l-1.423.143a2 2 0 01-1.934-1.18l-.51-1.42c-.37-.512-.048-.96.268-1.27l.99-1.005a2 2 0 00.53-1.406l-.694-1.142a2 2 0 011.457-2.848l1.46.252c.508.093.986-.165 1.28-.46l.756-1.08a2 2 0 00.523-1.423l-.203-1.412c-.183-.499.078-1.114.461-1.405l1.1-.84a2 2 0 00.582-.727l.213-1.413z',
      },
>>>>>>> Stashed changes
    ],
  },
  {
    title: 'Agencies',
    cards: [
<<<<<<< Updated upstream
      { icon: 'teal', iconKey: 'chart', title: 'Client reporting', description: 'Auto-generate campaign reports and analytics summaries for clients.', delay: '' },
      { icon: 'gold', iconKey: 'pencil', title: 'Content production', description: 'Help create copy, briefs, and content drafts quickly.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'clipboard', title: 'Project status updates', description: 'Generate progress updates automatically so teams stay aligned.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'document', title: 'Meeting summaries', description: 'Turn meetings into concise notes with action items.', delay: '' },
=======
      {
        icon: 'teal',
        title: 'Client reporting',
        description: 'Auto-generate campaign reports and analytics summaries for clients.',
        delay: '',
        iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
      },
      {
        icon: 'gold',
        title: 'Content production',
        description: 'Help create copy, briefs, and content drafts quickly.',
        delay: 'reveal-delay-1',
        iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 9.75a3 3 0 11-6 0 3 3 0 016 0z',
      },
      {
        icon: 'warm',
        title: 'Project status updates',
        description: 'Generate progress updates automatically so teams stay aligned.',
        delay: 'reveal-delay-2',
        iconPath: 'M9 12.75L11.25 15 15 9.75m-3-6.75H12a2.25 2.25 0 012.25 2.25v12A2.25 2.25 0 0112 19.5H9a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 019 4.5z',
      },
      {
        icon: 'teal',
        title: 'Meeting summaries',
        description: 'Turn meetings into concise notes with action items.',
        delay: '',
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
>>>>>>> Stashed changes
    ],
  },
  {
    title: 'Manufacturing and Logistics',
    cards: [
<<<<<<< Updated upstream
      { icon: 'teal', iconKey: 'chart', title: 'Demand forecasting', description: 'Predict demand trends so you can plan production and inventory.', delay: '' },
      { icon: 'gold', iconKey: 'search', title: 'Quality inspection', description: 'Detect defects and quality issues automatically with AI.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'wrench', title: 'Predictive maintenance', description: 'Identify equipment issues before they cause downtime.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'truck', title: 'Supply chain monitoring', description: 'Track shipments and flag delays so operations stay on schedule.', delay: '' },
=======
      {
        icon: 'teal',
        title: 'Demand forecasting',
        description: 'Predict demand trends so you can plan production and inventory.',
        delay: '',
        iconPath: 'M2.25 18L9 11.25l4.306 4.307a11.25 11.25 0 015.814-5.977l2.05-1.025a.75.75 0 011.098.20l.583 2.915.583-2.915a.75.75 0 011.098-.2l2.05 1.025c2.601 1.306 4.991 3.696 5.977 6.814l1.025 2.05a.75.75 0 01-.2 1.098l-2.915.583 2.915.583a.75.75 0 01.2 1.098l-1.025 2.05a11.25 11.25 0 01-5.814 5.977l-2.05 1.025a.75.75 0 01-1.098-.2l-.583-2.915-.583 2.915a.75.75 0 01-1.098.2l-2.05-1.025a11.25 11.25 0 01-5.977-5.814l-1.025-2.05a.75.75 0 01.2-1.098l2.915-.583-2.915-.583a.75.75 0 01-.2-1.098l1.025-2.05z',
      },
      {
        icon: 'gold',
        title: 'Quality inspection',
        description: 'Detect defects and quality issues automatically with AI.',
        delay: 'reveal-delay-1',
        iconPath: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
      },
      {
        icon: 'warm',
        title: 'Predictive maintenance',
        description: 'Identify equipment issues before they cause downtime.',
        delay: 'reveal-delay-2',
        iconPath: 'M11.42 15.842h.014a20.285 20.285 0 002.916-.306m-9.272-5.118a6.318 6.318 0 001.946 2.83c.04.04.077.076.11.107a5.838 5.838 0 002.832 1.142a6.213 6.213 0 001.772.22 6.956 6.956 0 002.16-.384c1.444-.568 2.766-1.473 3.802-2.61l.05-.053a6.327 6.327 0 00-3.802-10.882 6.25 6.25 0 00-3.802 1.25.75.75 0 01-1.06-1.06A7.75 7.75 0 0112 3a7.75 7.75 0 010 15.5z',
      },
      {
        icon: 'teal',
        title: 'Supply chain monitoring',
        description: 'Track shipments and flag delays so operations stay on schedule.',
        delay: '',
        iconPath: 'M8.25 18.75a1.5 1.5 0 01-3 0m16.5 0a1.5 1.5 0 01-3 0m0 0a1.5 1.5 0 01-3 0m3 0h1.125c.621 0 1.126-.504 1.126-1.125V4.875c0-.621-.504-1.125-1.125-1.125H21.75c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125zm-15 0H3.375c-.621 0-1.125-.504-1.125-1.125V4.875c0-.621.504-1.125 1.125-1.125H5.25c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125zm6-10.5a.75.75 0 00-1.5 0v.006h1.5v-.006zm.375 13.5h-3a.75.75 0 010-1.5h3a.75.75 0 010 1.5z',
      },
>>>>>>> Stashed changes
    ],
  },
  {
    title: 'Accounting Firms',
    cards: [
<<<<<<< Updated upstream
      { icon: 'teal', iconKey: 'receipt', title: 'Receipt / invoice processing', description: 'Capture receipts and invoices automatically into your accounting workflow.', delay: '' },
      { icon: 'gold', iconKey: 'mail', title: 'Client communication', description: 'Automate client updates and document requests without manual outreach.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'document', title: 'Tax prep automation', description: 'Speed up tax prep with automated categorization and document assembly.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'dollar', title: 'Bookkeeping', description: 'Reconcile accounts and categorize transactions automatically.', delay: '' },
=======
      {
        icon: 'teal',
        title: 'Receipt / invoice processing',
        description: 'Capture receipts and invoices automatically into your accounting workflow.',
        delay: '',
        iconPath: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 5.25v0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75h-.75A.75.75 0 013 6v0a.75.75 0 01.75-.75H6a.75.75 0 01.75.75v0A.75.75 0 017.5 6v0a.75.75 0 01-.75.75H4.5a1.5 1.5 0 00-1.5 1.5v.75a1.5 1.5 0 001.5 1.5h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75h-.75a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5h.75A.75.75 0 019 7.5v0a.75.75 0 01-.75.75H6A.75.75 0 015.25 7.5v0A.75.75 0 016 6.75h.75a1.5 1.5 0 011.5 1.5v.75a1.5 1.5 0 01-1.5 1.5h-.75a.75.75 0 01-.75-.75v0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v0a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h.75zM12 12a.75.75 0 01.75-.75H15a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zm.75 3.75a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V15.75z',
      },
      {
        icon: 'gold',
        title: 'Client communication',
        description: 'Automate client updates and document requests without manual outreach.',
        delay: 'reveal-delay-1',
        iconPath: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
      },
      {
        icon: 'warm',
        title: 'Tax prep automation',
        description: 'Speed up tax prep with automated categorization and document assembly.',
        delay: 'reveal-delay-2',
        iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 3.07-.879 4.242 0l.879.659M6 18.75h.008v.008H6v-.008zM6.75 12h.008v.008H6.75V12zM9 9.75h.008v.008H9V9.75zM9.75 6h.008v.008H9.75V6zM12 9.75h.008v.008H12V9.75zM12.75 12h.008v.008H12.75V12zM15 6h.008v.008H15V6zM15.75 9.75h.008v.008H15.75V9.75zM18 12h.008v.008H18V12z',
      },
      {
        icon: 'teal',
        title: 'Bookkeeping',
        description: 'Reconcile accounts and categorize transactions automatically.',
        delay: '',
        iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 3.07-.879 4.242 0l.879.659M6 18.75h.008v.008H6v-.008zM6.75 12h.008v.008H6.75V12zM9 9.75h.008v.008H9V9.75zM9.75 6h.008v.008H9.75V6zM12 9.75h.008v.008H12V9.75zM12.75 12h.008v.008H12.75V12zM15 6h.008v.008H15V6zM15.75 9.75h.008v.008H15.75V9.75zM18 12h.008v.008H18V12z',
      },
>>>>>>> Stashed changes
    ],
  },
  {
    title: 'Insurance',
    cards: [
<<<<<<< Updated upstream
      { icon: 'teal', iconKey: 'document', title: 'Claims processing', description: 'Automate intake, routing, and initial assessment of claims.', delay: '' },
      { icon: 'gold', iconKey: 'shield', title: 'Underwriting support', description: 'Provide underwriters with fast risk insights and recommendations.', delay: 'reveal-delay-1' },
      { icon: 'warm', iconKey: 'clipboard', title: 'Policy summarization', description: 'Summarize policies for agents and customers in plain language.', delay: 'reveal-delay-2' },
      { icon: 'teal', iconKey: 'share', title: 'Customer triage', description: 'Route inquiries to the right team or response path instantly.', delay: '' },
=======
      {
        icon: 'teal',
        title: 'Claims processing',
        description: 'Automate intake, routing, and initial assessment of claims.',
        delay: '',
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
      {
        icon: 'gold',
        title: 'Underwriting support',
        description: 'Provide underwriters with fast risk insights and recommendations.',
        delay: 'reveal-delay-1',
        iconPath: 'M9 12.75L11.25 15 15 9.75m-3-6.75H12a2.25 2.25 0 012.25 2.25v12A2.25 2.25 0 0112 19.5H9a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 019 4.5z',
      },
      {
        icon: 'warm',
        title: 'Policy summarization',
        description: 'Summarize policies for agents and customers in plain language.',
        delay: 'reveal-delay-2',
        iconPath: 'M19.5 14.25v-2.625c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v2.625M21 12H9m0 0l3-3m-3 3l3 3m0 3.75V8.197c0-2.88-2.56-4.9-5.25-4.9s-5.25 2.02-5.25 4.9V18.75m9 0v-6m0 6h-1.5m1.5 0h1.5',
      },
      {
        icon: 'teal',
        title: 'Customer triage',
        description: 'Route inquiries to the right team or response path instantly.',
        delay: '',
        iconPath: 'M18 18.75H0m0 0a60.933 60.933 0 003.75-7.978A24 24 0 0120.331 8.72m0 0a60.933 60.933 0 003.75 7.978M0 18.75a24 24 0 0020.331-10.742m0 0h3.75a60.933 60.933 0 003.75-7.978',
      },
>>>>>>> Stashed changes
    ],
  },
]

export default function Features() {
  const ref = useScrollReveal<HTMLElement>()
  const [selectedIndustry, setSelectedIndustry] = useState(0)
  const currentIndustry = industries[selectedIndustry]

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
<<<<<<< Updated upstream
      <div className="section-label reveal">Your Custom AI Employees</div>
      <h2 className="section-heading reveal reveal-delay-1">
        What we can do for <em>{selectedIndustry === 0 ? 'your company' : currentIndustry.title}</em>
      </h2>
=======
      <div className="section-label reveal">Your Custom AI Employees </div>
     <h2 className="section-heading reveal reveal-delay-1">
  What we can do for <em>{currentIndustry.title === 'Your Company' ? 'your company' : currentIndustry.title}</em>
</h2>
      <p className="section-subtext reveal reveal-delay-2">
      </p>
>>>>>>> Stashed changes

      <div className="industry-tabs reveal reveal-delay-2">
        {industries.map((industry, index) => (
          <button
            key={industry.title}
            className={`industry-tab ${selectedIndustry === index ? 'active' : ''}`}
            onClick={() => setSelectedIndustry(index)}
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
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ICONS[card.iconKey] || ICONS.check} />
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
