export type Category = 'platform' | 'writing' | 'design' | 'video';
export type LinkKind = 'flow' | 'cross' | 'crossdash' | 'dash';
export type LabelPos = 'up' | 'down' | 'left' | 'right';

export interface MapNode {
  id: string;
  cat: Category;
  title: string;
  meta: string;
  g: [number, number]; // authored grid position
  label: LabelPos;
  hub?: boolean;
  collab?: boolean;
  dim?: boolean;
  href?: string; // external URL — surfaces as the modal's CTA when present
  caseStudy?: boolean; // true → navigate to a case-study page; otherwise open the panel
  caseStudySlug?: string; // case-study route to use instead of the node id (lets nodes share a page)
  blurb?: string; // modal description; absent → node reads as "forthcoming"
  tags?: string[]; // modal tag line
  image?: string; // modal hero image (url or /public path)
}

export type MapLink = [from: string, to: string, kind: LinkKind];

export const CAT: Record<Category, { label: string; color: string }> = {
  platform: { label: 'Platform', color: '#ff6392' },
  writing: { label: 'Writing', color: '#98ce00' },
  design: { label: 'Design', color: '#e8b04b' },
  video: { label: 'Moving Image', color: '#6ea8d8' },
};

export const WORKS: MapNode[] = [
  { id: 'cond', cat: 'writing', g: [560, 280], label: 'up', title: 'MARE: The Condition', meta: '2025 · framing text — where it begins', href: 'https://maredotrun.substack.com/p/mare-the-condition', tags: ['manifesto', 'archive', 'platform'], blurb: 'The founding statement for MARE. It diagnoses a condition of media abundance in which we have accumulated more than memory can hold and increasingly delegate it to language models that compress everything into an undifferentiated mass. From that exhaustion it poses its question — what becomes of attention, authorship, and the human once information no longer needs us to carry it — and sets out MARE, the Media Agnostic Research Entity, as a project studying the human as a technical composition formed between media and technology. It ends with six operating principles.' },
  { id: 'predict', cat: 'writing', g: [440, 320], label: 'left', title: 'Predictionism', meta: '2025 · essay', href: 'https://maredotrun.substack.com/p/predictionism-and-the-cybernetic', tags: ['prediction', 'agency', 'cybernetics'], blurb: 'A reply to Alex Danco’s a16z essay declaring predictionism the successor to postmodernism. It argues that predictionism is not a new epoch but a rebranding of cybernetics, tracing a seventy-year genealogy from Wiener and Hayek through ARPANET, Stafford Beer’s Cybersyn, and neoliberal governance. It then examines the datafied subject this produces and closes, drawing on Simondon, by calling for symbiosis with technical systems rather than worship or refusal.' },
  { id: 'interior', cat: 'writing', g: [400, 440], label: 'left', title: 'Conditions of Interiority', meta: 'Nov 2025 · Interiority I', href: 'https://maredotrun.substack.com/p/conditions-of-interiority-13', tags: ['interiority', 'ai', 'subject'], image: '/essays/interior.webp', blurb: 'The first essay in a trilogy on AI, creativity, and the subject. It traces the inner life not as a human universal but as a historically constructed inheritance, running from Augustine’s confession and the Cartesian cogito to its secular reproduction across digital platforms. It argues that the conditions that once sustained interiority have eroded, leaving it intact as feeling but hollowed out as structure.' },
  { id: 'cyber', cat: 'writing', g: [400, 520], label: 'left', title: 'The Cybernetic Subject', meta: 'Dec 2025 · Interiority II', href: 'https://maredotrun.substack.com/p/the-cybernetic-subject-23', tags: ['cybernetics', 'cognition', 'subject'], image: '/essays/cyber.webp', blurb: 'The second essay in the trilogy. It argues that interiority no longer grounds cognition, and reframes thinking through cybernetics understood as a regime of feedback, recursion, and self-regulation rather than a set of technologies. Drawing on Wiener, second-order cybernetics, and autopoiesis, and using hyperpop and the digital audio workstation as its case, it describes creativity as the navigation of technical systems rather than the expression of an inner idea.' },
  { id: 'afterint', cat: 'writing', g: [400, 600], label: 'left', title: 'After Interiority', meta: 'Jan 2026 · Interiority III', href: 'https://maredotrun.substack.com/p/after-interiority-33', tags: ['interiority', 'subject'], image: '/essays/afterint.webp', blurb: 'The final essay in the trilogy. It asks where human agency lies once interiority no longer grounds it, rejecting both technological refusal and uncritical acceleration. Through Goethe’s Faust it diagnoses a bargain with speed that collapses judgement into immediacy; through the figure of Solomon it proposes naming and constraining technical forces rather than commanding them. It closes by arguing for tools that preserve the friction judgement requires.' },
  { id: 'flesh', cat: 'writing', g: [480, 680], label: 'up', title: 'The Technical Flesh', meta: 'Mar 2026 · Coupling, pt. 1 of 2', href: 'https://maredotrun.substack.com/p/the-technical-flesh-12', tags: ['coupling', 'embodiment'], image: '/essays/flesh.webp', blurb: 'The first part of a two-part series on coupling. It treats the human as constitutively technical and uses the myth of the Golem of Prague to examine how people and the intelligences they build transform one another. It reads the golem’s animating shem as operative language akin to an API key or system prompt, and draws on Merleau-Ponty’s concept of flesh to describe coupling as a reversible relation that degrades into possession when one party accumulates autonomy and the other becomes dependent.' },
  { id: 'zones1', cat: 'writing', g: [520, 720], label: 'right', title: 'Zones of Coupling I', meta: 'Apr 2026 · Possession', href: 'https://maredotrun.substack.com/p/zones-of-coupling-22-part-i-possession', tags: ['coupling', 'possession'], image: '/essays/zones1.webp', blurb: 'The second part of the coupling series, which distinguishes three registers of technical binding: possession, manifestation, and pact. This installment treats possession, the way a technology installs itself in body and desire before it is consciously chosen and becomes legible only in retrospect. It develops the concept through Heidegger’s thrownness, Stiegler, and cyberpunk fiction, with Julia Ducournau’s film Titane as its central case.' },
  { id: 'zones2', cat: 'writing', g: [520, 760], label: 'right', title: 'Zones of Coupling II', meta: 'May 2026 · Manifestation', href: 'https://maredotrun.substack.com/p/zones-of-coupling-22-part-ii-manifestation', tags: ['coupling', 'manifestation'], image: '/essays/zones2.webp', blurb: 'The second register of the coupling series: manifestation, or how one acts deliberately within a possession that cannot be escaped. It specifies Heidegger’s Gelassenheit as a practice by combining Simondon’s account of technical objects with the Renaissance magic of Giordano Bruno, for whom binding operates through Eros and runs in both directions. Its contemporary case is sustained writing with a large language model, where each prompt both directs the model and reshapes the writer.' },
  { id: 'zones3', cat: 'writing', g: [520, 800], label: 'right', dim: true, title: 'Zones of Coupling III', meta: 'forthcoming' },
  { id: 'mare', cat: 'platform', g: [680, 280], label: 'up', hub: true, title: 'MARE', meta: '2025– · platform', href: 'https://mare.run', tags: ['archive', 'ai', 'cognition', 'platform'], image: '/assets/mare-preview.png', blurb: 'A media-agnostic research platform concerned with how humans and machines make sense of large volumes of media under contemporary computational conditions. Rather than organising material through recommendation or optimisation, MARE foregrounds semantic proximity, mood, and relational association as navigational primitives. The platform operates as a field lab between human and machine sense-making — both a working tool and an ongoing research project.' },
  { id: 'visid', cat: 'design', g: [800, 280], label: 'up', caseStudy: true, caseStudySlug: 'mare-design', title: 'Visual identity, MARE', meta: '2025 · identity system' },
  { id: 'iface', cat: 'design', g: [920, 280], label: 'up', caseStudy: true, caseStudySlug: 'mare-design', title: 'Interface, MARE', meta: '2025 · product design' },
  { id: 'namshub', cat: 'platform', g: [680, 440], label: 'down', hub: true, caseStudy: true, title: 'Namshub', meta: '2025– · ambient AI writing environment' },
  { id: 'ns-visid', cat: 'design', g: [800, 440], label: 'down', caseStudy: true, caseStudySlug: 'namshub', title: 'Visual identity, Namshub', meta: '2026 · identity system' },
  { id: 'ns-iface', cat: 'design', g: [960, 440], label: 'down', caseStudy: true, caseStudySlug: 'namshub', title: 'Interface, Namshub', meta: '2026 · product design' },
  { id: 'sydney', cat: 'video', g: [680, 160], label: 'up', collab: true, title: 'Shortwave × Soft Centre', meta: '2026 · Sydney Opera House, Vivid Live · Creative Consultant', href: 'https://www.sydneyoperahouse.com/vivid-live/shortwave-x-soft-centre', tags: ['live', 'collaboration', 'moving image'], blurb: 'Creative consultant on Shortwave × Soft Centre, a live audiovisual work for Vivid Live at the Sydney Opera House.' },
];

export const LINKS: MapLink[] = [
  ['cond', 'predict', 'flow'],
  ['predict', 'interior', 'flow'],
  ['interior', 'cyber', 'flow'],
  ['cyber', 'afterint', 'flow'],
  ['afterint', 'flesh', 'flow'],
  ['flesh', 'zones1', 'flow'],
  ['zones1', 'zones2', 'flow'],
  ['zones2', 'zones3', 'dash'],
  ['cond', 'mare', 'cross'],
  ['mare', 'visid', 'cross'],
  ['visid', 'iface', 'flow'],
  ['mare', 'sydney', 'cross'],
  ['mare', 'namshub', 'cross'],
  ['flesh', 'namshub', 'crossdash'],
  ['namshub', 'ns-visid', 'cross'],
  ['ns-visid', 'ns-iface', 'flow'],
];

const byId = WORKS.reduce<Record<string, MapNode>>((m, w) => ((m[w.id] = w), m), {});
export const nodeById = (id: string): MapNode | undefined => byId[id];
