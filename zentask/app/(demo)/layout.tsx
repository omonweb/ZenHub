"use client";

import { DemoProvider } from "@/lib/demo-context";
import { SearchCommand } from "@/components/search-command";
import { DemoNavigation } from "./_components/demo-navigation";

const DemoLayout = ({
    children 
}: {
    children: React.ReactNode;
}) => {
    return (
        <DemoProvider>
            <div className="h-full flex dark:bg-[#1F1F1F]">
                <DemoNavigation />
                <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand />
                {children}
                </main>
            </div>
        </DemoProvider>
    );
}

export default DemoLayout;
