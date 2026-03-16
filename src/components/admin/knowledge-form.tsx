"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export interface KnowledgeFormData {
  title: string;
  body: string;
  filePath: string;
  metadata: {
    source_type: string;
    device_model: string;
    service_type: string;
    symptom_type: string;
    audience: string;
    tags: string[];
  };
}

interface KnowledgeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: KnowledgeFormData | null;
  onSubmit: (data: KnowledgeFormData) => Promise<void>;
}

const SOURCE_TYPES = ["troubleshooting", "device", "policy", "flow", "faq", "guide"];
const AUDIENCE_OPTIONS = ["customer", "agent", "both"];

export function KnowledgeForm({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: KnowledgeFormProps) {
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [body, setBody] = useState(initialData?.body ?? "");
  const [filePath, setFilePath] = useState(initialData?.filePath ?? "");
  const [sourceType, setSourceType] = useState(initialData?.metadata.source_type ?? "");
  const [deviceModel, setDeviceModel] = useState(initialData?.metadata.device_model ?? "");
  const [serviceType, setServiceType] = useState(initialData?.metadata.service_type ?? "");
  const [symptomType, setSymptomType] = useState(initialData?.metadata.symptom_type ?? "");
  const [audience, setAudience] = useState(initialData?.metadata.audience ?? "both");
  const [tags, setTags] = useState(initialData?.metadata.tags.join(", ") ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setTitle("");
    setBody("");
    setFilePath("");
    setSourceType("");
    setDeviceModel("");
    setServiceType("");
    setSymptomType("");
    setAudience("both");
    setTags("");
    setError(null);
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !body.trim() || !filePath.trim()) {
      setError("Title, body, and file path are required.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        body: body.trim(),
        filePath: filePath.trim(),
        metadata: {
          source_type: sourceType,
          device_model: deviceModel,
          service_type: serviceType,
          symptom_type: symptomType,
          audience,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        },
      });
      handleOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save document");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Document" : "Add Document"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Modem Light Status Guide"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="filePath">File Path</Label>
            <Input
              id="filePath"
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              placeholder="devices/light-status/my-guide.md"
              disabled={isEditing}
            />
            <p className="text-xs text-muted-foreground">
              Logical path used as the document identifier. Cannot be changed after creation.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Content (Markdown)</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write document content in Markdown..."
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sourceType">Source Type</Label>
              <Select value={sourceType} onValueChange={setSourceType}>
                <SelectTrigger id="sourceType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {SOURCE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger id="audience">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  {AUDIENCE_OPTIONS.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceModel">Device Model</Label>
              <Input
                id="deviceModel"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="e.g. Arris SB8200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Input
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="e.g. fiber, dsl, cable"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptomType">Symptom Type</Label>
              <Input
                id="symptomType"
                value={symptomType}
                onChange={(e) => setSymptomType(e.target.value)}
                placeholder="e.g. lights, slow_speed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="modem, lights, troubleshooting"
              />
              <p className="text-xs text-muted-foreground">Comma-separated</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {saving
                ? "Embedding & Saving..."
                : isEditing
                  ? "Update Document"
                  : "Add Document"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
