DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('member', 'honorary', 'past', 'committee', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cfc-website_payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(32),
	"amount" numeric NOT NULL,
	"currency" varchar(3) DEFAULT 'AUD' NOT NULL,
	"label" varchar(256) NOT NULL,
	"event_id" varchar(32),
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cfc-website_user" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"preferred_name" varchar(64) NOT NULL,
	"pronouns" varchar(32) NOT NULL,
	"student_number" varchar(8),
	"university" varchar(128),
	"github" varchar(128),
	"discord" varchar(128),
	"subscribe" boolean DEFAULT true NOT NULL,
	"role" "role",
	"square_customer_id" varchar(32) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "cfc-website_user_email_unique" UNIQUE("email"),
	CONSTRAINT "cfc-website_user_student_number_unique" UNIQUE("student_number"),
	CONSTRAINT "cfc-website_user_square_customer_id_unique" UNIQUE("square_customer_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "cfc-website_payment" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_id_idx" ON "cfc-website_payment" ("event_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "role_idx" ON "cfc-website_user" ("role");