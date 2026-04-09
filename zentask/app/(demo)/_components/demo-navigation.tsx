"use client";

import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings2, Trash } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "@/app/(main)/_components/item";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { useDemo } from "@/lib/demo-context";
import { v4 as uuidv4 } from "uuid";

export const DemoNavigation = () => {
    const router = useRouter();
    const settings = useSettings();
    const search = useSearch();
    const params = useParams();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { demoDocuments, addDocument } = useDemo();

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<HTMLElement | null>(null);
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;

        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleCreate = () => {
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
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar min-h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div
                    role="button"
                    onClick={collapse}
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <div className="p-4">
                        <p className="text-xs font-semibold text-muted-foreground">DEMO MODE</p>
                    </div>

                    <Item
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={search.onOpen}
                    />

                    <Item
                        label="Settings"
                        icon={Settings2}
                        onClick={settings.onOpen}
                    />

                    <Item
                        onClick={handleCreate}
                        label="New Page"
                        icon={PlusCircle}
                    />
                </div>

                <div className="mt-4">
                    <div className="p-3">
                        <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">DOCUMENTS</p>
                        <div className="space-y-1">
                            {demoDocuments.map((doc) => (
                                <div
                                    key={doc.id}
                                    onClick={() => router.push(`/demo/documents/${doc.id}`)}
                                    className="px-2 py-1 rounded text-sm hover:bg-primary/10 cursor-pointer transition"
                                >
                                    {doc.icon && <span className="mr-2">{doc.icon}</span>}
                                    {doc.title}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Item
                        onClick={handleCreate}
                        icon={Plus}
                        label="Add a page"
                    />
                </div>

                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                {!!params.documentId ? (
                    <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                        {isCollapsed && (
                            <MenuIcon
                                role="button"
                                onClick={resetWidth}
                                className="h-6 w-6 text-muted-foreground"
                            />
                        )}
                    </nav>
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full">
                        {isCollapsed && (
                            <MenuIcon
                                role="button"
                                onClick={resetWidth}
                                className="h-6 w-6 text-muted-foreground"
                            />
                        )}
                    </nav>
                )}
            </div>
        </>
    );
};
