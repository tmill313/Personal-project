insert into users(first_name, last_name, auth_id, voted)
values($1, $2, $3, $4)
returning *;