import type { FlexboxState } from '@/features/flexbox/store/flexboxStore'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Challenge {
  id: number
  difficulty: Difficulty
  title: string
  description: string
  target: Partial<FlexboxState>
  check: (state: FlexboxState) => boolean
  hint?: string
}

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    difficulty: 'easy',
    title: 'Center Everything',
    description: 'Center all items both horizontally and vertically inside the container.',
    hint: 'Try justify-content: center and align-items: center',
    target: { direction: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap' },
    check: (s) => s.justifyContent === 'center' && s.alignItems === 'center',
  },
  {
    id: 2,
    difficulty: 'easy',
    title: 'Space Between',
    description: 'Distribute items evenly with maximum space between them, flush to the edges.',
    hint: 'Look at the space-between value for justify-content',
    target: { direction: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' },
    check: (s) => s.justifyContent === 'space-between',
  },
  {
    id: 3,
    difficulty: 'easy',
    title: 'Stretch to Fill',
    description: 'Make all items stretch to fill the full height of the container.',
    hint: 'align-items controls cross-axis behaviour',
    target: { direction: 'row', justifyContent: 'flex-start', alignItems: 'stretch', flexWrap: 'nowrap' },
    check: (s) => s.alignItems === 'stretch' && s.direction === 'row',
  },
  {
    id: 4,
    difficulty: 'medium',
    title: 'Column Stack Center',
    description: 'Stack items vertically and center them on both axes.',
    hint: 'Change the flex-direction first',
    target: { direction: 'column', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap' },
    check: (s) => s.direction === 'column' && s.justifyContent === 'center' && s.alignItems === 'center',
  },
  {
    id: 5,
    difficulty: 'medium',
    title: 'Flex Wrap Grid',
    description: 'Allow items to wrap onto multiple lines, aligned to the start.',
    hint: 'Enable flex-wrap and set alignment to flex-start',
    target: { direction: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap' },
    check: (s) => s.flexWrap === 'wrap' && s.direction === 'row' && s.justifyContent === 'flex-start',
  },
  {
    id: 6,
    difficulty: 'medium',
    title: 'End Alignment',
    description: 'Push all items to the end of the main axis and align them to the end of the cross axis.',
    hint: 'Both justify-content and align-items need to be flex-end',
    target: { direction: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', flexWrap: 'nowrap' },
    check: (s) => s.justifyContent === 'flex-end' && s.alignItems === 'flex-end',
  },
  {
    id: 7,
    difficulty: 'hard',
    title: 'Reverse Column End',
    description: 'Stack items in reverse column order with items aligned to the end of the cross axis.',
    hint: 'column-reverse + flex-end alignment',
    target: { direction: 'column-reverse', justifyContent: 'flex-start', alignItems: 'flex-end', flexWrap: 'nowrap' },
    check: (s) => s.direction === 'column-reverse' && s.alignItems === 'flex-end',
  },
  {
    id: 8,
    difficulty: 'hard',
    title: 'Space Evenly Wrapped',
    description: 'Items should wrap and be spaced evenly across the main axis.',
    hint: 'You need both wrapping and space-evenly distribution',
    target: { direction: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' },
    check: (s) => s.justifyContent === 'space-evenly' && s.flexWrap === 'wrap',
  },
]
