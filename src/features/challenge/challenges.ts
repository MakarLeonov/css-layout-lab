import type { FlexboxState } from '@/features/flexbox/store/flexboxStore'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type ChallengeCategory = 'Flexbox' | 'Grid' | 'Position' | 'Box Model' | 'Display' | 'Overflow' | 'Z-Index'

// Generic answer state — each category uses different fields
export interface ChallengeAnswer {
  // Flexbox
  direction?: string
  justifyContent?: string
  alignItems?: string
  flexWrap?: string
  // Grid
  templateColumns?: string
  gap?: number
  // Position
  position?: string
  // Box Model
  boxSizing?: string
  // Display
  display?: string
  // Overflow
  overflow?: string
  // Z-Index
  zIndexCorrect?: boolean
}

export interface Challenge {
  id: number
  category: ChallengeCategory
  difficulty: Difficulty
  title: string
  description: string
  hint?: string
  // For visual preview — each category renders differently
  target: ChallengeAnswer
  check: (answer: ChallengeAnswer) => boolean
}

export const CHALLENGES: Challenge[] = [

  // ─── FLEXBOX ──────────────────────────────────────────────
  {
    id: 1,
    category: 'Flexbox',
    difficulty: 'easy',
    title: 'Center Everything',
    description: 'Center all items both horizontally and vertically inside the flex container.',
    hint: 'justify-content centers on the main axis, align-items on the cross axis.',
    target: { direction: 'row', justifyContent: 'center', alignItems: 'center' },
    check: (s) => s.justifyContent === 'center' && s.alignItems === 'center',
  },
  {
    id: 2,
    category: 'Flexbox',
    difficulty: 'easy',
    title: 'Space Between',
    description: 'Distribute items with equal space between them — first and last flush to the edges.',
    hint: 'Look at the space-between value for justify-content.',
    target: { direction: 'row', justifyContent: 'space-between', alignItems: 'center' },
    check: (s) => s.justifyContent === 'space-between',
  },
  {
    id: 3,
    category: 'Flexbox',
    difficulty: 'easy',
    title: 'Stretch to Fill',
    description: 'Make all items stretch to fill the full height of the container.',
    hint: 'align-items: stretch is the default — but try it explicitly.',
    target: { direction: 'row', justifyContent: 'flex-start', alignItems: 'stretch' },
    check: (s) => s.alignItems === 'stretch' && s.direction === 'row',
  },
  {
    id: 4,
    category: 'Flexbox',
    difficulty: 'medium',
    title: 'Column Stack Center',
    description: 'Stack items vertically and center them on both axes.',
    hint: 'Change flex-direction to column first, then center both axes.',
    target: { direction: 'column', justifyContent: 'center', alignItems: 'center' },
    check: (s) => s.direction === 'column' && s.justifyContent === 'center' && s.alignItems === 'center',
  },
  {
    id: 5,
    category: 'Flexbox',
    difficulty: 'medium',
    title: 'Flex Wrap Grid',
    description: 'Allow items to wrap onto multiple lines, starting from the top-left.',
    hint: 'Enable flex-wrap and set both axes to flex-start.',
    target: { direction: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap' },
    check: (s) => s.flexWrap === 'wrap' && s.justifyContent === 'flex-start',
  },
  {
    id: 6,
    category: 'Flexbox',
    difficulty: 'hard',
    title: 'Reverse Column End',
    description: 'Stack items in reverse column order, aligned to the right edge.',
    hint: 'column-reverse + align-items: flex-end.',
    target: { direction: 'column-reverse', justifyContent: 'flex-start', alignItems: 'flex-end' },
    check: (s) => s.direction === 'column-reverse' && s.alignItems === 'flex-end',
  },

  // ─── GRID ─────────────────────────────────────────────────
  {
    id: 7,
    category: 'Grid',
    difficulty: 'easy',
    title: 'Three Equal Columns',
    description: 'Create a 3-column grid where every column is equal width.',
    hint: '1fr means one fraction of available space.',
    target: { templateColumns: '1fr 1fr 1fr' },
    check: (s) => s.templateColumns === '1fr 1fr 1fr' || s.templateColumns === 'repeat(3, 1fr)',
  },
  {
    id: 8,
    category: 'Grid',
    difficulty: 'easy',
    title: 'Sidebar Layout',
    description: 'Create a layout with a fixed 240px sidebar and a flexible main area.',
    hint: 'Mix a fixed pixel value with 1fr for the flexible column.',
    target: { templateColumns: '240px 1fr' },
    check: (s) => (s.templateColumns ?? '').replace(/\s+/g, ' ').trim() === '240px 1fr',
  },
  {
    id: 9,
    category: 'Grid',
    difficulty: 'medium',
    title: 'Holy Grail',
    description: 'Create a classic 3-column layout: fixed sidebar, flexible center, fixed sidebar.',
    hint: 'Two fixed outer columns, one flexible center.',
    target: { templateColumns: '200px 1fr 200px' },
    check: (s) => /^\d+px\s+1fr\s+\d+px$/.test((s.templateColumns ?? '').trim()),
  },
  {
    id: 10,
    category: 'Grid',
    difficulty: 'medium',
    title: 'Add a Gap',
    description: 'Create a 3-column grid with 16px gap between all cells.',
    hint: 'gap applies to both rows and columns at once.',
    target: { templateColumns: '1fr 1fr 1fr', gap: 16 },
    check: (s) => (s.templateColumns === '1fr 1fr 1fr' || s.templateColumns === 'repeat(3, 1fr)') && s.gap === 16,
  },
  {
    id: 11,
    category: 'Grid',
    difficulty: 'hard',
    title: 'Auto-Fill Responsive',
    description: 'Create a grid that automatically fills columns of at least 120px, filling available space.',
    hint: 'Use repeat() with auto-fill and minmax().',
    target: { templateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' },
    check: (s) => (s.templateColumns ?? '').includes('auto-fill') && (s.templateColumns ?? '').includes('minmax'),
  },

  // ─── POSITION ─────────────────────────────────────────────
  {
    id: 12,
    category: 'Position',
    difficulty: 'easy',
    title: 'Out of Flow',
    description: 'Remove the element from the normal document flow so siblings ignore its space.',
    hint: 'Two values remove an element from flow: absolute and fixed.',
    target: { position: 'absolute' },
    check: (s) => s.position === 'absolute' || s.position === 'fixed',
  },
  {
    id: 13,
    category: 'Position',
    difficulty: 'easy',
    title: 'Stay in Flow',
    description: 'Position the element relative to its normal position without removing it from flow.',
    hint: 'relative keeps the space reserved, absolute does not.',
    target: { position: 'relative' },
    check: (s) => s.position === 'relative',
  },
  {
    id: 14,
    category: 'Position',
    difficulty: 'medium',
    title: 'Stick to Viewport',
    description: 'Make the element stay in the same spot on screen regardless of scrolling.',
    hint: 'fixed positions relative to the viewport, not the page.',
    target: { position: 'fixed' },
    check: (s) => s.position === 'fixed',
  },
  {
    id: 15,
    category: 'Position',
    difficulty: 'medium',
    title: 'Scroll-Aware',
    description: 'Make the element behave like relative until it reaches the top of the scroll container, then stick.',
    hint: 'sticky is the hybrid between relative and fixed.',
    target: { position: 'sticky' },
    check: (s) => s.position === 'sticky',
  },
  {
    id: 16,
    category: 'Position',
    difficulty: 'hard',
    title: 'Default Flow',
    description: 'Set the element to use default browser flow — top/left/right/bottom have no effect here.',
    hint: 'What is the default value of the position property?',
    target: { position: 'static' },
    check: (s) => s.position === 'static',
  },

  // ─── BOX MODEL ────────────────────────────────────────────
  {
    id: 17,
    category: 'Box Model',
    difficulty: 'easy',
    title: 'Predictable Sizing',
    description: 'Make the element\'s declared width include its padding and border — the element should not grow beyond its stated size.',
    hint: 'border-box makes width = content + padding + border.',
    target: { boxSizing: 'border-box' },
    check: (s) => s.boxSizing === 'border-box',
  },
  {
    id: 18,
    category: 'Box Model',
    difficulty: 'easy',
    title: 'Content-Only Width',
    description: 'Make the element\'s declared width apply only to content — padding and border are added on top.',
    hint: 'This is the browser default behaviour.',
    target: { boxSizing: 'content-box' },
    check: (s) => s.boxSizing === 'content-box',
  },
  {
    id: 19,
    category: 'Box Model',
    difficulty: 'medium',
    title: 'Which Grows Bigger?',
    description: 'Two elements both have width: 200px, padding: 20px, border: 5px. Which one renders wider with content-box vs border-box?',
    hint: 'content-box: rendered = 200 + 20*2 + 5*2 = 250px. border-box: rendered = exactly 200px.',
    target: { boxSizing: 'content-box' },
    check: (s) => s.boxSizing === 'content-box',
  },

  // ─── DISPLAY ──────────────────────────────────────────────
  {
    id: 20,
    category: 'Display',
    difficulty: 'easy',
    title: 'Full-Width Block',
    description: 'Make the element take up the full available width and start on a new line.',
    hint: 'block elements stack vertically and expand to fill their container.',
    target: { display: 'block' },
    check: (s) => s.display === 'block',
  },
  {
    id: 21,
    category: 'Display',
    difficulty: 'easy',
    title: 'Inline Flow',
    description: 'Make elements flow inline with text — no line break before or after.',
    hint: 'inline elements sit within the text flow. Width and height are ignored.',
    target: { display: 'inline' },
    check: (s) => s.display === 'inline',
  },
  {
    id: 22,
    category: 'Display',
    difficulty: 'easy',
    title: 'Hide It',
    description: 'Make the element invisible AND remove it from the layout flow entirely.',
    hint: 'display: none removes the element completely. visibility: hidden hides it but keeps the space.',
    target: { display: 'none' },
    check: (s) => s.display === 'none',
  },
  {
    id: 23,
    category: 'Display',
    difficulty: 'medium',
    title: 'Inline but Boxed',
    description: 'Make elements sit inline like text, but still respect width, height, and vertical padding.',
    hint: 'inline-block: inline flow + full box model support.',
    target: { display: 'inline-block' },
    check: (s) => s.display === 'inline-block',
  },
  {
    id: 24,
    category: 'Display',
    difficulty: 'medium',
    title: 'Enable Flex Context',
    description: 'Create a flex formatting context so children can be laid out with flexbox properties.',
    hint: 'display: flex makes the element a flex container.',
    target: { display: 'flex' },
    check: (s) => s.display === 'flex',
  },

  // ─── OVERFLOW ─────────────────────────────────────────────
  {
    id: 25,
    category: 'Overflow',
    difficulty: 'easy',
    title: 'Show Everything',
    description: 'Let content overflow outside the container without clipping or scrollbars.',
    hint: 'The default overflow value — content spills out freely.',
    target: { overflow: 'visible' },
    check: (s) => s.overflow === 'visible',
  },
  {
    id: 26,
    category: 'Overflow',
    difficulty: 'easy',
    title: 'Clip Silently',
    description: 'Hide any content that exceeds the container boundaries — no scrollbar.',
    hint: 'hidden clips content but gives the user no way to reach the overflow.',
    target: { overflow: 'hidden' },
    check: (s) => s.overflow === 'hidden',
  },
  {
    id: 27,
    category: 'Overflow',
    difficulty: 'medium',
    title: 'Always Scroll',
    description: 'Show scrollbars on the container at all times, even when content fits.',
    hint: 'scroll forces scrollbars regardless of whether they are needed.',
    target: { overflow: 'scroll' },
    check: (s) => s.overflow === 'scroll',
  },
  {
    id: 28,
    category: 'Overflow',
    difficulty: 'medium',
    title: 'Smart Scroll',
    description: 'Only show scrollbars when content actually overflows the container.',
    hint: 'auto is like scroll, but scrollbars appear only on demand.',
    target: { overflow: 'auto' },
    check: (s) => s.overflow === 'auto',
  },

  // ─── Z-INDEX ──────────────────────────────────────────────
  {
    id: 29,
    category: 'Z-Index',
    difficulty: 'easy',
    title: 'Bring to Front',
    description: 'Z-index only works on positioned elements (non-static). Which position value must you set first?',
    hint: 'z-index has no effect on position: static.',
    target: { position: 'relative' },
    check: (s) => s.position !== 'static' && s.position !== undefined,
  },
  {
    id: 30,
    category: 'Z-Index',
    difficulty: 'easy',
    title: 'Stack Order',
    description: 'Higher z-index = closer to the viewer. Set position to relative so z-index takes effect.',
    hint: 'Without a position value other than static, z-index is ignored.',
    target: { position: 'relative' },
    check: (s) => s.position === 'relative' || s.position === 'absolute',
  },
  {
    id: 31,
    category: 'Z-Index',
    difficulty: 'medium',
    title: 'Stacking Context',
    description: 'A new stacking context is created when an element has position + z-index, or certain other properties. Which position value creates a stacking context with z-index: 1?',
    hint: 'absolute, relative, fixed, and sticky all create stacking contexts when combined with a z-index value other than auto.',
    target: { position: 'absolute' },
    check: (s) => s.position === 'absolute' || s.position === 'fixed',
  },
]

export const CHALLENGE_CATEGORIES: ChallengeCategory[] = [
  'Flexbox', 'Grid', 'Position', 'Box Model', 'Display', 'Overflow', 'Z-Index',
]
