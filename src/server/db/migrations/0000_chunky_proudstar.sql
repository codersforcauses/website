CREATE TYPE "public"."role" AS ENUM('member', 'honorary', 'past', 'committee', 'admin');--> statement-breakpoint
CREATE TABLE "cfc-website_payment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"amount" bigint NOT NULL,
	"currency" varchar(3) DEFAULT 'AUD' NOT NULL,
	"label" varchar(256) NOT NULL,
	"event_id" varchar(32),
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "cfc-website_user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"clerk_id" varchar(32) NOT NULL,
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
	CONSTRAINT "cfc-website_user_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "cfc-website_user_email_unique" UNIQUE("email"),
	CONSTRAINT "cfc-website_user_student_number_unique" UNIQUE("student_number"),
	CONSTRAINT "cfc-website_user_square_customer_id_unique" UNIQUE("square_customer_id")
);
--> statement-breakpoint
ALTER TABLE "cfc-website_payment" ADD CONSTRAINT "cfc-website_payment_user_id_cfc-website_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."cfc-website_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "cfc-website_payment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "event_id_idx" ON "cfc-website_payment" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "role_idx" ON "cfc-website_user" USING btree ("role");