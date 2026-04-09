import { Users, Palette, Share2, FileText } from "lucide-react";
import { FeatureCard } from "./feature-card";
import Image from "next/image";

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-6xl w-full gap-12">
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="/demo-hero.jpg"
                    alt="ZenHub Dashboard Demo"
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    priority
                />
            </div>
            
            <div className="w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
                    Powerful Features for Seamless Collaboration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <FeatureCard
                        icon={Users}
                        title="Document Collaboration"
                        description="Work together in real-time with your team. Collaborate seamlessly on documents with live updates and comments."
                    />
                    <FeatureCard
                        icon={FileText}
                        title="Rich Text Editing"
                        description="Create beautifully formatted documents with advanced editing capabilities, formatting options, and rich content support."
                    />
                    <FeatureCard
                        icon={Palette}
                        title="Customization"
                        description="Make your workspace uniquely yours. Customize themes, add icons, set covers, and personalize every aspect of your documents."
                    />
                    <FeatureCard
                        icon={Share2}
                        title="Publishing & Sharing"
                        description="Share your work with anyone. Publish documents publicly or manage permissions to control who can view and edit."
                    />
                </div>
            </div>
        </div>
    )
}
