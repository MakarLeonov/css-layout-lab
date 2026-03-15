import type { FlexboxState, FlexItem } from '../store/flexboxStore'

export function generateFlexCSS(state: FlexboxState, selectedItem?: FlexItem | null): string {
  const containerCSS = `.container {
  display: flex;
  flex-direction: ${state.direction};
  justify-content: ${state.justifyContent};
  align-items: ${state.alignItems};
  flex-wrap: ${state.flexWrap};
  gap: ${state.gap}px;
}`

  const itemCSS = selectedItem
    ? `\n\n.item-${selectedItem.id} {
  flex-grow: ${selectedItem.grow};
  flex-shrink: ${selectedItem.shrink};
  flex-basis: ${selectedItem.basis};
  order: ${selectedItem.order};
  align-self: ${selectedItem.alignSelf};
}`
    : ''

  return containerCSS + itemCSS
}

const TAILWIND_MAP: Record<string, Record<string, string>> = {
  direction: {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse',
  },
  justifyContent: {
    'flex-start': 'justify-start',
    center: 'justify-center',
    'flex-end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  },
  alignItems: {
    stretch: 'items-stretch',
    'flex-start': 'items-start',
    center: 'items-center',
    'flex-end': 'items-end',
    baseline: 'items-baseline',
  },
  flexWrap: {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  },
}

export function generateTailwind(state: FlexboxState): string {
  const classes = [
    'flex',
    TAILWIND_MAP.direction[state.direction],
    TAILWIND_MAP.justifyContent[state.justifyContent],
    TAILWIND_MAP.alignItems[state.alignItems],
    TAILWIND_MAP.flexWrap[state.flexWrap],
    state.gap ? `gap-${Math.round(state.gap / 4)}` : '',
  ].filter(Boolean)

  return classes.join(' ')
}

export function generateExportHTML(state: FlexboxState): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Layout Lab Export</title>
  <style>
    body {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: 'JetBrains Mono', monospace;
      background: #f8fafc;
    }
    .container {
      display: flex;
      flex-direction: ${state.direction};
      justify-content: ${state.justifyContent};
      align-items: ${state.alignItems};
      flex-wrap: ${state.flexWrap};
      gap: ${state.gap}px;
      width: 500px;
      min-height: 200px;
      padding: 16px;
      border: 2px dashed #e2e8f0;
      border-radius: 8px;
    }
    .item {
      min-width: 52px;
      min-height: 52px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 18px;
    }
    ${state.items
      .map(
        (item) => `.item-${item.id} {
      background: ${item.bg};
      flex-grow: ${item.grow};
      flex-shrink: ${item.shrink};
      flex-basis: ${item.basis};
      order: ${item.order};
      align-self: ${item.alignSelf};
    }`
      )
      .join('\n    ')}
  </style>
</head>
<body>
  <div class="container">
    ${state.items.map((item) => `<div class="item item-${item.id}">${item.label}</div>`).join('\n    ')}
  </div>
</body>
</html>`
}
