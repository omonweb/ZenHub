import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-primary/5 border-t border-b border-border">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Ready to Organize Your Thoughts?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who are already using ZenHub to collaborate, create, and share beautiful documents.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" asChild>
            <Link href="/demo">
              Try Demo Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <SignInButton mode="modal">
            <Button size="lg" variant="outline">
              Sign Up Now
            </Button>
          </SignInButton>
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required • Free forever plan available
        </p>
      </div>
    </section>
  );
};
