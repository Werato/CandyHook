USE [LearnDB]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 15.06.2018 17:36:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Photo](
	[PhotoId] [int] IDENTITY(1,1) NOT NULL,
	[FileData] [varbinary](max) NULL,
	[ObjectName] [varchar](50) null,
	[ObjectId] [int] null,
PRIMARY KEY CLUSTERED 
(
	[PhotoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

CREATE INDEX index_name
ON [Photo] (            [ObjectName]
            ,[ObjectId]
			,[PhotoId]);

GO
