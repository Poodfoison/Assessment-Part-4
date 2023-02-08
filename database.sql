CREATE DATABASE "Chat"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Philippines.1252'
    LC_CTYPE = 'English_Philippines.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE IF NOT EXISTS public.users
(
    userid text COLLATE pg_catalog."default" NOT NULL,
    username text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    firstname text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (userid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

    CREATE TABLE IF NOT EXISTS public.messages
(
    messageid text COLLATE pg_catalog."default",
    message text COLLATE pg_catalog."default",
    "time" text COLLATE pg_catalog."default",
    senderid text COLLATE pg_catalog."default",
    CONSTRAINT senderid FOREIGN KEY (senderid)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.messages
    OWNER to postgres;