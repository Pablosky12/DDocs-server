create table local_users(
	id serial primary key,
	discord_id numeric(50) unique not null,
	username varchar(50) not null
);

create table techs(
	id serial primary key,
	display_name varchar(50) unique not null
);

create table questions (
	id serial primary key,
	local_user serial ,
	question_text text not null,
	created_on timestamp not null,
	discord_server numeric not null,
	tech serial,
	constraint fk_local_user
		foreign key (local_user)
		references local_users(id),
	constraint fk_question_tech
		foreign key (tech)
		references techs(id)
);

create table answers (
	id serial primary key,
	local_user serial not null,
	question_id serial,
	created_on timestamp not null,
	discord_server numeric not null,
	tech serial not null,
	answer_text text not null,
	constraint fk_local_user
		foreign key (local_user)
		references local_users(id),
	constraint fk_question
		foreign key (question_id)
		references questions(id),
	constraint fk_answer_tech
		foreign key (tech)
		references techs(id)
);

alter table questions 
alter column created_on set default CURRENT_TIMESTAMP;

alter table answers 
alter column created_on set default CURRENT_TIMESTAMP;