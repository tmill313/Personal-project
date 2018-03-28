UPDATE "public"."users" SET "tutorial"=TRUE WHERE "user_id"=$1;
select * from users where user_id = $1;