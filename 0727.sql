/*
 Navicat PostgreSQL Data Transfer

 Source Server         : boardgame
 Source Server Type    : PostgreSQL
 Source Server Version : 120003
 Source Host           : ec2-34-197-212-240.compute-1.amazonaws.com:5432
 Source Catalog        : d3vjn619ldeksl
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120003
 File Encoding         : 65001

 Date: 27/07/2020 11:02:16
*/

DROP TABLE IF EXISTS "public"."storeinformation";
DROP TABLE IF EXISTS "public"."orderdetail";
DROP TABLE IF EXISTS "public"."checkout";
DROP TABLE IF EXISTS "public"."topup";
DROP TABLE IF EXISTS "public"."calculatingtime";
DROP TABLE IF EXISTS "public"."staff";
DROP TABLE IF EXISTS "public"."food";
DROP TABLE IF EXISTS "public"."item";
DROP TABLE IF EXISTS "public"."member";
-- ----------------------------
-- Sequence structure for checkout_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."checkout_serno_seq";
CREATE SEQUENCE "public"."calculatingtime_timeserno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1000
CACHE 1;
-- ----------------------------
-- Sequence structure for calculatingtime_ser
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."calculatingtime_ser";
CREATE SEQUENCE "public"."calculatingtime_ser" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for checkout_ser
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."checkout_ser";
CREATE SEQUENCE "public"."checkout_ser" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for checkout_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."checkout_serno_seq";
CREATE SEQUENCE "public"."checkout_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1000
CACHE 1;

-- ----------------------------
-- Sequence structure for food_foodid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."food_foodid_seq";
CREATE SEQUENCE "public"."food_foodid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1000
CACHE 1;

-- ----------------------------
-- Sequence structure for food_ser
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."food_ser";
CREATE SEQUENCE "public"."food_ser" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for item_itemid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."item_itemid_seq";
CREATE SEQUENCE "public"."item_itemid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1000
CACHE 1;

-- ----------------------------
-- Sequence structure for item_ser
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."item_ser";
CREATE SEQUENCE "public"."item_ser" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;



-- ----------------------------
-- Sequence structure for orddetails_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orddetails_serno_seq";
CREATE SEQUENCE "public"."orddetails_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 3000
CACHE 1;

-- ----------------------------
-- Sequence structure for orderdetail_orderdetailid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orderdetail_orderdetailid_seq";
CREATE SEQUENCE "public"."orderdetail_orderdetailid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1000
CACHE 1;

-- ----------------------------
-- Sequence structure for orderdetailid_ser
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orderdetailid_ser";
CREATE SEQUENCE "public"."orderdetailid_ser" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for storeinformation_ser
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."storeinformation_ser";
CREATE SEQUENCE "public"."storeinformation_ser" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for storeinformation_storeid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."storeinformation_storeid_seq";
CREATE SEQUENCE "public"."storeinformation_storeid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1000
CACHE 1;

-- ----------------------------
-- Sequence structure for topup_ser
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."topup_ser";
CREATE SEQUENCE "public"."topup_ser" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for topup_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."topup_serno_seq";
CREATE SEQUENCE "public"."topup_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1000
CACHE 1;

-- ----------------------------
-- Table structure for calculatingtime
-- ----------------------------
DROP TABLE IF EXISTS "public"."calculatingtime";
CREATE TABLE "public"."calculatingtime" (
  "timeserNo" int4 NOT NULL DEFAULT nextval('calculatingtime_timeserno_seq'::regclass),
  "memberPhone" varchar(20) COLLATE "pg_catalog"."default",
  "arrivalTime" timestamp(6),
  "endTime" timestamp(6)
)
;
COMMENT ON COLUMN "public"."calculatingtime"."timeserNo" IS '到達結束時間流水號(自動遞增) (PK)';
COMMENT ON COLUMN "public"."calculatingtime"."memberPhone" IS '會員手機號碼(FK)';
COMMENT ON COLUMN "public"."calculatingtime"."arrivalTime" IS '到達時間';
COMMENT ON COLUMN "public"."calculatingtime"."endTime" IS '結束時間';

-- ----------------------------
-- Records of calculatingtime
-- ----------------------------
INSERT INTO "public"."calculatingtime" VALUES (1, '11111', '2020-03-30 16:00:00', '2020-03-30 20:00:00');
INSERT INTO "public"."calculatingtime" VALUES (2, '22222', '2020-03-30 15:00:00', '2020-03-30 22:31:20');
INSERT INTO "public"."calculatingtime" VALUES (3, '33333', '2020-03-30 18:37:52', '2020-03-30 22:20:07');

