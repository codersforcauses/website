import type { Position, Question } from "~/lib/defaults"
import { positions, questions } from "~/server/db/schema"
import { db } from "~/server/db"

interface CreateFunction {
  meetingId: string
}

export async function createPositions(props: CreateFunction & { positions: Position[] }) {
  const data = props.positions.map((position) => ({
    ...position,
    meetingId: props.meetingId,
  }))

  return await db.insert(positions).values(data).returning()
}

export async function createQuestions(props: CreateFunction & { questions: Question[] }) {
  const data = props.questions.map((question) => ({
    ...question,
    meetingId: props.meetingId,
  }))

  return await db.insert(questions).values(data).returning()
}
