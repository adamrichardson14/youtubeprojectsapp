import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { createProject } from "@/lib/routes/projects";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.id) {
        // Find a single project
      }

      // Find all projects

      try {
        const email = session?.user?.email as string;

        const projects = await prisma.project.findMany({
          where: {
            user: { email },
          },
        });

        res.status(200).json(projects);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      }

      break;
    case "POST":
      createProject(req, res, session);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
