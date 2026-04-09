"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance">
                Your Ideas, Documents, & Plans. Organized.
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium text-muted-foreground">
                Collaborate seamlessly, customize your workspace, and share your work <br />
                with beautiful, organized documents.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                <Spinner size="lg"/>
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild size="lg">
                    <Link href="/documents">
                Enter ZenHub
                <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button size="lg" asChild>
                        <Link href="/demo">
                            Try Demo
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                    </Button>
                    <SignInButton mode="modal">
                        <Button size="lg" variant="outline">
                            Get ZenHub free
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </SignInButton>
                </div>
            )}
        </div>
    )
}
