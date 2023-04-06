import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import LogOut from "./LogOut";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ScrollArea } from "@/components/ui/Scrollarea";

async function getProjects(email: string | undefined | null) {
  if (email) {
    const projects = await prisma.project.findMany({
      where: {
        user: { email },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return projects;
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const projects = await getProjects(session?.user?.email);
  return (
    <div className="w-full flex h-screen">
      <div className="w-1/4 h-full pt-5 bg-gray-900 px-6">
        <div className="w-full flex items-center">
          <div>{session?.user?.email}</div>
          <LogOut />
          <Link
            href="/dashboard/project/new"
            className="ml-4 bg-transparent border h-10 py-2 px-4 border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
          >
            Add Project
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight">Navigation</h2>
        </div>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <div className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
          <ScrollArea className="w-full">
            {projects?.map((project) => (
              <div key={project.id} className="my-2">
                <Link
                  href={`/dashboard/project/${project.id}`}
                  className="font-medium underline decoration-dashed underline-offset-2"
                >
                  {project.name}
                </Link>
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="mt-4"></div>
      </div>
      <main className="flex w-3/4 h-full pt-5 px-6">{children}</main>
    </div>
  );
}
