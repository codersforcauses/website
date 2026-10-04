CREATE TYPE "contest-status" AS ENUM('closed', 'open', 'finished');--> statement-breakpoint
CREATE TYPE "meeting-status" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "question-type" AS ENUM('short', 'long', 'checkbox');--> statement-breakpoint
CREATE TABLE "cfc_website_payment" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid,
	"amount" bigint NOT NULL,
	"currency" varchar(3) DEFAULT 'AUD' NOT NULL,
	"label" varchar(256) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_account" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid NOT NULL,
	"provider_id" text NOT NULL,
	"account_id" text NOT NULL,
	"id_token" text,
	"refresh_token" text,
	"access_token" text,
	"refresh_token_expires_at" timestamp(6) with time zone,
	"access_token_expires_at" timestamp(6) with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_session" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL UNIQUE,
	"ip_address" text,
	"user_agent" text,
	"impersonated_by" uuid,
	"expires_at" timestamp(6) with time zone NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_user" (
	"id" uuid PRIMARY KEY,
	"name" text NOT NULL,
	"preferred_name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"pronouns" text NOT NULL,
	"bio" text,
	"student_number" varchar(8) UNIQUE,
	"university" text,
	"github" text UNIQUE,
	"discord" text UNIQUE,
	"subscribe" boolean DEFAULT true,
	"square_customer_id" text UNIQUE,
	"role" text,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp(6) with time zone,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_verification" (
	"id" uuid PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp(6) with time zone NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_answers" (
	"id" uuid PRIMARY KEY,
	"candidate_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cfc_website_candidates" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid,
	"meeting_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cfc_website_contests" (
	"id" uuid PRIMARY KEY,
	"meeting_id" uuid NOT NULL,
	"position_id" uuid NOT NULL,
	"status" "contest-status" DEFAULT 'closed'::"contest-status",
	"current" boolean DEFAULT false,
	"tally" json,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_general_meetings" (
	"id" uuid PRIMARY KEY,
	"slug" varchar(256) NOT NULL UNIQUE,
	"title" varchar(256) NOT NULL UNIQUE,
	"start" timestamp with time zone NOT NULL,
	"end" timestamp with time zone,
	"venue" varchar(512),
	"agenda" text,
	"status" "meeting-status" DEFAULT 'upcoming'::"meeting-status" NOT NULL,
	"user_id" uuid,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_nominations" (
	"candidate_id" uuid NOT NULL,
	"position_id" uuid NOT NULL,
	"meeting_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cfc_website_positions" (
	"id" uuid PRIMARY KEY,
	"meeting_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"priority" smallint NOT NULL,
	"openings" smallint DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cfc_website_questions" (
	"id" uuid PRIMARY KEY,
	"meeting_id" uuid NOT NULL,
	"order" smallint NOT NULL,
	"text" text NOT NULL,
	"type" "question-type" DEFAULT 'short'::"question-type",
	"required" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "cfc_website_vote_preferences" (
	"vote_id" uuid NOT NULL,
	"candidate_id" uuid NOT NULL,
	"preference" smallint NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_voters" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid,
	"meeting_id" uuid NOT NULL,
	"approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_votes" (
	"id" uuid PRIMARY KEY,
	"voter_id" uuid NOT NULL,
	"contest_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cfc_website_winners" (
	"candidate_id" uuid NOT NULL,
	"contest_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "cfc_website_account" ("user_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "cfc_website_session" ("user_id");--> statement-breakpoint
CREATE INDEX "session_token_idx" ON "cfc_website_session" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "cfc_website_user" ("email");--> statement-breakpoint
CREATE INDEX "user_name_idx" ON "cfc_website_user" ("name");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "cfc_website_verification" ("identifier");--> statement-breakpoint
CREATE INDEX "slug_idx" ON "cfc_website_general_meetings" ("slug");--> statement-breakpoint
ALTER TABLE "cfc_website_payment" ADD CONSTRAINT "cfc_website_payment_user_id_cfc_website_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cfc_website_user"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "cfc_website_account" ADD CONSTRAINT "cfc_website_account_user_id_cfc_website_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cfc_website_user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_session" ADD CONSTRAINT "cfc_website_session_user_id_cfc_website_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cfc_website_user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_session" ADD CONSTRAINT "cfc_website_session_impersonated_by_cfc_website_user_id_fkey" FOREIGN KEY ("impersonated_by") REFERENCES "cfc_website_user"("id");--> statement-breakpoint
ALTER TABLE "cfc_website_answers" ADD CONSTRAINT "cfc_website_answers_candidate_id_cfc_website_candidates_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "cfc_website_candidates"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_answers" ADD CONSTRAINT "cfc_website_answers_question_id_cfc_website_questions_id_fkey" FOREIGN KEY ("question_id") REFERENCES "cfc_website_questions"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_candidates" ADD CONSTRAINT "cfc_website_candidates_user_id_cfc_website_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cfc_website_user"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "cfc_website_candidates" ADD CONSTRAINT "cfc_website_candidates_c1hQ2O2QaxVS_fkey" FOREIGN KEY ("meeting_id") REFERENCES "cfc_website_general_meetings"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_contests" ADD CONSTRAINT "cfc_website_contests_CBo2VXnInP27_fkey" FOREIGN KEY ("meeting_id") REFERENCES "cfc_website_general_meetings"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_contests" ADD CONSTRAINT "cfc_website_contests_position_id_cfc_website_positions_id_fkey" FOREIGN KEY ("position_id") REFERENCES "cfc_website_positions"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_general_meetings" ADD CONSTRAINT "cfc_website_general_meetings_user_id_cfc_website_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cfc_website_user"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "cfc_website_nominations" ADD CONSTRAINT "cfc_website_nominations_5dZRtq8G0FLA_fkey" FOREIGN KEY ("candidate_id") REFERENCES "cfc_website_candidates"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_nominations" ADD CONSTRAINT "cfc_website_nominations_gxSiahP361z0_fkey" FOREIGN KEY ("position_id") REFERENCES "cfc_website_positions"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_nominations" ADD CONSTRAINT "cfc_website_nominations_F2V4Dn9OLCEr_fkey" FOREIGN KEY ("meeting_id") REFERENCES "cfc_website_general_meetings"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_positions" ADD CONSTRAINT "cfc_website_positions_yh33n4I1usOk_fkey" FOREIGN KEY ("meeting_id") REFERENCES "cfc_website_general_meetings"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_questions" ADD CONSTRAINT "cfc_website_questions_PSGHwgpn3j4n_fkey" FOREIGN KEY ("meeting_id") REFERENCES "cfc_website_general_meetings"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_vote_preferences" ADD CONSTRAINT "cfc_website_vote_preferences_vote_id_cfc_website_votes_id_fkey" FOREIGN KEY ("vote_id") REFERENCES "cfc_website_votes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_vote_preferences" ADD CONSTRAINT "cfc_website_vote_preferences_9z1BD47zgVki_fkey" FOREIGN KEY ("candidate_id") REFERENCES "cfc_website_candidates"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_voters" ADD CONSTRAINT "cfc_website_voters_user_id_cfc_website_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cfc_website_user"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "cfc_website_voters" ADD CONSTRAINT "cfc_website_voters_2oRFFytWkPUX_fkey" FOREIGN KEY ("meeting_id") REFERENCES "cfc_website_general_meetings"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_votes" ADD CONSTRAINT "cfc_website_votes_voter_id_cfc_website_voters_id_fkey" FOREIGN KEY ("voter_id") REFERENCES "cfc_website_voters"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_votes" ADD CONSTRAINT "cfc_website_votes_contest_id_cfc_website_contests_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "cfc_website_contests"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_winners" ADD CONSTRAINT "cfc_website_winners_candidate_id_cfc_website_candidates_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "cfc_website_candidates"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cfc_website_winners" ADD CONSTRAINT "cfc_website_winners_contest_id_cfc_website_contests_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "cfc_website_contests"("id") ON DELETE CASCADE;