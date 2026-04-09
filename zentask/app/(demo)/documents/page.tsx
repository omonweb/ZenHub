"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-context";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const DemoDocumentsPage = () => {
    const router = useRouter();
    const { demoDocuments, addDocument } = useDemo();

    const onCreate = () => {
        const newDoc = {
            id: uuidv4(),
            title: "Untitled",
            content: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        addDocument(newDoc);
        router.push(`/demo/documents/${newDoc.id}`);
        toast.success("New document created!");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.svg"
                height="200"
                width="200"
                alt="empty"
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.svg"
                height="200"
                width="200"
                alt="empty"
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome to ZenHub Demo
            </h2>
            <p className="text-sm text-muted-foreground">
                You&apos;re in demo mode. Create temporary documents to explore the app!
            </p>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a document
            </Button>
        </div>
    );
};

export default DemoDocumentsPage;
