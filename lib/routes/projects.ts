import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export async function createProject(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  console.log("post happened");

  const { name, description, status } = req.body;

  const email = session?.user?.email as string;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        startDate: new Date().toLocaleString(),
        user: { connect: { email } },
      },
    });

    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
