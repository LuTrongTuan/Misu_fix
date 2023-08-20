USE [ShoeShop]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Role]') AND type in (N'U'))
DROP TABLE [dbo].[Role]
GO
/****** Object:  Table [dbo].[ProductImage]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProductImage]') AND type in (N'U'))
DROP TABLE [dbo].[ProductImage]
GO
/****** Object:  Table [dbo].[ProductDetail]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProductDetail]') AND type in (N'U'))
DROP TABLE [dbo].[ProductDetail]
GO
/****** Object:  Table [dbo].[ProductColor]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProductColor]') AND type in (N'U'))
DROP TABLE [dbo].[ProductColor]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type in (N'U'))
DROP TABLE [dbo].[Product]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND type in (N'U'))
DROP TABLE [dbo].[Orders]
GO
/****** Object:  Table [dbo].[OrderInfo]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[OrderInfo]') AND type in (N'U'))
DROP TABLE [dbo].[OrderInfo]
GO
/****** Object:  Table [dbo].[Discount]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Discount]') AND type in (N'U'))
DROP TABLE [dbo].[Discount]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Comment]') AND type in (N'U'))
DROP TABLE [dbo].[Comment]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Category]') AND type in (N'U'))
DROP TABLE [dbo].[Category]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Brand]') AND type in (N'U'))
DROP TABLE [dbo].[Brand]
GO
/****** Object:  Table [dbo].[Blog]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Blog]') AND type in (N'U'))
DROP TABLE [dbo].[Blog]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 5/11/2023 5:01:35 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Account]') AND type in (N'U'))
DROP TABLE [dbo].[Account]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[account_id] [int] IDENTITY(1,1) NOT NULL,
	[active] [bit] NULL,
	[address] [nvarchar](max) NULL,
	[admin] [bit] NULL,
	[avatar] [nvarchar](max) NULL,
	[full_name] [nvarchar](max) NULL,
	[password] [nvarchar](max) NULL,
	[phone] [nvarchar](max) NULL,
	[role_code] [nvarchar](max) NULL,
	[user_name] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
	[town] [nvarchar](max) NULL,
	[district] [nvarchar](max) NULL,
	[city] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[account_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Blog]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Blog](
	[blog_id] [int] IDENTITY(1,1) NOT NULL,
	[content_html] [nvarchar](max) NULL,
	[descript] [nvarchar](max) NULL,
	[title] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[blog_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[brand_id] [int] IDENTITY(1,1) NOT NULL,
	[brand_code] [nvarchar](max) NULL,
	[brand_name] [nvarchar](max) NULL,
	[status] [int] NULL,
	[image] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[brand_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[category_code] [nvarchar](max) NULL,
	[category_name] [nvarchar](max) NULL,
	[status] [int] NULL,
	[image] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[comment_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NULL,
	[comment] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[product_id] [int] NULL,
	[star] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discount]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discount](
	[discount_id] [int] IDENTITY(1,1) NOT NULL,
	[discount_code] [nvarchar](max) NULL,
	[discount_name] [nvarchar](max) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[value] [nvarchar](max) NULL,
	[product_id] [int] NULL,
	[created_at] [datetime] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[discount_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderInfo]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderInfo](
	[order_infor_id] [int] IDENTITY(1,1) NOT NULL,
	[phone] [nvarchar](50) NULL,
	[cusomter_type] [nvarchar](max) NULL,
	[order_code] [nvarchar](max) NULL,
	[seller] [nvarchar](max) NULL,
	[phone_seller] [nvarchar](max) NULL,
	[id_city] [int] NULL,
	[id_district] [int] NULL,
	[id_ward] [int] NULL,
	[address] [nvarchar](max) NULL,
	[coupon] [float] NULL,
	[total] [decimal](18, 0) NULL,
	[payment_type] [int] NULL,
	[bought_type] [nvarchar](max) NULL,
	[waiting] [bit] NULL,
	[note] [nvarchar](max) NULL,
	[data_cart] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[order_infor_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NULL,
	[address] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
	[full_name] [nvarchar](max) NULL,
	[note] [nvarchar](max) NULL,
	[order_item] [nvarchar](max) NULL,
	[phone] [nvarchar](max) NULL,
	[status] [int] NULL,
	[type_payment] [int] NULL,
	[updated_at] [datetime] NULL,
	[fee_ship] [decimal](18, 0) NULL,
	[id_city] [int] NULL,
	[id_district] [int] NULL,
	[id_ward] [int] NULL,
	[total] [decimal](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[amount] [int] NULL,
	[brand_id] [int] NULL,
	[category_id] [int] NULL,
	[origin] [nvarchar](max) NULL,
	[price] [float] NULL,
	[product_name] [nvarchar](max) NULL,
	[size] [nvarchar](max) NULL,
	[status] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
	[product_code] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductColor]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductColor](
	[product_color_id] [int] IDENTITY(1,1) NOT NULL,
	[color] [nvarchar](max) NULL,
	[product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_color_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductDetail]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDetail](
	[product_detail_id] [int] IDENTITY(1,1) NOT NULL,
	[detail] [nvarchar](max) NULL,
	[product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_detail_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductImage]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductImage](
	[product_image_id] [int] IDENTITY(1,1) NOT NULL,
	[image] [nvarchar](max) NULL,
	[product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 5/11/2023 5:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_code] [nvarchar](max) NULL,
	[role_name] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
