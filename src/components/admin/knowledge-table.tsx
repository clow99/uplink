"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  KnowledgeForm,
  type KnowledgeFormData,
} from "@/components/admin/knowledge-form";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DocumentRow {
  filePath: string;
  title: string;
  metadata: Record<string, unknown>;
  chunkCount: number;
  updatedAt: string;
}

interface ListResponse {
  items: DocumentRow[];
  total: number;
  page: number;
  limit: number;
}

interface DocumentDetail {
  filePath: string;
  title: string;
  body: string;
  metadata: {
    source_type?: string;
    device_model?: string;
    service_type?: string;
    symptom_type?: string;
    audience?: string;
    tags?: string[];
  };
}

export function KnowledgeTable() {
  const [docs, setDocs] = useState<DocumentRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<KnowledgeFormData | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DocumentRow | null>(null);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/knowledge?${params}`);
      if (!res.ok) throw new Error("Failed to fetch documents");

      const data: ListResponse = await res.json();
      setDocs(data.items);
      setTotal(data.total);
    } catch {
      setDocs([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchDocs();
  }

  function handleAdd() {
    setEditData(null);
    setFormOpen(true);
  }

  async function handleEdit(doc: DocumentRow) {
    const res = await fetch(
      `/api/admin/knowledge/${encodeURIComponent(doc.filePath)}`,
    );
    if (!res.ok) return;

    const detail: DocumentDetail = await res.json();
    setEditData({
      title: detail.title,
      body: detail.body,
      filePath: detail.filePath,
      metadata: {
        source_type: detail.metadata.source_type ?? "",
        device_model: detail.metadata.device_model ?? "",
        service_type: detail.metadata.service_type ?? "",
        symptom_type: detail.metadata.symptom_type ?? "",
        audience: detail.metadata.audience ?? "both",
        tags: detail.metadata.tags ?? [],
      },
    });
    setFormOpen(true);
  }

  function handleDeleteClick(doc: DocumentRow) {
    setDeleteTarget(doc);
    setDeleteOpen(true);
  }

  async function handleFormSubmit(data: KnowledgeFormData) {
    const res = await fetch("/api/admin/knowledge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? "Failed to save");
    }

    await fetchDocs();
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;

    const res = await fetch(
      `/api/admin/knowledge/${encodeURIComponent(deleteTarget.filePath)}`,
      { method: "DELETE" },
    );

    if (!res.ok) {
      throw new Error("Failed to delete");
    }

    setDeleteTarget(null);
    await fetchDocs();
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <form
          onSubmit={handleSearchSubmit}
          className="flex max-w-sm flex-1 items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="pl-9"
            />
          </div>
        </form>

        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>File Path</TableHead>
              <TableHead>Source Type</TableHead>
              <TableHead className="text-center">Chunks</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : docs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  {search
                    ? "No documents match your search."
                    : "No documents yet. Add one to get started."}
                </TableCell>
              </TableRow>
            ) : (
              docs.map((doc) => (
                <TableRow key={doc.filePath}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {doc.filePath}
                  </TableCell>
                  <TableCell>
                    {(doc.metadata as Record<string, string>).source_type ? (
                      <Badge variant="secondary">
                        {(doc.metadata as Record<string, string>).source_type}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">--</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{doc.chunkCount}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(doc.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(doc)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(doc)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {total} document{total !== 1 ? "s" : ""} total
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <KnowledgeForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
      />

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        documentTitle={deleteTarget?.title ?? ""}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
