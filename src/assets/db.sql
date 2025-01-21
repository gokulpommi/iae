CREATE TABLE amaster (
	amasterid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	areaname VARCHAR(40), 
	areacode VARCHAR(40), 
	mhcyn VARCHAR(10), 
	branchid VARCHAR(100), 
	PRIMARY KEY (amasterid)
);
CREATE TABLE areaaudittag ( areaaudittagid INTEGER NOT NULL, is_cancelled VARCHAR(100), unique_id_field VARCHAR(70), created_on DATETIME, created_by VARCHAR(100), modified_on DATETIME, modified_by VARCHAR(100), upstream_txview_ref_id INTEGER, post_tx_title VARCHAR(100), userid VARCHAR(100), projectid VARCHAR(100), ipadd VARCHAR(100), recid INTEGER, versionid VARCHAR(100), roleid VARCHAR(100), objectid VARCHAR(100), areapoint VARCHAR(100), mapdata VARCHAR(500), ragid VARCHAR(100), PRIMARY KEY (areaaudittagid) );
CREATE TABLE bgloaction (
	bgloactionid INTEGER NOT NULL, 
	username VARCHAR(100), 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), latandlong TEXT, gdtae NUMERIC, gtime NUMBER, 
	PRIMARY KEY (bgloactionid)
);
CREATE TABLE branchmast (
	branchmastid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	branchname VARCHAR(100), branchid TEXT, 
	PRIMARY KEY (branchmastid)
);
CREATE TABLE cmfsactivity (
	cmfsactivityid INTEGER NOT NULL, 
	phi INTEGER, 
	dosage NUMERIC(10, 2), 
	cost INTEGER, 
	qty NUMERIC(10, 2), 
	targetpest VARCHAR(15), 
	spraydesc VARCHAR(10), 
	fromdays INTEGER, 
	todays INTEGER, 
	fstask VARCHAR(15), 
	fsstage VARCHAR(10), 
	spraytype VARCHAR(20), 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), cropmasterid NUMBER, 
	PRIMARY KEY (cmfsactivityid)
);
CREATE TABLE cropcycle (
	cropcycleid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	branchid VARCHAR(100), 
	cropmastuid VARCHAR(100), 
	cropscheme VARCHAR(100), 
	crop VARCHAR(100), 
	PRIMARY KEY (cropcycleid)
);
CREATE TABLE cropmaster (
	cropmasterid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	branchid VARCHAR(20), 
	cropmastuid VARCHAR(20), 
	cropscheme VARCHAR(100), 
	crop VARCHAR(100), 
	PRIMARY KEY (cropmasterid)
);
CREATE TABLE cropplan (
	cropplanid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	subgroupid VARCHAR(100), csp1id NUMBER, cspuid NUMBER, 
	PRIMARY KEY (cropplanid)
);
CREATE TABLE cropscheme (
	cropschemeid INTEGER NOT NULL, 
	cropmasterid INTEGER, 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), schemename TEXT, 
	PRIMARY KEY (cropschemeid)
);
CREATE TABLE croptype (
	croptypeid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	igdetailid INTEGER, 
	subgroupid VARCHAR(100), 
	PRIMARY KEY (croptypeid)
);
CREATE TABLE emparea (
	empareaid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	empmasterid INTEGER, 
	emparearow INTEGER, 
	agrprefix VARCHAR(40), 
	acode VARCHAR(20), 
	seqto INTEGER, 
	seqfrm INTEGER, 
	locid INTEGER, 
	emparea1 INTEGER, 
	empbranchid INTEGER, 
	validto DATE, 
	validfrom DATE, 
	activeyn VARCHAR(20), 
	PRIMARY KEY (empareaid)
);
CREATE TABLE empmaster (
	empmasterid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	employeename VARCHAR(100), type TEXT, seqfrom NUMBER, seqto NUMBER, mobno NUMBER, branchid INTEGER, lagrno NUMBER, 
	PRIMARY KEY (empmasterid)
);
CREATE TABLE euser (
	userid INTEGER NOT NULL, 
	username VARCHAR(100), 
	password VARCHAR(512), 
	repassword VARCHAR(512), 
	firstname VARCHAR(256), 
	lastname VARCHAR(256), 
	emailid VARCHAR(200), 
	createdon DATE, 
	enabled VARCHAR(20), 
	firstlogin VARCHAR(10), 
	projectid BIGINT, 
	eviewtype VARCHAR(30), 
	usertype VARCHAR(20), 
	mobilenumber BIGINT, 
	auvitid VARCHAR(100), 
	countrycode VARCHAR(150), 
	userphoto BLOB, 
	usersign BLOB, 
	rolename VARCHAR(50), 
	onesignalplayer_id VARCHAR(250), 
	imei_no BIGINT, enable_mobile VARCHAR(10), 
	PRIMARY KEY (userid)
);
INSERT INTO "euser" VALUES(1,'k@gmail.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','Basavaraj','Hakari','k@gmail.com',NULL,'T',NULL,16,NULL,NULL,9538602933,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(2,'malatesh@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MALATESH','C.B','malatesh@ken.com',NULL,'T',NULL,16,NULL,NULL,9901987482,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(3,'nanjundamurthy@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','NANJUNDA','MURTHY','nanjundamurthy@ken.com',NULL,'T',NULL,16,NULL,NULL,9448115201,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(4,'nanjundamurthy@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','NANJUNDA','MURTHY','nanjundamurthy@ken.com',NULL,'T',NULL,16,NULL,NULL,9448115201,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(5,'nagarajd@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','NAGARAJ','D','nagarajd@ken.com',NULL,'T',NULL,16,NULL,NULL,9972078894,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(6,'balramk@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BALARAM','K','balramk@ken.com',NULL,'T',NULL,16,NULL,NULL,7899133255,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(7,'mallikarjun@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MALLIKARJUN','N','mallikarjun@ken.com',NULL,'T',NULL,16,NULL,NULL,9164593556,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(8,'prashanthbarki@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','PRASANTH','BARKI','prashanthbarki@ken.com',NULL,'T',NULL,16,NULL,NULL,9360748145,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(9,'chickappa@ken.com','12345','12345','CHICKAPPA','N B','chickappa@ken.com',NULL,'T',NULL,16,NULL,NULL,9164424104,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(10,'manjunathbarki@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MANJUNATH','BARKI','manjunathbarki@ken.com',NULL,'T',NULL,16,NULL,NULL,9535873062,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(11,'khajasab@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','KHAJASAB',NULL,'khajasab@ken.com',NULL,'F',NULL,16,NULL,NULL,9742507492,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(12,'manjunathp@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MANJUNATH','PUJAR','manjunathp@ken.com',NULL,'T',NULL,16,NULL,NULL,9972984878,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(13,'basavarajbattur@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVARAJ','BATTUR','basavarajbattur@ken.com',NULL,'F',NULL,16,NULL,NULL,6361715041,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(14,'prakash@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','PRAKASH','KINI','prakash@ken.com',NULL,'T',NULL,16,NULL,NULL,9448362402,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(16,'rahul@ken.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','Rahul','N','rahul@ken.com',NULL,'T',NULL,16,NULL,NULL,8618681331,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(17,'manjappag@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MANJAPPA','G','manjappag@ken.com',NULL,'T',NULL,16,NULL,NULL,8073941308,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(18,'nagaraja@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','NAGARAJ','A','nagaraja@ken.com',NULL,'F',NULL,16,NULL,NULL,9741558445,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(19,'saddam@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SADDAM',NULL,'saddam@ken.com',NULL,'F',NULL,16,NULL,NULL,7975506537,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(20,'basavanaya@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVANAYA','KEN','basavanaya@ken.com',NULL,'T',NULL,16,NULL,NULL,9632949808,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(21,'kumarpujjar@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','KUMAR','PUJJAR','kumarpujjar@ken.com',NULL,'T',NULL,16,NULL,NULL,9663620621,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(22,'shivappalamani@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SHIVAPPA','LAMANI','shivappalamani@ken.com',NULL,'F',NULL,16,NULL,NULL,9972700562,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(23,'shivarajtalwar@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SHIVARAJ','TALWAR','shivarajtalwar@ken.com',NULL,'T',NULL,16,NULL,NULL,9916125062,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(24,'shivarajtalwar@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SHIVARAJ','TALWAR','shivarajtalwar@ken.com',NULL,'T',NULL,16,NULL,NULL,9916125062,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(25,'basavanaya@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVANAYA','KEN','basavanaya@ken.com',NULL,'T',NULL,16,NULL,NULL,9632949808,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(26,'shivappalamani@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SHIVAPPA','LAMANI','shivappalamani@ken.com',NULL,'F',NULL,16,NULL,NULL,9972700562,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(27,'kumarpujjar@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','KUMAR','PUJJAR','kumarpujjar@ken.com',NULL,'T',NULL,16,NULL,NULL,9663620621,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(28,'saddam@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SADDAM',NULL,'saddam@ken.com',NULL,'F',NULL,16,NULL,NULL,7975506537,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(29,'nagaraja@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','NAGARAJ','A','nagaraja@ken.com',NULL,'F',NULL,16,NULL,NULL,9741558445,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(30,'manjappag@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MANJAPPA','G','manjappag@ken.com',NULL,'T',NULL,16,NULL,NULL,8073941308,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(32,'r@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','Raghu','Sir','r@ken.com',NULL,'F',NULL,16,NULL,NULL,9380901332,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'F');
INSERT INTO "euser" VALUES(33,'nagireddy@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','NAGI','REDDY','nagireddy@ken.com',NULL,'T',NULL,16,NULL,NULL,9440574725,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(34,'ashok@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','ASHOK','KEN','ashok@gmail.com',NULL,'T',NULL,16,NULL,NULL,9448112763,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(35,'anagadi@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','ANGADI','H M','anagadi@ken.com',NULL,'F',NULL,16,NULL,NULL,9148715966,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'F');
INSERT INTO "euser" VALUES(36,'revanna@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','REVANNA',NULL,'revanna@ken.com',NULL,'F',NULL,16,NULL,NULL,7259854313,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(37,'madhukp@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MADHU','K P','madhukp@ken.com',NULL,'F',NULL,16,NULL,NULL,9591565407,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(38,'nataraja@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','NATARAJA','B N','nataraja@ken.com',NULL,'F',NULL,16,NULL,NULL,7829211715,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(39,'bhuteshk@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BHUTESH','K','bhuteshk@ken.com',NULL,'F',NULL,16,NULL,NULL,8095875024,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(41,'raghavendra@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','RAGHAVENDRA','D G','raghavendra@ken.com',NULL,'T',NULL,16,NULL,NULL,7406594183,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(42,'muralihk@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MURALI','H K','muralihk@ken.com',NULL,'T',NULL,16,NULL,NULL,9480999094,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(43,'bhemaiah@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BHEMAIAH','K','bhemaiah@ken.com',NULL,'T',NULL,16,NULL,NULL,9666163793,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(44,'srinivast@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SRINIVAS','T','srinivast@ken.com',NULL,'F',NULL,16,NULL,NULL,9886221874,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(45,'basavarajhp@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVARAJ','H P','basavarajhp@ken.com',NULL,'F',NULL,16,NULL,NULL,6361715041,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(47,'manjunathsn@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MANJUNATH','S N','manjunathsn@ken.com',NULL,'T',NULL,16,NULL,NULL,9902217295,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(48,'srinivasreddy@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SRINIVAS REDDY','P','srinivasreddy@ken.com',NULL,'F',NULL,16,NULL,NULL,9701965320,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(49,'parameshvg@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','PARAMESH','V G','parameshvg@ken.com',NULL,'T',NULL,16,NULL,NULL,9739426820,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(50,'basavarajkori@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVARAJ','M KORI','basavarajkori@ken.com',NULL,'F',NULL,16,NULL,NULL,9164988985,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(51,'hanumanthappa@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','HANUMANTHAPPA','P','hanumanthappa@ken.com',NULL,'T',NULL,16,NULL,NULL,9901776459,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(52,'ramesh@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','RAMESH','G H','ramesh@ken.com',NULL,'T',NULL,16,NULL,NULL,9986404846,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(53,'rajkumar@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','RAJKUMAR','SIRA','rajkumar@ken.com',NULL,'F',NULL,16,NULL,NULL,7353873741,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(54,'murthoji@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MURTHOJI','N G','murthoji@ken.com',NULL,'T',NULL,16,NULL,NULL,9972150160,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(55,'valiahmed@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','VALI','AHMED','valiahmed@ken.com',NULL,'F',NULL,16,NULL,NULL,9663266121,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(56,'vinay@ken.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','VINAY','KEN','vinay@ken.com',NULL,'F',NULL,16,NULL,NULL,8333069128,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(57,'ramudu@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','RAMUDU','T','ramudu@ken.com',NULL,'T',NULL,16,NULL,NULL,9133745459,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(58,'goutham@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','GOUTHAM','M','goutham@ken.com',NULL,'F',NULL,16,NULL,NULL,9845911973,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(59,'basavarajb@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVRAJ','B','basavarajb@ken.com',NULL,'F',NULL,16,NULL,NULL,9731819383,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(60,'kareeppa@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','KAREEPPA','GOUD','kareeppa@ken.com',NULL,'F',NULL,16,NULL,NULL,9849895073,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(61,'nagaraj@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','Nagaraj','G S','nagaraj@ken.com',NULL,'F',NULL,16,NULL,NULL,9535742813,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(62,'huchayya@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','Huchayya','H','huchayya@ken.com',NULL,'T',NULL,16,NULL,NULL,9449435122,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(64,'urukunduk@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','URUKUNDU','K','urukunduk@ken.com',NULL,'T',NULL,16,NULL,NULL,9652649431,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(65,'ramuduk@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','RAMUDU','K','ramuduk@ken.com',NULL,'F',NULL,16,NULL,NULL,9912911361,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(66,'ramesht@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','RAMESH','T','ramesht@ken.com',NULL,'F',NULL,16,NULL,NULL,9666269432,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(67,'ramudub@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','RAMUDU','B','ramudub@ken.com',NULL,'F',NULL,16,NULL,NULL,7989187890,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(68,'vishwanthreddy@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','VISHWANATHREDDY','G','vishwanthreddy@ken.com',NULL,'T',NULL,16,NULL,NULL,8106888715,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(69,'anjaneyalu@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','ANJANEYALU','K  P','anjaneyalu@ken.com',NULL,'F',NULL,16,NULL,NULL,9573632479,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(70,'hhanumanthrao@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','HHANUMANTHRAO','HHANUMANTHRAO','hhanumanthrao@gmail.com',NULL,'T',NULL,16,NULL,NULL,9972340203,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(71,'basavarajBH@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVARAJ','B H','basavarajBH@gmail.com',NULL,'T',NULL,16,NULL,NULL,9663620571,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(72,'manjunathg@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MANJUNATH G','HIREMATH','manjunathg@gmail.com',NULL,'T',NULL,16,NULL,NULL,8884004015,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(73,'manjappas@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MANJAPPA S','DANAPPANAVAR','manjappas@gmail.com',NULL,'T',NULL,16,NULL,NULL,7996790408,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(74,'shanmukappac@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','SHANMUKAPPA C','KIRAWADI','shanmukappac@gmail.com',NULL,'F',NULL,16,NULL,NULL,6362369728,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(76,'veeranna@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','VEERANNA','B H','veeranna@gmail.com',NULL,'T',NULL,16,NULL,NULL,9663797355,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(77,'basavaraj@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVARAJ','k','basavaraj@gmail.com',NULL,'T',NULL,16,NULL,NULL,8151862404,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(78,'rajappa@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','RAJAPPA','SINDHE','rajappa@gmail.com',NULL,'T',NULL,16,NULL,NULL,8105659104,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(79,'murthojing@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','Murthoji N G','NG','murthojing@gmail.com',NULL,'F',NULL,16,NULL,NULL,9972150160,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(80,'basavaraja@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVARAJ','A','basavaraja@gmail.com',NULL,'F',NULL,16,NULL,NULL,8197729223,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(81,'choudappa@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','Choudappa','T','choudappa@gmail.com',NULL,'T',NULL,16,NULL,NULL,8880470156,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(82,'channabasappa@gmail.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','Channa Basappa','BY','channabasappa@gmail.com',NULL,'F',NULL,16,NULL,NULL,9880591901,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(84,'maheshrathod@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MAHESH','RATHOD','maheshrathod@ken.com',NULL,'F',NULL,16,NULL,NULL,9019250797,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(85,'basavarajsh@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','BASAVARAJ','S H','basavarajsh@ken.com',NULL,'T',NULL,16,NULL,NULL,8970846835,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(86,'mahalingappa@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MAHALINGAPPA','S','mahalingappa@ken.com',NULL,'T',NULL,16,NULL,NULL,7337625329,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(87,'ashokk@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','ASHOK','K','ashokk@ken.com',NULL,'F',NULL,16,NULL,NULL,7899119993,NULL,NULL,NULL,NULL,'user',NULL,NULL,'F');
INSERT INTO "euser" VALUES(88,'majunathh@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MANJUNATH','H','majunathh@ken.com',NULL,'T',NULL,16,NULL,NULL,8496096072,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(89,'maheshwarappa@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','MAHESHWARAPPA','KEN','maheshwarappa@ken.com',NULL,'T',NULL,16,NULL,NULL,8722534734,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(90,'fakkiresh@ken.com','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','0nffFE8j8RUH4G16XM8LuMJrNMSlj1TC7T08diXue9/Qq7rcYw16puQIefg0JjPtHezYrWV7tMt3/W8xe++rLA==','FAKKIRESH','M','fakkiresh@ken.com',NULL,'T',NULL,16,NULL,NULL,9743194297,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');
INSERT INTO "euser" VALUES(91,'manjunath@gmail.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','MANJUNATH','G','manjunath@gmail.com',NULL,'T',NULL,16,NULL,NULL,7348841188,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(92,'kotresh@gmail.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','KOTRESH','E','kotresh@gmail.com',NULL,'T',NULL,16,NULL,NULL,7026000754,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(93,'sunil@gmail.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','SUNIL','ETTI','sunil@gmail.com',NULL,'T',NULL,16,NULL,NULL,9538504201,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(94,'naveen@gmail.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','NAVEEN','C H','naveen@gmail.com',NULL,'T',NULL,16,NULL,NULL,8861277305,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(95,'fakiresh@gmail.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','FAKIRESH','B G','fakiresh@gmail.com',NULL,'T',NULL,16,NULL,NULL,9980647408,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(96,'rajuss@gmail.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','RAJU S S','KEN','rajuss@gmail.com',NULL,'T',NULL,16,NULL,NULL,9113869655,NULL,NULL,NULL,NULL,'user',NULL,NULL,'T');
INSERT INTO "euser" VALUES(97,'pramod@ken.com','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','+6w8KbWtM1dGyeOqoZdyINh48IOkS+e2bB8sQXumPoJJhg2fy74p4o0zEjqxmNZthtSTuAlI4XhXF8KvU/1wQw==','Pramod','Ken','pramod@ken.com',NULL,'T',NULL,16,NULL,NULL,9448112805,NULL,NULL,NULL,NULL,'Area Manager',NULL,NULL,'T');

CREATE TABLE mastermap (
	moduleid INTEGER NOT NULL, 
	stname VARCHAR(60) NOT NULL, 
	ttname VARCHAR(60) NOT NULL, 
	url VARCHAR(60), 
	dependson VARCHAR(60), 
	orderno INTEGER, 
	wherecon VARCHAR(60), 
	modeofinsert VARCHAR(60), 
	action VARCHAR(60), 
	"view" VARCHAR(160), 
	button VARCHAR(60), 
	project_slug VARCHAR(60) NOT NULL, conditiontype VARCHAR(30), sync_type VARCHAR(30), sync_sql VARCHAR(2000), src_sqlite_tab VARCHAR(30), tabmapid INTEGER, 
	PRIMARY KEY (moduleid)
);

INSERT INTO "mastermap" VALUES(7,'','branchmast',NULL,'',1,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT DISTINCT b.branchmastid,b.branchname, b.branchid
FROM branchmast b,empmaster e
WHERE e.branchid = b.branchmastid AND e.mobno = :MOBILENUMBER
ORDER BY 2','',7);
INSERT INTO "mastermap" VALUES(8,'','amaster',NULL,'',4,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT a.amasterid,a.areaname 
FROM amaster a,empmaster e,emparea ea
WHERE e.empmasterid = ea.empmasterid AND ea.emparea1 = a.amasterid AND e.mobno= :MOBILENUMBER AND ea.activeyn = ''YES''','',8);
INSERT INTO "mastermap" VALUES(16,'','cropcycle',NULL,'',6,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT DISTINCT ig.igdetailid as cropcycleid,ig.subgroupid FROM csp1 a,cspfo a2,empmaster e,cropmaster a3,itemmaster i,branchmast b,vmaster v,amaster am,se1 s1,se2 s2,igdetail ig
WHERE a.csp1id = a2.csp1id AND a2.fieldstaff = e.empmasterid AND a.branchid = b.branchmastid
AND a.cropmasteruid = a3.cropmasterid AND a.cropitemid = i.itemmasterid AND s1.se1id = s2.se1id
AND s1.areaname = am.amasterid AND s2.village = v.vmasterid AND a.csp1id = s1.cropseason AND s1.cropmasterid = a3.cropmasterid
AND s1.fieldstaff = e.empmasterid AND s1.cropitemid = i.itemid AND s1.crop = ig.subgroupid
AND e.mobno =:MOBILENUMBER','',16);
INSERT INTO "mastermap" VALUES(23,'','cropmaster',NULL,'',10,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT DISTINCT c.cropmasterid,c.crop crop, c.cropscheme FROM cropmaster c,igdetail ig 
WHERE c.crop = ig.igdetailid AND c.is_cancelled = ''F''
ORDER BY 1','',23);
INSERT INTO "mastermap" VALUES(18,'','cropplan',NULL,'',7,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT DISTINCT a.csp1id AS cropplanid,a.cspuid
FROM csp1 a,cspfo a2,empmaster e,cropmaster a3,itemmaster i,branchmast b,vmaster v,amaster am,se1 s1,se2 s2
WHERE a.csp1id = a2.csp1id AND a2.fieldstaff = e.empmasterid AND a.branchid = b.branchmastid
AND a.cropmasteruid = a3.cropmasterid AND a.cropitemid = i.itemmasterid AND s1.se1id = s2.se1id
AND s1.areaname = am.amasterid AND s2.village = v.vmasterid AND a.csp1id = s1.cropseason AND s1.cropmasterid = a3.cropmasterid
AND s1.fieldstaff = e.empmasterid AND s1.cropitemid = i.itemid 
AND e.mobno = :MOBILENUMBER','',18);
INSERT INTO "mastermap" VALUES(13,'','empmaster',NULL,'',1,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT e.empmasterid,e.employee_name "EmployeeName",
e.empdept "Type",ea.seqfrm "SeqFrom",ea.seqto "SeqTo", e.mobno ,e.branchid,
(SELECT MAX(f.agno) FROM frmmast1 f WHERE f.mobileno = :MOBILENUMBER) lagrno
FROM empmaster e,emparea ea
WHERE e.empmasterid = ea.empmasterid  AND (e.empdept = ''FIELD STAFF'' OR e.empdept = ''AREA MANAGER'')  AND ea.activeyn = ''YES'' AND e.mobno = :MOBILENUMBER AND e.mobno IS NOT NULL','',13);
INSERT INTO "mastermap" VALUES(21,'','emparea',NULL,'',8,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT ea.empareaid, ea.empmasterid, ea.emparea1
FROM empmaster e, emparea ea
WHERE e.empmasterid = ea.empmasterid  AND (e.empdept = ''FIELD STAFF'' OR e.empdept = ''AREA MANAGER'')
AND e.mobno = :MOBILENUMBER AND e.mobno IS NOT NULL','',21);

INSERT INTO "mastermap" VALUES(41,'','cmfsactivity',NULL,'',1,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT s.cmfsactivityid, s.spraytype, s.fsstage, s.fstask, s.todays, s.fromdays, s.spraydesc, s.targetpest, s.qty,s.cost,s.dosage,s.phi,s.cropmasterid
FROM cmfsactivity s
WHERE s.spraytype=''MANDATORY'' AND s.cropmasterid = 10998000000000','',41);
INSERT INTO "mastermap" VALUES(28,'','areaaudittag',NULL,'',13,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','select areapoint,ragid  from areaaudittag  where ragid is null','',28);
INSERT INTO "mastermap" VALUES(11,'','itemmaster',NULL,'',5,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT DISTINCT it.itemmasterid,it.itemid,it.subgroup FROM itemmaster it
WHERE it.subgroup = 10001000000064 AND it.is_cancelled=''F''','',11);
INSERT INTO "mastermap" VALUES(22,'','igdetail',NULL,'',9,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT DISTINCT ig.igdetailid AS igdetailid,ig.subgroup,ig.subgroupid,ig.groupsidc FROM csp1 a,cspfo a2,empmaster e,cropmaster a3,itemmaster i,branchmast b,vmaster v,amaster am,se1 s1,se2 s2,igdetail ig
WHERE a.csp1id = a2.csp1id AND a2.fieldstaff = e.empmasterid AND a.branchid = b.branchmastid
AND a.cropmasteruid = a3.cropmasterid AND a.cropitemid = i.itemmasterid AND s1.se1id = s2.se1id
AND s1.areaname = am.amasterid AND s2.village = v.vmasterid AND a.csp1id = s1.cropseason AND s1.cropmasterid = a3.cropmasterid
AND s1.fieldstaff = e.empmasterid AND s1.cropitemid = i.itemid AND s1.crop = ig.subgroupid
AND e.mobno =:MOBILENUMBER AND e.mobno IS NOT NULL','',22);
INSERT INTO "mastermap" VALUES(9,'','vmaster',NULL,'',3,NULL,'Wipe','normal',NULL,'--------','farm_erapp','','sql','SELECT a1.vmasterid, a1.villagename ,a2.areaname
FROM vmaster a1, amaster a2,empmaster e ,emparea ea  
WHERE a1.areaname = a2.amasterid AND e.empmasterid = ea.empmasterid AND ea.emparea1 = a2.amasterid AND ea.activeyn=''YES'' AND e.mobno= :MOBILENUMBER
ORDER BY 2','',9);


CREATE TABLE mastermapdetail (
	mastermapdetailid INTEGER NOT NULL, 
	moduleid INTEGER NOT NULL, 
	sfname VARCHAR(60) NOT NULL, 
	tfname VARCHAR(60) NOT NULL, 
	shortid INTEGER, 
	project_slug VARCHAR(60) NOT NULL, colmapid INTEGER, 
	PRIMARY KEY (mastermapdetailid), 
	FOREIGN KEY(moduleid) REFERENCES mastermap (moduleid)
);

INSERT INTO "mastermapdetail" VALUES(1,7,'branchmastid','branchmastid',NULL,'farm_erapp',123);
INSERT INTO "mastermapdetail" VALUES(2,7,'branchname','branchname',NULL,'farm_erapp',124);
INSERT INTO "mastermapdetail" VALUES(3,7,'branchid','branchid',NULL,'farm_erapp',135);
INSERT INTO "mastermapdetail" VALUES(4,8,'amasterid','amasterid',NULL,'farm_erapp',125);
INSERT INTO "mastermapdetail" VALUES(5,8,'areaname','areaname',NULL,'farm_erapp',126);
INSERT INTO "mastermapdetail" VALUES(43,41,'spraytype','spraytype',NULL,'farm_erapp',172);
INSERT INTO "mastermapdetail" VALUES(44,41,'fsstage','fsstage',NULL,'farm_erapp',173);
INSERT INTO "mastermapdetail" VALUES(45,41,'fstask','fstask',NULL,'farm_erapp',174);
INSERT INTO "mastermapdetail" VALUES(46,41,'todays','todays',NULL,'farm_erapp',175);
INSERT INTO "mastermapdetail" VALUES(47,41,'fromdays','fromdays',NULL,'farm_erapp',176);
INSERT INTO "mastermapdetail" VALUES(48,41,'spraydesc','spraydesc',NULL,'farm_erapp',177);
INSERT INTO "mastermapdetail" VALUES(49,41,'targetpest','targetpest',NULL,'farm_erapp',178);
INSERT INTO "mastermapdetail" VALUES(50,41,'qty','qty',NULL,'farm_erapp',179);
INSERT INTO "mastermapdetail" VALUES(51,41,'cost','cost',NULL,'farm_erapp',180);
INSERT INTO "mastermapdetail" VALUES(52,41,'dosage','dosage',NULL,'farm_erapp',181);
INSERT INTO "mastermapdetail" VALUES(53,41,'phi','phi',NULL,'farm_erapp',182);
INSERT INTO "mastermapdetail" VALUES(20,16,'cropcycleid','cropcycleid',NULL,'farm_erapp',108);
INSERT INTO "mastermapdetail" VALUES(21,16,'subgroupid','subgroupid',NULL,'farm_erapp',109);
INSERT INTO "mastermapdetail" VALUES(22,18,'cropplanid','cropplanid',NULL,'farm_erapp',112);
INSERT INTO "mastermapdetail" VALUES(23,18,'cspuid','cspuid',NULL,'farm_erapp',113);
INSERT INTO "mastermapdetail" VALUES(31,23,'crop','crop',NULL,'farm_erapp',148);
INSERT INTO "mastermapdetail" VALUES(32,23,'cropmasterid','cropmasterid',NULL,'farm_erapp',154);
INSERT INTO "mastermapdetail" VALUES(33,23,'cropscheme','cropscheme',NULL,'farm_erapp',165);
INSERT INTO "mastermapdetail" VALUES(12,13,'empmasterid','empmasterid',NULL,'farm_erapp',118);
INSERT INTO "mastermapdetail" VALUES(13,13,'EmployeeName','employeename',NULL,'farm_erapp',119);
INSERT INTO "mastermapdetail" VALUES(14,13,'Type','type',NULL,'farm_erapp',120);
INSERT INTO "mastermapdetail" VALUES(15,13,'SeqFrom','seqfrom',NULL,'farm_erapp',121);
INSERT INTO "mastermapdetail" VALUES(16,13,'SeqTo','seqto',NULL,'farm_erapp',122);
INSERT INTO "mastermapdetail" VALUES(17,13,'mobno','mobno',NULL,'farm_erapp',134);
INSERT INTO "mastermapdetail" VALUES(18,13,'branchid','branchid',NULL,'farm_erapp',136);
INSERT INTO "mastermapdetail" VALUES(19,13,'lagrno','lagrno',NULL,'farm_erapp',159);
INSERT INTO "mastermapdetail" VALUES(24,21,'empareaid','empareaid',NULL,'farm_erapp',140);
INSERT INTO "mastermapdetail" VALUES(25,21,'empmasterid','empmasterid',NULL,'farm_erapp',141);
INSERT INTO "mastermapdetail" VALUES(26,21,'emparea1','emparea1',NULL,'farm_erapp',142);
INSERT INTO "mastermapdetail" VALUES(40,28,'areapoint','areapoint',NULL,'farm_erapp',169);
INSERT INTO "mastermapdetail" VALUES(41,28,'ragid','ragid',NULL,'farm_erapp',170);
INSERT INTO "mastermapdetail" VALUES(42,28,'mapdata','mapdata',NULL,'farm_erapp',171);
INSERT INTO "mastermapdetail" VALUES(9,11,'itemmasterid','itemmasterid',NULL,'farm_erapp',129);
INSERT INTO "mastermapdetail" VALUES(10,11,'itemid','itemid',NULL,'farm_erapp',130);
INSERT INTO "mastermapdetail" VALUES(11,11,'subgroup','subgroup',NULL,'farm_erapp',150);
INSERT INTO "mastermapdetail" VALUES(27,22,'igdetailid','igdetailid',NULL,'farm_erapp',143);
INSERT INTO "mastermapdetail" VALUES(28,22,'subgroup','subgroup',NULL,'farm_erapp',144);
INSERT INTO "mastermapdetail" VALUES(29,22,'groupsidc','groupsidc',NULL,'farm_erapp',145);
INSERT INTO "mastermapdetail" VALUES(30,22,'subgroupid','subgroupid',NULL,'farm_erapp',146);
INSERT INTO "mastermapdetail" VALUES(6,9,'vmasterid','vmasterid',NULL,'farm_erapp',132);
INSERT INTO "mastermapdetail" VALUES(7,9,'villagename','villagename',NULL,'farm_erapp',133);
INSERT INTO "mastermapdetail" VALUES(8,9,'areaname','areaname',NULL,'farm_erapp',147);


CREATE TABLE mcontrol (
	mcontrolid INTEGER NOT NULL, 
	"key" VARCHAR(60) NOT NULL, 
	value VARCHAR(60) NOT NULL, 
	projectid BIGINT, 
	PRIMARY KEY (mcontrolid)
);
INSERT INTO "mcontrol" VALUES(1,'offlinesync','true',16);
INSERT INTO "mcontrol" VALUES(2,'globalsetup','false',16);
INSERT INTO "mcontrol" VALUES(3,'companysetup','false',16);



CREATE TABLE expnd (
	expndid INTEGER NOT NULL, 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), 
	PRIMARY KEY (expndid)
);
CREATE TABLE frmalert (
	frmalertid INTEGER NOT NULL, 
	crpstatus VARCHAR(10), 
	ragid VARCHAR(100), 
	imgalert VARCHAR(100), 
	remarks VARCHAR(250), 
	affecteddate DATE, 
	affectedarea VARCHAR(100), 
	alerttype VARCHAR(100), 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), 
	rcdyld INTEGER, 
	expyld INTEGER, 
	devper TEXT, 
	sowdt DATE, 
	ccstatus VARCHAR(100), mobno NUMBER, 
	PRIMARY KEY (frmalertid)
);
CREATE TABLE frmmast1 (
	frmmast1id INTEGER NOT NULL, 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), 
	lastcropcycle VARCHAR(10), 
	farmerno VARCHAR(255), 
	seqprefix VARCHAR(10), 
	sowingtype VARCHAR(20), 
	image3 VARCHAR(100), 
	image2 VARCHAR(100), 
	image1 VARCHAR(100), 
	adhaarno INTEGER, 
	areaname INTEGER, 
	sowingdate DATE, 
	farmername VARCHAR(100), 
	fathername VARCHAR(100), 
	mobno INTEGER, 
	village INTEGER, 
	cropname INTEGER, 
	cropscheme VARCHAR(200), 
	acres NUMERIC(10, 2), 
	agno VARCHAR(10), 
	mobileno INTEGER, 
	itemid INTEGER, 
	qty NUMERIC(20, 2), 
	branch INTEGER, 
	itemid2 INTEGER, 
	qty1 NUMERIC(20, 2), dynamicseq TEXT, 
	PRIMARY KEY (frmmast1id)
);
CREATE TABLE igdetail (
	igdetailid INTEGER NOT NULL, 
	subgroup VARCHAR(30), 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), groupsidc TEXT, subgroupid TEXT, 
	PRIMARY KEY (igdetailid)
);
CREATE TABLE irrm1 (
	irrm1id INTEGER NOT NULL, 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), wefdate NUMERIC, 
	PRIMARY KEY (irrm1id)
);
CREATE TABLE irrm2 (
	irrm2id INTEGER NOT NULL, 
	irrm1id INTEGER NOT NULL, 
	itemid VARCHAR(100), 
	PRIMARY KEY (irrm2id), 
	FOREIGN KEY(irrm1id) REFERENCES irrm1 (irrm1id)
);
CREATE TABLE itemmaster (
	itemmasterid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	itemid VARCHAR(100), 
	subgroup VARCHAR(100), 
	subgroupsid VARCHAR(100), 
	priunit VARCHAR(100), 
	itemtype VARCHAR(100), 
	activeyn VARCHAR(100), 
	PRIMARY KEY (itemmasterid)
);

CREATE TABLE payreqst (
	payreqstid INTEGER NOT NULL, 
	ragid VARCHAR(10), 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), amount NUMBER(20, 2), reqdt NUMERIC, 
	PRIMARY KEY (payreqstid)
);
CREATE TABLE prac (
	pracid INTEGER NOT NULL, 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), 
	PRIMARY KEY (pracid)
);
CREATE TABLE sprayactivity (
	sprayactivityid INTEGER NOT NULL, 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), 
	sprimg VARCHAR(100), 
	crpstatus VARCHAR(100), 
	ragid INTEGER, 
	remarks VARCHAR(100), 
	spraydate DATE, 
	sprayactivity VARCHAR(100), spstatus TEXT, 
	PRIMARY KEY (sprayactivityid)
);

CREATE TABLE vmaster (
	vmasterid INTEGER NOT NULL, 
	is_cancelled VARCHAR(100), 
	unique_id_field VARCHAR(70), 
	created_on DATETIME, 
	created_by VARCHAR(100), 
	modified_on DATETIME, 
	modified_by VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	post_tx_title VARCHAR(100), 
	userid VARCHAR(100), 
	projectid VARCHAR(100), 
	ipadd VARCHAR(100), 
	recid INTEGER, 
	versionid VARCHAR(100), 
	roleid VARCHAR(100), 
	objectid VARCHAR(100), 
	ll BLOB, 
	kms INTEGER, 
	district VARCHAR(120), 
	taluk VARCHAR(120), 
	hobli VARCHAR(120), 
	villagename VARCHAR(120), 
	areaname INTEGER, 
	branchid INTEGER, 
	areasid VARCHAR(100), 
	PRIMARY KEY (vmasterid)
);

CREATE TABLE viewsq (
	viewsqid INTEGER NOT NULL, 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), 
	PRIMARY KEY (viewsqid)
);


CREATE TABLE offlinemapstorage (
	offlinemapstorageid INTEGER NOT NULL, 
	latlong VARCHAR(500), 
	place VARCHAR(500), 
	objectid VARCHAR(100), 
	roleid VARCHAR(100), 
	versionid VARCHAR(100), 
	recid INTEGER, 
	ipadd VARCHAR(100), 
	projectid VARCHAR(100), 
	userid VARCHAR(100), 
	post_tx_title VARCHAR(100), 
	upstream_txview_ref_id INTEGER, 
	modified_by VARCHAR(100), 
	modified_on DATETIME, 
	created_by VARCHAR(100), 
	created_on DATETIME, 
	unique_id_field VARCHAR(70), 
	is_cancelled VARCHAR(100), 
	PRIMARY KEY (offlinemapstorageid)
);

