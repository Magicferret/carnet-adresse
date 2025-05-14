/**
 * Composant de sélection d'avatar.
 * Permet de choisir un avatar parmi une liste prédéfinie.
 */
"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const avatars = [
    "bear", "buffalo", "cat", "dog", "fish", "frog", "frog2",
    "gorilla", "ox", "pig", "rabbit", "rabbit2", "turtle"
]

interface AvatarSelectorProps {
    selectedAvatar: string | null
    onAvatarSelect: (avatar: string | null) => void
}

export function AvatarSelector({
    selectedAvatar,
    onAvatarSelect,
}: AvatarSelectorProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
                {avatars.map((avatar) => (
                    <button
                        key={avatar}
                        type="button"
                        onClick={() => onAvatarSelect(avatar)}
                        className={cn(
                            "relative p-2 border rounded-lg hover:bg-accent transition-colors",
                            selectedAvatar === avatar && "border-primary"
                        )}
                    >
                        <img
                            src={`/avatars/${avatar}.svg`}
                            alt={avatar}
                            className="w-12 h-12"
                        />
                        {selectedAvatar === avatar && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
