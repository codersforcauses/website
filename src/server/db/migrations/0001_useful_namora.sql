ALTER TABLE "cfc-website_payment" DROP CONSTRAINT "cfc-website_payment_user_id_cfc-website_user_id_fk";
--> statement-breakpoint
ALTER TABLE "cfc-website_payment" ADD CONSTRAINT "cfc-website_payment_user_id_cfc-website_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."cfc-website_user"("id") ON DELETE set null ON UPDATE no action;