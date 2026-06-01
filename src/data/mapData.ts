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
  href?: string; // external URL or internal slug
  external?: boolean; // true → open href; false/undefined → /work/:id
}

export type MapLink = [from: string, to: string, kind: LinkKind];

export const CAT: Record<Category, { label: string; color: string }> = {
  platform: { label: 'Platform', color: '#ff6392' },
  writing: { label: 'Writing', color: '#98ce00' },
  design: { label: 'Design', color: '#e8b04b' },
  video: { label: 'Moving Image', color: '#6ea8d8' },
};

export const WORKS: MapNode[] = [
  { id: 'cond', cat: 'writing', g: [560, 280], label: 'up', title: 'MARE: The Condition', meta: '2025 · framing text — where it begins', external: true, href: 'https://maredotrun.substack.com/p/mare-the-condition' },
  { id: 'predict', cat: 'writing', g: [440, 320], label: 'left', title: 'Predictionism', meta: '2025 · essay', external: true, href: 'https://maredotrun.substack.com/p/predictionism-and-the-cybernetic' },
  { id: 'interior', cat: 'writing', g: [400, 440], label: 'left', title: 'Conditions of Interiority', meta: 'Nov 2025 · Interiority I', external: true, href: 'https://maredotrun.substack.com/p/conditions-of-interiority-13' },
  { id: 'cyber', cat: 'writing', g: [400, 520], label: 'left', title: 'The Cybernetic Subject', meta: 'Dec 2025 · Interiority II', external: true, href: 'https://maredotrun.substack.com/p/the-cybernetic-subject-23' },
  { id: 'afterint', cat: 'writing', g: [400, 600], label: 'left', title: 'After Interiority', meta: 'Jan 2026 · Interiority III', external: true, href: 'https://maredotrun.substack.com' },
  { id: 'flesh', cat: 'writing', g: [480, 680], label: 'up', title: 'The Technical Flesh', meta: 'Mar 2026 · Coupling, pt. 1 of 2', external: true, href: 'https://maredotrun.substack.com' },
  { id: 'zones1', cat: 'writing', g: [520, 720], label: 'right', title: 'Zones of Coupling I', meta: 'Apr 2026 · Possession', external: true, href: 'https://maredotrun.substack.com' },
  { id: 'zones2', cat: 'writing', g: [520, 760], label: 'right', title: 'Zones of Coupling II', meta: 'May 2026 · Manifestation', external: true, href: 'https://maredotrun.substack.com' },
  { id: 'zones3', cat: 'writing', g: [520, 800], label: 'right', dim: true, title: 'Zones of Coupling III', meta: 'forthcoming' },
  { id: 'mare', cat: 'platform', g: [680, 280], label: 'up', hub: true, title: 'MARE', meta: '2025– · platform', external: true, href: 'https://mare.run' },
  { id: 'visid', cat: 'design', g: [800, 280], label: 'up', title: 'Visual identity, MARE', meta: '2025' },
  { id: 'iface', cat: 'design', g: [920, 280], label: 'up', title: 'Interface, MARE', meta: '2025' },
  { id: 'namshub', cat: 'platform', g: [680, 440], label: 'left', hub: true, title: 'Namshub', meta: '2025– · ambient writing platform · namshub.observer', external: true, href: 'https://namshub.observer' },
  { id: 'ns-visid', cat: 'design', g: [800, 440], label: 'down', title: 'Visual identity, Namshub', meta: '2026' },
  { id: 'ns-iface', cat: 'design', g: [960, 440], label: 'down', title: 'Interface, Namshub', meta: '2026' },
  { id: 'sydney', cat: 'video', g: [680, 160], label: 'up', collab: true, title: 'Shortwave × Soft Centre', meta: '2026 · Sydney Opera House, Vivid Live · Creative Consultant', external: true, href: 'https://www.sydneyoperahouse.com/vivid-live/shortwave-x-soft-centre' },
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
