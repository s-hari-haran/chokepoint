import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const helpSections = [
  {
    id: 'overview',
    title: 'Dashboard Overview',
    content:
      'This dashboard displays structural supply-chain risk for critical materials. It combines country-level supply concentration with industry dependency to compute vulnerability scores.',
  },
  {
    id: 'metal-selector',
    title: 'Metal Selector',
    content:
      'This panel shows the available critical materials. Selecting a metal updates all dashboard panels to reflect that material\'s risk profile.',
  },
  {
    id: 'risk-badges',
    title: 'Risk Badges',
    content:
      'Risk levels are computed from supply concentration × industry dependency. Low (0–1.5), Moderate (1.5–3.0), High (3.0+).',
  },
  {
    id: 'supply-concentration',
    title: 'Supply Concentration',
    content:
      'This panel shows which countries control supply for the selected metal. Higher concentration in fewer countries indicates greater structural risk.',
  },
  {
    id: 'industry-impact',
    title: 'Industry Impact',
    content:
      'This panel shows which industries depend on the selected metal. Dependency scores range from 1 (low) to 5 (critical).',
  },
  {
    id: 'choke-points',
    title: 'Choke Point Alerts',
    content:
      'Choke points are active supply-chain disruptions. Types include: export restrictions, production halts, logistics disruptions, and policy changes.',
  },
  {
    id: 'exposure-ranking',
    title: 'Exposure Ranking',
    content:
      'This table ranks industries by vulnerability. Vulnerability = supply concentration × dependency score.',
  },
  {
    id: 'signal-timeline',
    title: 'Signal Timeline',
    content:
      'Signals are news and policy events detected by automated search. These are not live price feeds. Signals help explain why risk conditions may be changing.',
  },
  {
    id: 'refresh-data',
    title: 'Refresh Data',
    content:
      'Triggers a Firecrawl signal refresh to pull latest news. Baseline supply and dependency data does not change — only signals update.',
  },
];

export const HelpGuide = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border-brutal bg-background shadow-brutal transition-transform hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
          aria-label="Help"
        >
          <HelpCircle className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-brutal-4 shadow-brutal-lg sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl uppercase tracking-wider">
            How to use this dashboard
          </DialogTitle>
        </DialogHeader>

        {/* Quick start bullets */}
        <ul className="mb-4 space-y-2 border-l-4 border-foreground pl-4 font-mono text-sm">
          <li>Select a metal to view structural supply risk</li>
          <li>Use risk badges and exposure ranking to identify fragile industries</li>
          <li>Use the signal timeline to understand why risk changes</li>
        </ul>

        {/* Accordion sections */}
        <Accordion type="single" collapsible className="w-full">
          {helpSections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border-b-2 border-foreground"
            >
              <AccordionTrigger className="font-mono text-sm uppercase hover:no-underline">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};
