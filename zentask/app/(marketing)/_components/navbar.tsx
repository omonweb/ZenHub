"use client";

import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export const Navbar = () => {
    const { isAuthenticated, isLoading} = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
        
        <div className="md:ml-auto md:justify-end sm:justify-center
        justify-between w-full flex items-center gap-x-2">
            {isLoading && (
                <Spinner />
            )}
            {!isAuthenticated && !isLoading && (
                <>
                <SignInButton mode="modal" forceRedirectUrl = "/documents" >
                    <Button size="sm">
                        Log in
                    </Button>
                </SignInButton>
                </>
            )}
            {isAuthenticated && !isLoading && (
                <>
                    <UserButton />
                </>
                
            )}
            <ModeToggle />
        </div>
        </div>
    )

}