USE [master]
GO
/****** Object:  Database [DailyBlueprint]    Script Date: 7/13/2020 11:11:59 PM ******/
CREATE DATABASE [DailyBlueprint]
ALTER DATABASE [DailyBlueprint] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DailyBlueprint].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DailyBlueprint] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DailyBlueprint] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DailyBlueprint] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DailyBlueprint] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DailyBlueprint] SET ARITHABORT OFF 
GO
ALTER DATABASE [DailyBlueprint] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DailyBlueprint] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DailyBlueprint] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DailyBlueprint] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DailyBlueprint] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DailyBlueprint] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DailyBlueprint] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DailyBlueprint] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DailyBlueprint] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DailyBlueprint] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DailyBlueprint] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DailyBlueprint] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DailyBlueprint] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DailyBlueprint] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DailyBlueprint] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DailyBlueprint] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DailyBlueprint] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DailyBlueprint] SET RECOVERY FULL 
GO
ALTER DATABASE [DailyBlueprint] SET  MULTI_USER 
GO
ALTER DATABASE [DailyBlueprint] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DailyBlueprint] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DailyBlueprint] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DailyBlueprint] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DailyBlueprint] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DailyBlueprint', N'ON'
GO
ALTER DATABASE [DailyBlueprint] SET QUERY_STORE = OFF
GO
USE [DailyBlueprint]
GO
/****** Object:  Table [dbo].[Leagues]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Leagues](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LeagueName] [varchar](100) NOT NULL,
	[LeadUserId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organizations]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organizations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrgName] [varchar](100) NOT NULL,
	[LogoUrl] [nvarchar](500) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pomodoro]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pomodoro](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[WorkMinutes] [int] NOT NULL,
	[ShortBreakMinutes] [int] NOT NULL,
	[LongBreakMinutes] [int] NOT NULL,
	[SessionsUntilLongBreak] [int] NOT NULL,
	[TotalSessions] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Priorities]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Priorities](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ToDoId] [int] NOT NULL,
	[Type] [varchar](10) NOT NULL,
	[PriorityDate] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tags]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tags](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ToDoId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TeamMembers]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TeamMembers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[TeamId] [int] NOT NULL,
	[isTeamLead] [bit] NOT NULL,
	[isPrimary] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teams]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teams](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TeamName] [varchar](100) NOT NULL,
	[LeagueId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ToDos]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ToDos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[DateCreated] [varchar](50) NOT NULL,
	[DateDue] [varchar](50) NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[isComplete] [bit] NOT NULL,
	[Link] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 7/13/2020 11:12:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[LastName] [varchar](100) NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[ImageUrl] [nvarchar](500) NOT NULL,
	[FirebaseUID] [varchar](100) NOT NULL,
	[OrganizationId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Leagues] ON 

INSERT [dbo].[Leagues] ([Id], [LeagueName], [LeadUserId]) VALUES (1, N'All Client Services', 10)
INSERT [dbo].[Leagues] ([Id], [LeagueName], [LeadUserId]) VALUES (2, N'Operations', 9)
SET IDENTITY_INSERT [dbo].[Leagues] OFF
SET IDENTITY_INSERT [dbo].[Organizations] ON 

INSERT [dbo].[Organizations] ([Id], [OrgName], [LogoUrl]) VALUES (1, N'Summit', N'https://freesvg.org/img/Mercator-Mountain2.png')
INSERT [dbo].[Organizations] ([Id], [OrgName], [LogoUrl]) VALUES (2, N'Letter Intelligence', N'https://freesvg.org/img/DdOo-Paper-plane.png')
SET IDENTITY_INSERT [dbo].[Organizations] OFF
SET IDENTITY_INSERT [dbo].[Pomodoro] ON 

INSERT [dbo].[Pomodoro] ([Id], [UserId], [WorkMinutes], [ShortBreakMinutes], [LongBreakMinutes], [SessionsUntilLongBreak], [TotalSessions]) VALUES (1, 2, 5, 1, 2, 2, 4)
SET IDENTITY_INSERT [dbo].[Pomodoro] OFF
SET IDENTITY_INSERT [dbo].[Priorities] ON 

INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (2, 3, N'weekly', N'2020-08-03T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (3, 1, N'daily', N'2020-08-07T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (4, 5, N'daily', N'2020-08-06T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (5, 7, N'weekly', N'2020-08-03T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (6, 6, N'daily', N'2020-08-07T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (7, 8, N'daily', N'2020-08-05T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (8, 12, N'weekly', N'2020-08-03T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (9, 11, N'daily', N'2020-08-07T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (10, 13, N'weekly', N'2020-08-04T00:00:00.000')
INSERT [dbo].[Priorities] ([Id], [ToDoId], [Type], [PriorityDate]) VALUES (11, 9, N'daily', N'2020-08-07T00:00:00.000')
SET IDENTITY_INSERT [dbo].[Priorities] OFF
SET IDENTITY_INSERT [dbo].[Tags] ON 

INSERT [dbo].[Tags] ([Id], [ToDoId], [UserId]) VALUES (1, 12, 1)
INSERT [dbo].[Tags] ([Id], [ToDoId], [UserId]) VALUES (2, 21, 2)
SET IDENTITY_INSERT [dbo].[Tags] OFF
SET IDENTITY_INSERT [dbo].[TeamMembers] ON 

INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (1, 1, 1, 0, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (2, 2, 1, 1, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (3, 3, 2, 1, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (4, 4, 1, 0, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (5, 5, 1, 0, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (6, 6, 2, 0, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (7, 7, 1, 0, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (8, 8, 2, 0, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (9, 9, 3, 1, 1)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (10, 2, 4, 0, 0)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (11, 3, 4, 0, 0)
INSERT [dbo].[TeamMembers] ([Id], [UserId], [TeamId], [isTeamLead], [isPrimary]) VALUES (12, 10, 4, 1, 1)
SET IDENTITY_INSERT [dbo].[TeamMembers] OFF
SET IDENTITY_INSERT [dbo].[Teams] ON 

INSERT [dbo].[Teams] ([Id], [TeamName], [LeagueId]) VALUES (1, N'Team Sprakle', 1)
INSERT [dbo].[Teams] ([Id], [TeamName], [LeagueId]) VALUES (2, N'Team Highwater', 1)
INSERT [dbo].[Teams] ([Id], [TeamName], [LeagueId]) VALUES (3, N'Production', 2)
INSERT [dbo].[Teams] ([Id], [TeamName], [LeagueId]) VALUES (4, N'CS Leadership', 1)
SET IDENTITY_INSERT [dbo].[Teams] OFF
SET IDENTITY_INSERT [dbo].[ToDos] ON 

INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (1, N'Bank Scanline Testing for ClientA', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 1, 0, N'https://www.usbank.com/business-banking/business-services/payment-processing/remote-deposit-capture.html')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (2, N'Update contact info on portal for ClientB', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 1, 0, N'https://demo.mysecurebill.com/50/Default.aspx')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (3, N'Complete new product training and quiz', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 1, 0, N'https://www.buzzfeed.com/hannahloewentheil/15-would-you-rather-questions-for-people-who-are')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (4, N'Send anniversary note to ClientH', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 1, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (5, N'Proactive outreach call with ClientZ', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 2, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (6, N'Schedule 1x1s', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 2, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (7, N'Create PowerPoint for bi-weekly CS meeting', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 2, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (8, N'Escalation call with ClientM', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 3, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (9, N'Research high suppression rate for ClientP', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 4, 0, N'https://www.melissa.com/v2/lookups/addresscheck/address/')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (10, N'New product training/quiz', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 5, 0, N'https://www.buzzfeed.com/hannahloewentheil/15-would-you-rather-questions-for-people-who-are')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (11, N'Prepare for new client kickoff call', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 6, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (12, N'Transition ClientX to Ashley', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 7, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (13, N'Make 5 proactive calls', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 8, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (14, N'Order toner', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 9, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (15, N'Create mockups for bad debt letter', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 4, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (16, N'Schedule patient portal demo', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 5, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (17, N'Post go-live audit meeting', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 6, 1, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (18, N'Reconcile inventory reports', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 9, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (19, N'Safety audit', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 9, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (20, N'Follow up with ClientL for mapping documents', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 8, 0, N'')
INSERT [dbo].[ToDos] ([Id], [Description], [DateCreated], [DateDue], [OwnerUserId], [isComplete], [Link]) VALUES (21, N'Meet with Mary to discuss strategy for ClientL', N'2020-08-01T00:00:00.000', N'2020-08-10T00:00:00.000', 8, 0, N'')
SET IDENTITY_INSERT [dbo].[ToDos] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (1, N'Ashley', N'Claiborne', N'Account Manager', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'1', 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (2, N'Mary', N'Sparkle', N'Client Services Manager', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'2', 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (3, N'Brian', N'Highwater', N'Client Services Manager', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'3', 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (4, N'Emilia', N'Avocado', N'Account Specialist', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'4', 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (5, N'JD', N'Wouldherd', N'Account Manager', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'5', 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (6, N'Rachelle', N'Talent', N'Account Manager', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'6', 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (7, N'Teri', N'Duvet', N'Account Manager', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'7', 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (8, N'Hank P', N'Lavigne', N'Account Specialist', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'8', 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (9, N'Homer', N'Okay', N'Production Manager', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'9', 2)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Title], [ImageUrl], [FirebaseUID], [OrganizationId]) VALUES (10, N'Evangeline', N'Heist', N'Client Services Director', N'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png', N'10', 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[Leagues]  WITH CHECK ADD FOREIGN KEY([LeadUserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Pomodoro]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Priorities]  WITH CHECK ADD FOREIGN KEY([ToDoId])
REFERENCES [dbo].[ToDos] ([Id])
GO
ALTER TABLE [dbo].[Tags]  WITH CHECK ADD FOREIGN KEY([ToDoId])
REFERENCES [dbo].[ToDos] ([Id])
GO
ALTER TABLE [dbo].[Tags]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[TeamMembers]  WITH CHECK ADD FOREIGN KEY([TeamId])
REFERENCES [dbo].[Teams] ([Id])
GO
ALTER TABLE [dbo].[TeamMembers]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Teams]  WITH CHECK ADD FOREIGN KEY([LeagueId])
REFERENCES [dbo].[Leagues] ([Id])
GO
ALTER TABLE [dbo].[ToDos]  WITH CHECK ADD FOREIGN KEY([OwnerUserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organizations] ([Id])
GO
USE [master]
GO
ALTER DATABASE [DailyBlueprint] SET  READ_WRITE 
GO
