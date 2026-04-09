import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className="w-full border-t border-border bg-background dark:bg-[#1F1F1F]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-y-6 gap-x-4 px-6 py-8 max-w-7xl mx-auto">
                <Logo />
                <div className="text-sm text-muted-foreground text-center sm:text-right">
                    <p>&copy; 2025 ZenHub. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
