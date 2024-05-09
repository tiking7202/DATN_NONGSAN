PGDMP                      |            Nongsan    16.2    16.2 /    Q           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            R           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            S           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            T           1262    32876    Nongsan    DATABASE     �   CREATE DATABASE "Nongsan" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1258';
    DROP DATABASE "Nongsan";
                postgres    false                        3079    32877 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            U           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    32947    Order    TABLE       CREATE TABLE public."Order" (
    orderid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    totalamount numeric,
    estimatedelivery date,
    shippingaddress text,
    orderstatus character varying(20),
    ordertime timestamp without time zone,
    userid uuid
);
    DROP TABLE public."Order";
       public         heap    postgres    false    2            �            1259    32900    User    TABLE     6  CREATE TABLE public."User" (
    userid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    fullname character varying(100) NOT NULL,
    street character varying(255),
    commune character varying(255),
    district character varying(255),
    province character varying(255),
    phonenumber character varying(15),
    indentitycard character varying(255),
    status boolean,
    role character varying(20),
    avatar text
);
    DROP TABLE public."User";
       public         heap    postgres    false    2            �            1259    32888    admin    TABLE       CREATE TABLE public.admin (
    adminid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    fullname character varying(100) NOT NULL
);
    DROP TABLE public.admin;
       public         heap    postgres    false    2            �            1259    32941    cart    TABLE     ~   CREATE TABLE public.cart (
    cartid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    userid uuid,
    productid uuid
);
    DROP TABLE public.cart;
       public         heap    postgres    false    2            �            1259    32925    category    TABLE     �   CREATE TABLE public.category (
    categoryid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    userid uuid,
    categoryname character varying(100) NOT NULL,
    categoryimage text,
    categorydes text
);
    DROP TABLE public.category;
       public         heap    postgres    false    2            �            1259    32920    crop    TABLE       CREATE TABLE public.crop (
    farmid uuid,
    productid uuid,
    cropname character varying(100) NOT NULL,
    cropdes text,
    plantarea numeric,
    harvestdate date,
    estimatedyield numeric,
    cropstatus character varying(20),
    plantdate date
);
    DROP TABLE public.crop;
       public         heap    postgres    false            �            1259    32912    farm    TABLE     �  CREATE TABLE public.farm (
    farmid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    userid uuid,
    farmname character varying(100) NOT NULL,
    farmstreet character varying(255),
    farmcommune character varying(255),
    farmdistrict character varying(255),
    farmprovince character varying(255),
    farmdes text,
    farmimage text,
    farmarea numeric,
    farmtype character varying(255),
    farmlogo text
);
    DROP TABLE public.farm;
       public         heap    postgres    false    2            �            1259    32982    message    TABLE     �   CREATE TABLE public.message (
    messageid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    senderid uuid,
    receiverid uuid,
    content text,
    date timestamp without time zone,
    status boolean
);
    DROP TABLE public.message;
       public         heap    postgres    false    2            �            1259    32955 	   orderitem    TABLE     d   CREATE TABLE public.orderitem (
    orderid uuid,
    productid uuid,
    quantityofitem integer
);
    DROP TABLE public.orderitem;
       public         heap    postgres    false            �            1259    32958    payment    TABLE     ?  CREATE TABLE public.payment (
    paymentid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    orderid uuid,
    userid uuid,
    paymentmethod character varying(50),
    transactionid character varying(100),
    amount numeric,
    paymenttime timestamp without time zone,
    paymentstatus character varying(20)
);
    DROP TABLE public.payment;
       public         heap    postgres    false    2            �            1259    32933    product    TABLE     �  CREATE TABLE public.product (
    productid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    farmerid uuid,
    categoryid uuid,
    productname character varying(100) NOT NULL,
    productimage1 text,
    productimage2 text,
    productimage3 text,
    healtbenefit text,
    storagemethod text,
    cookingmethod text,
    overviewdes text,
    productprice numeric,
    productquantity integer,
    expirydate date
);
    DROP TABLE public.product;
       public         heap    postgres    false    2            �            1259    32974    purchaseshistory    TABLE     !  CREATE TABLE public.purchaseshistory (
    purchasehistoryid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    orderid uuid,
    userid uuid,
    productid uuid,
    paymentid uuid,
    quantitypurchased integer,
    purchasedate timestamp without time zone,
    totalamount numeric
);
 $   DROP TABLE public.purchaseshistory;
       public         heap    postgres    false    2            �            1259    32966    review    TABLE     �   CREATE TABLE public.review (
    reviewid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    productid uuid,
    userid uuid,
    rating integer,
    comment text,
    reviewtime timestamp without time zone
);
    DROP TABLE public.review;
       public         heap    postgres    false    2            I          0    32947    Order 
   TABLE DATA           z   COPY public."Order" (orderid, totalamount, estimatedelivery, shippingaddress, orderstatus, ordertime, userid) FROM stdin;
    public          postgres    false    223   �:       C          0    32900    User 
   TABLE DATA           �   COPY public."User" (userid, username, email, password, fullname, street, commune, district, province, phonenumber, indentitycard, status, role, avatar) FROM stdin;
    public          postgres    false    217   �;       B          0    32888    admin 
   TABLE DATA           M   COPY public.admin (adminid, email, username, password, fullname) FROM stdin;
    public          postgres    false    216   �=       H          0    32941    cart 
   TABLE DATA           9   COPY public.cart (cartid, userid, productid) FROM stdin;
    public          postgres    false    222   z>       F          0    32925    category 
   TABLE DATA           `   COPY public.category (categoryid, userid, categoryname, categoryimage, categorydes) FROM stdin;
    public          postgres    false    220   U?       E          0    32920    crop 
   TABLE DATA           �   COPY public.crop (farmid, productid, cropname, cropdes, plantarea, harvestdate, estimatedyield, cropstatus, plantdate) FROM stdin;
    public          postgres    false    219    C       D          0    32912    farm 
   TABLE DATA           �   COPY public.farm (farmid, userid, farmname, farmstreet, farmcommune, farmdistrict, farmprovince, farmdes, farmimage, farmarea, farmtype, farmlogo) FROM stdin;
    public          postgres    false    218   �C       N          0    32982    message 
   TABLE DATA           Y   COPY public.message (messageid, senderid, receiverid, content, date, status) FROM stdin;
    public          postgres    false    228   �E       J          0    32955 	   orderitem 
   TABLE DATA           G   COPY public.orderitem (orderid, productid, quantityofitem) FROM stdin;
    public          postgres    false    224   PF       K          0    32958    payment 
   TABLE DATA              COPY public.payment (paymentid, orderid, userid, paymentmethod, transactionid, amount, paymenttime, paymentstatus) FROM stdin;
    public          postgres    false    225   �F       G          0    32933    product 
   TABLE DATA           �   COPY public.product (productid, farmerid, categoryid, productname, productimage1, productimage2, productimage3, healtbenefit, storagemethod, cookingmethod, overviewdes, productprice, productquantity, expirydate) FROM stdin;
    public          postgres    false    221   �G       M          0    32974    purchaseshistory 
   TABLE DATA           �   COPY public.purchaseshistory (purchasehistoryid, orderid, userid, productid, paymentid, quantitypurchased, purchasedate, totalamount) FROM stdin;
    public          postgres    false    227   tR       L          0    32966    review 
   TABLE DATA           Z   COPY public.review (reviewid, productid, userid, rating, comment, reviewtime) FROM stdin;
    public          postgres    false    226   zS       �           2606    32954    Order Order_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (orderid);
 >   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pkey";
       public            postgres    false    223            �           2606    32911    User User_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);
 A   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_email_key";
       public            postgres    false    217            �           2606    32907    User User_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (userid);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    217            �           2606    32909    User User_username_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_username_key" UNIQUE (username);
 D   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_username_key";
       public            postgres    false    217            �           2606    32897    admin admin_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_email_key;
       public            postgres    false    216            �           2606    32895    admin admin_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (adminid);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    216            �           2606    32899    admin admin_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_username_key;
       public            postgres    false    216            �           2606    32946    cart cart_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cartid);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    222            �           2606    32932    category category_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (categoryid);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    220            �           2606    32919    farm farm_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.farm
    ADD CONSTRAINT farm_pkey PRIMARY KEY (farmid);
 8   ALTER TABLE ONLY public.farm DROP CONSTRAINT farm_pkey;
       public            postgres    false    218            �           2606    32989    message message_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (messageid);
 >   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pkey;
       public            postgres    false    228            �           2606    32965    payment payment_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (paymentid);
 >   ALTER TABLE ONLY public.payment DROP CONSTRAINT payment_pkey;
       public            postgres    false    225            �           2606    32940    product product_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (productid);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    221            �           2606    32981 &   purchaseshistory purchaseshistory_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public.purchaseshistory
    ADD CONSTRAINT purchaseshistory_pkey PRIMARY KEY (purchasehistoryid);
 P   ALTER TABLE ONLY public.purchaseshistory DROP CONSTRAINT purchaseshistory_pkey;
       public            postgres    false    227            �           2606    32973    review review_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (reviewid);
 <   ALTER TABLE ONLY public.review DROP CONSTRAINT review_pkey;
       public            postgres    false    226            I   �   x�͏1N1E��S� ;�=3��RDф��f�	���"Q��\q:��"܄��4O��ד^(X8pV!`��^4�!��Y;Gl���"�ep����~0w��}4��^�fz=�~z�=�O�����\����\�:��̍�ϗ��{���&�������z�$���8K�A�3V�	|�rr9U*��Sۊ��%�V ��gP-H)��h�W�â��o�p      C   �  x���]o�0���_�EnͰ��KU�EIi���͋q	%|�@��׏�k��4i�.����:�#+麞�	(��YA���v�3&!�(����}��d;[WSg���pX�"j֛��?��yW���l΃���]-���a�Ou�~����C��f`���AG+�z��*SkZ
 �Bȑ��b�_9BP�:��A-�ݾ�
Ӡ��Q�%V��%@�"\c�i,%�����i�ۜ�W(�����ܬ�C��8������;+}�ۘ���]��x;��n7��i���8� B]+jcZk��VEѕ�WA�o�L��US�R���2�Bz
̓A"�����NG,�Z7����`s���@b�\�(�6�3E�����4@�4)O
�\Jz�A����^�����?�+(z0j0(��\j�H���tn�]��є���5'[]t�m��>��ƽ�$[�mWi+ �7e�@�CY���h����      B   �   x�K474J27L�57���51I3׵HL1�5JM345KL1L2L�LL���3tH�H�-�I�K�υ
q�%��dꙦ�G�DEyf�GzVf�x�e�$W���f���Y�8�Z����[�;9�r��P�vt����\�Ffi)���&I�&��ɺ�F)��f)i)�&�[�0bD�C��K+�n�S�8������
G&<ܵ>谝y�\1z\\\ �ca�      H   �   x����� �k.s�"����a�����c���b���L���u���Xakcn]ࠂ۞M�V��G}K���#4w����zs�g��ƾ��?LV�w:�|䝇e��gDr�������n����G*F�9�XVJ�k�?���L)��x�Wׯ���H���N����}�#�{��$(f��Ν�~Zku�q�      F   �  x���Oo�D��ɧ���Ğ?���J	��8q���!�C�T�́�j%*N!*�ZV�]�R|t���o�;næ4�=t/N4�����<�k�ɜ��F1�Rcm4���0���Ȇ�8M-��̸b�8'�tVp�x�}���!۷�FE�,V�O��\z�W~��K��I^����E���z>=N�f�徜��z�X-�f�YO�t��zy��p�ד/�z�<�{W�w��+_=��
���b�l���6c	Ki�����E���\Ѫo_�����D����j�G��@M߾@��XTu��5�~{?/���}��tT���4�|ٷ��;C���.�l`��t�g�O�=�#�z2f$Õ�ԥ3I�-NMS.c\ޏ��e�l���ãn����� n� Be�(f�dNa�$g�+�]=.b��DxE�>����#��}���o�6�ӝ�����YS�u�g�q|����Fx�?>;�����E^vg뛎L�D�,M�Y�AyPk������JP��=�CQO�+a�:��-xP��AJ*�1���m������,��ɭ�_��'Zp|O���s|U O�F�kp��#)������z2V@.�`0X���1���"X/���L�Q�yx�V��4ڤX�$
2 ���r�K��H�i7���*�;���6���>�����Y��u��P!h�����x�p�&4�	�F�	�jA�S��������Ƭ�lf�O(�@�1c�c�9�������&w��9�w�f�d�0��L{[\�iպ{]ƙ�;�UC������@�6E)�,�_�}>��&#�`*�-�46�g��G�&ƧV���p�}���BKoϫ���i���A/�v.��`�h�Y*V�l��V����C����F�&�7W���`��1������i(�����ڭ~��N���V��1��T�y�W��4|�A�⦊����x<�y͒C      E   �   x�m�=n�0�Y>�/@C�O$�)���)Z��8P���e 
py�?ԸeLP8
0m�A��*'^K�`	1Ze�����g���K��4[���>��=���������YK\0`D��S=��>����u��g6"V������d~XmU�.MB�O�\�,S��ZG�N��q�,�C��X���xn�Z$|�>�i�~d�K�      D   }  x���=n�0�k�j���c��,� q���4Cr�0��1�:��r���o�6@)\�޼���rD5ZM;aU�z
R1�pT�Vr��r��N:*�gTtЖS܈Qr`�	q�o ���{}��c��T�]��X���q$�6�����>��Ys�5_��	d�%&���b�Nkȍ�s��ZӞ�	�|�a]��.���J������:��S���x]��k�r�ڳ�RŅ� )��B9=x	g�������BNq�{Te��\���߬�>�vG�1&�����}؎�|��tw�pW6�����8�����K
���)Ň�X|�xy��Y�L{͹�T)���B��輱���`#�n$�z�;�=���TU�,��>      N   �   x���AN1 ��W�{]9���{�
��	�(DBE��S>�zifrM����"A�$B�ƥO9�+�z*@�tV�j}rENV=�����Af�@|��]@�W6���Ӹ\�!��wl�#���ǐ1ܔ�1���H�T4�M�%%#�v���,
;���0����x��=���x=�����
���q۶_�/R�      J   e   x��̱�0E�������vIc!��h�4����%�
�O��Bl
�G3S?�󪊴���O�{
���}��\��^�lk�"I7tM���e�(���x|�1�y�'F      K   �   x���;n1E�Z��� ��Gt/!)��CA 3��3KH��[����UV��,M��ey��M�fJ6i��nZ��J]�JXU%��R��ܵB������b�=w�2#=��_��ю�2��raDL�Ā�|�r/~'�U4���ƈ��4g�>�.4����VHE��G
���6�>+��	n�_)1�x7��y���{�8��\q$��*\(�C�y۶�,�Xp      G   �
  x��ZKo��^�~���E���~�X��E�E�\^�C�3�t�#X��^Ej�B�X��6"X��YdAW�c��zν���QȀ�ڀ-��<���0��jS_Suj2�S_7��Y^�Q�z<�������,Ϥ~���c�j�F�3�H��S�7��2�|f�(t�(p|;����┼��r���xzmw7J&�Ϧ�4�&l�Y6�l�L�<��.�����x:�rq3���$f<���K?	2������l�0
���$�n��!���S��5jF��o��v�ؚ骪�V��7�cZ�g�ܤ�3A���k�6�������rߊ8�f��&w���U���r@ǢQ���4#�Cp$�ь�x9��;�d�8�~�4&���rq�H_���$g�$%*dOgo�Y���gĩ�l����CR<퓽���>�'O��1'�ߓq�,�8�ٝ���99'9\��b��dX����Ɉ���� �h9�%5��"����X1�9�կ�����<���'��~�d�x�$@/O|A�q�-�d��r�e��ҾH�� �W3G���q� ���nxq6"��3PW���\|M�x8~��)�
=V��/>L
A�I�-��q|d~:����8���O�u.p����L�FY�ш���q+�e����<%S6d��=��`h���_]�M����v<�4T˲idC���RߌiaZĵH�B����o~����_ynr����f�2-���Q0��u��#���ZdGoM�����5ߦ����YD�Y�qT�֬�����Dڌb�jD��h�s��xw� ���E*3�P�ޞ�����HU��r�u
�
x�}ބ��B�됝a�8�dy���� i�4mE�&�s��?�� �z��؟�`)쓛�4J����po~B�Ww��8�~����̩@1�JFᐥ	$�����@X����1 ͟ҕ�Ma9@��ȋ�k�\<��i�I� W�B!)�\�q!��}�4��w��Z�s�� a���h��T�!�I'ͺ0�Iz#r�28Pb��8i��5�MZ�$JS	�:����
\�ĳ��	�5, f�b��\����������@ݻp��
�aL�sN�A���~�J�
��J7�%��H@Sg����A�*Kc�e�IU3�) r�,'~���Čݼ*���u��:���/�6�rQF�%�ԃ�BaT�B���#��V�)W���M�Z�ai�0վ�Z1*�	a�������+�&���E,�gEj��@���[���9}�I6,�F�� �]#/�6p�����5ȅ��ϊ���Y<�X���i.O /�vpt�i#p�~����)�`�~�L��,"XTP�U[��E���A: v�^.�.�@���Lt�]&ixy�"�!�J��)_���ΰ��K�j�@]@�P����
�`Q�`��I�����_�����tjr�� vM�k�"�B�~&;v�N��IW�Uѩ��2(^��V�lv ��T���q���gZ�V��VE�ι����~0��
�e�A���d��h��`#����F1L�T�pY�d�B9�E
��N�*)����u&x�b�$+����p��]Ǥ�b���y*@?�! �@�)m
"��܏f��sb�z��`o*DlV�RO<� 8�](�S���F"�7��]Z!C�"b��6���_װ!R�v���(!�f=���e �~Y����Ce�죢�M��"4�����������1�O��+/A'q?�����f��L�1��?�h�+k:\���tX!s<��T5,��|A+aq�����$��*7j7�%�V����VQߋ�M��V�t0�h&|&740n�Y|LX�8T��}9��Bnn8��9��4Xk�&sb5���z-�^���r7���Y�����DE&X��*�*�[k�(��T�X�Mk�r��K�t_m���
l���"_��\��C��r������r�Y(�&(U�*^�m���߳-��jgsK�#���n�yL�C=�p@<���M0ڻ�0��y=�Yc�~��c�1���J����J�"«���|�.ƛ��
�P\o���P-7֛�(��.���T�X����� ��ʽ�,+���r��	(W��܁���f���,�1��C���P�����U~���'�9���/ޯ5��đ����E�y}��2���I�!��1�1�����LvH�{⍛�%z�[����>��8a8!=J$���j�9	�$�4�+��q9�tv��][���QNE�"ۛv+ 3
F�o�r���E��Ն���i�ͪ�~i&[_���P�;���M�a@�jԳXHM]w<],J�(>�8c�T�9��8�����sU�W��j1�&_f����Plm;*�y�/ ���9/Js�ڼ��(W}b ���R��<�f�� ��S�+4؀��R��w�����L�b][]����Z��g�;�}�M����=������E�z�Э�6���!u5P���\Xx\c����q���_|mͻ����&z�.ʷf8����Pi��������)#�z�QaK��u�4��E��Z5ԧ����85�r���h�6+ -�w���	bU������X�
��_]��,18x�tWw>�����)z"      M   �   x����m0�����T�W���I��f�J�'d��� �dF�ǚ ��+�(�X��,i�4�'���|�����1�B�ؗ�]�p][bV\>w�tݎ5��]m(�|N�'�;���t1X��B�^p���i�&�9I ������o�)�c� �G9r�&�I���Ø��D{'���GoK�:} ����8j��\�0������SI�K��b{Ϟ�f�v��|3�<0�n�*����|� ��k�      L   �   x���Aj�0E��)�h�-ɖf?��ز��-����tUx����Sm1a�@#�AE�*V��L��l�m��Q�C`�S%��\�Ҩ(�4���U�i�8=Qzݽ���9��xIe+ۉ����W����`$�� �� �P�:���L�t{����q������{�,��
P�     