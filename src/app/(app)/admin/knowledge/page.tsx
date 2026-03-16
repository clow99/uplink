"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { KnowledgeTable } from "@/components/admin/knowledge-table";

export default function AdminKnowledgePage() {
  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Knowledge Base
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage documents used by the AI agent to answer customer questions.
            Documents are automatically chunked and embedded for semantic search.
          </p>
        </div>

        <KnowledgeTable />
      </div>
    </ScrollArea>
  );
}
