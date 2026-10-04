const questionVisibility = ["public", "admin"]

export interface Position {
  title: string
  openings: number
  description?: string
  priority: number
}

export interface Question {
  text: string
  type: "short" | "long" | "checkbox"
  required: boolean
  order?: number
  visibility: (typeof questionVisibility)[number]
  linked?: Question[]
}

export const DEFAULT_POSITIONS: Omit<Position, "priority">[] = [
  {
    title: "President",
    openings: 1,
    description: "Represents the club externally, coordinates the committee and sets the club direction.",
  },
  {
    title: "Vice-President",
    openings: 1,
    description: "Supports the President and acts in their absence.",
  },
  {
    title: "Secretary",
    openings: 1,
    description: "Manages club communications, meeting minutes, and administrative tasks.",
  },
  {
    title: "Treasurer",
    openings: 1,
    description: "Oversees club finances, budgeting, and financial reporting.",
  },
  {
    title: "Technical Lead",
    openings: 1,
    description: "Oversees the projects and develops/delivers technical workshops.",
  },
  {
    title: "Marketing Officer",
    openings: 1,
    description: "Manages social media, promotions, and club communications.",
  },
  {
    title: "Fresher Representative",
    openings: 1,
    description: "Represents and supports first year students in the club.",
  },
  {
    title: "Ordinary Committee Member",
    openings: 4,
    description: "Assists with operations and contributes to the club according to their specialties.",
  },
]

export const DEFAULT_QUESTIONS: Omit<Question, "order">[] = [
  {
    text: "What is your reason for wanting to join committee?",
    type: "long",
    required: true,
    visibility: "public",
  },
  {
    text: "How would you benefit the club if elected?",
    type: "long",
    required: true,
    visibility: "public",
  },
  {
    text: "What initiatives or events would you wish to run if elected?",
    type: "long",
    required: true,
    visibility: "public",
  },
  {
    text: "Are you currently part of any other club's committee?",
    type: "long",
    required: true,
    visibility: "public",
  },
  {
    text: "Have you previously been a part of any club committees?",
    type: "long",
    required: true,
    visibility: "public",
  },
  {
    text: "Will you be able to attend the meeting in person?",
    type: "checkbox",
    required: false,
    visibility: "public",
    linked: [
      {
        text: "If you are unable to attend the meeting, is there anything you wish to say?",
        type: "long",
        required: false,
        visibility: "admin",
        // show:
      },
    ],
  },
]
