import { ContactList } from '@/components/contact-list'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('ContactList', () => {
  const mockContacts = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '0123456789',
      avatarSlug: null
    },
    {
      id: 2,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: '9876543210',
      avatarSlug: 'avatar1'
    }
  ]

  const mockOnSelect = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders empty state when no contacts', () => {
    render(
      <ContactList
        contacts={[]}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        sortField="lastName"
      />
    )

    expect(screen.getByText('No contacts found')).toBeInTheDocument()
  })

  it('renders contacts grouped by first letter of lastName', () => {
    render(
      <ContactList
        contacts={mockContacts}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        sortField="lastName"
      />
    )

    expect(screen.getByText('D')).toBeInTheDocument() // Pour "Doe"
    expect(screen.getByText('S')).toBeInTheDocument() // Pour "Smith"
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Alice Smith')).toBeInTheDocument()
  })

  it('renders contacts grouped by first letter of firstName when sortField is firstName', () => {
    render(
      <ContactList
        contacts={mockContacts}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        sortField="firstName"
      />
    )

    expect(screen.getByText('A')).toBeInTheDocument() // Pour "Alice"
    expect(screen.getByText('J')).toBeInTheDocument() // Pour "John"
  })

  it('calls onSelect when edit button is clicked', () => {
    render(
      <ContactList
        contacts={mockContacts}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        sortField="lastName"
      />
    )

    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])

    expect(mockOnSelect).toHaveBeenCalledWith(mockContacts[0])
  })

  it('calls onDelete when delete button is clicked and confirmed', () => {
    // Mock de la fonction confirm du navigateur
    const originalConfirm = window.confirm
    window.confirm = jest.fn(() => true)

    render(
      <ContactList
        contacts={mockContacts}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        sortField="lastName"
      />
    )

    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])

    expect(mockOnDelete).toHaveBeenCalledWith(mockContacts[0].id)

    // Restauration de la fonction confirm
    window.confirm = originalConfirm
  })
})
