PGDMP                       |            Nongsan    16.2    16.2 /    Q           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
                        false    2            �            1259    32947    Order    TABLE     E  CREATE TABLE public."Order" (
    orderid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    totalamount numeric,
    estimatedelivery date,
    shippingaddress text,
    orderstatus character varying(20),
    ordercreatetime timestamp without time zone,
    userid uuid,
    orderupdatetime timestamp without time zone
);
    DROP TABLE public."Order";
       public         heap    postgres    false    2            �            1259    32900    User    TABLE     M  CREATE TABLE public."User" (
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
    avatar text,
    refreshtoken text
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
       public         heap    postgres    false    2            �            1259    32941    cart    TABLE     �   CREATE TABLE public.cart (
    cartid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    userid uuid,
    productid uuid,
    quantity integer
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
       public         heap    postgres    false            �            1259    32912    farm    TABLE     �  CREATE TABLE public.farm (
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
    farmlogo text,
    farmphone character varying(20),
    farmemail character varying(50),
    farmproductstotal numeric,
    farmservice text,
    farminvite text,
    farmimage1 text,
    farmimage2 text,
    farmimage3 text
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
       public         heap    postgres    false            �            1259    32958    payment    TABLE     }  CREATE TABLE public.payment (
    paymentid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    orderid uuid,
    userid uuid,
    paymentmethod character varying(50),
    transactionid character varying(100),
    totalamount numeric,
    paymentcreatetime timestamp without time zone,
    paymentstatus character varying(20),
    paymentupdatetime timestamp without time zone
);
    DROP TABLE public.payment;
       public         heap    postgres    false    2            �            1259    32933    product    TABLE     �  CREATE TABLE public.product (
    productid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    farmid uuid,
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
    expirydate date,
    unitofmeasure character varying(50)
);
    DROP TABLE public.product;
       public         heap    postgres    false    2            �            1259    32974    purchaseshistory    TABLE     �   CREATE TABLE public.purchaseshistory (
    purchasehistoryid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    orderid uuid,
    paymentid uuid,
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
   TABLE DATA           �   COPY public."Order" (orderid, totalamount, estimatedelivery, shippingaddress, orderstatus, ordercreatetime, userid, orderupdatetime) FROM stdin;
    public          postgres    false    223   �<       C          0    32900    User 
   TABLE DATA           �   COPY public."User" (userid, username, email, password, fullname, street, commune, district, province, phonenumber, indentitycard, status, role, avatar, refreshtoken) FROM stdin;
    public          postgres    false    217   k?       B          0    32888    admin 
   TABLE DATA           M   COPY public.admin (adminid, email, username, password, fullname) FROM stdin;
    public          postgres    false    216   GC       H          0    32941    cart 
   TABLE DATA           C   COPY public.cart (cartid, userid, productid, quantity) FROM stdin;
    public          postgres    false    222   5D       F          0    32925    category 
   TABLE DATA           `   COPY public.category (categoryid, userid, categoryname, categoryimage, categorydes) FROM stdin;
    public          postgres    false    220   4F       E          0    32920    crop 
   TABLE DATA           �   COPY public.crop (farmid, productid, cropname, cropdes, plantarea, harvestdate, estimatedyield, cropstatus, plantdate) FROM stdin;
    public          postgres    false    219   �J       D          0    32912    farm 
   TABLE DATA             COPY public.farm (farmid, userid, farmname, farmstreet, farmcommune, farmdistrict, farmprovince, farmdes, farmimage, farmarea, farmtype, farmlogo, farmphone, farmemail, farmproductstotal, farmservice, farminvite, farmimage1, farmimage2, farmimage3) FROM stdin;
    public          postgres    false    218   �K       N          0    32982    message 
   TABLE DATA           Y   COPY public.message (messageid, senderid, receiverid, content, date, status) FROM stdin;
    public          postgres    false    228   	P       J          0    32955 	   orderitem 
   TABLE DATA           G   COPY public.orderitem (orderid, productid, quantityofitem) FROM stdin;
    public          postgres    false    224   �P       K          0    32958    payment 
   TABLE DATA           �   COPY public.payment (paymentid, orderid, userid, paymentmethod, transactionid, totalamount, paymentcreatetime, paymentstatus, paymentupdatetime) FROM stdin;
    public          postgres    false    225   +S       G          0    32933    product 
   TABLE DATA           �   COPY public.product (productid, farmid, categoryid, productname, productimage1, productimage2, productimage3, healtbenefit, storagemethod, cookingmethod, overviewdes, productprice, productquantity, expirydate, unitofmeasure) FROM stdin;
    public          postgres    false    221   VW       M          0    32974    purchaseshistory 
   TABLE DATA           l   COPY public.purchaseshistory (purchasehistoryid, orderid, paymentid, purchasedate, totalamount) FROM stdin;
    public          postgres    false    227   1b       L          0    32966    review 
   TABLE DATA           Z   COPY public.review (reviewid, productid, userid, rating, comment, reviewtime) FROM stdin;
    public          postgres    false    226   Vf       �           2606    32954    Order Order_pkey 
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
       public            postgres    false    226            I   �  x�͕=��D�c{^�\��_�-g 2 �Hn���H�h��- vA
a'���{�L`�&�J���U�sNyc$tM��x�P��R�9�R|��!��	��/����[��������������/�����Y����?�_�����+�Fxh<�w�y�X��h��"H���'O��%wn�c�U=
+w�� �N��T)5�A�H�+<��v���O�5ER77h�2�`�܇C�1g�y�d�aO/aO�r��$��xծ�km0z��Tr%�^Jk.���_�������j������|���mv<�N9.��XZ�6|��B`#�{j�kgS� �	�)C�aX-��D��kP�Ct��ms-^S�&I��jd�8�q���,NS�X���
�����?�׆����=()����~�dy�8Ͽ4ɣA����8�������'ů֚�ܡɅ?�N:��3��4Ƒ�xO��Cҥ9f�N{�I�f�͊Uh1��&��7�{'��麐ڳ���vil� �ζέxm���ЀYH5�S����ܩ-ȷ��_B�/�'z���$��x���B���.��C�B�2x�%�M��=���e���]���|&^�$/�#�Fu�W��yW0��1�@E�Dw��p�uhW�����S�if��Y� Kj�N���
���z�s�$���%�y�+��㾮�&쀒      C   �  x���ˎ�8���)X��\�]I'���@Rjid�	$�R\�I�����w�<א��NI՚V�G������u��aC
)!�zU4$�)�j�@B��&۾��۔&��p�P�����|����O�2��M�4����ƗS���4�ǡv)\4q��Z6��D�����^IϢK���y�2*��^ӽ���z�A�u�@E�DB-������}:*ԙ��X"!�$5�P"@ca00��BS�����D����R%���Ʀ~|���`c�wj1�}��+���h�z��g�[�>W�C*���D  �D�.9�����i��V���.vݜ��1��u�=�j���`�n�=Қ�@��g�2��PBJ�Hj�Q	kH$P�g.�2��tPh����Ng����)l蚊 h�n�"Z���+��m�Z/�-�%I��T�Qȅ��lۜy��)��7�c�6���F>f���<�,��&gb�����;�����q0`�4ګ��Į�l������b�u�Dn�s���G���� HY�!��<�;j�3�v�5�~_�w�ɹ��7���V����腗�o�iJ7�A��l�h����B�>�NW�#�L�B�CIź*ш_��(C��)bzh�c���6/�t��)-,o���
g�S}Zf3Cg:���ކ�e�/�&|*�'2��ш�_��֟߄�s	&9{��������6��r�¬�/Zġ���8l�&Kv�\��tiu֊�_LoZ���&�s��lҵ�Xw��Ll��e�3�á��#P%��T� ��0�i{��� ]�a�dBʫ*y�Y�؟�s'��!�d���r�1�]�x�2K�T��a�T�iz�W�\~���7_��拃 #ĩ�F(j�oI*��e��� ��-�U��:[���O��q9�m��Xo��も˴;2p7nN.p�b?W���E?ƅ~��E�t:� B�4      B   �   x�K474J27L�57���51I3׵HL1�5JM345KL1L2L�LL���3tH�H�-�I�K�υ
q�%��dꙦ�G�DEyf�GzVf�x�e�$W���f���Y�8�Z����[�;9�r��P�vt����\�Ffi)���&I�&��ɺ�F)��f)i)�&�[�0bD�C��K+�n�S�8������
G&<ܵ>谝y�\1z\\\ �ca�      H   �  x��TA%1\���yw������	z�w�G+U$�aF`����9T�8�a~�J�\d����b��y|��y;~� �u�td[��$����V��������qO���s�J����cv)��r��6��j�T���,�N���#�w�[��T1��t�g���)5;���I������iɬ��P�k�u�A���_s��S�Ҫ�p�`�6�2��M��[�����pp�ubB�����2� ��W�ɞN�kC��r���:�'7ؿxw/M,���G��x�4o}�I� ��%�B���:O�Ѕ?�RC���򈴤N)�HӉ266�_�_��2k k"�q+<�����wƗ��q$i����ww5�rJ�k}�0n<
=���ҁ�B6͸�8mi��0)�9pG�V�.͐����`ݫX}�ʾBp���yƸ�B��j)���w߻�n�����\��������1W�      F   r  x���OoE����2�����C$���T�z��ޥ��9"�JD�B�D�**��q�~��&�c'�C�!����3����g�YFb�\L}0S4ÊJ�sM�K�W{.
�uXEB0�a���;�m��~�ᤝ�ȵ���M3�~0�r���iSO�0�u=<
f\N������g�P��s3O�u�zXL����=�Q31�3'�/���Q�`|i�o�ǡz@���[�,���
�ט0�Y:�o��?WC���Cp�f����	����i?�Y�\�|fPs�Ԥ�%<�+�t��:w�8M�Su��F������Q}�-~#�-^T�=Cò=�!_V�i ���#��<�f�C�QSl�&��kI9�;��E=iօ��b^ރE�l�𨕦3Gf�E���[1�@�>)���ኦ���85	O�`|���F����x��j`�<���S�4tS��:4�(?��0����٬��@.�h1H�@����LK]P޻�����3[aG�il�5�RA`s�1��pō��|��- ��J�������N��?KJ^N1�?�+�W�Y���B��N�
��Y�� =:�>bCh�g�\�3�H�)1�����Gր����:d�El�Ә1����Ij!h��;��H��Y��
�[ �R�d-Fq�U��u�2�7Ы?�/g	�m�'%�U�T�+ۯ[<�{LG"�r�[F13�`c�1H��u7>5�}tt����V�2pe�i�8���`�iT��[isãk�0?�ʀ�Ҿ~����$�������ٿ�.y��P�����DlU�n�ِ;�v}�]����j��D��9�
��7nj�����>�����,Wk�vR+��dA�M���eJ��=��R�pb	-��v^o�ծ]{5l�v+�����}O+T�L_$��F��ϴQ�M+堈��*�=�S��ޖNO86"�g^k.� d�� ��O�rq~�¬?�n�" �9x��UC��`bs��`4@a��b\�;�y��+��ρ�M��<fV8l|M��&&�(�Q��݈�|��gQ���`8��x��(��V�]u�.���`�5��~U��4�����*����=�z���^���^P      E   �   x�m�=n�0�Y>�/@C�O$�)���)Z��8P���e 
py�?ԸeLP8
0m�A��*'^K�`	1Ze�����g���K��4[���>��=���������YK\0`D��S=��>����u��g6"V������d~XmU�.MB�O�\�,S��ZG�N��q�,�C��X���xn�Z$|�>�i�~d�K�      D   m  x��V�o�D>;�p������V� �*������x<�A�k���r@= �8p@HY��jJEB#!�B�����7�e�,�āC����<�}��ͷ$r�[D�#�Tmgf�A���	t�V�`ע�Kl5���j����R�t��M��P������ʕ��G�p����`1��ae��1G�����,Vv*ۼ��TE�����Y�ē�%(��J��bgg�˃���O�^�'�>ʻ�A	%*����+,������B����u���! ��6�����30��j�
R�4��)Cu�8f�i�/N8`�(���z��	K�gw�g�<sH�H*mTw�e˹�i�4��'%`lDе����E�3� 
�R���;mP��P���3�FiE\Ӛ��E�Q\��F�|��O����4ͅ�e]\���ƻ�C��������0���b����7�0���]�چ��@
9�:~Dg��뚣l�����ŵ]ą���z=�0 n>ߴim��zd��mz�lRl9�>�=ױ-�Rb�<��q��L�{��{��Q�6�N��9pڌ��l9p�M��g�.粍��@ ��E�Xw>��]�8�н�[�u)��#ַ���s#ҷ(����`!�>VnI"ə�y�q!>�=9/�l�U���}�es�4egcN��#�<���s�H�+#_�p S�6l���C.�]��ƾ���P�z��F�\ƫ$��t�+Ep�v� �o]zk��)�dtU�X��NݽW-���1KhY���Y��\��8G�ʴ�\;�N�'�\�C���
2|�}�L�F��-�k�l��2k��k�G`Qg��tF\���#�?�ԇ /e��Y�w�G��+��^��������UJV�O�b/e����Bf�k)�;�c��ڶ�65t{�&7
�gY�OB]��R>���L���0-���$g���*�������>��!��P��w���;�!rP�6&R��h���B@��
r]�l��	�g�-s�;�A�FҮ�}	o,�ϙ\��Y*2I�P����O���1J�k��J��!�d��J�J��$N�q*�C��A�v��I�l����	`N����;7In��E1k[[[���      N   �   x���AN1 ��W�{]9���{�
��	�(DBE��S>�zifrM����"A�$B�ƥO9�+�z*@�tV�j}rENV=�����Af�@|��]@�W6���Ӹ\�!��wl�#���ǐ1ܔ�1���H�T4�M�%%#�v���,
;���0����x��=���x=�����
���q۶_�/R�      J   E  x��Tɵ$1;w��f��\�@�!��/u)[B2�L��1N81�}
q��O�G������2%o�M>��/�`i���;$@|m��
�]���6��]^�f��,>^�@ݦWLEZ�C�CuBM]}��i)�¬d����Xc�k$l�&�jp�
��h�#��#ߋ7y���?,�i�!�6�}�~4m[���&�9;iK��5/FB�U�z��x��X�3��u�'�'^��k^%�	��B�:��,8ț-����Qm
k;aĦ���`m��w�"�,�z���8��NlPL�'ή��&�m��چ�'��&M<��Y�6#55Ro@�����%�t�0I4\��tGH���� k:i5�ak�8�|�l��m��m�|��B�dE;,c6�C3��1ۦ5�aE�03�Z5{ԋް���,r�n$F���	 Z�Fh�3>a=z�	�)��XVz�􊳗3�ݗ�k$�!];ϼ���c0�b{7���д+��k��k�~���]��_�¢<hӛ'����-�N�چ۲�����A.��?a=������E�O0[[�=	GV a?���u�OXO�￿���d��5      K     x���A�7E�է��!R$E�2��7�(e6��عOr�\ [�$7	+��N2�(ԆU(>����[3V(#%`i�W��#Okꊴ'���iָ5�+�b�$���W�j��(p�	�Z)�+�:���������7��7�̢�j�0sJi�D)�zD9�z&>Y*,�����ӧy䠈R��@%xx8CM�@�5�Rr�s�dum ��.�Z��-O�\{Qz�w������]>�����
g�oS]���R/�>ZZ�ⱬ�R;o�z��5`�ip��*�ִ/WA*/�y{�.w����z9~�|������Q�Jb�����,z¬��������~���d���=Y�qޥ�X9m��&1���3t�w</�a�#��0�<E�3���|�Q�@],��0��\�w����������<#a�hg��H��K6��%�ZS�=#���?^���������/�c�`y:�8���S�z��q����lu��9�mX�}I-��1�M�r�<!%�P�\�l�>��}$]$��n�k:'<�r�I�|p����ɢ�L�rUɡ�N\|K�`s)5f�1xW�1I�Vu����9�z-���_�Lx�a�뇑|��,
�p
-dT���[�o�)>e8������5���7�ذl�������|�m�)�ld�/����|�z���Ê��0�98�=C��zR]6��i�������[�C#Y�Psh�������'��e�L�-���C([ڜ
h�+���X�������Q�4�a\cŲ�B{�sRc�WY��x�"����)�]�ݔV��q|�D�܄�I;Gis��#!g�@F��sx?G<bi���"_K���
r&9�$�i���
N���M2"�C2�%�����QF�-,\�F{���ʱ�P(1����5�B�b������$�-����D%b#:�s����Qg�ZK}�����z�-��w��)`�GS��#�_����0�s, :	�-���C��M����{	���ee��F�.�Kg�T�-"~A��[,`L��ᦪ��DB5�����zR?�;�?���      G   �
  x��ZK���^˿�vѢt5|?E��؋��"o./I��D�5��z������3���<�"-��;�C��	=�\�"%Yv�1`���̈��s��;�9W��l�it���$S��4�퇾Ǣ#c'�)�0��-��ǽP�v�EAh�ˏ'�$�˄�<�E ,G��n���޹V��].ty>�^�ۋ�I�i4ͳ��G�~����'Ӟ�F{��^����Q2��b<����^f{��d�L�?6~$a��~?��\��FQ����ٝ(}/��w,C�V���ɥ�D��[���oDc�8���%-.|�ќ�{��p����mcn׎cIO�]Cs�%m�qmǾ�
[7��Uf;��~R͘,�sv���G��0I,�8[.��>Kgl?��(I��]v�Kc��_�sh�1L�%�!)����A1�1�|�F.�&�c��ߓq5_�n��99g9<��b��lX�����d����Ix��?�j�`��DΓ>=�bK� V�q���/�'8y~��?��Oʖ�Gp���i�gl<(�ƅ&-�\|��("A@��GapD�b���Npq�vq�㴱���l�,�ฤ�r���K6���Wș���b�),��Çi��P�c6Ȗ�o%N���h�RZ>(�@3j�dœqs0�8ak�,-�hyBW;�V�˔�G�yʦb(Be{�����ৣ�C3,���;7�W|�25�vx쀳Z����M�Q�z,�X�D��-�p~����_ztJ��}��v��L=���s
��syy>%x�Yz��oL��&�Љ�����2D̅��u5���PZ���Dڎc�fƚ���w���{Ns��cM��ajQ纂�ԏf+�� e9�2o��>o�5�ˮ�Q.��dy����`i�4]���0`92bZ"�0'�B)걛�@J��
ax7?a�{�F���
�J��pWe�h(��[�^(ؔ0�u����Oi}涰@�v��7�1\.�5�� �U�B�R��$��=�<��o���� ���8-�`Pqr@B¼�F�m���ƀ�<<0�D�;���W�fВ�jPTL��㜖z��ڎ�bO��P�g�U�:G~6&e�:��i���`�8Ø�-��0I%'�9�^K!�w��n��<U1������*w�tЅ�2�ƃ���D	�;}����z^bD�`ݼJ��P��M�U��K��1a����@�@�C�0�2]� ��.�H��p����-cH��F`�j���d�7�Hح⋃����#��[vk�+�Fta&�JbL �A68'"��+v�p-N�*�œ�v�&%�	�%��爴,��h�
�:�8�M^��^S�6�m��
=E�G�q����d%5'i�2O���u :E�!�m��2� ��g�����#\z�VA��"�.I��D���uEC�i����k�}�t��c���5D�iF�p+2�����]��g�\*�.Qn��޶�y'Ϋ�Y�?@�� }��ywV%�/�%D��W\a{M�k��: QCBw+^���	���1�b�ⴁ%�� %[`�����;jLU����z��CU�Р0E`�m��T��T�Dl���Zܗ�ϭ�	y ��Fl2�M^&,\'�u��a�M�9�;qv��l����6�j�:�ot1���oz���톩x�x���`����̧)u�.0���'d��p�C*7����	v �FW3� u�6V~9j CXga�]]J� @����|�����ŧU��R��k�j����R��&V��WXABsL�Z�=]��؂�&V&��EljQl���v���m��w���v���>`G��-���FL�P4lo��%9<��E��j�Wu�UX�8T5���k5E�Cli�c绱!�*�^پ��%��C���n�PGuP�����d�����~���D<�.�� �aG�K-�P4.�"W�혶.|�ҜK�Z��� �������%ίԕ��g���sn4��k3�5��1���M�a'��w;�	@��g�*���h�e���E�4�b��cUH�SX�È'4�¾�3B��)u���/���������J@���������`�}j�[y U������ߩ9�R�x:#>��I: ;���1E�X��š���UY� �u���%G����[uG�nI��V=_e׷��)sM���@�;/;9Pj i��WjŶ/��3u{(�z�l��F�{�Qk��mW��qJ�}�j��ǈ�b�wn�����vs���9h�`��~�v7n����0*aK�I����k�T��5�"�(ǫ�Y��y��V�vu�2�WPV��y���l�����>������`��X�Q�W����L�2bL�G/�4ޒ���zy� <"� F_O�(��?���jp�hu_TyȐP�R�����MD�����~� �^��i�i倥�(��:<B�a��ݭ��`������=�jC!?�3�V�:�~]6��G��t��Ttɡ$:���g�!��K������֬�� pEd�ȉbn���}[@�a�oh�m�Yi|pq&�m�5R����w���,'��aE��| ~�n��j�Օ�Y�T-���P[����@�������` ��]�{KU�4�~K]�l)�6}��/�\z���tm�b����]܇#��F�TI��F�*j�8�:�O�K�Q�P��v�ʕ+��7�      M     x���I�#9E��S�h�)�q��h���GV��k�0; =���y"�̢�I��Bv�֙�����ۺ]��*Y���v��ӣ5�>G�5�k��8Ns�NGV=1�n�EY���%��|j|������_^s�u��(�R\��
]��k�g���w�A>w��ݔ=&���Zs����3k���n
�M��y�=<� ��<�2���\�Ք�ܜy��:ʒuj8��࡚J3�Ү7dEN�U����d�a���	�}ĺG��
��K�1y�?f×�/�z�Shޮ8%/�z�N����e�**�����-�f�*�ܘ=�'��1[4ZڱŻ'�1'�,U���Qy�=^?�����:���:�nǪ��>��sͪ�C�"��8��;����]l���mP�1؉Ƃ-���Ʊ'�҇����ʚ啋�����	�`���0F�{e�����'F����A�h�L_y��6��{hj��*t�ִּ�����K����|��V$��~� ;t�ܘ�Âw��4)~|_��Y ҉%,t��{ؑ!�,�8h6�
i��FR�����A� �/�W0���X�[�Yr)̮W�ݱip�{[h�Y<�6<F�ބ�6i�_�d�.C��r�2Rq�aAsW��p{k7N��D��'�^ұ�V���˸�,xZ`ד���q�q����6��vK��(�@������0��sI(����wΣ�r�X������Q��񝰓�f���5�j��>D�W,�94`|��:��Q�+��j�W�=.}��ʌ�w�S͊�.�0T�P�B�������O听��o�5v�,��H]oq�G��W��8�sS(�_�f��]���[�<~����ξp�ՙ��z[_}�K��i�?�;3��aF���QC��2V�PK[��)�Xs@����^�q
�k��Y��{�SG�B/�=B<�:�H����~\[�:���R�z�t2�����O�ڨ�R�4�U��+%"L2T\�@��������&:Еn��*/���_@�QC�>��E�����|}}�� �N      L     x�����E���hr�V�[]:G m�pHRU]�3�zl�BD@< ��9�	�/2o�3ay��
-R��]_�N��
v�!j��Y1�J��u9j���!G �T(�:Sִ��{З$�G��K��4TIXR�2|v��~zq�|=��'9p��	u�0��W��H�R�
�B����SnE���#���鷵�ܴ�~��ݾ����x$��Q e� �b��O�
���x_��^�����Ϧ�����/�x�#\\\XgKnt�CC��%��=�l���a�-���F�*�f:�Z�
�*-�����fk֦g�<M���ƅ�.�E��0;pd-_VHT��f��}���H�*T�ڡZLmM/�̉����]]]݃a�g��p�����EX�(ggX��#�P�CLc`ҫ�nj@�j�Xr�FkQ,���G��?3�=�����N���h�3��+Q�-y�.ZS�̵�eY{_�jC��p�v�[�$ڭŔB��c���h_N�M�M�m���������Ex�hM������	q\��'��fV��{D4>�n�����"a���-�
�K��.s�A��V[��ʐ|U�˶m��aOt
��#�5x�����}���Ƚ]���H� W�	Oߝ�?���'���]?�M7��<�������~� #���a���E[*�b[-Qє�f����dx��������@_?������7��������*N���/hNc�p��M��鲾ٸ�n���$���?)҄nA\�f�4~5���-N۔     