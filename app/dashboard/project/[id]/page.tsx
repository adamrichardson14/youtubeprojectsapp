import prisma from "@/lib/prisma";
import { redirect } from "next/dist/server/api-utils";
import { Button } from "@/components/ui/Button";

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  return project;
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  if (project) {
    return (
      <div className="h-full w-full">
        <div className="w-full bg-gray-900 rounded-lg">
          <div className="p-4">
            <h1 className="text-2xl tracking-tight font-semibold">
              {project.name}
            </h1>
            <p>{project.description}</p>
            <div className="flex items-center mt-2">
              <Button variant="outline" className="mr-8 ">
                {project.status}
              </Button>
              <span className="text-sm">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>No project here</div>;
}
