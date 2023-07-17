CREATE TABLE teachers(
    teacher_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(64),
    teacher_surname VARCHAR(64),
    teacher_experince INTEGER,
    teacher_subjects TEXT,
    teacher_about TEXT,
    teacher_img TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE archive_teachers(
    teacher_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(64),
    teacher_surname VARCHAR(64),
    teacher_experince INTEGER,
    teacher_subjects TEXT,
    teacher_about TEXT,
    teacher_img TEXT,
    archive_id uuid,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE courses(
    course_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    course_name VARCHAR(100),
    course_status BOOLEAN,
    course_price VARCHAR(100),
    course_like INTEGER,
    course_desc TEXT,
    course_img TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    teacher_id uuid,
        FOREIGN KEY(teacher_id)
        REFERENCES teachers(teacher_id)
        ON DELETE SET NULL
);

CREATE TABLE archive_courses(
    course_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    course_name VARCHAR(100),
    course_status BOOLEAN,
    course_price VARCHAR(100),
    course_like INTEGER,
    course_desc TEXT,
    course_img TEXT,
    archive_id uuid,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    teacher_id uuid
);


CREATE TABLE admins(
    admin_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    admin_name VARCHAR(100),
    admin_password VARCHAR(255),
    admin_role VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE archive_admins(
    admin_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    admin_name VARCHAR(100),
    admin_password VARCHAR(255),
    admin_role VARCHAR(50),
    archive_id uuid,
    archive_created TIMESTAMPTZ NOT NULL,
    archive_updated TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE results(
    result_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    result_fullname VARCHAR(255),
    result_year VARCHAR(20),
    result_university VARCHAR(100),
    result_points VARCHAR(20),
    result_status VARCHAR(30),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE archive_results(
    result_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    result_fullname VARCHAR(255),
    result_year VARCHAR(20),
    result_university VARCHAR(100),
    result_points VARCHAR(20),
    result_status VARCHAR(30),
    archive_id uuid,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE table news(
    news_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    news_img TEXT,
    news_data TEXT,
    news_view INTEGER,
    news_title TEXT,
    news_desc Text,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE table archive_news(
    news_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    news_img TEXT,
    news_data TEXT,
    news_view INTEGER,
    news_title TEXT,
    news_desc Text,
    archive_id uuid,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_fullname VARCHAR(100),
    user_status BOOLEAN,
    user_phone VARCHAR(30),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE archive_users(
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_fullname VARCHAR(100),
    user_status BOOLEAN,
    user_phone VARCHAR(30),
    archive_id uuid,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE admin_sessions(
    session_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    admin_id uuid,
    admin_name VARCHAR(100),
    admin_password VARCHAR(100),
    session_remoteip VARCHAR(255),
    session_device VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table comments(
    comment_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    comment_name VARCHAR(64),
    comment_desc TEXT,
    img_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table archive_comments(
    comment_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    comment_name VARCHAR(64),
    comment_desc TEXT,
    img_url TEXT,
    archive_id uuid,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



create table imgs(
    img_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    img_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


Insert into admins(admin_name, admin_password, admin_role) values('super', 12345, 'superadmin');


CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;