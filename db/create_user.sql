insert into users(first_name, last_name, auth_id)
values($1, $2, $3)
returning *;