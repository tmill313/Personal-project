UPDATE "public"."users" SET "voted"=$1 WHERE "user_id"=$2;
select * from users where user_id = $2;