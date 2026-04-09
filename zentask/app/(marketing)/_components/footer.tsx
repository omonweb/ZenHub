import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className="hidden md:flex items-center w-full p-6 bg-background sm:pt-10 dark:bg-[#1F1F1F] z-50">
            <Logo />
            
        </div>
    )
}