-- ----------------------------
-- Table structure for checkout
-- ----------------------------
DROP TABLE IF EXISTS "public"."checkout";
CREATE TABLE "public"."checkout" (
  "serNo" int4 NOT NULL DEFAULT nextval('checkout_serno_seq'::regclass),
  "staffPhone" varchar(20) COLLATE "pg_catalog"."default",
  "memberPhone" varchar(20) COLLATE "pg_catalog"."default",
  "totalPoint" int4,
  "billTime" timestamp(0)
)
;
COMMENT ON COLUMN "public"."checkout"."serNo" IS '結帳流水號(自動遞增)(PK)';
COMMENT ON COLUMN "public"."checkout"."staffPhone" IS '員工手機號碼(FK)';
COMMENT ON COLUMN "public"."checkout"."memberPhone" IS '會員手機號碼(FK)';
COMMENT ON COLUMN "public"."checkout"."totalPoint" IS '本次總花費點數';
COMMENT ON COLUMN "public"."checkout"."billTime" IS '結帳日期';

-- ----------------------------
-- Records of checkout
-- ----------------------------
INSERT INTO "public"."checkout" VALUES (1, '99999', '11111', NULL, '2020-03-31 22:25:59');
INSERT INTO "public"."checkout" VALUES (2, '88888', '22222', NULL, '2020-03-31 21:20:00');
INSERT INTO "public"."checkout" VALUES (3, '77777', '33333', NULL, '2020-03-31 22:57:10');
INSERT INTO "public"."checkout" VALUES (1000, '77777', '33333', NULL, '2020-07-08 14:58:26');

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS "public"."food";
CREATE TABLE "public"."food" (
  "foodid" int4 NOT NULL DEFAULT nextval('food_foodid_seq'::regclass),
  "itemID" int4,
  "foodName" varchar(255) COLLATE "pg_catalog"."default",
  "foodPoint" int4,
  "foodImg" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."food"."foodid" IS '餐點編號(PK) 自動遞增';
COMMENT ON COLUMN "public"."food"."itemID" IS '類別編號(FK)';
COMMENT ON COLUMN "public"."food"."foodName" IS '餐點名稱';
COMMENT ON COLUMN "public"."food"."foodPoint" IS '餐點點數';
COMMENT ON COLUMN "public"."food"."foodImg" IS '餐點圖片';

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO "public"."food" VALUES (1, 1, '雞汁泡麵', 60, '01.png');
INSERT INTO "public"."food" VALUES (2, 1, '肉燥泡麵', 60, '02.png');
INSERT INTO "public"."food" VALUES (6, 3, '奶酥厚片', 40, '06.png');
INSERT INTO "public"."food" VALUES (5, 3, '巧克力厚片', 40, '05.png');
INSERT INTO "public"."food" VALUES (4, 2, '炸薯條', 50, '04.png');
INSERT INTO "public"."food" VALUES (3, 2, '炸雞塊', 50, '03.png');
INSERT INTO "public"."food" VALUES (7, 4, '紅茶', 30, '07.png');
INSERT INTO "public"."food" VALUES (8, 4, '奶茶', 30, '');

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS "public"."item";
CREATE TABLE "public"."item" (
  "itemID" int4 NOT NULL DEFAULT nextval('item_itemid_seq'::regclass),
  "itemName" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
COMMENT ON COLUMN "public"."item"."itemID" IS '類別編號(PK)';
COMMENT ON COLUMN "public"."item"."itemName" IS '類別名稱';

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO "public"."item" VALUES (1, '熟食');
INSERT INTO "public"."item" VALUES (2, '炸物');
INSERT INTO "public"."item" VALUES (3, '厚片');
INSERT INTO "public"."item" VALUES (4, '飲料');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS "public"."member";
CREATE TABLE "public"."member" (
  "memberphone" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "membername" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "lineid" varchar(30) COLLATE "pg_catalog"."default",
  "gender" varchar(1) COLLATE "pg_catalog"."default",
  "mail" varchar(50) COLLATE "pg_catalog"."default",
  "birthday" date,
  "points" int4,
  "creationdate" date
)
;
COMMENT ON COLUMN "public"."member"."memberphone" IS '會員手機號碼(PK)';
COMMENT ON COLUMN "public"."member"."membername" IS '會員姓名';
COMMENT ON COLUMN "public"."member"."lineid" IS 'LINE ID';
COMMENT ON COLUMN "public"."member"."gender" IS '性別
(男=＂M＂女＝＂F＂)';
COMMENT ON COLUMN "public"."member"."mail" IS '電子信箱';
COMMENT ON COLUMN "public"."member"."birthday" IS '出生日期';
COMMENT ON COLUMN "public"."member"."points" IS '剩餘點數 ';
COMMENT ON COLUMN "public"."member"."creationdate" IS '建立日期';

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO "public"."member" VALUES ('11111', '陳小潔', '11111', 'F', 'aa@gmail.com', '1998-09-06', 0, '2020-03-31');
INSERT INTO "public"."member" VALUES ('33333', '林小容', '33333', 'F', 'cc@gmail.com', '1999-11-29', 100, '2020-03-30');
INSERT INTO "public"."member" VALUES ('22222', '周小德', '22222', 'M', 'bbb@gmail.com', '1998-03-10', 10, '2020-06-24');
INSERT INTO "public"."member" VALUES ('55555', '123', '55555', NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for orderdetail
-- ----------------------------
DROP TABLE IF EXISTS "public"."orderdetail";
CREATE TABLE "public"."orderdetail" (
  "orderdetailid" int4 NOT NULL DEFAULT nextval('orderdetail_orderdetailid_seq'::regclass),
  "foodid" int4 NOT NULL,
  "foodno" int4 NOT NULL,
  "customized" varchar(50) COLLATE "pg_catalog"."default",
  "memberPhone" varchar(20) COLLATE "pg_catalog"."default",
  "staffPhone" varchar(20) COLLATE "pg_catalog"."default",
  "tableNo" int4,
  "total" int4,
  "confirm" char(1) COLLATE "pg_catalog"."default",
  "ordtime" timestamp(0)
)
;
COMMENT ON COLUMN "public"."orderdetail"."orderdetailid" IS '訂單明細編號(PK) 自動遞增';
COMMENT ON COLUMN "public"."orderdetail"."foodid" IS '餐點編號(FK)';
COMMENT ON COLUMN "public"."orderdetail"."foodno" IS '數量';
COMMENT ON COLUMN "public"."orderdetail"."customized" IS '客製化';
COMMENT ON COLUMN "public"."orderdetail"."memberPhone" IS '會員手機號碼(FK)';
COMMENT ON COLUMN "public"."orderdetail"."staffPhone" IS '員工手機號碼(FK)';
COMMENT ON COLUMN "public"."orderdetail"."tableNo" IS '桌號';
COMMENT ON COLUMN "public"."orderdetail"."total" IS '合計';
COMMENT ON COLUMN "public"."orderdetail"."confirm" IS '(是=＂是＂否=＂否＂)';
COMMENT ON COLUMN "public"."orderdetail"."ordtime" IS '建立日期與時間';

-- ----------------------------
-- Records of orderdetail
-- ----------------------------
INSERT INTO "public"."orderdetail" VALUES (3, 7, 1, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (4, 5, 1, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (1000, 5, 1, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (1001, 5, 1, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (10, 2, 2, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (1002, 3, 3, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (1, 1, 2, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (2, 2, 2, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (11, 3, 3, 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."orderdetail" VALUES (12, 2, 6, '肉', NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS "public"."staff";
CREATE TABLE "public"."staff" (
  "staffPhone" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "userName" varchar(30) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "nickName" varchar(20) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."staff"."staffPhone" IS '員工手機號碼(PK)';
COMMENT ON COLUMN "public"."staff"."userName" IS '店員姓名';
COMMENT ON COLUMN "public"."staff"."password" IS '密碼';
COMMENT ON COLUMN "public"."staff"."nickName" IS '暱稱';

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO "public"."staff" VALUES ('99999', '林小宏', '99999', 'Tom');
INSERT INTO "public"."staff" VALUES ('88888', '黃小彥', '88888', '彥彥');
INSERT INTO "public"."staff" VALUES ('77777', '蘇小興', '77777', '蘇蘇');
INSERT INTO "public"."staff" VALUES ('2', 'fkr', '31', '3');
INSERT INTO "public"."staff" VALUES ('0982222222', 'ddd', 'd', '908276');

-- ----------------------------
-- Table structure for storeinformation
-- ----------------------------
DROP TABLE IF EXISTS "public"."storeinformation";
CREATE TABLE "public"."storeinformation" (
  "storeID" int4 NOT NULL DEFAULT nextval('storeinformation_storeid_seq'::regclass),
  "storeName" varchar(255) COLLATE "pg_catalog"."default",
  "storeAddress" varchar(50) COLLATE "pg_catalog"."default",
  "phoneNo" varchar(30) COLLATE "pg_catalog"."default",
  "vacantTable" int4,
  "businessHours" varchar(30) COLLATE "pg_catalog"."default",
  "wifi" varchar(1) COLLATE "pg_catalog"."default",
  "socket" varchar(1) COLLATE "pg_catalog"."default",
  "provideMeals" varchar(1) COLLATE "pg_catalog"."default",
  "outsideFood" varchar(1) COLLATE "pg_catalog"."default",
  "chargingStandards" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."storeinformation"."storeID" IS '店家編號(PK)自動遞增';
COMMENT ON COLUMN "public"."storeinformation"."storeName" IS '店家名稱';
COMMENT ON COLUMN "public"."storeinformation"."storeAddress" IS '店家地址';
COMMENT ON COLUMN "public"."storeinformation"."phoneNo" IS '聯絡電話';
COMMENT ON COLUMN "public"."storeinformation"."vacantTable" IS '空桌數量';
COMMENT ON COLUMN "public"."storeinformation"."businessHours" IS '營業時間';
COMMENT ON COLUMN "public"."storeinformation"."wifi" IS '是否提供wifi
(是=＂Y＂否=＂N＂)';
COMMENT ON COLUMN "public"."storeinformation"."socket" IS '是否提供插座
(是=＂Y＂否=＂N＂)';
COMMENT ON COLUMN "public"."storeinformation"."provideMeals" IS '是否提供餐點
(是=＂Y＂否=＂N＂)';
COMMENT ON COLUMN "public"."storeinformation"."outsideFood" IS '可否帶外食
(是=＂Y＂否=＂N＂)';
COMMENT ON COLUMN "public"."storeinformation"."chargingStandards" IS '收費標準';

-- ----------------------------
-- Records of storeinformation
-- ----------------------------
INSERT INTO "public"."storeinformation" VALUES (1, '夢桌遊一號店', '台北市松江路69巷', '123455', 5, '14:00-23:00', 'Y', 'Y', 'Y', 'Y', '一小時150包日300');
INSERT INTO "public"."storeinformation" VALUES (2, '夢桌遊二號店', '新北市中和區連勝街', '2223435', 7, '14:30-22:00', 'Y', 'Y', 'Y', 'Ｎ', NULL);

-- ----------------------------
-- Table structure for topup
-- ----------------------------
DROP TABLE IF EXISTS "public"."topup";
CREATE TABLE "public"."topup" (
  "serNo" int4 NOT NULL DEFAULT nextval('topup_serno_seq'::regclass),
  "memberPhone" varchar(20) COLLATE "pg_catalog"."default",
  "staffPhone" varchar(20) COLLATE "pg_catalog"."default",
  "topup" int4,
  "topupPoints" int4,
  "topupTime" timestamp(0)
)
;
COMMENT ON COLUMN "public"."topup"."serNo" IS '儲值流水號(自動遞增) (PK)';
COMMENT ON COLUMN "public"."topup"."memberPhone" IS '會員手機號碼(FK)';
COMMENT ON COLUMN "public"."topup"."staffPhone" IS '員工手機號碼(FK)';
COMMENT ON COLUMN "public"."topup"."topup" IS '本次儲值金額';
COMMENT ON COLUMN "public"."topup"."topupPoints" IS '本次儲值點數';
COMMENT ON COLUMN "public"."topup"."topupTime" IS '建立日期';

-- ----------------------------
-- Records of topup
-- ----------------------------
INSERT INTO "public"."topup" VALUES (1, '11111', '99999', 100, 100, '2020-03-31 16:00:00');
INSERT INTO "public"."topup" VALUES (2, '22222', '99999', 200, 200, '2020-03-31 18:59:00');
INSERT INTO "public"."topup" VALUES (3, '33333', '88888', 500, 600, '2020-03-31 21:00:00');
INSERT INTO "public"."topup" VALUES (4, '33333', '99999', 4, 5, '2020-06-29 11:36:00');
INSERT INTO "public"."topup" VALUES (5, '33333', '99999', 600, 600, '2020-06-29 11:52:00');
INSERT INTO "public"."topup" VALUES (6, '33333', '99999', 1000, 1000, '2020-06-29 11:57:00');
INSERT INTO "public"."topup" VALUES (7, '33333', '99999', 1200, 1200, '2020-06-29 11:58:00');
INSERT INTO "public"."topup" VALUES (8, '33333', '99999', 1300, 1300, '2020-07-01 11:26:00');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."calculatingtime_ser"
OWNED BY "public"."calculatingtime"."timeserNo";
SELECT setval('"public"."calculatingtime_ser"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."checkout_ser"
OWNED BY "public"."checkout"."serNo";
SELECT setval('"public"."checkout_ser"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."checkout_serno_seq"', 1002, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."food_foodid_seq"', 1001, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."food_ser"
OWNED BY "public"."food"."foodid";
SELECT setval('"public"."food_ser"', 11, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."item_itemid_seq"', 1001, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."item_ser"
OWNED BY "public"."item"."itemID";
SELECT setval('"public"."item_ser"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."ord_orderid_seq"', 1001, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."orddetails_serno_seq"', 3003, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."orderdetail_orderdetailid_seq"', 1003, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."orderdetailid_ser"
OWNED BY "public"."orderdetail"."orderdetailid";
SELECT setval('"public"."orderdetailid_ser"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."storeinformation_ser"
OWNED BY "public"."storeinformation"."storeID";
SELECT setval('"public"."storeinformation_ser"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."storeinformation_storeid_seq"', 1001, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."topup_ser"
OWNED BY "public"."topup"."serNo";
SELECT setval('"public"."topup_ser"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."topup_serno_seq"', 1001, false);

-- ----------------------------
-- Primary Key structure for table calculatingtime
-- ----------------------------
ALTER TABLE "public"."calculatingtime" ADD CONSTRAINT "calculatingtime_pkey" PRIMARY KEY ("timeserNo");

-- ----------------------------
-- Primary Key structure for table checkout
-- ----------------------------
ALTER TABLE "public"."checkout" ADD CONSTRAINT "Checkout_pkey" PRIMARY KEY ("serNo");

-- ----------------------------
-- Primary Key structure for table food
-- ----------------------------
ALTER TABLE "public"."food" ADD CONSTRAINT "food_pkey" PRIMARY KEY ("foodid");

-- ----------------------------
-- Primary Key structure for table item
-- ----------------------------
ALTER TABLE "public"."item" ADD CONSTRAINT "item_pkey" PRIMARY KEY ("itemID");

-- ----------------------------
-- Primary Key structure for table member
-- ----------------------------
ALTER TABLE "public"."member" ADD CONSTRAINT "member1_pkey" PRIMARY KEY ("memberphone");

-- ----------------------------
-- Primary Key structure for table orderdetail
-- ----------------------------
ALTER TABLE "public"."orderdetail" ADD CONSTRAINT "orderdetail_pkey" PRIMARY KEY ("orderdetailid");

-- ----------------------------
-- Primary Key structure for table staff
-- ----------------------------
ALTER TABLE "public"."staff" ADD CONSTRAINT "staff_pkey" PRIMARY KEY ("staffPhone");

-- ----------------------------
-- Primary Key structure for table storeinformation
-- ----------------------------
ALTER TABLE "public"."storeinformation" ADD CONSTRAINT "storeinformation_pkey" PRIMARY KEY ("storeID");

-- ----------------------------
-- Primary Key structure for table topup
-- ----------------------------
ALTER TABLE "public"."topup" ADD CONSTRAINT "topup_pkey" PRIMARY KEY ("serNo");

-- ----------------------------
-- Foreign Keys structure for table calculatingtime
-- ----------------------------
ALTER TABLE "public"."calculatingtime" ADD CONSTRAINT "memberPhone" FOREIGN KEY ("memberPhone") REFERENCES "public"."member" ("memberphone") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table checkout
-- ----------------------------
ALTER TABLE "public"."checkout" ADD CONSTRAINT "memberPhone" FOREIGN KEY ("memberPhone") REFERENCES "public"."member" ("memberphone") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."checkout" ADD CONSTRAINT "staffPhone" FOREIGN KEY ("staffPhone") REFERENCES "public"."staff" ("staffPhone") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table food
-- ----------------------------
ALTER TABLE "public"."food" ADD CONSTRAINT "itemID" FOREIGN KEY ("itemID") REFERENCES "public"."item" ("itemID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table orderdetail
-- ----------------------------
ALTER TABLE "public"."orderdetail" ADD CONSTRAINT "foodid" FOREIGN KEY ("foodid") REFERENCES "public"."food" ("foodid") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."orderdetail" ADD CONSTRAINT "memberPhone" FOREIGN KEY ("memberPhone") REFERENCES "public"."member" ("memberphone") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."orderdetail" ADD CONSTRAINT "staffPhone" FOREIGN KEY ("staffPhone") REFERENCES "public"."staff" ("staffPhone") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table topup
-- ----------------------------
ALTER TABLE "public"."topup" ADD CONSTRAINT "memberPhone" FOREIGN KEY ("memberPhone") REFERENCES "public"."member" ("memberphone") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."topup" ADD CONSTRAINT "staffPhone" FOREIGN KEY ("staffPhone") REFERENCES "public"."staff" ("staffPhone") ON DELETE NO ACTION ON UPDATE NO ACTION;
