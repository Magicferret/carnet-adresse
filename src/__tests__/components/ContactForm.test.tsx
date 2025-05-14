import { ContactForm } from '@/components/contact-form'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('ContactForm', () => {
  const mockContact = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '0123456789',
    avatarSlug: null
  }

  const mockOnSubmit = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders empty form correctly', () => {
    render(<ContactForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    expect(screen.getByText('Add New Contact')).toBeInTheDocument()
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
  })

  it('renders form with contact data correctly', () => {
    render(
      <ContactForm
        contact={mockContact}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    )

    expect(screen.getByText('Edit Contact')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('0123456789')).toBeInTheDocument()
  })

  it('calls onSubmit with form data when submitted', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'Jane' }
    })
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Smith' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jane@example.com' }
    })
    fireEvent.change(screen.getByLabelText('Phone'), {
      target: { value: '9876543210' }
    })

    fireEvent.click(screen.getByText('Add Contact'))

    expect(mockOnSubmit).toHaveBeenCalledWith({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      avatarSlug: null
    })
  })

  it('calls onCancel when cancel button is clicked', () => {
    render(<ContactForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    fireEvent.click(screen.getByText('Cancel'))
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('validates required fields', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    fireEvent.click(screen.getByText('Add Contact'))

    // Le formulaire ne devrait pas être soumis si les champs requis sont vides
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
