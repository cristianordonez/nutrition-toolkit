--
-- PostgreSQL database dump
--

-- Dumped from database version 18.4 (Homebrew)
-- Dumped by pg_dump version 18.4 (Homebrew)
--
-- Name: user_metrics; Type: TABLE; Schema: public; Owner: cristianordonez
--

CREATE TABLE public.user_metrics (
    id bigint NOT NULL,
    user_id bigint,
    height smallint,
    weight integer,
    age smallint,
    gender character varying(20),
    activity_level numeric,
    goal_name character varying
);

--
-- Name: TABLE user_metrics; Type: COMMENT; Schema: public; Owner: cristianordonez
--

COMMENT ON TABLE public.user_metrics IS 'Height is standardized to inches, weight is standardized to lbs';


--
-- Name: user_metrics_id_seq; Type: SEQUENCE; Schema: public; Owner: cristianordonez
--

CREATE SEQUENCE public.user_metrics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_metrics_id_seq OWNED BY public.user_metrics.id;

--
-- Name: user_metrics id; Type: DEFAULT; Schema: public; Owner: cristianordonez
--

ALTER TABLE ONLY public.user_metrics ALTER COLUMN id SET DEFAULT nextval('public.user_metrics_id_seq'::regclass);


--
-- Name: user_metrics user_id_unique; Type: CONSTRAINT; Schema: public; Owner: cristianordonez
--

ALTER TABLE ONLY public.user_metrics
    ADD CONSTRAINT user_id_unique UNIQUE (user_id);


--
-- Name: user_metrics user_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: cristianordonez
--

ALTER TABLE ONLY public.user_metrics
    ADD CONSTRAINT user_metrics_pkey PRIMARY KEY (id);


--
-- Name: fki_user_id; Type: INDEX; Schema: public; Owner: cristianordonez
--

CREATE INDEX fki_user_id ON public.user_metrics USING btree (user_id);


--
-- Name: user_metrics user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cristianordonez
--

ALTER TABLE ONLY public.user_metrics
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

