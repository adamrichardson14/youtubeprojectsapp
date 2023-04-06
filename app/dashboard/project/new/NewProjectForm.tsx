"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/hooks/useToast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewProjectForm() {
  const { toast } = useToast();
  const router = useRouter();
  async function handleSubmit(event: any) {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const status = event.target.status.value
      ? event.target.status.value
      : "Backlog";

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, status }),
    });

    if (response.status === 200) {
      const data = await response.json();
      event.target.name.value = "";
      event.target.description.value = "";
      event.target.status.value = "";

      toast({
        title: "Project Created",
        description:
          "Your project has been created successfully, going there now!",
      });

      router.push(`/dashboard/project/${data.id}`);
    }
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      console.log(data.error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="my-8 w-full">
      <Input
        name="name"
        autoComplete="off"
        type="text"
        className="w-full mt-4"
        placeholder="Name"
      />
      <Textarea name="description" placeholder="Description" className="mt-4" />
      <Select name="status">
        <SelectTrigger className="w-[300px] mt-4">
          <SelectValue placeholder="Backlog" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Backlog">Backlog</SelectItem>
          <SelectItem value="InProgress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Paused">Paused</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* TODO: ADD DATE PICKER */}

      <Button
        type="submit"
        variant="default"
        className="mt-4 flex items-center group"
      >
        Create{" "}
        <PlusSquare
          size={16}
          className="text-gray-900 group-hover:text-gray-100 ml-1"
        />
      </Button>
    </form>
  );
}
