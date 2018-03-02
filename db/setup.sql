
create table users(
 
user_id serial PRIMARY KEY,
user_name varchar(150),
team_id text,
position varchar(100),
img text,
auth_id text)


create table suggestions(
 
 suggid serial PRIMARY KEY,
  suggestion text,
  date text,
  userid text,
  votes integer,
  assignedid text,
  completed text)

create table teams(
 
 teamid serial PRIMARY KEY,
    teamname text,
    completedvotes integer,
  teamleadid integer)