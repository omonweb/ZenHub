import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { CTASection } from "./_components/cta-section";

const MarketingPage = () => {
    return (
        <div className="h-full flex flex-col dark:bg-[#1F1F1F] bg-background">
            <div className="min-h-screen flex flex-col items-center justify-center gap-y-12 flex-1 px-6 pb-10">
                <div className="flex flex-col items-center justify-center text-center gap-y-6 max-w-4xl">
                    <Heading />
                </div>
                <div className="w-full max-w-6xl">
                    <Heroes />
                </div>
            </div>
            <CTASection />
            <Footer />
        </div>
    );
}

export default MarketingPage;
