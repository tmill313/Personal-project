insert into users(first_name, last_name, team_id, position, auth_id)
values($1, $2, $3, $4, $5)
returning *;