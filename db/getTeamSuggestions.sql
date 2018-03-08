select * from suggestions 
join teams on suggestions.assigned_id = teams.id
where assigned_id = $1
order by completed;