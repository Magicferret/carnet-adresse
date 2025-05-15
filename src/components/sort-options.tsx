"use client"
/**
 * Composant pour les options de tri.
 * Permet de trier les contacts par nom ou prénom et par ordre croissant ou décroissant.
 */
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, SortAsc, SortDesc } from "lucide-react"

interface SortOptionsProps {
  sortField: "firstName" | "lastName"
  sortOrder: "asc" | "desc"
  onSortFieldChange: (field: "firstName" | "lastName") => void
  onSortOrderChange: (order: "asc" | "desc") => void
}

export function SortOptions({ sortField, sortOrder, onSortFieldChange, onSortOrderChange }: SortOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          <span>Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <p className="text-sm font-medium mb-2">Sort by</p>
          <DropdownMenuRadioGroup value={sortField} onValueChange={(value: string) => onSortFieldChange(value as "firstName" | "lastName")}>
            <DropdownMenuRadioItem value="firstName">First Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="lastName">Last Name</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <p className="text-sm font-medium mb-2">Order</p>
          <DropdownMenuRadioGroup value={sortOrder} onValueChange={(value: string) => onSortOrderChange(value as "asc" | "desc")}>
            <DropdownMenuRadioItem value="asc" className="flex items-center">
              <SortAsc className="mr-2 h-4 w-4" />
              Ascending (A-Z)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc" className="flex items-center">
              <SortDesc className="mr-2 h-4 w-4" />
              Descending (Z-A)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
