UPDATE "public"."suggestions" SET "completed"=TRUE WHERE 
"suggestion_id"= $1;
select * from suggestions where assigned_id = $2;