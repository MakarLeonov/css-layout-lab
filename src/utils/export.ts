import { generateExportHTML } from '@/features/flexbox/utils/cssGen'
import type { FlexboxState } from '@/features/flexbox/store/flexboxStore'

export function exportToCodeSandbox(state: FlexboxState) {
  const html = generateExportHTML(state)
  const parameters = btoa(
    JSON.stringify({
      files: {
        'index.html': { content: html },
      },
    })
  )
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define'
  form.target = '_blank'
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'parameters'
  input.value = parameters
  form.appendChild(input)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

export function exportToStackBlitz(state: FlexboxState) {
  const html = generateExportHTML(state)
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'https://stackblitz.com/run'
  form.target = '_blank'

  const fields: [string, string][] = [
    ['project[title]', 'CSS Layout Lab Export'],
    ['project[description]', 'Exported from CSS Layout Lab'],
    ['project[template]', 'html'],
    ['project[files][index.html]', html],
  ]

  for (const [name, value] of fields) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  }

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
