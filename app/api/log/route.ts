import prisma from '../../../prisma/PrismaClient';

export async function POST(req: Request, res: Response) {
  const data = await req.json()
  const { medication_id, taken_at } = data;
  const result = await prisma.medicationLog.create({
    data: {
      taken_at,
      medication: {
        connect: {
          id: parseInt(medication_id),
        }
      }
    },
  });
  result;
}