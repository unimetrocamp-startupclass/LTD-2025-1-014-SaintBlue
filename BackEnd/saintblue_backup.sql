--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: estoque; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estoque (
    id integer NOT NULL,
    produto character varying(100) NOT NULL,
    preco numeric(10,2) NOT NULL,
    marca character varying(100) NOT NULL,
    cor character varying(50),
    codigo character varying(50) NOT NULL,
    quantidade integer NOT NULL,
    condicao character varying(50),
    peso numeric(10,2),
    observacoes text
);


ALTER TABLE public.estoque OWNER TO postgres;

--
-- Name: estoque_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estoque_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estoque_id_seq OWNER TO postgres;

--
-- Name: estoque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estoque_id_seq OWNED BY public.estoque.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    sobrenome character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    numero character varying(20) NOT NULL,
    senha text NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: estoque id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoque ALTER COLUMN id SET DEFAULT nextval('public.estoque_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: estoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estoque (id, produto, preco, marca, cor, codigo, quantidade, condicao, peso, observacoes) FROM stdin;
501	Teclado	175.98	Acer	Vermelho	P00001	20	Novo	3.82	Gerado automaticamente
502	Fone	456.98	Samsung	Branco	P00002	5	Recondicionado	1.90	Gerado automaticamente
503	Fone	356.51	Acer	Amarelo	P00003	74	Novo	1.34	Gerado automaticamente
504	Monitor	336.74	Samsung	Branco	P00004	9	Recondicionado	2.67	Gerado automaticamente
505	Mouse	232.80	Lenovo	Verde	P00005	7	Recondicionado	4.34	Gerado automaticamente
506	Monitor	397.94	Dell	Vermelho	P00006	99	Recondicionado	2.33	Gerado automaticamente
507	Mouse	86.81	Samsung	Branco	P00007	58	Novo	4.94	Gerado automaticamente
508	TV	53.10	Acer	Branco	P00008	74	Usado	3.91	Gerado automaticamente
509	Monitor	123.70	HP	Azul	P00009	98	Usado	4.77	Gerado automaticamente
510	Mouse	496.67	LG	Verde	P00010	71	Usado	3.11	Gerado automaticamente
511	Mouse	446.97	Samsung	Verde	P00011	42	Novo	3.35	Gerado automaticamente
512	Monitor	227.37	Dell	Amarelo	P00012	52	Recondicionado	3.86	Gerado automaticamente
513	TV	126.21	LG	Preto	P00013	35	Novo	1.69	Gerado automaticamente
514	Teclado	18.52	Dell	Preto	P00014	54	Recondicionado	4.19	Gerado automaticamente
515	TV	383.98	Dell	Vermelho	P00015	77	Usado	3.67	Gerado automaticamente
516	Fone	54.37	LG	Preto	P00016	72	Recondicionado	0.87	Gerado automaticamente
517	Peças de PC	226.99	Acer	Vermelho	P00017	70	Novo	0.57	Gerado automaticamente
518	Fone	154.04	LG	Vermelho	P00018	52	Novo	0.83	Gerado automaticamente
519	Mouse	268.60	Asus	Vermelho	P00019	41	Usado	1.01	Gerado automaticamente
520	TV	130.32	Asus	Vermelho	P00020	26	Recondicionado	2.33	Gerado automaticamente
521	Monitor	345.28	Acer	Branco	P00021	57	Recondicionado	0.96	Gerado automaticamente
522	Fone	112.38	LG	Preto	P00022	2	Usado	1.63	Gerado automaticamente
523	Monitor	472.45	Samsung	Preto	P00023	75	Novo	4.14	Gerado automaticamente
524	Mouse	124.22	HP	Branco	P00024	93	Usado	4.39	Gerado automaticamente
525	Monitor	152.02	Lenovo	Amarelo	P00025	18	Recondicionado	4.69	Gerado automaticamente
526	Teclado	410.25	Acer	Preto	P00026	92	Usado	4.29	Gerado automaticamente
527	Notebook	199.71	HP	Vermelho	P00027	48	Novo	3.00	Gerado automaticamente
528	TV	457.76	LG	Branco	P00028	61	Novo	1.51	Gerado automaticamente
529	Mouse	248.28	Acer	Azul	P00029	85	Usado	4.87	Gerado automaticamente
530	Peças de PC	279.84	HP	Verde	P00030	36	Usado	2.59	Gerado automaticamente
531	Monitor	150.84	Samsung	Branco	P00031	61	Novo	2.39	Gerado automaticamente
532	Fone	241.40	Dell	Verde	P00032	13	Novo	4.51	Gerado automaticamente
533	Teclado	31.86	LG	Amarelo	P00033	34	Usado	1.94	Gerado automaticamente
534	Celulares	208.63	Samsung	Vermelho	P00034	60	Recondicionado	1.74	Gerado automaticamente
535	Fone	223.73	Samsung	Vermelho	P00035	90	Usado	1.98	Gerado automaticamente
536	Monitor	146.46	LG	Verde	P00036	39	Novo	2.62	Gerado automaticamente
537	Celulares	141.90	Dell	Azul	P00037	47	Usado	2.63	Gerado automaticamente
538	Notebook	205.01	Samsung	Verde	P00038	90	Novo	4.58	Gerado automaticamente
539	Monitor	29.06	Samsung	Amarelo	P00039	90	Usado	2.87	Gerado automaticamente
540	Fone	250.43	Acer	Amarelo	P00040	54	Recondicionado	0.59	Gerado automaticamente
541	TV	120.39	LG	Vermelho	P00041	30	Novo	1.28	Gerado automaticamente
542	Notebook	383.35	HP	Amarelo	P00042	13	Usado	3.15	Gerado automaticamente
543	Celulares	483.03	HP	Preto	P00043	56	Recondicionado	1.08	Gerado automaticamente
544	Monitor	172.69	Dell	Amarelo	P00044	37	Usado	3.70	Gerado automaticamente
545	Teclado	44.05	Dell	Branco	P00045	3	Recondicionado	4.39	Gerado automaticamente
546	Notebook	306.84	Acer	Verde	P00046	8	Recondicionado	1.35	Gerado automaticamente
547	Mouse	66.10	Acer	Amarelo	P00047	47	Novo	1.71	Gerado automaticamente
548	Peças de PC	358.70	Samsung	Verde	P00048	48	Usado	2.55	Gerado automaticamente
549	Peças de PC	358.94	Asus	Verde	P00049	12	Usado	3.62	Gerado automaticamente
550	Peças de PC	183.88	Asus	Preto	P00050	48	Recondicionado	2.21	Gerado automaticamente
551	Peças de PC	134.08	Acer	Azul	P00051	67	Usado	3.41	Gerado automaticamente
552	Celulares	427.22	LG	Preto	P00052	83	Usado	3.82	Gerado automaticamente
553	Teclado	300.34	LG	Preto	P00053	69	Recondicionado	2.78	Gerado automaticamente
554	Monitor	17.92	Samsung	Vermelho	P00054	23	Usado	3.31	Gerado automaticamente
555	Mouse	422.93	Dell	Amarelo	P00055	70	Usado	2.55	Gerado automaticamente
556	Peças de PC	191.69	Acer	Branco	P00056	13	Usado	0.67	Gerado automaticamente
557	Fone	207.51	HP	Vermelho	P00057	64	Usado	3.95	Gerado automaticamente
558	Notebook	21.34	LG	Vermelho	P00058	75	Recondicionado	2.93	Gerado automaticamente
559	Teclado	407.33	Acer	Amarelo	P00059	78	Recondicionado	2.71	Gerado automaticamente
560	Mouse	236.47	HP	Vermelho	P00060	2	Usado	1.85	Gerado automaticamente
561	Notebook	98.43	LG	Verde	P00061	4	Recondicionado	2.21	Gerado automaticamente
562	Monitor	259.39	HP	Verde	P00062	35	Usado	3.38	Gerado automaticamente
563	Mouse	484.24	Acer	Amarelo	P00063	31	Novo	0.70	Gerado automaticamente
564	Mouse	449.46	Dell	Preto	P00064	59	Usado	4.13	Gerado automaticamente
565	Celulares	54.51	HP	Vermelho	P00065	37	Usado	1.84	Gerado automaticamente
566	Eletrodomésticos	342.20	Lenovo	Vermelho	P00066	55	Novo	2.33	Gerado automaticamente
567	Fone	64.78	Lenovo	Verde	P00067	16	Recondicionado	2.05	Gerado automaticamente
568	Mouse	238.63	Asus	Verde	P00068	36	Novo	4.43	Gerado automaticamente
569	TV	414.28	Dell	Azul	P00069	20	Recondicionado	4.32	Gerado automaticamente
570	Notebook	417.43	LG	Branco	P00070	94	Novo	3.28	Gerado automaticamente
571	Notebook	454.78	Samsung	Verde	P00071	8	Recondicionado	4.47	Gerado automaticamente
572	Peças de PC	297.01	Lenovo	Azul	P00072	56	Novo	4.96	Gerado automaticamente
573	Mouse	481.49	Acer	Amarelo	P00073	97	Usado	3.43	Gerado automaticamente
574	Teclado	183.40	Dell	Preto	P00074	6	Recondicionado	2.53	Gerado automaticamente
575	Monitor	85.97	HP	Amarelo	P00075	73	Usado	4.03	Gerado automaticamente
576	Monitor	352.92	Acer	Verde	P00076	98	Recondicionado	4.97	Gerado automaticamente
577	Celulares	264.99	Lenovo	Amarelo	P00077	79	Novo	4.88	Gerado automaticamente
578	Mouse	408.89	Asus	Branco	P00078	31	Usado	1.40	Gerado automaticamente
579	Peças de PC	351.40	Asus	Verde	P00079	24	Novo	2.82	Gerado automaticamente
580	Eletrodomésticos	423.54	LG	Azul	P00080	41	Usado	1.93	Gerado automaticamente
581	Eletrodomésticos	229.64	Samsung	Azul	P00081	34	Novo	4.46	Gerado automaticamente
582	Monitor	19.28	Asus	Preto	P00082	53	Novo	3.88	Gerado automaticamente
583	Celulares	389.84	Acer	Verde	P00083	56	Usado	4.60	Gerado automaticamente
584	Peças de PC	140.36	Samsung	Azul	P00084	64	Usado	3.61	Gerado automaticamente
585	Mouse	350.71	LG	Amarelo	P00085	11	Usado	4.19	Gerado automaticamente
586	Monitor	490.60	Acer	Azul	P00086	9	Recondicionado	4.06	Gerado automaticamente
587	TV	440.49	Asus	Amarelo	P00087	16	Novo	1.92	Gerado automaticamente
588	Peças de PC	440.34	Lenovo	Vermelho	P00088	89	Usado	1.14	Gerado automaticamente
589	Peças de PC	456.06	HP	Vermelho	P00089	67	Recondicionado	1.89	Gerado automaticamente
590	Celulares	196.31	Samsung	Preto	P00090	23	Usado	3.18	Gerado automaticamente
591	Fone	367.71	Dell	Vermelho	P00091	7	Usado	2.04	Gerado automaticamente
592	Eletrodomésticos	46.66	Acer	Amarelo	P00092	63	Recondicionado	0.86	Gerado automaticamente
593	Notebook	405.29	Acer	Verde	P00093	68	Usado	4.22	Gerado automaticamente
594	Teclado	318.91	Asus	Amarelo	P00094	82	Usado	4.10	Gerado automaticamente
595	Monitor	279.70	LG	Vermelho	P00095	48	Recondicionado	2.71	Gerado automaticamente
596	Mouse	21.48	Asus	Preto	P00096	29	Usado	4.84	Gerado automaticamente
597	Monitor	430.12	Acer	Amarelo	P00097	90	Usado	3.48	Gerado automaticamente
598	Celulares	60.91	HP	Branco	P00098	97	Usado	2.58	Gerado automaticamente
599	TV	236.43	Acer	Branco	P00099	27	Usado	2.47	Gerado automaticamente
600	Fone	10.60	Asus	Amarelo	P00100	17	Recondicionado	1.14	Gerado automaticamente
601	Mouse	170.60	LG	Preto	P00101	58	Usado	0.75	Gerado automaticamente
602	Notebook	133.61	LG	Amarelo	P00102	11	Usado	4.08	Gerado automaticamente
603	Fone	426.85	Samsung	Branco	P00103	17	Recondicionado	3.61	Gerado automaticamente
604	Monitor	254.97	Dell	Azul	P00104	44	Usado	4.10	Gerado automaticamente
605	Monitor	149.97	HP	Verde	P00105	85	Recondicionado	3.19	Gerado automaticamente
606	Notebook	409.21	Acer	Amarelo	P00106	95	Usado	2.71	Gerado automaticamente
607	Eletrodomésticos	394.09	Asus	Verde	P00107	33	Usado	4.79	Gerado automaticamente
608	TV	20.35	Acer	Verde	P00108	30	Usado	3.17	Gerado automaticamente
609	Notebook	135.76	Samsung	Verde	P00109	25	Recondicionado	3.10	Gerado automaticamente
610	Teclado	357.74	LG	Branco	P00110	57	Usado	1.79	Gerado automaticamente
611	Notebook	392.58	LG	Preto	P00111	81	Novo	1.35	Gerado automaticamente
612	Celulares	396.25	Acer	Azul	P00112	99	Usado	2.00	Gerado automaticamente
613	Peças de PC	144.68	Dell	Preto	P00113	58	Usado	1.55	Gerado automaticamente
614	TV	155.56	Dell	Azul	P00114	19	Novo	0.92	Gerado automaticamente
615	Notebook	447.31	Lenovo	Amarelo	P00115	57	Novo	2.21	Gerado automaticamente
616	TV	282.19	Asus	Vermelho	P00116	50	Recondicionado	1.54	Gerado automaticamente
617	Monitor	237.32	Dell	Verde	P00117	19	Recondicionado	2.44	Gerado automaticamente
618	Teclado	269.37	Samsung	Vermelho	P00118	1	Usado	4.09	Gerado automaticamente
619	TV	43.37	Samsung	Verde	P00119	21	Novo	1.75	Gerado automaticamente
620	Monitor	177.69	Samsung	Amarelo	P00120	35	Recondicionado	1.83	Gerado automaticamente
621	Fone	44.81	LG	Vermelho	P00121	18	Novo	1.92	Gerado automaticamente
622	Notebook	162.15	Acer	Amarelo	P00122	79	Usado	1.57	Gerado automaticamente
623	Mouse	54.63	Lenovo	Verde	P00123	49	Usado	3.24	Gerado automaticamente
624	Monitor	443.35	Dell	Vermelho	P00124	82	Usado	4.45	Gerado automaticamente
625	Peças de PC	13.53	Dell	Verde	P00125	53	Usado	1.22	Gerado automaticamente
626	Mouse	139.67	LG	Preto	P00126	74	Usado	4.66	Gerado automaticamente
627	Fone	141.24	Asus	Vermelho	P00127	12	Usado	4.02	Gerado automaticamente
628	Monitor	107.80	Acer	Amarelo	P00128	72	Usado	4.41	Gerado automaticamente
629	Notebook	328.30	Dell	Verde	P00129	77	Usado	4.90	Gerado automaticamente
630	Peças de PC	388.25	LG	Verde	P00130	55	Usado	2.18	Gerado automaticamente
631	Monitor	275.02	HP	Vermelho	P00131	32	Recondicionado	4.08	Gerado automaticamente
632	Fone	478.65	HP	Preto	P00132	62	Recondicionado	2.21	Gerado automaticamente
633	Monitor	147.97	HP	Verde	P00133	35	Usado	3.88	Gerado automaticamente
634	Celulares	48.08	Asus	Amarelo	P00134	72	Usado	4.85	Gerado automaticamente
635	Mouse	484.88	HP	Verde	P00135	77	Usado	0.59	Gerado automaticamente
636	Mouse	457.09	Asus	Vermelho	P00136	81	Recondicionado	2.25	Gerado automaticamente
637	Notebook	364.77	Acer	Vermelho	P00137	39	Recondicionado	4.37	Gerado automaticamente
638	Teclado	394.37	LG	Vermelho	P00138	47	Usado	3.97	Gerado automaticamente
639	Peças de PC	13.15	LG	Verde	P00139	29	Novo	4.40	Gerado automaticamente
640	Eletrodomésticos	115.18	Samsung	Amarelo	P00140	76	Usado	0.89	Gerado automaticamente
641	Monitor	99.60	Samsung	Azul	P00141	84	Usado	1.38	Gerado automaticamente
642	Peças de PC	171.63	Acer	Preto	P00142	51	Novo	3.77	Gerado automaticamente
643	Mouse	193.83	Asus	Verde	P00143	53	Usado	3.64	Gerado automaticamente
644	Peças de PC	105.84	LG	Vermelho	P00144	55	Novo	2.95	Gerado automaticamente
645	Teclado	335.51	Lenovo	Azul	P00145	19	Usado	3.61	Gerado automaticamente
646	Notebook	232.76	HP	Azul	P00146	81	Usado	4.11	Gerado automaticamente
647	Fone	342.74	HP	Preto	P00147	76	Recondicionado	4.38	Gerado automaticamente
648	Fone	422.44	Acer	Vermelho	P00148	64	Novo	4.15	Gerado automaticamente
649	TV	353.32	Samsung	Branco	P00149	56	Usado	3.15	Gerado automaticamente
650	Fone	182.31	LG	Branco	P00150	23	Recondicionado	0.52	Gerado automaticamente
651	Monitor	348.80	Asus	Verde	P00151	94	Novo	2.86	Gerado automaticamente
652	Teclado	354.56	Acer	Amarelo	P00152	21	Recondicionado	2.16	Gerado automaticamente
653	Teclado	187.97	Samsung	Verde	P00153	97	Novo	1.56	Gerado automaticamente
654	TV	181.14	Lenovo	Verde	P00154	91	Recondicionado	1.68	Gerado automaticamente
655	Fone	351.97	LG	Preto	P00155	37	Recondicionado	2.48	Gerado automaticamente
656	Fone	36.47	LG	Amarelo	P00156	40	Novo	3.67	Gerado automaticamente
657	Mouse	52.56	LG	Vermelho	P00157	91	Usado	2.72	Gerado automaticamente
658	TV	154.60	Lenovo	Azul	P00158	31	Recondicionado	3.53	Gerado automaticamente
659	Mouse	458.03	LG	Amarelo	P00159	69	Usado	4.95	Gerado automaticamente
660	Teclado	273.98	Samsung	Amarelo	P00160	49	Usado	4.65	Gerado automaticamente
661	Peças de PC	492.96	LG	Preto	P00161	41	Usado	3.11	Gerado automaticamente
662	TV	173.19	Lenovo	Verde	P00162	69	Recondicionado	1.02	Gerado automaticamente
663	Fone	118.37	Acer	Vermelho	P00163	9	Novo	3.59	Gerado automaticamente
664	Mouse	175.32	Lenovo	Amarelo	P00164	96	Novo	4.57	Gerado automaticamente
665	Notebook	40.89	LG	Amarelo	P00165	54	Usado	3.71	Gerado automaticamente
666	Notebook	267.98	LG	Azul	P00166	2	Usado	2.79	Gerado automaticamente
667	Celulares	127.56	LG	Preto	P00167	74	Novo	1.05	Gerado automaticamente
668	Notebook	239.21	Dell	Vermelho	P00168	86	Usado	1.36	Gerado automaticamente
669	Peças de PC	361.67	Lenovo	Azul	P00169	40	Usado	3.60	Gerado automaticamente
670	TV	161.29	HP	Azul	P00170	83	Usado	2.64	Gerado automaticamente
671	Celulares	172.36	Acer	Vermelho	P00171	33	Usado	1.87	Gerado automaticamente
672	Celulares	110.46	Dell	Vermelho	P00172	68	Usado	0.65	Gerado automaticamente
673	Mouse	343.30	LG	Preto	P00173	91	Novo	4.32	Gerado automaticamente
674	Monitor	348.38	Samsung	Verde	P00174	6	Novo	3.24	Gerado automaticamente
675	Peças de PC	24.01	Acer	Amarelo	P00175	62	Usado	3.43	Gerado automaticamente
676	Mouse	219.59	Lenovo	Vermelho	P00176	61	Recondicionado	3.89	Gerado automaticamente
677	Celulares	268.21	Acer	Vermelho	P00177	5	Novo	0.69	Gerado automaticamente
678	Notebook	498.91	HP	Azul	P00178	40	Usado	0.64	Gerado automaticamente
679	Notebook	373.14	Acer	Vermelho	P00179	10	Usado	4.26	Gerado automaticamente
680	Notebook	31.25	Lenovo	Vermelho	P00180	71	Usado	1.92	Gerado automaticamente
681	Teclado	259.79	Dell	Verde	P00181	33	Usado	3.55	Gerado automaticamente
682	Mouse	58.83	Samsung	Vermelho	P00182	100	Novo	2.85	Gerado automaticamente
683	Celulares	381.32	Acer	Vermelho	P00183	71	Recondicionado	0.67	Gerado automaticamente
684	Monitor	119.79	Acer	Preto	P00184	88	Novo	1.56	Gerado automaticamente
685	Fone	359.11	Acer	Preto	P00185	71	Novo	3.67	Gerado automaticamente
686	Mouse	397.14	HP	Branco	P00186	51	Recondicionado	2.21	Gerado automaticamente
687	Monitor	91.48	Acer	Azul	P00187	5	Usado	2.61	Gerado automaticamente
688	Notebook	173.99	HP	Verde	P00188	95	Recondicionado	1.86	Gerado automaticamente
689	Teclado	425.47	Samsung	Branco	P00189	58	Recondicionado	1.75	Gerado automaticamente
690	Fone	221.67	Acer	Verde	P00190	95	Recondicionado	3.14	Gerado automaticamente
691	Fone	284.71	Dell	Verde	P00191	74	Novo	1.72	Gerado automaticamente
692	Mouse	40.70	Asus	Vermelho	P00192	67	Usado	3.74	Gerado automaticamente
693	Notebook	68.59	Acer	Amarelo	P00193	18	Novo	1.48	Gerado automaticamente
694	Eletrodomésticos	423.52	Acer	Branco	P00194	67	Usado	1.01	Gerado automaticamente
695	Monitor	195.89	LG	Branco	P00195	13	Novo	3.36	Gerado automaticamente
696	TV	164.49	LG	Verde	P00196	67	Recondicionado	4.61	Gerado automaticamente
697	Monitor	46.72	Dell	Amarelo	P00197	23	Novo	3.38	Gerado automaticamente
698	Mouse	380.04	Lenovo	Vermelho	P00198	65	Usado	0.53	Gerado automaticamente
699	Monitor	364.66	Dell	Amarelo	P00199	65	Usado	2.74	Gerado automaticamente
700	Teclado	76.35	LG	Preto	P00200	74	Usado	1.40	Gerado automaticamente
701	Fone	468.63	LG	Amarelo	P00201	40	Usado	2.76	Gerado automaticamente
702	Monitor	464.41	Samsung	Amarelo	P00202	19	Usado	4.04	Gerado automaticamente
703	Mouse	474.11	Acer	Branco	P00203	30	Recondicionado	1.27	Gerado automaticamente
704	TV	333.07	Lenovo	Verde	P00204	77	Recondicionado	1.80	Gerado automaticamente
705	Monitor	440.93	Asus	Azul	P00205	39	Usado	3.91	Gerado automaticamente
706	Mouse	408.18	LG	Vermelho	P00206	38	Usado	1.20	Gerado automaticamente
707	Mouse	368.76	HP	Branco	P00207	91	Novo	1.62	Gerado automaticamente
708	Notebook	276.42	Acer	Amarelo	P00208	82	Novo	2.82	Gerado automaticamente
709	Celulares	378.36	Asus	Amarelo	P00209	33	Novo	3.02	Gerado automaticamente
710	Teclado	34.20	Acer	Verde	P00210	5	Usado	0.95	Gerado automaticamente
711	Peças de PC	224.09	LG	Verde	P00211	11	Recondicionado	4.98	Gerado automaticamente
712	Monitor	193.48	HP	Preto	P00212	66	Recondicionado	2.84	Gerado automaticamente
713	TV	492.98	Samsung	Vermelho	P00213	71	Novo	1.03	Gerado automaticamente
714	TV	453.76	HP	Vermelho	P00214	67	Recondicionado	1.38	Gerado automaticamente
715	Mouse	276.63	Dell	Verde	P00215	21	Usado	1.60	Gerado automaticamente
716	Peças de PC	122.74	LG	Vermelho	P00216	21	Usado	3.52	Gerado automaticamente
717	Peças de PC	343.25	Acer	Preto	P00217	59	Usado	1.78	Gerado automaticamente
718	Notebook	437.00	Dell	Amarelo	P00218	95	Recondicionado	1.42	Gerado automaticamente
719	Fone	140.82	Samsung	Preto	P00219	6	Usado	2.29	Gerado automaticamente
720	Fone	149.37	LG	Azul	P00220	77	Novo	3.32	Gerado automaticamente
721	Peças de PC	429.24	Samsung	Branco	P00221	31	Usado	2.00	Gerado automaticamente
722	TV	213.72	Asus	Vermelho	P00222	67	Usado	1.08	Gerado automaticamente
723	Teclado	52.56	Samsung	Amarelo	P00223	61	Novo	3.22	Gerado automaticamente
724	Peças de PC	314.82	Lenovo	Preto	P00224	99	Recondicionado	2.91	Gerado automaticamente
725	Notebook	196.83	Lenovo	Preto	P00225	61	Recondicionado	1.96	Gerado automaticamente
726	TV	232.54	LG	Amarelo	P00226	93	Novo	4.73	Gerado automaticamente
727	Celulares	344.40	Dell	Verde	P00227	35	Recondicionado	4.45	Gerado automaticamente
728	Fone	147.18	Samsung	Vermelho	P00228	17	Recondicionado	4.22	Gerado automaticamente
729	Mouse	435.38	Acer	Amarelo	P00229	43	Usado	3.85	Gerado automaticamente
730	Notebook	480.95	Acer	Preto	P00230	85	Usado	2.61	Gerado automaticamente
731	Fone	157.37	HP	Preto	P00231	77	Novo	0.78	Gerado automaticamente
732	Mouse	435.41	Acer	Verde	P00232	76	Recondicionado	4.79	Gerado automaticamente
733	TV	427.77	LG	Amarelo	P00233	63	Usado	1.70	Gerado automaticamente
734	Mouse	491.58	Lenovo	Azul	P00234	84	Usado	3.10	Gerado automaticamente
735	Monitor	319.59	LG	Amarelo	P00235	68	Usado	1.99	Gerado automaticamente
736	Fone	359.43	Asus	Vermelho	P00236	98	Usado	4.27	Gerado automaticamente
737	Teclado	233.67	LG	Verde	P00237	85	Recondicionado	0.52	Gerado automaticamente
738	Peças de PC	60.00	Samsung	Verde	P00238	85	Usado	3.44	Gerado automaticamente
739	Peças de PC	347.08	Acer	Amarelo	P00239	10	Usado	1.98	Gerado automaticamente
740	Peças de PC	474.10	Samsung	Amarelo	P00240	67	Recondicionado	0.58	Gerado automaticamente
741	Peças de PC	158.61	Samsung	Azul	P00241	43	Recondicionado	2.61	Gerado automaticamente
742	Mouse	493.31	Lenovo	Amarelo	P00242	19	Recondicionado	4.86	Gerado automaticamente
743	Teclado	366.54	Acer	Amarelo	P00243	37	Novo	3.00	Gerado automaticamente
744	TV	35.48	Samsung	Preto	P00244	14	Recondicionado	3.00	Gerado automaticamente
745	Teclado	190.84	Lenovo	Azul	P00245	48	Recondicionado	3.79	Gerado automaticamente
746	Peças de PC	469.08	Samsung	Preto	P00246	16	Usado	0.66	Gerado automaticamente
747	Eletrodomésticos	266.57	HP	Verde	P00247	72	Usado	2.85	Gerado automaticamente
748	Peças de PC	143.52	Dell	Vermelho	P00248	65	Usado	1.86	Gerado automaticamente
749	Monitor	151.22	Samsung	Verde	P00249	81	Novo	3.13	Gerado automaticamente
750	TV	333.18	Dell	Azul	P00250	71	Usado	3.88	Gerado automaticamente
751	Monitor	418.87	Lenovo	Azul	P00251	35	Novo	2.50	Gerado automaticamente
752	Celulares	52.11	Lenovo	Preto	P00252	79	Usado	1.21	Gerado automaticamente
753	Monitor	151.91	Dell	Preto	P00253	73	Recondicionado	0.55	Gerado automaticamente
754	Fone	465.58	Samsung	Branco	P00254	26	Usado	2.80	Gerado automaticamente
755	Fone	434.34	Dell	Branco	P00255	34	Recondicionado	0.96	Gerado automaticamente
756	Monitor	326.37	Dell	Vermelho	P00256	57	Usado	3.59	Gerado automaticamente
757	Monitor	126.35	HP	Amarelo	P00257	65	Novo	2.05	Gerado automaticamente
758	Teclado	332.93	Lenovo	Amarelo	P00258	21	Recondicionado	0.65	Gerado automaticamente
759	TV	207.91	LG	Verde	P00259	84	Novo	2.80	Gerado automaticamente
760	Mouse	474.05	HP	Preto	P00260	26	Recondicionado	4.69	Gerado automaticamente
761	TV	249.23	Asus	Azul	P00261	25	Recondicionado	3.81	Gerado automaticamente
762	Peças de PC	347.82	Acer	Vermelho	P00262	51	Novo	2.03	Gerado automaticamente
763	Peças de PC	339.50	Acer	Vermelho	P00263	68	Usado	4.69	Gerado automaticamente
764	Monitor	122.45	Lenovo	Vermelho	P00264	89	Usado	3.97	Gerado automaticamente
765	TV	416.84	Samsung	Amarelo	P00265	33	Recondicionado	1.76	Gerado automaticamente
766	Teclado	451.31	HP	Amarelo	P00266	26	Recondicionado	4.27	Gerado automaticamente
767	Peças de PC	404.04	HP	Preto	P00267	67	Recondicionado	1.36	Gerado automaticamente
768	Eletrodomésticos	18.72	HP	Branco	P00268	43	Usado	3.61	Gerado automaticamente
769	Fone	438.40	Acer	Amarelo	P00269	17	Novo	1.96	Gerado automaticamente
770	Teclado	495.07	HP	Verde	P00270	42	Recondicionado	2.17	Gerado automaticamente
771	Mouse	234.39	LG	Azul	P00271	5	Recondicionado	2.71	Gerado automaticamente
772	Peças de PC	208.79	HP	Azul	P00272	52	Usado	4.78	Gerado automaticamente
773	Teclado	264.69	Asus	Verde	P00273	42	Recondicionado	3.28	Gerado automaticamente
774	Mouse	143.76	Samsung	Amarelo	P00274	43	Recondicionado	3.22	Gerado automaticamente
775	Fone	204.10	HP	Azul	P00275	42	Recondicionado	3.13	Gerado automaticamente
776	Mouse	369.87	Lenovo	Amarelo	P00276	2	Novo	2.31	Gerado automaticamente
777	Fone	243.26	Lenovo	Preto	P00277	41	Usado	2.29	Gerado automaticamente
778	Fone	94.21	Asus	Preto	P00278	90	Usado	1.35	Gerado automaticamente
779	Notebook	199.34	HP	Azul	P00279	4	Recondicionado	4.52	Gerado automaticamente
780	Fone	50.43	Lenovo	Azul	P00280	41	Usado	2.31	Gerado automaticamente
781	Mouse	131.36	Acer	Branco	P00281	55	Usado	3.19	Gerado automaticamente
782	Monitor	243.91	Asus	Azul	P00282	22	Usado	3.04	Gerado automaticamente
783	Eletrodomésticos	83.38	Lenovo	Verde	P00283	73	Usado	3.92	Gerado automaticamente
784	Peças de PC	333.89	Acer	Vermelho	P00284	82	Usado	1.22	Gerado automaticamente
785	TV	60.32	Asus	Amarelo	P00285	47	Recondicionado	3.62	Gerado automaticamente
786	Mouse	242.23	Lenovo	Vermelho	P00286	5	Usado	0.95	Gerado automaticamente
787	Fone	381.01	Dell	Preto	P00287	20	Usado	2.32	Gerado automaticamente
788	Mouse	164.22	Samsung	Vermelho	P00288	75	Usado	4.98	Gerado automaticamente
789	Teclado	452.27	Lenovo	Vermelho	P00289	40	Novo	3.29	Gerado automaticamente
790	Notebook	267.46	LG	Preto	P00290	48	Recondicionado	0.81	Gerado automaticamente
791	Peças de PC	426.33	Lenovo	Amarelo	P00291	2	Usado	3.76	Gerado automaticamente
792	Peças de PC	286.55	Samsung	Vermelho	P00292	89	Usado	3.11	Gerado automaticamente
793	Mouse	288.84	Samsung	Preto	P00293	35	Novo	0.71	Gerado automaticamente
794	TV	189.61	Lenovo	Amarelo	P00294	38	Recondicionado	0.62	Gerado automaticamente
795	Teclado	334.65	Samsung	Branco	P00295	92	Recondicionado	0.79	Gerado automaticamente
796	Mouse	34.30	Dell	Verde	P00296	47	Recondicionado	2.31	Gerado automaticamente
797	Peças de PC	410.43	Acer	Azul	P00297	40	Recondicionado	0.66	Gerado automaticamente
798	Monitor	433.28	Samsung	Preto	P00298	11	Novo	4.06	Gerado automaticamente
799	Fone	30.38	Acer	Amarelo	P00299	85	Recondicionado	1.55	Gerado automaticamente
800	Fone	472.70	Dell	Preto	P00300	26	Novo	3.06	Gerado automaticamente
801	Monitor	169.14	Lenovo	Preto	P00301	15	Usado	4.35	Gerado automaticamente
802	Notebook	272.50	HP	Verde	P00302	88	Usado	3.58	Gerado automaticamente
803	Monitor	196.56	Samsung	Preto	P00303	95	Usado	0.67	Gerado automaticamente
804	Notebook	205.40	LG	Azul	P00304	88	Usado	1.67	Gerado automaticamente
805	Teclado	433.89	Acer	Azul	P00305	43	Novo	1.55	Gerado automaticamente
806	Notebook	160.11	LG	Preto	P00306	26	Recondicionado	4.17	Gerado automaticamente
807	Celulares	327.63	Asus	Verde	P00307	49	Usado	3.23	Gerado automaticamente
808	Peças de PC	390.97	HP	Verde	P00308	56	Usado	0.71	Gerado automaticamente
809	Monitor	295.20	Acer	Verde	P00309	77	Novo	1.80	Gerado automaticamente
810	Mouse	499.38	LG	Azul	P00310	46	Usado	4.02	Gerado automaticamente
811	TV	395.87	Lenovo	Vermelho	P00311	91	Recondicionado	4.08	Gerado automaticamente
812	Peças de PC	393.94	Lenovo	Vermelho	P00312	4	Novo	0.52	Gerado automaticamente
813	TV	287.84	Asus	Preto	P00313	93	Novo	0.70	Gerado automaticamente
814	Monitor	232.72	Lenovo	Preto	P00314	68	Novo	3.52	Gerado automaticamente
815	Monitor	338.76	Lenovo	Azul	P00315	79	Usado	0.77	Gerado automaticamente
816	Teclado	488.22	HP	Vermelho	P00316	34	Novo	4.36	Gerado automaticamente
817	Monitor	343.65	Lenovo	Amarelo	P00317	60	Usado	2.49	Gerado automaticamente
818	Peças de PC	23.23	Lenovo	Verde	P00318	82	Novo	2.92	Gerado automaticamente
819	Fone	58.20	Acer	Preto	P00319	24	Usado	1.04	Gerado automaticamente
820	Mouse	293.01	Asus	Branco	P00320	26	Novo	4.28	Gerado automaticamente
821	Notebook	409.31	Asus	Azul	P00321	98	Usado	4.11	Gerado automaticamente
822	Monitor	307.56	HP	Verde	P00322	97	Recondicionado	1.75	Gerado automaticamente
823	Peças de PC	433.56	LG	Verde	P00323	85	Usado	3.17	Gerado automaticamente
824	Monitor	352.16	LG	Preto	P00324	42	Usado	2.73	Gerado automaticamente
825	TV	319.73	LG	Preto	P00325	36	Novo	2.70	Gerado automaticamente
826	Mouse	389.16	Samsung	Preto	P00326	18	Recondicionado	1.25	Gerado automaticamente
827	Mouse	226.36	HP	Vermelho	P00327	72	Usado	2.37	Gerado automaticamente
828	Notebook	403.52	Samsung	Verde	P00328	62	Novo	3.21	Gerado automaticamente
829	TV	154.64	Samsung	Verde	P00329	27	Usado	1.60	Gerado automaticamente
830	Mouse	481.14	HP	Amarelo	P00330	55	Usado	2.10	Gerado automaticamente
831	Fone	248.93	Samsung	Azul	P00331	65	Usado	1.67	Gerado automaticamente
832	Teclado	343.14	HP	Vermelho	P00332	87	Recondicionado	0.67	Gerado automaticamente
833	Fone	130.70	LG	Verde	P00333	25	Usado	2.10	Gerado automaticamente
834	Eletrodomésticos	293.00	Acer	Verde	P00334	64	Usado	1.55	Gerado automaticamente
835	Fone	346.84	Samsung	Verde	P00335	6	Usado	4.11	Gerado automaticamente
836	TV	282.05	Dell	Amarelo	P00336	5	Recondicionado	2.33	Gerado automaticamente
837	Teclado	27.07	Acer	Vermelho	P00337	3	Novo	3.30	Gerado automaticamente
838	Mouse	436.28	Samsung	Verde	P00338	83	Recondicionado	4.36	Gerado automaticamente
839	Notebook	296.54	Samsung	Preto	P00339	82	Usado	3.58	Gerado automaticamente
840	Mouse	390.77	Asus	Preto	P00340	32	Usado	2.68	Gerado automaticamente
841	Fone	82.55	HP	Verde	P00341	42	Novo	3.95	Gerado automaticamente
842	Notebook	204.26	Lenovo	Vermelho	P00342	74	Usado	4.29	Gerado automaticamente
843	Fone	37.89	LG	Amarelo	P00343	29	Usado	1.88	Gerado automaticamente
844	Celulares	161.46	Samsung	Preto	P00344	28	Novo	4.11	Gerado automaticamente
845	Teclado	65.50	Lenovo	Amarelo	P00345	94	Usado	2.96	Gerado automaticamente
846	Celulares	15.83	Acer	Branco	P00346	62	Usado	0.57	Gerado automaticamente
847	Peças de PC	58.15	Acer	Verde	P00347	75	Usado	1.99	Gerado automaticamente
848	Notebook	63.72	Lenovo	Amarelo	P00348	84	Usado	2.70	Gerado automaticamente
849	Notebook	201.29	Acer	Azul	P00349	46	Recondicionado	1.78	Gerado automaticamente
850	Peças de PC	264.71	Samsung	Preto	P00350	77	Recondicionado	3.89	Gerado automaticamente
851	Teclado	284.57	Acer	Branco	P00351	50	Recondicionado	3.89	Gerado automaticamente
852	Fone	122.42	Acer	Azul	P00352	40	Usado	4.35	Gerado automaticamente
853	Teclado	288.50	Lenovo	Preto	P00353	77	Novo	1.34	Gerado automaticamente
854	Monitor	361.32	Dell	Vermelho	P00354	65	Novo	1.13	Gerado automaticamente
855	Notebook	103.61	Samsung	Preto	P00355	78	Novo	1.10	Gerado automaticamente
856	Peças de PC	49.59	LG	Amarelo	P00356	91	Novo	4.23	Gerado automaticamente
857	Fone	329.16	HP	Verde	P00357	13	Usado	1.25	Gerado automaticamente
858	Notebook	455.19	LG	Amarelo	P00358	29	Novo	2.02	Gerado automaticamente
859	TV	17.63	Samsung	Preto	P00359	47	Usado	1.07	Gerado automaticamente
860	Notebook	301.69	Dell	Verde	P00360	59	Usado	0.96	Gerado automaticamente
861	Monitor	44.59	Acer	Vermelho	P00361	88	Recondicionado	4.91	Gerado automaticamente
862	Fone	175.31	Dell	Preto	P00362	39	Novo	4.15	Gerado automaticamente
863	Monitor	77.73	LG	Branco	P00363	100	Novo	2.90	Gerado automaticamente
864	Mouse	67.92	Lenovo	Verde	P00364	57	Usado	1.75	Gerado automaticamente
865	Mouse	153.54	Acer	Vermelho	P00365	6	Usado	0.71	Gerado automaticamente
866	TV	200.93	Samsung	Vermelho	P00366	43	Recondicionado	4.14	Gerado automaticamente
867	Teclado	163.84	Samsung	Vermelho	P00367	52	Recondicionado	0.80	Gerado automaticamente
868	Fone	346.32	Samsung	Amarelo	P00368	64	Usado	4.53	Gerado automaticamente
869	Notebook	302.70	Acer	Branco	P00369	94	Novo	4.48	Gerado automaticamente
870	Mouse	369.05	Acer	Vermelho	P00370	12	Recondicionado	1.96	Gerado automaticamente
871	Mouse	95.99	Acer	Azul	P00371	34	Recondicionado	3.46	Gerado automaticamente
872	Eletrodomésticos	462.22	LG	Preto	P00372	57	Novo	2.79	Gerado automaticamente
873	Mouse	124.48	Lenovo	Preto	P00373	15	Usado	1.17	Gerado automaticamente
874	Celulares	143.13	Acer	Amarelo	P00374	100	Recondicionado	2.01	Gerado automaticamente
875	TV	297.32	Acer	Verde	P00375	49	Usado	3.01	Gerado automaticamente
876	Teclado	266.08	Lenovo	Vermelho	P00376	88	Recondicionado	3.18	Gerado automaticamente
877	TV	264.49	Dell	Preto	P00377	56	Usado	2.29	Gerado automaticamente
878	Monitor	151.89	HP	Amarelo	P00378	86	Recondicionado	0.93	Gerado automaticamente
879	Eletrodomésticos	209.31	Lenovo	Amarelo	P00379	19	Usado	2.16	Gerado automaticamente
880	Mouse	130.24	HP	Azul	P00380	45	Usado	2.02	Gerado automaticamente
881	Teclado	22.88	HP	Vermelho	P00381	46	Usado	1.34	Gerado automaticamente
882	Notebook	177.52	Lenovo	Azul	P00382	33	Usado	2.28	Gerado automaticamente
883	TV	256.25	Lenovo	Azul	P00383	6	Novo	3.15	Gerado automaticamente
884	Mouse	350.68	Lenovo	Vermelho	P00384	1	Usado	2.96	Gerado automaticamente
885	Notebook	216.67	Lenovo	Branco	P00385	78	Recondicionado	3.73	Gerado automaticamente
886	Monitor	197.52	Samsung	Vermelho	P00386	61	Novo	0.90	Gerado automaticamente
887	Teclado	352.12	Samsung	Vermelho	P00387	80	Usado	0.61	Gerado automaticamente
888	Fone	229.58	Lenovo	Verde	P00388	95	Novo	1.02	Gerado automaticamente
889	Teclado	224.13	Lenovo	Amarelo	P00389	83	Recondicionado	2.98	Gerado automaticamente
890	Peças de PC	363.25	Samsung	Azul	P00390	7	Recondicionado	3.98	Gerado automaticamente
891	Teclado	199.57	LG	Amarelo	P00391	33	Usado	4.08	Gerado automaticamente
892	Teclado	190.38	HP	Azul	P00392	72	Usado	0.81	Gerado automaticamente
893	Teclado	393.49	HP	Amarelo	P00393	21	Recondicionado	1.93	Gerado automaticamente
894	Teclado	99.91	Lenovo	Verde	P00394	26	Novo	4.89	Gerado automaticamente
895	Fone	380.45	Samsung	Branco	P00395	57	Usado	0.95	Gerado automaticamente
896	Peças de PC	208.82	Samsung	Preto	P00396	17	Usado	3.05	Gerado automaticamente
897	Teclado	89.56	Acer	Branco	P00397	94	Usado	3.46	Gerado automaticamente
898	Monitor	71.63	Dell	Verde	P00398	9	Novo	4.38	Gerado automaticamente
899	Mouse	195.27	HP	Preto	P00399	84	Recondicionado	1.64	Gerado automaticamente
900	Monitor	317.74	Lenovo	Azul	P00400	38	Recondicionado	2.43	Gerado automaticamente
901	Monitor	338.08	Samsung	Amarelo	P00401	60	Usado	3.71	Gerado automaticamente
902	Eletrodomésticos	290.07	Acer	Amarelo	P00402	3	Usado	3.55	Gerado automaticamente
903	Mouse	217.28	Acer	Amarelo	P00403	58	Novo	3.74	Gerado automaticamente
904	Mouse	440.02	Dell	Verde	P00404	76	Novo	4.23	Gerado automaticamente
905	Eletrodomésticos	23.39	Lenovo	Verde	P00405	3	Usado	4.83	Gerado automaticamente
906	Notebook	426.14	Samsung	Preto	P00406	13	Recondicionado	4.49	Gerado automaticamente
907	TV	32.87	LG	Preto	P00407	91	Novo	3.32	Gerado automaticamente
908	Monitor	203.94	LG	Vermelho	P00408	69	Usado	0.88	Gerado automaticamente
909	Notebook	486.35	Lenovo	Preto	P00409	90	Usado	4.54	Gerado automaticamente
910	TV	162.94	Asus	Verde	P00410	9	Novo	3.27	Gerado automaticamente
911	Teclado	228.93	HP	Azul	P00411	10	Novo	2.82	Gerado automaticamente
912	Monitor	336.54	Lenovo	Verde	P00412	61	Usado	4.56	Gerado automaticamente
913	Peças de PC	67.72	Acer	Preto	P00413	57	Novo	4.04	Gerado automaticamente
914	TV	417.05	Dell	Preto	P00414	2	Usado	2.88	Gerado automaticamente
915	Notebook	304.51	Acer	Amarelo	P00415	5	Recondicionado	1.76	Gerado automaticamente
916	Fone	184.22	Samsung	Preto	P00416	26	Novo	4.12	Gerado automaticamente
917	Peças de PC	277.81	Lenovo	Amarelo	P00417	25	Usado	3.59	Gerado automaticamente
918	Notebook	234.13	Asus	Preto	P00418	79	Novo	3.36	Gerado automaticamente
919	Eletrodomésticos	381.71	LG	Verde	P00419	78	Novo	0.92	Gerado automaticamente
920	Fone	404.78	Lenovo	Vermelho	P00420	39	Recondicionado	1.92	Gerado automaticamente
921	TV	231.41	Dell	Preto	P00421	35	Usado	2.19	Gerado automaticamente
922	TV	107.54	Lenovo	Branco	P00422	41	Recondicionado	4.25	Gerado automaticamente
923	Monitor	82.95	Acer	Verde	P00423	74	Usado	3.62	Gerado automaticamente
924	TV	183.45	HP	Amarelo	P00424	39	Novo	3.76	Gerado automaticamente
925	Notebook	439.01	Acer	Verde	P00425	32	Usado	3.18	Gerado automaticamente
926	TV	128.48	Dell	Preto	P00426	78	Novo	3.64	Gerado automaticamente
927	Monitor	374.46	Samsung	Verde	P00427	74	Usado	4.63	Gerado automaticamente
928	Peças de PC	353.71	Asus	Verde	P00428	89	Usado	0.58	Gerado automaticamente
929	Notebook	345.21	Asus	Vermelho	P00429	48	Usado	2.28	Gerado automaticamente
930	Fone	403.52	HP	Amarelo	P00430	23	Usado	3.14	Gerado automaticamente
931	Fone	105.19	Dell	Amarelo	P00431	18	Recondicionado	2.08	Gerado automaticamente
932	TV	368.15	HP	Amarelo	P00432	29	Usado	1.84	Gerado automaticamente
933	Peças de PC	330.98	Samsung	Amarelo	P00433	6	Novo	2.30	Gerado automaticamente
934	Notebook	321.30	Samsung	Azul	P00434	78	Novo	2.48	Gerado automaticamente
935	Eletrodomésticos	485.45	Acer	Amarelo	P00435	18	Usado	4.41	Gerado automaticamente
936	Peças de PC	320.99	Dell	Verde	P00436	84	Recondicionado	3.06	Gerado automaticamente
937	Notebook	379.22	Lenovo	Preto	P00437	85	Novo	4.54	Gerado automaticamente
938	Peças de PC	142.08	Lenovo	Verde	P00438	66	Usado	2.45	Gerado automaticamente
939	Monitor	469.01	Lenovo	Branco	P00439	15	Novo	0.98	Gerado automaticamente
940	Monitor	95.39	LG	Verde	P00440	70	Usado	2.48	Gerado automaticamente
941	Teclado	46.22	Lenovo	Preto	P00441	7	Recondicionado	2.06	Gerado automaticamente
942	Peças de PC	232.63	Lenovo	Amarelo	P00442	29	Usado	4.97	Gerado automaticamente
943	Notebook	497.33	HP	Amarelo	P00443	93	Usado	2.97	Gerado automaticamente
944	Fone	81.70	Samsung	Verde	P00444	6	Usado	0.87	Gerado automaticamente
945	Notebook	445.09	Asus	Branco	P00445	88	Usado	0.90	Gerado automaticamente
946	Teclado	69.77	Dell	Azul	P00446	7	Novo	1.39	Gerado automaticamente
947	Fone	439.97	Samsung	Azul	P00447	27	Usado	2.83	Gerado automaticamente
948	Notebook	476.80	Lenovo	Amarelo	P00448	88	Recondicionado	1.05	Gerado automaticamente
949	TV	194.44	Samsung	Amarelo	P00449	77	Novo	2.70	Gerado automaticamente
950	Teclado	404.35	Samsung	Verde	P00450	99	Usado	1.42	Gerado automaticamente
951	Fone	348.14	Acer	Verde	P00451	6	Recondicionado	3.56	Gerado automaticamente
952	Fone	466.33	LG	Amarelo	P00452	29	Usado	2.44	Gerado automaticamente
953	Teclado	324.02	Lenovo	Preto	P00453	28	Usado	3.51	Gerado automaticamente
954	Monitor	493.72	Samsung	Amarelo	P00454	78	Usado	1.02	Gerado automaticamente
955	Notebook	481.25	Acer	Verde	P00455	87	Usado	1.93	Gerado automaticamente
956	Monitor	354.47	Dell	Preto	P00456	29	Novo	1.30	Gerado automaticamente
957	Teclado	315.79	Lenovo	Vermelho	P00457	56	Novo	4.93	Gerado automaticamente
958	Monitor	188.75	Lenovo	Amarelo	P00458	21	Recondicionado	3.70	Gerado automaticamente
959	Peças de PC	252.19	Samsung	Branco	P00459	45	Novo	4.75	Gerado automaticamente
960	TV	413.61	Acer	Vermelho	P00460	50	Recondicionado	3.22	Gerado automaticamente
961	Teclado	80.03	LG	Vermelho	P00461	64	Usado	3.07	Gerado automaticamente
962	Peças de PC	135.61	LG	Amarelo	P00462	11	Usado	4.28	Gerado automaticamente
963	Teclado	224.77	Lenovo	Amarelo	P00463	95	Usado	1.60	Gerado automaticamente
964	TV	249.07	HP	Branco	P00464	47	Recondicionado	0.60	Gerado automaticamente
965	Mouse	186.41	Lenovo	Azul	P00465	43	Recondicionado	0.56	Gerado automaticamente
966	Celulares	42.17	Asus	Amarelo	P00466	16	Recondicionado	0.93	Gerado automaticamente
967	Mouse	137.35	Samsung	Verde	P00467	97	Usado	4.28	Gerado automaticamente
968	TV	91.83	Acer	Vermelho	P00468	27	Novo	2.41	Gerado automaticamente
969	Peças de PC	40.00	Dell	Azul	P00469	64	Usado	4.54	Gerado automaticamente
970	Notebook	62.73	Asus	Branco	P00470	96	Novo	3.55	Gerado automaticamente
971	Mouse	142.37	Lenovo	Vermelho	P00471	86	Usado	1.84	Gerado automaticamente
972	Monitor	354.91	HP	Amarelo	P00472	45	Novo	2.61	Gerado automaticamente
973	Peças de PC	120.46	HP	Preto	P00473	12	Novo	4.89	Gerado automaticamente
974	Notebook	61.32	Acer	Branco	P00474	84	Usado	2.24	Gerado automaticamente
975	Celulares	217.37	LG	Branco	P00475	14	Recondicionado	0.60	Gerado automaticamente
976	Monitor	49.31	Acer	Preto	P00476	23	Usado	1.70	Gerado automaticamente
977	Peças de PC	284.04	LG	Amarelo	P00477	100	Recondicionado	2.20	Gerado automaticamente
978	Teclado	169.57	LG	Preto	P00478	54	Novo	0.80	Gerado automaticamente
979	Mouse	283.72	Asus	Vermelho	P00479	46	Recondicionado	0.53	Gerado automaticamente
980	TV	35.24	Asus	Vermelho	P00480	35	Recondicionado	4.33	Gerado automaticamente
981	Teclado	421.99	Acer	Azul	P00481	48	Usado	4.63	Gerado automaticamente
982	Peças de PC	426.01	LG	Branco	P00482	67	Novo	1.47	Gerado automaticamente
983	Monitor	23.89	HP	Verde	P00483	86	Recondicionado	3.16	Gerado automaticamente
984	Teclado	190.61	Acer	Verde	P00484	11	Usado	2.87	Gerado automaticamente
985	Celulares	322.16	Lenovo	Vermelho	P00485	49	Usado	1.18	Gerado automaticamente
986	Monitor	309.46	Lenovo	Preto	P00486	38	Novo	2.20	Gerado automaticamente
987	Peças de PC	374.69	Samsung	Azul	P00487	78	Novo	1.87	Gerado automaticamente
988	Notebook	333.27	Acer	Preto	P00488	46	Novo	1.44	Gerado automaticamente
989	Mouse	124.62	HP	Vermelho	P00489	12	Recondicionado	1.92	Gerado automaticamente
990	TV	164.29	Dell	Amarelo	P00490	65	Usado	2.19	Gerado automaticamente
991	Celulares	218.41	Acer	Verde	P00491	61	Recondicionado	4.18	Gerado automaticamente
992	Teclado	164.29	Acer	Verde	P00492	1	Recondicionado	3.64	Gerado automaticamente
993	Eletrodomésticos	131.82	Acer	Vermelho	P00493	47	Novo	0.57	Gerado automaticamente
994	Mouse	496.17	Samsung	Preto	P00494	18	Usado	1.08	Gerado automaticamente
995	TV	105.90	Dell	Branco	P00495	51	Novo	3.60	Gerado automaticamente
996	Notebook	245.69	LG	Vermelho	P00496	64	Usado	4.35	Gerado automaticamente
997	Notebook	487.07	Dell	Preto	P00497	16	Novo	2.15	Gerado automaticamente
998	Teclado	344.13	HP	Preto	P00498	23	Novo	0.64	Gerado automaticamente
999	TV	135.70	Samsung	Verde	P00499	55	Novo	0.61	Gerado automaticamente
1000	Monitor	199.93	HP	Verde	P00500	83	Usado	3.65	Gerado automaticamente
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nome, sobrenome, email, numero, senha) FROM stdin;
1	Gabriel	Rodrigues	gabriel@example.com	19981135541	minha_senha_segura
\.


--
-- Name: estoque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estoque_id_seq', 1000, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- Name: estoque estoque_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoque
    ADD CONSTRAINT estoque_codigo_key UNIQUE (codigo);


--
-- Name: estoque estoque_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoque
    ADD CONSTRAINT estoque_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

