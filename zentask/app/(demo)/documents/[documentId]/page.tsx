"use client";

import { useParams } from "next/navigation";
import { Toolbar } from "@/app/(main)/_components/toolbar";
import { Cover } from "@/app/(main)/_components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useDemo, DemoDocument } from "@/lib/demo-context";

const DemoDocumentIdPage = () => {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);
    const params = useParams();
    const { getDocument, updateDocument } = useDemo();

    const document = getDocument(params.documentId as string);

    const onChange = (content: string) => {
        if (document) {
            updateDocument(document.id, { content });
        }
    };

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    if (document === null) {
        return <div>Not found</div>;
    }

    return (
        <>
            <div className="pb-40">
                <Cover url={document.coverImage} />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                    <Toolbar initialData={document as any} />
                    <Editor
                        onChange={onChange}
                        initialContent={document.content}
                    />
                </div>
            </div>
        </>
    );
};

export default DemoDocumentIdPage;
