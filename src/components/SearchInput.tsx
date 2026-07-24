import { Search, X } from 'lucide-react'
import type { ChangeEvent } from 'react'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <label className="search-input">
      <Search size={18} aria-hidden="true" />
      <input value={value} onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)} placeholder={placeholder} />
      {value && (
        <button type="button" onClick={() => onChange('')} aria-label="Wyczyść wyszukiwanie">
          <X size={17} />
        </button>
      )}
    </label>
  )
}
