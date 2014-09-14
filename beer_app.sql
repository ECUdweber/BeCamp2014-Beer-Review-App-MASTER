--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

--
-- Name: equinoxcms; Type: DATABASE; Schema: -; Owner: drup_user
--

CREATE DATABASE beer_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE beer_app OWNER TO vagrant;

\connect beer_app

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;   
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: vagrant; Tablespace: 
--

CREATE TABLE reviews ( 
    id serial,        
    beer_name character varying(100) DEFAULT ''::character varying NOT NULL,
    maker character varying(100) DEFAULT ''::character varying NOT NULL,
    drink_again integer DEFAULT 0 NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    comments character varying(500) DEFAULT ''::character varying NOT NULL,
    date_added date default CURRENT_DATE,
    PRIMARY KEY (id)
);


ALTER TABLE public.reviews OWNER TO vagrant;

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

