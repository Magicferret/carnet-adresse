import { SearchBar } from '@/components/search-bar'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('SearchBar', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    expect(screen.getByPlaceholderText('Search contacts...')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays the provided value', () => {
    const searchValue = 'John'
    render(<SearchBar value={searchValue} onChange={mockOnChange} />)

    expect(screen.getByDisplayValue(searchValue)).toBeInTheDocument()
  })

  it('calls onChange when input value changes', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'John' } })

    expect(mockOnChange).toHaveBeenCalledWith('John')
  })

  it('has search icon', () => {
    const { container } = render(<SearchBar value="" onChange={mockOnChange} />)

    // Vérifier que l'icône de recherche est présente en utilisant la classe CSS
    const searchIcon = container.querySelector('.lucide-search')
    expect(searchIcon).toBeInTheDocument()
  })
})
