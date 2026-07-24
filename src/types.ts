export type Theme = 'light' | 'dark'

export type KnowledgeTopic = {
  id: string
  number: string
  title: string
  date?: string
  level: 'Podstawowy' | 'Średni' | 'Zaawansowany'
  summary: string
  goals: string[]
  sections: Array<{
    heading: string
    paragraphs?: string[]
    bullets?: string[]
    example?: string
    note?: string
  }>
}

export type CommandItem = {
  id: string
  title: string
  command: string
  description: string
  useWhen: string
  exampleOutput?: string
  warning?: string
  tags: string[]
}

export type CommandGroup = {
  id: 'tp-link' | 'netgear' | 'cisco' | 'windows'
  label: string
  intro: string
  commands: CommandItem[]
}

export type ToolItem = {
  id: string
  name: string
  category: string
  purpose: string
  workflow: string[]
  command?: string
  proTip?: string
}

export type StandardStep = {
  number: string
  title: string
  description: string
  checklist: string[]
  output: string
}
